'use strict';

var Q = require('q');
Q.longStackSupport = true;

var helper = require('./helper');

function tinyucOp(publicKey, privateKey) {

    var HOST_STATE_RUNNING = exports.HOST_STATE_RUNNING = 'Running';
    var HOST_STATE_STOPPED = exports.HOST_STATE_STOPPED = 'Stopped';
    var CHECK_STATE_INTERVAL = 10000;

    var tinyuc = require('./tinyuc_promise')(publicKey, privateKey);

    function searchImage(region, imageName) {
        return Q.Promise(function(resolve, reject) {
            tinyuc.listImages(region)
            .then(function(res) {
                resolve(res.ImageSet.filter(function(image) {
                    return image.ImageName.toLowerCase().indexOf(imageName.toLowerCase()) != -1;
                }));
            })
            .fail(function(err) {
                reject(err);
            });
        });
    }

    function waitHostState(region, hostId, state) {
        return Q.Promise(function(resolve, reject) {
            var check = function() {
                tinyuc.showHost(region, hostId)
                .then(function(res) {
                    var hostState = res.UHostSet[0].State;
                    helper.print(hostState);
                    if (hostState == state) {
                        resolve(res);
                    } else {
                        setTimeout(check, CHECK_STATE_INTERVAL);
                    }
                })
                .fail(function(err) {
                    reject(err);
                });
            };
            check();
        });
    }

    function setupHost(region, imageId, password, cpu, memory, disk, name, operator, bandwidth) {
        return Q.Promise(function(resolve, reject) {
            var hostId;
            tinyuc.createHost(region, imageId, password, cpu, memory, disk, name)
            .then(function(res) {
                helper.print(res);
                hostId = res.UHostIds[0];
                return tinyuc.createIP(region, operator, bandwidth);
            })
            .then(function(res) {
                helper.print(res);
                var ipId = res.EIPSet[0].EIPId;
                return tinyuc.bindIP(region, ipId, hostId);
            })
            .then(function(res) {
                helper.print(res);
                return waitHostState(region, hostId, HOST_STATE_RUNNING);
            })
            .then(function(res) {
                resolve(res);
            })
            .fail(function(err) {
                reject(err);
            });
        });
    }

    function teardownHost(region, hostId) {
        return Q.Promise(function(resolve, reject) {
            var ipId;
            tinyuc.showHost(region, hostId)
            .then(function(res) {
                helper.print(res);
                var ipSet = res.UHostSet[0].IPSet;
                for (var i = 0; i < ipSet.length; i++) {
                    ipId = ipSet[i].IPId;
                    if (ipId) {
                        return tinyuc.stopHost(region, hostId);
                    }
                }
            })
            .then(function(res) {
                helper.print(res);
                return tinyuc.unbindIP(region, ipId, hostId);
            })
            .then(function(res) {
                helper.print(res);
                return tinyuc.releaseIP(region, ipId);
            })
            .then(function(res) {
                helper.print(res);
                return waitHostState(region, hostId, HOST_STATE_STOPPED);
            })
            .then(function(res) {
                helper.print(res);
                return tinyuc.deleteHost(region, hostId);
            })
            .then(function(res) {
                resolve(res);
            })
            .fail(function(err) {
                reject(err);
            });
        });
    }

    return {
        searchImage: searchImage,
        waitHostState: waitHostState,
        setupHost: setupHost,
        teardownHost: teardownHost
    }
}

module.exports = tinyucOp;
