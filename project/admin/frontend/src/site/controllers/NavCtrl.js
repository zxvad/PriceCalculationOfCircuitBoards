app
    .controller('NavigationController', ['$scope', '$location', '$window', 'ACCESS_LEVELS',
        function ($scope, $location, $window, ACCESS_LEVELS) {
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
                    title: "Расчет",
                    href: "calculation/make",
                    accessLevel: 'ROLE_USER',
                    activePanel:0
                },
                {
                    title: "Формулы",
                    href: "formulas",
                    accessLevel: 'ROLE_ADMIN',
                    activePanel:1
                }
            ];
            var errorPageRoutes = [
                '404',
                '403'
            ];
            var _onErrorPage = function (routeName) {
                return errorPageRoutes.indexOf(routeName) > -1;
            }
    }
]);