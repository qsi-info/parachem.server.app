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

    expires: {
      type: 'datetime',
    },

  	scope: {
  		type: 'string',
  	},

    permission: {
     type: 'string',
     enum: ['view', 'contribute', 'edit', 'none'],
     defaultsTo: 'view',
    },

    endpoints: {
      type: 'string',
      defaultsTo: '',
    },

  },


  beforeCreate: function (attrs, cb) {
  	attrs.token = Utils.accessToken();
    var date = new Date();
    date.setDate(date.getDate() + 1);
    attrs.expires = date;
  	cb();
  }

};




