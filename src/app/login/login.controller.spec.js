describe('LoginController', function() {
  beforeEach(module('norseApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.testPasswordStrength', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      var $scope = {};
      var controller = $controller('LoginController', { $scope: $scope });
      console.log("Login Controller::::");
      $scope.password = 'Dhanraj1234!';
      $scope.testPasswordStrength();
      expect($scope.strength).toEqual('strong');
    });
  });
});