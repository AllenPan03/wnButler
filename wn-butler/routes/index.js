var express = require('express');
var router = express.Router();
var app = express();
/* GET index page. */
router.get('/', function(req, res,next) {
//    var server = new mongoose.Server('localhost', 27018, {auto_reconnect:true});
//    var db = new mongoose.Db('user_info', server, {safe:true});
//    db.open(function(err, db){
//        if(!err){ //在此处使用mongodb的方法,如：
//            db.collection('name', function (err, collection) {//连接USERS表
//                if (err) { mongoose.close(); return callback(err);//错误，返回 err 信息
//                  } //查找用户名（name键）值为 name 一个文档
//               collection.findOne({
//                   name: name
//                }, function (err, user) {
//                   mongoose.close();
//                if (err) { return callback(err);//失败！返回 err
//                    } callback(null, user);//成功！返回查询的用户信息
//                 });
//        });
//}
//    });
            //var User = global.db('user_info',server, {safe:true});
            // var aaa = User('name');
            //var username = User.name;
            //console.log(User);
            //res.locals.user_info = req.session.user_info;
            //next();
            //  User.open(function (err,db) {
            //      db.collection("names", function (err,collection) {
            //          if(err) throw err;
            //          else{
            //              collection.find({}).toArray(function(err,docs){
            //                  if(err) throw  err;
            //                  else{
            //                      console.log(docs);
            //                      db.close();
            //                  }
            //              });
            //          }
            //      });
            //  });
            res.render('index', { title: "allen" });    // 到达此路径则渲染index文件，并传出title值供 index.html使用


    });


module.exports = router;
