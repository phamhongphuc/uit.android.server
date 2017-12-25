import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from './webpack.dev';

let webpackCompiler = webpack(webpackConfig);

export default function (app) {
    process.env.NODE_ENV == 'development' ?
        app.use(webpackDevMiddleware(webpackCompiler, {
            stats: {
                colors: true,
                hash: false,
                version: false,
                modules: false
            },
            log: console.log
        })) &&
        app.use(webpackHotMiddleware(webpackCompiler, {
            log: console.log
        })) :
        app.use(express.static('dist/client'));
}