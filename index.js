var TwitterStream = require('twitter-stream-api'),
    fs = require('fs'), Twit = require('twit');

let consumer_key = "<consumer_key>"
let consumer_secret = "<consumer_secret>"
let token = "<token>"
let token_secret = "<token_secret>"

var keys = {
    consumer_key : consumer_key,
    consumer_secret : consumer_secret,
    token : token,
    token_secret : token_secret
};

var keysfortwit = {
    consumer_key : consumer_key,
    consumer_secret : consumer_secret,
    access_token : token,
    access_token_secret : token_secret
};

var Bot = new Twit(keysfortwit);

var Twitter = new TwitterStream(keys, false);
Twitter.stream('statuses/filter', {
  // Getthe twiiter ids from http://mytwitterid.com
    follow: '<twiiter_ids_to_follow>'
});

Twitter.on('data', function (obj) {
    var dataobj = JSON.parse(obj.toString('utf8'))
    if(typeof dataobj.id_str !== "undefined"){
      var twitid={
        id:dataobj.id_str
      }
      Bot.post('statuses/retweet/:id', twitid);
    }
});
