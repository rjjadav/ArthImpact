'use strict';

var mCtrls = require('./../_mCtrls');

mCtrls.controller('PartnerBorrowerController',PartnerBorrowerController);

PartnerBorrowerController.$inject = ['config','dataService'];

function PartnerBorrowerController(config, dataService){
	var borrower = this;

	borrower.searchBorrowers = searchBorrowers;
	borrower.getBorrowerByGroupCode = getBorrowerByGroupCode;

	borrower.borrowersList = undefined;

	function searchBorrowers(search){
		var dataToSend = {
			data : search
		}
		dataService.post(config.getBorrowerList,dataToSend, true)
		.then(function(response){
			console.log(response)
			if(response.data.status == 'success'){
				borrower.borrowersList = response.data.data;
			}
		})
		.catch(function(error){
			console.log(error);
		})
	}

	function getBorrowerByGroupCode(groupCode){
		dataService.post(config.getBorrowerByGroupCode,{data:groupCode},false)
		.then(function(response){
			console.log(response);
			if(response.data.status == 'success'){
				borrower.borrowersList = response.data.data;
			}
		})
		.catch()
	}
}
