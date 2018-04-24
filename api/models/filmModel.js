'use strict';

var mongoose = require('mongoose');

// Film Schema
var filmSchema = mongoose.Schema({
	oldId:{
		type: String,
		required: true
	},
	directorId:{
		type: String,
		required: true
	},
	directorName:{
		type: String,
		required: true
	},
	createDate:{
		type: Date,
		required: true
	},
	notes: {
		type: String,
		required: false
	},
	stars:{
		type: String,
		required: false
	},
	rating:{
		type: Number,
		required: true
	},
	watchDate:{
		type: Date,
		required: true
	},
	title:{
		type: String,
		required: true
	},
	topicId:{
		type: String,
		required: false
	},
	topicDesc:{
		type: String,
		required: false
	},
	year:{
		type: Number,
		required: true
	},
	userId:{
		type: Number,
		required: true
	}
});

var Film = module.exports = mongoose.model('Film', filmSchema);
