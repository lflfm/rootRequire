'use strict';
const path = require('path');
const fs = require('fs');

function _getCallerFile() { //https://stackoverflow.com/questions/16697791/nodejs-get-filename-of-caller-function
    var originalFunc = Error.prepareStackTrace;

    var callerfile;
    try {
        var err = new Error();
        var currentfile;

        Error.prepareStackTrace = function (err, stack) { return stack; };

        currentfile = err.stack.shift().getFileName();

        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName();

            if(currentfile !== callerfile) break;
        }
    } catch (e) {}

    Error.prepareStackTrace = originalFunc; 

    return callerfile;
}

function findRoot() {
	let thisPath = _getCallerFile();
	let done = false;
	while (!done && thisPath.length > 0) {
		if (fs.existsSync(path.join(thisPath, 'package.json'))) {
			done = true;
		}
		else {
			thisPath = thisPath.substr(0, thisPath.lastIndexOf(path.sep));
		}
	}
	if (thisPath.length <= 0) {
		throw new Error('rootRequire error #1 - no package.json found');
	}
	return thisPath;
}

function rootRequire(requirePath) {
	return require(path.join(findRoot(), requirePath));
}

module.exports = rootRequire;
