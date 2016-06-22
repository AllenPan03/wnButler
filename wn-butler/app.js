/**
 * Created by panjunlin on 2016/5/17.
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var fs = require('fs');
var routes = require('./routes/routes');
//var template = require('art-template');//此处基本无用
var config = require('./config/config')();
var wechatMenu = require('./wechatMenu');
var OAuth  = require('./routes/weixin');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var session = require('express-session');
var message = require('./message');
var route = require('./routes/index');
//console.log(config);

global.dbHandel = require('./database/dbHandel');
global.db = mongoose.connect("mongodb://localhost:27017/butler");
var app = express();
app.use(session({
    secret: 'secret',
    cookie:{
        maxAge: 1000*60*30
    }
}));
// view engine setup
app.set('views', path.join(__dirname, 'src/view'));
app.engine("html",require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
//app.set("view engine","ejs");
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src')));

app.use(function(req,res,next){
    res.locals.user_info = req.session.user_info;  // 从session 获取 user对象
    var err = req.session.error;    //获取错误信息
    delete req.session.error;
    res.locals.message = "";   // 展示的信息 message
    if(err){
        res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
    }
    next();   //中间件传递
});

app.use('/', route);  // 即为为路径 / 设置路由
//app.use('/users', users); // 即为为路径 /users 设置路由
//app.use('/login',require('./routes/login')); // 即为为路径 /login 设置路由
//app.use('/register',routes); // 即为为路径 /register 设置路由
//app.use('/home',routes); // 即为为路径 /home 设置路由
//app.use("/logout",routes); // 即为为路径 /logout 设置路由

var file = fs.readdirSync('./routes');
for(var i in file){
    var name = file[i].replace('.js','');
    app.use('/'+name,require('./routes/' +name));
}
message(app);
routes(app);
OAuth(app);
//微信将很多事件推送到此接口上
app.get('/echo', function(req, res, next) {
// 微信得到返回后会通过你的认证
    var query = req.query;
    var echostr = query.echostr;
    res.send(echostr);
    console.log(echostr);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
//http.createServer(app).listen(app.get('port'), function() {
//    console.log("Express server listening on port " + app.get('port'));
//});

module.exports = app;