angular.module('myApp', []).
  controller('myController', ['$scope', '$http', 
                              function($scope, $http) {
    $http.get('/user/profile')
        .then(function(data, status, headers, config) {
       $scope.user = data;
       $scope.error = "";
       $scope.today = new Date();
    }).
    catch(function(data, status, headers, config) {
      $scope.user = {};
      $scope.error = data;
    });
  }]);