// Import Doppel class
var Doppel = require('../index.js');

// Config for connecting to Twitter (usually use env variable)
var twitterConfig = require('./config.js');

var testText = '"You are the opposite of a Swiss Army knife, but, like a baby that looks worse."';

function scrub(text){
	return text.replace(/["]+/g, '');
}

// Create new Doppel with configuration
var d1 = new Doppel('timnocontext', twitterConfig, scrub);

// Testing

d1.update(function(){
	var phrase = d1.generate();
	// d1.tweet(phrase);
});