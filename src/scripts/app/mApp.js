var $ = require("jquery");
window.jQuery = require('jquery');
require('angular');
require('angular-touch');
require('angular-sanitize');
require('angular-animate');
require('angular-cookies');

require('angular-ui-router');
require('angular-material');
require('angular-messages');
require('angular-material-icons');
// require('angular-ui-bootstrap').default;
require('angular-filter').default;
require('bootstrap-sass');
require('angular-nvd3').default;
require('angular-toastr');
require('ng-facebook');
require('angular-google-plus/src/angular-google-plus');
require('angularjs-slider/dist/rzslider');
// require('./directives/google-plus');

require('ng-file-upload/dist/ng-file-upload').default;
require('./animations/_loader');
require('./services/_loader');
require('./controllers/_loader');
require('./directives/_loader');

require('./filters/_loader');



angular.module('mApp', [
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'ngCookies',
    'ngAnimate',
    'ui.router',
    'mAnimations',
    'mCtrls',
    'mDirectives',
    'mServices',
    'mFilters',
    'ngMaterial',
    // 'ui.bootstrap',
    'angular.filter',
    'ngFileUpload',
    'ngFacebook',
    'googleplus',
    'rzModule',
    'nvd3',
    'toastr'
    ]);

require('./theme.config.js');
require('./route.config.js');

require('./api.config.js');
require('./constants.config.js');
require('./fb.config.js');
require('./gplus.config.js');
require('./token.config.js');
require('./interceptor.config.js');
