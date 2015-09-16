'use strict';

var chai = require('chai');
var assert = chai.assert;

var tinyuc = require('../tinyuc_promise')('public_key', 'private_key');
var helper = require('./helper');

describe('tinyuc promise', function() {

    it('should list hosts', function(done) {
        helper.mockUCloud('DescribeUHostInstance');
        helper.check(tinyuc.listHosts('some-region'), done);
    });

    it('should list images', function(done) {
        helper.mockUCloud('DescribeImage');
        helper.check(tinyuc.listImages('some-region'), done);
    });

    it('should create custom image', function(done) {
        helper.mockUCloud('CreateCustomImage');
        helper.check(tinyuc.createCustomImage('some-region', 'some-host', 'some-name'), done);
    });

    it('should create host', function(done) {
        helper.mockUCloud('CreateUHostInstance');
        helper.check(tinyuc.createHost('some-region', 'some-image', 'some-password', 1, 2048, 20, 'some-name', 'Dynamic'), done);
    });

    it('should show host', function(done) {
        helper.mockUCloud('DescribeUHostInstance');
        helper.check(tinyuc.showHost('some-region', 'some-host'), done);
    });

    it('should stop host', function(done) {
        helper.mockUCloud('StopUHostInstance');
        helper.check(tinyuc.stopHost('some-region', 'some-host'), done);
    });

    it('should delete host', function(done) {
        helper.mockUCloud('TerminateUHostInstance');
        helper.check(tinyuc.deleteHost('some-region', 'some-host'), done);
    });

    it('should create ip', function(done) {
        helper.mockUCloud('AllocateEIP');
        helper.check(tinyuc.createIP('some-region', 'some-operator', 5), done);
    });

    it('should show ip', function(done) {
        helper.mockUCloud('DescribeEIP');
        helper.check(tinyuc.showIP('some-region', 'some-ip'), done);
    });

    it('should bind ip', function(done) {
        helper.mockUCloud('BindEIP');
        helper.check(tinyuc.bindIP('some-region', 'some-ip', 'some-host'), done);
    });

    it('should unbind ip', function(done) {
        helper.mockUCloud('UnBindEIP');
        helper.check(tinyuc.unbindIP('some-region', 'some-ip', 'some-host'), done);
    });

    it('should release ip', function(done) {
        helper.mockUCloud('ReleaseEIP');
        helper.check(tinyuc.releaseIP('some-region', 'some-ip'), done);
    });

    it('should get firewalls', function(done) {
        helper.mockUCloud('DescribeSecurityGroup');
        helper.check(tinyuc.getFirewalls('some-region'), done);
    });

    it('should create firewall', function(done) {
        helper.mockUCloud('CreateSecurityGroup');
        helper.check(tinyuc.createFirewall('some-region', [22]), done);
    });

    it('should bind firewall', function(done) {
        helper.mockUCloud('GrantSecurityGroup');
        helper.check(tinyuc.bindFirewall('some-region', 'some-firewall', 'some-host'), done);
    });

});
