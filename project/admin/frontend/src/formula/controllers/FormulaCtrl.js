app
    .controller('FormulaIndexController', ['$scope', 'formulaTableService', '$modal', '$routeParams', function ($scope, formulaTableService, $modal, $routeParams) {
        $scope.tableParams = formulaTableService.getTableParams(10, [10, 25]);
        $scope.tableParams.sorting()['added_on'] = 'desc';
        $scope.tableParams.filter()['expand'] = 'addedBy';
        $scope.tableParams.filter()['calculation_id'] = $routeParams.calculation_id;

        $scope.toggleFilter = function(params) {
            params.settings().$scope.show_filter = !params.settings().$scope.show_filter;
        };
        $scope.createFormula = function () {
            var modalInstance = $modal.open({
                templateUrl: 'src/formula/views/modal/create-formula-modal.html',
                backdrop: true,
                controller: 'ModalInstanceFormulaCreate'
            });
            modalInstance.result.then(function(data) {
                if (data) {
                    $scope.tableParams.reload();
                }
            });
        };

        $scope.editFormula = function (id) {
            var modalInstance = $modal.open({
                templateUrl: 'src/formula/views/modal/edit-formula-modal.html',
                backdrop: true,
                controller: 'ModalInstanceFormulaEdit',
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

        $scope.deleteFormula = function(id){
            var modalInstance = $modal.open({
                templateUrl: 'src/site/views/modal/confirm.html',
                controller: 'ModalInstanceFormulaDelete',
                resolve: {
                    id: function () {
                        return id;
                    },
                    path: function() {
                        return 'v1/formulas';
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
    .controller('ModalInstanceFormulaCreate', ['$scope', 'rest', '$modalInstance', '$routeParams', function ($scope, rest, $modalInstance, $routeParams) {
        $scope.errors = {};
        $scope.formula = {};
        $scope.saveFormula = function() {
            $scope.formula.calculation_id = $routeParams.calculation_id;
            rest.postModel($scope.formula, 'v1/formulas').success(function(data) {
                $modalInstance.close(data);
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
            $modalInstance.close();
        }
    }]);
app
    .controller('ModalInstanceFormulaEdit', ['$scope', 'rest', '$modalInstance', 'id', '$routeParams', function ($scope, rest, $modalInstance, id, $routeParams) {
        $scope.note = {};
        $scope.errors = {};
        rest.getModelByIdWithPath(id, 'v1/formulas').success(function(data) {
            $scope.formula = data;
        });
        $scope.saveFormula = function() {
            $scope.formula.calculation_id = $routeParams.calculation_id;
            rest.putModelWithPath($scope.formula, 'v1/formulas').success(function(data) {
                $modalInstance.close(data);
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
            $modalInstance.close();
        }
    }]);


app
    .controller('ModalInstanceFormulaDelete',[ '$scope', '$modalInstance', 'rest', 'id', 'path',
        function ($scope, $modalInstance, rest, id, path) {
            rest.path = path;
            $scope.ok = function () {
                rest.deleteModelById(id, path).success(function(data){
                    $modalInstance.close(true);
                }).error(function(error){
                    console.log(error);
                });
            };
            $scope.cancel = function () {
                $modalInstance.close(false);
            };
        }]);