/**
 * Created by primos on 14-8-20.
 */

/*function alert_msg(typz, content, msg) {
 $("#chat_pane").append("<div class='alert " + typz + "' role='alert'>" +
 "<strong>" + content + ":</strong><br>" + msg +
 "<button type='button' class='close' data-dismiss='alert'>" +
 "<span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>" +
 "</div>")
 }*/
function alert_msg(typz, content, msg) {
    console.log(content + ":" + msg);
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
    $("#chat_pane").empty();
}