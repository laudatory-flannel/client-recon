angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

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

  .state('tempTab', {
    url: '/tempTab',
    abstract: true, 
    templateUrl: 'templates/tempTabs.html'
  })

  .state('tempTab.login', {
    url: '/login',
    views: {
      'login': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('tempTab.home', {
    url: '/home/:id', //user id
    views: {
      'home': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl',
        // authenticate: true
      }
    }
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

  .state('tempTab.home.addFriend', {
    url: '/home/:id/addFriend',
    views: {
      templateUrl: 'templates/add-friend.html',
      controller: 'AddFriendCtrl',
      // authenticate: true
    }
  });

  $urlRouterProvider.otherwise('tempTab/login');

});






