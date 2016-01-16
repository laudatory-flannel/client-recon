'use strict';

var SERVER_ROOT = 'http://localhost:3000';

servicesModule
.factory('Events', function($http){

  // helper function to extract data from response
  var getData = function(res) {
    return res.data;
  };

  // ---- Export functions ----
  var addOne = function(friendId, eventObj){
    return $http.post(SERVER_ROOT + '/api/friends/' + friendId + '/events', eventObj)
    .then(getData);
  };

  var getAllForFriend = function(friendId){
    return $http.get(SERVER_ROOT + '/api/friends/' + friendId + '/events')
    .then(getData);
  }

  var getOne = function(eventId) {
    return $http.get(SERVER_ROOT + '/api/events/' + eventId)
    .then(getData);
  };

  var updateOne = function(eventId, newEventObj){
    return $http.put(SERVER_ROOT + '/api/events/' + eventId, newEventObj)
    .then(getData);
  }

  var deleteOne = function(eventId){
    return $http.delete(SERVER_ROOT + '/api/events/' + eventId)
    .then(getData);
  }

  return {
    addOne: addOne,
    getAllForFriend: getAllForFriend,
    getOne: getOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
 
  }
});