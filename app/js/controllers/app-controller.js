'use strict';

learnKanaApp.controller('AppController', ['$scope', '$location', function ($scope, $location) {
    $scope.location = $location;

    $scope.changeSettings = function () {
        $location.url('/settings');
    };
    $scope.startGame = function () {
        $location.url('/game');
    };
}]);
