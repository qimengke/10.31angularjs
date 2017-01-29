	/*ng模块化编程*/
	var app = angular.module('myApp',['ng.filter']);
	app.controller('indexCtrl', function($scope) {
	    $scope.money = 8000;
	})