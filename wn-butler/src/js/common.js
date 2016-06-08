/**
 * Created by panjunlin on 2016/5/24.
 */
//loading效果
function loading(){
    var loadingBox="<div class='loadingBox'>" +
        "<img src='../src/img/loading.gif'>"+
        "</div></div>";
    $("body").append(loadingBox);
}
function removeloading(){
    $(".loadingBox").remove();
}

var backurl;//公共返回、跳转连接
function tiaozhuan(){
    window.location.href = backurl;
}
