'use strict';

learnKanaApp.controller('GameController', ['$scope', '$location', 'game', function ($scope, $location, game) {
    $scope.game = game;

    $scope.mainMenu = function () {
        $location.url('/');
    };

    game.begin();
}]);
