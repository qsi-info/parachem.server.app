var passport       = require('passport')
var LocalStrategy  = require('passport-local').Strategy;
var bcrypt         = require('bcrypt');
var BasicStrategy  = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;



passport.serializeUser(function(user, done) {
	// LDAP User
	if (user.sAMAccountName) {
		done(null, user.sAMAccountName);
	} else {
	  done(null, user.id);
	}
});

passport.deserializeUser(function(idORSAMAccount, done) {
  User.findOne(idORSAMAccount, function (err, user) {
  	if (err) return console.log(err);
  	if (!user) return LDAP.findUser(idORSAMAccount, done);
  	return done(err, user);
  })
});




/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a username and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
passport.use(new LocalStrategy({ passReqToCallback: true }, function (req, username, password, done) {

	// If the user is the admin or a local user
	if (username == 'admin' || username.split('@')[1] == sails.settings.LOCAL_DOMAIN) {
		username = username.split('@')[0];
		User.findOne()
		.where({ account: username })
		.then(function (user) {
			if (!user) return done(null, user, { message: 'Invalid account'});
			bcrypt.compare(password, user.password, function (err, isIdentical) {
				if (err) return done(err, false);
				if (!isIdentical) return done(err, false, { message: 'Wrong password'});
				if (isIdentical) return done(null, user);
			});
		})
		.fail(function (err) { return done(err, false); })		

	} else {

		// IF using IE the domain is sent with the request.
		var domain = (req.body.domain && req.body.domain != '') ? req.body.domain : sails.settings.LDAP_DOMAIN;

		// LDAP Search
		LDAP.authenticate(domain, username, password, function (err, user) {
			if (err || !user) return done(null, false, { message: 'Active Directory authentification failed' });
			done(null, user);
		});

	}



}));





/**
 * BasicStrategy
 *
 * These strategies are used to authenticate registered OAuth clients.  They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens.  The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate.  Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header).  While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
passport.use(new BasicStrategy(function (username, password, done) {
	console.log('basic auth');
  User.findOne({ account: username }, function (err, user) {
  	if (err) return done(err, false);
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password, function(err, isIdentical) {
      if(err) return done(err, false);
      if (!isIdentical) return done(null, false, { message: 'Invalid password' });
      return done(null, user);
    });
  });
}));




/**
 * BearerStrategy
 *
 * This strategy is used to authenticate users based on an access token (aka a
 * bearer token).  The user must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use(new BearerStrategy (function (accessToken, done) {
	AccessToken.findOne({ token: accessToken })
	.then(function (token) {
		if (!token) return done(null, false, { message: 'invalid_token' });
		// Implement expiration verification if needed

		done(null, token);

		// User.findOne(token.user)
		// .then(function (user) {
		// 	if (!user) return done(null, false, { message: 'user_not_found' });
		// 	return done(null, user);
		// })
		// .fail(done);
	})
	.fail(done);
}));




















