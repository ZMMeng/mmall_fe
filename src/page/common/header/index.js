/*
* @Author: 蒙卓明
* @Date:   2018-11-04 15:25:04
* @Last Modified by:   蒙卓明
* @Last Modified time: 2018-11-04 16:01:31
*/
require('./index.css');

var _mm = require('util/mm.js');

//通用页面头部
var header = {
    init: function () {
        this.bindEvent();
    },
    onLoad : function() {
        var keyword = _mm.getUrlParam('keyword');
        //keyword存在，则回填输入框
        if (keyword) {
            $('#search-input').val(keyword);
        };
    },
    bindEvent: function() {
        var _this = this;
        //点击搜索后，进行提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入回车后，进行提交
        $('#search-input').keyup(function(e){
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
        })
    },
    //搜索的提交
    searchSubmit: function() {
        var keyword = $.trim($('#search-input').val());
        if (keyword) {
            //提交时有keyword，则正常跳转到list页
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            //keyword为空，则直接返回搜索页
            _mm.goHome();
        }
    }
};

header.init();