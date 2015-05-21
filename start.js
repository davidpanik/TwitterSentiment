var Twit = require('twit');
var idString = '#got';
var details = require('./twitter_details')

var T = new Twit(details);

var stream = T.stream('statuses/filter', { track: idString });

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
});