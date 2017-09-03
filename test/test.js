var Doppel = require('../index.js');
var twitterConfig = require('./config.js');

var config = {
	name: 'Ganglebot',
	source: ['Ganglegasm'],
	keys: twitterConfig
};

var d1 = new Doppel(config);

d1.initialize();