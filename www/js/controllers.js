var rootLink = "http://192.168.2.34:3000";
// var rootLink = "http://enginechief.in";

angular.module('ionicApp.controllers', [])
  .controller('LoginCtrl', function($scope) {})

.controller('SellerCtrl', function($rootScope, $scope, $http, $location, $ionicPopup) {
  $scope.data = {};

  $scope.seller = function() {
    var link = rootLink + '/api/v0/sellers/create';
    var sellerDetails = {
      seller_company_name: $scope.data.seller_company_name,
      seller_proprietor: $scope.data.seller_proprietor,
      proprietor_phone_1: $scope.data.proprietor_phone_1,
      proprietor_phone_2: $scope.data.proprietor_phone_2,
      managers: [{
        phone_1: $scope.data.manager1_phone_1,
        phone_2: $scope.data.manager1_phone_2
      }, {
        phone_1: $scope.data.manager2_phone_1,
        phone_2: $scope.data.manager2_phone_2
      }],
      office_address: $scope.data.office_address
    };
    $http.post(link, {
      seller: sellerDetails
    }).then(function(res) {
      if (res.status == 200) {
        $ionicPopup.alert({
          title: 'Upload Status',
          template: res.data.message
        });
        $location.path('/tab/tabs');
      }
    }, function(res) {
      if (res.status == 400) {
        $ionicPopup.alert({
          title: 'Upload Status',
          template: res.data.message
        });
        $scope.errors = "Please fill following fields: " + res.data.errors;
      } else {
        $ionicPopup.alert({
          title: 'Upload Status',
          template: 'Unable to upload!! Please contact system admin'
        });
      }
    });
  };
})

.controller('OnboardingCtrl', function($rootScope, $scope, $http, $location, $ionicPopup) {
  $scope.truck_passing_regex = '[a-z A-Z]{2} [0-9]{2}';
  $scope.truck_number_regex = '[a-z A-Z]{1} [0-9]{4}';

  $scope.data = {};
  $http.get(rootLink + '/api/v0/sellers/filter', {
    params: {
      all: true
    }
  }).then(function(res) {
    $scope.allSellers = res.data;
  });

  $scope.onboard = function() {
    var link = rootLink + '/api/v0/trucks/create';
    var truckDetails = {
      truck_passing: $scope.data.truck_passing,
      truck_number: $scope.data.truck_number,
      seller_name: $scope.data.seller_name,
      bodytype: $scope.data.bodytype,
      variant: $scope.data.variant
    };
    $http.post(link, {
      truck: truckDetails
    }).then(function(res) {
      if (res.status == 200) {
        $rootScope.id = res.data.id;
        $ionicPopup.alert({
          title: 'Upload Status',
          template: res.data.message
        });
        $location.path('/tab/inspection');
      }
    }, function(res) {
      if (res.status == 400) {
        $ionicPopup.alert({
          title: 'Upload Status',
          template: res.data.message
        });
        $scope.errors = "Please fill following fields: " + res.data.errors;
      } else {
        $ionicPopup.alert({
          title: 'Upload Status',
          template: 'Unable to upload!! Please contact system admin'
        });
      }
    });
  };
})

.controller('InspectionCtrl', function($rootScope, $scope, $http, $location, $ionicPopup) {
  $scope.data = {};

  $scope.inspect = function() {
    var link = rootLink + '/api/v0/trucks/update/' + $rootScope.id;
    var truckDetails = {
      date_of_registration: $scope.data.date_of_registration,
      manufacturing_month_and_year: $scope.data.manufacturing_month_and_year,
      insurance_valid_till: $scope.data.insurance_valid_till,
      national_permit_valid_till: $scope.data.national_permit_valid_till,
      fitness_valid_till: $scope.data.fitness_valid_till,
      movement_status: $scope.data.movement_status
    };
    $http.post(link, {
      truck: truckDetails
    }).then(function(res) {
      if (res.status == 200) {
        $ionicPopup.alert({
          title: 'Upload Status',
          template: res.data.message
        });
        $location.path('/tab/pricing');
      }
    }, function(res) {
      if (res.status == 400) {
        $ionicPopup.alert({
          title: 'Upload Status',
          template: 'Please fill all the mandatory fields'
        });
        $scope.errors = "Please fill following fields: " + res.data.errors;
      } else {
        $ionicPopup.alert({
          title: 'Upload Status',
          template: 'Unable to upload!! Please contact system admin'
        });
      }
    });
  };
})

.controller('PriceCtrl', function($rootScope, $scope, $http, $location, $ionicPopup) {
  $scope.data = {};

  $scope.priceSubmit = function() {
    var link = rootLink + '/api/v0/trucks/update/' + $rootScope.id;
    var truckDetails = {
      seller_initial_price_on_rim: $scope.data.seller_initial_price_on_rim,
      seller_final_price_on_rim: $scope.data.seller_final_price_on_rim,
      grid_price: $scope.data.grid_price,
      seller_price: $scope.data.seller_price
    };
    $http.post(link, {
      truck: truckDetails
    }).then(function(res) {
      if (res.status == 200) {
        $rootScope.id = res.data.id;
        $ionicPopup.alert({
          title: 'Upload Status',
          template: res.data.message
        });
        $location.path('/tab/tabs');
      }
    }, function(res) {
      if (res.status == 400) {
        $ionicPopup.alert({
          title: 'Upload Status',
          template: 'Please fill all the mandatory fields'
        });
        $scope.errors = "Please fill following fields: " + res.data.errors;
      } else {
        $ionicPopup.alert({
          title: 'Upload Status',
          template: 'Unable to upload!! Please contact system admin'
        });
      }
    });
  };
})

.controller('SearchCtrl', function($scope, $http, $location, $ionicPopup) {
  $scope.search = function() {
    var searchQuery = document.getElementById("searchText").value;
    $http.get(rootLink + '/api/v0/trucks/filter', {
      params: {
        query: searchQuery
      }
    }).then(function(res) {
      $scope.trucks = res.data;
    });
  };
})


.controller('EditinspectCtrl', function($scope) {



})

.controller('DetailCtrl', function($scope, $stateParams, truckService) {
  var truck = truckService.getTruck($scope.id);

})


.controller('InventoryCtrl', function($rootScope, $scope, $http, $location, $ionicActionSheet) {
  if (!$rootScope.trucks) {
    $http.get(rootLink + '/api/v0/trucks/filter', {
      params: {
        all: true
      }
    }).then(function(res) {
      $scope.trucks = res.data;
    });
  } else {
    $scope.trucks = $rootScope.trucks;
  }

  $scope.reload = function() {
    window.location.reload();
  };

  $scope.filter = function() {
    $location.path('/tab/filter');
  };

  //Called when button is clicked
  $scope.showActionsheet = function() {
    var showActionSheet = $ionicActionSheet.show({
      buttons: [{
        text: '<i class="icon ion-share"></i>Share Paper Only'
      }, {
        text: '<i class="icon ion-share"></i>Share Brief'
      }, {
        text: '<i class="icon ion-share"></i>Share All Photos'
      }, {
        text: '<i class="icon ion-share"></i>Share All Except Papers'
      }, {
        text: '<i class="icon ion-share"></i>Share General Appearances'
      }],

      titleText: 'Select',
      cancelText: 'Cancel',

      cancel: function() {
        // add cancel code...
      },

      buttonClicked: function(index) {
        if (index === 0) {
          // add edit 1 code
        }

        if (index === 1) {
          // add edit 2 code
        }
      },
    });
  };
})

.controller('FilterCtrl', function($rootScope, $scope, $http, $location, $ionicPopup) {
  $scope.price = {
    min: '30000',
    max: '90000',
    value: '30000'
  };

  $scope.reload = function() {
    window.location.reload();
  };

  $scope.data = {};

  $scope.filter = function() {
    var link = rootLink + '/api/v0/trucks/filter';
    $http.get(link, {
      params: {
        variant: $scope.data.variant,
        oem: $scope.data.oem,
        bodytype: $scope.data.bodytype
      }
    }).then(function(res) {
      if (res.status == 200) {
        $rootScope.trucks = res.data;
        $location.path('/tab/inventory');
      }
    }, function(res) {
      $ionicPopup.alert({
        title: 'Filter Status',
        template: 'Unable to make request to server!! Please contact system admin'
      });
    });
  };
})


.controller('TabCtrl', function($rootScope, $scope) {
  $rootScope.trucks = {};
})


.controller('TruckCtrl', function($scope) {

});