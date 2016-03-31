'use strict';

var path = require('path');
var fs = require('fs');

var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var excludeFromStats = [
    /node_modules[\\\/]/
];

var srcDir = path.resolve(process.cwd(), 'src','webpack');

var alias = {
    avalon: 'lib/avalon/avalon.mobile.shim.min',
    mmRequest: 'lib/avalon/mmRequest',
    mmPromise: 'lib/avalon/mmPromise',
    mmRouter: 'lib/avalon/mmRouter',
    mmHistory: 'lib/avalon/mmHistory',
    mmState: 'lib/avalon/mmState',
    app: 'app',
}

function makeConf(options){
    options = options || {};

    var config = {
        entry: ['app'],
        output: {
            path: path.resolve('__build'),
            filename: 'media/js/[name].js',
            chunkFilename: 'media/js/[chunkhash:8].chunk.js',
            publicPath: '/'
        },

        resolve: {
            root: [path.resolve(srcDir, 'media'),srcDir],
            alias: alias,
            extensions: ['', '.js', '.css', '.scss', '.png', '.jpg', '.jpeg']
        },

        module: {
            noParse: ['avalon','node_modules'],
            loaders: [
                {
                    test: /\.html/,
                    loader: 'html'
                },
                {
                    test: /\.css/,
                    loaders: ['style','css?minimize!autoprefixer']
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('media/css/[name].css',{
                allChunks: true
            }),
            new webpack.ProvidePlugin({
                avalon: "avalon",
                mmRequest: "mmRequest",
                mmState: 'mmState'
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(srcDir, 'index.html'),
                filename: 'index.html',
                inject: 'body'
            })
        ],
        devServer: {
            stats: {
                cached: false,
                exclude: excludeFromStats,
                colors: true
            }
        }
    };

    return config;
}

module.exports = makeConf;
