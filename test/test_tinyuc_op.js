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

    describe('get or create firewall', function() {
        it('should get firewall if already exists', function(done) {
            helper.mockUCloud(
                'DescribeSecurityGroup-22'
            );
            tinyucop.getOrCreateFirewall('some-region', [22])
            .then(function(res) {
                assert.property(res, 'GroupId');
                done();
            })
            .fail(done);
        });

        it('should create firewall if not exists', function(done) {
            helper.mockUCloud(
                'DescribeSecurityGroup',
                'CreateSecurityGroup',
                'DescribeSecurityGroup-22'
            );
            tinyucop.getOrCreateFirewall('some-region', [22])
            .then(function(res) {
                assert.property(res, 'GroupId');
                done();
            })
            .fail(done);
        });
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
            'DescribeSecurityGroup',
            'CreateSecurityGroup',
            'DescribeSecurityGroup-22',
            'GrantSecurityGroup',
            'DescribeUHostInstance-Starting',
            'DescribeUHostInstance'
        );
        var config = {
            'region': 'some-region',
            'imageId': 'some-image',
            'password': 'some-password',
            'cpu': 2,
            'memory': 2048,
            'disk': 20,
            'name': 'some-name',
            'chargeType': 'Dynamic',
            'operator': 'Bgp',
            'bandwidth': 5,
            'ports': [22]
        };
        helper.check(tinyucop.setupHost(config, 50), done);
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
