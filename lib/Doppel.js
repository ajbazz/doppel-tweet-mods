'use strict';

/*
 * Module dependencies
*/

var lexicon = require('./lexicon');
var lifecycle = require('./lifecycle');
var tweet = require('./tweet');

exports = module.exports = createDoppel;

/*
 * Create a new empty Doppel with supplied configuration
*/

function createDoppel(config){
	this.config = config;

	lexicon();
	lifecycle();
	tweet();
}