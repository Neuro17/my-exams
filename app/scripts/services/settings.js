'use strict';

angular.module('myExamsApp').factory('SettingsFactory', function SettingsFactory($location, Restangular){

	SettingsFactory.getMe = function() {
		return Restangular.all('users').one('me').get()
		 .then(function(me) {
		 	console.log(me);
		 	me.username = 'Neuro';
		 	me.put();
		 })
	}

	return SettingsFactory;

})