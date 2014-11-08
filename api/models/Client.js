/**
 * Client
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

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
      defaultsTo: 'none',
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


  },


  beforeCreate: function (attrs, cb) {
  	attrs.clientId = Utils.clientId();
  	attrs.clientSecret = Utils.clientSecret();
  	cb();
  },


  beforeDestroy: function (criteria, cb) {
    // Implement the destroy access token when client is destroy.
    cb()
  }


};











