angular.module('starter.controllers', ['client-recon.services'])

.controller('LoginCtrl', function($scope){
  $scope.login = function () {

  }

})
.controller('HomeCtrl', function($scope, $stateParams, Friends) {

  $scope.moveText = "Move";

  $scope.showOrderButton = false;
  $scope.changeReorder = function(){
      if($scope.showOrderButton === true) {
        $scope.moveText = "Move";
        $scope.showOrderButton = false;
      }else{
        $scope.moveText = "Hide Move";
        $scope.showOrderButton = true;
      }
  };

  Friends.getAllForUser($stateParams.id)
  .then(function(friends) {
    console.dir(friends);
    $scope.friends = friends;
  });

  $scope.destroyFriend = function($index){
    $scope.friends.splice($index, 1);
  };

  $scope.moveFriend = function (friend, fromIndex, toIndex){
    $scope.friends.splice(fromIndex, 1);
    $scope.friends.splice(toIndex, 0, friend);
  };
})

.controller('AddFriendCtrl', function($scope, $stateParams, Friends) {
  $scope.friends = {
    name: null,
    title: null,
    company: null,
    email: null,
    phone: null,
    birthday: null,
    interests: null,
    img: null,
    instagramUrl: null,
    twitterUrl:null,
    tumblrUrl:null
  };

  $scope.submit = function() {
    Friends.addOne($stateParams.id, $scope.friends);
    console.log('Saving...');
  };

})
// .controller('EditCtrl', function($stateParams, $scope, $timeout, Friends) {
//   // TEMPLATE FOR DATA
//   //this.data = AppState.state;
//   var successfulPost = this.success;
//   var currentClient = null;//this.data.currentClient;

//   this.newData = currentClient;

//   this.putClient = function () {
//     //DETECT USER ID FROM APP STATE
//     console.log('about to send updated client to server');
//     Friends.updateOne($stateParams.friendId, currentClient)
//     .then(function(res){
//       // CALLED AFTER SUCCESSFUL POST
//       successfulPost = true;

//       // THE PURPOSE OF THE BELOW IS TO HAVE THE SUCCESSFUL POST 
//       // NOTIFICATION ONLY SHOW FOR A FEW SECONDS AND DISAPPEAR
//       // $timeout(function(){
//       //   successfulPost = false;
//       //   $state.go('client-profile.bio');
//       // }, 2000);
//     })
//   };
// })

.controller('PostsCtrl', function($stateParams, $scope, Friends){
  console.log('got to posts controller');
  $scope.loading = true;

  Friends.getOne($stateParams.id)
  .then(function(friends) {
    $scope.friend = friends[0];
  })

  // Eventually will just directly query server for posts
  Friends.getPosts($stateParams.id)
  .then(function(posts) {
    $scope.loading = false;
    $scope.posts = posts;
  });
})

.controller('EditCtrl', function($scope, $location, $stateParams, Friends) {
  Friends.getOne($stateParams.id)
  .then(function(friends) {
    $scope.friend = friends[0];
    console.log($scope.friend);
  })

  $scope.submitForm = function(){
    // console.log('sending', $scope.friend);
    Friends.updateOne($stateParams.id, $scope.friend)
    .then(function(res){
      $location.path('/tempTab/home/' + $scope.friend.userid);
    });
  };

  // $scope.updateFriend = function () {
  //   //DETECT USER ID FROM APP STATE
  //   console.log('about to send updated client to server');
  //   Friends.updateOne($stateParams.friendId, $scope.friend)
  //   .then(function(res){
  //     // CALLED AFTER SUCCESSFUL POST
  //     successfulPost = true;

  //     // THE PURPOSE OF THE BELOW IS TO HAVE THE SUCCESSFUL POST 
  //     // NOTIFICATION ONLY SHOW FOR A FEW SECONDS AND DISAPPEAR
  //     // $timeout(function(){
  //     //   successfulPost = false;
  //     //   $state.go('client-profile.bio');
  //     // }, 2000);
  //   })
})

.controller('EventsCtrl', function($scope, $stateParams, Friends) {
  Friends.getOne($stateParams.id)
  .then(function(friends) {
    $scope.friend = friends[0];
    console.log($scope.friend);
  })

})

.controller('GiftsCtrl', function($scope, $stateParams, Friends) {
  $scope.loading = true;
  $scope.gifts = 'Loading gift suggestions...';

  //$scope.subscriptions = AppState.state.currentClient.feed;

  Friends.getOne($stateParams.id)
  .then(function(friends) {
    $scope.friend = friends[0];
    console.log($scope.friend);
  });

  Friends.getGifts($stateParams.id)
  .then(function(gifts) {
    $scope.loading = false;
    $scope.gifts = gifts;
  });
});
