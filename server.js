var express	= require("express");
var bodyParser = require('body-parser')
var app		= express();
app.use(bodyParser())
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var util = require('util'),
			exec = require('child_process').exec,
			child;
var mysql = require("mysql");
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'patsword',
	database: 'cosmos'
});
connection.connect()
var movie_folder = "public/assets/Movies/"
var picture_folder = "public/assets/pictures/"
var doc_folder = "public/assets/docs/"



var util = require('util'),
	exec = require('child_process').exec,
	child;

app.use(express.static(__dirname + "/public"));


/* UPLOAD MOVIE */
app.post('/uploadFile', multipartMiddleware, function(req, res) {
	var tmp_path = req.files.file.path;
	console.log(tmp_path);
	var target_path = movie_folder + req.files.file.originalFilename;
	console.log(target_path)
	var src = fs.createReadStream(tmp_path);
	var dest = fs.createWriteStream(target_path)
	src.pipe(dest);
	res.send("ok")
});

/* UPLOAD PICTURE */
app.post('/uploadPicture', multipartMiddleware, function(req, res) {
	if (req.files.file.originalFilename === "image.jpg")
		req.files.file.originalFilename = "image" + (new Date).getTime() + ".jpg"
	var tmp_path = req.files.file.path;
	console.log(tmp_path);
	var target_path = picture_folder + req.files.file.originalFilename;
	console.log(target_path)
	var src = fs.createReadStream(tmp_path);
	var dest = fs.createWriteStream(target_path)
	src.pipe(dest);
	res.send("ok")
});

app.post('/uploadDoc', multipartMiddleware, function(req, res) {
	var tmp_path = req.files.file.path;
	console.log(tmp_path);
	var target_path = doc_folder + req.files.file.originalFilename;
	console.log(target_path)
	var src = fs.createReadStream(tmp_path);
	var dest = fs.createWriteStream(target_path)
	src.pipe(dest);
	res.send("ok")
});


app.get('/api/movies', function(req, res) {
	var movie_path = "assets/Movies/"
	var dir = fs.readdirSync(movie_folder)
	var movies = [];
	var counter = 0;
	dir.forEach(function(value) {
		fs.stat(movie_folder + value, function(err, data) {
			movies.push({
				name: value,
				path: movie_path + value,
				bytes: data.size
			});
			counter++;
			if(counter === dir.length)
				res.send(movies)
		});
	});
})

app.get('/api/pictures', function(req, res) {
	var dir = fs.readdirSync(picture_folder)
	res.send(dir)
})

app.get('/api/docs', function(req, res) {
	var dir = fs.readdirSync(doc_folder)
	res.send(dir)
})

app.get('/SQL', function(req, res) {
	connection.query('SELECT * from ledger;', function(err, rows, field) {
		if (err) throw err;
		res.send(rows)
	})
})

app.post('/SQL/Transactions', function(req, res) {
	var post = req.body;
	connection.query('INSERT INTO ledger SET ?', post, function(err, result) {
		console.log(err)
		console.log(result)
		res.send("ok");
	})
})

app.get('/SQL/remove/:id', function(req, res) {
	connection.query('DELETE from ledger where ID=' + req.params.id +';', function(err, result) {
		console.log(err)
		console.log(result)
		res.send("ok")
	})
})

app.get('/api/remote/open/:url', function(req, res) {
	var file = req.params.url;
	console.log("Starting up: " + file);
	child = exec('omxplayer ' + file);


})

app.post('/del/:typename/:fname', function(req, res) {
	console.log("Deleting " + req.params.fname)
	child = exec('rm ./public/assets/' + req.params.typename + '/' + req.params.fname, 
		function(error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (stderr !== "")
				res.send(stderr)
			else res.send("ok")
		});
})

app.listen(80, '0.0.0.0');
console.log("App listening on port 8000");
fs.appendFile('log.output', 'Time: ' + (new Date()), function(err) {
	console.log("Recorded")
});







