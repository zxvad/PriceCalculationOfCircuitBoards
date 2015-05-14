app
    .controller('FormulaIndexController', ['$scope', 'formulaTableService', '$modal', function ($scope, formulaTableService, $modal) {
        $scope.tableParams = formulaTableService.getTableParams(10, [10, 25]);
        $scope.tableParams.sorting()['added_on'] = 'desc';
        $scope.tableParams.filter()['expand'] = 'addedBy';

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
                controller: 'ModalInstanceNoteDelete',
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
    .controller('ModalInstanceFormulaCreate', ['$scope', 'rest', '$modalInstance', function ($scope, rest, $modalInstance) {
        $scope.errors = {};
        $scope.formula = {};
        $scope.saveFormula = function() {
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
    .controller('ModalInstanceFormulaEdit', ['$scope', 'rest', '$modalInstance', 'id', function ($scope, rest, $modalInstance, id) {
        $scope.note = {};
        $scope.errors = {};
        rest.getModelByIdWithPath(id, 'v1/formulas').success(function(data) {
            $scope.note = data;
        });

        $scope.saveFormula = function() {
            rest.putModelWithPath($scope.note, 'v1/notes').success(function(data) {
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
    .controller('ModalInstanceNoteDelete',[ '$scope', '$modalInstance', 'rest', 'id', 'path',
        function ($scope, $modalInstance, rest, id, path) {
            rest.path = path;
            $scope.ok = function () {
                rest.deleteModelById(id).success(function(data){
                    $modalInstance.close(1);
                }).error(function(error){
                    console.log(error);
                });
            };
            $scope.cancel = function () {
                $modalInstance.close(0);
            };
        }]);