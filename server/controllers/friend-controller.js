var Friend = require('../models/friend-model.js');
var socialMediaAggregator = require('../helpers/socialMediaAggregator.js');
var amazon = require('../helpers/amazon-api.js');

var makeCallback = function(res, actionString) {
  actionString = actionString || '';
  return function(err, results) {
    if (err) {
      console.log(actionString, 'failed:', err);
      res.send(500);
    } else {
      console.log(actionString, 'succeeded:', results);
      res.json(results);
    }
  };
};

module.exports = {
	addOne: function(userId, friendObj, res) {
    Friend.addOne(userId, friendObj, makeCallback(res, 'add one friend for user ' + userId));
  },

  getAllForUser: function(userId, res) {
    Friend.getAllForUser(userId, makeCallback(res, 'get all friends for user ' + userId));
  },

	getOne: function(friendId, res) {
		Friend.getOne(friendId, makeCallback(res, 'get one friend'));
	},

	updateOne: function(friendId, data, res) {
		Friend.updateOne(friendId, data, makeCallback(res, 'update one friend'));
	},

  deleteOne: function(friendId, res) {
    Friend.deleteOne(friendId, makeCallback(res, 'delete one friend'));
  },

  getPosts: function(friendId, res) {
    var actionString = 'get gifts for friend';
    Friend.getOne(friendId, function(err, results) {
      if (err) {
        console.log(actionString, 'failed:', err);
        res.send(500);
      } else {
        console.log(actionString, 'succeeded:', results);
        actionString = 'search social media for posts';
        socialMediaAggregator(results[0].tumblrurl, results[0].twitterurl, results[0].instagramurl, function(results) {
          console.log(actionString, 'probably succeeded:', results);
          res.json(results);
        })
      }
    });
  },
  
  getGifts: function(friendId, res) {
    var actionString = 'get gifts for friend';
    Friend.getOne(friendId, function(err, results) {
      if (err) {
        console.log(actionString, 'failed:', err);
        res.send(500);
      } else {
        console.log(actionString, 'succeeded:', results);
        actionString = 'search amazon for gifts';
        amazon.request(results[0].interests, function(err, results) {
          if (err) {
            console.log(actionString, 'failed:', err);
          } else {
            console.log(actionString, 'succeeded:', results);
            res.json(amazon.format(results));
          }
        })
      }
    });
  }
};

