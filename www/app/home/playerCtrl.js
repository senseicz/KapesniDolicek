(function () {
    'use strict';

    angular.module('KapesniDolicek').controller('PlayerCtrl', ['$stateParams', '$ionicLoading', 'dataService', 'BaseUrl', PlayerCtrl]);

    function PlayerCtrl($stateParams, $ionicLoading, dataService, BaseUrl) {
        var vm = this;
        vm.BaseUrl = BaseUrl;

        console.log("$stateParams", $stateParams);
        var playerId = Number($stateParams.id);


        dataService.getData("/players/" + playerId).then(function (data) {
            vm.Player = data;
            console.log(data);
        });
    };
})();