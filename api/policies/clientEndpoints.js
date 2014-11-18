/**
 * clientEnpoints policy
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function(req, res, next) {

	if (req.target && req.target.controller && req.token.endpoints) {
		var tokens = req.token.endpoints.split(',');
		for (var i=0, len=tokens.length; i < len; i++) {
			if (tokens[i].toLowerCase() == req.target.controller.toLowerCase()) {
				return next();
			}
		}
	}

	return res.forbidden('Client endpoints for \'' + req.target.controller + '\' is not authorized.');

};
