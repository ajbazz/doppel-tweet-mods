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
			var trigger = wordList[i] + ' ' + wordList[i + 1];
			var word = wordList[i + 2];

			// Check if trigger pattern exists
			if(trigger in this.lexicon){
				// Check if word exists for the trigger set
				var tempList = this.lexicon[trigger]['words'];
				var index = tempList.indexOf(word);

				this.lexicon[trigger]['total']++;

				if(index === -1){
					// Add word
					(function(w){
						this.freq.push(1);
						this.words.push(w);
					}).call(this.lexicon[trigger], word);
				} else {
					// Update frequency
					this.lexicon[trigger]['freq'][index]++;
				}
				
			} else {
				// If neither exists, create new vocabulary
				this.lexicon[trigger] = {
					freq: [1],
					words: [word],
					total: 1
				}
			}
		}
	}

	generate(){
		// Start with default search alias (** **)
		var triggerList = ['**', '**'];
		var wordList = [];
		var trigger = '';
		var tempList = [];
		var rand = 0;
		var index = 0;
		var total = 0;

		while(triggerList[1] != '***'){

			trigger = triggerList.join(' ');
			tempList = this.lexicon[trigger]['freq'];
			total = this.lexicon[trigger]['total'];

			// Generate random number
			rand = Math.floor(Math.random() * total) + 1;

			// Go through each element in list and subtract from total. If 0 or less, use that word
			for(index = 0; index < tempList.length; index++){
				rand -= tempList[index];
				if(rand <= 0){
					break;
				}
			}

			var word = this.lexicon[trigger]['words'][index];
			if(word === '***'){
				break;
			}

			// Add the word to the list of words
			wordList.push(word);

			triggerList[0] = triggerList[1];
			triggerList[1] = word;
		}

		console.log(wordList);
	}
}

module.exports = Lexicon;