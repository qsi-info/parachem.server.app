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
      defaultsTo: '444',
  	},

  	period: {
  		type: 'string',
  		enum: ['day', 'night'],
      defaultsTo: 'day',
  	},

    team: {
      type: 'string',
      enum: ['A', 'B', 'C', 'D', 'E'],
      defaultsTo: 'A',
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
