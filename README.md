# rootRequire
## Simple module to use relative paths when requiring files

## sample usage
```Javascript
const { rootRequire, rootPath, rootJoin } = require('rootRequire');
const something1 = rootRequire('src/path/to/file'); //use this
const something2 = require('../../path/to/file'); //instead of this

//use this:
response.sendFile(rootJoin('/views/index.html'));
//or this:
response.sendFile(rootPath() + '/views/index.html');
//instead of this:
response.sendFile(__dirname + '/views/index.html');
```
