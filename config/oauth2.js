var oauth2orize = require('oauth2orize');
var passport    = require('passport');
var login       = require('connect-ensure-login');
var bcrypt      = require('bcrypt');




// Create OAuth 2.0 server
var server = oauth2orize.createServer();


server.serializeClient(function(client, done) {
  return done(null, client.id);
});

server.deserializeClient(function(id, done) {
	Client.findOne(id, function(err, client) {
  	if (err) return done(err);
    return done(null, client);
  });
});



/**
 * OAuth2 - Implicit grant
 * This function create an access token for a login user and a register and trusted 
 * application. Need to implement scope and refresh token if needed.
 */
server.grant(oauth2orize.grant.token(function (client, user, ares, done) {
	AccessToken.destroy({ client: client.clientId, user: user.id })
	.then(function () {
		AccessToken.create({ client: client.clientId, user: user.id })
		.then(function (accessToken) {
			return done(null, accessToken.token);
		})
		.fail(done);
	})
	.fail(done);
}));



module.exports = {
	express: {
		
		customMiddleware: function (app) {

  	  app.use(passport.initialize());
	    app.use(passport.session());

			app.get('/oauth/authorize', [
				function (req, res, next) {
					if (req.user) return next();
					return res.redirect('/login?client_id=' + req.param('client_id') + '&response_type=' + req.param('response_type') + '&redirect_uri=' + req.param('redirect_uri'));
				},
				server.authorization(function (clientId, redirectURI, done) {
					Client.findOne({ clientId: clientId, redirectURI: redirectURI })
					.then(function (client) {
						if (!client) return done(null, false);
						return done(null, client, client.redirectURI);
					})
					.fail(function (err) {
						return done(err);
					})
				}),
				server.errorHandler(),
				function(req, res) {
					return res.render('auth/decision', { transactionID: req.oauth2.transactionID });
				},				
			]);

			app.post('/oauth/decision', [
				login.ensureLoggedIn(),
				server.decision(),
				server.errorHandler()
			]);

		}
	}
}
















