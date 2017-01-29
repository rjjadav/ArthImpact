'use strict';
var mCtrls = require('./../../_mCtrls');

mCtrls.controller('GroupDetailsController',GroupDetailsController);

GroupDetailsController.$inject = [];

function GroupDetailsController(){
	var gd = this;

	gd.options = {
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

	gd.data = [
		{
			key: "Total Payment",
			y: 500000
		},
		{
			key: "Expected Payment",
			y: 23000
		},
		{
			key: "Return Till Date",
			y: 270000
		},
		{
			key: "Payment Remaining",
			y: 300000
		}
	];

	gd.amortSchedule = [
		{
			date: new Date(2016,11,2),
			payment: 2000,
			interest: 1500,
			principle: 500,
			balance: 380000
		},
		{
			date: new Date(2017,0,2),
			payment: 2000,
			interest: 1500,
			principle: 500,
			balance: 380000
		},
		{
			date: new Date(2017,1,2),
			payment: 2000,
			interest: 1500,
			principle: 500,
			balance: 380000
		},
		{
			date: new Date(2017,2,2),
			payment: 2000,
			interest: 1500,
			principle: 500,
			balance: 380000
		},
		{
			date: new Date(2017,3,2),
			payment: 2000,
			interest: 1500,
			principle: 500,
			balance: 380000
		},
		{
			date: new Date(2017,4,2),
			payment: 2000,
			interest: 1500,
			principle: 500,
			balance: 380000
		}
	];
}
