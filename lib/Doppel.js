'use strict';

/*
 * Module dependencies
*/

var twitter = require('twitter');
var lexicon = require('./lexicon');
var lifecycle = require('./lifecycle');
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

}

module.exports = Doppel;