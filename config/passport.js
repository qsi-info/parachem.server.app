var passport      = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var bcrypt        = require('bcrypt');



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne(id, function (err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(function (username, password, done) {
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
}));








module.exports.express = {
  customMiddleware: function(app) {
    app.use(passport.initialize());
    app.use(passport.session());
  }
};