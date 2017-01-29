'use strict';

var mCtrls = require('./../_mCtrls');

mCtrls.controller('PartnerBorrowerDetailsController',PartnerBorrowerDetailsController);

PartnerBorrowerDetailsController.$inject = ['$state','Upload','toastr','dataService','config','constants'];

function PartnerBorrowerDetailsController($state, Upload, toastr, dataService, config, constants){
	console.log($state.params);
	var br = this;
	br.uploadImage = uploadImage;
	br.saveDetails = saveDetails;
	br.getBorrower = getBorrower;
	br.getPurposeList = getPurposeList;

	br.borrowerDetails = {
		addressProof : true,
		idProof : true
	};
	br.purposeList = [];
	br.status = false;
	br.loading = false;

	br.getBorrower();
	// br.getPurposeList();
	function uploadImage(image){
		console.log(image);
		Upload.base64DataUrl(image)
		.then(function(file){
			br.borrowerDetails.image = file;
		})
	}

	function saveDetails(borrowerDetails){
		br.loading = true;
		borrowerDetails.memberId = $state.params.memberId;
		borrowerDetails.loanCycle = $state.params.loanCycle;
		// delete borrowerDetails.id;
		// delete borrowerDetails.groupId;
		// delete borrowerDetails.branchId;
		// delete borrowerDetails.centerId;
		// delete borrowerDetails.name;
		// delete borrowerDetails.loanId;
		// delete borrowerDetails.address;

		console.log(borrowerDetails);
		var dataToSend = {
			data : {
				"memberId": borrowerDetails.memberId,
				"loanCycle": borrowerDetails.loanCycle,
				"arthBorrowerId": borrowerDetails.arthBorrowerId,
				"guarantorRelation": borrowerDetails.guarantorRelation,
				"addressProof": borrowerDetails.addressProof,
				"idProof": borrowerDetails.idProof,
				"bureauScore": borrowerDetails.bureauScore,
				"txnHistoryScore": borrowerDetails.txnHistoryScore,
				"image": borrowerDetails.image,
				"addressProofType": borrowerDetails.addressProofType,
				"idProofType": borrowerDetails.idProofType,
				"mobile": borrowerDetails.mobile,
				"status": (br.status ? 'Active' : 'Inactive')
			}
		}

		dataService.post(config.updateBorrower, dataToSend, false)
		.then(function(response){
			if(response.data.status == 'success'){
				toastr.success('Borrower Details Saved', 'Success');
				$state.go('app.partner.borrowers')
			}else{
				toastr.error(response.data.message, 'Error');
			}

			br.loading = false;
		})
		.catch(function(error){console.log(error)})
	}

	function getBorrower(){
		var dataToSend = {
			data : {
				arthBorrowerId : $state.params.arthBorrowerId
			}
		}
		dataService.post(config.getBorrower, dataToSend, false)
		.then(function(response){
			console.log(response);
			if(response.data.status == 'success'){
				br.borrowerDetails = response.data.data;
				br.status = (br.borrowerDetails.status == 'Active' ? true : false);
			}
		})
		.catch()
	}

	function getPurposeList(businessType){
		br.purposeList = constants.loanPurpose[businessType];
		console.log(br.purposeList);

		br.purposeLoading = true;
		var dataToSend = {
			data : {
				 "businessType": businessType
			}
		}
		dataService.post(config.getPurposeList,dataToSend,true)
		.then(function(response){
			if(response.data.status == 'success'){
				br.purposeList = response.data.data;
			}
			br.purposeLoading = false;
		})
		.catch();

	}
}