'use strict';
app
    .service('rest', ['$http', '$location', '$routeParams', function ($http, $location, $routeParams) {

        return {

            baseUrl: $location.protocol()+'://'+$location.host()+'/admin/api/',
            path: undefined,


            models: function (path) {
                return $http.get(this.baseUrl + path + location.search);
            },
            modelTable: function (queryParams, path) {
                return $http.get(this.baseUrl + (path || this.path), {
                    params: queryParams
                });
            },
            getModelById: function (id, expand, path) {
                if (expand != null) {
                    return $http.get(this.baseUrl + path + "/" + id + '?expand=' + expand);
                }
                return $http.get(this.baseUrl + path + "/" + id);
            },
            postModel: function (model, path) {
                return $http.post(this.baseUrl + (path ? path : this.path), model);
            },
            postModelWithId: function (model) {
                return $http.post(this.baseUrl + this.path + "/" + model.id, model);
            },
            putModelWithId: function (model,id) {
                return $http.put(this.baseUrl + this.path + "/" + id, model);
            },
            deleteModelById: function (id, path) {
                return $http.delete(this.baseUrl + path + "/" + id);
            },
            getModelByIdWithPath: function (id, path) {
                return $http.get(this.baseUrl + path + "/" + id);
            },
            putModelWithPath: function (model, path) {
                return $http.put(this.baseUrl + path + "/" + model.id, model);
            }
        };

    }]);


