var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/jobs').success(function(response) {
    console.log("I got the data I requested");
    $scope.jobs = response;
    $scope.job = "";
  });
};

refresh();

$scope.addContact = function() {
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
  $http.put('/jobs/' + $scope.contact._id, $scope.job).success(function(response) {
    refresh();
  });
};

$scope.deselect = function() {
  $scope.job = "";
};

}]);
