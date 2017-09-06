'use strict';

// lexicon holds methods and events for parsing Tweets into stored Markov chain
var lexicon = {

	// Populate lexicon with Tweets from source 
	populateLex: function(lex, config, handler){

		// Get account sources from config and create URL - TODO cycle through multiple sources
		var src = config.source;
		var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name='+src[0];

		

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