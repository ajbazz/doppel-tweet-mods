# Doppel Tweet
Doppel Tweet is a lightweight JavaScript class for Node.js that uses Markov chains to generate Tweets from a vocaulary base copied from another Twitter account.
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
