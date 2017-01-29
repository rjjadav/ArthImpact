'use strict';

angular.module('mApp')
.config(config)

config.$inject = ['$facebookProvider'];

function config($facebookProvider){
	$facebookProvider.setAppId('1640268549548264');
	$facebookProvider.setVersion("v2.4");
	$facebookProvider.setCustomInit({
		status: true, 
		cookie: true,
	});
}