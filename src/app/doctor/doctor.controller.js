/**
 * 
 * 
 */
(function() {
	'use strict';

	angular
	.module('norseApp')
	.controller('DoctorController', DoctorController);

	DoctorController.$inject = ['$state', '$stateParams', 'DoctorService','$scope','$mdDialog','blockUI','$rootScope','$filter'];
	function DoctorController($state, $stateParams, DoctorService, $scope, Dialog,blockUI,$rootScope,$filter) {

		var vm = this;
		vm.myDate = new Date();
		vm.maxDate = new Date(
				this.myDate.getFullYear(),
				this.myDate.getMonth(),
				this.myDate.getDate()
		);

		function init(){
			vm.gridOptions = {
					data: [],
					urlSync: false
			};
			vm.isloaded = false;
			vm.isEdit = false;
			//vm.toEditDoctor = toEditDoctor;
			vm.showDoctorForm = showDoctorForm;
			vm.toRegisterDoc = toRegisterDoc;
			vm.toUpdateDoc = toUpdateDoc;
			vm.toDeleteDoc = toDeleteDoc;
			vm.toGetDoctorById = toGetDoctorById;
			vm.getDoctorList = getDoctorList;
		}
		var toGetDoctorById = function() {
			var id = $stateParams.id;
			DoctorService.GetById(id).then(function(response){
				if (response.responseCode == 0) {
					vm.user = response.responseObject;
					vm.user.dob = $filter('date')(vm.user.dob, 'MM/dd/yyyy');
					blockUI.stop();
					/*
					Dialog.show( Dialog.alert({
						textContent: response.responseMessage,
						ok: 'Close'
					}) )
					.finally(function() {
						blockUI.stop();
						console.log("success");
					});*/
				} else {
					//FlashService.Error(response.message);
					vm.dataLoading = false;
				}
			});
			
		};

		var toRegisterDoc = function() {
			/*blockUI.start("Saving...", {
				status: 'isLoading'
			});*/
			var dob = new Date(vm.user.dob); 
			vm.user.dob = dob.getTime();

			DoctorService.Create(vm.user).then(function(response){
				if (response.responseCode == 0) {
					Dialog.show( Dialog.alert({
						textContent: response.responseMessage,
						ok: 'Close'
					}) )
					.finally(function() {
						blockUI.stop();
						//$location.path('/doctor');
						$state.go('main.doctor');
						console.log("success");
					});
				} else {
					//FlashService.Error(response.message);
					vm.dataLoading = false;
				}
			});
		};

		var toUpdateDoc = function() {
			blockUI.start("Updating...", {
				status: 'isLoading'
			});
			var dob = new Date(vm.user.dob); 
			vm.user.dob = dob.getTime();

			DoctorService.Update(vm.user).then(function(response){
				if (response.responseCode == 0) {
					Dialog.show( Dialog.alert({
						textContent: response.responseMessage,
						ok: 'Close'
					}) )
					.finally(function() {
						
						//$location.path('/doctor');
						$state.go('main.doctor');
						console.log("success");
					});
				} else {
					//FlashService.Error(response.message);
					vm.dataLoading = false;
				}
			}).catch(function(){

			}).finally(function(){
				blockUI.stop();
			});
		};

		var toDeleteDoc = function(id){
			Dialog.show( Dialog.confirm({
				textContent: "Do You Want to Delete",
				ok:'Yes',
				cancel:'Cancel'
			}) ).then(function(){
				DoctorService.Delete(id).then(function(response){
					if (response.responseCode == 0) {
						getDoctorList();
						Dialog.show( Dialog.alert({
							textContent: response.responseMessage,
							ok: 'Close'
						}));
					} else {
						//FlashService.Error(response.message);
						vm.dataLoading = false;
					}
				}).finally(function() {
					blockUI.stop();
					console.log("success");
				});;
			});
		};

		function  getDoctorList(){
			/*blockUI.start("Loading Doctor List...", {
				status: 'isLoading'
			});*/
			DoctorService.GetAll().then(function (response) {
				vm.gridOptions.data = [];
				vm.gridOptions.data = response.responseObject;
				vm.isloaded = true;
			}).catch(function(){

			}).finally(function(){
				blockUI.stop();
			});
		}

		function showDoctorForm(){
			$('#addDoctorForm').show();
			$('#doctorsList').hide();
		}
		init();
	}
})();