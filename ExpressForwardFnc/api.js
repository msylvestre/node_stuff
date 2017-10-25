"use strict";

var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 5000));


app.get('/api', hello, function (req, res) {

	var auth = JSON.stringify(req.headers.authorization);
	var q = JSON.stringify(req.query);
	
	console.log('auth : ' + auth);

  res.end('You reached /api/ ' + auth + ' || ' + q);

});



function hello(req, res, next) {
  console.log("hello!");

  var ee = new Error();

  ee.name    = 'loadUserFailed';
  ee.message = 'Failed to load user hello';
  ee.status  = 405;

  //next(ee);
  next();

}

// Start the server
//var server = app.listen(80, function () {
//   console.log("Racing Logbook API is listening at http://127.0.0.1:" + server.address().port + "/api/");
//});

app.listen(app.get('port'), function() {
  console.log('Racing Logbook API is running on port', app.get('port'));
});