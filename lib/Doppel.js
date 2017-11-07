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
		
		this.userNotFound = false;
	}

	update(callback){
		var doppel = this;

		!callback ? callback = function(){} : null;

		// Create URL
		var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=';
		var urlValidId = `https://api.twitter.com/1.1/users/show.json?screen_name=${doppel.source}`;

		url += doppel.source;
		url += '&include_rts=false&count=200';
		doppel.lastUpdate ? url += '&since_id=' + doppel.lastUpdate : null;

		var tweetList = [];
		
		var getTweet = () => {
			doppel.twitterLink.get(url, function(err, tweets, response){
				for(var i = 0; i < tweets.length; i++){
					// Update most recent Tweet number to not receive duplicate Tweets
					if (!i) doppel.lastUpdate = tweets[0].id
					tweetList.push(tweets[i].text);
				}

				tweetList.forEach(tweet => {
					// Modify input text with prescrub() and scrub() calls
					var scrubText = doppel.scrub(doppel.preScrub(tweet));

					// Send to Lexicon
					doppel.lexicon.addWords(scrubText);
				});

				callback();
			})
			
			};
		
		var validateUsername = new Promise((resolve, reject) => {
				doppel.twitterLink.get(urlValidId, function(err, tweets, response){
					var res = response.body;
					if(err) {
						reject(err);
					}
					else {
						resolve(res);
					}
				})
			});
		
		validateUsername.then((val) => {
			console.log("Username validated");
			getTweet();
		});
		validateUsername.catch((err) => {
			console.log("Username rejected:", err);
			this.userNotFound=true;
			callback()
		});

	}

	tweet(phrase, callback){
		!callback ? callback = function(){} : null;

		if(!phrase || phrase === null){
			var phrase = this.generate();
			phrase = this.polish(phrase);
		}
		
		if (this.userNotFound){
			callback('Error: Username not found.')
			return;
		}
		
		this.twitterLink.post('statuses/update', {status: phrase}, function(err, tweet, response){
			if(err && callback) {
				console.log('Tweet Error: ' + err);
			}
			
			console.log(`Tweet posted: ${phrase}`);
			if(callback) {
				callback(phrase);
			}
		});
	}

	preScrub(text){
		// Splits newlines with spaces so they don't join words
		return text.replace(/\r?\n|\r/g, ' \n ');
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