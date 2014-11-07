module.exports = function (req, res, next) {

	if (req.isAuthenticated() && req.user.permission == 'admin') {
		return next();
	}
	return res.forbidden();

}