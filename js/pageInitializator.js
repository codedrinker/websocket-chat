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


function layoutInitializator() {
    //设置布局div的高度
    heightFn("message", 0.68);
    heightFn("notifications", 0.68);
    heightFn("contacts", 0.68);
    heightFn("moments", 0.68);
    heightFn("return-alert", 0.658);
    //设置布局div的margin-top
    margin_top("head_float_pane", 0.05);
    margin_top("menu_float_pane", 0.05);
    margin_top("chat_float_pane", 0.05);
}

