var _isNumber = require('lodash.isnumber');
var isString = require('lodash.isstring');
var regular = require('regular');

module.exports = function (res, headerValue) {
  
  if (headerValue === false) {
    res.setHeader('Cache-Control', 'no-cache');
  }
  else if (isNumber(headerValue)) {
    res.setHeader('Cache-Control', 'public, max-age=' + headerValue.toString());
  }
  else if (isString(headerValue)) {
    res.setHeader('Cache-Control', headerValue);
  }
};

function isNumber (val) {
  
  return _isNumber(val) || regular.number.test(val);
}