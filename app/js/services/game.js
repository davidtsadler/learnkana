'use strict';

learnKanaApp.factory('game', ['settings', function (settings) {
    var numRounds;

    return {
        begin: function() {
            numRounds = settings.numRounds;
        },

        getNumRounds: function () {
            return numRounds;
        }
    };
}]);
