var oauth2orize = require('oauth2orize');
var passport    = require('passport');
var login       = require('connect-ensure-login');
var bcrypt      = require('bcrypt');
var Q           = require('q');



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

	var auth = client.strategy;

	if (user.account == 'admin') {
		auth = 'local';
	}


	if (user.provider == 'local' && auth != 'full') {

    UserApplicationPermission.findOne({ client: client.id, userId: user.id })
    .then(function (permission) {
    	if (permission) {
    		create_token(client, user, permission.permission, done);
    	} else {
    		UserApplicationPermission.create({ client: client.id, permission: client.everyone, userId: user.id })
    		.then(function (permission) {
	    		create_token(client, user, permission.permission, done);
    		})
    		.fail(done);
    	}
    })			
		.fail(done);

		// LDAP User
	} else if (!user.provider && auth !== 'local') {
		get_ldap_permissions(client, user, done);

	} else {
		done(null, false);
	}

}));



module.exports = {
	express: {
		
		customMiddleware: function (app) {

  	  app.use(passport.initialize());
	    app.use(passport.session());

			app.get('/oauth/authorize', [
				function (req, res, next) {
					if (req.user) return next();
					var clientId = req.param('client_id');
					var responseType = req.param('response_type');
					var redirectURI = req.param('redirect_uri');
					Client.findOne({ clientId: clientId })
					.then(function (client) {
						if (!client) {
							return res.redirect('/login?client_id=' + clientId + '&response_type=' + responseType + '&redirect_uri=' + redirectURI);
						}
						if (client.ie && client.strategy != 'local') {
							return res.redirect('/gateway?client_id=' + clientId + '&response_type=' + responseType + '&redirect_uri=' + redirectURI);
						}
						return res.redirect('/login?client_id=' + clientId + '&response_type=' + responseType + '&redirect_uri=' + redirectURI);
					})
					.fail(function (err) {
						return console.log(err);
					})
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





function get_ldap_permissions (client, user, done) {

  var promises = [];


  var deferredEdit = Q.defer();
  LDAP.isMemberOf(user.sAMAccountName, client.editLDAPGroup, function (isMember) {
    deferredEdit.resolve(isMember);
  });
  promises.push(deferredEdit.promise)

  var deferredContribute = Q.defer();
  LDAP.isMemberOf(user.sAMAccountName, client.contributeLDAPGroup, function (isMember) {
    deferredContribute.resolve(isMember);
  });
  promises.push(deferredContribute.promise)

  var deferredView = Q.defer();
  LDAP.isMemberOf(user.sAMAccountName, client.viewLDAPGRoup, function (isMember) {
    deferredView.resolve(isMember);
  });
  promises.push(deferredView.promise)

  var tokenPermission = 'none';
  Q.all(promises).then(function (memberships) {
    if (memberships[0] || client.everyone == 'edit') {
      tokenPermission = 'edit';
    } 
    else if (memberships[1] || client.everyone == 'contribute') {
      tokenPermission = 'contribute';
    } 
    else if (memberships[2] || client.everyone == 'view') {
      tokenPermission = 'view';
    }

    if (tokenPermission == 'none') {
    	return done(null, false);
    }
		create_token(client, user, tokenPermission, done);
  //   AccessToken.create({ client: client.id, user: user.sAMAccountName, permission: tokenPermission, userProvider: 'ldap' })
		// .then(function (accessToken) {
		// 	return done(null, accessToken.token);
		// })
		// .fail(done);	    		
  })
  .fail(done)	
}




function create_token (client, user, tokenPermission, done) {
	var userAccount = user.account ? (user.account + '@' + sails.settings.LOCAL_DOMAIN) : user.sAMAccountName;
	var userProvider = user.id ? 'local' : 'ldap';
	AccessToken.destroy({ client: client.id, userAccount: userAccount })
	.then(function () {
	  AccessToken.create({ client: client.id, userAccount: userAccount, permission: tokenPermission, userProvider: userProvider, endpoints: client.endpoints })
		.then(function (accessToken) {
			return done(null, accessToken.token);
		})
		.fail(done);	    					
	})
	.fail(done);
}








