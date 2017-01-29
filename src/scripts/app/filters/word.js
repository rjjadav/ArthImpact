'use strict';

require('./_mFilters');

angular.module('mFilters').filter('word',word);

function word(){
	return function(val){
		if(!val){
			return;
		}

		// var res = val.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
		// var result = val.replace( /([A-Z][0-9])/g, " $1" );
		// var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
		// console.log(finalResult);
		// return finalResult;

		//Add space on all uppercase letters
		var result = val.replace(/([A-Z0-9])/g, ' $1').toLowerCase();
		//Trim leading and trailing spaces
		result = result.trim();
		//Uppercase first letter
		return result.charAt(0).toUpperCase() + result.slice(1);

	}
}