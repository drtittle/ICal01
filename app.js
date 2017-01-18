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

// This is for ICAL
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// This if for ICAL

// serve our custom files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

//// mount a 'virtual path' to point at our added node packages so Express will resolve
//app.use('/node_modules/ical', express.static(__dirname + '/node_modules/ical'));



// ROUTES FOR OUR API
// =============================================================================
//var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
//router.use(function(req, res, next) {
//    // do logging
//    console.log('Something is happening.');
//    next(); // make sure we go to the next routes and don't stop here
//});

//// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
//router.get('/ical', function(req, res) {
//    res.json({ message: 'hooray! welcome to our api!' });   
//});


var ical = require('/node_modules/node-ical')
  , months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// on routes that end in /ical
//router.route('/ical')
    
// on routes that end in /ical/:icalUrl
//router.route('/ical/:icalUrl')
//
//    // get the ical 
//    .get(function(req, res) {    
 
    
app.get('/ical/:icalUrl', function(req, res) {
	       
        var list = new Array();
		var url = req.params.bear_id || 'https://calendar.google.com/calendar/ical/o8mfhn5drq7t875vosh3b5kdao%40group.calendar.google.com/public/basic.ics';

		ical.fromURL(url, {}, function(err, data) {
			if (err) {
				res.send(err);
			} else {
				for (var k in data) {
					if (data.hasOwnProperty(k)) {
						var ev = data[k];

						var arr = [{
							'summary': ev.summary,
							'start': ev.start,
							'end': ev.end
						}];
						//console.log("get the row",ev.summary,ev.start,ev.end) -- fetching correct output thou it has duplicates
						//list.add(arr);
						list.push(arr);

						// ArrayList is not working
						//console.log("ArrayList_nowthea", arr);
					}
				}
			/* arraytob(list);
                      console.log("theanmozhi arraytob",arraytob);*/
                     
                res.json(list);
			}

		});
		res.json(list);
		//return arr;
    });






// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
//app.listen(appEnv.port, '0.0.0.0', function() {
var server = app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url + ":" + appEnv.port);
});
