angular.module('ionicApp.controllers', [])

.controller('LoginCtrl', function($scope) {


    
    
})

.controller('ClientCtrl', function($scope , $http, $location) {


    $scope.data = {};

    $scope.client= function(){
        var link = 'http://192.168.0.3:3000/api/v0/abc/create';
        var clients={seller_company_name:$scope.data.seller_company_name,seller_proprietor:$scope.data.seller_proprietor,proprietor_phone_1:$scope.data.proprietor_phone_1,proprietor_phone_2:$scope.data.proprietor_phone_1,office_address:$scope.data.office_address};
          $http.post(link,{client:clients}).then(function (res){
            $scope.response = res.data;
            
            });
        $location.path('/tab/tabs');
    };
 
})



.controller('InspectCtrl', function($scope , $http, $location) {


    $scope.data = {};

    $scope.inspect= function(){
        var link = '';
        var trucks={truck_passing:$scope.data.truck_passing,truck_number:$scope.data.truck_number,seller_name:$scope.data.seller_name,body_type:$scope.data.body_type,variant:$scope.data.variant,seller_estimated_price_on_rim:$scope.data.seller_estimated_price_on_rim};
          $http.post(link,{truck:trucks}).then(function (res){
            $scope.response = res.data;
            
            });
        $location.path('/tab/inspect2');
    };
})

.controller('InspectCtrl2', function($scope) {


  
})

.controller('SearchCtrl', function($scope) {


  
})


.controller('EditinspectCtrl', function($scope) {


  
})

.controller('DetailCtrl', function($scope,$stateParams, truckService) {
    var truck = truckService.getTruck($scope.id);
  
})


.controller('InventoryCtrl',  function($scope, $ionicActionSheet, $stateParams, truckService) {
//Called when button is clicked
    $scope.showActionsheet = function() {
       var showActionSheet = $ionicActionSheet.show({
         buttons: [
            { text: '<i class="icon ion-share"></i>Share Paper Only' },
            { text: '<i class="icon ion-share"></i>Share Brief' },
            { text: '<i class="icon ion-share"></i>Share All Photos' },
            { text: '<i class="icon ion-share"></i>Share All Except Papers' },
            { text: '<i class="icon ion-share"></i>Share General Appearances' }
         ],
            
         
         titleText: 'Select',
         cancelText: 'Cancel',
            
         cancel: function() {
            // add cancel code...
         },
            
         buttonClicked: function(index) {
            if(index === 0) {
               // add edit 1 code
            }
                
            if(index === 1) {
               // add edit 2 code
            }
         },
            
         
      });


    };

truckService.getTrucks().then(function(trucks){
        //trucks is an array of truck objects
    });   
    
})

.controller('FilterCtrl', function($scope , $http , $location) {

    $scope.price= {
        min:'30000',
        max:'90000',
        value:'30000'
    }

      $scope.data = {};



    $scope.filter= function(){
        var link = 'http://192.168.0.3:3000/api/v0/trucks/filter';
        //var filters={seller_estimated_price_on_rim:$scope.data.seller_estimated_price_on_rim,variant:$scope.data.variant,Oem:$scope.data.Oem,body_type:$scope.data.body_type};
          $http.get(link,{params:{seller_estimated_price_on_rim:$scope.data.seller_estimated_price_on_rim,variant:$scope.data.variant,Oem:$scope.data.Oem,body_type:$scope.data.body_type
}
}).then(function (res){
            $scope.response = res.data;
            
            });
       $location.path('/tab/inventory');
    };



})


.controller('TabCtrl', function($scope) {

})


.controller('TruckCtrl', function($scope) {
  
});
