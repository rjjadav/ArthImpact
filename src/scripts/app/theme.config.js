'use strict';

angular.module('mApp')
.config(ConfigTheme);

ConfigTheme.$inject= ['$mdThemingProvider'];

function ConfigTheme($mdThemingProvider) {
        $mdThemingProvider.definePalette('amazingPaletteName', {
        '50': 'd55852',
        '100': 'd55852',
        '200': 'd55852',
        '300': 'd55852',
        '400': 'd55852',
        '500': 'd55852',
        '600': 'd55852',
        '700': 'd55852',
        '800': 'd55852',
        '900': 'd55852',
        'A100': 'd55852',
        'A200': 'd55852',
        'A400': 'd55852',
        'A700': 'd55852',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light

        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
         '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    })
    .definePalette('accentPalette', {
        '50': '562113',
        '100': '562113',
        '200': '562113',
        '300': '562113',
        '400': '562113',
        '500': '562113',
        '600': '562113',
        '700': '562113',
        '800': '562113',
        '900': '562113',
        'A100': '562113',
        'A200': '562113',
        'A400': '562113',
        'A700': '562113',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light

        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
         '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });
    $mdThemingProvider.theme('default')
    .primaryPalette('amazingPaletteName')
    .accentPalette('accentPalette')
}