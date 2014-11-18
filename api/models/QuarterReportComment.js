/**
 * QuarterReportComment
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  tableName: 'QuarterReportComment',

  attributes: {
  	
    report: {
      type: 'string',
      required: true,
    },

  	text: {
  		type: 'text',
  		defaultsTo: '',
  	},

  	section: {
  		type: 'string',
  		// Add all the other sections.
  		enum: ['hydrogene', 'paraxylene', 'stdp', 'chaudieres', 'tours', 'divers', 'personnel', 'securite'],
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
