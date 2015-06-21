# cache-header

Get and set the response cache header

## Install

```
npm install cache-header --save
```

## Usage

```js
var express = require('express');
var cacheHeader = require('cache-header');

var app = express();

app.use(function (req, res, next) {
  // Sets Cache-Control header to public, max-age=10000
  cacheHeader(res, 10000);
  next();
});

app.listen(3000, function () {
  
});
```

### cacheHeader(responseObject, headerValue)

* `responseObject` - the response object passed through by Node
* `headerValue` - value to set the header to. Can be the following types:
  * `false` - sets value to `no-cache`
  * `number` - a number or a parseable string. Sets header to `public, max-age={number}`
  * `string` - sets the header to whatever the string is

## Run Tests

```
npm install
npm test
```
