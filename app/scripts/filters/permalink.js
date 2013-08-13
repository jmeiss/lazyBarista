angular.module('lazyBarista').
  filter('permalink', function() {
    return function(string) {
      return string.toLowerCase().replace(/ /g, '-');
    }
  });
