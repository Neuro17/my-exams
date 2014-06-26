'use strict';

angular.module('myExamsApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
