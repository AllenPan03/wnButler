/**
 * Created by user on 2016/5/19.
 */
var API = require('weixin-api');
var config = require('config');

var menu_config = config.get('wx.wx_menu');
var app_id      = config.get('wx.app_id');
var app_secret  = config.get('wx.app_secret');

//配置
var api = new API("wx9f6f40bd985a5e6d", "dcc0a420c3678fab1b16fe56c24d2890");

//测试
function app(){
    api.createMenu(menu_config, function(err, result){
        console.log(result);
    });
}

module.exports = app;