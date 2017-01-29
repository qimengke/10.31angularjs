var ngFilter = angular.module('ng.filter',[]);

ngFilter.filter('moneyFilter',function() {
	return function(val,arg1) {
		return arg1+val;
	}
})