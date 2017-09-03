'use strict';

/*
 * Module dependencies
*/

var lexicon = require('./lexicon');
var lifecycle = require('./lifecycle');
var tweet = require('./tweet');

exports = module.exports = createDoppel;

/*
 * Create a new empty Doppel with supplied configuration
*/

function createDoppel(config){
	// Initialize configuration
	this.config = config;
	this.lex = {};

	// Populate an empty lexicon with Tweets from source accounts
	this.initialize = function(){
		lexicon.populateLex(this.lexicon, this.config.source);
	}
}