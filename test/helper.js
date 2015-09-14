'use strict';

var chai = require('chai');
var assert = chai.assert;

function mockUCloud() {

    var actions = Array.prototype.slice.call(arguments);

    var url = require('url');
    var fs = require('fs');
    var nock = require('nock');

    function stripAction(path) {
        return '/?Action=' + url.parse(path, true).query.Action;
    }

    var res = nock('https://api.ucloud.cn');
    actions.forEach(function(action) {
        var parts = action.split('-');
        action = parts[0];
        var suffix = parts[1];
        var respFn = 'test/response/'+action+'Response'+(suffix ? '-' + suffix : '') + '.json';

        res.filteringPath(stripAction)
        .get('/?Action='+action)
        .reply(200, JSON.parse(fs.readFileSync(respFn)));
    });

    return res;
}

function check(promise, done) {
    promise
    .then(function(res) {
        assert.equal(0, res.RetCode);
        done();
    })
    .fail(done);
}

exports.mockUCloud = mockUCloud;
exports.check = check;
