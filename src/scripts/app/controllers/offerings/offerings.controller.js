'use strict';

var mCtrls = require('./../_mCtrls');

mCtrls.controller('OfferingsController',OfferingsController);

OfferingsController.$inject = ['$rootScope', '$state', '$mdDialog', 'toastr', 'dataService', 'config'];

function OfferingsController($rootScope, $state, $mdDialog, toastr, dataService, config){
	var offerings = this;
	offerings.gotoDashboard = gotoDashboard;
	offerings.knowMore = knowMore;
	offerings.openProductDialog = openProductDialog;

	function gotoDashboard(){
		console.log($rootScope.isLoggedin);
		if($rootScope.isLoggedin == true){
			$state.go('app.dashboard');
		}else{
			$state.go('app.login');
		}
	}

	function knowMore(ev){
		$mdDialog.show({
			controller: KnowMoreController,
			controllerAs: 'km',
			templateUrl: 'tpls/partials/email.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true
		})
		.then(function(response){
			console.log(response);
		})

		function KnowMoreController($mdDialog){
			var km = this;
			km.goToProducts = goToProducts;

			function goToProducts(email){
				dataService.post(config.checkEmail, {data: email}, false)
				.then(function(response){
					console.log(response);	
					var jsonResponse = JSON.parse(response.data.data);

					console.log(jsonResponse)
					if(jsonResponse.result == 'Ok'){
						$mdDialog.hide();
						$state.go('app.products');		
					}
					else{
						toastr.error('Invalid Email Id', 'Error')
					}
				})
				
			}
		}
	}

	function openProductDialog(ev, page){
		$mdDialog.show({
			controller: ProductController,
			controllerAs: 'product',
			templateUrl: 'tpls/views/products/'+page+'.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true
		})
		.then(function(response){
			console.log(response);
		})

		function ProductController($mdDialog){
			var product = this;

			product.close = close;
			product.gotoDashboard = gotoDashboard;
			function close(){
				$mdDialog.hide();
			}

			function gotoDashboard(){
				$mdDialog.hide();
				if($rootScope.isLoggedin == true){
					$state.go('app.dashboard');
				}else{
					$state.go('app.login');
				}
			}
		}		
	}
}