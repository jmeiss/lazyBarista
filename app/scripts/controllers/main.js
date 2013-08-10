'use strict';

angular.module('lazyBarista')
  .controller('MainCtrl', function ($scope) {
    $scope.hasWon     = undefined
    var reelsOptions  = [
      // COFFEE             TEA             ESPRESSO
      ['Coffe Maker',     'Teapot',       'Espresso Machine'],
      ['Coffee Filter',   'Tea Strainer', 'Espresso Tamper'],
      ['Coffee Grounds',  'Loose Tea',    'Ground Espresso Beans']
    ];

    $scope.randomizeReels = function () {
      var currentRandomizedReelPosition
      var allRandomizedReelPositions  = []
      $scope.reelPositions            = []
      $scope.hasWon                   = true

      // Iterate through all reels
      angular.forEach(reelsOptions, function (reel) {
        // Randomize the position for the current reel
        currentRandomizedReelPosition = Math.floor(Math.random() * reel.length)

        // Store the randomized position in an array
        allRandomizedReelPositions.push(currentRandomizedReelPosition)

        // Get and store the current reel value to be displayed
        $scope.reelPositions.push(reel[currentRandomizedReelPosition])
      })

      // Iterate through all randomized reels positions
      angular.forEach(allRandomizedReelPositions, function (reelPosition) {
        // If reelPosition is not equal to first item of allRandomizedReelPositions array
        // it means all reels positions are not equal so the lazy barista loose
        // and has to get up and make its drink by himself!
        if (allRandomizedReelPositions[0] !== reelPosition) {
          $scope.hasWon = false
        }
      })
    }
  })
