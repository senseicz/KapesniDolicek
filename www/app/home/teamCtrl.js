(function () {
    'use strict';

    angular.module('KapesniDolicek').controller('TeamCtrl', ['$stateParams', '$ionicLoading', 'dataService', 'BaseUrl', TeamCtrl]);

    function TeamCtrl($stateParams, $ionicLoading, dataService, BaseUrl) {
        var vm = this;
        vm.BaseUrl = BaseUrl;

        console.log("$stateParams", $stateParams);
        var teamId = Number($stateParams.id);


        dataService.getData("/club-team/" + teamId).then(function (data) {
            vm.Team = data;
            console.log(data);
        });
    };
})();