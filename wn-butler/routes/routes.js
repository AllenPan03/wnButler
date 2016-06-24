/**
 * Created by panjunlin on 2016/6/7.
 */
var path = require('path');
var signature = require('../signature');
var config = require('../config/config')();
var createSignature = signature.getSignature(config);
var wechat = require('node-wechat')('allenpan')

module.exports = function(app) {
    app.post('/echo', getMessage);
    //app.get('/echo', fun);
    app.post('./allen',getSignature)
};

function fun(req, res) {
    var u = req.protocol + "://" + req.get('Host') + req.url;
    createSignature(u, function(error, result) {
        console.log("aaa");
        console.log(result);
        res.render('../view/index.html', result);
    });
}

function getSignature(req, res) {
    var url = req.body.url;
    console.log("bbbbbbbbbbbbbbbbbbb");
    createSignature(url, function(error, result) {
        if (error) {
            res.json({
                'error': error
            });
        } else {
            res.json(result);
        }
    });

}

function getMessage(req, res) {
    //检验 token
    wechat.checkSignature(req, res);
    //预处理
    wechat.handler(req, res);
    //监听文本信息
    wechat.text(function (data) {
           console.log("ccc");
        //console.log(data.FromUserName);
        //console.log(data.CreateTime);
        //console.log(data.MsgType);
        //...
        var msg = {
            FromUserName : data.ToUserName,
            ToUserName : data.FromUserName,
            //MsgType : "text",
            Content : "这是文本回复",
            //FuncFlag : 0
        }
        //回复信息
        wechat.send(msg);
    });

}
