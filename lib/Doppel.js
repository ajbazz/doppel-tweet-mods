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
		this.name = config.name || 'Doppelgänger';
		this.source = [];

		// Add source accounts to list with data for first and last Tweets parsed
		config.source.forEach(k => {
			this.source.push({
				userName: k,
				firstCount: 0,
				lastCount: 0
			});
		});

		// Add Twitter API keys
		this.keys = config.keys;

		// Create new link with Twitter NPM to hold account information for each Doppel instance
		this.link = new twitter(this.keys);
	}

	getTweets(){
		// TODO run through all source users and parse all Tweets
		this.link.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=Ganglegasm&count=100&include_rts=false', function(error, tweets, response){
			for(var i = 0; i < tweets.length; i++){
				console.log(tweets[i].text);
			}
		});
	}

	speak(){
		console.log(this.source);
	}

}

module.exports = Doppel;