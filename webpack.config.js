/*
* @Author: 蒙卓明
* @Date:   2018-11-03 23:04:36
* @Last Modified by:   蒙卓明
* @Last Modified time: 2018-11-04 17:11:53
*/
var webpack = require('webpack');

var extractTextPlugin = require('extract-text-webpack-plugin');

var htmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置 dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
};
//webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
        'result' : ['./src/page/result/index.js'],
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
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image',
        }
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
    new htmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new htmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
    new htmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    ]
};

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;