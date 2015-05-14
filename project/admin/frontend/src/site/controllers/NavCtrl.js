app
    .controller('NavigationController', ['$scope', '$location', '$window', 'ACCESS_LEVELS', 'rest', 'authService',
        function ($scope, $location, $window, ACCESS_LEVELS, rest, authService) {
            $scope.menuClassSubPanel = function (page) {
                var current = $location.path();
                return page === current ? "active" : "";
            };
            $scope.accessLevel = ACCESS_LEVELS;
            $scope.menuClassPanel = function (panelNom) {
                return $scope.navigationItems.activePanel == panelNom ? "active" : "";
            };
            $scope.navigationItems = [
                {
                    title: 'Все расчеты',
                    activePanel: 0,
                    href: 'calculations',
                    accessLevel: 'ADMIN',
                    items: [
                    ]
                }
            ];
            $scope.navigationItems.activePanel = 0; //after login show Partner sub menu

            $scope.setActivePanel = function(nomer) {
                $scope.navigationItems.activePanel = nomer;
            };
           if (authService.isLoggedIn()) {
               rest.models('v1/calculations').success(function (response) {
                   var activePanel = 1;
                   angular.forEach(response, function (value) {
                       $scope.navigationItems.push(
                           {
                               title: value.title,
                               activePanel: activePanel,
                               href: 'calculation/' + value.id,
                               items: [
                                   {
                                       title: 'Расчет',
                                       href: 'calculation/' + value.id,
                                       accessLevel: 'ADMIN'
                                   },
                                   {
                                       title: 'Формулы',
                                       href: 'calculation/' + value.id + '/formulas',
                                       accessLevel: 'ADMIN'
                                   },
                                   {
                                       title: 'Входные параметры',
                                       href: 'calculation/' + value.id + '/input-params',
                                       accessLevel: 'ADMIN'
                                   },
                                   {
                                       title: 'Выходные параметры',
                                       href: 'calculation/' + value.id + '/ouput-params',
                                       accessLevel: 'ADMIN'
                                   }
                               ]
                           }
                       );
                       activePanel++;
                   });

               }).error(function (error) {
                   console.log(error);
               });
           }
            var errorPageRoutes = [
                '404',
                '403'
            ];
            var _onErrorPage = function (routeName) {
                return errorPageRoutes.indexOf(routeName) > -1;
            }
    }
]);