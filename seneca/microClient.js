/**************************************************************************************************

DESC  : POC using Seneca as a microservice architecture.
USAGE : Run the services1.js, then run microClient.js 
        or open your browser at http://localhost:10101/act?role=math&cmd=sum&left=15&right=2

**************************************************************************************************/

var seneca = require('seneca')();

seneca.client();

seneca.act({role: 'math', cmd: 'sum', left: 5, right: 2}, function (err, result) {
            if (err) return console.error(err);
            console.log(result.answer);
          })

      .act({role: 'math', cmd: 'product', left: 5, right: 2}, function (err, result) {
            if (err) return console.error(err);
            console.log(result.answer);
          });