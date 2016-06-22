/**
 * Created by user on 2016/6/21.
 */
var express = require('express');
var router = express.Router();
/* GET index page. */
router.get('/', function(req, res,next) {
    res.render('evaluate', { title: "allen" });    // 到达此路径则渲染index文件，并传出title值供 index.html使用
});


module.exports = router;
