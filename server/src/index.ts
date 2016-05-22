
/// <reference path='../typings/tsd.d.ts' />

import express = require('express');
import path = require('path');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');

import squareRoutes = require('./square');
import request = require('request');
var port: number = process.env.PORT || 8008;
var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../dist')));

app.use('/', squareRoutes);

//catch 404 and forward to error handler
app.use((req: any, res: any, next: any) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use((err: any, req: any, res: any, next: any) => {
//     res.status(err['status'] || 500);
//     res.json('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use((err: any, req: any, res: any, next: any) => {
//   res.status(err.status || 500);
//   res.json('error', {
//     message: err.message,
//     error: {}
//   });
// });

// app.use('/app', expre ss.static(path.resolve(__dirname, 'app')));
// app.use('/libs', express.static(path.resolve(__dirname, 'libs')));
//
// var renderIndex = (req: express.Request, res: express.Response) => {
//   res.sendFile(path.resolve(__dirname, 'app/index.html'));
// }
//
// app.get('/*', renderIndex);

var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('This api is listening on port:' + port);
});

export = app;
