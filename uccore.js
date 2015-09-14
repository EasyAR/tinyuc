'use strict';

var HOST = 'https://api.ucloud.cn/'

var agent = require('superagent');

var auth = require('./auth');

function uccore(publicKey, privateKey) {

    function request(params, cb) {
        agent.get(HOST)
        .query(auth.signParams(params, publicKey, privateKey))
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
