/**
 * Created by primos on 14-8-23.
 */


function evalH(pier) {
    var height = $(window).height();
    var h = (parseInt(height) * pier) + "px";
    return h;
}


function heightFn(id, pier) {
    var h = evalH(pier);
    $("#" + id).css("height", h)
}


function margin_top(id, pier) {
    var h = evalH(pier);
    $("#" + id).css("margin-top", h)
}


function backgroundFn() {
    var index = 11
    if (localStorage.localImg) index = localStorage.localImg
    $("body").css("background-image", "url('../image/res/" + index + ".jpg')");
}

/*function pollingForward() {
 var image = $("body").css("background-image")
 var index = (parseInt(image.substring(image.indexOf(".") - 1).substring(0, 1)) + 1) % 16
 log(index)
 $("body").css("background-image", "url('../image/res/bg" + index + ".jpg')");
 }

 function pollingBack() {
 var image = $("body").css("background-image")
 var index = (parseInt(image.substring(image.indexOf(".") - 1).substring(0, 1)) - 1 + 16) % 16
 log(index)
 $("body").css("background-image", "url('../image/res/bg" + index + ".jpg')");
 }*/
function pollingForward() {
    var image = $("body").css("background-image")
    var index = (parseInt(image.substring(image.indexOf(".") - 2).substring(0, 2)) + 1)
    if (index >= 26) index = 11
    log(index)
    localStorage.localImg = index
    $("body").css("background-image", "url('../image/res/" + index + ".jpg')");
}

function pollingBack() {
    var image = $("body").css("background-image")
    var index = ( parseInt(image.substring(image.indexOf(".") - 2).substring(0, 2)) - 1)
    if (index <= 10) index = 25
    log(index)
    localStorage.localImg = index
    $("body").css("background-image", "url('../image/res/" + index + ".jpg')");
}

function polling() {
    if (autoPolling)
        setInterval(function () {
            pollingForward();
        }, 20000);
}

function layoutInitializator() {
    //设置背景图片
    backgroundFn();
    //设置布局div的高度
    heightFn("message", 0.68);
    heightFn("notifications", 0.68);
    heightFn("contacts", 0.68);
    heightFn("moments", 0.68);
    heightFn("return-alert", 0.6745);
    //设置布局div的margin-top
    margin_top("head_float_pane", 0.05);
    margin_top("menu_float_pane", 0.05);
    margin_top("chat_float_pane", 0.05);

    /*  polling();*/
}
function onkeydown() {             //网页内按下回车触发
    if (event.keyCode == 13) {
        document.getElementById("Button").click();
        return false;
    }
}

function settingIniter() {
    wsp.settingOption("chatMsgOption", "on", "chatMsgOption")
}

