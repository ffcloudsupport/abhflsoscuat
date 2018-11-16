(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('OrderView.IndexController', Controller);
 
    function Controller($window, SFService,FlashService,$stateParams) {
        var vm = this;
        vm.Order = null;
		vm.getOrder = getOrder;
		vm.Close = Close;
		vm.orderFound = false;
		vm.fetchingData = false;
		vm.orderId = $stateParams.Id;
		getOrder();
		function getOrder() {
			vm.orderFound = false;
			vm.fetchingData = true;
			SFService.GetById(vm.orderId)
				.then(function (Order) {
					vm.Order = Order;
					if(vm.Order != null){
						vm.orderFound = true;
						vm.fetchingData = false;
						vm.Order.Date_Of_Birth__c = new Date(vm.Order.Date_Of_Birth__c );
					}else{
						vm.fetchingData = false;
						alert('Order does not exist');
					}
				})
				.catch(function (error) {
					FlashService.Error('Error Occured Please Contact Administrator');
					vm.fetchingData = false;
					vm.orderFound = false;
				});
			
        }
		function Close() {
			$window.location = '/app/#/order';
			// vm.orderFound = false;
			// vm.fetchingData = false;
		 }
    }
 
})();