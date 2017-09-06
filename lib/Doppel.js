'use strict';

/*
 * Module dependencies
*/

var tweet = require('./tweet');

/*
 * Doppel class
*/

class Doppel {

	constructor(config){
		// Initialize configuration
		this.config = config;
		this.lex = {};

		// Create new link with Twitter NPM to hold account information
		this.link = new twitter(config.keys);
	}

	sayName(){
		console.log(`This Doppel's name is ${this.config.name}`);
	}

	getTweets(){
		this.link.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=Ganglegasm', function(error, tweets, response){
			console.log(tweets);
		});
	}

}

module.exports = Doppel;