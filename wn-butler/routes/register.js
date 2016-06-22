/**
 * Created by Allen Iverson on 2016/6/5.
 */
var express = require('express');
var router = express.Router();
/* GET register page. */
router.route("/").get(function(req,res){    // 到达此路径则渲染register文件，并传出title值供 register.html使用
    res.render("register",{title:'艾弗森'});
    console.log('艾弗森');
}).post(function(req,res){
    //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    var User = global.dbHandel.getModel('user_info');
    var uname = req.body.uname;
    var uphone = req.body.uphone;
    var wechatId = req.body.wechatId;
    console.log(wechatId);
    //var openid = req.body.wechat_id;
    //console.log(openid);
    User.findOne({name: wechatId},function(err,doc){
        if(err){
            res.send(500);
            console.log("网络异常错误！");
            //req.session.error =  '网络异常错误！';
            console.log(err);
        }else if(doc){
            console.log("用户已存在啊啊啊啊啊！");
           // res.redirect('/view/register.html');
        }else{
           // res.redirect('/view/register.html');
            User.create({ 							// 创建一组user对象置入model
               // wechat_id: openid,
                name: uname,
                hand_phone: uphone,
                wechat_id:wechatId
            },function(err,doc){
                if (err) {
                    res.send(500);
                    console.log(err);
                    console.log("报错");
                } else {
                    console.log(doc);
                    req.session.user_info = doc;
                    console.log("用户名创建成功！");
                    res.send(200);
                }
            });
            //User.findOne({name:uname},function(err,doc){   //通过此model以用户名的条件 查询数据库中的匹配信息
            //    if(err){ 										//错误就返回给原post处（login.html) 状态码为500的错误
            //        res.send(500);
            //        console.log(err);
            //        }else{ 									//信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
            //            req.session.user_info = doc;
            //            res.send(200);
            //        }
            //});
        }
    });
});

module.exports = router;