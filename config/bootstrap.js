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


	User.findOneByAccount('admin', function (err, admin) {
		if (err) return console.log(err);
		if (admin) return cb();
		User.create({
			account: 'admin',
			password: 'admin',
			displayName: 'Administrator',
			permission: 'admin',
		})
		.then(function (admin) {
			cb();
		})
		.fail(function (err) {
			return console.log(err);
		})
	})


};