'use strict';

var mServices = require('./_mServices');

mServices.factory("dataService",dataService);

dataService.$inject = ['$http', '$cookies'];

function dataService($http, $cookies){
	var data = {
		get : fnGet,
		post : fnPost,
		delete : fnDelete,
		put : fnPut,
		upload : fnUploadFiles,
		// getApi : fnGetApi
	};

	return data;

	function fnGet(url, dataToSend, cache){
		dataToSend = dataToSend || {};
		cache = cache || false;

		return $http.get(url,{params : dataToSend}, {cache: cache})
		.then(function(response){
			return response;
		});
	}

	function fnPost(url, dataToSend, cache){
		dataToSend = dataToSend || null;
		cache = cache || false;
		// var data = {
		// 	token : $cookies.getObject('token'),
		// 	data : dataToSend
		// };
		return $http.post(url,dataToSend, {cache: cache});
	}

	function fnDelete(url, dataToSend){
		dataToSend = dataToSend || {};
		var data = {
			token : token,
			data : dataToSend
		};
		return $http.delete(url,{
			params : data
		});
	}

	function fnPut(url, dataToSend){
		dataToSend = dataToSend || {};
		var data = {
			token : token,
			data : dataToSend
		};
		return $http.put(url,{
			params : data
		});
	}

	function fnUploadFiles(url, dataToSend){
		return Upload.upload({
			url: url,
			headers: {
				"token" : JSON.stringify($cookies.getObject('token')),
				"Content-Type" : undefined
			},
			data: dataToSend
		});
	}
}
