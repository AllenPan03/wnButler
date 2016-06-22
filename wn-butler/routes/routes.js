/**
 * Created by panjunlin on 2016/6/7.
 */
var path = require('path');
var signature = require('../signature');
var config = require('../config/config')();
var createSignature = signature.getSignature(config);

module.exports = function(app) {
      app.post('/echo', getSignature);
    //app.get('/echo', fun);
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
