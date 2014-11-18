/**
 * userPermissions policy
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function(req, res, next) {

	return next();

  if (req.target && req.target.action) {

  	switch (req.token.permission) {
  		case 'admin': 
  		case 'edit' : return next();
  		case 'contribute': 
  			if (req.target.action !== 'destroy') return next();
  		case 'view': 
  			if (req.target.action == 'find') return next();
  		default: return res.forbidden('You cannot \'' + req.target.action + '\' with your permission level \'' + req.token.permission + '\'');
  	}
  } else {
	  return next();
  }	

};
