var fs = require('fs');

module.exports = function(app, multipartMiddleware) {
  var movie_folder = "./public/assets/movies/"
  var picture_folder = "./public/assets/pictures/"
  var doc_folder = "./public/assets/docs/"
  var music_folder = "./public/assets/music/"


  //Saves a movie to the server
  app.post('/uploadMovie', multipartMiddleware, function(req, res) {
    var tmp_path = req.files.file.path;
    console.log(tmp_path)
    var target_path = movie_folder + req.files.file.originalFilename;
    console.log(target_path)
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    res.send("success");
  })

  //Saves an image to the server
  app.post('/uploadPicture', multipartMiddleware, function(req, res) {
    //This renames default iPhone photos so they don't overwrite each other
    if (req.files.file.originalFilename === "image.jpg")
      req.files.file.originalFilename = "image" + (new Date).getTime() + ".jpg"

    var tmp_path = req.files.file.path;
    var target_path = picture_folder + req.files.file.originalFilename;
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path)
    src.pipe(dest);
    res.send("success")
  });

  //Saves a document to the server
  app.post('/uploadDoc', multipartMiddleware, function(req, res) {
    var tmp_path = req.files.file.path;
    var target_path = doc_folder + req.files.file.originalFilename;
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path)
    src.pipe(dest);
    res.send("success")
  });



  //Returns a list of all movies
  app.get('/api/movies', function(req, res) {
    res.send(fs.readdirSync(movie_folder))
  });

  //returns all pictures
  app.get('/api/pictures', function(req, res) {
    res.send(fs.readdirSync(picture_folder))
  })

  //returns all docs
  app.get('/api/docs', function(req, res) {
    res.send(fs.readdirSync(doc_folder))
  })

  //returns all music
  app.get('/api/music', function(req, res) {
    res.send(fs.readdirSync(music_folder))
  })
}