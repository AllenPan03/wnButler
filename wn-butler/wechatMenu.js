/**
 * Created by user on 2016/6/7.
 */
var fs = require('fs');
var express = require('express');
var API = require('wechat-api');

var config  = fs.readFileSync('./config/default.json');
if (config) {
    config = JSON.parse(config);
}
var menu_config = config.wx.wx_menu;
var app_id      = config.wx.app_id;
var app_secret  = config.wx.app_secret;
//配置
var api = new API(app_id, app_secret);

//测试
function app(){
    api.createMenu(menu_config, function(err, result){
        console.log(result);
    });
}
app();
//module.exports = app;