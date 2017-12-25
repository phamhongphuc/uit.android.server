/* global define, it, describe */

let assert = require('assert');
let http = require('http');

describe('Server', function () {
    it('/ 200', function () {
        http.request({
            hostname: 'ai:ai',
            port: 5,
            path: '/',
            method: 'GET',
        }, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (body) {
                console.log('Body: ' + body);
                assert.equal(
                    res.statusCode,
                    200
                );
            });
        });
    });
});