"use strict";

const autoprefixer = require('autoprefixer');
const path =require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MainfestPlugin = require('webpack-manifest-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const baseConfig = require('./webpack.base.conf')

const APP_DIR = path.resolve(__dirname, '../src')

const pro_config = merge(baseConfig, {
    bail: true,
    devtool: "source-map",
    entry: APP_DIR + '/index.js',
    output: {
        path: path.resolve(__dirname, '../build/'),
        filename: "static/js/[name].[chunkhash].js",
        chunkFilename: "static/js/[name].[chunkhash].chunk.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../build/index.html'),
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhiteSpace: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        })
    ]
})

module.exports = pro_config