/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

 module.exports = function (req, res, next) {

	if (req.isAuthenticated() && req.user.type == 'admin') {
		return next();
	}
	return res.forbidden();

}