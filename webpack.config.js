const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/client/script/script.js',
    target: 'web',
    devtool: '#source-map',
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'dist/client'),
    },
    devServer: {
        contentBase: './dist/client',
        hot: true
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            query: {
                presets: ['es2015', 'stage-2']
            }
        }, {
            test: /\.sass$/,
            loader: 'sass-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'stage-2']
            }
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }, {
            test: /\.json$/,
            use: 'json-loader'
        }]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        new HtmlWebpackPlugin({
            template: 'src/client/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: [
            path.join(__dirname, 'node_modules')
        ]
    },
};
