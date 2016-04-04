"use strict";
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var base = require('./routes');
var port = process.env.PORT || 8008;
var app = express();
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', base);
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This api is listening on port:' + port);
});
module.exports = app;
