'use strict';

var argv = require('yargs')
    .usage('Usage: $0 [region] [image_id] -n [name] -p [password] -c [num_cpus] -m [memory] -d [disk_size] -o [operator] -b [bandwidth] -k [keys]')
    .demand(2)
    .default('n', 'newImage').alias('n', 'name')
    .default('p', 'secretPassword').alias('p', 'password')
    .default('c', '2').alias('c', 'num_cpus')
    .default('m', '2048').alias('m', 'memory')
    .default('d', '20').alias('d', 'disk_size')
    .default('o', 'Bgp').alias('o', 'operator')
    .default('b', '5').alias('b', 'bandwidth')
    .default('k', 'keys.json').alias('k', 'keys')
    .help('h').alias('h', 'help')
    .epilog('copyright 2015, sightp.com')
    .argv;

var helper = require('../helper');

var region = argv._[0];
var imageId = argv._[1];
var name = argv.name;
var password = argv.password;
var numCpus = argv.num_cpus;
var memory = argv.memory;
var diskSize = argv.disk_size;
var operator = argv.operator;
var bandwidth = argv.bandwidth;
var keys = helper.readJson(argv.keys);

var ucop = require('../tinyuc_op')(keys.publicKey, keys.privateKey);

ucop.setupHost(region, imageId, password, numCpus, memory, diskSize, name, operator, bandwidth)
.then(function(res) {
    helper.print(res);
})
.fail(function(err) {
    helper.print(err);
    process.exit(1);
});
