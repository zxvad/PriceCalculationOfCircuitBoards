'use strict';
app.
    factory('formulaTableService',['ngTableParams', 'rest', '$modal', function(ngTableParams, rest, $modal){
        return {
            getTableParams: function(pageCount, counts) {
                return new ngTableParams({
                    page: 1,            // show first page
                    count: pageCount          // count per page
                },{
                    counts: counts,
                    getData: function($defer, params) {

                        var queryParams = {
                            perPage: params.$params.count,
                            page: (params.$params.page) - 1,
                            order: params.orderBy()
                        };

                        angular.extend(queryParams, params.filter());
                        rest.modelTable(queryParams, 'v1/formulas').success(function (data, status, headers, config) {
                            var totalCount = headers()['x-pagination-total-count'] ? headers()['x-pagination-total-count'] : data.length;
                            if (totalCount > 50) {
                                params.settings({counts: [10, 25, 50, 100]});
                            }
                            if (params.$params.count == 'all' && totalCount > 1000) {
                                var modalInstance = $modal.open({
                                    templateUrl: 'src/site/views/modal/confirm-show-all.html',
                                    backdrop: true,
                                    controller: 'ModalInstanceShowAllConfirm'
                                });
                                modalInstance.result.then(function (response) {
                                    if (!response) {
                                        params.$params.count = counts;
                                    }
                                    else {
                                        params.total(totalCount);
                                        $defer.resolve(data);
                                    }
                                });
                            }
                            else {
                                params.total(totalCount);
                                $defer.resolve(data);
                            }
                        }).error(function (data) {
                            console.log(data);
                        });
                    }
                });
            }
        }
    }]);