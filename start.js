var sentiment = require('sentiment');

// Test tweets
function testTweets(idString) {
	var twit      = require('twit');
	var details   = require('./twitter_details')
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
}


// Test books on Project Gutenberg
function testGutenberg() {
	var fs = require('fs');
	var fetch = require('./fetch');

	fetch('https://www.gutenberg.org/cache/epub/766/pg766.txt', function(data) {
		console.log(sentiment(data).score);
	});

	// var text = fs.readFileSync('david_copperfield.txt') + '';
	// console.log(sentiment(text).score);
}



//testTweets('#got');

testGutenberg();