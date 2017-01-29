'use strict';
var mCtrls = require('./../../_mCtrls');

mCtrls.controller('GroupsController',GroupsController);

GroupsController.$inject = ['dataService','config'];

function GroupsController(dataService, config){
	var groups = this;
	groups.getGroups = getGroups;

	groups.groupsList = undefined;
	groups.options = {
		chart: {
			type: 'pieChart',
			height: 400,
			x: function(d){return d.key;},
			y: function(d){return d.y;},
			showLabels: true,
			duration: 500,
			labelThreshold: 0.01,
			labelSunbeamLayout: true,
			legend: {
				margin: {
					top: 5,
					right: 35,
					bottom: 5,
					left: 0
				}
			}
		}
	};

	groups.data = [
		// {
		// 	key: "Total Payment",
		// 	y: 500000
		// },
		// {
		// 	key: "Expected Payment",
		// 	y: 23000
		// },
		// {
		// 	key: "Return Till Date",
		// 	y: 270000
		// },
		// {
		// 	key: "Payment Remaining",
		// 	y: 300000
		// }
	];



	groups.getGroups();
	function getGroups(){
		dataService.get(config.lenderTransactions, undefined, true)
		.then(function(response){
			console.log(response);
			if(response.data.status == 'success'){
				groups.groupsList = response.data.data.filter(function(obj){
					return obj.transactionTo == 'Group';
				});
				console.log(groups.groupsList);
				groups.data = [];
				angular.forEach(groups.groupsList, function(obj){
					console.log(obj);
					groups.data.push({key:obj.groupId, y: obj.amount});
				})

			}

		})
		.catch();
	}
}


// [
// 		{
// 			lenderId	: "1231",
// 			groupName	: "Asd asd",
// 			status	: 'Approved',
// 			amount	: 500000,
// 			createdOn: new Date(2016,11,20),
// 			paymentId: 'adasdadad',
// 			returnTillDate : 400000
// 		},
// 		{
// 			lenderId	: "1231",
// 			groupName	: "Asd asd",
// 			status	: 'Approved',
// 			amount	: 500000,
// 			createdOn: new Date(2016,11,20),
// 			paymentId: 'adasdadad',
// 			returnTillDate : 400000
// 		},
// 		{
// 			lenderId	: "1231",
// 			groupName	: "Asd asd",
// 			status	: 'Approved',
// 			amount	: 500000,
// 			createdOn: new Date(2016,11,20),
// 			paymentId: 'adasdadad',
// 			returnTillDate : 400000
// 		},
// 		{
// 			lenderId	: "1231",
// 			groupName	: "Asd asd",
// 			status	: 'Approved',
// 			amount	: 500000,
// 			createdOn: new Date(2016,11,20),
// 			paymentId: 'adasdadad',
// 			returnTillDate : 400000
// 		},
// 	];