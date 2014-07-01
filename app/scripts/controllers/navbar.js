'use strict';

angular.module('myExamsApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
/*    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Settings',
      'link': '/settings'
    }, {
      'title': 'google',
      'link': '/google'
    }];*/
    
    $scope.user = {};
    $scope.errors = {};

      $scope.login = function(form) {
        $scope.submitted = true;
        
        if(form.$valid) {
          Auth.login({
            email: $scope.user.email,
            password: $scope.user.password
          })
          .then( function() {
            // Logged in, redirect to home
            $location.path('/');
          })
          .catch( function(err) {
            err = err.data;
            $scope.errors.other = err.message;
          });
        }
        else {
          $location.path('/');
        }
      };

    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
