/**
 * AuthController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


var passport = require('passport');


module.exports = {
    
  
	login: function (req, res) {
		console.log(req.protocol);
		console.log(req.host);
		console.log(req.port);
		return res.view({ layout: 'auth.layout.ejs' });
	},

	process: function (req, res) {
		passport.authenticate('local', function(err, user, info) {
			if (err) return console.log(err);
			if (info && !user) {
				req.flash('message', info);
      	if (req.body.client_id != '' && req.body.response_type != '' && req.body.redirect_uri != '') {
					return res.redirect('/login?client_id=' + req.body.client_id + '&response_type=' + req.body.response_type+ '&redirect_uri=' + req.body.redirect_uri);
				} else {
					return res.redirect('/login');
				}
			}
      req.logIn(user, function(err) {
      	if (err) return res.redirect('/login');
      	if (req.body.client_id != '' && req.body.response_type != '' && req.body.redirect_uri != '') {
      		return res.redirect('/oauth/authorization?client_id=' + req.body.client_id + '&response_type=' + req.body.response_type+ '&redirect_uri=' + req.body.redirect_uri);
      	}
      	if (user.permission == 'admin') return res.redirect('/admin');
      	return res.redirect('/');
      })
    })(req, res);		
	},

	logout: function (req, res) {
    req.logout();
    return res.redirect('/login');
	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AuthController)
   */
  _config: {}

  
};
