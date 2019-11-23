//var Buffer = require('buffer').Buffer;
var zlib = require('zlib');
const { gunzipSync } = require( 'zlib' );


const payloadRaw = {
  "messageType": "DATA_MESSAGE",
  "owner": "817973654613",
  "logGroup": "/test/logListener",
  "logStream": "test-stream",
  "subscriptionFilters": [
    "myFilter"
  ],
  "logEvents": [
    {
      "id": "35068648226862756629953592562504100569724982992623304704",
      "timestamp": 1572532573000,
      "message": "[ERROR] First test message"
    },
    {
      "id": "35068648227977793889880123719580886483357401067922325505",
      "timestamp": 1572532573050,
      "message": "[DEBUG] Second test message"
    },
    {
      "id": "35068648227977793889880123719580886483357401067922325506",
      "timestamp": 1572532573050,
      "message": "[CRITICAL] Third test message"
    }
  ],
  "channel": "debug_lambda"
};

// Payload /wo channel
const awsPayload   = "H4sIAAAAAAAAAK2QXWvCMBSG/0rJdYfJSU8+vOu0iuAYtN2VlOE0uIBtJYkbIv73pcoutjHYxa7CeZ/knOfkTFrj/Xpn6tPBkDGZ5nX+/FBUVT4vSEr69864GCsmteQCM8F4jPf9bu764yGSUTA+jGKwtD6Y4fYVV8GZdRv5gO/8rUqJP774jbOHYPtuZvfBOE/GK9KebgVpro+LN9OFAZyJ3cYeHKlQIlMA8QCJQoDWyFEDCkCaMUpRaAmZVhGAAM5pJmkWBwYb9wvrNqoylIAcUHJKafq5d2y/KsrysWySmXU+JINw8gkv6Q+F+BFSaq6UVooy4JJpVFQNkHOUGWVUSA0QJyHFXxXwq8K0uH+aN0llNn23/V8H8VeHSbmoF5N82ST1q3XfLZrLB8RIHJcsAgAA";

// Payload /w channel
const awsPayloadCh = "H4sIAAAAAAAAA62R3WvCMBDA/5WSZ4dp0suHb51WERyDtnuSItUGDfRDmrgh4v++q+LDNgZ72FO4+13ufpdcSGOcK/cmPx8NmZBZnMeblyTL4kVCRqT7aE2PaRVKLbmASIQc03W3X/Td6Yhk7I3zY0ysrPNmqL7hzPembJAP+MndoxFxp63b9fbobdfObe1N78hkTZrzPSDF7XLyblo/gAuxFfbgQIUSkWIMDyZBCKY1cNAMBAMahZSC0JJFWiFggnFOI0kjHOgt7ufLBlVDkAw4A8kppaPH3th+naTpa1oEc9s7HwzCwQNeRz8U8CGk1FwprRQNGZehBkXVADkHGdGQCqkZw0lA4VcF+KowS57fFkWQmV3XVv/rIP7qME2X+XIar4ogP9j+uwV+ze5Qtq2psbYy29N+U5fNtirJ9RM5uiQkRQIAAA==";



//var input        = new Buffer(JSON.stringify(payloadRaw));
//var compressed   = zlib.gzipSync(input).toString( 'base64' );
//console.log(compressed);


const prepPayload = new Buffer( awsPayloadCh, 'base64' );
const parsed  = gunzipSync( prepPayload ).toString( 'utf8' );
console.log(parsed);

//var decompressed = zlib.gunzipSync(compressed);





//console.log( 'Compressed :');
//console.log( compressed);
//console.log( 'Decompressed :');
//console.log( decompressed);

