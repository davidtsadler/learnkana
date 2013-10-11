'use strict';

learnKanaApp.controller('SettingsController', ['$scope', '$location', 'settings', function ($scope, $location, settings) {
    $scope.roundOptions = [10,20,30,40,50,100];
    $scope.showKatakanaOptions = [
        {value: false, text: 'Hiragana'},
        {value: true, text: 'Katakana'}
    ];

    $scope.settings = settings;

    $scope.done = function() {
        $location.url('/');
    };
}]);
