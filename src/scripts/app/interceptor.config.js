'use strict';

angular.module('mApp')
	.factory('httpInterceptor', httpInterceptor)
	.config(httpProvider)
	.run(runApp)


httpInterceptor.$inject = ['$cookies','$rootScope','$location'];
function httpInterceptor($cookies, $rootScope, $location){
	var interceptor = {
		request: fnRequest,
		responseError : fnResponseError,
		response : fnResponse
	}

	return interceptor;

	function fnRequest(config){
		config.headers = config.headers || angular.noop;
		if($cookies.get('accessToken'))			
			config.headers['Authorization'] = 'Bearer '+$cookies.get('accessToken');
		return config;
	}

	function fnResponseError(response){
		if(response.status == 401){
			if($cookies.get('isPartner')){
				$cookies.remove('isPartner');
				$cookies.remove('accessToken');
				$cookies.remove('refreshToken');
				$location.path('/partner/login');
			}
			else{
				$location.path('/login')
			}
		}
		return response;
	}

	function fnResponse(response){
		// console.log("RESPONSE ::: ", response.config.headers['x-token']);
		// console.log("RESPONSE INTERCEPTOR ::: ", response.headers('sessionId')); //response.config.headers['sessionId']
		// if(response.headers('sessionId')){
		// 	$cookies.putObject('sessionId',response.headers('sessionId'));
		// }
		// if(response.data != null || response.data != undefined){
		// 	if(response.data.token != null || response.data.token != undefined){
		// 		$cookies.putObject('token',response.data.token);
		// 		if(response.data.token.roleId == 0){
		// 			$rootScope.loggedIn = false;
		// 		}else{
		// 			$rootScope.loggedIn = true;
		// 		}
		// 	}
		// }
		return response;
	}
}
httpProvider.$inject = ['$httpProvider'];
function httpProvider($httpProvider){
	$httpProvider.defaults.useXDomain = true;

	$httpProvider.interceptors.push('httpInterceptor');
}


runApp.$inject = ['$rootScope','$location'];
function runApp(){

}
