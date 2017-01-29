'use strict';

var mCtrls = require('./../_mCtrls'),
    debug = require('debug'),
    log = debug('Ctrls'),
    loader = require('../../../utilities/loader');

mCtrls.controller('BorrowerDetailController',BorrowerDetailController);

BorrowerDetailController.$inject = ['$rootScope','$scope','lenderService','$cookies','$location','$mdDialog','group'];

function BorrowerDetailController($rootScope,$scope,lenderService,$cookies,$location,$mdDialog,group){
  console.log(group);
  $scope.group = group;
	$scope.borrower = lenderService.getBorrowerData();
  console.log($scope.borrower);

  $scope.lendToBorrower = function(group,isGroup) {
    lenderService.payBorrower(group,isGroup).then(function(data){
      console.log(data);
      if(data.status === "success"){
        $cookies.put('PayId',data.data.payment_request.id);
        window.location = data.data.payment_request.longurl;
      }

    });
  };
  
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
