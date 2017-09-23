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
		!config.keys ? throw 'Error: Must include Twitter API key configuration data.' : this.keys = config.keys;

		// Create new link with Twitter NPM to hold account information for each Doppel instance
		this.link = new twitter(this.keys);
	}

	initialize(){
		// 
	}

	getNewTweets(){

	}
	
}

module.exports = Doppel;