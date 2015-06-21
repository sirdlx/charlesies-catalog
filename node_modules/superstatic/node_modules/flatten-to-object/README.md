# flatten-to-object

Flatten an array of objects to a single object

## Install

```
npm install flatten-to-object --save
```

## Usage

```js
var flattenToObject = require('flatten-to-object');

var arr = [
  {
    key1: 'value1',
    key2: 'value2'
  },
  {
    key3: 'value3'
  }
];

console.log(flattenToObject(arr));

// OUTPUTS:
// {
//   key1: 'value1',
//   key2: 'value2',
//   key3: ''
// }
```

## Run Tests

```
npm install
npm test
```