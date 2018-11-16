(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('OrderList.IndexController', Controller);
 
    function Controller($window, SFService, FlashService) {
        var vm = this;
 
        vm.OrderList = null;
 
        initController();
 
        function initController() {
            // get current user
            SFService.GetAll().then(function (OrderList) {
                vm.OrderList = OrderList;
				console.log('vm.OrderList '+vm.OrderList );
				alert('success');
            })
			.catch(function (error) {
				//FlashService.Error(error);
				alert('Error');
			});
        }
    }
 
})();