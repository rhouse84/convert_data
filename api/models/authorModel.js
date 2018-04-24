'use strict';

var mongoose = require('mongoose');

// Author Schema
var authorSchema = mongoose.Schema({
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

var Author = module.exports = mongoose.model('Author', authorSchema);
