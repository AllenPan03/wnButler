var wechat = require('wechat');
var express = require('express');
var app = express();
var webot = require('weixin-robot');





function getMessage(req, res) {
    console.log("这是一个文本回复");
    webot.set('hi', '你好');
    // 指定回复消息
    webot.set('subscribe', {
        pattern: function(info) {
            return info.is('event') && info.param.event === 'subscribe';
        },
        handler: function(info) {
            return '欢迎订阅微信机器人';
        }
    });
    webot.set('test', {
        pattern: /^test/i,
        handler: function(info, next) {
            next(null, 'roger that!')
        }
    });
    var wx_token = process.env.WX_TOKEN || 'allenpan';

// 接管消息请求
    webot.watch(app, { token: wx_token,path:'/echo'});

}

//app.use( wechat(config, function (req, res, next) {
//    // 微信输入信息都在req.weixin上
//    var message = req.weixin;
//    console.log(message)
//    //if (message.FromUserName === 'diaosi') {
//    //    // 回复屌丝(普通回复)
//    //    res.reply('hehe');
//    //} else if (message.FromUserName === 'text') {
//    //    //你也可以这样回复text类型的信息
//    //    res.reply({
//    //        content: 'text object',
//    //        type: 'text'
//    //    });
//    //} else if (message.FromUserName === 'hehe') {
//    //    // 回复一段音乐
//    //    res.reply({
//    //        type: "music",
//    //        content: {
//    //            title: "来段音乐吧",
//    //            description: "一无所有",
//    //            musicUrl: "http://mp3.com/xx.mp3",
//    //            hqMusicUrl: "http://mp3.com/xx.mp3",
//    //            thumbMediaId: "thisThumbMediaId"
//    //        }
//    //    });
//    //} else {
//    //    // 回复高富帅(图文回复)
//    //    res.reply([
//    //        {
//    //            title: '你来我家接我吧',
//    //            description: '这是女神与高富帅之间的对话',
//    //            picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
//    //            url: 'http://nodeapi.cloudfoundry.com/'
//    //        }
//    //    ]);
//    //}
//}));
module.exports = function(app) {
    app.post('/echo', getMessage);
};