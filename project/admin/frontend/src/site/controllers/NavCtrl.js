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
                    href: "calc",
                    accessLevel: $scope.accessLevel.ROLE_ADMIN,
                    activePanel:0
                },
                {
                    title: "Изменение",
                    href: "edit",
                    accessLevel: $scope.accessLevel.ROLE_ADMIN,
                    activePanel:1
                },
                {
                    title: "Помощь",
                    href: "help",
                    accessLevel: $scope.accessLevel.ROLE_ADMIN,
                    activePanel:2
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