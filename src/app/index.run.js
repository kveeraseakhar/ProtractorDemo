(function() {
    'use strict';

    angular
        .module('norseApp')
        .run(run);

    /** @ngInject */
    run.$inject = ['$rootScope', '$state', '$location', '$cookies', '$http', 'AuthenticationService'];
    function run($rootScope, $state, $location, $cookies, $http, AuthenticationService) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
           // $http.defaults.headers.common.Authorization = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
            		AuthenticationService.ClearCredentials();
                event.preventDefault(); 
            		$state.go('login',{url: '/login'});
            }
        });
}

})();