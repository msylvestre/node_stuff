var request = require('request');

var api_key_id = 'ms';
var api_key_secret = 'test';
/*
request({
  url: 'http://localhost:5000/api?allo=2',
  auth: {
    'user': api_key_id,
    'pass': api_key_secret
  }
}, function(err, resp, body) {
  console.log(body);
});
*/

request({
  url: 'http://ms:test@localhost:5000/api?allo=2'
}, function(err, resp, body) {
  console.log(body);
});