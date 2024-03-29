/**
 * Setting
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  tableName: 'AdminSetting',
  usage: 'admin',

  attributes: {
  	
  	LDAP_URL: {
  		type: 'string',
  		defaultsTo: '',
  	},

  	LDAP_DOMAIN: {
  		type: 'string',
  		defaultsTo: '',
  	},

  	LDAP_BASEDN: {
  		type: 'string',
  		defaultsTo: '',
  	},

  	LDAP_USERNAME: {
  		type: 'string',
  		defaultsTo: ''
  	},

  	LDAP_PASSWORD: {
  		type: 'string',
  		defaultsTo: '',
  	},

  	LOCAL_DOMAIN: {
  		type: 'string',
  		defaultsTo: 'local',
  	},

    SERVER_NAME: {
      type: 'string',
      defaultsTo: 'API Server',
    },

    

  }

};
