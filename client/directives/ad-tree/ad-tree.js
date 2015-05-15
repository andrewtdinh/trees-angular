'use strict';

angular.module('adTreeModule', [])
.directive('adTree', function(){
  var o = {};

  o.restrict = 'A';
  o.templateUrl = '/directives/ad-tree/ad-tree.html';
  o.scope = {
    height: '=',
    health: '=',
    id: '='
  };
  o.link = function($scope, element, attrs){};
  o.controller = function($rootScope, $scope, $window, Tree){
    function getState(){
      $scope.state = $window._.find($rootScope.lives, function(life){
        return (life.min <= $scope.height && $scope.height <= life.max);
      });
    }
    getState();

    $scope.grow = function(){
      Tree.grow($scope.id)
      .then(function(response){
        $scope.height = response.data.height;
        $scope.health = response.data.health;
        getState();
      });
    };
  };
  return o;
});
