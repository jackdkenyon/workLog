angular.module('searchApp', []).
  controller('searchController', ['$scope', '$http', 
                              function($scope, $http) {

    $scope.date = new Date(); 
    var recordCount = 1;  

    $http.get('/user/search')
        .then(function(response) {
      $scope.array = response.data;
      $scope.txt = $scope.array;
      $scope.user =  $scope.array[0] ;
      $scope.error = "";
    }).
    catch(function(response) {
      $scope.user = {};
      $scope.error = data;
    });


    $scope.updateWorklog = function(data) {       
      
     var data = {
       _id : $scope.user._id,
       creator_id : $scope.user.creator_id,
       date: $scope.user.date,
       summary:  $scope.user.summary
      };

    
     $http.post('/user/postUpdateWorkLog', data)
        .then(function(response) {  
      $scope.date = response.data;   
    }).
    catch(function(response) {
      $scope.user = {};
      $scope.error = data;
    })      
       
    }



     $scope.nextRecord = function() {    
      if (! $scope.array[recordCount])
       {
         recordCount = 0;
        }     
       $scope.user =  $scope.array[recordCount] ;
       recordCount = recordCount + 1;
      } 

     

  }]);