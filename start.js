var twit      = require('twit');
var sentiment = require('sentiment');
var details   = require('./twitter_details')
var idString  = '#got';
var T         = new twit(details);
var stream    = T.stream('statuses/filter', { track: idString });

stream.on('connect', function(request) {
	console.log('Connected to Twitter API');
});

stream.on('disconnect', function(message) {
	console.log('Disconnected from Twitter API. Message: ' + message);
});

stream.on('reconnect', function (request, response, connectInterval) {
	console.log('Trying to reconnect to Twitter API in ' + connectInterval + ' ms');
});

// Start listening for tweets
stream.on('tweet', function(tweet) {
	console.log(tweet.created_at + ' ' + tweet.user.name + ' says:  ' + tweet.text);
	console.log(sentiment(tweet.text).score);
	console.log('');
});