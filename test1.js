var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();

// Retrieve
var MongoClient = require('mongodb').MongoClient;
// This is the remote url to connect to MongoDB
var remoteurl = "mongodb://zoutianh:54Mizkoeuha!@cluster0-shard-00-00-uiery.mongodb.net:27017,cluster0-shard-00-01-uiery.mongodb.net:27017,cluster0-shard-00-02-uiery.mongodb.net:27017/Epidemic?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";


app.set('view engine', 'ejs');

app.get(['/', '/index.html'], function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + '/public/style.css');
});

app.get('/about.html', function(req, res) {
  res.sendFile(__dirname + '/public/about.html');
});

app.get('/profile/:name', function(req, res) {
  var useData = function(data, len) {
    //console.log(data);
    res.render('profile', {person: req.params.name, length: len, data: data});
  };

  var connect = function(db, callback) {
      var query = { name: req.params.name};
      db.collection("playerStats").find(query).toArray(function(err, arr) {
        if (err) throw err;
        //console.log(arr[0]);
        if (arr.length === 0) {
          res.send('404, Wrong page');
        } else {
          var data = arr[0];
          console.log(data.name);
          callback(data, arr.length);
          db.close();
        }
      });
  };

  var connect2 = function(db, callback) {
      var query = { name: "Mike"};
      db.collection("playerStats").find(query).toArray(function(err, arr) {
        if (err) throw err;
        //console.log(arr[0]);
        if (arr.length <= 1) {
          res.send('404, Not enough games found for you');
        } else {
          var data = arr[1];
          console.log(data.name);
          callback(data, arr.length);
          db.close();
        }
      });
  };

  MongoClient.connect(remoteurl, function(err, db) {
    if (err) throw err;
    if (req.params.name === 'Mike2') {
      connect2(db, useData);
    } else {
    connect(db, useData);
    }
  });

});

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
  }
};

app.listen(3000, '127.0.0.1');

// var input = fs.createReadStream(__dirname + '/public/index.html', 'utf8');
// var css = fs.createReadStream(__dirname + '/public/style.css');
//
// var server = http.createServer(function(req, res) {
//   console.log('Request was made at ' + req.url);
//   if (req.url === '/' || req.url === '/index.html') {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     input.pipe(res);
//   // } else if (req.url === '/style.css') {
//   //   res.writeHead(200, {'Content-Type': 'text/css'});
//   //   css.pipe(res);
// } else {
//   var serve = fs.createReadStream(__dirname + '/public' + req.url);
//   serve.pipe(res);
// }
//
//
//
// }).listen(3000, '127.0.0.1');
