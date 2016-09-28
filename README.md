# CosmosCloud

The Cosmos Cloud is a program that will act as your all-in-one entertainment system.  It is made for the Raspberry Pi, but will work on any unix device.  Starts a web server on the device which offers full control to `omxplayer`, the Raspberry Pi's default media player.  Assets are held in folders and synced with a SQL database to show which assets are available for viewing.  Movie posters are obtained from themoviedb's public API.  Server is maintained through Node.js and the front end is AngularJS.

## SQL
The application interacts with a sql database running on the server.  Default being:
{
	host: 'localhost',
	user: 'root',
	password: 'patsword',
	database: 'cosmos'
}
A sample database is included as the file "cosmos.sql".  To create a database locally follow these steps:
1) Download mysql
	Verify with `which mysql` and `which mysql.server`
2) Create user "root" with password 'patsword'
3) Start mysql with `mysql.server start`
4) Create database "cosmos" through the shell by `mysql -u root -p` and `CREATE DATABASE cosmos;`
5) Log out of mysql shell and execute the command `mysql -u root -p < cosmos.sql` to import the database from file


## To Run

A SQL database is expected to be running on localhost:3306, database name = "cosmos".  You may fill in your information on lines 14-19 in the file `server.js`.  Simply install all node requirements through `npm` and run `node server.js` to start.  The server will run on port 80.  Raspberry Pi is expected to be plugged in to an hdmi interface and an 1/8th inch audio jack.  Facebook integration will only work if you input YOUR facebook app id.  This can be changed in `public/js/controllers/mainCtrl.js` on line 7.

## Movies, Pictures, Documents, Music

The assets for movies, pictures and documents are handled by the folder names in `server.js`.  The default is `public/assets/{movies or pictures or docs}`.  Movies are currently the only asset integrated with SQL.  Music is not integrated yet.

## Ledger

The ledger will keep track of shared funds among groups of people (roommates).  If Facebook integration is enabled, one's name will be automatically filled in.

## Remote

This controls the Raspberry Pi through many get requests to the backend.  A FIFO is used to control the input to omxplayer.  This shows movies, tv shows, live streams, and music.

### Live Stream

Live stream links will eventually be maintained in the SQL database, but are currently hardcoded in `public/js/controllers/remoteCtrl.js`.  Live streams are subject to change and difficult to maintain.  Twitch integration will be added shortly (Food is a twitch stream).
