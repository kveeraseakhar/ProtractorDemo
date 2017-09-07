(function () {
    'use strict';

    angular
        .module('norseApp')
        .factory('DoctorService', DoctorService);

    DoctorService.$inject = ['connectionService'];
    function DoctorService(connectionService) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        function GetAll() {
            return connectionService.get('doctor/list.ws').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return connectionService.get('doctor/fetch.ws?id='+id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return connectionService.get('/api/doctors/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return connectionService.post('doctor/save.ws', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return connectionService.put('doctor/update.ws',user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return connectionService.toDelete('doctor/delete.ws?id='+id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
        		return res.resp;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
        return service;
    }

})();