'use strict';

learnKanaApp.factory('game', ['settings', 'kana', function (settings, kana) {
    function getRoundData() {
        var data = [];

        angular.forEach(kana, function (kanaGroups, key) {
            if (settings.includeKana[key]) {
                angular.forEach(kanaGroups, function (characters) {
                    data.push(characters);
                });
            }
        });

        return shuffle(data);
    }

    /*
     * Javascript implementation of Fisher-Yates shuffle algorithm
     * http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
     */
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    return {
        ended: null,
        numRounds: null,
        currentRound: null,
        question: null,
        answer: null,
        choices: null,
        wrongChoices: null,

        begin: function () {
            this.ended = false;
            this.numRounds = settings.numRounds;
            this.currentRound = 0;
            this.nextRound();
        },

        end: function () {
            this.ended = true;
        },

        nextRound: function () {
            var roundData,
                answer;

            this.currentRound += 1;

            // Choose first 4 kana.
            roundData = getRoundData().slice(0,4);

            // Pick at random one of the kana to be the correct answer.
            answer = roundData[Math.floor(Math.random() * 4)];

            this.question = answer[0];
            this.answer = settings.showKatakana ? answer[2] : answer[1];
            this.choices = [];
            angular.forEach(roundData, function (kana) {
                this.choices.push(settings.showKatakana ? kana[2] : kana[1]);
            }, this);

            this.wrongChoices = [false, false, false, false];
        },

        choose : function (choice) {
            if (this.answer === this.choices[choice]) {
                this.choices[choice] = '✔';
                if (this.currentRound < this.numRounds) {
                    this.nextRound();
                } else {
                    this.end();
                }
            } else {
                this.choices[choice] = '✖';
                this.wrongChoices[choice] = true;
            }
        }
    };
}]);
