process.env.BABEL_ENV = 'development';
process.env.NODE_Env = 'development';

process.on('unhandledRejection', err => {
    throw err
})

const fs = require('fs');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const {
    choosePort,
    createCompiler,
    preparaProxy,
    prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const config = require('../config/webpack.dev.config')


const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

choosePort(HOST, DEFAULT_PORT)
    .then(port => {
        if (port == null) {
            return
        }
        const protocol = process.env.HTTPS === 'true' ? 'https': 'http';
        const urls = prepareUrls(protocol, HOST, DEFAULT_PORT);
        const compiler = createCompiler(webpack, config, 'react-test', urls)
        const devServer = new WebpackDevServer(compiler)
        devServer.listen(port, HOST, err => {
            if (err) {
                return console.log(err);
            }
            console.log('Starting server');
            openBrowser('http://localhost:3000');
        });
        ['SIGINT', 'SIGTREM'].forEach(function (sig) {
            process.on(sig, function () {
                devServer.close()
                process.exit()
            });
        });
    })
    .catch( err => {
        if (err && err.message) {
            console.log(err.message)
        }
        process.exit()
    })
