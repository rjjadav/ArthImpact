'use strict';

angular.module('mApp')
.config(config)

config.$inject = ['GooglePlusProvider'];

function config(GooglePlusProvider){
	GooglePlusProvider.init({
		clientId: '146309570641-qo4s00qm6gbiitg5gfbp42sbovuntt73.apps.googleusercontent.com',
		apiKey: '7HrEqrWTwk0QxWO-NSSxK3HY',
		scopes : 'https://www.googleapis.com/auth/userinfo.email'
		// cookie_policy: 'single_host_origin',
		// discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
	});
}