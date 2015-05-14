'use strict';

var app = angular.module('PriceCalculationOfCircuitBoards', ['ngRoute', 'ngAnimate', 'ngSanitize', 'mgcrea.ngStrap', 'ui.bootstrap', 'ngTable']);

app.constant('ACCESS_LEVELS', {
    ROLE_ADMIN: [
        'ADMIN'
    ],
    ROLE_USER: [
        'USER',
        'ADMIN'
    ]
});

app.config(['$locationProvider', '$routeProvider', '$httpProvider', '$collapseProvider', 'ACCESS_LEVELS',
    function ($locationProvider, $routeProvider, $httpProvider, $collapseProvider, ACCESS_LEVELS) {

    angular.extend($collapseProvider.defaults, {
        disallowToggle: true
    });
    var access = ACCESS_LEVELS;
    var modulesPath = 'src';
    $routeProvider
        .when('/', {
            templateUrl: modulesPath + '/site/views/index.html',
            controller: 'SiteAuthController'
        })
        .when('/calculations', {
            templateUrl: modulesPath + '/calc/views/index.html',
            controller: 'CalculationIndexController'
        })
        .when ('/login', {
            templateUrl: modulesPath + '/site/views/login.html',
            controller: 'SiteAuthController'
        })
        .when ('/calculation/:calculation_id', {
            templateUrl: modulesPath + '/calc/views/make.html',
            controller: 'CalculationMakeController'
        })
        .when ('/calculation/:calculation_id/formulas', {
            templateUrl: modulesPath + '/formula/views/index.html',
            controller: 'FormulaIndexController'
        })
        .when ('/404', {
            templateUrl: modulesPath + '/site/views/errors/404.html',
            name: '404'
        })
        .otherwise({redirectTo: '/404', name: '404'});
    $locationProvider.html5Mode(true).hashPrefix('!');
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('tokenInterceptor');
}]);

app.value('app-version', '2.0.0');