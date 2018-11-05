/*
* @Author: 蒙卓明
* @Date:   2018-11-05 22:37:29
* @Last Modified by:   蒙卓明
* @Last Modified time: 2018-11-05 23:09:59
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//page逻辑部分
var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        navSide.init({
            //初始化左侧菜单
            name: 'user-pass-update'
        });
    },
    bindEvent: function() {
        var _this = this;
        //点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function() {
            var userInfo = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val()),
            };
            var validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function(res, msg) {
                    _mm.successTips(msg);
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            } else {
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    //验证字段信息
    validateForm: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '请输入长度不少于6位的新密码';
            return result;
        }
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }
        //通过验证
        result.status = true;
        result.msg = "验证通过";
        return result;
    },
}

$(function(){
    page.init();
});