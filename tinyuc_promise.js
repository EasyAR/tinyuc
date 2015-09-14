'use strict';

var Q = require('q');
Q.longStackSupport = true;

function tinyucPromise(publicKey, privateKey) {

    var tinyuc = require('./tinyuc')(publicKey, privateKey);

    function listHosts(region) {
        var deferred = Q.defer();
        tinyuc.listHosts(region, deferred.makeNodeResolver());
        return deferred.promise;
    }

    function listImages(region) {
        var deferred = Q.defer();
        tinyuc.listImages(region, deferred.makeNodeResolver());
        return deferred.promise;
    }

    function createCustomImage(region, hostId, imageName) {
        var deferred = Q.defer();
        tinyuc.createCustomImage(region, hostId, imageName, deferred.makeNodeResolver());
        return deferred.promise;
    }

    function createHost(region, imageId, password, cpu, memory, disk, name, chargeType) {
        var deferred = Q.defer();
        tinyuc.createHost(region, imageId, password, cpu, memory, disk, name, chargeType, deferred.makeNodeResolver());
        return deferred.promise;
    }

    function showHost(region, hostId) {
        var deferred = Q.defer();
        tinyuc.showHost(region, hostId, deferred.makeNodeResolver());
        return deferred.promise;
    }

    function stopHost(region, hostId) {
        var deferred = Q.defer();
        tinyuc.stopHost(region, hostId, deferred.makeNodeResolver());
        return deferred.promise;
    }

    function deleteHost(region, hostId) {
        var deferred = Q.defer();
        tinyuc.deleteHost(region, hostId, deferred.makeNodeResolver());
        return deferred.promise;
    }

    function createIP(region, operator, bandwidth) {
        var deferred = Q.defer();
        tinyuc.createIP(region, operator, bandwidth, deferred.makeNodeResolver());
        return deferred.promise;
    }

    function showIP(region, eipId) {
        var deferred = Q.defer();
        tinyuc.showIP(region, eipId, deferred.makeNodeResolver());
        return deferred.promise;
    }

    function bindIP(region, eipId, hostId) {
        var deferred = Q.defer();
        tinyuc.bindIP(region, eipId, hostId, deferred.makeNodeResolver());
        return deferred.promise;
    }

    function unbindIP(region, eipId, hostId) {
        var deferred = Q.defer();
        tinyuc.unbindIP(region, eipId, hostId, deferred.makeNodeResolver());
        return deferred.promise;
    }

    function releaseIP(region, eipId) {
        var deferred = Q.defer();
        tinyuc.releaseIP(region, eipId, deferred.makeNodeResolver());
        return deferred.promise;
    }

    return {
        CHARGE_TYPE: tinyuc.CHARGE_TYPE,
        listHosts: listHosts,
        listImages: listImages,
        createCustomImage: createCustomImage,
        createHost: createHost,
        showHost: showHost,
        stopHost: stopHost,
        deleteHost: deleteHost,
        createIP: createIP,
        showIP: showIP,
        bindIP: bindIP,
        unbindIP: unbindIP,
        releaseIP: releaseIP
    };

}

module.exports = tinyucPromise;
