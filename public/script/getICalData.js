// TITTLE: In the event we want to add a StyleSheet
//document.write('<link rel="stylesheet" href="./stylesheets/getICalData.css">');

// __________________
// getICalData.js

//var ical = require('ical');
//var arraytob= require('arrays-to-object');
//var ArrayList = require('arraylist');
//var sortarray = require('sort-array');

function getICalData(url, config) {
	//var arr = new ArrayList();
	//var list = new ArrayList();
	var list = new Array();

	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	url = url || 'https://calendar.google.com/calendar/ical/o8mfhn5drq7t875vosh3b5kdao%40group.calendar.google.com/public/basic.ics';
	config = config || {};

	console.log("mozhi is ere");

	ical.fromURL(url, {}, function(err, data) {
		if (err) {
			console.log("error nowthea");
		} else {
			for (var k in data) {
				if (data.hasOwnProperty(k)) {
					var ev = data[k];

					arr = [{
						'summary': ev.summary,
						'start': ev.start,
						'end': ev.end
					}];
					//console.log("get the row",ev.summary,ev.start,ev.end) -- fetching correct output thou it has duplicates
					//list.add(arr);
					list.push(arr);

					// ArrayList is not working
					console.log("ArrayList_nowthea", arr);

				}

			}

			/* arraytob(list);
                      console.log("theanmozhi arraytob",arraytob);*/
		}

	});

	return arr;
}



