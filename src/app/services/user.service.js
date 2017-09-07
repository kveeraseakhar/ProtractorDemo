(function () {
	'use strict';

	angular
	.module('norseApp')
	.factory('UserService', UserService);

	UserService.$inject = ['$http', 'connectionService'];
	function UserService($http, connectionService) {
		var service = {};

		service.GetAll = GetAll;
		service.GetById = GetById;
		service.GetByUsername = GetByUsername;
		service.Create = Create;
		service.Update = Update;
		service.Delete = Delete;

		return service;
		function getApiUrl(){

		}
		function GetAll() {
			return connectionService.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
		}

		function GetById(id) {
			return connectionService.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
		}

		function GetByUsername(username) {
			return connectionService.get('api/users').then(handleSuccess, handleError('Error getting user by username'));
		}

		function Create(user) {
			return connectionService.post('registration/admin.ws', user).then(handleSuccess, handleError('Error creating user'));
		}

		function Update(user) {
			return connectionService.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
		}

		function Delete(id) {
			return connectionService.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
		}

		// private functions

		function handleSuccess(res) {
			return res;
		}

		function handleError(error) {
			return function () {
				return { success: false, message: error };
			};
		}
	}

})();