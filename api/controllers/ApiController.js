/**
 * ApiController
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

module.exports = {
    
  
  me: function (req, res) {
  	var token = req.token;
  	if (token.userProvider == 'local') {
  		User.findOneByAccount(token.userAccount.split('@')[0])
  		.then(function (user) {
  			return res.json(user);
  		})
  		.fail(function (err) {
  			return res.json(err);
  		});
  	} else if (token.userProvider == 'ldap') {
  		LDAP.findUser(token.userAccount, function (err, user) {
  			if (err) return res.json(err);
  			return res.json(user);
  		});
  	} else {
  		return res.json({ message: 'invalid_user_provider' });
  	}
  },


  info: function (req, res) {
    var token = req.token;
    Client.findOne(token.client)
    .then(function (client) {
      return res.json(client);
    })
    .fail(function (err) {
      return res.json(err);
    })
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ApiController)
   */
  _config: {}

  
};
