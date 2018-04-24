'use strict';

var mongoose = require('mongoose');

// Director Schema
var directorSchema = mongoose.Schema({
	oldId:{
		type: String,
		required: true
	},
	name:{
		type: String,
		required: true
	},
	namelc:{
		type: String,
		required: true
	},
	userId:{
		type: Number,
		required: true
	}
});

var Director = module.exports = mongoose.model('Director', directorSchema);
