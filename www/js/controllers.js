if (ionic.Platform.isAndroid()) {
  var rootLink = "http://enginechief.in";
} else {
  var rootLink = "http://192.168.2.36:3000";
}

angular.module('ec.sales.controllers', [])

// login view
.controller('LoginCtrl', function($scope) {})

// menu view
.controller('TabCtrl', function($rootScope, $scope) {})

// inventory view
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

// seller view
.controller('SellerCtrl', function($rootScope, $scope, $http, $location, $ionicPopup) {
  $scope.data = {};
  $http.get(rootLink + "/api/v0/sellers/transport_centers").then(function(res) {
    $scope.transportCenters = res.data;
  });

  // runs whenever the view is loaded
  $scope.$on("$ionicView.enter", function(event, data) {
    // handle event
    console.log(event);
  });

  $scope.seller = function() {
    var link = rootLink + '/api/v0/sellers/create';
    var sellerDetails = {
      seller_company_name: $scope.data.seller_company_name,
      seller_proprietor: $scope.data.seller_proprietor,
      proprietor_phone_1: $scope.data.proprietor_phone_1,
      proprietor_phone_2: $scope.data.proprietor_phone_2,
      managers: [{
        name: $scope.data.manager1_name,
        phone_1: $scope.data.manager1_phone_1,
        phone_2: $scope.data.manager1_phone_2
      }, {
        name: $scope.data.manager2_name,
        phone_1: $scope.data.manager2_phone_1,
        phone_2: $scope.data.manager2_phone_2
      }],
      office_address: $scope.data.office_address
    };
    if($scope.data.transport_center) {
      sellerDetails.transport_center_id = $scope.data.transport_center.id;
    }
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
        errorKeys = [];
        for (var k in res.data.errors) {
          el = document.getElementsByName(k)[0];
          el.style.border = "2px solid red";
        }
        $scope.errors = JSON.stringify(res.data.errors);
      } else {
        $ionicPopup.alert({
          title: 'Upload Status',
          template: 'Unable to upload!! Please contact system admin'
        });
      }
    });
  };
})

// onboarding view
.controller('OnboardingCtrl', function($rootScope, $scope, $http, $location, $ionicPopup) {
  // all this code runs everytime the view is loaded (if caching is turned off)
  $scope.data = {};

  $scope.truck_passing_regex = '[a-z A-Z]{2} [0-9]{2}';
  $scope.truck_number_regex = '[a-z A-Z]{1,2} [0-9]{4}';

  $http.get(rootLink + '/api/v0/sellers/filter', {
    params: {
      all: true
    }
  }).then(function(res) {
    $scope.allSellers = res.data;
  });

  $http.get(rootLink + "/api/v0/trucks/variants").then(function(res) {
    $scope.variants = res.data;
  });

  $http.get(rootLink + "/api/v0/trucks/bodytypes").then(function(res) {
    $scope.bodytypes = res.data;
  });

  $scope.onboard = function() {
    var link = rootLink + '/api/v0/trucks/create';
    var truckDetails = {
      truck_passing: $scope.data.truck_passing,
      truck_number: $scope.data.truck_number,
      seller_name: $scope.data.seller_name.seller_company_name,
      bodytype_id: $scope.data.bodytype.id,
      variant_id: $scope.data.variant.id,
      status: "New"
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
      seller_price: $scope.data.seller_price,
      status: "Ready for Inspection"
    };
    $http.post(link, {
      truck: truckDetails
    }).then(function(res) {
      if (res.status == 200) {
        $rootScope.id = res.data.id;
        $ionicPopup.alert({
          title: 'Upload Status',
          template: res.data.message + "and moved to inspection list"
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

// search/inspection view
.controller('SearchCtrl', function($rootScope, $scope, $http, $location, $ionicPopup) {
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

  $scope.loadTruck = function(truck) {
    $rootScope.truck = truck;
    $location.path("tab/editinspect");
  };
})

.controller('EditinspectCtrl', function($rootScope, $scope, $http, $ionicPopup, $location) {
  $scope.data = {};

  if ($rootScope.truck) {
    $http.get(rootLink + '/api/v0/trucks/details/' + $rootScope.truck.id).then(function(res) {
      $scope.data = res.data.result;
      dateFields = ["date_of_registration", "manufacturing_month_and_year", "insurance_valid_till",
        "national_permit_valid_till", "fitness_valid_till"
      ];

      for (i = 0; i < dateFields.length; i++) {
        x = dateFields[i];
        if ($scope.data[x]) {
          arr = $scope.data[x].split("-");
          $scope.data[x] = new Date(arr[0], arr[1] - 1, arr[2]);
        }
      }
    });
  }

  $scope.editinspect = function() {
    var link = rootLink + '/api/v0/trucks/update/' + $rootScope.truck.id;
    var truckDetails = {
      variant: $scope.data.variant,
      date_of_registration: document.getElementById("regdate").value,
      // always saving date as 1 in mfmn "yyyy-MM" -> "yyyy-MM-dd"
      manufacturing_month_and_year: document.getElementById("mfmn").value + "-01",
      insurance_valid_till: document.getElementById("insurance").value,
      national_permit_valid_till: document.getElementById("permit").value,
      fitness_valid_till: document.getElementById("fitness").value,
      seller_initial_price_on_rim: $scope.data.seller_initial_price_on_rim,
      seller_final_price_on_rim: $scope.data.seller_final_price_on_rim,
      grid_price: $scope.data.grid_price,
      seller_price: $scope.data.seller_price,
      front_tyre_price: $scope.data.front_tyre_price,
      front_tyre_2_price: $scope.data.front_tyre_2_price,
      crown_axle_tyre_price: $scope.data.crown_axle_tyre_price,
      last_axle_tyre_price: $scope.data.last_axle_tyre_price,
      last_axle_tyre_2_price: $scope.data.last_axle_tyre_2_price,
      hydraulic_tyre_price: $scope.data.hydraulic_tyre_price,
      hydraulic_tyre_2_price: $scope.data.hydraulic_tyre_2_price,
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

.controller('DetailCtrl', function($scope, $stateParams, truckService) {
  var truck = truckService.getTruck($scope.id);

});