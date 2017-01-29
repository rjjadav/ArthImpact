'use strict';
var mCtrls = require('./../../_mCtrls');

mCtrls.controller('AuActivePayoutController',AuActivePayoutController);

AuActivePayoutController.$inject = ['dataService','config'];

function AuActivePayoutController(dataService, config){
	var auActive = this;
	auActive.getGroups = getGroups;

	auActive.groupsList = [];
	auActive.options = {
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
	auActive.data = [];
	auActive.getGroups();
	function getGroups(){
		dataService.get(config.lenderTransactions, undefined, true)
		.then(function(response){
			console.log(response);
			if(response.data.status == 'success'){
				auActive.groupsList = response.data.data.filter(function(obj){
					return obj.transactionTo == 'AU';
				});
				console.log(auActive.groupsList);
				auActive.data = [];
				angular.forEach(auActive.groupsList, function(obj){
					console.log(obj);
					auActive.data.push({key:obj.groupId, y: obj.amount});
				})

			}

		})
		.catch();
	}
}