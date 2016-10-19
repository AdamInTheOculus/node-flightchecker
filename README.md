# How to get started
- Fork this repo
- Create a `credentials.js` file and place your Google API Key in there
- Edit any flight parameters in `trip` object
- Enter: ``` node app.js ``` in console to run application

## Current Example
The current example checks for the cheapest flight:
- FROM: Toronto
- TO: Amsterdam
- DEPARTURE: June 21 2017
- ONE WAY

### Request Body
```javascript
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
```

### Formatted Results
``` 
-----------------------
Origin:         Toronto Lester B Pearson - (YYZ)
Destination:    Amsterdam Schiphol Airport - (AMS)
Depart. Time:   2017-06-21T21:50-04:00
Depart. Term:   3
Arrival Time:   2017-06-22T11:15+02:00
Sale Total:     CAD472.16
Refundable?:    true
-----------------------
Duration:       445 minutes
Mileage:        3720 miles
Aircraft Type:  Airbus A330
Carrier Name:   Air Transat
Flight #:       360
Cabin:          COACH
Booking Code:   V
```
