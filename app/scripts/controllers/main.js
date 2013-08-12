'use strict';

angular.module('lazyBarista')
  .controller('MainCtrl', function ($scope, $timeout) {
    var reelsOptions  = [
      // COFFEE            TEA             ESPRESSO
      ['Coffe Maker',     'Teapot',       'Espresso Machine'],
      ['Coffee Filter',   'Tea Strainer', 'Espresso Tamper'],
      ['Coffee Grounds',  'Loose Tea',    'Ground Espresso Beans']
    ];

    $scope.generateReels = function () {
      var i
      var reelLength
      var currentRandomizedReelPosition
      $scope.hasWon       = undefined
      $scope.reelsValues  = []

      // Iterate through all reels
      angular.forEach(reelsOptions, function (reel, reelPos) {
        reelLength                  = reel.length
        $scope.reelsValues[reelPos] = []

        // Iterate 10 times to fill reels
        for (i = 0; i < 10; i++) {
          // Randomize the position for the current reel
          currentRandomizedReelPosition = Math.floor(Math.random() * reel.length)

          // Randomize the position for the current reel
          $scope.reelsValues[reelPos][i] = reel[currentRandomizedReelPosition]
        }
      })

      $timeout(randomizeReels, 8100)
    }

    var randomizeReels = function () {
      $scope.hasWon = true
  
      // Iterate through all randomized reels positions
      angular.forEach($scope.reelsValues, function (reelValues) {
        var firstReelLength   = $scope.reelsValues[0].length - 1
        var currentReelLength = reelValues.length - 1
        console.log($scope.reelsValues[0][firstReelLength])
        console.log(reelValues[currentReelLength])
        console.log('===')

        // If last value of first wheel is not equal to last item of current reel
        // it means all reels positions are not equal so the lazy barista loose
        // and has to get up and make its drink by himself!
        if ($scope.reelsValues[0][firstReelLength] !== reelValues[currentReelLength]) {
          $scope.hasWon = false
        }
      })
    }
  })
