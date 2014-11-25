/**
 * QuarterReport
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	type: {
  		type: 'string',
  		enum: ['444', 'SA'],
  		required: true,
  	},

  	period: {
  		type: 'string',
  		enum: ['day', 'night'],
  		required: true,
  	},

  	group: {
  		type: 'string',
  		enum: ['A', 'B', 'C', 'D', 'E'],
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
