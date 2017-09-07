(function() {
	'use strict';

	angular
	.module('norseApp')
	.controller('MainController', MainController);

	/** @ngInject */
	MainController.$inject = ['$state', 'AuthenticationService'];
	function MainController($state, AuthenticationService) {
		var mainCtrl = this;
        function logout() {
			AuthenticationService.ClearCredentials();
			$state.go('login');
		}
        function showUserMenu(){
 			$('.dropdown').toggleClass('open');
 		}	
        mainCtrl.logout = logout;
		mainCtrl.showUserMenu = showUserMenu;
	}
})();