angular.module('mainApp', []).
  controller('mainController', ['$scope', '$http', '$window',
 
                              function($scope, $http, $window) {     
          

      $scope.openSearch = function () { 
      
        var data = {
       date: $scope.date,
       ship: $scope.ship,
       tech: $scope.tech,
       jsn: $scope.jsn,
       comments: $scope.comments
      };
    
     $http.post('/user/searchValue', data)
        .then(function(response) {
        $scope.summary = "";   
     }).
     catch(function(response) {
      $scope.user = {};
      $scope.error = data;
     }); 
       
       $window.location.href('/search');
     }
      

     var date = new Date();
     $scope.date = date.toUTCString();
     
    $scope.addDocToWorklog = function() {    
      
     var data = {
       date: $scope.date,
       ship: $scope.ship,
       tech: $scope.tech,
       jsn: $scope.jsn,
       comments: $scope.comments
      };
    
     $http.post('/', data)
        .then(function(response) {
        $scope.summary = "";   
     }).
    catch(function(response) {
      $scope.user = {};
      $scope.error = data;
    }); 
     
     var date = new Date();
     $scope.date =date.toUTCString();
     
     $scope.ship = "";
     $scope.tech = "";
     $scope.jsn = "";     
     $scope.comments =""; 
    } 


  $scope.logout = function () { 
    $window.location.href('/logout'); 
  }
    

  }]);