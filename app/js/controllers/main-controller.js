'use strict';

learnKanaApp.controller('MainController', ['$scope', '$location', function ($scope, $location) {
    $scope.startGame = function() {
        $location.url('/game');
    };
}]);
