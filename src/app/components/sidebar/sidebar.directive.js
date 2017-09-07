(function() {
    'use strict';

    angular
        .module('norseApp')
        .directive('norseSidebar', norseSidebar);

    /** @ngInject */
    function norseSidebar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/sidebar/sidebar.view.html',
            scope: {
                creationDate: '='
            },
            controller: SidebarController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function SidebarController() {}
    }

})();