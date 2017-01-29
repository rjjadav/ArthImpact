	'use strict';

angular.module('mApp')
.config(config)

function config($stateProvider, $locationProvider, $urlRouterProvider) {
	'ngInject';
	$stateProvider

	.state('app',{
		abstract: true,
		views:{
			'main' : {
				templateUrl: 'tpls/views/main.html',
				controller: 'MainController',
				controllerAs: 'main'
			},
			'toolbar@app' : {
				templateUrl: 'tpls/partials/header.html',
				controller : 'ToolbarController',
				controllerAs: 'toolbar'
			}
		}
	})
	.state('app.home',{
		url : '/home',
		views: {
			'content@app' :{
				templateUrl: 'tpls/views/home/home.html',
				controller: 'HomeController',
				controllerAs: 'home'
			}
		},
		headerClass : 'no-bg'
	})
	.state('app.offerings',{
		url: '/offerings',
		views: {
			'content@app' :{
				templateUrl: 'tpls/views/offerings/offerings.html',
				controller: 'OfferingsController',
				controllerAs: 'offerings'
			}
		},
		headerClass : undefined
	})
	.state('app.products',{
		url: '/products',
		views: {
			'content@app': {
				templateUrl: 'tpls/views/products/products.html',
				controller: 'ProductsController',
				controllerAs: 'products'
			}
		}
	})
	.state('app.product',{
		url: '/product',
		abstract: true,
		views:{
			'content@app': {
				templateUrl: 'tpls/views/products/product.html'
			}
		}
	})
	.state('app.product.arth_jivika',{
		url: '/arthjivika',
		views: {
			'content@app' : {
				templateUrl: 'tpls/views/products/arth_jivika.html',
				controller: 'ProductsController',
				controllerAs:'products'
			}
		}
	})

	.state('app.product.arth_sanchay',{
		url: '/arthsanchay',
		views: {
			'content@app' : {
				templateUrl: 'tpls/views/products/arth_sanchay.html',
				controller: 'ProductsController',
				controllerAs:'products'
			}
		}
	})
	.state('app.product.friend_of_society',{
		url: '/friendofsociety',
		views: {
			'content@app' : {
				templateUrl: 'tpls/views/products/friend_of_society.html',
				controller: 'ProductsController',
				controllerAs:'products'
			}
		}
	})
	.state('app.login',{
		url: '/login',
		views: {
			'content@app': {
				templateUrl:'tpls/views/login.html',
				controller: 'LoginController',
				controllerAs: 'login'
			}
		}
		
	})
	.state('app.thankyou',{
		url: '/thankyou',
		views: {
			'content@app': {
				templateUrl: 'tpls/views/thankyou.html',
				controller: 'ThankYouController'
			}
		}
		
	})
	.state('app.group',{
		url: '/group/:groupId/:branch/:loanAmount',
		views: {
			'content@app': {
				templateUrl: 'tpls/views/group/group.html',
				controller: 'GroupController',
				controllerAs : 'group'
			}
		}
		
	})

	.state('app.dashboard',{
		url: '/dashboard',
		views: {
			'content@app' : {
				templateUrl: 'tpls/views/dashboard.html',
				controller: 'DashboardController'		
			}
		}
		
	})
	.state('app.lender',{
		// url: '/lender',
		abstract: true,
		views:{
			'content@app' : {
				templateUrl: 'tpls/views/lender/lender.html',
				controller: 'LenderController',
				controllerAs: 'lender'
			}	
		}
		
	})
	.state('app.lender.dashboard',{
		url:'/lender/dashboard',
		views:{
			'content@app' : {
				templateUrl: 'tpls/views/lender/dashboard/dashboard.html',
				controller: 'LenderDashboardController',
				controllerAs: 'dashboard'		
			}
		}
		
	})
	.state('app.lender.groups',{
		url:'/lender/groups',
		views:{
			'content@app' : {
				templateUrl: 'tpls/views/lender/groups/groups.html',
				controller: 'GroupsController',
				controllerAs: 'groups'
			}
		}

	})
	.state('app.lender.group-details',{
		url:'/lender/group/:loanId',
		views:{
			'content@app' : {
				templateUrl: 'tpls/views/lender/group-details/group-details.html',
				controller: 'GroupDetailsController',
				controllerAs: 'gd'
			}
		}
	})
	.state('app.lender.au',{
		// url: '/lender/au',
		abstract: true,
		views:{
			'content@app' : {
				templateUrl: 'tpls/views/lender/au/au.html',
				controller: 'AuController',
				controllerAs: 'au'
			}
		}
	})
	.state('app.lender.au.au-main',{
		url: '/lender/au',
		views:{
			'content@app' : {
				templateUrl: 'tpls/views/lender/au/au-main/au-main.html',
				controller: 'AuMainController',
				controllerAs: 'main'
			}
		}
	})
	.state('app.lender.au.au-inactive',{
		url: '/lender/au/inactive',
		views:{
			'content@app' : {
				templateUrl: 'tpls/views/lender/au/inactive-payout.html',
				controller: 'AuInactivePayoutController',
				controllerAs: 'auInctive'
			}
		}

	})
	.state('app.lender.au.au-active',{
		url: '/lender/au/active',
		views:{
			'content@app' : {
				templateUrl: 'tpls/views/lender/au/active-payout.html',
				controller: 'AuActivePayoutController',
				controllerAs: 'auActive'
			}
		}
	})

	.state('app.partner',{
		abstract: true,
		url: '/partner',
		views:{
			'content@app': {
				templateUrl: 'tpls/views/partner/partner.html',
				controller: 'PartnerController',
				controllerAs: 'partner'
			}
		}
	})
	.state('app.partner.login',{
		url: '/login',
		views: {
			'content@app': {
				templateUrl: 'tpls/views/partner/login/login.html',
				controller: 'PartnerLoginController',
				controllerAs: 'login'
			}
		}
	})
	.state('app.partner.register',{
		url: '/register',
		views: {
			'content@app': {
				templateUrl: 'tpls/views/partner/login/register.html',
				controller: 'PartnerRegisterController',
				controllerAs: 'login'
			}
		}
	})
	.state('app.partner.groups',{
		url: '/groups',
		views: {
			'content@app': {
				templateUrl: 'tpls/views/partner/groups/groups.html',
				controller: 'PartnerGroupsController',
				controllerAs: 'groups'
			}
		}	
	})

	.state('app.partner.groups-details',{
		url: '/group/:groupCode',
		views: {
			'content@app': {
				templateUrl: 'tpls/views/partner/groups/groupDetails.html',
				controller: 'PartnerGroupDetailsController',
				controllerAs: 'gd'
			}
		}	
	})

	.state('app.partner.borrowers',{
		url: '/borrowers',
		views: {
			'content@app' : {
				templateUrl: 'tpls/views/partner/borrower/borrowers.html',
				controller : 'PartnerBorrowerController',
				controllerAs: 'borrower' 
			}
		}
	})
	.state('app.partner.borrower-details',{
		url: '/borrower/:memberId/:loanCycle/:arthBorrowerId',
		views: {
			'content@app' : {
				templateUrl: 'tpls/views/partner/borrower/borrowerDetails.html',
				controller : 'PartnerBorrowerDetailsController',
				controllerAs: 'br'
			}
		},
		params: {
			borrower : null
		}
	})

	$urlRouterProvider.otherwise('/home');
	$locationProvider.html5Mode(false);
}
