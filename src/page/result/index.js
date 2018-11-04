/*
* @Author: 蒙卓明
* @Date:   2018-11-04 17:06:47
* @Last Modified by:   蒙卓明
* @Last Modified time: 2018-11-04 17:34:02
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default';
    $element = $('.' + type + '-success');
    //显示对应的提示语
    $element.show();
})
