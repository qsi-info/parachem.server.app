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
    
  gateway: function (req, res) {
    return res.view({ layout: 'auth.layout.ejs' });
  },


	login: function (req, res) {
		if (req.query.client_id) {
			Client.findOne({ clientId: req.query.client_id})
			.then(function (client) {
				if (!client || client.login == 'signin') return res.view({ layout: 'auth.layout.ejs' });
				return res.redirect('/auth/http?client_id=' + req.query.client_id + '&response_type=' + req.query.response_type+ '&redirect_uri=' + req.query.redirect_uri);
			})
		} else {
			return res.view({ layout: 'auth.layout.ejs' });
		}
	},

	http: function (req, res) {
    var connect = require('../../node_modules/sails/node_modules/express/node_modules/connect');
    var auth = connect.middleware.basicAuth(function (username, password, handleCallback) {

    	// Fake the request by adding username and password to it.
      req.body.username = username;
      req.body.password = password;

      passport.authenticate('local', {session: false }, function (err, user, info) {
      	if (err || !user) handleCallback(err, false);
      	else req.logIn(user, function (err) {
      		handleCallback(err, user);
      	})
      })(req, res);

    });

    // Calling the HTTP authentification 
    auth(req, res, function () {
  		return res.redirect('/oauth/authorize?client_id=' + req.query.client_id + '&response_type=' + req.query.response_type+ '&redirect_uri=' + req.query.redirect_uri);
    });

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
      		return res.redirect('/oauth/authorize?client_id=' + req.body.client_id + '&response_type=' + req.body.response_type+ '&redirect_uri=' + req.body.redirect_uri);
      	}
      	if (user.type == 'admin') return res.redirect('/admin');
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
