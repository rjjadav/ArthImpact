'use strict';
var mCtrls = require('./../_mCtrls'),
		debug = require('debug'),
		log = debug('Ctrls'),
		loader = require('../../../utilities/loader');

mCtrls.controller('LoginController',LoginController);

LoginController.$inject = ['$rootScope','$cookies','$location','$state','toastr', '$facebook','GooglePlus','Upload','lenderService','dataService','config'];

function LoginController($rootScope, $cookies, $location, $state, toastr, $facebook, GooglePlus, Upload, lenderService, dataService, config){
	var login = this;
	login.uploadPan = uploadPan;
	login.login = fnLogin;
	login.checkIfPasswordMatches = checkIfPasswordMatches;
	login.register = register;
	login.loginWithFacebook = loginWithFacebook;
	login.loginWithGooglePlus = loginWithGooglePlus; 
	login.checkAccount = checkAccount;

	login.loadingLogin = false;
	login.loginUser = {};
	login.user = {};
	login.accountExists = undefined;
	login.uploadedPan = undefined;
	login.type = 'arth';
	login.isSocial = false;
	login.error = undefined;

	login.errorObject = {
		confirmPassword: false
	};
	var myDate = new Date();
	login.minDate = new Date(
		myDate.getFullYear()-60,
		myDate.getMonth(),
		myDate.getDate()
	);

	login.maxDate = new Date(
			myDate.getFullYear()-18,
			myDate.getMonth(),
			myDate.getDate()
	);
	
	function uploadPan(image){
		Upload.base64DataUrl(image)
		.then(function(file){
			login.uploadedPan = file;
			console.log(login.uploadedPan);
			var dataToSend = {
				data : login.uploadedPan
			}
			dataService.post(config.upload,dataToSend, false)
			.then(function(response){
				console.log(response);
			})
			.catch()
		})
	};

	function fnLogin(loginDetails){
		loginDetails.grant_type = 'password';
		loginDetails.client_id = 'restapp';
		loginDetails.client_secret = "restapp";
		login.loadingLogin = true;
		dataService.get(config.lenderLogin, loginDetails, false)
		.then(function(response){
			console.log(response);
			if(response.status == 200){
				$cookies.put('accessToken',response.data.value);
				$cookies.putObject('refreshToken',response.data.refreshToken);
				$state.go('app.dashboard');
			}else /*if(response.status == 401)*/{
				if(login.isSocial){
					login.isSocial = false;
					login.error = "Seems Like You are already registered with our system, Please Use those credentials";
				}else{
					toastr.error("Invalid Email or password","Error");	
				}
				
			}
			login.loadingLogin = false;
		})
		.catch(function(error){
			console.log(error);
			login.loadingLogin = false;
			toastr.error("Invalid Email or password","Error")
		})
	};

	function checkIfPasswordMatches(){
		login.errorObject.confirmPassError = login.user.password !== login.user.confirmPassword;
	};


	function register(user){
		login.loadingLogin = true;
		if(login.uploadedPan == undefined){
			toastr.error('Please Upload PAN Card');
			return;
		}
		if(login.type == 'fb'){
			user.username = login.loginUser.username;
			user.password = 'fb_password'
		}
		if(login.type == 'g+'){
			user.username = login.loginUser.username;
			user.password = 'gplus_password'
		}
		
		var dataToSend = {
			data : {
				emailId : user.username,
				password : user.password,
				panCardImage : login.uploadedPan,
				type : login.type
			}
		}
		dataService.post(config.saveAccount,dataToSend,false)
		.then(function(response){
			console.log(response);
			if(response.data.status == 'success'){
				var dataToSend = {
					username : user.username,
					password : user.password,
				}
				// lenderService.lenderLogin(dataToSend).then(function(data){
				// 	console.log(data);
				// 	$cookies.put('accessToken',data.value);
				// 	$cookies.putObject('refreshToken',data.refreshToken);
				// 	$rootScope.isLoggedin = true;
				// 	$location.path('/dashboard');
				// 	console.log($cookies.getAll());
				// });
				login.login(dataToSend);
			}
		})
		.catch()
	};

	function loginWithFacebook(){
		$facebook.login()
		.then(function(response){
			console.log(response);
			$facebook.api('/me',{
				fields: "email" //"name,gender,birthday,picture,email,id"
			})
			.then(function(data){
				console.log(data);
				login.type = 'fb';
				login.isSocial = true;
				login.loginUser.username = data.email;
				login.checkAccount(login.loginUser.username);				
			})
		})
	}

	function loginWithGooglePlus(){
		GooglePlus.login().then(function (authResult) {
            console.log(authResult);

            GooglePlus.getUser().then(function (user) {
                console.log(user);
                login.type = 'g+';
                login.isSocial = true;
                login.loginUser.username = user.email;
                // GooglePlus.getEmail();
                login.checkAccount(login.loginUser.username);
            });
        }, function (err) {
            console.log(err);
        });
	}

	function checkAccount(email){
		console.log(email);
		if(email == undefined){
			return;
		}
		login.error = undefined
		dataService.post(config.checkAccount,{data : email}, false)
		.then(function(response){
			console.log(response);
			if(response.data.status == 'success'){
				if(login.type != response.data.data.type){
					var loginType = 'ArthImpact'
					if(response.data.data.type == 'fb'){
						loginType = 'Facebook';
					}else if(response.data.data.type == 'g+'){
						loginType = 'Google+';
					}
					login.error = "Seems Like You are already registered with "+loginType+", Please Use those credentials"
					login.isSocial = false;
					login.type = 'arth';
					return;
				}
				if(response.data.data.accountExists == true){
					login.accountExists = true;
					login.accountName = response.data.data.name;
					if(login.isSocial){
						var dataToSend = {
							username : email,
							password : (login.type == 'fb' ? 'fb_password' : 'gplus_password')
						}

						login.login(dataToSend);
					}
				}else{
					login.accountExists = false;
					login.accountName = null;
				}	
			}else{
				login.accountExists = false;
				login.accountName = null;
			}
			
		})
	}
}
