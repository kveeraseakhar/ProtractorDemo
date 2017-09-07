(function() {
    'use strict';

    describe('controllers', function() {

        beforeEach(module('norseApp'));

        it('should define more than 5 awesome things', inject(function($controller) {
            var vm = $controller('MainController');
            console.log("Main Controller::::");
            
        }));
    });
})();