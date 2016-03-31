'use strict';
var gulp = require('gulp'),

    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),

    webserver = require('gulp-webserver'),//web服务

    gutil = require("gulp-util");

var webpackConf = require('./webpack.config');

var src = process.cwd() + '/src';

gulp.task('webpack-server', function(callback) {
    var WebpackDevServer = require('webpack-dev-server');

    var compiler = webpack(webpackConf);
    var devSvr = new WebpackDevServer(compiler, {
        // webpack-dev-server是一个 轻量级 服务器
        contentBase: './src/webpack',   //资源文件夹
        publicPath: webpackConf.output.publicPath,   //资源路径
        stats: webpackConf.devServer.stats
    });

    devSvr.listen(8000, '0.0.0.0', function(err) {
        if(err) throw new gutil.PluginError('webpack-dev-server', err);

        gutil.log('[webpack-dev-server]','http://localhost:8000');
    });
});

gulp.task('rjs-server', function() {
    return gulp.src(src+'/requirejs')
        .pipe(webserver({
            host: '0.0.0.0',
            port: '8888',
        }));
		
});

gulp.task('run-webpack', function() {
    gulp.start('webpack-server');
});

gulp.task('run-rjs',function (){
    gulp.start('rjs-server');
});
