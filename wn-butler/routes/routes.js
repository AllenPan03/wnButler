/**
 * Created by panjunlin on 2016/6/7.
 */
var path = require('path');
var signature = require('../signature');
var config = require('../config/config')();

var createSignature = signature.getSignature(config);

module.exports = function(app) {
    app.post('/allen', getSignature);
    app.get('/allen', fun);
};

function fun(req, res) {
    var u = req.protocol + "://" + req.get('Host') + req.url;
    createSignature(u, function(error, result) {
        console.log(result);
        res.render('../view/test.html', result);
    });
}

function getSignature(req, res) {
    var url = req.body.url;
    console.log("bbb");
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
