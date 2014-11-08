/**
 * AdminController
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
    
  
  index: function (req, res) {
  	return res.view();
  },


  client: function (req, res) {
  	Client.find()
  	.then(function (clients) {
  		return res.view({ clients: clients });
  	})
  	.fail(function (err) {
  		return console.log(err);
  	})
  },


  newClient: function (req, res) {
  	return res.view();
  },

  createClient: function (req, res) {
    Client.create(req.body)
    .then(function (client) {
      return res.redirect('/admin/client/dashboard/' + client.id);
    })
    .fail(function (err) {
      return res.view('500', { errors: err });
    })
  },


  clientDashboard: function (req, res) {
    Client.findOne(req.param('id'))
    .then(function (client) {
      if (!client) return res.redirect('/admin');
      return res.view({ client: client });
    })
    .fail(function (err) {
      return res.view('500', { errors: err });
    })
  },


  clientSettings: function (req, res) {
    Client.findOne(req.param('id'))
    .then(function (client) {
      if (!client) return res.redirect('/admin');
      return res.view({ client: client });
    })
    .fail(function (err) {
      return res.view('500', { errors: err });
    })    
  },


  clientAuthentification: function (req, res) {
    Client.findOne(req.param('id'))
    .then(function (client) {
      if (!client) return res.redirect('/admin');
      return res.view({ client: client });
    })
    .fail(function (err) {
      return res.view('500', { errors: err });
    })        
  },

  updateClient: function (req, res) {
    var id = req.body.id;
    if (req.body.strategy && !req.body.ie) {
      req.body.ie = false;
    }
    Client.update({ id: id }, req.body)
    .then(function (client) {
      return res.redirect('/admin/client/dashboard/' + id);
    })
    .fail(function (err) {
      console.log(err);
      return res.view('500', { errors: err });
    })    
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AdminController)
   */
  _config: {}

  
};















