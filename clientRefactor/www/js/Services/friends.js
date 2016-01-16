'use strict';

var SERVER_ROOT = 'http://localhost:3000';

servicesModule
.factory('Friends', function($http){

  // helper function to extract data from response
  var getData = function(res) {
    return res.data;
  };

  // ---- Export functions ----
  var addOne = function(user_id, clientObj){
    return $http.post(SERVER_ROOT + '/api/users/' + user_id + '/friends', clientObj)
    .then(getData);
  };

  var getAllForUser = function(userId){
    return $http.get(SERVER_ROOT + '/api/users/' + userId + '/friends')
    .then(getData);
  }

  var getOne = function(friendId) {
    return $http.get(SERVER_ROOT + '/api/friends/' + friendId)
    .then(getData);
  };

  var updateOne = function(friendId, newFriendObj){
    return $http.put(SERVER_ROOT + '/api/friends/' + friendId, newFriendObj)
    .then(getData);
  }

  var deleteOne = function(friendId){
    return $http.delete(SERVER_ROOT + '/api/friends/' + friendId)
    .then(getData);
  }

  // //Gets Amazon, Bing, and Weather results
  // var getFeed = function(user_id, client_id) {
  //   //currently user is hard coded
  //     console.log('here: ', user_id, client_id)
    
  //   return $http.get(SERVER_ROOT + '/api/users/' + user_id + '/clients/' + client_id + '/feed')
  //     .then(function(res){
  //       return res.data;
  //     });
  // }

  // var getTickets = function(team) {
  //   team = team.split(' ').join('-');
  //   return $http.get('http://api.seatgeek.com/2/events?performers.slug=' + team)
  //     .then(function(res){
  //       return res.data;
  //     });
  // }

  // Gets Amazon results (only)
  var getGifts = function(friendId) {
    return $http.get(SERVER_ROOT + '/api/friends/' + friendId + '/gifts')
    .then(function(res) {
      return res.data;
    });
  };

  var getPosts = function(friendId) {
    return $http.get(SERVER_ROOT + '/api/friends/' + friendId + '/posts')
    .then(function(res) {
      return res.data;
    });
  };

  return {
    addOne: addOne,
    getAllForUser: getAllForUser,
    getOne: getOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    getGifts: getGifts,
    getPosts: getPosts
  }
});
