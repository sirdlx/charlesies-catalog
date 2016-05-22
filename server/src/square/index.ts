/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/express/express.d.ts"/>


let decimalOnly = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;
let cleanText = ((textin) => {
    return textin.replace(/[^\w-]/g, '').toLowerCase();
});

// Base routes
import express = require('express');
var router = express.Router();

var request = require("request");

var squareBaseURLv1: string = "https://connect.squareup.com/v1/";
var squareBaseURLv2: string = "https://connect.squareup.com/v2/";

// Initialize Firebase
var firebase = require("firebase");
var config = {
    serviceAccount: "./server/dlxdata-675e1d31e1c9.json",
    databaseURL: "https://project-604055857022237684.firebaseio.com",
};
firebase.initializeApp(config);
var rootRef = firebase.database().ref();
var squareMerchantBase: string = "square/merchant_id/";
var squareUpdateBase: string = "square/updates/";

let getStore = ((merchant_id) => {
    firebase.database().ref(squareMerchantBase + merchant_id).once('value', function(snapshot) {
        let obj = snapshot.val();
        return obj;
    });
});


// ### Listen for updates
firebase.database().ref(squareUpdateBase).on('child_added', function(snapshot) {
    // console.log(snapshot.val());
    let merchant = snapshot.val();
    merchant.key = snapshot.key;
    if (merchant.access_token) {
        updateStore(merchant);
    } else{
      rootRef.child(squareUpdateBase + merchant.key).set(null);
    }

});

let updateStore = ((merchant) => {
    console.log("Updating Merchant");

    var options = {
        url: squareBaseURLv1 + "me",
        headers: {
            'Authorization': 'Bearer ' + merchant.access_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    function meCallback(error, response, body) {
        if (!error) {
            var items = JSON.parse(body);
            // console.log(items);
            console.log("Updating " + items.name);
            items.access_token = merchant.access_token;
            items.key = merchant.key;
            updateLocations(items);
        } else {
            console.log("--      Error       --");
            console.log("--                  --");
            console.log(error);
            console.log("--                  --");
            console.log("--                  --");
        }
    }

    request(options, meCallback);

});



let updateLocations = ((merchant) => {
    console.log("fetching Locations");
    var options = {
        url: squareBaseURLv2 + "/locations",
        headers: {
            'Authorization': 'Bearer ' + merchant.access_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    function locationsCallback(error, response, body) {
        if (!error) {
            var items = JSON.parse(body);
            // console.log(items);
            merchant.locations = items.locations;
            updateCategories(merchant, items.locations[0].id);
        } else {
            console.log("--      Error       --");
            console.log("--                  --");
            console.log(error);
            console.log("--                  --");
            console.log("--                  --");
        }
    }

    request(options, locationsCallback);

});


let updateCategories = ((merchant, location_id) => {
    console.log("fetching Categories");
    var options = {
        url: squareBaseURLv1 + location_id + "/categories",
        headers: {
            'Authorization': 'Bearer ' + merchant.access_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    function categoriesCallback(error, response, body) {
        // console.log(squareBaseURLv1 + location_id + "/categories");
        if (!error && response.statusCode == 200) {
            var items = JSON.parse(body);
            updateProducts(merchant, location_id, items);
        } else if (error) {
            console.log("--   Error       --");
            console.log("--          --");
            console.log(error);
            console.log("--          --");
            console.log("--          --");
        }
    }

    request(options, categoriesCallback);

});

let updateProducts = ((merchant, location_id, categories) => {
    console.log("fetching Products");
    var options = {
        url: squareBaseURLv1 + location_id + "/items",
        headers: {
            'Authorization': 'Bearer ' + merchant.access_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    function productsCallback(error, response, body) {
        var items = JSON.parse(body);
        // console.log(items);
        if (!error) {
            var items = JSON.parse(body);
            _computeItems(merchant, location_id, categories, items)

        } else if (error) {
            console.log("--   Error       --");
            console.log("--          --");
            console.log(error);
            console.log("--          --");
            console.log("--          --");
        }
    }

    request(options, productsCallback);

});


let _computeItems = ((merchant, location_id, categories, products) => {
    console.log('Compute Categories and Products')

    // Maps
    let _idMap: any = {};
    let _nameMap: any = {};
    // 2 dimin-array
    var _default = {
        id: 'home',
        items: []
    };
    var categoriesArray = [];
    categoriesArray.splice(0, 0, _default);

    var obj = {};

    for (var _item in categories) {
        if (categories.hasOwnProperty(_item)) {
            // console.log(categories[_item]);
            var item = categories[_item];


            // compute display name and sets

            if (item.name) {
                // compute Url
                // console.log(item.name);
                var _cleanText = cleanText(item.name);
                item.cleanText = _cleanText;

                item.url = '/browse?category=' + _cleanText;
                // store old info
                item._name = item.name;

                var newnameparts = item.name.split(' - ');
                // console.log(newnameparts.length > 1);
                if (newnameparts.length === 2) {
                    item.name = newnameparts[newnameparts.length - 1];
                    if (newnameparts[0] === "Mood") {
                        item.color = "#00bcd4";
                    }
                    // console.log(item.name);
                    // maps to set
                    if (!obj[newnameparts[0]]) {
                        obj[newnameparts[0]] = {
                            items: []
                        };
                    }
                    obj[newnameparts[0]].items.push(item);
                    // console.log('parts: ', newnameparts[0], newnameparts[1]);
                } else {
                    // var itemname = item.name;
                    // console.log(categoriesArray);
                    categoriesArray[0].items.push(item);
                }

            }

            // add to IdMap
            _idMap[item.id] = item;
            _nameMap[item.cleanText] = item;
        }
    }
    // console.log(obj);
    for (var cat in obj) {
        if (obj.hasOwnProperty(cat)) {
            obj[cat].name = cat;
            obj[cat].color = "red";
            categoriesArray.push(obj[cat]);
        }
    }

    _idMap['0'] = categoriesArray[0];
    _nameMap.home = categoriesArray[0];
    // _nameMap['home'] = categoriesArray[0];

    let categoriesMap = {
        _id: _idMap,
        _name: _nameMap
    };

    // console.log(categoriesMap);
    console.log('Finished categoriesMap!');

    for (var _item in products) {
        if (products.hasOwnProperty(_item)) {
            // console.log(products[_item]);
            var item = products[_item];

            item.category = _computeProductCategory(categoriesMap, item.category);
            // console.log(item.category);
            item.url = '/products/' + item.id;

            // var priceText = this._computeItemPriceText(product.variations[0].price_money.amount);
            if (!item.variations[0].price_money) {
                item.priceText = "$0.00";
                item.price = 0.00;
            } else {
                // console.log(item.variations[0].price_money);
                item.priceText = '$' + Number(item.variations[0].price_money.amount / 100);
                item.price = Number(item.variations[0].price_money.amount / 100);
                // console.log(item.priceText);
            }

        }
    }


    // console.log(products);
    // console.log('Finished productsArray!');
    console.log("updating database");

    merchant.categoriesMap = categoriesMap;
    merchant.categoriesArray = categoriesArray;
    merchant.products = products;

    rootRef.child(squareUpdateBase+merchant.key).set(null);

    merchant.key = null;
    rootRef.child(squareMerchantBase + merchant.id).set(merchant);

    console.log("finished " + merchant.name + " updates!");
    console.log("**************************************************");

});


let _computeProductCategory = ((categoriesMap, category) => {
    if (category && category.id) {
        if (category.id === categoriesMap._id[category.id].id) {
            return categoriesMap._id[category.id];
        }
        return categoriesMap._id[category.id];
    } else {
        return categoriesMap._id['0'];
    }
})


export = router;
