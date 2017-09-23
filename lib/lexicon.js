'use strict';

/*
 * Lexicon class holds all parsed Markov data for a particular Doppel
*/

class Lexicon {

	constructor(){
		this.lexicon = {};
	}

	addWords(text){
		console.log('adding text: ' + text);
	}
}

module.exports = Lexicon;