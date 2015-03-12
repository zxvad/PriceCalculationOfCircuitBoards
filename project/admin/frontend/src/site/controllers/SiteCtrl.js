'use strict';
app.controller('SiteAuthController', ['$scope', '$location', 'userService', 'authService', 'ACCESS_LEVELS',
    function ($scope, $location,  userService, authService, ACCESS_LEVELS) {
        $scope.getLogged = function () {
            return authService.isLoggedIn();
        };
        $scope.accessLevels = ACCESS_LEVELS;

        $scope.accountUrl = userService.getPartnerId() !== null ? 'contact-account' : 'account';

        $scope.logIn = function (username, password) {
            username = typeof username !== 'undefined' ? username : null;
            password = typeof password !== 'undefined' ? password : null;

            authService.signIn(username, password)
                .then(function () {
                    $scope.loginError = false;
                    if (authService.getRole() == 'partnercontact') {
                        $location.path('partners/' + userService.getPartnerId() + '/info'); // todo: check
                    } else {
                        $location.path('/');
                    }
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

app
    .controller('SiteAccController', ['$routeParams', '$scope', 'rest', '$location',
        function ($routeParams, $scope, rest, $location) {
            rest.path = "v1/site/activate";
            $scope.activated = false;
            rest.postModel({user_id:$routeParams.user_id, token:$routeParams.token}).success(function (data) {
                if (data.success == false)
                    $location.path("404");
            }).error(function (error) {
                console.log(error);
            });
            $scope.user = {
                password: "",
                confirmPassword: "",
                id: $routeParams.user_id
            };
            $scope.activate = function(user) {
                $scope.errors = {};
                rest.path = "v1/site/setpassword";
                rest.postModelWithId(user).success(function (data) {
                   if (data.success == true) {
                       $scope.activated = true;
                   }
                }).error(function (response) {
                    angular.forEach(response, function (key, value) {
                        if ($scope.form[key['field']]!==undefined){
                            $scope.form[key['field']].$dirty = true;
                            $scope.form[key['field']].$setValidity('server', false);
                            $scope.errors[key['field']] = key['message'];
                        }
                    });
                });
            };
        }]);

app
    .controller('SiteForgotPswdController', ['$scope', 'rest',
        function ($scope, rest) {
            $scope.user = {
                username:""
            };
            $scope.reset = false;
            $scope.resetPassword = function(user) {
                rest.path = "v1/site/forgotpswd";
                $scope.errors = {};
                rest.postModel(user).success(function (data) {
                    $scope.reset = true;
                }).error(function (response) {
                    angular.forEach(response, function (key, value) {
                        if ($scope.form[key['field']]!==undefined){
                            $scope.form[key['field']].$dirty = true;
                            $scope.form[key['field']].$setValidity('server', false);
                            $scope.errors[key['field']] = key['message'];
                        }
                    });
                });
            };
        }]);

