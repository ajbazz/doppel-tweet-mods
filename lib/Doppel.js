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
		if(!config.source || config.source.length <= 0){
			throw 'Error: Must include at least one source in config.';
		} else {
			config.source.forEach(k => {
				this.source.push({
					userName: k,
					mostRecentTweetId: 0
				});
			});
		}

		// Add Twitter API keys
		this.keys = config.keys;

		// Create new link with Twitter NPM to hold account information for each Doppel instance
		this.link = new twitter(this.keys);
	}

	// Find all new Tweets and add to lexicon
	updateLex(){
		// TODO run through all source users and parse all Tweets
		var tweetList = [];
		this.getTweets(this.source[0].userName, this.source[0].mostRecentTweetId, 0, tweetList, this);
	}

	// Receives a single set of Tweets and will rerun if more are available.
	getTweets(userName, afterId, beforeId, list, doppel){
		// Create API URL
		var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=10&include_rts=false&screen_name' + userName;

		// When called on first run, will not include a max ID since we don't know how many new Tweets have been made
		if(afterId != 0) url += '&since_id=' + afterId
		if(beforeId != 0) url += '&max_id=' + beforeId;

		this.link.get(url, function(error, tweets, response){
			for(var i = 0; i < tweets.length; i++){
				console.log(tweets[i].text);
			}
		});
	}
}

module.exports = Doppel;