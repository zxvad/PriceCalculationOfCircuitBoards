'use strict';
app.controller('SiteAuthController', ['$scope', '$location', 'userService', 'authService', 'ACCESS_LEVELS',
    function ($scope, $location,  userService, authService, ACCESS_LEVELS) {
        $scope.getLogged = function () {
            return authService.isLoggedIn();
        };
        $scope.accessLevel = ACCESS_LEVELS;

        $scope.logIn = function (username, password) {
            username = typeof username !== 'undefined' ? username : null;
            password = typeof password !== 'undefined' ? password : null;

            authService.signIn(username, password)
                .then(function () {
                    $scope.loginError = false;
                    $location.path('/');
                })
                .catch(function (response) {
                    $scope.form['username'].$setValidity('required', true);
                    $scope.form['password'].$setValidity('required', true);
                    $scope.form['password'].$setValidity('wrong_creditials', true);
                    angular.forEach(response, function (key, value) {
                        $scope.loginError = true;
                        $scope.form[key['field']].$setValidity(key['message'], false);
                    });
                });
        };

        $scope.logOut = function logOut() {
            authService.signOut()
                .then(function () {
                    $location.path('login');
                });
        }
    }]);