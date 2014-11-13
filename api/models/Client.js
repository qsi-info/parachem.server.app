/**
 * Client
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  usage: 'admin',

  attributes: {
  	
  	name: {
  		type: 'string',
  		required: true,
  	},

  	redirectURI: {
  		type: 'string',
  		required: true,
  	},

    icon: {
      type: 'string',
      required: true,
    },

  	login: {
  		type: 'string',
  		enum: ['http', 'signin'],
  		defaultsTo: 'http',
  	},

  	strategy: {
  		type: 'string',
  		enum: ['full', 'local', 'mix'],
  		defaultsTo: 'local',
  	},


    ie: {
      type: 'boolean',
      defaultsTo: false,
    },

    everyone: {
      type: 'string',
      enum: ['none', 'view', 'contribute', 'edit'],
      defaultsTo: 'view',
    },

    viewLDAPGroup: {
      type: 'string',
      defaultsTo: 'NONE',
    },

    contributeLDAPGroup: {
      type: 'string',
      defaultsTo: 'NONE',
    },

    editLDAPGroup: {
      type: 'string',
      defaultsTo: 'NONE',
    },

    endpoints: {
      type: 'string',
      defaultsTo: '',
    },

  	clientId: {
  		type: 'string',
  	},

  	clientSecret: {
  		type: 'string',
  	},

  	trusted: {
  		type: 'boolean',
  		defaultsTo: true,
  	},


    // Override toJSON method to remove password from API
    toJSON: function() {
      var obj = this.toObject();
      delete obj.clientSecret;
      return obj;
    }   


  },


  beforeCreate: function (attrs, cb) {
  	attrs.clientId = Utils.clientId();
  	attrs.clientSecret = Utils.clientSecret();
  	cb();
  },


  beforeDestroy: function (criteria, cb) {
    Client.findOne(criteria.where.id)
    .then(function (client) {
      AccessToken.destroy({ client: client.clientId }).exec(function () {});
      UserApplicationPermission.destroy({ client: client.id }).exec(function () {});
      cb();
    })
    .fail(cb)
  }


};











