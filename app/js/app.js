'use strict';

var learnKanaApp = angular.module('learnKanaApp', []);

learnKanaApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'MainController',
        templateUrl: 'views/main.html'
    });
    $routeProvider.when('/game', {
        controller: 'GameController',
        templateUrl: 'views/game.html'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]);
