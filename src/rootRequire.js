'use strict';
const path = require('path');
const fs = require('fs');

function findRoot() {
	let thisPath = module.parent.filename;
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
