'use strict';

var mongoose = require('mongoose');

// User Schema
var userSchema = mongoose.Schema({
	id:{
		type: Number,
		required: true
	},
	name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	lastLogOn:{
		type: Date,
		required: true
	},
	adminUser:{
		type: Boolean,
		required: true
	}
});

var User = module.exports = mongoose.model('User', userSchema);
