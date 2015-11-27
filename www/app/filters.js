angular.module('KapesniDolicek.filters', [])

.filter('rawHtml', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
}]);
