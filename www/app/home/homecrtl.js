(function () {
    'use strict';

    angular.module('KapesniDolicek').controller('HomeCtrl', ['$scope', '$ionicLoading', 'dataService', 'BaseUrl', HomeCtrl]);

    function HomeCtrl($scope, $ionicLoading, dataService, BaseUrl ) {
        var vm = this;
        vm.BaseUrl = BaseUrl;

        dataService.getData("/homepages/10").then(function (data) {
            vm.HomepageItems = data.HomepageItems;
        });

        vm.doRefresh = function () {
            console.log("Refreshing data...");
            $scope.loading = $ionicLoading.show({
                template: 'Načítám data...'
            });

            dataService.getData("/homepages/10", true).then(function (data) {
                console.log("Data are back.");
                vm.HomepageItems = data.HomepageItems;
                console.log("Need hide loader 1");
                $ionicLoading.hide();
            });
        };
    };
})();