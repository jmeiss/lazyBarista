'use strict';

angular.module('lazyBarista')
  .controller('MainCtrl', function ($scope, $timeout) {
    var allRandomizedReelPositions
    var STATUS = {
      LOOSE:   -1,
      PENDING:  0,
      WIN:      1
    }
    var reelsOptions = [
      // COFFEE            TEA             ESPRESSO
      ['Coffee Maker',    'Teapot',       'Espresso Machine'],
      ['Coffee Filter',   'Tea Strainer', 'Espresso Tamper'],
      ['Coffee Grounds',  'Loose Tea',    'Ground Espresso Beans']
    ]
    var resultOptions = ['a cup of Coffee', 'a cup of Tea', 'an Espresso']
    
    $scope.isButtonDisabled = false
    
    $scope.generateReels = function () {
      randomizeReels()
      $scope.isButtonDisabled = true
      $timeout(getResult, 3100)
    }


    var randomizeReels = function () {
      var i
      var reelLength
      var currentRandomizedReelPosition
      allRandomizedReelPositions  = []
      $scope.resultStatus         = STATUS.PENDING
      $scope.reelsValues          = []

      // Iterate through all reels
      angular.forEach(reelsOptions, function (reel, reelPos) {
        var nbOfTiles               = 9
        reelLength                  = reel.length
        $scope.reelsValues[reelPos] = []

        // Iterate 'nbOfTiles' times to fill reels
        for (i = 0; i < nbOfTiles; i++) {
          // Randomize the position for the current reel
          currentRandomizedReelPosition = Math.floor(Math.random() * reel.length)

          // Set the result for the current reel
          $scope.reelsValues[reelPos][i] = reel[currentRandomizedReelPosition]

          // Because reel will always stop at the first tile
          // Oops... I gave the solution and there is not anymore magie :s 
          // We keep the first position of the current reel to compare it with other reels
          if (i === 0) {
            allRandomizedReelPositions.push(currentRandomizedReelPosition)
          }
        }
      })
    }

    var getResult = function () {
      var allRandomizedReelPositionsLength  = allRandomizedReelPositions.length
      $scope.isButtonDisabled               = false
      $scope.resultStatus                   = STATUS.WIN
      $scope.resultValue                    = resultOptions[allRandomizedReelPositions[0]]

      // Iterate through all randomized reels positions
      for (var i = 0; i < allRandomizedReelPositionsLength; i++) {
        // If first value of allRandomizedReelPositions is not equal to one of all
        // reelPosition it means all reels positions are not equal so the lazy
        // barista loose and has to get up and make its drink by himself!
        if (allRandomizedReelPositions[0] !== allRandomizedReelPositions[i]) {
          $scope.resultStatus = STATUS.LOOSE
          break;
        }
      }
    }
  })
