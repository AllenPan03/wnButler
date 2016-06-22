'use strict';

//require('../style.css');

var CommentBox = require('./evaluate');
var React = require('react');

//var data = [
//    {author: "Pete Hunt", text: "This is one comment"},
//    {author: "Jordan Walke", text: "This is *another* comment"}
//];

//var data = require('data.json')
//console.log(data)
    var node = document.createElement('div');
    document.body.appendChild(node);

React.render(
    CommentBox(), node
);