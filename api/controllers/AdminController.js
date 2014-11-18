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


var Q = require('q');

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
      console.log(err);
      return res.view('500', { errors: err });
    })
  },


  clientDashboard: function (req, res) {
    Client.findOne(req.param('id'))
    .then(function (client) {
      if (!client) return res.redirect('/admin');
      AccessToken.count({ client: client.id })
      .then(function (count) {
        return res.view({ client: client, tokenCount: count });
      })
      .fail(function (err) {
        console.log(err);
        return res.view('500', { errors: err });
      })
    })
    .fail(function (err) {
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      return res.view('500', { errors: err });
    })    
  },


  clientEndpoints: function (req, res) {
    Client.findOne(req.param('id'))
    .then(function (client) {
      if (!client) return res.redirect('/admin');
      return res.view({ client: client });
    })
    .fail(function (err) {
      console.log(err);
      return res.view('500', { errors: err });
    })    
  },


  updateEndpoints: function (req, res) {
    var id = req.body.id;
    var endpoints = req.body.endpoints;
    var acc = '';
    _.each(endpoints, function (value, key) {
      acc += key + ',';
    });

    var endpointsStr = acc.substring(0, acc.length - 1);

    Client.update({ id: id }, { endpoints: endpointsStr })
    .then(function (clients) {
      return res.redirect('/admin/client/dashboard/' + id);      
    })
    .fail(function (err) {
      console.log(err);
      return res.view('500', { errors: err });
    })    
  },


  clientUsers: function (req, res) {
    var client = req.param('id');
    UserApplicationPermission.find()
    .where({ client: client })
    .then(function (permissions) {
      var promises = [];
      permissions.forEach(function (permission) {
        var deferred = Q.defer();
        User.findOne(permission.userId)
        .then(function (user) {
          user.permission = permission.permission
          deferred.resolve(user);
        })
        .fail(function (err) {
          console.log(err);
          return res.view('500', { errors: err });
        })
        promises.push(deferred.promise);
      })
      return Q.all(promises);
    })
    .then(function (users) {
      Client.findOne(client)
      .then(function (client) {
        return res.view({ users: users, client: client })
      })
      .fail(function (err) {
        console.log(err);
        return res.view('500', { errors: err });
      })        
    })
    .fail(function (err) {
      console.log(err);
      return res.view('500', { errors: err });
    })        
  },

  user: function (req, res) {
    User.find()
    .where({ type: 'user' })
    .then(function (users) {
      return res.view({ users: users });
    })
    .fail(function (err) {
      console.log(err);
      return res.view('500', { errors: err });
    })    
  },



  settings: function (req, res) {
    return res.view();
  },

  ldap: function (req, res) {
    return res.view();    
  },

  updateSettings: function (req, res) {
    var id = req.body.id;
    Setting.update({ id: id }, req.body)
    .then(function (settings) {
      sails.settings = settings[0];
      return res.redirect('/admin');
    })
    .fail(function (err) {
      console.log(err);
      return res.view('500', { errors: err });
    })    
  },


  newUser: function (req, res) {
    return res.view();
  },


  createUser: function (req, res) {
    User.create(req.body)
    .then(function (user) {
      return res.redirect('/admin/user');
    })
    .fail(function (err) {
      console.log(err);
      return res.view('500', { errors: err });
    })    
  },


  editUser: function (req, res) {
    User.findOne(req.param('id'))
    .then(function (user) {
      if (!user) return res.view('404');
      return res.view({ user: user });
    })
    .fail(function (err) {
      console.log(err);
      return res.view('500', { errors: err });
    })    
  },

  updateUser: function (req, res) {
    var id = req.body.id;
    User.update({ id: id }, req.body)
    .then(function (users) {
      return res.redirect('/admin/user');
    })
    .fail(function (err) {
      console.log(err);
      return res.view('500', { errors: err });
    })    
  },


  updateClientUser: function (req, res) {
    UserApplicationPermission.update({ client: req.body.client, user: req.body.user }, req.body)
    .then(function (results) {
      return res.redirect('/admin/client/users/' + req.body.client);
    })
    .fail(function (err) {
      console.log(err);
      return res.view('500', { errors: err });
    })        
  },


  deleteUserPermission: function (req, res) {
    UserApplicationPermission.destroy(req.body).exec(function (err) {
      if (err) return res.json(err);
      return res.json({ status: 'ok' });
    });
  },

  revokeToken: function (req, res) {
    AccessToken.destroy(req.body).exec(function (err) {
      if (err) return res.json(err);
      return res.json({ status: 'ok' });      
    })
  },



  clientCount: function (req, res) {
    Client.count()
    .then(function (count) {
      return res.json({ count: count });
    })
    .fail(function (err) {
      return res.json(err);
    })
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AdminController)
   */
  _config: {}

  
};















