'use strict';

angular.module('myExamsApp').factory('MainFactory', function MainFactory($location, Restangular) {
 	
 	MainFactory.awesomeThings = [];


 	MainFactory.getAwesomeThings = function() {
		return Restangular.all('awesomeThings').getList()
			.then(function(awesomeThings) {
				MainFactory.awesomeThings = awesomeThings;
			})
	}

	// esempio di funzionalità di restangular... andrà cancellato
	MainFactory.getMe = function() {
		return Restangular.one('users','me').get()
			.then(function(me) {
				MainFactory.me = me;
				console.log(MainFactory.me);		 	
			});
	}

	return MainFactory;
 }) 