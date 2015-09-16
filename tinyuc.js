'use strict';

var uccore = require('./uccore');

function tinyuc(publicKey, privateKey) {

    var uccore = require('./uccore')(publicKey, privateKey);

    var CHARGE_TYPE = {
        'YEAR': 'Year',
        'MONTH': 'Month',
        'DYNAMIC': 'Dynamic',
        'TRIAL': 'Trial'
    }

    function listHosts(region, cb) {
        var params = {
            'Action': 'DescribeUHostInstance',
            'Region': region
        };
        uccore.request(params, cb);
    }

    function listImages(region, cb) {
        var params = {
            'Action': 'DescribeImage',
            'Region': region,
            'ImageType': 'Base'
        };
        uccore.request(params, cb);
    }

    function createCustomImage(region, hostId, imageName, cb) {
        var params = {
            'Action': 'CreateCustomImage',
            'Region': region,
            'UHostId': hostId,
            'ImageName': imageName
        };
        uccore.request(params, cb);
    }

    function createHost(region, imageId, password, cpu, memory, disk, name, chargeType, cb) {
        var params = {
            'Action': 'CreateUHostInstance',
            'Region': region,
            'ImageId': imageId,
            'LoginMode': 'Password',
            'Password': new Buffer(password).toString('base64'),
            'CPU': cpu,
            'Memory': memory,
            'DiskSpace': disk,
            'Name': name,
            'ChargeType': chargeType
        };
        uccore.request(params, cb);
    }

    function showHost(region, hostId, cb) {
        var params = {
            'Action': 'DescribeUHostInstance',
            'Region': region,
            'UHostIds.0': hostId
        };
        uccore.request(params, cb);
    }

    function stopHost(region, hostId, cb) {
        var params = {
            'Action': 'StopUHostInstance',
            'Region': region,
            'UHostId': hostId
        };
        uccore.request(params, cb);
    }

    function deleteHost(region, hostId, cb) {
        var params = {
            'Action': 'TerminateUHostInstance',
            'Region': region,
            'UHostId': hostId
        };
        uccore.request(params, cb);
    }

    function createIP(region, operator, bandwidth, cb) {
        var params = {
            'Action': 'AllocateEIP',
            'Region': region,
            'OperatorName': operator,
            'Bandwidth': bandwidth,
            'ChargeType': 'Dynamic'
        };
        uccore.request(params, cb);
    }

    function showIP(region, eipId, cb) {
        var params = {
            'Action': 'DescribeEIP',
            'Region': region,
            'EIPIds.0': eipId
        };
        uccore.request(params, cb);
    }

    function bindIP(region, eipId, hostId, cb) {
        var params = {
            'Action': 'BindEIP',
            'Region': region,
            'EIPId': eipId,
            'ResourceType': 'uhost',
            'ResourceId': hostId
        };
        uccore.request(params, cb);
    }

    function unbindIP(region, eipId, hostId, cb) {
        var params = {
            'Action': 'UnBindEIP',
            'Region': region,
            'EIPId': eipId,
            'ResourceType': 'uhost',
            'ResourceId': hostId
        };
        uccore.request(params, cb);
    }

    function releaseIP(region, eipId, cb) {
        var params = {
            'Action': 'ReleaseEIP',
            'Region': region,
            'EIPId': eipId
        };
        uccore.request(params, cb);
    }

    function getFirewalls(region, cb) {
        var params = {
            'Action': 'DescribeSecurityGroup',
            'Region': region
        };
        uccore.request(params, cb);
    }

    function createFirewall(region, ports, cb) {
        var name = ports.sort().map(function(port) {
            return String(port);
        }).join(',');
        var params = {
            'Action': 'CreateSecurityGroup',
            'Region': region,
            'GroupName': name,
            'Description': name,
        };
        for (var i = 0; i < ports.length; i++) {
            params['Rule.'+i] = 'TCP|'+ports[i]+'|0.0.0.0/0|ACCEPT|50';
        }
        uccore.request(params, cb);
    }

    function bindFirewall(region, firewallId, hostId, cb) {
        var params = {
            'Action': 'GrantSecurityGroup',
            'Region': region,
            'GroupId': firewallId,
            'ResourceType': 'uhost',
            'ResourceId': hostId
        };
        uccore.request(params, cb);
    }

    return {
        CHARGE_TYPE: CHARGE_TYPE,
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
        releaseIP: releaseIP,
        getFirewalls: getFirewalls,
        createFirewall: createFirewall,
        bindFirewall: bindFirewall
    };

}

module.exports = tinyuc;
