/**
 * Created by user on 2016/6/12.
 */
// 微信授权和回调
var express = require('express');
var app = express();
var router = express.Router();
var OAuth = require('wechat-oauth');
var fs = require('fs');
var config  = fs.readFileSync('./config/default.json');
if (config) {
    config = JSON.parse(config);
}
var app_id      = config.wx.app_id;
var app_secret  = config.wx.app_secret;
var domain  = config.domain;
var client = new OAuth(app_id, app_secret);
// 主页,主要是负责OAuth认证
function getAuthorizeURL(req, res) {
    var url = client.getAuthorizeURL('http://' + domain + '/callback','','snsapi_userinfo');
    res.redirect(url);
    console.log(url);
}

/**
 * 认证授权后回调函数
 *
 * 根据openid判断是否用户已经存在
 * - 如果是新用户，注册并绑定，然后跳转到手机号验证界面
 * - 如果是老用户，跳转到主页
 */
function ccc(req, res) {
    res.send('Hello aaa');
    console.log('----weixin callback -----')
    var code = req.query.code;
    console.log(code);
    var User = req.model.UserModel;

    client.getAccessToken(code, function (err, result) {
        console.dir(err)
        console.dir(result)
        var accessToken = result.data.access_token;
        var openid = result.data.openid;

        console.log('token=' + accessToken);
        console.log('openid=' + openid);

        User.find_by_openid(openid, function(err, user){
            console.log('微信回调后，User.find_by_openid(openid) 返回的user = ' + user)
            if(err || user == null){
                console.log('user is not exist.')
                client.getUser(openid, function (err, result) {
                    console.log('use weixin api get user: '+ err)
                    console.log(result)
                    var oauth_user = result;

                    var _user = new User(oauth_user);
                    _user.username = oauth_user.nickname;
                    _user.nickname = oauth_user.nickname;

                    _user.save(function(err, user) {
                        if (err) {
                            console.log('User save error ....' + err);
                        } else {
                            console.log('User save sucess ....' + err);
                            req.session.current_user = void 0;
                            res.redirect('/user/' + user._id + '/verify');
                        }
                    });

                });
            }else{
                console.log('根据openid查询，用户已经存在')
                // if phone_number exist,go home page
                if(user.is_valid == true){
                    req.session.current_user = user;
                    res.redirect('/mobile')
                }else{
                    //if phone_number exist,go to user detail page to fill it
                    req.session.current_user = void 0;
                    res.redirect('/users/' + user._id + '/verify');
                }
            }
        });
    });
};
function ddd(req, res) {
    res.send('Hello ppp');
};

module.exports = function(app) {
    router.get('/aaa', getAuthorizeURL);
    router.get('/callback', ccc);
    router.get('/abc', ddd);
};