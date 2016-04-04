"use strict";
var express = require('express');
var router = express.Router();
var request = require("request");
var baseurl = "https://connect.squareup.com/v1/";
var Firebase = require("firebase");
var storeRef = new Firebase("https://charlesiescom.firebaseio.com/square/store");
var locationsRef = new Firebase("https://charlesiescom.firebaseio.com/square/locations");
var categoriesRef = new Firebase("https://charlesiescom.firebaseio.com/square/categories");
var itemsRef = new Firebase("https://charlesiescom.firebaseio.com/square/items");
var buildRef = (function (storename, token, location) {
    var ref = new Firebase("https://" + storename + ".firebaseio.com/square/");
    ;
    console.log(storename, token, location);
    return ref;
});
buildRef('charlesiescom', '75ZsGfOQ64_tO04xUjEwYQ', 0);
router.get('/api/v1/me', function (req, res, next) {
    var token = '75ZsGfOQ64_tO04xUjEwYQ';
    var options = {
        url: baseurl + "me",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var items = JSON.parse(body);
            items.forEach(function (item) {
            });
            locationsRef.set(items);
            res.json(items);
        }
        else {
            error.error = 'true';
            error.name = error.code;
            error.code = 500;
            console.log("--   Error       --");
            console.log("--          --");
            console.log(error);
            res.json(error);
            console.log("--          --");
            console.log("--          --");
        }
    }
    request(options, callback);
});
router.get('/api/v1/locations', function (req, res, next) {
    var options = {
        url: baseurl + "me/locations",
        headers: {
            'Authorization': 'Bearer ' + '75ZsGfOQ64_tO04xUjEwYQ',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var items = JSON.parse(body);
            items.forEach(function (item) {
            });
            locationsRef.set(items);
            res.json(items);
        }
        else {
            error.error = 'true';
            error.name = error.code;
            error.code = 500;
            console.log("--   Error       --");
            console.log("--          --");
            console.log(error);
            res.json(error);
            console.log("--          --");
            console.log("--          --");
        }
    }
    request(options, callback);
});
router.get('/api/v1/categories', function (req, res, next) {
    var location = req.param('location');
    var options = {
        url: baseurl + location + "/categories",
        headers: {
            'Authorization': 'Bearer ' + '75ZsGfOQ64_tO04xUjEwYQ',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var items = JSON.parse(body);
            items.forEach(function (item) {
            });
            categoriesRef.set(items);
            res.json(items);
        }
        else if (error) {
            error.error = 'true';
            error.name = error.code;
            error.code = 500;
            console.log("--   Error       --");
            console.log("--          --");
            console.log(error);
            res.json(error);
            console.log("--          --");
            console.log("--          --");
        }
    }
    request(options, callback);
});
router.get('/api/v1/products', function (req, res, next) {
    var location = req.param('location');
    var options = {
        url: baseurl + location + "/items",
        headers: {
            'Authorization': 'Bearer ' + '75ZsGfOQ64_tO04xUjEwYQ',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var items = JSON.parse(body);
            items.forEach(function (item) {
            });
            itemsRef.set(items);
            res.json(items);
        }
        else if (error) {
            error.error = 'true';
            error.name = error.code;
            error.code = 500;
            console.log("--   Error       --");
            console.log("--          --");
            console.log(error);
            res.json(error);
            console.log("--          --");
            console.log("--          --");
        }
    }
    request(options, callback);
});
var handleUpdate = (function (key, data) {
    switch (data.event_type) {
        case 'TEST_NOTIFICATION':
            console.log('TEST_NOTIFICATION');
            break;
        case 'PAYMENT_UPDATED':
            console.log('PAYMENT_UPDATED');
            break;
        case 'INVENTORY_UPDATED':
            console.log('PAYMENT_UPDATED');
            break;
        case 'TIMECARD_UPDATED':
            console.log('PAYMENT_UPDATED');
            break;
    }
});
var updatesRef = new Firebase("https://charlesiescom.firebaseio.com/square/updates");
updatesRef.on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();
        handleUpdate(key, childData);
    });
});
module.exports = router;
