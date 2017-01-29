'use strict';

// var mCtrls = require('./_mCtrls'),
//     debug = require('debug'),
//     log = debug('Ctrls'),
//     loader = require('../../utilities/loader');
var mCtrls = require('./../_mCtrls'),
		debug = require('debug'),
		log = debug('Ctrls'),
		loader = require('../../../utilities/loader');

mCtrls.controller('DashboardController',DashboardController);

DashboardController.$inject = ['$rootScope','$scope','$http','lenderService','$cookies','$mdDialog','config', 'dataService'];

function DashboardController($rootScope,$scope,$http,lenderService,$cookies,$mdDialog, config, dataService){

	$scope.groupMax = 0;
	$scope.partnerMax = 0;
	$scope.borrowersMax = 0;
	$scope.borrowers = [];
	$scope.groupList = [];

	$scope.getGroups = function(){

		lenderService.getAllGroup($scope.groupMax).then(function(data){
			console.log(data);
			var bArray = [];
			if(data.status === "success"){
				if(data.data.length == 0){
					$scope.loadMoreGroup = false;
					return;
				}

				angular.forEach(data.data,function(obj){
					console.log(obj);
					obj.groupRiskValue = (obj.groupRiskValue == 'NaN' ? 0 : obj.groupRiskValue);
					$scope.groupList.push(obj);
					bArray.push(obj.recordId);
				})
			
				// var bArray = $.map(response.data.data, function(o){ return o.recordId; });
				console.log(bArray);
				var highest = Math.max.apply(this,bArray);
				console.log(highest);
				$scope.groupMax = highest;
				$scope.loadMoreGroup = true;
			}
		});
	}

	function getBorrower(group,ev){
		lenderService.getGroupBorrower(group.groupId).then(function(data){
			console.log(data);
			if(data.data){
				lenderService.setBorrowerData(data.data);
				$scope.showDetails(ev,group);
			}
		});

	}

	$scope.getGroups();

	$scope.viewBorrowerDetails = function(group,ev) {
		getBorrower(group);
	};

	$scope.lendToBorrower = function(group,isGroup) {
		// lenderService.payBorrower(group,isGroup).then(function(data){
		// 	console.log(data);
		// 	if(data.status === "success"){
		// 		$cookies.put('PayId',data.data.payment_request.id);
		// 		window.location = data.data.payment_request.longurl;
		// 	}
		// });		
		dataService.post(config.getBankDetails, null, false)
		.then(function(response){
			if(response.data.data == true){
		
				// var dataToSend = {
				// 	"groupId":$state.params.groupId,
				// 	"amount":21,//group.loanAmount,
				// 	// "group":true,
				// 	// "groupName":"3",
				// }

				lenderService.payBorrower(group,isGroup).then(function(data){
					console.log(data);
					if(data.status === "success"){
						$cookies.put('PayId',data.data.payment_request.id);
						window.location = data.data.payment_request.longurl;
					}
				});
			}else{
				$scope.bankDetailsModel(group,isGroup);
			}
		})
	};

	$scope.bankDetailsModel = function(group, isGroup, isAU){
		$mdDialog.show({
			templateUrl: './tpls/partials/bankDetails.html',
			parent: angular.element(document.body),
			// targetEvent: ev,
			clickOutsideToClose:true,
			locals:{
				group : group,
				isGroup : isGroup,
				isAU : (isAU ? true : false)
			},
			controller: BankDetailsDetailController

		})
		.then(function(isAU) {
			console.log("isAU === ",isAU);
			if(isAU==true){
				$scope.lendToAUModal(null,group)
			}
		}, function() {
			$scope.status = 'You cancelled the dialog.';
		});

		function BankDetailsDetailController($scope, group,isGroup,isAU){
			$scope.saveBankDetails = function(bank){
				var dataToSend = {
					data : bank
				}
				dataService.post(config.updateLender, dataToSend, false)
				.then(function(response){
					if(response.data.status == 'success'){
						if(isAU == true){
							$mdDialog.hide(true)
						}else{
							lenderService.payBorrower(group,isGroup).then(function(data){
								console.log(data);
								if(data.status === "success"){
									$cookies.put('PayId',data.data.payment_request.id);
									window.location = data.data.payment_request.longurl;
								}
							});	
						}
						

					}else{
						toastr.error(response.data.message, 'Error');
					}
				})
				.catch()
			}
		}
	}
	$scope.investToAu = function(event, partnerDetails){
		dataService.post(config.getBankDetails, null, false)
		.then(function(response){
			if(response.data.data == true){
				$scope.lendToAUModal(event,partnerDetails);
			}else{
				
				$scope.bankDetailsModel(partnerDetails,false,true);
			}
		})
	}

	$scope.lendToAUModal = function(ev, partnerDetails){
		


		$mdDialog.show({
			templateUrl: './tpls/views/au-amount.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			controller : AULendModalController,
			locals : {
				partner : partnerDetails 
			}
		})
		.then(function(answer) {
			$scope.status = 'You said the information was "' + answer + '".';
		}, function() {
			$scope.status = 'You cancelled the dialog.';
		});

		function AULendModalController($rootScope,$scope,lenderService,$cookies,$location, partner){
			console.log(partner);
			$scope.amount = "";

			$scope.hide = function() {
				$mdDialog.hide();
			};

			$scope.payToAU = function(isValid){
				if(isValid){
					var obj = {};
					obj.amount = angular.copy($scope.amount);
					obj.groupName = "";
					// obj.groupId = partner.partnerId;
					obj.partnerId = partner.partnerId;

					lenderService.payBorrower(obj,false).then(function(data){
						console.log(data);
						if(data.status === "success"){
							$cookies.put('PayId',data.data.payment_request.id);
							window.location = data.data.payment_request.longurl;
							$scope.hide();
						}

					});
				}
			}
		}
	};

	$scope.showDetails = function(ev,group) {
		$mdDialog.show({
			templateUrl: './tpls/views/borrower-detail.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals:{
				group : group
			},
			controller: 'BorrowerDetailController'

		})
		.then(function(answer) {
			$scope.status = 'You said the information was "' + answer + '".';
		}, function() {
			$scope.status = 'You cancelled the dialog.';
		});
	};

	$scope.getPartners = function(){
		dataService.post(config.getPartner,{data : 0}, false)
		.then(function(response){
			console.log(response);
			if(response.data.status == 'success'){
				$scope.partners = response.data.data;
			}
		})
		.catch()
	}
	$scope.getAllBorrowers = function(){
		dataService.post(config.getAllBorrowers,{data: $scope.borrowersMax},true)
		.then(function(response){
			var bArray = [];
			if(response.data.status == 'success'){
				angular.forEach(response.data.data,function(obj){
					console.log(obj);
					$scope.borrowers.push(obj);
					bArray.push(obj.recordId)
				})
				var highest = Math.max.apply(this,bArray);
				$scope.borrowersMax = highest;
			}
		})
	}
	$scope.getPartners();
	$scope.getAllBorrowers();
}

