/**
 * Created by primos on 14-8-20.
 */

function alert_msg(typz, content, msg) {
    $("#return-alert").append("<div class='alert " + typz + "' role='alert'>" +
        "<strong>" + content + ":</strong><br>" + msg +
        "<button type='button' class='close' data-dismiss='alert'>" +
        "<span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>" +
        "</div>")
}

function sendMsg(msg) {
    alert_msg("alert-success", "发送", msg)
}

function replyMsg(msg) {
    alert_msg("alert-info", "接收", msg)
}

function warningMsg(msg) {
    alert_msg("alert-warning", "耗时", msg)
}

function infoMsg(msg) {
    alert_msg("alert-warning", "信息", msg)
}

function dangerMsg(msg) {
    alert_msg("alert-danger", "耗时", msg)
}
function clearMsg() {
    $("#return-alert").empty();
}

function appendHtml(id, html) {
    $("#" + id).append(html);
}

function prependHtml(id, html) {
    $("#" + id).prepend(html);
}
function loadHtml(id, templete) {
    $("#" + id).load(templete);
}

/**
 * 追加导航,体现再更多里面
 */
function appendNavigator(id, name) {
    appendHtml("navigator_li_ul", "<li><a href='#" + id + "' role='tab' data-toggle='tab'>" + name + "<span class='badge'>2</span></a></li>")
}
/**
 * 添加导航,体现再普通里面
 */
function addNavigator(id, name) {
    prependHtml("navigator", "<li><a href='#" + id + "' role='tab' data-toggle='tab'>" + name + "<span class='badge'>2</span></a></li>")
}

/**
 * 添加激活状态的导航栏,体现在普通导航里面,但是处于激活状态,有且只有一个
 */
function addActiveNavigator(id, name) {
    prependHtml("navigator", "<li class='active'><a href='#" + id + "' role='tab' data-toggle='tab'>" + name + "<span class='badge'>2</span></a></li>")
}

/**
 * 添加面板,普通面板
 */
function appendPane(id) {
    appendHtml("show_pane", "<div class='panel-group mt tab-pane fade in scrollspy-pane' data-offset='6' data-spy='scroll' id='" + id + "'>")
}
/**
 * 添加面板,激活状态的面板,有且只有一个
 */
function addActivePane(id) {
    prependHtml("show_pane", "<div class='panel-group mt tab-pane fade in active scrollspy-pane' data-offset='6' data-spy='scroll' id='" + id + "'>");
}
