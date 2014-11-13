/**
 * createdBy policy
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */


module.exports = function(req, res, next) {
	if (req.body || req.query) {
	  if(req.target && req.target.action == 'create') {
	  	req.query.createdBy = req.token.user;
	  	req.query.updatedBy = req.token.user;
	  	req.body.createdBy = req.token.user;
	  	req.body.updatedBy = req.token.user;
	  }
	}
  return next();
};