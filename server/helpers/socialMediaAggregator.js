var async = require('async');
var tumblr = require('tumblr');
var Twitter = require('twitter');
var tumblrOath = require('./tumblr-api-key.js');
var twitterClient = require('./twitter-api-key.js');



///////////////////////////////////////////////////////////////////


module.exports = function(tumblrUsername, twitterUsername, instagramUsername, smCallback) {
  var oauth = {
    consumer_key: tumblrOath.CONSUMER_KEY,
    consumer_secret: tumblrOath.CONSUMER_SECRET,
    token: tumblrOath.TOKEN,
    token_secret: tumblrOath.TOKEN_SECRET,
  };

  var client = new Twitter({
    consumer_key: twitterClient.CONSUMER_KEY,
    consumer_secret: twitterClient.CONSUMER_SECRET,
    access_token_key: twitterClient.TOKEN,
    access_token_secret: twitterClient.TOKEN_SECRET,
  });

  ////////////////////////////

  var results = [];

  console.log( tumblrUsername,twitterUsername,instagramUsername)

  var tumblrUrl = (tumblrUsername || 'rachel6bilson') + '.tumblr.com';
  var twitterUrl = 'https://twitter.com/' + (twitterUsername || 'rachelbilsonus');
  var instagramUrl = 'https://www.instagram.com/' + (instagramUsername || 'rachelbilson');

  ////////////////////////////

  // var tumblrUrl = ('rachel6bilson') + '.tumblr.com';
  // var twitterUrl = 'https://twitter.com/' + ('rachelbilson_6');
  // var instagramUrl = 'https://www.instagram.com/' + ('rachel6bilson');


  var shuffle = function(o){
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  var tumblrAsync = function(callback) {
    console.log('IN TUMBLR');
    var blog = new tumblr.Blog(tumblrUrl, oauth);
    blog.posts({limit: 6}, function(error, response) {
      if (error) {
        console.log('ERROR GETTING TUMBLR STUFF')
        throw new Error(error);
      }

      var posts = response.posts;
      posts.forEach(function(item) {
        if (item.type === 'photo') {
          results.push({
            source: 'tumblr',
            type: 'photo',
            text: 'Re-blogged: ' + item.summary,
            imageUrl: 'http://i.imgur.com/H0Ojc8f.png',
            postUrl: item.post_url,
            logoImage: 'data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='
          });
        } else if (item.type === 'text') {
          results.push({
            source: 'tumblr',
            type: 'text',
            text: 'New post: ' + item.summary,
            imageUrl: 'http://i.imgur.com/H0Ojc8f.png',
            postUrl: item.post_url,
            logoImage: 'data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='
          });
        }
      });

      callback();
    });
  };

  var twitterAsync = function(callback) {
    console.log('IN TWITTER');
    console.log('SCREENNAME', twitterUrl.slice(20) )
    params = { screen_name: twitterUrl.slice(20)};

    client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (error) {
        console.log('Error getting friend tweets', error);
        return;
      } else  {
        tweets.forEach(function(item) {
          results.push({
            source: 'twitter',
            type: 'text',
            text: 'New tweet: ' + item.text,
            imageUrl: 'http://i.imgur.com/klg52Ih.png',
            postUrl: twitterUrl + '/status/' + item.id_str,
            logoImage: 'data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='
          });
        });
        callback();
      }
    });
  };

  var instagramAsync = function(callback) {
    console.log('IN INSTAGRAM')
    var url = instagramUrl;

    var request = require('request');
    var util = require('util');

    request.get(url, function(err, res, body) {
      var matches = body.match(/(window\._sharedData = )(.*)(;<\/script>)/);
      var instagramJsonString = matches[2];

      var data = JSON.parse(instagramJsonString);

      data.entry_data.ProfilePage[0].user.media.nodes.forEach(function(post) {
         results.push({
            source: 'instagram',
            type: 'photo',
            text: 'New Instagram!',
            imageUrl: post.display_src,
            postUrl: 'https://www.instagram.com/p/' + post.code,
            logoImage: 'http://orig09.deviantart.net/bef7/f/2015/017/a/c/instagram_logo__transparent_background__by_instahack-d8e94oc.png'
          });
      });
      callback();
    });
  };

  async.parallel([tumblrAsync, twitterAsync, instagramAsync], function() {
    // console.log('ASYNC COMPLETE', results.length, results);
    smCallback(shuffle(results));
  });

}; // final closing

// module.exports('','','',function(){})