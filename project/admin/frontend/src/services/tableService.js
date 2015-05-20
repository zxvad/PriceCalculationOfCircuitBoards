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

                            params.total(totalCount);
                            $defer.resolve(data);
                        }).error(function (data) {
                            console.log(data);
                        });
                    }
                });
            }
        }
    }]);
app.
    factory('calculationTableService',['ngTableParams', 'rest', '$modal', function(ngTableParams, rest, $modal){
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
                        rest.modelTable(queryParams, 'v1/calculations').success(function (data, status, headers, config) {
                            var totalCount = headers()['x-pagination-total-count'] ? headers()['x-pagination-total-count'] : data.length;
                            if (totalCount > 50) {
                                params.settings({counts: [10, 25, 50, 100]});
                            }
                            params.total(totalCount);
                            $defer.resolve(data);
                        }).error(function (data) {
                            console.log(data);
                        });
                    }
                });
            }
        }
    }]);
app.
    factory('inputParamsTableService',['ngTableParams', 'rest', '$modal', function(ngTableParams, rest, $modal){
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
                        rest.modelTable(queryParams, 'v1/inputparams').success(function (data, status, headers, config) {
                            var totalCount = headers()['x-pagination-total-count'] ? headers()['x-pagination-total-count'] : data.length;
                            if (totalCount > 50) {
                                params.settings({counts: [10, 25, 50, 100]});
                            }
                            params.total(totalCount);
                            $defer.resolve(data);
                        }).error(function (data) {
                            console.log(data);
                        });
                    }
                });
            }
        }
    }]);
app.
    factory('outputParamsTableService',['ngTableParams', 'rest', '$modal', function(ngTableParams, rest, $modal){
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
                        rest.modelTable(queryParams, 'v1/outputparams').success(function (data, status, headers, config) {
                            var totalCount = headers()['x-pagination-total-count'] ? headers()['x-pagination-total-count'] : data.length;
                            if (totalCount > 50) {
                                params.settings({counts: [10, 25, 50, 100]});
                            }
                            params.total(totalCount);
                            $defer.resolve(data);
                        }).error(function (data) {
                            console.log(data);
                        });
                    }
                });
            }
        }
    }]);