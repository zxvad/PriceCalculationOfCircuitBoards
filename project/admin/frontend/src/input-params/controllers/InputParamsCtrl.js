app
    .controller('InputParamsIndexController', ['$scope', 'inputParamsTableService', '$modal', '$routeParams', function ($scope, inputParamsTableService, $modal, $routeParams) {
        $scope.tableParams = inputParamsTableService.getTableParams(10, [10, 25]);
        $scope.tableParams.sorting()['added_on'] = 'desc';
        $scope.tableParams.filter()['calculation_id'] = $routeParams.calculation_id;
        $scope.tableParams.filter()['expand'] = 'formula';

        $scope.toggleFilter = function(params) {
            params.settings().$scope.show_filter = !params.settings().$scope.show_filter;
        };
        $scope.createParam = function () {
            var modalInstance = $modal.open({
                templateUrl: 'src/input-params/views/modal/input-param-create-modal.html',
                backdrop: true,
                controller: 'ModalInstanceInputParamsCreate'
            });
            modalInstance.result.then(function(data) {
                if (data) {
                    $scope.tableParams.reload();
                }
            });
        };

        $scope.editParam = function (id) {
            var modalInstance = $modal.open({
                templateUrl: 'src/input-params/views/modal/input-param-edit-modal.html',
                backdrop: true,
                controller: 'ModalInstanceInputParamsEdit',
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

        $scope.deleteParam = function(id){
            var modalInstance = $modal.open({
                templateUrl: 'src/site/views/modal/confirm.html',
                controller: 'ModalInstanceInputParamsDelete',
                resolve: {
                    id: function () {
                        return id;
                    },
                    path: function() {
                        return 'v1/inputparams';
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
    .controller('ModalInstanceInputParamsCreate', ['$scope', 'rest', '$modalInstance', '$routeParams', function ($scope, rest, $modalInstance, $routeParams) {
        $scope.errors = {};
        $scope.param = {};
        $scope.saveParam = function() {
            $scope.param.calculation_id = $routeParams.calculation_id;
            rest.postModel($scope.param, 'v1/inputparams').success(function(data) {
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
    .controller('ModalInstanceInputParamsEdit', ['$scope', 'rest', '$modalInstance', 'id', '$routeParams', function ($scope, rest, $modalInstance, id, $routeParams) {
        $scope.param = {};
        $scope.errors = {};
        rest.getModelByIdWithPath(id, 'v1/inputparams').success(function(data) {
            $scope.param = data;
        });
        $scope.saveParam = function() {
            $scope.param.calculation_id = $routeParams.calculation_id;
            rest.putModelWithPath($scope.param, 'v1/inputparams').success(function(data) {
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
    .controller('ModalInstanceInputParamsDelete',[ '$scope', '$modalInstance', 'rest', 'id', 'path',
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