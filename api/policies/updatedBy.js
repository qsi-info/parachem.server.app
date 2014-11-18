/**
 * updatedBy policy
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function(req, res, next) {
  if (req.query || req.body) {
  	if (req.target && req.target.action == 'update') {
	  	req.query.updatedBy = req.token.userAccount;
	  	req.body.updatedBy = req.token.userAccount
  	}
	}
  return next();
};