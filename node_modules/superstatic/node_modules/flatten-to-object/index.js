var reduce = require('lodash.reduce');
var extend = require('lodash.assign');

module.exports = function flattenToObject (routeDefinitions) {
  
  routeDefinitions = routeDefinitions || {};
  
  if (!Array.isArray(routeDefinitions)) {
    return routeDefinitions;
  }
  
  // Convert array of objects to one object
  return  reduce(routeDefinitions, extend);
}