'use strict';

var mCtrls = require('./../_mCtrls');

mCtrls.controller('PartnerGroupsController',PartnerGroupsController);

PartnerGroupsController.$inject = ['$mdDialog','Upload','toastr','config','dataService'];

function PartnerGroupsController($mdDialog, Upload, toastr, config, dataService){
	var groups = this;
	groups.getAllGroups = getAllGroups;
	groups.searchByGroupCode = searchByGroupCode;
	groups.uploadImageDialog = uploadImageDialog;

	groups.groupsList = [];
	groups.nextRecord = 0;

	groups.getAllGroups();

	function getAllGroups(){
		dataService.post(config.getGroupByPartner,{data:groups.nextRecord},true)
		.then(function(response){
			console.log(response);
			if(response.data.status == "success"){

				angular.forEach(response.data.data,function(obj){
					console.log(obj);
					groups.groupsList.push(obj);
				})
				// groups.groupsList.concat( response.data.data);
				console.log(groups.groupsList.length);	

				var groupArray = $.map(groups.groupsList, function(o){ return o.recordId; });
				console.log(groupArray);
				var highest = Math.max.apply(this,groupArray);
				console.log(highest);
				groups.nextRecord = highest;
			}

		})
		.catch(function(error){})
	}

	function searchByGroupCode(groupCode){
		dataService.post(config.getGroupByGroupCode, {data : groupCode}, false)
		.then(function(response){
			console.log(response);
			if(response.data.status == 'success'){
				groups.groupsList = [];
				groups.groupsList.push(response.data.data);
			}
		})
		.catch()
	}

	function uploadImageDialog(ev, groupCode){

		console.log(groupCode);
		$mdDialog.show({
			controller : UploadImageController,
			controllerAs : 'upload',
			templateUrl : 'tpls/partials/upload-image.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals : {
				groupCode : groupCode
			}
		})
		.then(function(response){})
		.catch(function(error){});
	
		function UploadImageController(Upload, groupCode){
			var upload = this;
			upload.uploadFile = uploadFile;
			upload.updateGroup = updateGroup;

			upload.dataToSend = {};
			upload.dataToSend.groupCode = groupCode;

			upload.loading = false;

			function uploadFile(imgFile){
				Upload.base64DataUrl(imgFile)
				.then(function(file){
					upload.dataToSend.image = file;
				})
			}

			function updateGroup(dataToSend){
				var data = {
					data : dataToSend
				}
				console.log(dataToSend);
				upload.loading = true;
					dataService.post(config.updateGroup, data, false)
					.then(function(response){
						console.log(response);

						upload.loading = false;
						if(response.data.status == 'success'){
							toastr.success('Group Updated Successfully', 'Success');
							$mdDialog.hide();	
						}else{
							toastr.error('Error Updating Group Data', 'Error');
						}
						
					})
					.catch(function(error){
						console.log(error);
						upload.loading = false;
					})
			}
		}
	}
}
