'use strict';

// var mCtrls = require('./_mCtrls'),
//     debug = require('debug'),
//     log = debug('Ctrls'),
//     loader = require('../../utilities/loader');
var mCtrls = require('./../_mCtrls'),
		debug = require('debug'),
		log = debug('Ctrls'),
		loader = require('../../../utilities/loader');

mCtrls.controller('ThankYouController',ThankYouController);
ThankYouController.$inject = ['$rootScope','$scope','lenderService','$cookies','$location','dataService','config'];

function ThankYouController($rootScope,$scope,lenderService,$cookies,$location,dataService,config){
	$scope.bankAdded = false;

	$scope.getPaymentDetails = function(){
		$scope.loaded  =  false;

		var details = {paymentId:$location.$$search.payment_id,paymentRequestId:$location.$$search.payment_request_id};
		lenderService.getPaymentDetails(details).then(function(data){

			if(data.status == "success"){
				console.log("pay",data);
				$scope.success  =  true;
				$scope.detail = data.data.payment_request;
			}else{
				$scope.success  = false;
			}
			$scope.loaded  =  true;
		});
	}
	

	$scope.getBankDetails = function(){
		dataService.post(config.getBankDetails, null, false)
		.then(function(response){
			console.log(response);
			if(response.data.data == true){
				$scope.bankAdded = true;
			}
		})
		.catch();
	}

	$scope.saveBankDetails = function(bank){
		var dataToSend = {
			data : bank
		}
		dataService.post(config.updateLender, dataToSend, false)
		.then(function(response){
			if(response.data.status == 'success'){
				toastr.success("Bank Details Successfully Saved", 'Success');
			}else{
				toastr.error(response.data.message, 'Error');
			}
		})
		.catch()
	}
	$scope.getPaymentDetails();
	$scope.getBankDetails();

}
