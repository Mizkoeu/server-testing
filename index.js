var http = require('http');
var fs = require('fs');
var ndjson = require('ndjson');
var easypost = require('easypost');
var qs = require('querystring');
var port = 3000;
var ip = '127.0.0.1';

// Retrieve
var MongoClient = require('mongodb').MongoClient;
// This is the remote url to connect to MongoDB
var remoteurl = "mongodb://zoutianh:54Mizkoeuha!@cluster0-shard-00-00-uiery.mongodb.net:27017,cluster0-shard-00-01-uiery.mongodb.net:27017,cluster0-shard-00-02-uiery.mongodb.net:27017/Epidemic?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";


// MongoClient.connect(remoteurl, function(err, db) {
//   if (err) {
//     throw err;
//   } else {
//     console.log("We are connected!");
//   }
// });

//Insert to MongoDB function
var insertDocument = function(db, JSONData, callback) {
  db.collection('playerStats').insert(JSONData);
};


// Start the server
http.createServer(function (request, response) {


  //Handle POST request
  if (request.method == 'POST') {
    //Get the post request
    easypost.get(request, response, function (data) {
      console.log("Node server heard you!!");
      //parse url content
      data = qs.parse(data);

      var finalStr = '{"name":"Hoang","group":"Grinnell","game":' + data.JSONData + '}';

      var JSONData = JSON.parse(finalStr);
      //console.log("Received Data:\n" + JSONData);
      // Connect to the db
      MongoClient.connect(remoteurl, function(err, db) {
        if(!err) {
          //call insert function
          insertDocument(db, JSONData, function() {
            db.close();
          });
        }
        else {
          throw err;
        }
      });
      console.log("We are connected");
    });

  //Handle Get request
  } else if (request.method == 'GET') {
    //Connect to the MongoBD
    MongoClient.connect(remoteurl, function(err, db) {
      if (err) throw err;
      //Arbitrary query information (which return all entry in this case)
      var query = { name: "Hoang" };
      db.collection("playerStats").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log("Get Response:");
        console.log(result);
        //respond with the query result
        response.end(JSON.stringify(result));
        db.close();
      });
    });
  }

}).listen(port, ip);


console.log('Server running at ' + ip + ":" + port);
