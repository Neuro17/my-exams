'use strict';

angular.module('myExamsApp').controller('MainCtrl', function MainCtrl($scope, $rootScope, MainFactory) {

	/*
		Vecchio modo.
		- le richieste http non vanno fatte qui ma nel Factory
	*/

	/*$http.get('/api/awesomeThings').success(function(awesomeThings) {
	  $scope.awesomeThings = awesomeThings;
	});*/


	/* 	prova usando restangular e rilegando tutta la logica al Factory,
		in modo che il controller il servizio possa essere riutilizzato 
		tra diversi controller se necessario
	*/
	MainFactory.getAwesomeThings()
	 .then(function() {
	 	$scope.awesomeThings = MainFactory.awesomeThings;
	 });

	//MainFactory.getMe();


});
