'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');

exports.print = function(obj) {
    console.log(util.inspect(obj, false, null, true));
}

exports.readJson = function(configFn) {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), configFn)));
}
