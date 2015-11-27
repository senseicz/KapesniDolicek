angular.module('KapesniDolicek.directives', [])
    .directive('postCard', function() {

        console.log('post-card directive');

        return {
            templateUrl: 'app/common/post-card.html'
        };
    });