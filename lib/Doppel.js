'use strict';

/*
 * Module dependencies
*/

var twitter = require('twitter');
var lexicon = require('./lexicon');

/*
 * Doppel class is the controller of Tweets, text parsing, and loading/saving data
*/

class Doppel {

	constructor(source, keys, scrub, polish){

		// Add source information
		if(!source){
			throw 'Error: Must include at least one source in config.';
		} else {
			this.source = source;
			this.lastUpdate = 0;
		}

		// Add Twitter API keys
		if(!keys){
			throw 'Error: Must include Twitter API key configuration data.';
		} else {
			this.keys = keys;
		}

		// Modify scrub and polish methods if they exist
		this.scrub = scrub || this.scrub;
		this.polish = polish || this.polish;

		// Create new link with Twitter NPM to hold account information for each Doppel instance
		this.twitterLink = new twitter(this.keys);

		// Create new lexicon
		this.lexicon = new lexicon;
	}

	update(){
		var doppel = this;

		// Create URL
		var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=';

		url += doppel.source;
		url += '&include_rts=false&count=200';
		doppel.lastUpdate ? url += '&since_id=' + doppel.lastUpdate : null;

		var tweetList = [];

		doppel.twitterLink.get(url, function(err, tweets, response){
			
			for(var i = 0; i < tweets.length; i++){
				// Update most recent Tweet number to not receive duplicate Tweets
				if (!i) doppel.lastUpdate = tweets[0].id
				tweetList.push(tweets[i].text);
			}

			tweetList.forEach(tweet => {
				// Modify input text with scrub() call
				var scrubText = doppel.scrub(tweet);

				// Send to Lexicon
				doppel.lexicon.addWords(scrubText);
			});
		});
	}

	updateLex(){
		var doppel = this;

		this.getTweets(this).then(function(tweets){
			// Send each line to lexicon for parsing

			tweets.forEach(tweet => {
				// Modify input text with scrub() call
				var scrubText = doppel.scrub(tweet);

				// Send to Lexicon
				doppel.lexicon.addWords(scrubText);
			});
		});
	}

	getTweets(doppel){
		return new Promise(function(resolve, reject){

			// Create URL
			var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=';

			url += doppel.source;
			url += '&include_rts=false&count=200';
			doppel.lastUpdate ? url += '&since_id=' + doppel.lastUpdate : null;

			var tweetList = [];

			doppel.twitterLink.get(url, function(err, tweets, response){

				if(err) reject(err);
				
				for(var i = 0; i < tweets.length; i++){
					// Update most recent Tweet number to not receive duplicate Tweets
					if (!i) doppel.lastUpdate = tweets[0].id
					tweetList.push(tweets[i].text);
				}

				resolve(tweetList);
			});
		});
	}

	preScrub(text){
		return text;
	}

	scrub(text){
		return text;
	}

	polish(text){
		return text;
	}

	generate(){
		var phrase = this.lexicon.generate();
		phrase = this.polish(phrase);

		return phrase;
	}
}

module.exports = Doppel;