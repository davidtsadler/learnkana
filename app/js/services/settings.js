'use strict';

learnKanaApp.factory('settings', ['$rootScope', 'storage', function ($rootScope, storage) {
    var settings = {};

    storage.createPersistentProperty(settings, 'numRounds', 20);
    storage.createPersistentProperty(settings, 'showKatakana', false);

    return settings;
}]);
