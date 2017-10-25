/*"use strict";

const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const config= require('./webpack.dev.config');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = function (proxy, allowedHost) {
    return {
        disableHostCheck: !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
        compress: true,
        clientLogLevel: 'none',
        contentBase: '',
        watchContentBase: true,
        hot: true,
    }
}*/
