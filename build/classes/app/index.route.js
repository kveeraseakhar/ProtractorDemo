(function() {
    'use strict';

    angular
        .module('norseApp')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.view.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            }).state('register', {
                url: '/register',
                templateUrl: 'app/register/register.view.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            }).state('main', {
                templateUrl: 'app/main/main.view.html',
                controller: 'MainController',
                controllerAs: 'mainCtrl'
            }).state('main.dashboard', {
                url: '/',
                templateUrl: 'app/dashboard/dashboard.view.html',
                controller: 'DashboardController',
                controllerAs: 'vm'
            }).state('main.doctor', {
                url: '/doctor',
                templateUrl: 'app/doctor/doctor.view.html',
                controller: 'DoctorController',
                controllerAs: 'vm'
            }).state('main.addDoctor', {
                url: '/addDoctor',
                templateUrl: 'app/doctor/addDoctor.view.html',
                controller: 'DoctorController',
                controllerAs: 'vm'
            }).state('main.editDoctor', {
                url: '/editDoctor/:id',
                templateUrl: 'app/doctor/editDoctor.view.html',
                controller: 'DoctorController',
                controllerAs: 'vm'
            }).state('main.patient', {
                url: '/patient',
                templateUrl: 'app/patient/patient.view.html',
                controller: 'PatientController',
                controllerAs: 'vm'
            }).state('main.addPatient', {
                url: '/addPatient',
                templateUrl: 'app/patient/addPatient.view.html',
                controller: 'PatientController',
                controllerAs: 'vm'
            }).state('main.editPatient', {
                url: '/editPatient/:id',
                templateUrl: 'app/patient/editPatient.view.html',
                controller: 'PatientController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');
    }

})();