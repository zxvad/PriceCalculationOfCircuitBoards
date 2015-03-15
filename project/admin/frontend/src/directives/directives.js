
app.directive('ifHasAccess', ['$rootScope', 'authService', function ($rootScope, authService) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var prevDisp = element.css('display');
            $rootScope.$watch(
                function () {
                    return authService.getRole();
                }, function () {
                    console.log(authService.hasAccess(attrs.ifHasAccess));
                    if (!authService.hasAccess(attrs.ifHasAccess)) {
                        element.css('display', 'none');
                    } else {
                        element.css('display', prevDisp);
                    }
                }
            );
        }
    };
}]);


app
    .directive('serverError', function(){
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope,element,attrs,ctrl){
                return element.on('change', function(){
                    return scope.$apply(function(){
                        return ctrl.$setValidity('server', true);
                    });
                });
            }
        };
    });