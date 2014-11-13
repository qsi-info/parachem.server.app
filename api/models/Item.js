/**
 * Item
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {


  schema: true,

  attributes: {
  	
  	title: {
  		type: 'string',
  		required: true,
  	},

  	createdBy: {
  		type: 'string',
  		required: true,
  	},

  	updatedBy: {
  		type: 'string',
  		required: true,
  	}

  }

};
