// Import Doppel class
var Doppel = require('../index.js');

// Config for connecting to Twitter (usually use env variable)
var twitterConfig = require('./config.js');

// Create new Doppel with configuration
var d1 = new Doppel('timnocontext', twitterConfig);

// Testing
// d1.updateLex().then(function(data){
// 	console.log(data);
// });

d1.update();