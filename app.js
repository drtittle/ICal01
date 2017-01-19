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
//var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({
//	extended: true
//}));


// ROUTES FOR OUR API
// =============================================================================
//var router = express.Router(); // get an instance of the express Router

// REGISTER OUR ROUTES 
// all of our routes will be prefixed with /api
//app.use('/api', router);

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


//var ical = require('./node_modules/ical/node-ical');
var ical = require('./node_modules/ical/ical');
//  , months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// on routes that end in /ical
//router.route('/ical')


//app.route('/book')
//  .get(function (req, res) {
//    res.send('Get a random book')
//  })

// on routes that end in /cals/:icalUrl
//router.route('/cals/:icalUrl').get(function(req, res, next) {
//app.get('/cals/:icalUrl', function(req, res, next) {
app.get('/cals', function(req, res, next) {

	var list = new Array();
	var url = req.params.icalUrl || 'https://calendar.google.com/calendar/ical/o8mfhn5drq7t875vosh3b5kdao%40group.calendar.google.com/public/basic.ics';

	console.log("In GetCals. Url=" + url);

	ical.fromURL(url, {}, function(err, data) {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			console.log("Got ICal data, parsing.");
			
			res.json(data);

			
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
				}
			}
			res.json(list);
		}
		console.log("next()");
		next();
	});
	res.json(list);
	//return arr;
});


// route with parameters (http://localhost:8080/hello/:name)
//router.get('/hello/:name', function(req, res) {
//	res.send('hello ' + req.name + '!');
//});

// REGISTER OUR ROUTES 
// all of our routes will be prefixed with /api
//app.use('/', router);


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