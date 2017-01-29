'use strict';

var mCtrls = require('./../_mCtrls');

mCtrls.controller('PartnerLoginController',PartnerLoginController);

PartnerLoginController.$inject = ['$rootScope','$state','$cookies','toastr','dataService','config'];

function PartnerLoginController($rootScope, $state, $cookies, toastr, dataService, config){
	var login = this;

	login.loginPartner = loginPartner;
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

	function loginPartner(loginDetails){
		loginDetails.grant_type = 'password';
		loginDetails.client_id = 'restapp';
		loginDetails.client_secret = "restapp";
		login.loadingLogin = true;
		dataService.get(config.lenderLogin, loginDetails, false)
		.then(function(response){
			console.log(response);
			if(response.status == 200){
				$cookies.put('accessToken',response.data.value);
				$cookies.putObject('refreshToken',response.data.refreshToken);
				$cookies.put('isPartner', true);
				$rootScope.isLoggedin = true;
				$state.go('app.partner.groups');
			}else /*if(response.status == 401)*/{
				console.log("401");
				toastr.error("Invalid Email or password","Error")
			}
			login.loadingLogin = false;
		});
	}

	function registerPartner(partnerDetails){
		partnerDetails.account.dateOfBirthString = partnerDetails.account.dob;
		partnerDetails.account.dateOfBirthString = partnerDetails.account.dateOfBirthString.toISOString();
		delete partnerDetails.account.dob;
		console.log(partnerDetails);
		dataService.post(config.createPartner, partnerDetails, false)
		.then(function(response){
			console.log(response);
		})
		.catch(function(error){
			console.log(error);
		});
	}
}
