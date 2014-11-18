var ActiveDirectory = require('activedirectory');

module.exports = (function () {

	var ad;

	return {

		authenticate: function (domain, username, password, cb) {
			console.log('LDAP::authenticate', domain, username);
			ad.getRootDSE(function (err, results) {
				if (err) return cb(err, false);
				// This is use for the IE integration because passportjs doesnt support no password.
				if (!password || password == sails.config.session.secret) {
					if (domain != sails.settings.LDAP_DOMAIN) {
						return cb(null, false);
					}
					ad.findUser(username, function (err, user) {
						if (err || !user) return cb(err, false);
						return cb(null, user);
					});
				}
				else {
					var account = domain + '\\' + username;
					console.log('account: ', account);
					ad.authenticate(account, password, function (err, isAuthenticated) {
						console.log('AD:_authenticate', err, isAuthenticated);
						if (err || !isAuthenticated) return cb(err, false);
						ad.findUser(username, function (err, user) {
							console.log('AD:_findUser', err, user);
							if (err || !user) return cb(err, false);
							return cb(null, user);
						})
					})					
				}
			});
		},

		findUser: function (username, cb) {
			console.log('LDAP::findUser', username);
			ad.findUser(username, function (err, user) {
				if (err || !user) return cb(err, false);
				return cb(null, user);
			})
		},

		configure: function (settings) {
			if (settings.LDAP_URL != '') {
				ad = new ActiveDirectory({
					url: settings.LDAP_URL,
					baseDN: settings.LDAP_BASEDN,
					username: settings.LDAP_DOMAIN + '\\' + settings.LDAP_USERNAME,
					password: settings.LDAP_PASSWORD,
				});
			}
		},


		isMemberOf: function (account, group, cb){
			ad.isUserMemberOf(account, group, function (err, isMember) {
				if (err) return console.log('is isMemberOf: ', err);
				return cb(isMember);
			});
		},

		userExists: function (account, cb) {
			ad.findUser(account, function (err, user) {
				if (err || !user) return cb(false);
				return cb(true);
			})
		}


	}


})();



