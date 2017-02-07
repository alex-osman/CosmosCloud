var fs = require('fs');
var assert = require('assert');

module.exports = function(app, database) {
  db = database;
  //Returns a list of all movies
  app.get('/api/connect', function(req, res) {
    connect(req.ip, function(modules) {
      res.send(modules);
    });
  });




  //Testing purposes
  app.get('/test', function(req, res) {
    test();
  })
}

//Takes the ip of a node
//Sets it up with the correct modules
var connect = function(ip, callback) {
  //Check database for information about ip
  lookupIP(ip, function(dbNodes) {
    if (dbNodes.length == 1 && dbNodes[0].modules) {
      //Start modules
      var node = dbNodes[0];
      console.log("Starting " + node.name);
      callback(node.modules);
    } else if (dbNodes.length == 0) {
      //Get information from user
      console.log("Adding " + ip + " to the db");
    } else {
      //More than one node with the same IP
      //This is a problem
      console.log("Database is configured improperly")
    }
  });  
}

//Looks up an ip in the database
var lookupIP = function(ip, callback) {
  var collection = db.collection('nodes');
  collection.find({
    "ip": ip
  }).toArray(function(err, nodes) {
    assert.equal(err, null);
    callback(nodes);
  })
}