'use strict';

angular.module('trees')
.factory('Tree', function($http, nodeUrl){
  function Tree(){
  }

  Tree.create = function(){
    return $http.post(nodeUrl + '/trees');
  };

  Tree.find = function(){
    return $http.get(nodeUrl + '/trees');
  };

  Tree.grow = function(treeId){
    return $http.put(nodeUrl + '/trees/' + treeId + '/grow');
  };

  return Tree;
});
