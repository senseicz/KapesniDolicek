(function () {
    'use strict';

    angular.module('KapesniDolicek').factory('dataService', ['$http', '$q', '$ionicLoading', 'DSCacheFactory', 'ApiEndpoint', dataService]);

    function dataService($http, $q, $ionicLoading, DSCacheFactory, ApiEndpoint) {

        self.appCache = DSCacheFactory.get("appCache");
        self.staticCache = DSCacheFactory.get("staticCache");

        var hashSuffix = "/true";


        //self.leaguesCache.setOptions({
        //    onExpire: function (key, value) {
        //        getLeagues()
        //            .then(function () {
        //                console.log("Leagues Cache was automatically refreshed.", new Date());
        //            }, function () {
        //                console.log("Error getting data. Putting expired item back in the cache.", new Date());
        //                self.leaguesCache.put(key, value);
        //            });
        //    }
        //});

        //self.leagueDataCache.setOptions({
        //    onExpire: function (key, value) {
        //        getLeagueData()
        //            .then(function () {
        //                console.log("League Data Cache was automatically refreshed.", new Date());
        //            }, function () {
        //                console.log("Error getting data. Putting expired item back in the cache.", new Date());
        //                self.leagueDataCache.put(key, value);
        //            });
        //    }
        //});

        function getDataOverNetwork(fullUri) {
            var deferred = $q.defer();

            $http.get(fullUri)
                   .success(function (data) {
                       console.log("Received data via HTTP");
                       deferred.resolve(data);
                   })
                   .error(function () {
                       console.log("Error while making HTTP call.");
                       deferred.reject();
                   });
            return deferred.promise;
        }

        function getFrehHash(partialUri) {
            var deferred = $q.defer();

            getDataOverNetwork(ApiEndpoint + partialUri + hashSuffix).then(function (data) {
                 deferred.resolve(data);
            });
            return deferred.promise;
        }

        function getFreshData(partialUri, cachedItem) {
            var deferred = $q.defer();
            console.log("Need to get fresh data over network.");
            getDataOverNetwork(ApiEndpoint + partialUri).then(function (data) {
                if (data != null) {
                    cachedItem = {
                        hash: data.Checksum,
                        value: data.Value
                    };

                    console.log("Putting data into cache.");
                    self.appCache.put(partialUri, cachedItem);
                    deferred.resolve(data.Value);
                } else {
                    console.log("No data returned from network call.");
                    deferred.reject();
                }
            });
            return deferred.promise;
        }

        function getData(partialUri, forceRefresh) {
            var deferred = $q.defer();

            var cachedItem = self.appCache.get(partialUri);

            if (cachedItem != undefined && forceRefresh !== true) {

                console.log("We have this item cached with key: " + partialUri);

                var freshHash;

                getFrehHash(partialUri).then(function(data) {
                    freshHash = data;

                    console.log("Fresh hash is: " + freshHash + ", cached data hash value: " + cachedItem.hash);
                    if (freshHash === cachedItem.hash) {
                        deferred.resolve(cachedItem.value);
                    } else {
                        deferred.resolve(getFreshData(partialUri, cachedItem));
                    }
                });
            } else {
                deferred.resolve(getFreshData(partialUri, cachedItem));
            }
            return deferred.promise;
        }

        return {
            getData: getData
        };
    };
})();