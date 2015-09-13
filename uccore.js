'use strict';

var HOST = 'https://api.ucloud.cn/'

var crypto = require('crypto');
var agent = require('superagent');

function uccore(publicKey, privateKey) {

    function genSign(params) {
        var paramsStr = Object.keys(params).sort().map(function(key) {
            return key+params[key];
        }).join('') + privateKey;

        return crypto.createHash('sha1').update(paramsStr).digest('hex');
    }

    function signParams(params) {
        params['PublicKey'] = publicKey;
        params['Signature'] = genSign(params, privateKey);
        return params;
    }

    function request(params, cb) {
        agent.get(HOST)
        .query(signParams(params))
        .end(function(err, res) {
            if (err) {
                cb(err);
            } else {
                res = res.body;
                if (res.RetCode != 0) {
                    cb(new Error(JSON.stringify(res, null, 2)));
                } else {
                    cb(null, res);
                }
            }
        });
    }

    return {
        request: request
    };

}

module.exports = uccore;
