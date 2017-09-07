(function() {
    'use strict';

    angular
        .module('norseApp')
        .directive('norseFooter', norseFooter);

    /** @ngInject */
    function norseFooter() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/footer/footer.view.html',
            scope: {
                creationDate: '='
            },
            controller: FooterController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function FooterController() {}
    }

})();