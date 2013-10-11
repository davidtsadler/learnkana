'use strict';

learnKanaApp.controller('MainController', ['$scope', '$location', function ($scope, $location) {
    $scope.changeSettings = function() {
        $location.url('/settings');
    };
    $scope.startGame = function() {
        $location.url('/game');
    };
}]);
