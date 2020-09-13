# rootRequire
## Simple module to use relative paths when requiring files

## sample usage
```Javascript
const rootRequire = require('rootRequire');
const something1 = rootRequire('src/path/to/file'); //use this
const something2 = require('../../path/to/file'); //instead of this
```
