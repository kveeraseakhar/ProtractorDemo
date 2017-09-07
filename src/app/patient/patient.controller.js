/**
 * 
 * 
 */
(function() {
	'use strict';

	angular
	.module('norseApp')
	.controller('PatientController', PatientController);

	PatientController.$inject = ['$state', '$stateParams', 'PatientService','$scope','$mdDialog','blockUI','$rootScope','$filter'];
	function PatientController($state, $stateParams, PatientService, $scope,Dialog,blockUI,$rootScope,$filter) {

		$scope.vm = this;
		$scope.vm.myDate = new Date();
		$scope.vm.maxDate = new Date(
				this.myDate.getFullYear(),
				this.myDate.getMonth(),
				this.myDate.getDate()
		);
		$scope.user = {};

		function init(){

			$scope.vm.gridOptions = {
					data: [],
					urlSync: false
			};
			$scope.vm.isloaded = false;
			$scope.vm.addPatient = addPatient;
			$scope.vm.showPatientForm = showPatientForm;
			$scope.vm.toUpdatePatient = toUpdatePatient;
			$scope.vm.toDeletePatient = toDeletePatient;
			$scope.vm.getPatientsList = getPatientsList;
			$scope.vm.toGetPatientById = toGetPatientById;
		}

		var toGetPatientById = function() {
			var id = $stateParams.id*1;
			PatientService.GetById(id).then(function(response){
				if (response.responseCode == 0) {
					$scope.vm.user = response.responseObject;
					$scope.vm.user.joinDate = $filter('date')(vm.user.joinDate, 'MM/dd/yyyy');
					blockUI.stop();
				} else {
					//FlashService.Error(response.message);
					$scope.vm.dataLoading = false;
					blockUI.stop();
				}
			});

		}


		function addPatient() {
			var joinDate = new Date($scope.vm.user.joinDate); 
			$scope.vm.user.joinDate = joinDate.getTime();

			PatientService.Create($scope.vm.user).then(function(response){
				
				console.log("Patient :::::"+ JSON.stringify(response));
				
				$scope.result = response.success;
				if (response.success == true) {
					Dialog.show( Dialog.alert({
						textContent: response.responseMessage,
						ok: 'Close'
					}) )
					.finally(function() {
						console.log("success");
						$state.go("main.patient");
					});
				} else {
					$scope.vm.dataLoading = false;
				}
			});
		}

		var toUpdatePatient = function() {
			/*blockUI.start("Updating...", {
				status: 'isLoading'
			});*/
			//var dob = new Date(vm.user.dob); 
			//vm.user.dob = dob.getTime();
			var joinDate = new Date(vm.user.joinDate); 
			$scope.vm.user.joinDate = joinDate.getTime();

			PatientService.Update(vm.user).then(function(response){
				if (response.responseCode == 0) {
					Dialog.show( Dialog.alert({
						textContent: response.responseMessage,
						ok: 'Close'
					}) )
					.finally(function() {

						$state.go('main.patient');
						console.log("success");
					});
				} else {
					//FlashService.Error(response.message);
					$scope.vm.dataLoading = false;
				}
			}).catch(function(){

			}).finally(function(){
				blockUI.stop();
			});;
		}

function toDeletePatient(id){
			Dialog.show( Dialog.confirm({
				textContent: "Do You Want to Delete",
				ok:'Yes',
				cancel:'Cancel'
			}) ).then(function(){
				PatientService.Delete(id).then(function(response){
					if (response.responseCode == 0) {
						getPatientsList();
						Dialog.show( Dialog.alert({
							textContent: response.responseMessage,
							ok: 'Close'
						}));
					} else {
						//FlashService.Error(response.message);
						$scope.vm.dataLoading = false;
					}
				}).finally(function() {
					blockUI.stop();
					console.log("success");
				});;
			});
		}

		function  getPatientsList(){
			PatientService.GetAll().then(function (response) {
				$scope.vm.gridOptions.data = response.responseObject;
				$scope.vm.isloaded = true;
			});
		}

		function showPatientForm(){
			$('#addPatientForm').show();
			$('#patientList').hide();
		}

		init();
	}
})();