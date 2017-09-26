var Doppel = require('../index.js');
var twitterConfig = require('./config.js');

function scrub(text){
	return text.replace(/["]+/g, '');
}

// Create new Doppel with configuration
var d1 = new Doppel('timnocontext', twitterConfig, scrub);

d1.update(function(){
	var phrase = d1.generate();
	// d1.tweet();
});