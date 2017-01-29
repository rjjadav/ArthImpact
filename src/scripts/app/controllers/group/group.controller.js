'use strict';

var mCtrls = require('./../_mCtrls');

mCtrls.controller('GroupController',GroupController);

GroupController.$inject = ['$state','$cookies','$mdDialog','config', 'dataService', 'lenderService'];

function GroupController($state, $cookies, $mdDialog, config, dataService, lenderService){
	var group = this;
	group.getBorrowers = getBorrowers;
	group.offerLoan = offerLoan;
	group.getGroup = getGroup;



	group.centerAddress = $state.params.branch;
	group.loanAmount = $state.params.loanAmount;
	group.borrowers = undefined;

	group.getBorrowers();
	group.getGroup();

	function getBorrowers(){
		var dataToSend = {
			data : {
				groupId : $state.params.groupId
			}
		}
		dataService.post(config.getGroupBorrower,dataToSend,false)
		.then(function(response){
			console.log(response);
			group.borrowers = response.data.data;
		})
		.catch();
	}

	function offerLoan(){
		dataService.post(config.getBankDetails, null, false)
		.then(function(response){
			console.log(response);
			if(response.data.data == true){
		
				var dataToSend = {
					"groupId":$state.params.groupId,
					"amount":21,//group.loanAmount,
					// "group":true,
					// "groupName":"3",
				}

				lenderService.payBorrower(dataToSend,true).then(function(data){
					console.log(data);
					if(data.status === "success"){
						$cookies.put('PayId',data.data.payment_request.id);
						window.location = data.data.payment_request.longurl;
					}
				});
			}else{
				var dataToSend = {
					"groupId":$state.params.groupId,
					"amount":21,//group.loanAmount,
					// "group":true,
					// "groupName":"3",
				}
				bankModel(dataToSend, true);
			}
		})
		.catch();
		
	}

	function bankModel(group, isGroup){
		$mdDialog.show({
			templateUrl: './tpls/partials/bankDetails.html',
			parent: angular.element(document.body),
			// targetEvent: ev,
			clickOutsideToClose:true,
			locals:{
				group : group,
				isGroup : isGroup
			},
			controller: BankDetailsDetailController

		})
		.then(function(answer) {
			$scope.status = 'You said the information was "' + answer + '".';
		}, function() {
			$scope.status = 'You cancelled the dialog.';
		});

		function BankDetailsDetailController($scope, group,isGroup){
			console.log("BankDetailsDetailController");
			$scope.saveBankDetails = function(bank){
				var dataToSend = {
					data : bank
				}
				dataService.post(config.updateLender, dataToSend, false)
				.then(function(response){
					if(response.data.status == 'success'){
						lenderService.payBorrower(group,isGroup).then(function(data){
							console.log(data);
							if(data.status === "success"){
								$cookies.put('PayId',data.data.payment_request.id);
								window.location = data.data.payment_request.longurl;
							}
						});		

					}else{
						toastr.error(response.data.message, 'Error');
					}
				})
				.catch()
			}
		}
	}

	function getGroup(){
		dataService.post(config.getGroupByGroupId, {data : parseInt($state.params.groupId)}, false)
		.then(function(response){
			console.log(response);
		})
		.catch();
	}

}