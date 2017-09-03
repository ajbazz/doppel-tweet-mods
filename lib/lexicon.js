'use strict';

var twitter = require('twitter');

var lexicon = {
	populateLex: function(lex, src){
		console.log("Populate Lexicon");
	},

	updateLex: function(){
		console.log("Update Lexicon");
	},

	exportLex: function(){
		console.log("Export Lexicon");
	},

	importLex: function(){
		console.log("Import Lexicon");
	}
}

module.exports = lexicon;