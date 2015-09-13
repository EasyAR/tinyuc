# tinyuc - ucloud.cn utilities with sensable defaults

### Classes
* `function uccore(publicKey, privateKey)`
  * `function request(params, cb)`
* `function tinyuc(publicKey, privateKey)`
  * `function listHosts(region, cb)`
  * `function function listImages(region, cb)`
  * `function createCustomImage(region, hostId, imageName, cb)`
  * `function createHost(region, imageId, password, cpu, memory, disk, name, cb)`
  * `function showHost(region, hostId, cb)`
  * `function stopHost(region, hostId, cb)`
  * `function deleteHost(region, hostId, cb)`
  * `function createIP(region, operator, bandwidth, cb)`
  * `function showIP(region, eipId, cb)`
  * `function bindIP(region, eipId, hostId, cb)`
  * `function unbindIP(region, eipId, hostId, cb)`
  * `function releaseIP(region, eipId, cb)`
* `function tinyucPromise(publicKey, privateKey)`
  * `function listHosts(region)`
  * `function function listImages(region)`
  * `function createCustomImage(region, hostId, imageName)`
  * `function createHost(region, imageId, password, cpu, memory, disk, name)`
  * `function showHost(region, hostId)`
  * `function stopHost(region, hostId)`
  * `function deleteHost(region, hostId)`
  * `function createIP(region, operator, bandwidth)`
  * `function showIP(region, eipId)`
  * `function bindIP(region, eipId, hostId)`
  * `function unbindIP(region, eipId, hostId)`
  * `function releaseIP(region, eipId)`
* `function tinyucOp(publicKey, privateKey)`
  * `function searchImage(region, imageName)`
  * `function waitHostState(region, hostId, state)`
  * `function setupHost(region, imageId, password, cpu, memory, disk, name, operator, bandwidth)`
  * `function teardownHost(region, hostId)`


### Utilities
#### searchImage
```bash
$ searchImage -h
Usage: searchImage [region] [image_name] -k [keys]

Options:
  -h, --help  Show help                                                [boolean]
  -k, --keys                                              [default: "keys.json"]

copyright 2015, sightp.com
```

#### createHost
```bash
$ createHost -h
Usage: createHost [region] [image_id] -n [name] -p [password] -c [num_cpus] -m [
memory] -d [disk_size] -o [operator] -b [bandwidth] -k [keys]

Options:
  -h, --help       Show help                                           [boolean]
  -n, --name                                               [default: "newImage"]
  -p, --password                                     [default: "secretPassword"]
  -c, --num_cpus                                                  [default: "2"]
  -m, --memory                                                 [default: "2048"]
  -d, --disk_size                                                [default: "20"]
  -o, --operator                                                [default: "Bgp"]
  -b, --bandwidth                                                 [default: "5"]
  -k, --keys                                              [default: "keys.json"]

copyright 2015, sightp.com
```

#### deleteHost
```bash
$ deleteHost -h
Usage: deleteHost [region] [host_id] -k [keys]

Options:
  -h, --help  Show help                                                [boolean]
  -k, --keys                                              [default: "keys.json"]

copyright 2015, sightp.com
```
