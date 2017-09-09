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
	initialize(){
		// TODO run through all source users and parse all Tweets
		var tweetList = [];
		this.getTweets(this.source[0].userName, this.source[0].mostRecentTweetId, 0, 0, tweetList, this, false);
	}

	// Receives a single set of Tweets and will rerun if more are available.
	getTweets(userName, afterId, beforeId, sourceNum, list, doppel, includeMax){
		// Create API URL
		var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=200&include_rts=false&screen_name' + userName;

		// Ensure proper ID formats - will not have IDs on first run; only retreiving most recent.
		if(afterId != 0) url += '&since_id=' + afterId;
		if(beforeId != 0) url += '&max_id=' + beforeId;

		console.log(url);

		this.link.get(url, function(error, tweets, response){

			var minId = 0;
			var totalTweets = tweets.length;

			// End recursion if no more Tweets are grabbed
			if(!totalTweets) {
				console.log('return');
				return(list);
			}

			for(var i = 0; i < totalTweets; i++){

				list.push(tweets[i].text);

				// Add max Tweet ID to Dopple
				var id = tweets[i].id;

				// Set most recent Tweet ID of the selected user so as to not get duplicates in future updates
				if(id > doppel.source[sourceNum].mostRecentTweetId){
					doppel.source[sourceNum].mostRecentTweetId = (id + 100);
				}
				minId = id;
			}

			// Initialize doesn't include max since we're grabbing every Tweet
			if(includeMax)
				afterId = doppel.source[sourceNum].mostRecentTweetId;

			console.log('------ROUND------');
			console.log(list);

			// TODO - Need to modify this so if works kindof in reverse
			doppel.getTweets(userName, afterId, minId-100, sourceNum, list, doppel);

		});
	}
}

module.exports = Doppel;