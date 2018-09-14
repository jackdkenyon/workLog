angular.module('mainApp', []).
  controller('mainController', ['$scope', '$http', 
                              function($scope, $http) {
     var date = new Date();
     $scope.date = date.toString();
     $scope.txt = $scope.date;
    $scope.addDocToWorklog = function() {    
      var data = {
       date: $scope.date,
       summary:  $scope.summary
      };

    
     $http.post('/', data)
        .then(function(response) {
        $scope.summary = "";   
     }).
    catch(function(response) {
      $scope.user = {};
      $scope.error = data;
    });      
       
    }     

  }]);