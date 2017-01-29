var mCtrls = require('./_mCtrls');

mCtrls.controller('ToolbarController',ToolbarController);

ToolbarController.$inject = ['$rootScope','$cookies','$state'];

function ToolbarController($rootScope, $cookies, $state){
	var toolbar = this;
	toolbar.logout = logout;

	toolbar.testVar = "testVar";
	
	function logout(){
		console.log('toolbar');
		$cookies.remove('accessToken');
		$cookies.remove('refreshToken');
		$rootScope.isLoggedin = false;
		$state.go('app.home');
	}
}