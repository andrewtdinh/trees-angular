'use strict';

angular.module('trees')
.controller('GameCtrl', function(Life, $scope, Tree, $rootScope, $window){
  function updateTrees(){
    Life.find()
    .then(function(lifeResponse){
      $rootScope.lives = lifeResponse.data.lives;

      Tree.find()
      .then(function(treeResponse){
        $scope.trees = treeResponse.data.trees;
      });
    });
  }
  updateTrees();
  $rootScope.$watch('deadTree', function(newValue){
    if(newValue){
      console.log('This is $rootScope.deadTree._id: ', newValue._id);
      console.log('This is newValue: ', newValue);
      $window._.remove($scope.trees, function(e){
        return e._id === newValue._id;
      });
    }
  });

  $scope.plantTree = function(){
    Tree.create()
    .then(function(response){
      $scope.trees.push(response.data);
    });
  };
});
