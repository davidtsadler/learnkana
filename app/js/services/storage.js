'use strict';

learnKanaApp.factory('storage', ['$rootScope', 'localStorage', function ($rootScope, localStorage) {
    var LOCAL_STORAGE_ID = 'learnkana.net';

    function getPersistentStorage() {
        var json = localStorage[LOCAL_STORAGE_ID];

        return json ? JSON.parse(json) : {};
    }

    function setPersistentStorage(storage) {
        localStorage[LOCAL_STORAGE_ID] = JSON.stringify(storage);
    }

    function getPersistentProperty(name, defaultValue) {
        var storage = getPersistentStorage();

        return storage[name] || defaultValue;
    }

    function setPersistentProperty(name, value) {
        var storage = getPersistentStorage();

        storage[name] = value;

        setPersistentStorage(storage);
    }

    return {
        createPersistentProperty: function (obj, name, defaultValue) {
            obj[name] = getPersistentProperty(name, defaultValue);

            $rootScope.$watch(
                function () { return obj[name]; },
                function (value) {
                    setPersistentProperty(name, value);
                },
                true
            );
        }
    };
}]);
