/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {


	sails.config.appName = 'API Server',

	// test


	User.findOneByAccount('admin', function (err, admin) {
		if (err) return console.log(err);
		if (admin) {
			console.log('admin');			
			Setting.find()
			.then(function (settings) {
				sails.settings = settings[0];
				LDAP.configure(sails.settings);				
				cb();
			})
		} else {
			console.log('else');			
			User.create({
				account: 'admin',
				password: 'admin',
				displayName: 'Administrator',
				type: 'admin',
			})
			.then(function (admin) {
				console.log('create admin');			
				Setting.find()
				.then(function (settings) {
					if (settings.length < 1) {
						Setting.create({})
						.then(function (setting) {
							sails.settings = setting;
							LDAP.configure(sails.settings);
							cb();
						})
					} else {
						sails.settings = settings[0];
						LDAP.configure(sails.settings);
						cb();
					}
				})
				.fail(function (err) {
					return console.log(err);
				})			
			})
			.fail(function (err) {
				return console.log(err);
			})			
		}
	})

};