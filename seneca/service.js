var seneca = require('seneca')();

seneca.use('mathPlugin');

seneca.listen({type: 'tcp', pin:'role:math'});