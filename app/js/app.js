'use strict';

var learnKanaApp = angular.module('learnKanaApp', []);

learnKanaApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/settings', {
        controller: 'SettingsController',
        templateUrl: 'views/settings.html'
    });
    $routeProvider.when('/game', {
        controller: 'GameController',
        templateUrl: 'views/game.html'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]);
