'use strict';

var argv = require('yargs')
    .usage('Usage: $0 [region] [host_id] -k [keys]')
    .demand(2)
    .default('k', 'keys.json').alias('k', 'keys')
    .help('h').alias('h', 'help')
    .epilog('copyright 2015, sightp.com')
    .argv;

var helper = require('../helper');

var region = argv._[0];
var hostId = argv._[1];
var keys = helper.readJson(argv.keys);

var ucop = require('../tinyuc_op')(keys.publicKey, keys.privateKey);

ucop.teardownHost(region, hostId)
.then(function(res) {
    helper.print(res);
})
.fail(function(err) {
    helper.print(err);
});
