/**
 * UserApplicationPermission
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  tableName: 'AdminUserApplicationPermission',
  usage: 'admin',

  attributes: {
  	
  	userId: {
  		type: 'string',
  		required: true,
  	},

  	client: {
  		type: 'string',
  		required: true,
  	},

    permission: {
     type: 'string',
     enum: ['view', 'contribute', 'edit', 'none'],
     defaultsTo: 'view',
    },  	
    
  }

};
