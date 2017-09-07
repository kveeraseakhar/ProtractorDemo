
describe('PatientController', function() {
  beforeEach(module('norseApp'));

  var $controller, PatientService, connectionService, $httpBackend;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));
  beforeEach(inject(function(_PatientService_){
	  PatientService = _PatientService_;
	  }));

  beforeEach(inject(function(_connectionService_){
	  connectionService = _connectionService_;
	  }));
  
  beforeEach(inject(function(_$httpBackend_){
	  $httpBackend = _$httpBackend_;
	  }));

  describe('$scope.vm.addPatient', function() {
    it('Patient Registration', function() {
      var $scope = {};
      var controller = $controller('PatientController', { $scope: $scope,PatientService:PatientService});
      $scope.vm.user = {
    		  "age": 20,
    		  "bloodGroup": "A",
    		  "doctorName": "doctor",
    		  "email": "test123@gamil.com",
    		  "firstName": "test",
    		  "gender": "male",
    		  "joinDate": 08-10-2017,
    		  "lastName": "test",
    		  "mobileNo": "12343343333",
    		  "treatment": "test"
    		};
      
      $scope.vm.addPatient();
      
      $httpBackend
     .when('POST', 'https://byvczdmkmi.execute-api.us-east-1.amazonaws.com/dev/patient/save.ws')
      //.when('POST', 'http://107.22.238.22:8090/patient/save.ws')
      
      .respond(200, $scope.vm.user);
    ////$httpBackend.flush();
    expect($httpBackend.flush).not.toThrow();
    console.log("Add Patient::::: "+$scope.result);
    expect($scope.result).toBe(false);
    //expect($scope.response).toEqual({ foo: 'bar' });
      
    });
  });
});