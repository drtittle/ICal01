/*eslint-env node*/


// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// This is for ICAL
var ical = require('./node_modules/ical/node-ical');

// on routes that end in /cals/:icalUrl
app.get('/cals', function(req, res, next) {

	var entries = [];
	var list = new Array();
	var url = req.params.icalUrl || 'https://calendar.google.com/calendar/ical/o8mfhn5drq7t875vosh3b5kdao%40group.calendar.google.com/public/basic.ics';

	//console.log("In GetCals. Url=" + url);

	ical.fromURL(url, {}, function(err, data) {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			//console.log("Got ICal data, parsing.");
			for (var k in data) {
				if (data.hasOwnProperty(k)) {
					var ev = data[k];

					var entry = new Object();
   					entry.summary = ev.summary;
   					entry.start  = ev.start;
   					entry.end = ev.end;
   					
					entries.push(entry);
				}
			}
   			var jsonString = JSON.stringify(entries);		
			res.json(jsonString);
		}
		console.log("next()");
		next();
	});
});
// This if for ICAL



// serve our custom files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

//// mount a 'virtual path' to point at our added node packages so Express will resolve
//app.use('/node_modules/ical', express.static(__dirname + '/node_modules/ical'));


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
//app.listen(appEnv.port, '0.0.0.0', function() {
var server = app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
	console.log("server starting on " + appEnv.url + ":" + appEnv.port);
});