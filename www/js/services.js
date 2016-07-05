angular.module('ec.sales.services', [])

.factory('truckService', function($http) {
	var trucks = [];

	return {
		getTrucks: function(){
			return $http.get(" ").then(function(response){
				trucks = response;
				return trucks;
			});
		},
		getTruck: function(id){
			for(i=0;i < trucks.length;i++){
				if(trucks[i].id == truckId){
					return trucks[i];
				}
			}
			return null;
		}
	};
});