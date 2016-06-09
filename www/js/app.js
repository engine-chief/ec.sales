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


  // login view
  .state('tab.login', {
    url: '/login',
    views: {
      'tab-login': {
        templateUrl: 'templates/tab-login.html',
        controller: 'LoginCtrl'
      }
    }
  })


  // menu view
  .state('tab.tabs', {
    url: '/tabs',
    views: {
      'tab-tabs': {
        templateUrl: 'templates/tab-tabs.html',
        controller: 'TabCtrl'
      }
    }
  })


  // inventory view
  .state('tab.inventory', {
    url: '/inventory',
    views: {
      'tab-inventory': {
        templateUrl: 'templates/tab-inventory.html',
        controller: 'InventoryCtrl'
      }
    }
  })

  .state('tab.filter', {
    url: '/filter',
    views: {
      'tab-inventory': {
        templateUrl: 'templates/tab-filter.html',
        controller: 'FilterCtrl'
      }
    }
  })

  // seller view
  .state('tab.seller', {
    url: '/seller',
    views: {
      'tab-seller': {
        templateUrl: 'templates/tab-seller.html',
        controller: 'SellerCtrl'
      }
    }
  })

  // onboarding view
  .state('tab.onboarding', {
    url: '/onboarding',
    views: {
      'tab-onboarding': {
        templateUrl: 'templates/tab-onboarding.html',
        controller: 'OnboardingCtrl'
      }
    }
  })

  .state('tab.inspection', {
    url: '/inspection',
    views: {
      'tab-onboarding': {
        templateUrl: 'templates/tab-inspection.html',
        controller: 'InspectionCtrl'
      }
    }
  })

  .state('tab.pricing', {
    url: '/pricing',
    views: {
      'tab-onboarding': {
        templateUrl: 'templates/tab-pricing.html',
        controller: 'PriceCtrl'
      }
    }
  })

  // search/inspection view
  .state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/tab-search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('tab.editinspect', {
    url: '/editinspect',
    views: {
      'tab-search': {
        templateUrl: 'templates/tab-editinspect.html',
        controller: 'EditinspectCtrl'
      }
    }
  })

  .state('tab.details', {
    url: '/details',
    views: {
      'tab-onboarding': {
        templateUrl: 'templates/tab-details.html',
        controller: 'DetailCtrl'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});