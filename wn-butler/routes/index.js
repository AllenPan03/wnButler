var express = require('express');
var router = express.Router();
var app = express();
/* GET index page. */
router.get('/', function(req, res,next) {
 // var User = global.dbHandel.getModel('user_info');
 // var aaa = User('name');
  //var username = User.name;
 // console.log(aaa);
  //res.locals.user_info = req.session.user_info;
  //next();
  //User.find({},{},function(e,docs){
  //  res.render('index', {
  //    "userlist" : docs
  //  });
  //});
  //res.render('index', { title: username });    // 到达此路径则渲染index文件，并传出title值供 index.html使用

});


module.exports = router;
