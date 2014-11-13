/**
 * oauthBearer policy
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var passport = require('passport');

module.exports = function(req, res, next) {

	// Using JSONP on the client and simulating the Authorization: Bearer token.
	// This solution is use because the CORS doesnt seem to work in SailsJS.
	// req.headers.authorization = 'Bearer ' + req.query.token;

	passport.authenticate('bearer', { session: false }, function(err, token, info) {
		if (err) return console.log(err);
		if (!token && info) return res.json(info);
    req.token = token;
    // Client.findOne(token.client)
    // .then(function (client) {
    // 	if (!client) return res.forbidden('Unknown client application with id \'' + token.client + '\'');
    // 	req.client = client;
    // 	User.find
    // })
    return next();			
	})(req, res);

};
