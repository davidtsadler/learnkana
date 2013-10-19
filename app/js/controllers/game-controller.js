'use strict';

learnKanaApp.controller('GameController', ['$scope', '$location', 'game', function ($scope, $location, game) {
    $scope.game = game;

    game.begin();
}]);
