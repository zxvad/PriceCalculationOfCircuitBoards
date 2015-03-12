app
    .controller('NavigationController', ['$scope', '$location', '$window', 'ACCESS_LEVELS','partnerNameService','$routeParams', 'gettext', 'userService','$route',
        function ($scope, $location, $window, ACCESS_LEVELS, partnerNameService, $routeParams, gettext, userService, $route) {
            $scope.accessLevel = ACCESS_LEVELS;
            $scope.menuClassSubPanel = function (page) {
                var current = $location.path();
                return page === current ? "active" : "";
            };
            $scope.menuClassPanel = function (panelNom) {
                return $scope.navigationItems.activePanel == panelNom ? "active" : "";
            };
            $scope.menuClassPartnerPanel = function(inputRoute) {
                var routeName = $route.current ? $route.current.name : null;
                return inputRoute.indexOf(routeName) > -1 ? "active" : "";;
            }
            $scope.navigationItems = [
                    {
                    title: gettext("Partner"),
                    href: "partners",
                    accessLevel: 'ROLE_CLUBSALES',
                    activePanel:0,
                    items:[
                        {
                            title: gettext("All partners"),
                            href: "partners",
                            accessLevel: 'ROLE_CLUBSALES'
                        },
                        {
                            title: gettext("All offers"),
                            href: "partners/offers",
                            accessLevel: 'ROLE_CLUBSALES'
                        },
                        {
                            title:"Change log",
                            href: "partners/change-logs",
                            accessLevel: 'ROLE_CLUBSALES'
                        }
                    ]
                },
                {
                    title: gettext("Sales"),
                    href: "sales/dashboard",
                    accessLevel: 'ROLE_CLUBSALES',
                    activePanel:1,
                    items:[
                        {
                            title: gettext("Dashboard"),
                            href: "sales/dashboard",
                            accessLevel: 'ROLE_CLUBSALES'
                        },
                        {
                            title: gettext("Products"),
                            href: "sales/products",
                            accessLevel: 'ROLE_CLUBSALES'
                        },
                        {
                            title: gettext("Contracts"),
                            href: "sales/contracts",
                            accessLevel: 'ROLE_CLUBSALES'
                        },
                        {
                            title: gettext("Sales missions"),
                            href: "/admin/",
                            accessLevel: 'ROLE_CLUBSALES'
                        },
                        {
                            title:"Activities",
                            href: "/admin/",
                            accessLevel: 'ROLE_CLUBSALES'
                        },
                        {
                            title: gettext("Sales target"),
                            href: "/admin/",
                            accessLevel: 'ROLE_CLUBSALES'
                        },
                        {
                            title: gettext("Sales Notes"),
                            href: "/admin/",
                            accessLevel: 'ROLE_CLUBSALES'
                        }

                    ]
                },
                {
                    title: gettext("System"),
                    href: "system/settings",
                    accessLevel: 'ROLE_CLUBSALES',
                    activePanel:2,
                    items:[
                        {
                            title: gettext("Settings"),
                            href: "system/settings",
                            accessLevel: 'ROLE_CLUBSALES'
                        },
                        {
                            title: gettext("Users"),
                            href: "system/users",
                            accessLevel: 'ROLE_CLUBSALES'
                        },
                        {
                            title: gettext("Sectors"),
                            href: "system/sectors",
                            accessLevel: 'ROLE_CLUBSALES'
                        },
                        {
                            title: gettext("Categories"),
                            href: "system/categories",
                            accessLevel: 'ROLE_CLUBSALES'
                        },
                        {
                            title: gettext("Keywords"),
                            href: "system/keywords",
                            accessLevel: 'ROLE_CLUBSALES'
                        },
                        {
                            title: gettext("Search statistics"),
                            href: "/admin/",
                            accessLevel: 'ROLE_CLUBSALES'
                        }

                    ]
                }
            ];
            $scope.getPartnerName = function () {
                return partnerNameService.getPartnerName();
            };
            $scope.getPartnerId = function () {
                return userService.getPartnerId() !== null ? userService.getPartnerId() : $routeParams.id;
            };
            var partnerContactRoutes = [
                'partnerOfferInfo',
                'partnerInfo',
                'partnerOffers',
                'partnerContracts',
                'partnerContractInfo',
                'partnerAccountPage'
            ];
            var errorPageRoutes = [
                '404',
                '403'
            ];
            var _onErrorPage = function (routeName) {
                return errorPageRoutes.indexOf(routeName) > -1;
            }
            $scope.isPartnerPage = function () {
                var routeName = $route.current ? $route.current.name : null;
                return partnerContactRoutes.indexOf(routeName) > -1 ||
                (userService.getPartnerId() !== null && _onErrorPage(routeName));
            }
            /*$scope.isPartnerPage = function(){
                return $location.url()=='/admin/partners/' + $routeParams.id + '/info' ||
                    $location.url()=='/admin/partners/' + $routeParams.id + '/offers' ||
                    userService.getPartnerId()!== null ||
                    $location.url()=='/admin/partners/' + $routeParams.id + '/offers/' + $routeParams.offer_id;
            };*/
            $scope.navigationItems.activePanel = -1;
            if ($location.url().indexOf('partner') > -1) {
                $scope.navigationItems.activePanel = 0;
            }
            else if ($location.url().indexOf('sales') > -1) {
                $scope.navigationItems.activePanel = 1;
            }
            else if ($location.url().indexOf('system') > -1) {
                    $scope.navigationItems.activePanel = 2;
            }
    }
]);