'use strict';

/*
 * Module dependencies
*/

var twitter = require('twitter');

/*
 * Doppel class is the controller of Tweets, text parsing, and loading/saving data
*/

class Doppel {

	constructor(config){
		// Initialize configuration
		// TODO check for errors
		this.name = config.name;
		this.source = config.source;
		this.keys = config.keys;

		// Create new link with Twitter NPM to hold account information for each Doppel instance
		this.link = new twitter(this.keys);
	}

	getTweets(){
		// TODO run through all source users and parse all Tweets
		this.link.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=Ganglegasm', function(error, tweets, response){
			
		});
	}

	sayName(){
		console.log(`The name of this Doppel is ${this.name}`);
	}

}

module.exports = Doppel;