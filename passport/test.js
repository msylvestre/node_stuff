var request    = require('request');
var chai       = require('chai');
var chaiHttp   = require('chai-http');
var should     = chai.should();
var expect     = chai.expect;

chai.use(chaiHttp);

var apiUrl   = "http://127.0.0.1:3000";

console.log('===> apiURL : ' + apiUrl);

describe('Passport test', function() {

  xit('[chai] should get / then see Hello World!', (done) => {

    chai.request(apiUrl)
        .get('/')
        .end((err, res) => {
          console.log(res.text);
          res.text.should.be.eql("Hello World!");
          res.should.have.status(200);
          done();
        });
  
  });


  xit('[request] should get / then see Hello World!', (done) => {

    /*
    request({
      url: 'http://localhost:5000/api/?allo=2',
      auth: {
        'user': api_key_id,
        'pass': api_key_secret
      }
    }, function(err, resp, body) {
      console.log(body);
    });
    */

    request({
      url: 'http://localhost:3000/'
    }, function(err, resp, body) {
      
      console.log(body);
      expect(body).to.eql('Hello World!');
      body.should.be.eql('Hello World!');
      //resp.should.have.status(200);
      done();

    });

  });

  it('[chai] should get success from /login when passing user/pass params', (done) => {

    var params = {
      username: "test-user",
      password: "1234"
    }

    chai.request(apiUrl)
        .post('/login')
        .send(params) 
        .end((err, res) => {
          res.text.should.be.eql('This is a Successful login');
          console.log("status: " + res.statusCode); 
          console.log("text: " + res.text);
          res.should.have.status(200);
          done();
        });
  });


  it('[request] should get success from /login when passing user/pass params', (done) => {

    var data = {"username": "test-user","password": "1234" };

      request.post({
        url: 'http://localhost:3000/login',
        body: data,
        json: true
      }, function(err, res, body) {

        console.log("status: " + res.statusCode);      
        console.log("headers: " + JSON.stringify(res.headers));      
        console.log("err: " + err);  
        console.log("body: " + body);
        expect(res.statusCode).to.eql(200);
        expect(body).to.eql('This is a Successful login');
        done();

      });

  });


});