/**
 * 
 * 
 */
(function() {
    'use strict';

    angular
        .module('norseApp')
        .controller('LoginController', LoginController);
    
    /** @ngInject */
    LoginController.$inject = ['$state', 'AuthenticationService','md5', '$scope', '$rootScope', '$translate', '$interval'];
    function LoginController($state, AuthenticationService, md5, $scope, $rootScope, $translate, $interval) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            var password = md5.createHash(vm.user.password);//Securify.encrypt(vm.user.password,'pef');
            AuthenticationService.Login(vm.user.userName, password, function (response) {
                if (response.isSuccess) {
                    AuthenticationService.SetCredentials(vm.user.username, vm.user.password, response);
                    $state.go('main.dashboard');
                } else {
                    //FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }
        $scope.password = '';
        $scope.testPasswordStrength = function() {
          var size = $scope.password.length;
          if (size > 8) {
            $scope.strength = 'strong';
          } else if (size > 3) {
            $scope.strength = 'medium';
          } else {
            $scope.strength = 'weak';
          }
        };
        
        /**
         * Translations for the view
         */
        var pageTitleTranslationId = 'PAGE_TITLE';
        var pageContentTranslationId = 'PAGE_CONTENT';

        $translate(pageTitleTranslationId, pageContentTranslationId)
          .then(function (translatedPageTitle, translatedPageContent) {
            $rootScope.pageTitle = translatedPageTitle;
            $rootScope.pageContent = translatedPageContent;
          });
        /**
         * $scope.locale
         */
        $scope.locale = $translate.use();
        
        /**
         * Provides info about current route path
         */
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
          $scope.currentPath = current.$$route.originalPath;
        });

        /**
         * Current time
         */
        $scope.currentTime = Date.now();
        $interval(function () {
          $scope.currentTime = Date.now();
        }, 1000);


        /**
         * EVENTS
         */
        $rootScope.$on('$translateChangeSuccess', function (event, data) {
          $scope.locale = data.language;
          $rootScope.pageTitle = $translate.instant(pageTitleTranslationId);
          $rootScope.pageContent = $translate.instant(pageContentTranslationId);
        });
    }
})();