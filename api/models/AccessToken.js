/**
 * AccessToken
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	user: {
  		type: 'string',
  		required: true,
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

  },


  beforeCreate: function (attrs, cb) {
  	attrs.token = Utils.accessToken();
  	cb();
  }

};




