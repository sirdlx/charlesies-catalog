var cacheHeader = require('./index.js');
var connect = require('connect');
var request = require('supertest');

describe('Cache Control header', function () {
  
  it('gets set to no-cache if passed the value "false"', function (done) {
    
    var app = connect();
    
    app.use(function (req, res ,next) {
      
      cacheHeader(res, false);
      next();
    });
    
    request(app)
      .get('/')
      .expect('cache-control', 'no-cache')
      .end(done);
  });
  
  it('gets set to a max-age if passed a number value', function (done) {
    
    var app = connect();
    
    app.use(function (req, res ,next) {
      
      cacheHeader(res, 1000);
      next();
    });
    
    request(app)
      .get('/')
      .expect('cache-control', 'public, max-age=1000')
      .end(done);
  });
  
  it('gets set to a max-age if passed a string value that parses to a number', function (done) {
    
    var app = connect();
    
    app.use(function (req, res ,next) {
      
      cacheHeader(res, '1000');
      next();
    });
    
    request(app)
      .get('/')
      .expect('cache-control', 'public, max-age=1000')
      .end(done);
  });
  
  it('gets set to a max-age if passed a string value that does not parse to a number', function (done) {
    
    var app = connect();
    
    app.use(function (req, res ,next) {
      
      cacheHeader(res, 'some value');
      next();
    });
    
    request(app)
      .get('/')
      .expect('cache-control', 'some value')
      .end(done);
  });
});