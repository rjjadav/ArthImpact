'use strict';

var load = require.context('./', true, /^[^_]+\.js$/);

load.keys().forEach(load);

module.exports = 'mCtrls';
