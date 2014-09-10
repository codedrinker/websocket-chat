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
    var chatPaneId = "#return-alert"
    var accounttId = $(chatPaneId).attr("accounttId");
    var accountHead = $(chatPaneId).attr("accountHead");
    var msg = $("#sendInput").val()
    $("#return-alert").append(
            "<div class='col-md-12'>" +
            "   <div class='col-md-10 alert alert-info' role='alert'>" + msg + "</div>" +
            "   <div class='col-md-2'>" +
            "       <img src='" + accountHead + "' id='" + accounttId + "' onmouseover='showSocialIcons(this)' " + "onmouseout='hiddenSocialIcons(this)' class='img-circle chatref cur pull-right " + "title='Primos'>" +
            "   </div>" +
            "</div>"
    )
}

function replyMsg(contact) {
    var chatPaneId = "#return-alert"
    var headRef = $(chatPaneId).attr("chat_with_head");
    var id = $(chatPaneId).attr("chat_with_id");
    $(chatPaneId).append(
            "<div class='col-md-12'>" +
            "   <div class='col-md-2'>" +
            "       <img src='" + headRef + "' id='" + id + "' onmouseover='showSocialIcons(this)' " + "onmouseout='hiddenSocialIcons(this)' class='img-circle chatref cur " + "title='Primos'>" +
            "   </div>" +
            "   <div class='col-md-10 alert alert-success' role='alert'>" + contact + "</div>" +
            "</div>"
    )
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

function closeChat() {
    $("#chat_float_pane").addClass("chatopacity")
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


function floatAccountViewer(id, name, head) {
    $("#head_float_pane").prepend("<img  onmouseover='showSocialIcons(this)'  onmouseout='hiddenSocialIcons(this)' title='" + name + "' id='" + id + "' src='" + head + "' class='userref img-circle img-thumbnail cur mag-left'>")
}

function contactsListViewer(id, name, head) {
    if (snsType(id) == TencentWeiboUser)
        head = head + "/180"
    $("#contact_list").prepend("<li id='" + id + "  style='position:relative' sdata-toggle='modal' data-target='#profile_details' onclick='chatWith('" + id + "','" + name + "')' class='list-group-item'>" +
        "<img id='" + id + ":img" + "' src='" + head + "' class='img-circle visref'>" +
        "<img style='margin-top: 19px;margin-left: 0px;position:absolute;left:38px;bottom:10px;' src='http://s3-ap-southeast-1.amazonaws.com/keeeweee.asset/sns/" + snsType(id) + ".png' height='15px' width='15px'>" +
        "&nbsp;&nbsp;" + name + "</li>")
}

function momentsListViewer(user_id, user_name, user_head, moments_id, moments_type, moments_content, moments_time, moments_count, moments_likes, moments_pic) {
    if (moments_type == 1)
        var image = "<a class='pull-left' href='#' id='" + moments_id + "'>" +
            "<img class='media-object img-thumbnail' data-src='holder.js/128x64' alt='128x64'" +
            "src='" + moments_pic + "' style='width: 128px; height: 64px;'>" +
            "</a>"
    else
        image = ""
    var html = "<li class='list-group-item'>" +
        "  <ul class='media-list'>" +
        "        <li class='media'>" +
        "            <a class='pull-left' href='#' id='" + user_id + "'>" +
        "               <img onmouseover='showSocialIcons(this)'  onmouseout='hiddenSocialIcons(this)' class='media-object img-circle visref' id='" + user_id + ":img" + "' src='" + user_head + "'>" +
        "                </a>" +
        "                <div class='media-body'>" +
        "                    <a href='#'><strong> " + user_name + "</strong></a>" +
        "                    <span class='pull-right'>" + (new Date(moments_time)).format("yyyy-MM-dd hh:mm:ss.S") + "</span>" +
        "                </div>" +
        "            </li>" +
        "            <li class='media'>" + image +
        "                   <div class='media-body'>" +
        "                        <p><a href='#' title='查看内容详情' data-toggle='modal'" +
        "                        data-target='#moment_details'>" + moments_content + "</a>" +
        "                        </p>" +
        "                    </div>" +
        "                </li>" +
        "                <li class='media'>" +
        "                    <div class='pull-left'>" +
        "                    " + moments_likes + " <strong>likes</strong> ," + moments_count + " <strong>comments</strong>" +
        "                    </div>" +
        "                    <div class='media-body pull-right'>" +
        "                           <span class='glyphicon glyphicon-heart cur' style='color:grey;' onclick='like(this)'/>&nbsp;" +
        "                           <span class='glyphicon glyphicon-heart' style='color:red; '/>&nbsp;"+
        "                           <span class='glyphicon glyphicon-comment' style='color:grey;'></span>" +
        "                        <a href='#'><img id='" + moments_id + "-like" + "' status='0' class='liicon' src='../image/assets/hearts/0.png' title='赞' onclick='like(this)'></a>&nbsp;&nbsp;" +
        "                            <a href='#'><img id='" + moments_id + "-comment" + "' class='liicon' src='../image/assets/icon_comment_grey.png' title='评论'></a>" +
        "                            </div>" +
        "                        </li>" +
        "                    </ul>" +
        "                </li>"
    $("#moments").append(html);
}


function logout() {
    alert("您的账号在其他地方登陆");
    window.location.href = "login.html";
}

function showSocialIcons(e) {
    var this_id = $(e).attr("id");
    var src1 = $(e).attr("src");
    var src = snsType(this_id) + ".png"
    $(e).attr("src", "../image/social_icons/" + src)
    $(e).attr("src1", src1)
}

function hiddenSocialIcons(e) {
    var src1 = $(e).attr("src1");
    $(e).attr("src", src1)
}
function like(e) {
    var status = parseInt($(e).attr("status"));
    var ns = status ^ 1
    $(e).attr("status", ns);
    $(e).attr("src", "../image/assets/hearts/" + ns + ".png");
}

/**
 * 输入框有输入内容的时候，发送按钮才能点击，否则不能点击
 */
function btnEventFn(value) {
    if (value.trim() != "") {
        $("#sendMsgBtn").attr("disabled", false)
        $("#sendMsgBtn").attr("class", "btn-info btn")
    } else {
        $("#sendMsgBtn").attr("disabled", true)
        $("#sendMsgBtn").attr("class", "btn-default btn")
    }
}

function showChat(e) {
    $("#chat_float_pane").removeClass("chatopacity")
    var chatPaneId = "#return-alert"
    $(chatPaneId).empty();
    var chatWithName = $(e).attr("chat_with_name");
    var chatWithId = $(e).attr("chat_with_id");
    var chatId = $(e).attr("chat_id");
    var chatWithHead = $(e).attr("chat_with_head");
    var accounttId = $(e).attr("chat_account");
    var accountHead = $(e).attr("chat_account_head");
    $("#chat_with_name").text(chatWithName)
    $("#sendInput").focus();
    $(chatPaneId).attr({
        chat_with_id: chatWithId,
        chat_with_name: chatWithName,
        accounttId: accounttId,
        accountHead: accountHead,
        chat_id: chatId,
        chat_with_head: chatWithHead
    });
    localStorage.chatId = chatId
    /*wsp.createChatSession(accounttId, [
     {
     "p0o": accounttId,
     "p1f": [chatWithId]
     }
     ], "点击会话")*/
}

function sendThenClear() {
    var chatPaneId = "#return-alert"
    var accounttId = $(chatPaneId).attr("accounttId");
    var accountHead = $(chatPaneId).attr("accountHead");
    var chatId = $(chatPaneId).attr("chat_id");
    var content = $("#sendInput").val();
    $("#sendInput").focus();
    sendMsg(content)
    wsp.chatSendMessage(accounttId, content, 0, chatId);
    $("#sendMsgBtn").attr("disabled", true);
    $("#sendMsgBtn").attr("class", "btn-default btn");
    $("#sendInput").val("");
}

function keyEvent(e) {
    var key
    if (window.event) // IE
    {
        key = e.keyCode
    }
    else if (e.which) // Netscape/Firefox/Opera
    {
        key = e.which
    }
    log(key)
    log(key == 13)
    if (key == 13)
        sendThenClear();
}