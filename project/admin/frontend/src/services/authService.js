'use strict';

app.factory('authService', ['$http', 'rest', '$window', '$q', 'ACCESS_LEVELS',
    function ($http, rest, $window, $q, ACCESS_LEVELS) {
        var signIn = function (username, password) {
            var deferred = $q.defer();
            $http.post(rest.baseUrl + 'v1/site/login', {username: username, password: password}) // todo: remove rest.baseUrl from here
                .success(function (data) {
                    if (data.username) {
                        _auth({
                            token: data.token,
                            username: data.username,
                            role: data.role
                        });

                        $window.localStorage.user = JSON.stringify({
                            name: data.username
                        });

                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                })
                .error(function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        };

        var _auth = function (authObj) {
            if (authObj) {
                return $window.localStorage.auth = JSON.stringify(authObj);
            } else {
                return $window.localStorage.auth ? JSON.parse($window.localStorage.auth) : null;
            }
        };

        var getToken = function () {
            return _auth() !== null ? _auth().token : null;
        };

        var getRole = function () {
            return _auth() !== null ? _auth().role : null;
        };

        var authorize = function (accessLevel) { // todo: what's it?
            var role = getRole();
            return accessLevel.indexOf(role) > -1;
        };

        var hasAccess = function(accessLevelName) {
            var role = getRole() || 'USER';
            if (ACCESS_LEVELS[accessLevelName]) {
                return ACCESS_LEVELS[accessLevelName].indexOf(role) > -1;
            }
            return false;
        };

        var isLoggedIn = function () {
            return _auth() !== null;
        };

        var signOut = function () {
            var deferred = $q.defer();
            delete $window.localStorage.auth;
            delete $window.localStorage.user;
            deferred.resolve();
            return deferred.promise;
        };

        return {
            signIn: signIn,
            getToken: getToken,
            signOut: signOut,
            isLoggedIn: isLoggedIn,
            getRole: getRole,
            hasAccess: hasAccess,
            authorize: authorize
        }
    }]);

app
    .factory('userService', ['$http', 'rest', '$window', function ($http, rest, $window) {
        var _user = function (userObj) {
            if (userObj) {
                return $window.localStorage.user = JSON.stringify(userObj);
            } else {
                return $window.localStorage.user ? JSON.parse($window.localStorage.user) : null;
            }
        };

        return {
            getUser: _user
        }
    }]);

app
    .factory('tokenInterceptor', ['$q', '$window', '$location', '$injector', function ($q, $window, $location, $injector) {
        return {
            request: function (config) {
                var restBaseUrl = $injector.get('rest').baseUrl; // todo: remove from here?

                var token = $window.localStorage.auth ? JSON.parse($window.localStorage.auth).token : null;

                if (token && config.url.indexOf(restBaseUrl) > -1) {
                    if (angular.isUndefined(config.params) || config.params === null) {
                        config.params = {'access-token': token};
                    } else {
                        config.params['access-token'] = token;
                    }
                }
                return config;
            },
            requestError: function (rejection) {
                return $q.reject(rejection);
            },

            response: function (response) {
                return response || $q.when(response);
            },

            responseError: function (rejection) {
                delete $window.localStorage.auth;
                delete $window.localStorage.user;
                $location.path('/login');
                return $q.reject(rejection);
            }
        };
    }]);
