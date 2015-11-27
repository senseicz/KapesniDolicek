(function () {
    'use strict';

    angular.module('KapesniDolicek').controller('ArticleCtrl', ['$stateParams', '$ionicLoading', 'dataService', 'BaseUrl', ArticleCtrl]);

    function ArticleCtrl($stateParams, $ionicLoading, dataService, BaseUrl) {
        var vm = this;
        vm.BaseUrl = BaseUrl;

        console.log("$stateParams", $stateParams);
        var articleId = Number($stateParams.id);


        dataService.getData("/articles/" + articleId).then(function (data) {
            vm.Article = data;
            console.log(data);
        });

    };
})();