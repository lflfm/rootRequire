'use strict';
const path = require('path');
const fs = require('fs');

function _getCallerFile() { //https://stackoverflow.com/questions/16697791/nodejs-get-filename-of-caller-function
	let originalFunc = Error.prepareStackTrace;

	let callerfile;
	try {
		let err = new Error();
		let currentfile;

		Error.prepareStackTrace = function(_err, stack) { return stack; };

		currentfile = err.stack.shift().getFileName();

		while (err.stack.length) {
			callerfile = err.stack.shift().getFileName();

			if (currentfile !== callerfile) break;
		}
	}
	catch (e) {}

	Error.prepareStackTrace = originalFunc;
	if (callerfile == 'REPL' || callerfile == 'REPL2') return '';
	return callerfile;
}

function rootPath() {
	let thisPath = _getCallerFile();
	if (thisPath && thisPath.length > 0) {
		if (!fs.existsSync(path.join(thisPath, 'package.json'))) {
			thisPath = thisPath.substr(0, thisPath.lastIndexOf(path.sep));
		}
	} else {
		thisPath = process.cwd();
		if (!thisPath || thisPath.length<=0) thisPath = __dirname;
	}
	if (!thisPath || thisPath.length <= 0) {
		throw new Error('rootRequire error #1 - cannot determine root path');
	}
	return thisPath;
}

function rootJoin(...paths){
	return path.join(rootPath(),...paths);
}

function rootRequire(requirePath) {
	return require(rootJoin(requirePath));
}

module.exports = {
	rootRequire,
	rootPath,
	rootJoin,
}