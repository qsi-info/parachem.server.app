module.exports = function (req, res, next) {

	if (req.isAuthenticated() && req.user.type == 'admin') {
		return next();
	}
	return res.forbidden();

}