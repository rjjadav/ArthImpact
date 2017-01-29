// 'use strict';

// // var mCtrls = require('./_mCtrls'),
// //     debug = require('debug'),
// //     log = debug('Ctrls'),
// //     loader = require('../../utilities/loader');
// var mCtrls = require('./../_mCtrls'),
//     debug = require('debug'),
//     log = debug('Ctrls'),
//     loader = require('../../../utilities/loader');

// mCtrls.controller('AULendModalController',AULendModalController);
// AULendModalController.$inject = ['$rootScope','$scope','lenderService','$cookies','$location', 'partner'];

// function AULendModalController($rootScope,$scope,lenderService,$cookies,$location, partner){
//   console.log(partner);
//   $scope.amount = "";

//   $scope.hide = function() {
//     $mdDialog.hide();
//   };

//   $scope.payToAU = function(isValid){
//     if(isValid){
//       var obj = {};
//       obj.amount = angular.copy($scope.amount);
//       obj.groupName = "";
//       obj.groupId = 0;
//       lenderService.payBorrower(obj,false).then(function(data){
//         console.log(data);
//         if(data.status === "success"){
//           $cookies.put('PayId',data.data.payment_request.id);
//           window.location = data.data.payment_request.longurl;
//           $scope.hide();
//         }

//       });
//     }
//   }

// }
