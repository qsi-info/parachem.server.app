var uid = require('uid');

module.exports.accessToken = function () {
	return uid(255);
}


module.exports.clientId = function () {
	return uid(10);
}

module.exports.clientSecret = function () {
	return uid(30);
}

