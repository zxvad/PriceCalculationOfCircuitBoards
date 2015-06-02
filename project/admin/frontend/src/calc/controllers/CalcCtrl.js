'use strict';
app
    .controller('CalculationMakeController', ['$scope', '$location', '$window', 'ACCESS_LEVELS', 'rest', '$routeParams',
        function ($scope, $location, $window, ACCESS_LEVELS, rest, $routeParams) {
            $scope.calc = {};
            $scope.errors = {};
            rest.modelTable({calculation_id: $routeParams.calculation_id, expand: 'formula'}, 'v1/inputparams').success(function(data){
                $scope.inputParams = data;
            }).error(function(error){
                console.log(error);
            });
            $scope.makeCalc = function () {
                $scope.params = [];
                angular.forEach($scope.inputParams, function(row, key) {
                    $scope.params.push({name: row.formula.variable, value: row.send});
                });
                rest.postModel($scope.params, 'v1/calculations/make/' + $routeParams.calculation_id).success(function (data) {
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

app
    .controller('CalculationIndexController', ['$scope', 'calculationTableService', '$modal', function ($scope, calculationTableService, $modal) {
        $scope.tableParams = calculationTableService.getTableParams(10, [10, 25]);
        $scope.tableParams.sorting()['title'] = 'asc';

        $scope.toggleFilter = function(params) {
            params.settings().$scope.show_filter = !params.settings().$scope.show_filter;
        };

        /*$scope.tableParams.customFilters = {
         options: {
         type: [
         {value: 'Partner', text: 'Partner'},
         {value: 'Contract', text: 'Contract'}
         ]
         }
         };*/
        $scope.createCalculation = function () {
            var modalInstance = $modal.open({
                templateUrl: 'src/calc/views/modal/create-calculation-modal.html',
                backdrop: true,
                controller: 'ModalInstanceCalculationCreate'
            });
            modalInstance.result.then(function(data) {
                if (data) {
                    $scope.tableParams.reload();
                }
            });
        };

        $scope.editCalculation = function (id) {
            var modalInstance = $modal.open({
                templateUrl: 'src/calc/views/modal/edit-calculation-modal.html',
                backdrop: true,
                controller: 'ModalInstanceCalculationEdit',
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function(data) {
                if (data) {
                    $scope.tableParams.reload();
                }
            });
        };

        $scope.deleteCalculation = function(id){
            var modalInstance = $modal.open({
                templateUrl: 'src/site/views/modal/confirm.html',
                controller: 'ModalInstanceCalculationDelete',
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function(data) {
                if (data) {
                    $scope.tableParams.reload();
                }
            });
        };
    }]);


app
    .controller('ModalInstanceCalculationCreate', ['$scope', 'rest', '$modalInstance', function ($scope, rest, $modalInstance) {
        $scope.errors = {};
        $scope.calc = {};
        $scope.saveCalc = function() {
            rest.postModel($scope.calc, 'v1/calculations').success(function(data) {
                $modalInstance.close(true);
            }).error(function(response) {
                $scope.errors = {};
                angular.forEach(response, function (key, value) {
                    if ($scope.form[key['field']]!==undefined){
                        $scope.form[key['field']].$dirty = true;
                        $scope.form[key['field']].$setValidity('server', false);
                        $scope.errors[key['field']] = key['message'];
                    }
                });
            })
        }

        $scope.cancel = function() {
            $modalInstance.close(false);
        }
    }]);
app
    .controller('ModalInstanceCalculationEdit', ['$scope', 'rest', '$modalInstance', 'id', function ($scope, rest, $modalInstance, id) {
        $scope.note = {};
        $scope.errors = {};
        rest.getModelByIdWithPath(id, 'v1/calculations').success(function(data) {
            $scope.calc = data;
        });

        $scope.saveCalc = function() {
            rest.putModelWithPath($scope.calc, 'v1/calculations').success(function(data) {
                $modalInstance.close(true);
            }).error(function(response) {
                $scope.errors = {};
                angular.forEach(response, function (key, value) {
                    if ($scope.form[key['field']]!==undefined){
                        $scope.form[key['field']].$dirty = true;
                        $scope.form[key['field']].$setValidity('server', false);
                        $scope.errors[key['field']] = key['message'];
                    }
                });
            })
        }

        $scope.cancel = function() {
            $modalInstance.close(false);
        }
    }]);


app
    .controller('ModalInstanceCalculationDelete',[ '$scope', '$modalInstance', 'rest', 'id',
        function ($scope, $modalInstance, rest, id) {
            $scope.ok = function () {
                rest.deleteModelById(id, 'v1/calculations').success(function(data){
                    $modalInstance.close(true);
                }).error(function(error){
                    console.log(error);
                });
            };
            $scope.cancel = function () {
                $modalInstance.close(false);
            };
        }]);