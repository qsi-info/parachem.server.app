/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	

  	permission: {
  		type: 'string',
  		enum: ['view', 'contribute', 'edit', 'admin'],
  		defaultsTo: 'view',
  	},

	  account: {
	  	type: 'string',
	  	required: true,
	  	unique: true,
	  },

	  password: {
	  	type: 'string',
	  	required: true,
	  },

	  displayName: {
	  	type: 'string',
	  	required: true,
	  },

	  provider: {
	  	type: 'string',
	  	enum: ['ldap', 'local'],
	  	defaultsTo: 'local',
	  },

    // Override toJSON method to remove password from API
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }  	
 
  },


	beforeCreate: function(attrs, cb) {
    var bcrypt = require('bcrypt');
	  bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(attrs.password, salt, function(err, hash) {
	      if (err) return cb(err);
        attrs.password = hash;
        return cb();
	  	});
	  })
	},  

};
