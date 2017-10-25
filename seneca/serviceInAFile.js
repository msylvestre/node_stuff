/************************************************************************************

DESCRIPTION : Example of Seneca microservice lib usage
REFENCE     : http://senecajs.org/getting-started/

USAGE : Start the service on cmd line $ node configManager.js 
        Open the URL http://localhost:10101/act?role=math&cmd=sum&left=1&right=2

*************************************************************************************/


var seneca = require('seneca')();

seneca.add('role:math,cmd:sum', function sum(msg, respond) {
  respond(null, { answer: msg.left + msg.right })
});

seneca.add('role:math,cmd:product', function product(msg, respond) {
  respond(null, { answer: msg.left * msg.right })
});


seneca.listen();