var expect  = require('chai').expect;
var request = require('request');
const jwt = require('jsonwebtoken');

const token = jwt.sign(
      100025096114501,
      'secret'
    );

it('Main page status', function(done) {
  request('http://localhost:3002' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
  });
});

it('Dashboard status', function(done) {
  request('http://localhost:3002/dashboard' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
  });
});


  it('Token verification', function(done) {
  request(`http://localhost:3002/user/userPublic/${token}/100025096114501` , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
  });
});