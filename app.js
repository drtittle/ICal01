/*eslint-env node*/

//------------------------------------------------------------------------------
// WebRTC starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve our custom files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// mount a 'virtual path' to point at our added node packages so Express will resolve
app.use('/node_modules/ical', express.static(__dirname + '/node_modules/ical'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
//app.listen(appEnv.port, '0.0.0.0', function() {
var server = app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url + ":" + appEnv.port);
});
