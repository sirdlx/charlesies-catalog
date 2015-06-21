var path = require('path');

var test = require('tape');

var fs = require('fs-extra');

var jfig = require('./index');

test('filename string', function (t) {
  
  fs.outputFileSync('.config.json', '{"key":"value"}');
  
  var config =  jfig(path.join(process.cwd(), '.config.json'));
  
  t.deepEqual(config, {key: 'value'}, 'config');
  
  fs.removeSync('.config.json');
  t.end();
});

test('filename array', function (t) {
  
  fs.outputFileSync('.config.json', '{"key":"value"}');
  
  var config =  jfig(['some-config.json', '.config.json',], {
    root: process.cwd()
  });
  
  t.deepEqual(config, {key: 'value'}, 'config');
  
  fs.removeSync('.config.json');
  t.end();
});

test('object', function (t) {
  
  var config = jfig({
    type: 'object'
  });
  
  t.deepEqual(config, {type: 'object'}, 'object config')
  t.end();
});

test('empty object for missing file', function (t) {
  
  var config =  jfig(path.join(process.cwd(), '.nope.json'));
  
  t.deepEqual(config, {}, 'empty');
  t.end();
});

test('with root', function (t) {
  
  fs.outputFileSync('.config.json', '{"key":"value"}');
    
  var config =  jfig('.config.json', {
    root: process.cwd()
  });
  
  t.deepEqual(config, {key: 'value'}, 'config');
  
  fs.removeSync('.config.json');
  t.end();
});

test('plucking value', function (t) {
  
  var config;
  
  fs.outputFileSync('.config.json', JSON.stringify({
    settings: {
      key: 'value'
    }
  }));
  
  // From filename
  config = jfig('.config.json', {
    root: process.cwd(),
    pluck: 'settings'
  });
  
  t.deepEqual(config, {key: 'value'}, 'filename');
  
  // From object
  config = jfig({
    settings: {
      key: 'value'
    }
  }, {
    pluck: 'settings'
  });
  
  t.deepEqual(config, {key: 'value'}, 'object');
  
  // Array of values
  config = jfig({
    settings2: {
      key: 'value'
    }
  }, {
    pluck: ['settings1', 'settings2']
  });
  
  t.deepEqual(config, {key: 'value'}, 'array of values');
  t.end();
});

test('plucking value as function', function (t) {
  
  t.plan(3);
  
  var config;
  
  fs.outputFileSync('.config.json', JSON.stringify({
    settings: {
      key: 'value'
    }
  }));
  
  // From filename
  config = jfig('.config.json', {
    root: process.cwd(),
    pluck: function (obj, filename) {
      
      t.deepEqual(obj, {
        settings: {
          key: 'value'
        }
      }, 'config object in function');
      
      t.equal(filename, '.config.json', 'filename in function');
      
      return obj.settings;
    }
  });
  
  t.deepEqual(config, {key: 'value'}, 'filename');
});
