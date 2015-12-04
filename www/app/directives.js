angular.module('KapesniDolicek.directives', [])
    .directive('hpitem', function() {
        return {
            templateUrl: 'app/directives/hpItem.html'
        };
    })
    .directive('playerlink', function() {
        return {
            templateUrl: 'app/directives/playerLink.html'
        };
    })
    .directive('teamlink', function () {
        return {
            templateUrl: 'app/directives/teamLink.html'
        };
    })
    .directive('prevnextmatch', function () {
        return {
            templateUrl: 'app/directives/matchPrevNext.html',
            scope: {
                match: '='
            }
        };
    })

;