'use strict';

var chai = require('chai');
var assert = chai.assert;

var tinyucop = require('../tinyuc_op')('public_key', 'private_key');
var helper = require('./helper');

describe('tinyuc op', function() {

    it('should search image', function(done) {
        helper.mockUCloud('DescribeImage');
        tinyucop.searchImage('some-region', 'ubuntu 14.04 64')
        .then(function(res) {
            assert.lengthOf(res, 1);
            done();
        })
        .fail(done);
    });

    it('should wait host state', function(done) {
        helper.mockUCloud(
            'DescribeUHostInstance-Starting',
            'DescribeUHostInstance'
        );
        tinyucop.waitHostState('some-region', 'some-host', tinyucop.HOST_STATE.RUNNING, 50)
        .then(function(res) {
            assert.equal(0, res.RetCode);
            assert.equal('Running', res.UHostSet[0].State);
            done();
        })
        .fail(done);
    });

    it('should setup host', function(done) {
        helper.mockUCloud(
            'CreateUHostInstance',
            'AllocateEIP',
            'BindEIP',
            'DescribeUHostInstance-Starting',
            'DescribeUHostInstance'
        );
        helper.check(tinyucop.setupHost('some-region', 'some-image', 'some-password', 1, 2048, 20, 'some-name', 'Dynamic', 'Bgp', 5, 50), done);
    });

    it('should teardown host', function(done) {
        helper.mockUCloud(
            'DescribeUHostInstance',
            'StopUHostInstance',
            'UnBindEIP',
            'ReleaseEIP',
            'DescribeUHostInstance',
            'DescribeUHostInstance-Stopped',
            'TerminateUHostInstance'
        );
        helper.check(tinyucop.teardownHost('some-region', 'some-host', 50), done);
    });

});