/*
* @Author: 蒙卓明
* @Date:   2018-11-04 13:12:47
* @Last Modified by:   蒙卓明
* @Last Modified time: 2018-11-04 23:52:12
*/
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//导航
var nav = {
    init: function() {
        this.bindEvent();
        this.loadUserInfo();
        return this;
    },
    bindEvent: function() {
        //登陆事件
        $('.js-login').click(function() {
            _mm.doLogin();
        });
        //注册事件
        $('.js-register').click(function() {
            window.location.href = './user-register.html';
        });
        //登出事件
        $('.js-logout').click(function() {
            _user.logout(function(res) {
                window.location.reload();
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            });
        });
    },
    loadUserInfo: function() {
        _user.checkLogin(function(res) {
            $('.user.not-login').hide();
            $('.user.login').show().find('.username').text(res.username);
        }, function(errMsg) {
            //do nothing
        });
    },
}

module.exports = nav.init();