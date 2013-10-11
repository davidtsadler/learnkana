'use strict';

learnKanaApp.factory('settings', ['$rootScope', 'storage', function ($rootScope, storage) {
    var settings = {};

    storage.createPersistentProperty(settings, 'numRounds', 20);
    storage.createPersistentProperty(settings, 'showKatakana', false);
    storage.createPersistentProperty(settings, 'includeKana', [
        true,
        true,
        true
    ]);

    return settings;
}]);
