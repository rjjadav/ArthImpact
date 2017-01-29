'use strict';

var mCtrls = require('./../_mCtrls');

mCtrls.controller('PartnerRegisterController',PartnerRegisterController);

PartnerRegisterController.$inject = ['$rootScope','$state','$cookies','toastr','dataService','config'];

function PartnerRegisterController($rootScope, $state, $cookies, toastr, dataService, config){
	var login = this;

	login.registerPartner = registerPartner;

	var myDate = new Date();
	login.minDate = new Date(
		myDate.getFullYear()-60,
		myDate.getMonth(),
		myDate.getDate()
	);

	login.maxDate = new Date(
		myDate.getFullYear()-18,
		myDate.getMonth(),
		myDate.getDate()
	);

	function registerPartner(partnerDetails){
		partnerDetails.account.dateOfBirthString = partnerDetails.account.dob;
		partnerDetails.account.dateOfBirthString = partnerDetails.account.dateOfBirthString.toISOString();
		delete partnerDetails.account.dob;
		console.log(partnerDetails);
		dataService.post(config.createPartner, {data : partnerDetails}, false)
		.then(function(response){
			console.log(response);
		})
		.catch(function(error){
			console.log(error);
		});
	}
}
