# jfig

JSON file loader or JSON pass through.

I needed a way to not have to know if the data passed into the function was a file path or an object. If it is a filename, this module tries to load the file. If it is an object, it just returns the object.

## Install

```
npm install jfig --save
```

## Usage

File path

```js
var jfig = require('jfig');

var something = __dirname + '/config.json';
var config = jfig(something);
```

Object pass through

```js
var jfig = require('jfig');

var something = {
  type: 'object'
};
var config = jfig(something);
```

## API

### jsfig(data[, options])

* `data` - file path or object to parse
* `options`
  * `root` - the root path if a file path is provided
  * `pluck` - a string or array of keys to plucks the values out of the config file or object

## Run Test

```
npm install
npm test
```
