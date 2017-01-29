'use strict';

angular.module('mApp')
.run(initializeToken);

initializeToken.$inject = ['$rootScope', '$http', '$state', '$cookies', 'config', 'GooglePlus'];

function initializeToken($rootScope, $http, $state, $cookies, config, GooglePlus){
	initFB();
	// GooglePlus.init()
	// .then(function(response){
	// 	console.log(response);
	// })
	var accessToken = $cookies.get('accessToken');
	console.log(accessToken);

	$rootScope.isLoggedin = true;
	if(!accessToken){
		$rootScope.isLoggedin = false;
	}
	

	$rootScope.$on('$stateChangeStart', stateChangeStart);

	function stateChangeStart(event, toState, toParams, fromState, fromParams){
		
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		if(toState.name == 'app.home'){
			$rootScope.headerClass = toState.headerClass;
		}
		else{
			// console.log('not home')
			$rootScope.headerClass = '';
		}

		// console.log(toState.name.indexOf('app.partner'))
		if(toState.name.indexOf('app.partner') > -1){
			$rootScope.isPartner = true;
		}
		
		var accessToken = $cookies.get('accessToken');
		var shouldLogin = accessToken == undefined;
		var atLogin = toState.name == 'login';
		if(shouldLogin == false){
			$rootScope.isLoggedin = true;
		}

		if($cookies.get('isPartner')){
			$rootScope.isPartner = true;
		}
	}

	function initFB(){
		if (document.getElementById('facebook-jssdk')) {return;}
		var firstScriptElement = document.getElementsByTagName('script')[0];
		var facebookJS = document.createElement('script'); 
		facebookJS.id = 'facebook-jssdk';
		facebookJS.src = '//connect.facebook.net/en_US/sdk.js';
		firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
	}
}
