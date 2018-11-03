/*
* @Author: 蒙卓明
* @Date:   2018-11-03 23:04:36
* @Last Modified by:   蒙卓明
* @Last Modified time: 2018-11-04 00:40:08
*/
var webpack = require('webpack');

var extractTextPlugin = require('extract-text-webpack-plugin');

var htmlWebpackPlugin = require('html-webpack-plugin');
//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
};
//webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js', 'webpack-dev-server/client?http://localhost:8088/'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
    },
    output: {
        path: './dist',
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals : {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
        {test: /\.css$/, loader: extractTextPlugin.extract('style-loader','css-loader')},
        {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
        {test: /\.string$/, loader: 'html-loader'}
        ]
    },
    plugins: [
    //独立通用模块到js/base.js
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'js/base.js'
    }),
    //把css单独打包到文件里
    new extractTextPlugin('css/[name].css'),
    //html模板的处理
    new htmlWebpackPlugin(getHtmlConfig('index')),
    new htmlWebpackPlugin(getHtmlConfig('login')),
    ]
};

module.exports = config;