var mCtrls = require('./_mCtrls');

mCtrls.controller('RootController',RootController);

RootController.$inject = [];

function RootController(){
	var vm = this;
	console.log("RootController");
}