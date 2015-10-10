'use strict';

var crypto = require('crypto');

function genSign(params, privateKey) {
    var paramsStr = Object.keys(params).sort().map(function(key) {
        return key+params[key];
    }).join('') + privateKey;

    return crypto.createHash('sha1').update(paramsStr).digest('hex');
}

function signParams(params, publicKey, privateKey) {
    params.PublicKey = publicKey;
    params.Signature = genSign(params, privateKey);
    return params;
}

exports.signParams = signParams;
