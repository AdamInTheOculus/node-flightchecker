/*
 * Project: Flight Checker
 * Author: Adam Sinclair
 * Date: October 19th, 2016
 * Purpose: Automatically check flight prices for specific destination at a specific time.
 */

// Use documentation below for all response data
// https://developers.google.com/qpx-express/v1/trips/search

var https = require('https');
var _credentials = require('./credentials.js').key;

// Trip Information
var trip = {
	origin: 'YYZ',
	destination: 'AMS',
	date: '2017-06-21'
};

// Request Options
var post_options = {
	host: 'www.googleapis.com',
	path: '/qpxExpress/v1/trips/search?key=' + _credentials,
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
var post_req = https.request(post_options, function(res) {

	// Variable to hold response data
	var result = '';

	// Display any errors that occur
	res.on('error', function(err) {
		console.log(err);
	});

	// Append all data to variable
	res.on('data', function(chunk) {
		result += chunk;
	});

	// Convert data to JSON and display to console.
	res.on('end', function() {
		// Convert string data back to JSON
		var jsonData = JSON.parse(result);
		console.log('-----------------------');
		console.log('Origin: \t' + jsonData.trips.data.airport[1].name + ' - ('+jsonData.trips.data.airport[1].code+')');
		console.log('Destination: \t' + jsonData.trips.data.airport[0].name + ' - ('+jsonData.trips.data.airport[0].code+')');
		console.log('Depart. Time:   ' + jsonData.trips.tripOption[0].slice[0].segment[0].leg[0].departureTime);
		console.log('Depart. Term:   ' + jsonData.trips.tripOption[0].slice[0].segment[0].leg[0].originTerminal);
		console.log('Arrival Time: \t' + jsonData.trips.tripOption[0].slice[0].segment[0].leg[0].arrivalTime);
		console.log('Sale Total: \t' + jsonData.trips.tripOption[0].saleTotal);
		console.log('Refundable?: \t' + jsonData.trips.tripOption[0].pricing[0].refundable);
		console.log('-----------------------');
		console.log('Duration: \t' + jsonData.trips.tripOption[0].slice[0].segment[0].leg[0].duration + ' minutes');
		console.log('Mileage: \t' + jsonData.trips.tripOption[0].slice[0].segment[0].leg[0].mileage + ' miles');
		console.log('Aircraft Type: \t' + jsonData.trips.data.aircraft[0].name);
		console.log('Carrier Name: \t' + jsonData.trips.data.carrier[0].name);
		console.log('Flight #: \t' + jsonData.trips.tripOption[0].slice[0].segment[0].flight.number);
		console.log('Cabin: \t\t' + jsonData.trips.tripOption[0].slice[0].segment[0].cabin);
		console.log('Booking Code: \t' + jsonData.trips.tripOption[0].slice[0].segment[0].bookingCode);
		console.log('Avail. Seats:   ' + jsonData.trips.tripOption[0].slice[0].segment[0].bookingCodeCount);
		console.log('-----------------------');
	});
});

// Post the data
post_req.end(post_body);
