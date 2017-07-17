var http = require('http');
var fs = require('fs');
var ndjson = require('ndjson');
var easypost = require('easypost');
var qs = require('querystring');
var port = 27017;
var ip = '0.0.0.0';

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

      //console.log("Received Data:\n" + JSONData);
      // Connect to the db
      MongoClient.connect(remoteurl, function(err, db) {
        if(!err) {
          db.collection("playerStats").count({"name": "Hoang"}, function(err, ret) {
            console.log(ret);
            var finalStr = '{"name":"Hoang","numGame":' + ret + ',"group":"Grinnell","game":' + data.JSONData + '}';
            console.log(finalStr);
            var JSONData = JSON.parse(finalStr);
            //call insert function
            insertDocument(db, JSONData, function() {
              db.close();
            });
          });
        }
        else {
          throw err;
        }
      });
      console.log("We are connected");
    });

  //Handle Get request
  }

}).listen(port, ip);


console.log('Server running at ' + ip + ":" + port);
