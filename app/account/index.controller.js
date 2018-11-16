(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Account.IndexController', Controller);
 
    function Controller($window, UserService, FlashService) {
        var vm = this;
 
        vm.user = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;
 
        initController();
 
        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }
 
        function saveUser() {
			if(vm.user.password == vm.user.cpassword){
				UserService.Update(vm.user)
					.then(function () {
						FlashService.Success('User updated');
					})
					.catch(function (error) {
						FlashService.Error(error);
					});
			}
        }
 
        function deleteUser() {
            UserService.Delete(vm.user._id)
                .then(function () {
                    // log user out
					FlashService.Success('User Deleted');
                    $window.location = '/app/#/';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }
 
})();