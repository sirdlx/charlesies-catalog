var test = require('tape');

var flattenToObject = require('./index');

test('combines array of objects', function (t) {
  
  t.deepEqual(flattenToObject([
    {
      key1: 'value1'
    },
    {
      key2: 'value2'
    }
  ]), {
    key1: 'value1',
    key2: 'value2'
  }, 'flattend single key objects');
  
  t.deepEqual(flattenToObject([
    {
      key1: 'value1',
      key2: 'value2'
    },
    {
      key3: 'value3'
    }
  ]), {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3'
  }, 'flattend multi key objects');
  
  t.end();
});

test('gives back object when given object', function (t) {
  
  t.deepEqual({key1: 'value1'}, {key1: 'value1'}, 'received object');
  t.end();
});