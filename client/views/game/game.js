'use strict';

angular.module('trees')
.controller('GameCtrl', function(Life, $scope, Tree, $rootScope){
  Life.find()
  .then(function(lifeResponse){
    $rootScope.lives = lifeResponse.data.lives;

    Tree.find()
    .then(function(treeResponse){
      $scope.trees = treeResponse.data.trees;
    });
  });

  $scope.plantTree = function(){
    Tree.create()
    .then(function(response){
      $scope.trees.push(response.data);
    });
  };
});
