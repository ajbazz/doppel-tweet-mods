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
		this.name = config.name || 'Doppelgänger';

		// Add source accounts to list with data for first and last Tweets parsed
		if(!config.source || config.source.length <= 0){
			throw 'Error: Must include at least one source in config.';
		} else {
			this.source = config.source;
			this.lastUpdate = 0;
		}

		// Add Twitter API keys
		if(!config.keys){
			throw 'Error: Must include Twitter API key configuration data.';
		} else {
			this.keys = config.keys;
		}

		// Create new link with Twitter NPM to hold account information for each Doppel instance
		this.twitterLink = new twitter(this.keys);
	}

	initialize(){
		// Get new tweets and build lexicon
		this.getNewTweets(this).then(function(tweets){
			console.log(tweets);
		});
	}

	getNewTweets(doppel){

		return new Promise(function(resolve){

			// Create URL
			var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=';

			url += doppel.source;
			url += '&include_rts=false';
			doppel.lastUpdate ? url += '&since_id=' + doppel.lastUpdate : null;

			var tweetList = [];

			doppel.twitterLink.get(url, function(err, tweets, response){
				
				for(var i = 0; i < tweets.length; i++){
					// Update most recent Tweet number to not receive duplicate Tweets
					if (!i) doppel.lastUpdate = tweets[0].id
					tweetList.push(tweets[i].text);
				}

				resolve(tweetList);
			});
		});
	}	
}

module.exports = Doppel;