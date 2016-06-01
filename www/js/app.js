// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('ionicApp', ['ionic', 'ionicApp.controllers', 'ionicApp.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.login', {
    url: '/login',
    views: {
      'tab-login': {
        templateUrl: 'templates/tab-login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('tab.client', {
      url: '/client',
      views: {
        'tab-client': {
          templateUrl: 'templates/tab-client.html',
          controller: 'ClientCtrl'
        }
      }
    })

  .state('tab.inspect', {
      url: '/inspect',
      views: {
        'tab-client': {
          templateUrl: 'templates/tab-inspect.html',
          controller: 'InspectCtrl'
        }
      }
    })

  .state('tab.inventory', {
      url: '/inventory',
      views: {
        'tab-client': {
          templateUrl: 'templates/tab-inventory.html',
          controller: 'InventoryCtrl'
        }
      }
    })

  .state('tab.filter', {
      url: '/filter',
      views: {
        'tab-client': {
          templateUrl: 'templates/tab-filter.html',
          controller: 'FilterCtrl'
        }
      }
    })



  .state('tab.inspect2', {
      url: '/inspect2',
      views: {
        'tab-client': {
          templateUrl: 'templates/tab-inspect2.html',
          controller: 'InspectCtrl2'
        }
      }
    })


   .state('tab.details', {
      url: '/details',
      views: {
        'tab-client': {
          templateUrl: 'templates/tab-details.html',
          controller: 'DetailCtrl'
        }
      }
    })

   .state('tab.editinspect', {
      url: '/editinspect',
      views: {
        'tab-client': {
          templateUrl: 'templates/tab-editinspect.html',
          controller: 'EditinspectCtrl'
        }
      }
    })


   .state('tab.search', {
      url: '/search',
      views: {
        'tab-client': {
          templateUrl: 'templates/tab-search.html',
          controller: 'SearchCtrl'
        }
      }
    })



  .state('tab.tabs', {
      url: '/tabs',
      views: {
        'tab-client': {
          templateUrl: 'templates/tab-tabs.html',
          controller: 'TabCtrl'
        }
      }
    });
  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});
