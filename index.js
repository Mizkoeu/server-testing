const express = require('express');
const mongo = require('mongodb').MongoClient;
const app = express();

var remoteurl = "ec2-13-58-191-238.us-east-2.compute.amazonaws.com:27017"

app.get('/', function(err, req, res) {
  res.render('public/index.html', {});
  console.log("haha");
  mongo.connect(remoteurl, function(err, db) {
    if (!err) {
      console.log("We are connected!");
    }
  });
});

//app.use(express.static('public'));

app.listen(3000, () => console.log('Server running on port 3000'));
