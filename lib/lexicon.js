'use strict';

/*
 * Lexicon class holds all parsed Markov data for a particular Doppel
*/

class Lexicon {

	// Initialize with empty lexicon library
	constructor(){
		this.lexicon = {};
	}

	// Add words pulled from Twitter
	addWords(text){

		// Create new string with start and end aliases
		var textMod = '** ** ' + text + ' ***';
		var wordList = textMod.split(' ');

		for(var i = 0; i < wordList.length - 2; i++){
			var key = wordList[i] + ' ' + wordList[i + 1];
			var word = wordList[i + 2];

			// Check if trigger pattern exists
			if(key in this.lexicon){
				// Check if result exists
				if(word in this.lexicon[key]){
					this.lexicon[key][word]++;
				} else {
					this.lexicon[key] = {};
					this.lexicon[key][word] = 1;
				}
			} else {
				this.lexicon[key] = {};
				this.lexicon[key][word] = 1;
			}
		}
	}
}

module.exports = Lexicon;