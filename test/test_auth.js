'use strict';

var chai = require('chai');
var assert = chai.assert;

var auth = require('../auth');

describe('auth', function() {
    it('should generate correct signature', function(done) {
        // from https://docs.ucloud.cn/api/signature.html
        var PublicKey = 'ucloudsomeone@example.com1296235120854146120';
        var PrivateKey = '46f09bb9fab4f12dfc160dae12273d5332b5debe';
        var params = {
            "Action"     :  "CreateUHostInstance",
            "Region"     :  "cn-north-01",
            "ImageId"    :  "f43736e1-65a5-4bea-ad2e-8a46e18883c2",
            "CPU"        :  2,
            "Memory"     :  2048,
            "DiskSpace"  :  10,
            "LoginMode"  :  "Password",
            "Password"   :  "VUNsb3VkLmNu",
            "Name"       :  "Host01",
            "ChargeType" :  "Month",
            "Quantity"   :  1,
            // "PublicKey"  :  "ucloudsomeone@example.com1296235120854146120"
        };
        var signedParams = auth.signParams(params, PublicKey, PrivateKey);
        assert.equal('64e0fe58642b75db052d50fd7380f79e6a0211bd', signedParams.Signature);
        done();
    });
});
