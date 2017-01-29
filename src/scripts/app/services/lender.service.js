'use strict';

var mServices = require('./_mServices');

mServices.factory("lenderService",lenderService);

lenderService.$inject = ['dataService','config','$q','$cookies','$location'];

function lenderService(dataService,appConfig,$q,$cookies,$location){
	var borrwerData = {};
	var data = {
		lenderLogin : fnLenderLogin,
		lenderRegister : fnLenderRegister,
		getAllGroup : fnGetAllGroup,
		getGroupBorrower : fnGetGroupBorrower,
		payBorrower : fnPayBorrower,
		setBorrowerData : fnSetBorrowerData,
		getBorrowerData :fnGetBorrowerData,
		getPaymentDetails : fnGetPaymentDetails,

	};

	return data;

	function fnSetBorrowerData(data){
		borrwerData = data;
	}

	function fnGetBorrowerData(){
		return borrwerData;
	}
  function fnLenderLogin(dataToSend){
		var deferred = $q.defer();
		console.log(dataToSend);
    dataToSend = prepareLoginInputObject(dataToSend);

    dataService.get(appConfig.lenderLogin,false,dataToSend).success(function(data){
			if(data.value){
				deferred.resolve(data);
			}else{
				deferred.resolve("fail");
			}
    });
		return deferred.promise;
  }

  function prepareLoginInputObject(dataToSend){
      var finalString = "?";
      finalString = finalString +"grant_type=password&";
			finalString = finalString +"client_id=restapp&";
			finalString = finalString +"client_secret=restapp&";
			finalString = finalString +"username="+dataToSend.email+"&";
			finalString = finalString +"password="+dataToSend.password;

      return finalString;
  }

	function fnLenderRegister(dataToSend){
		var deferred = $q.defer();
		console.log(dataToSend);
    dataToSend = prepareRegisterInputObject(dataToSend);
    dataService.post(appConfig.saveAccount,dataToSend).success(function(data){
			if(data.status==="success"){
				deferred.resolve(data);
			}else if(data.httpErrorCode==401){
				deferred.resolve("fail");
			}
    });
		return deferred.promise;
  }

	function prepareRegisterInputObject(dataToSend){
		var data = {};
		data.dateOfBirthString = getDOBInString(dataToSend.dob);
		data.mobile = dataToSend.mobileNo;
		data.emailId = dataToSend.email;
		data.password = dataToSend.password;
		data.panCardImage = dataToSend.panFile;
		data.crossChequeImage = dataToSend.chequeFile;
		data.bankAccountNumber = dataToSend.accountNo;
		data.ifscCode = dataToSend.ifscCode;
		return data;
	}

	function getDOBInString (dob){
		console.log(dob,dob.getFullYear(),dob.getDate(),dob.getMonth());
		var month = dob.getMonth()+1;
		return dob.getDate()+'/'+month+'/'+dob.getFullYear();

	}

	function fnGetAllGroup(dataToSend){
		var deferred = $q.defer();
		dataService.post(appConfig.getAllGroup, {data: dataToSend}).success(function(data){
			if(data && data.status==="success"){
				deferred.resolve(data);
			}else  if(data.httpErrorCode==401){
				$cookies.remove('accessToken');
				$cookies.remove('refreshToken');
				$location.path('/login');
				deferred.resolve("fail");
			}else{
				deferred.resolve("fail");
			}
    });
		return deferred.promise;
  }

	function fnGetGroupBorrower(id){
		var deferred = $q.defer();
		var dataToSend = prepareBorrowerInputObject(id);
		dataService.post(appConfig.getGroupBorrower,dataToSend).success(function(data){
			if(data && data.status==="success"){
				deferred.resolve(data);
			}else  if(data.httpErrorCode==401){
				deferred.resolve("fail");
			}else{
				deferred.resolve("fail");
			}
    });
		return deferred.promise;
	}

	function prepareBorrowerInputObject(id){
		var data = {
			data : {
				groupId : id	
			} 
		};
		return data;
	}

	function fnPayBorrower(group,isGroup){
		var deferred = $q.defer();
		var dataToSend = preparePaymentObject(group,isGroup);
		dataService.post(appConfig.payment,dataToSend).success(function(data){
			if(data && data.status==="success"){
				deferred.resolve(data);
			}else  if(data.httpErrorCode==401){
				deferred.resolve("fail");
			}else{
				deferred.resolve("fail");
			}
    });
		return deferred.promise;
	}

	function preparePaymentObject(group,isGroup){
		var data = {
			data : {
				
				groupName : group.groupName ? group.groupName.toString() : '',
				amount : parseInt(group.amount)||21,
				// groupId : parseInt(group.groupId),
				group : isGroup,
			}
		};

		if(isGroup){
			data.data.groupId = parseInt(group.groupId);
		}else{
			data.data.partnerId = parseInt(group.partnerId);
		}
		
		return data;
	}

	function fnGetPaymentDetails(details){
		var deferred = $q.defer();
		var dataToSend = preparePaymentDetailsObj(details);
		dataService.post(appConfig.paymentDetails,dataToSend).success(function(data){
			if(data && data.status==="success"){
				deferred.resolve(data);
			}else  if(data.httpErrorCode==401){
				deferred.resolve("fail");
			}else{
				deferred.resolve("fail");
			}
    });
		return deferred.promise;
	}

	function preparePaymentDetailsObj(details){
		var data = {
			data : {
				paymentId : details.paymentId,
				paymentRequestId : details.paymentRequestId
			}
		};
		return data;
	}

}
