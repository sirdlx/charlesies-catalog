var fs = require('fs');

var clearRequire = require('clear-require');
var find = require('lodash.find');
var isObject = require('amp-is-object');
var isString = require('amp-is-string');
var join = require('join-path');

module.exports = function (data, options) {
  
  options = options || {};
  var config = {};
  
  // Return object passed in
  if (isObject(data) && !Array.isArray(data)) {
    
    return pluckFirst(data, data, options);
  }
  
  var results = file(data, options);
  
  return pluckFirst(results.config, results.filename, options);
};

function file (filename, options) {
  
  var config = {};
  
  // Load file
  try {
    
    // Handle config file name
    if (isString(filename)) {
      config = load(join(options.root, filename));
    }
    
    // Handle array of config file names as strings
    if (Array.isArray(filename)) {
      
      filename = find(filename, function (name) {
        
        return isString(name) && fs.existsSync(join(options.root, name));
      });
      
      
      if (filename) {
        config = load(join(options.root, filename));
      }
    }
  }
  catch (e) {}
  
  return {
    config: config,
    filename: filename
  };
}

function load (filename) {
  
  clearRequire(filename);
  return require(filename);
}

function pluckFirst (obj, config, options) {
  
  var key = options.pluck;
  
  if (!key) {
    return obj;
  }
  
  if (typeof key === 'function') {
    return key(obj, config);
  }
  
  if (Array.isArray(key)) {
    key = find(key, function (k) {
      
      return obj[k];
    });
  }
  
  return (key) ? obj[key] : {};
}