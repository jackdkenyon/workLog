angular.module('searchApp', ['ngRoute']).
  controller('searchController', ['$scope','$http','$window','$route',
                              function($scope, $http, $window ) {

    
    var recordCount = 1; 
    
               
    $http.get('/user/Search')
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
       ship:  $scope.user.ship,
       tech:  $scope.user.tech,
       jsn:  $scope.user.jsn,
       comments:  $scope.user.comments,

      };
    
     $http.post('/user/postUpdateWorkLog', data)
        .then(function(response) { 
      }).
    catch(function(response) {
      $scope.user = {};
      $scope.error = data;
    })      
       
    }
     
     $scope.refreshPage = function($route) {
       //$route.reload();        
        $window.location.reload();
     }
    
     $scope.closePage = function() {
       
       $window.location.href('/');
       //$route.reload();        
       
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

 // config(function($routeProvider){
    //   $routeProvider.when( '/', { templateUrl : 'index.html'})
    //                 .when( '/search', { templateUrl : 'search.html'});
     //                                                                    }).

