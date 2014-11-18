/**
 * QuarterReport
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  tableName: 'QuarterReport',

  attributes: {
  	
  	type: {
  		type: 'string',
  		// required: true,
  		enum: ['444'],
  	},

  	period: {
  		type: 'string',
  		enum: ['day', 'night'],
  	},

    team: {
      type: 'string',
      enum: ['A', 'B', 'C', 'D', 'E'],
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
