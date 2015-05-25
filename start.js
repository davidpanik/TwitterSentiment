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
	var fetch = require('./fetch');
	var cheerio = require('cheerio');

	// Scrape top 100 books from Gutenberg
	fetch('https://www.gutenberg.org/browse/scores/top', function(html) {
		var $ = cheerio.load(html);
		var books = $('#books-last30').next('ol').find('a');

		books.each(function(i, elem) {
			var id    = elem.attribs.href.replace('/ebooks/', ''); // Extract the book ID
			var title = elem.children[0].data;
			var url   = 'https://www.gutenberg.org/cache/epub/' + id + '/pg' + id + '.txt';
			
			getBook(title, url); // Fetch and test individual book
		});
	});

	function getBook(title, url) {
		fetch(url, function(data) {
			console.log(title + ' = ' + sentiment(data).score);
		});		
	}
}

//testTweets('#got');

testGutenberg();