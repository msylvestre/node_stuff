var express = require('express');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var bcrypt = require('bcrypt')
var bodyParser = require('body-parser');

var app = express();
//app.use(cookieParser());


const user = {
  username: 'test-user',
  passwordHash: '1234',
  id: 1
}

function findUser (username, callback) {
  if (username === user.username) {
    return callback(null, user)
  }
  return callback(null)
}

passport.serializeUser(function (user, cb) {
  cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
  findUser(username, cb)
})

/*
passport.use('login', new LocalStrategy(
 (username, password, done) => {
    findUser(username, (err, user) => {
      if (err) {
        return done(err)
      }

      // User not found
      if (!user) {
        console.log('user not found');
        return done(null, false)
      }

      // Always use hashed passwords and fixed time comparison
      bcrypt.compare(password, user.passwordHash, (err, isValid) => {
        if (err) {
          return done(err)
        }
        if (!isValid) {
          return done(null, false)
        }
        return done(null, user)
      })
    })
  }
));
*/


app.use(session({
    secret: "myredissecretpassphrase13",
    store: new RedisStore({ host: 'localhost', port: 6379}),
    cookie: { maxAge: 3600000 },
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

passport.use('login', new LocalStrategy({passReqToCallback : true},
  function(req, username, password, done) {
    //console.log(req);
    console.log('Checking auth');
    console.log(username);
    return done(null, user);
  }
));

var authenticationMiddleware = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/failure');
}


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/success', function (req, res) {
  console.log("auth? " + req.isAuthenticated());
  res.send('Success')
})

app.get('/failure', function (req, res) {
  //console.log(req);
  res.send('Shit out of luck!')
})


app.post('/login', passport.authenticate('login', {
  successRedirect: '/success',
  failureRedirect: '/failure'
}), function(){
  console.log('icitte au moins');
})

app.get('/secret', authenticationMiddleware, function(req, res) {
  res.send("reach the secret");
})


/*
  app.post('/login', function(req,res) {

    req.session.key = req.body.username;

    console.log('req.session.key: ' + req.session.key);
    res.send('logined !');
  });
*/

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
