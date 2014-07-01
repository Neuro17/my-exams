'use strict';

angular.module('myExamsApp')
  .factory('GoogleAuth', function ($resource) {
    return $resource('/auth/google');
  });