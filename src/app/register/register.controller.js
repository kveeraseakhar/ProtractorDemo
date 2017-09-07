/**
 * 
 * 
 */
(function() {
	'use strict';

	angular
	.module('norseApp')
	.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$scope', 'UserService'];
	function RegisterController( $scope, UserService) {

		$scope.vm = this;

		$scope.vm.userRegister = userRegister;
		$scope.user = {};
		
		function userRegister() {
			//$scope.vm.user.password = md5.createHash(vm.user.password);
			UserService.Create($scope.vm.user).then(function (response) {
				$scope.result = response.success;
				if (response.success == true) {
					//$state.go('login',{url: '/login'});
				} else {
					//FlashService.Error(response.message);
					$scope.vm.dataLoading = false;
				}
			});
		};


	}
})();