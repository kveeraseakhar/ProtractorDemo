(function() {
	'use strict';

	angular
	.module('norseApp')
	.directive('norseHeader', norseHeader);

	/** @ngInject */
	function norseHeader() {
		var directive = {
				restrict: 'E',
				templateUrl: 'app/components/header/header.view.html',
				scope: {
					showUserMenu: '&showUserMenu'
				},
				controller: HeaderController,
				controllerAs: 'header',
				bindToController: true
		};

		return directive;

		/** @ngInject */
		function HeaderController() {
			var header = this;
			function showUserMenu(){
				$('.dropdown').toggleClass('open');
			}
			header.showUserMenu = showUserMenu;
		}
	}

})();