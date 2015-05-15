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
        if($scope.health >= 70){
          $scope.success = true;
          $scope.danger = false;
          $scope.warning = false;
        }else if($scope.health < 30){
          $scope.danger = true;
          $scope.success = false;
          $scope.warning = false;
        }else{
          $scope.danger = false;
          $scope.success = false;
          $scope.warning = true;
        }
        return (life.min <= $scope.height && $scope.height <= life.max);
      });
    }
    getState();

    $scope.grow = function(){
      Tree.grow($scope.id)
      .then(function(response){
        console.log('response: ', response);
        $scope.height = response.data.height;
        $scope.health = response.data.health;
        getState();
        if(response.data.health < 0){
          $rootScope.deadTree = response.data;
        }
      });
    };
  };
  return o;
});
