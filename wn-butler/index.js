/**
 * Created by panjunlin on 2016/5/17.
 */

var express = require('express');
var    http = require('http');
var    path = require('path');
var    fs = require('fs');
var routes = require('./routes/routes');
var template = require('art-template');//此处基本无用
var config = require('./config/config')();
var signature = require('./signature');
var wechatMenu = require('./wechatMenu');
//var write = require('../lib/writeFile.js');
//console.log(config);

var app = express();
app.configure(function() {
    app.set('port', process.env.PORT || 8081);

    template.config('base', '');
    template.config('extname', '.html');
    app.engine('.html', template.__express);
    app.set('view engine', 'html');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'src')));
    app.get('/', function (req, res) {
        res.send('Hello World');
    });

});

app.configure('development', function() {
    app.use(express.errorHandler());
});


//view.use(signature.checkSignature(config));
//console.log(signature);

routes(app);

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});

