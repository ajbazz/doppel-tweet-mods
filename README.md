# Doppel Tweet
Doppel Tweet is a simple, lightweight JavaScript class for Node.js that uses [Markov chains](https://en.wikipedia.org/wiki/Markov_chain) to generate Tweets from a vocaulary base copied from another Twitter account.
## Getting started
### Installation
Install Doppel Tweet with `npm i --s doppel-tweet`
### Sign up for a Twitter API Key
In order to access the Twitter API you will need a consumer and application keys. Keep in mind that you will need to use the keys of the Twitter account you plan to post to if you intend to send Tweets using DoppelTweet. You can also use DoppelTweet to generate Markov chains alone if you don't want to use DoppelTweet to handle post requests.

Once logged in to Twitter, visit https://apps.twitter.com/ to access your applications. After you create an application you can access your keys in the _"Keys and Access Tokens"_ area of your app.
### Setup Your Twitter Configuration
Your Twitter API keys must be saved in the following way, as necessitated by the Twitter NPM package, ideally in a separate file since your keys are _your keys!_
```
// twitter-keys.js

module.exports = {
	consumer_key: 'whoadsn324n23iur322bn2',
	consumer_secret: 'ASDaosnfasfASmfaSF32n3fn8fafasknfasFFAFiofisadoih',
	access_token_key: '49812917259712089-sdondlkaDASDfoin328jefaFnasknafs',
	access_token_secret: 'SDafASfAsFFSAfoiewqgnqeGqinadnqddoqDQmdoiwmdwmid'
}
```
Your consumer key, consumer secret, access token key, and access token secret are accessible on your Twitter app page (see Twitter documentation for details).
### Create a new Doppel
Require the Doppel Tweet module and create a new instance! The minimum parameters needed are just a target acount and your Twitter configuration keys.
```
var Doppel = require('doppel-tweet');
var config = require('./twitter-keys');

var donnie = new Doppel('realdonaldtrump', config);
```
### Update the Lexicon and Generate Tweets
Once you've created a new Doppel instance you will first need to begin by updating your Doppel's _Lexicon_. This is where the vocabulary of your Doppel resides. To do so, use `Doppel.update()`, which is an asynchronous Twitter request that then parses Tweets into the Lexicon. Doppel Tweet automatically tracks when the last update occured so each time it's called only the newest Tweets will be added. You must include a function as the `callback` argument which will run when the update finishes.

To create a post and send to Twitter, you can use the `Doppel.tweet()` method to generate a Tweet and automatically post it!
```
donnie.update(function(){
	donnie.tweet();
});
```
When run with the previously used Twitter handle (_realdonaldtrump_) the following was logged to the console, and also posted to Twitter:
```
We will confront ANY challenge, no matter how strong the winds or high the water. I’m proud to stand with Presidents for #OneAmericaAppeal.
```
And that's it! You can now mimic a Twitter user with the cunning of a Replicant. Enjoy!
## Tweet Generation
While the `tweet()` method can be used as-is to generate and then post a Tweet in one go, you might want to have some more control over what's happening. In this case, you can assign a Tweet to a variable with `generate()`.
```
donnie.update(function(){
	var phrase = donnie.generate();

	// doStuffToWords is a function you defined that returns a string!
	var newPhrase = doStuffToWords(phrase);
});
```
With this you can pass a string into the `tweet()` method so the phrase you provided is posted, rather than one generated just before. If you also wanted to follow up with something after a `tweet()` call, the second argument can be a callback function. If you wanted to post a generated Tweet and also use a callback, use `null` as your first argument.
```
donnie.tweet(null, function(){
	// do cool stuff after the Tweet goes to the interwebz
});
```
## Additional Configuration
When creating a new Doppel you can also pass two additional arguments to manipulate Tweet phrases just before entering into the Lexicon _and_ just after being generated. These are your `scrub` and `polish` methods. So, when creating a new Doppel you do one like so:
```
function scrub(text){
	// do stuff to text
	return text;
}

function polish(text){
	// do more stuff to text
	return text;
}

var donnie = new Doppel('realdonaldtrump', config, scrub, polish);
```
Why would you want to use these? Well, the `scrub` function is called on each individual Tweet pulled from `update` just before they're sent to Lexicon. So, for example, if you were pulling Tweets from an account that always put everything in quotations, but you didn't want those analyzed in the Markov chains, you might want to remove those. A simple way would be to make a `scrub` function that took out all double quotes, like so:
```
function scrub(text){
	return text.replace(/["]+/g, '');
}
```
That uses a short RegEx search to remove the string of double quotes. Otherwise, you might be analyzing the chains with `"Sometimes` instead of `Sometimes`. Granted, maybe you want it that way. It's up to you!

On the other hand, the `polish` method is called when a Tweet is generated. Going the opposite direction, maybe you want to add those quotes back in with something like:
```
function polish(text){
	return '"'+text+'"';
}
```
That will then put double quotes on each end of your string.

IMPORTANT! Make sure your polish and scrub functions _take_ and _return_ a string... or they won't be of much help to you. And, if you want to use a `polish` but not a `scrub`, just use `null` for that argument.
## Built With
* Node.js
* [NPM Twitter](https://www.npmjs.com/package/twitter)

## License
MIT all the way.
## Author
Made on a rainy day by [Matthew Sells](mailto:mattms@tuta.io)