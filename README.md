# CosmosCloud

The Cosmos Cloud is a smart-home system that is used to control the home (and beyond) through the use of modularized components connected to a central hub. Modules come in both a software and hardware form, interacting completely with the central server.  This allows modules to interact with all other modules - giving complete control to the user to tailor to specific use cases, whether it be for accessibility, luxury, or other uses.

## Setup
The `coreserver.js` file is run on the main server.  There are many modules that must be imported through npm and bower.  For 'coreserver.js' to run properly, check the following:

* Node v.4.2 is installed
* All npm dependencies are installed in /node_modules
* SQL server is running on localhost:3306
* Bower dependencies are installed in /public/bower_components
**Note that many IP addresses are hardcoded, and will result in errors if not configured properly**


## SQL
The application interacts with a sql database running on the server.  Default being:
{
	host: 'localhost',
	user: 'root',
	password: 'patsword',
	database: 'cosmos'
}
A sample database is included as the file "cosmos.sql".  To create a database locally follow these steps:
* Download mysql
  * Verify with `which mysql` and `which mysql.server`
* Create user "root" with password 'patsword'
* Start mysql with `mysql.server start`
* Create database "cosmos" through the shell by `mysql -u root -p` and `CREATE DATABASE cosmos;`
* Log out of mysql shell and execute the command `mysql -u root -p < cosmos.sql` to import the database from file


## To Run

A SQL database is expected to be running on localhost:3306, database name = "cosmos".  You may fill in your information on lines 14-19 in the file `coreserver.js`.  Simply install all node requirements through `npm` and run `node coreserver.js` to start.  The server will run on port 8000.

## Users
The users section of the database links devices on the local network 

## Movies, Pictures, Documents, Music

The assets for movies, pictures and documents are handled by the folder names in `server.js`.  The default is `public/assets/{movies or pictures or docs}`.  Movies are currently the only asset integrated with SQL.  Music is not integrated yet.

## Ledger

The ledger will keep track of shared funds among groups of people (roommates).  This data is held in the database table "ledger"

### Live Stream

Live stream links will eventually be maintained in the SQL database, but are currently hardcoded in `public/js/controllers/remoteCtrl.js`.  Live streams are subject to change and difficult to maintain.  Twitch integration will be added shortly (Food is a twitch stream).

### In Development
Many features have been tested with proof of concept and are beginning to be implemented, these include:

*Apple Airplay using shairport-sync
*Relay Module and electrical socket hookup to Raspberry Pi GPIO pins (control lights/coffee maker/any electrical appliance)
*IR receiver - to control actions using existing IR remotes
*Button - control actions
*Amazon Dash Button - Wireless convenient button to control actions
