var express = require("express");

var app = angular.module('myApp', []);
app.controller('JobCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello, this is controller");

var refresh = function() {
  $http.get('/jobs').success(function(response) {
    console.log("Dafuq I got the data");
    $scope.joblist = response;
    $scope.job = "";
  });
};

refresh();

$scope.addJob = function() {
  console.log($scope.job);
  $http.post('/jobs', $scope.job).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/jobs/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/jobs/' + id).success(function(response) {
    $scope.job = response;
  });
};

$scope.update = function() {
  console.log($scope.job._id);
  $http.put('/jobs/' + $scope.job._id, $scope.job).success(function(response) {
    refresh();
  });
};

$scope.deselect = function() {
  $scope.job = "";
};

}]);
