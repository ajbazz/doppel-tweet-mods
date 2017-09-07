// Import Doppel class
var Doppel = require('../index.js');

// Config for connecting to Twitter (usually use env variable)
var twitterConfig = require('./config.js');

// Set up configuration of Doppel
var config = {
	name: 'Ganglebot',
	source: ['Ganglegasm'],
	keys: twitterConfig
};

// Create new Doppel with configuration
var d1 = new Doppel(config);

// Testing
d1.getTweets();