// Ionic Starter App
angular.module('KapesniDolicek', ['ionic',
    'angular-data.DSCacheFactory',
    'KapesniDolicek.directives',
    'KapesniDolicek.filters',
    
])

.constant('BaseUrl', 'http://www.fcbdev.cz')
.constant('ApiEndpoint', 'http://www.fcbdev.cz/api')

.run(function ($ionicPlatform, DSCacheFactory) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        //DSCacheFactory("leagueDataCache", { storageMode: "localStorage", maxAge: 360000, deleteOnExpire: "aggressive" });
        DSCacheFactory("appCache", { storageMode: "localStorage" });
        DSCacheFactory("staticCache", { storageMode: "localStorage" });

    });
})

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: '/app/layout/master.html'
            })
            .state('app.home', {
                url: '/home',
                views: {
                    "menuContent": { templateUrl: '/app/home/home.html' }
                }
            })
            .state('app.article', {
                url: '/artcile/:id',
                views: {
                    "menuContent": {templateUrl: '/app/home/article.html'}
                }
            })

    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('app/home');

});
