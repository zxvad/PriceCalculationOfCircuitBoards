'use strict';
app
    .controller('CalculationMakeController', ['$scope', '$location', '$window', 'ACCESS_LEVELS', 'rest',
        function ($scope, $location, $window, ACCESS_LEVELS, rest) {
            $scope.calc = {};
            $scope.errors = {};
            $scope.makeCalc = function () {
                console.log(1);
                rest.postModel($scope.calc, 'v1/calculation/make').success(function (data) {
                    console.log(data);
                }).error(function (error) {
                    $scope.errors = {};
                    angular.forEach(error, function (key, value) {
                        if ($scope.form[key['field']]!==undefined){
                            $scope.form[key['field']].$dirty = true;
                            $scope.form[key['field']].$setValidity('server', false);
                            $scope.errors[key['field']] = key['message'];
                        }
                    });
                })
            }
        }
    ]);