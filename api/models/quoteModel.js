'use strict';

var mongoose = require('mongoose');

// Quote Schema
var quoteSchema = mongoose.Schema({
	oldId:{
		type: String,
		required: true
	},
	bookId:{
		type: String,
		required: false
	},
	bookTitle:{
		type: String,
		required: false
	},
	filmId:{
		type: String,
		required: false
	},
	filmTitle:{
		type: String,
		required: false
	},
	characterName:{
		type: String,
		required: false
	},
	quoteText:{
		type: String,
		required: false
	},
	userId:{
		type: Number,
		required: true
	}
});

var Quote = module.exports = mongoose.model('Quote', quoteSchema);
