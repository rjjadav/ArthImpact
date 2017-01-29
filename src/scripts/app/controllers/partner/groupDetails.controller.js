'use strict';

var mCtrls = require('./../_mCtrls');

mCtrls.controller('PartnerGroupDetailsController',PartnerGroupDetailsController);

PartnerGroupDetailsController.$inject = ['$state','Upload','config','dataService','toastr'];

function PartnerGroupDetailsController($state, Upload, config, dataService, toastr){
	var gd = this;
	gd.getGroup = getGroup;
	gd.saveGroup = saveGroup;
	gd.uploadFile = uploadFile;


	gd.image = undefined;
	gd.groupDetails = undefined;
	gd.groupCode = $state.params.groupCode;
	gd.loading = false;

	gd.getGroup(gd.groupCode);
	function getGroup(groupCode){
		dataService.post(config.getGroupByGroupCode,{data: groupCode},true)
		.then(function(response){
			console.log(response);
			if(response.data.status == 'success'){
				gd.groupDetails = response.data.data;
				gd.status = (gd.groupDetails.status== 'Active' ? true : false);	
			}
			
		})
		.catch();
	}
	function saveGroup(groupDetails){
		gd.loading = true;
		groupDetails.image = gd.groupDetails.image;
		groupDetails.groupCode = $state.params.groupCode;
		groupDetails.status = (groupDetails.status ? 'Active' : 'Inactive')
		var dataToSend = {
			data : {
				image : groupDetails.image,
				groupCode : groupDetails.groupCode,
				status : groupDetails.status
			}
		}
		dataService.post(config.updateGroup, dataToSend, false)
		.then(function(response){
			console.log(response);

			if(response.data.status == 'success'){
				toastr.success('Group Updated Successfully', 'Success');
				$state.go('app.partner.groups')
			}else{
				toastr.error('Error Updating Group Data', 'Error');
			}
			gd.loading = false;
		})
		.catch(function(error){
			console.log(error);
			gd.loading = false;
		})
	}

	function uploadFile(imgFile){
		Upload.base64DataUrl(imgFile)
		.then(function(file){
			gd.groupDetails.image = file;
			console.log(gd.image);
		})
	}

}