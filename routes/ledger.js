module.exports = function(app, connection, pi) {
  app.get("/ledger/SQL", function(req, res) {
    connection.query('SELECT * FROM ledger', function(err, rows, fields) {
      if (err)
        throw err;
      res.send(rows);
    })
  })
}