(function () {
    'use strict';

    angular.module('KapesniDolicek').controller('appCtrl', ['$scope', appCtrl]);

    function appCtrl($scope) {
        $scope.$on('$ionicView.enter', function () {
            // Refresh user data & avatar 
            //$scope.user = AuthService.getUser(); //todo: enable once we have auth
        });
    };
})();