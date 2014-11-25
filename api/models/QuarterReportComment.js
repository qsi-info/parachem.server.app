/**
 * QuarterReportComment
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
    report: {
      type: 'string',
      required: true,
    },

  	section: {
  		type: 'string',
  		enum: ['securite', 'chaudieres', 'hydrogene', 'paraxylene', 'stdp', 'tours', 'divers', 'personnel'],
  		required: true,
  	},

  	text: {
  		type: 'string',
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
