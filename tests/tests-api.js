// to run manually: mocha -u tdd -R spec tests/tests-api.js
var express = require('express');
var router = express.Router();
var expect = require('chai').expect;
var rest = require('restler');
var appSettings = require('../settings');

var imageUrl = appSettings.randomImageUrl + appSettings.lastExistingImageNum;

// API tests
suite('API tests', function() {
    test('API data for Images should be object, and schould have url property', function(done) {
        rest.get(imageUrl)
            .on('success', function(data) {
                //console.log(data);
                expect(data instanceof Object);
                expect(data.url);
                done();
            })
            .on('error', function() {
                expect(false, 'API Images error');
            });
    });
});
