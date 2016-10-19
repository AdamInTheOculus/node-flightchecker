/*
 * Project: Flight Checker
 * Author: Adam Sinclair
 * Date: October 19th, 2016
 * Purpose: Automatically check flight prices for specific destination at a specific time.
 */

// Use documentation below for all response data
// https://developers.google.com/qpx-express/v1/trips/search

var https = require('https');
var credentials = require('./credentials.js');

console.log(credentials);

// Google API Key
var key = credentials.key;

// Trip Information
var trip = {
	origin: 'YYZ',
	destination: 'AMS',
	date: '2017-06-21'
};

// Request Options
var post_options = {
	host: 'www.googleapis.com',
	path: '/qpxExpress/v1/trips/search?key=' + key,
	method: 'POST',
	json: true,
	headers: {
		'content-type': 'application/json'
	}
};

// Request Body
var post_body = JSON.stringify({
  "request": {
    "passengers": {
      "adultCount": "1"
    },
    "slice": [
      {
        "origin": trip.origin,
        "destination": trip.destination,
        "date": trip.date
      }
    ],
    "solutions": "1"
  }
});

// Set up the request
var result = '';
var post_req = https.request(post_options, function(res) {
	res.setEncoding('utf8');

	res.on('data', function(chunk) {
		result += chunk;
	});

	res.on('error', function(err) {
		console.log(err);
	});

	res.on('end', function() {
		// Convert string data back to JSON
		console.log(result);
		var jsonData = JSON.parse(result);
		console.log('-----------------------');
		console.log('Origin: \t' + jsonData.trips.data.airport[1].name + ' - ('+jsonData.trips.data.airport[1].code+')');
		console.log('Destination: \t' + jsonData.trips.data.airport[0].name + ' - ('+jsonData.trips.data.airport[0].code+')');
		console.log('Depart. Time:   ' + jsonData.trips.tripOption[0].slice[0].segment[0].leg[0].departureTime);
		console.log('Depart. Term:   ' + jsonData.trips.tripOption[0].slice[0].segment[0].leg[0].originTerminal);
		console.log('Arrival Time: \t' + jsonData.trips.tripOption[0].slice[0].segment[0].leg[0].arrivalTime);
		console.log('Duration: \t' + jsonData.trips.tripOption[0].slice[0].segment[0].leg[0].duration + ' minutes');
		console.log('Aircraft Type: \t' + jsonData.trips.data.aircraft[0].name);
		console.log('Carrier Name: \t' + jsonData.trips.data.carrier[0].name);
		console.log('Sale Total: \t' + jsonData.trips.tripOption[0].saleTotal);
		console.log('-----------------------');
	});

});

// Post the data
post_req.end(post_body);
