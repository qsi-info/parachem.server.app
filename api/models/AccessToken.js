/**
 * AccessToken
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  usage: 'admin',

  attributes: {
  	
  	user: {
  		type: 'string',
  		required: true,
  	},

    userProvider: {
      type: 'string',
      defaultsTo: 'local',
    },

  	client: {
  		type: 'string',
  		required: true,
  	},

  	token: {
  		type: 'string',
  	},

  	scope: {
  		type: 'string',
  	},

    permission: {
     type: 'string',
     enum: ['view', 'contribute', 'edit', 'admin'],
     defaultsTo: 'view',
    },

  },


  beforeCreate: function (attrs, cb) {
  	attrs.token = Utils.accessToken();
  	cb();
  }

};




