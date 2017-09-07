
describe('RegisterController', function() {
  beforeEach(module('norseApp'));

  var $controller, UserService, connectionService,$httpBackend;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));
  beforeEach(inject(function(_UserService_){
	    UserService = _UserService_;
	  }));

  beforeEach(inject(function(_connectionService_){
	  connectionService = _connectionService_;
	  }));
  
  beforeEach(inject(function(_$httpBackend_){
	  $httpBackend = _$httpBackend_;
	  }));

  describe('$scope.vm.userRegister', function() {
    it('User Registration', function() {
      var $scope = {};
      var controller = $controller('RegisterController', { $scope: $scope,UserService:UserService});
      $scope.vm.user = {
        	  "address": "test",
        	  "bloodGroup": "A",
        	  "dob": 651089731000,
        	  "email": "ranji123334@enlume.com",
        	  "firstName": "ranjith",
        	  "gender": "male",
        	  "lastName": "kumar",
        	  "mobileNo": "1111166464",
        	  "password": "wqdwqdwq",
        	  "pinCode": "12345"
        	};
      
      $scope.vm.userRegister();
      
      $httpBackend
      .when('POST', 'https://byvczdmkmi.execute-api.us-east-1.amazonaws.com/dev/registration/admin.ws')
      //.when('POST', 'http://107.22.238.22:8090//registration/admin.ws')
      .respond(200, $scope.vm.user);
    ////$httpBackend.flush();
    expect($httpBackend.flush).not.toThrow();
    console.log("register User:::: "+$scope.result);
    expect($scope.result).toBe(false);
    //expect($scope.response).toEqual({ foo: 'bar' });
      
    });
  });
});