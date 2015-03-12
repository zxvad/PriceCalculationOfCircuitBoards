'use strict';

var app = angular.module('PriceCalculationOfCircuitBoards', ['ngRoute', 'ngAnimate', 'ngSanitize', 'mgcrea.ngStrap', 'ui.bootstrap']);


app.config(['$locationProvider', '$routeProvider', '$httpProvider', '$collapseProvider',
    function ($locationProvider, $routeProvider, $httpProvider, $collapseProvider) {

    angular.extend($collapseProvider.defaults, {
        disallowToggle: true
    });

    var modulesPath = 'src';
    $routeProvider
        .when('/', {
            templateUrl: modulesPath + '/site/views/index.html',
            controller: 'SiteController'
        })
        .otherwise({redirectTo: '/404', name: '404'});
    $locationProvider.html5Mode(true).hashPrefix('!');
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('tokenInterceptor');
}]);

app.value('app-version', '2.0.0');