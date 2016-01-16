angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {


  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('home', {
    url: '/home/:id', //user id
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl',
        // authenticate: true

  })

  // .state('tab', {
  //   url: '/tab',
  //   abstract: true,
  //   templateUrl: 'templates/tabs.html'
  // })

  .state('edit', {
    url: '/edit/:id',
    templateUrl: 'templates/tab-edit.html',
    controller: 'EditCtrl',
        // authenticate: true
  })

  .state('posts', {
    url: '/posts/:id',
    templateUrl: 'templates/tab-posts.html',
    controller: 'PostsCtrl',
  })

  .state('events', {
    url: '/events/:id',
    templateUrl: 'templates/tab-events.html',
    controller: 'EventsCtrl',
        // authenticate: true

  })

  .state('gifts', {
    url: '/gifts/:id',
    templateUrl: 'templates/tab-gifts.html',
    controller: 'GiftsCtrl',
        // authenticate: true
  })

  .state('addFriend', {
    url: '/addFriend/:id',
    templateUrl: 'templates/add-friend.html',
    controller: 'AddFriendCtrl',
      // authenticate: true
  });

  $urlRouterProvider.otherwise('/login');

});






