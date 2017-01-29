
// /**
//  * googleplus module
//  */
// angular.module('googleplus', []).

//   /**
//    * GooglePlus provider
//    */
//   provider('GooglePlus', [function() {

//     /**
//      * Options object available for module
//      * options/services definition.
//      * @type {Object}
//      */
//     var options = {};

//     /**
//      * clientId
//      * @type {Number}
//      */
//     options.clientId = null;

//     this.setClientId = function(clientId) {
//       options.clientId = clientId;
//       return this;
//     };

//     this.getClientId = function() {
//       return options.clientId;
//     };

//     /**
//      * apiKey
//      * @type {String}
//      */
//     options.apiKey = null;

//     this.setApiKey = function(apiKey) {
//       options.apiKey = apiKey;
//       return this;
//     };

//     this.getApiKey = function() {
//       return options.apiKey;
//     };

//     /**
//      * Scopes
//      * @default 'https://www.googleapis.com/auth/plus.login'
//      * @type {Boolean}
//      */
//     options.scopes = 'https://www.googleapis.com/auth/plus.login';

//     this.setScopes = function(scopes) {
//       options.scopes = scopes;
//       return this;
//     };

//     this.getScopes = function() {
//       return options.scopes;
//     };

//     /**
//      * Init Google Plus API
//      */
//     this.init = function(customOptions) {
//       angular.extend(options, customOptions);
//     };

//     /**
//      * Make sign-in server side
//      */
//     this.enableServerSide = function () {
//       options.accessType = 'offline';
//       options.responseType = 'code token id_token gsession';
//     };

//     /**
//      * Make sign-in client side (default)
//      */
//     this.disableServerSide = function () {
//       delete options.accessType;
//       delete options.responseType;
//     };

//     /**
//      * This defines the Google Plus Service on run.
//      */
//     this.$get = ['$q', '$rootScope', '$timeout', function($q, $rootScope, $timeout) {

//       /**
//        * Define a deferred instance that will implement asynchronous calls
//        * @type {Object}
//        */
//       var deferred;

//       /**
//        * NgGooglePlus Class
//        * @type {Class}
//        */
//       var NgGooglePlus = function () {};

//       NgGooglePlus.prototype.login =  function () {
//         deferred  = $q.defer();

//         var authOptions = {
//           client_id: options.clientId,
//           scope: options.scopes,
//           immediate: false
//         };

//         if(options.accessType && options.responseType) {
//           authOptions.access_type = options.accessType;
//           authOptions.response_type = options.responseType;
//         }

//         gapi.auth.authorize(authOptions, this.handleAuthResult);

//         return deferred.promise;
//       };

//       NgGooglePlus.prototype.checkAuth = function() {
//         gapi.auth.authorize({
//           client_id: options.clientId,
//           scope: options.scopes,
//           immediate: true
//         }, this.handleAuthResult);
//       };

//       NgGooglePlus.prototype.handleClientLoad = function () {
//         gapi.client.setApiKey(options.apiKey);
//         gapi.auth.init(function () { });
//         $timeout(this.checkAuth, 1);
//       };

//       NgGooglePlus.prototype.handleAuthResult = function(authResult) {
//           if (authResult && !authResult.error) {
//             deferred.resolve(authResult);
//             $rootScope.$apply();
//           } else {
//             deferred.reject('error');
//           }
//       };

//       NgGooglePlus.prototype.getUser = function() {
//           var deferred = $q.defer();

//           gapi.client.load('oauth2', 'v2', function () {
//             gapi.client.oauth2.userinfo.get().execute(function (resp) {
//               deferred.resolve(resp);
//               $rootScope.$apply();
//             });
//           });

//           return deferred.promise;
//       };

//       NgGooglePlus.prototype.getToken = function() {
//         return gapi.auth.getToken();
//       };

//       NgGooglePlus.prototype.setToken = function(token) {
//         return gapi.auth.setToken(token);
//       };

//       NgGooglePlus.prototype.logout =  function () {
//         gapi.auth.signOut();
//       };

//       NgGooglePlus.prototype.getEmail = function(){
// 		gapi.client.load('plus', 'v1', function() {
// 			gapi.client.plus.people.get( {'userId' : 'me'} ).execute(function(resp) {
// 				// Shows profile information
// 				console.log(resp);
// 			})
// 		});
//       }

//       return new NgGooglePlus();
//     }];
// }])

// // Initialization of module
// .run([function() {
//   var po = document.createElement('script');
//   po.type = 'text/javascript';
//   po.async = true;
//   po.src = 'https://apis.google.com/js/client.js';
//   var s = document.getElementsByTagName('script')[0];
//   s.parentNode.insertBefore(po, s);
// }]);



// /**
//  * googleplus module
//  */
// angular.module('googleplus', []).

//   /**
//    * GooglePlus provider
//    */
//   provider('GooglePlus', [function() {

//     /**
//      * Options object available for module
//      * options/services definition.
//      * @type {Object}
//      */
//     var options = {};

//     /**
//      * clientId
//      * @type {Number}
//      */
//     options.clientId = null;

//     this.setClientId = function(clientId) {
//       options.clientId = clientId;
//       return this;
//     };

//     this.getClientId = function() {
//       return options.clientId;
//     };

//     /**
//      * apiKey
//      * @type {String}
//      */
//     options.apiKey = null;

//     this.setApiKey = function(apiKey) {
//       options.apiKey = apiKey;
//       return this;
//     };

//     this.getApiKey = function() {
//       return options.apiKey;
//     };

//     /**
//      * Scopes
//      * @default 'https://www.googleapis.com/auth/plus.login'
//      * @type {Boolean}
//      */
//     options.scopes = 'https://www.googleapis.com/auth/plus.login';

//     this.setScopes = function(scopes) {
//       options.scopes = scopes;
//       return this;
//     };

//     this.getScopes = function() {
//       return options.scopes;
//     };

//     /**
//      * Init Google Plus API
//      */
//     this.init = function(customOptions) {
//       angular.extend(options, customOptions);
//     };

//     /**
//      * Make sign-in server side
//      */
//     this.enableServerSide = function () {
//       options.accessType = 'offline';
//       options.responseType = 'code token id_token gsession';
//     };

//     /**
//      * Make sign-in client side (default)
//      */
//     this.disableServerSide = function () {
//       delete options.accessType;
//       delete options.responseType;
//     };

//     /**
//      * This defines the Google Plus Service on run.
//      */
//     this.$get = ['$q', '$rootScope', '$timeout', function($q, $rootScope, $timeout) {

//       /**
//        * Define a deferred instance that will implement asynchronous calls
//        * @type {Object}
//        */
//       var deferred;

//       /**
//        * NgGooglePlus Class
//        * @type {Class}
//        */
//       var NgGooglePlus = function () {};

//       NgGooglePlus.prototype.init = function (){
//         deferred = $q.defer();
//         gapi.load('client:auth2', initClient);

//         return deferred.promise;
//         function initClient(){
//           console.log(options.apiKey)
//           gapi.client.init({
//             // apiKey: options.apiKey,
//             clientId: options.clientId,
//             scope: options.scopes,
//             'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
//           })
//           .then(function(){
//               console.log("check status");
//               deferred.resolve(gapi.auth2.getAuthInstance().isSignedIn.get());
//           })
          
//         }
//       }

//       NgGooglePlus.prototype.login =  function () {
//         deferred  = $q.defer();

//         gapi.auth2.getAuthInstance().signIn().then(function(response){
//           deferred.resolve(response)
//         });
//         return deferred.promise;
//       };

//       // NgGooglePlus.prototype.checkAuth = function() {
//       //   gapi.auth.authorize({
//       //     client_id: options.clientId,
//       //     scope: options.scopes,
//       //     immediate: true,
//       //     cookie_policy: 'single_host_origin'
//       //   }, this.handleAuthResult);
//       // };

//       // NgGooglePlus.prototype.handleClientLoad = function () {
//       //   gapi.client.setApiKey(options.apiKey);
//       //   gapi.auth.init(function () { });
//       //   $timeout(this.checkAuth, 1);
//       // };

//       // NgGooglePlus.prototype.handleAuthResult = function(authResult) {
//       //     if (authResult && !authResult.error) {
//       //       deferred.resolve(authResult);
//       //       $rootScope.$apply();
//       //     } else {
//       //       deferred.reject('error');
//       //     }
//       // };

//       NgGooglePlus.prototype.getUser = function() {
//           var deferred = $q.defer();

//           gapi.client.load('plus','v1', function(){
//             var request = gapi.client.plus.people.get({
//               'userId': 'me'
//             });
//             request.execute(function(resp) {
//               deferred.resolve(resp);
//             });
//           });

//           return deferred.promise;
//       };

//       NgGooglePlus.prototype.getToken = function() {
//         return gapi.auth.getToken();
//       };

//       NgGooglePlus.prototype.setToken = function(token) {
//         return gapi.auth.setToken(token);
//       };

//       NgGooglePlus.prototype.logout =  function () {
//         // gapi.auth.signOut();
//         deferred = $q.defer();
//         gapi.auth2.getAuthInstance().signOut().then(function(response){
//           deferred.resolve(true);
//         });

//         return deferred.promise;
//       };

//       return new NgGooglePlus();
//     }];
// }])

// // Initialization of module
// .run([function() {
//   var po = document.createElement('script');
//   po.type = 'text/javascript';
//   po.async = true;
//   po.src = 'https://apis.google.com/js/client.js';
//   var s = document.getElementsByTagName('script')[0];
//   s.parentNode.insertBefore(po, s);
// }]);
