var ping = require('ping');


module.exports = function(app, connection) {
  /*USERS*/
  var users = [];
  //Initialize users
  connection.query('SELECT * FROM Users', function(err, rows, fields) {
    users = rows;
    pingUsers();
  })

  //Pings every user in users to see if Alive or not.  Records the last time they were alive
  var pingUsers = function() {
    users.forEach(function(host) {
      if (host.ping == 1) {
        ping.sys.probe(host.IP, function(isAlive) {
          host.isAlive = isAlive;
          if (isAlive) {
            connection.query("UPDATE Users SET time='" + new Date().getTime() + "' WHERE id='" + host.id + "';", function(err, rows, fields) {
              console.log("Added time to " + host.Name)
            })
          }
        })
      }
    })
    //Ping users every 30 seconds
    setTimeout(pingUsers, 30 * 1000);
  }

  app.get('/users', function(req, res) {
    res.send(users);
  })
  /*END USERS*/
}