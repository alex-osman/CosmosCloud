var fs = require('fs');
var assert = require('assert');

module.exports = function(app, database) {
  db = database;

  //Node is asking for modules
  app.get('/api/connect', function(req, res) {
    connect(req.ip, function(modules) {
      res.send(modules);
    });
  });

  //Return all nodes
  app.get('/api/getNodes', function(req, res) {
    getNodes(function(nodes) {
      res.send(nodes);
    })
  })

  //User submits settings of a new node
  app.post('/api/configureNode', function(req, res) {
    var node = req.body.node;
    console.log(node);

    configureNode(node, function(result) {
      res.send(result);
    });
  })


  //Testing purposes
  app.get('/test', function(req, res) {
    test();
  })
}

//Takes the ip of a node
//Sets it up with the correct modules
var connect = function(ip, callback) {
  //Check database for information about ip
  console.log(ip);
  lookupIP(ip, function(dbNodes) {
    if (dbNodes.length == 1) {
      var node = dbNodes[0];

      //Send modules to start
      if (node.modules) { 
        console.log("Starting " + node.name);
        callback(node.modules);
      } else {
        //This pi hasn't been set up yet
        console.log("Input settings on the website");
        callback("NO MODULES");
      }
    } else if (dbNodes.length == 0) {
      //Get information from user
      console.log("Adding " + ip + " to the db");
      addIP(ip, function(status) {
        callback(status);
      })


    } else {
      //More than one node with the same IP
      //This is a problem
      console.log(dbNodes)
      console.log("Database is configured improperly")
    }
  });  
}

var configureNode = function(node, callback) {
  var collection = db.collection('nodes');
  collection.updateOne({ "ip": node.ip }, { $set: { "name": node.name, "modules": node.modules } }, function(err, result) {
    assert.equal(err, null);
    console.log(result);
    callback(result);
  })
}

//Adds a new ip to the database
var addIP = function(ip, callback) {
  var collection = db.collection('nodes');
  collection.insertOne({ "ip": ip }, function(err, result) {
    assert.equal(err, null);
    console.log(result);
    callback(result);
  })
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

var getNodes = function(callback) {
  var collection = db.collection('nodes');
  collection.find().toArray(function(err, nodes) {
    assert.equal(err, null);
    callback(nodes);
  })
}