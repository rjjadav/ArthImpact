'use strict'

angular.module('mApp')
.constant('config',(appConfig)());

function appConfig(){
	var env = 'tech';

	var url = {
		tech :{
			baseUrl:  '//45.56.97.181:8080/LendIndia/'

		},
		local:{
			baseUrl : '//192.168.0.4:8080/lendIndia/'
		}
	};

	var config = {
		lenderLogin : url[env].baseUrl + 'oauth/token',
		saveAccount : url[env].baseUrl + 'saveAccount',
		getAllGroup : url[env].baseUrl + 'getAllGroups',
		getGroupBorrower: url[env].baseUrl + 'getGroupBorrowers',
		payment : url[env].baseUrl + 'createPaymentRequest',
		paymentDetails : url[env].baseUrl + 'getPaymentDetail',
		lenderTransactions: url[env].baseUrl + 'lenderTransactions',
		createPartner : url[env].baseUrl + 'createPartner',
		updateGroup : url[env].baseUrl + 'updateGroup',
		getBorrowerList : url[env].baseUrl + 'getBorrowerList',
		updateBorrower : url[env].baseUrl + 'updateBorrower',
		checkEmail : url[env].baseUrl + 'checkEmail',
		getBorrower : url[env].baseUrl + 'getBorrower',
		getPurposeList : url[env].baseUrl + 'getPurposeList',
		getGroupByPartner : url[env].baseUrl + 'getGroupByPartner',
		getGroupByGroupCode : url[env].baseUrl + 'getGroupByGroupCode',
		getBorrowerByGroupCode : url[env].baseUrl + 'getBorrowerByGroupCode',
		checkAccount : url[env].baseUrl + 'checkAccount',
		getPartner : url[env].baseUrl + 'getPartner',
		getBankDetails : url[env].baseUrl + 'getBankDetails',
		updateLender : url[env].baseUrl + 'updateLender',
		getAllBorrowers : url[env].baseUrl + 'getAllBorrowers',
		getGroupByGroupId : url[env].baseUrl + 'getGroupByGroupId', 
		upload : url[env].baseUrl + 'upload',
	};


	return config;
}
