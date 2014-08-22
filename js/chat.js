function singleChat(acc, to) {
    // var to = [{"p0o":"q:benbenaiyy1314", "p1i":["q:eq-primos"]}]
    wsp.createChatSession(acc, to)
};
function singleChatWithRoute(acc, to) {
    // var to = [{"p0o":"q:benbenaiyy1314", "p1i":["q:eq-primos"]}]
    wsp.createChatSession(acc, to)
};
function groupChat(acc, tos) {
    // var tos = [{"p0o":"q:benbenaiyy1314", "p1i":["q:eq-primos"]},
    // {"p0o":"q:benbenaiyy1314", "p1i":["q:hln1182664505"]},
    // {"p0o":"q:benbenaiyy1314", "p1i":["q:bingyue150"]}]
    wsp.createChatSession(acc, tos)
};
function initTextAreaAndPutDataInDB(chatId) {

    for (var i in db.chat) {
        if (db.chat[i].chatId == chatId) {
            return;
        }
    }
    DB.setChatIds([ chatId ]);
    var index = db.chat.length - 1
    printlnDB();
    divDecorate1()
    echo("对话框")
    echo("<div id='chat" + index + "'>类型:<select id='typz" + index + "'>"
        + "<option value='0'>Text </option><option value='1'>Voice </option><option value='2'>Pic</option><option value='3'>Video</option>"
        + "<option value='4'>Location</option><option value='5'>Contact</option><option value='9'>EmotionPic</option></select><br/>内容:<textarea style='margin: 2px; height: 75px; width: 251px;' id='message" + index
        + "'></textarea><br/><button id='submit_chat"
        + index + "' onclick='sendMessage(" + index
        + ")'>发送</button></div>");
    divDecorate2()
}

function sendMessage(chatArray) {

    var message = document.getElementById("message" + chatArray).value;
    var typz = document.getElementById("typz" + chatArray).value
    if ("" == message) {
        alert("不能为空");
        return;
    }
    debug(db.chat[chatArray].chatId)
    wsp.chatSendMessage(db.chatOtherId, message, parseInt(typz), db.chat[chatArray].chatId);
}

function IfEmptySetDefaultValue(str, defaultValue) {
    if (undefined == str || "" == str) {
        if (undefined != str && "" != str) {
            str = defaultValue
        } else {
            str = "默认值。。擦擦";
        }
    }
    return str;
}

function isGroupChat(chatId) {
    if (chatId.split("~")[1].indexOf(":") == -1) {
        return true;
    }
    return false;

}
function getchatDetailByInfo(r) {
    if (isEmptyJsonObj(r)) {
        return;
    }
    var chatIds = new Array();
    for (var myOtherId in r) {
        for (var i in r[myOtherId]) {
            var chatHistoryInfo = r[myOtherId][i];
            if (!DB.IsContainChatId(chatHistoryInfo.h)
                && isGroupChat(chatHistoryInfo.h)) {
                // 获取群信息
                chatIds.push(chatHistoryInfo.h);

            }
        }
    }
    // alert(chatIds)
    if (chatIds.length > 0) {
        wsp.getChatDetail(chatIds, "获取群资料")
    }
}

function createChatFn(path) {

}
function createChatShow() {
}
function getchatDetailByChatIds(arr) {
    var chatIds = new Array();
    for (var i in arr) {
        if (!DB.IsContainChatId(arr[i]) && isGroupChat(arr[i])) {
            chatIds.push(arr[i])
        }
    }
    if (chatIds.length > 0) {
        wsp.getChatDetail(chatIds, "获取多个资料");
    }

}
// --获取群资料
function getchatDetailByChatId(chatId) {
    if (!DB.IsContainChatId(chatId) && isGroupChat(chatId)) {
        wsp.getChatDetail([ chatId ], "获取单个群资料");
    }
}
// -----操作集

// --创建群 中的 1v1对话

function createChatByGroupFn(chatId, target) {
    if (chatId == "" || undefined == chatId) {
        chatId = getValueById("createChatByGroupShow_input1")
    }
    if (target == "" || undefined == target) {
        target = getValueById("createChatByGroupShow_input2")
    }
    wsp.createChatSession(db.chatOtherId, [ makeSessionPath([ db.chatOtherId,
        chatId, [ target ] ]) ], "通过群创建对话")
}
function createChatByGroupShow() {
    divDecorate1()
    fail("创建以群为基础的对话")
    echo("输入操作的群Id:<input id='createChatByGroupShow_input1' type='text'/>")
    echo("输入操作的人Id:<input id='createChatByGroupShow_input2' type='text'/>")
    echo("<button id='createChatByGroupShow' onclick='createChatByGroupFn()'>创建</button>")
    divDecorate2()
}

// -- 创建对话
function createChatByPathsFn(otherId, path) {
    if (isEmptyOrUndefined(otherId, path)) {

    }
}
function createChatByPathsShow() {

}

// --陌生人申请群
function strangerApplyingChatFn(chatId, str) {
    if (undefined == str || "" == str)
        str = getValueById("strangerApplyingChatShow_cnt");

    if (str == null || "" == str.trim())
        str = "我是奥巴马，群主收了我吧";

    if (chatId == undefined || "" == chatId)
        chatId = getValueById("strangerApplyingChatShow_chatId");

    wsp.applyChatGroup(db.chatOtherId, "request", str, chatId, "屌丝路人申请美乳群");
};

function strangerApplyingChatShow() {
    divDecorate1()
    fail("屌丝路人申请群")
    echo("输入要申请的群Id: <input id='strangerApplyingChatShow_chatId' type='text'/>")
    echo("输入简短的验证信息: <input id='strangerApplyingChatShow_cnt' type='text'/>")
    echo("<button id='strangerApplyingChatBtn' onclick='strangerApplyingChatFn()'>申请</button>")
    divDecorate2()
};

function chatAdminDoHisApplying(sender, replyResult, toId, chatId) {
    wsp.applyChatGroup(sender, "reply", replyResult, chatId, "你申请的群群主回复", toId);
};

function applyChatRequestPop2Admin(pushMsg) {
    var msgSender = pushMsg.r;
    var chatId = pushMsg.h;
    var applyingMsg = pushMsg.m.a.q;
    var divId = "strangerApplyYourGroup";
    var yesArgs = [ db.chatOtherId, "y", msgSender, chatId ];
    var noArgs = [ db.chatOtherId, "n", msgSender, chatId ];

    var btnsHtml = "     <span><button id='applyYes' onclick='chatAdminDoHisApplying("
        + "\"" + db.chatOtherId + "\"," + "\"y\"," + "\"" + msgSender + "\"," + "\"" + chatId + "\""
        + "); closePop("
        + "\""
        + divId
        + "\""
        + ")'  >同意</button></span>    <span><button id='applyNo' onclick='chatAdminDoHisApplying("
        + "\"" + db.chatOtherId + "\"," + "\"n\"," + "\"" + msgSender + "\"," + "\"" + chatId + "\""
        + "); closePop("
        + "\""
        + divId
        + "\""
        + ")' >拒绝</button></span>";

    initPop(divId, "有个B申请你的群", applyingMsg, btnsHtml)
}

function applyChatReplyPop2Applicant(pushMsg) {
    var divId = "adminReplyApplying";
    var replyResult = pushMsg.m.a.p;

    var content = ""
    if (replyResult == "y")
        content = "同意";
    else
        content = "拒绝";

    var btnsHtml = "<span><button id='applyReply' onclick='closePop(" + "\""
        + divId + "\"" + ")' >知道了</button></span>"

    initPop(divId, "群主回复了你的申请", content, btnsHtml, 400, 200)

}

// --设置自己的自动回复消息
function setSelfChatReplyInfo() {
   var str = getValueById("setSelfChatReplyInfo_msg");
   var onDoms = document.getElementsByName("isAutoReplyOn");
   var on ;
   for(var ii in onDoms){
     if(onDoms[ii].checked){
        on = Number(onDoms[ii].value);
     }
   }
   if(undefined == str || null == str || "" == str)
       str = "我挂了，在罪与赎的边缘徘徊，在善与恶的边缘颤抖，终于随风而逝，有事请烧香"

   wsp.chatAutoReplyDealing("setReply", str, on, db.chatOtherId, "设置自己的自动回复消息");
};

function getSelfChatReplyInfo() {

   wsp.chatAutoReplyDealing("getReply", "", 1, "", "获取自己的自动回复设置");

}

function chatReplyInfoShow() {
   divDecorate1()
   fail("自己的自动回复的设置和查询")
   echo("开启:<input type='radio' name='isAutoReplyOn' value='1'/>")
   echo("关闭:<input type='radio' name='isAutoReplyOn' value='0'/>")
   echo("自动回复的消息:<input id='setSelfChatReplyInfo_msg' type='text'/>")
   echo("<button id='setSelfChatReplyInfoBtn1' onclick='setSelfChatReplyInfo()'>设置</button>")
   echo("<button id='setSelfChatReplyInfoBtn2' onclick='getSelfChatReplyInfo()'>查询</button>")
   divDecorate2()

}

// --更改群名字
function changeChatNameFn(chatId, str) {
    str = IfEmptySetDefaultValue(str, "更改群名字")
    if (chatId == undefined || "" == chatId)
        chatId = getValueById("changeChatNameShow_input");
    wsp.chatOptionSetting(db.chatOtherId, "name", str, chatId, "更改群名称");
};

function changeChatNameShow() {
    divDecorate1()
    fail("更改群名字")
    echo("输入操作的群Id:<input id='changeChatNameShow_input' type='text'/>")
    echo("<button id='changeChatNameShow' onclick='changeChatNameFn()'>更改</button>")
    divDecorate2()
};
// --更改群标签
function changeChatTagsFn(chatId, tags) {
    if (chatId == undefined || "" == chatId)
        chatId = getValueById("changeChatTagsShow_input1");
    if ("" == tags || tags == undefined) {
        tags = getValueById("changeChatTagsShow_input2")
    }
    wsp.chatUpdateTags(db.chatOtherId, chatId, tags.split(","), "更改群标签");
};

function changeChatTagsShow() {
    divDecorate1()
    fail("更新群标签")
    echo("输入操作的群Id<input id='changeChatTagsShow_input1' type='text'/>")
    echo("输入更改的标签:<input id='changeChatTagsShow_input2' type='text'/>")
    echo("<button id='changeChatTagsShow' onclick='changeChatTagsFn()'>更新</button>")
    divDecorate2()
};

// 更改群的群分类
function changeGroupCategoryFn(chatId, str) {
    if (undefined == str || "" == str) {
        str = getValueById("changeGroupCategoryShow_category")
    }

    str = IfEmptySetDefaultValue(str, "")
    if (chatId == undefined || "" == chatId)
        chatId = getValueById("changeGroupCategoryShow_chatId");
    wsp.chatOptionSetting(db.chatOtherId, "category", str, chatId, "更改群的分类");
};

function changeGroupCategoryShow() {
    divDecorate1()
    fail("更改群的分类")
    echo("输入要更改的群的Id:<input id='changeGroupCategoryShow_chatId' type='text'/>")
    echo("输入要更改的分类Id:<input id='changeGroupCategoryShow_category' type='text'/>")
    echo("<button id='changeGroupCategoryBtn' onclick='changeGroupCategoryFn()'>更改</button>")
    divDecorate2()
};

// 更改群公开私密属性
function changeGroupPrivacyFn(chatId, str) {
    if (undefined == str || "" == str) {
        str = getValueById("changeGroupPrivacyShow_public")
    }

    str = IfEmptySetDefaultValue(str, "0")
    var intValue = Number(str)
    if (chatId == undefined || "" == chatId)
        chatId = getValueById("changeGroupPrivacyShow_chatId");
    wsp.chatMinorOptionSetting(db.chatOtherId, "privacy", intValue, chatId,
        "更改群公开私密属性");
};

function changeGroupPrivacyShow() {
    divDecorate1()
    fail("更改群公开私密属性")
    echo("输入要更改的群Id:<input id='changeGroupPrivacyShow_chatId' type='text'/>")
    echo("输入要更改的属性:<input id='changeGroupPrivacyShow_public' type='text'/><font color='red' size='2px'>公开 1/私密 0</font>")
    echo("<button id='changeGroupPrivacyBtn' onclick='changeGroupPrivacyFn()'>更改</button>")
    divDecorate2()

};

// 更改群的申请邀请制
function changeGroupApplyingFn(chatId, str) {
    if (undefined == str || "" == str) {
        str = getValueById("changeGroupApplyingShow_applying")
    }

    str = IfEmptySetDefaultValue(str, "0")
    var intValue = Number(str)
    if (chatId == undefined || "" == chatId)
        chatId = getValueById("changeGroupApplyingShow_chatId");
    wsp.chatMinorOptionSetting(db.chatOtherId, "appliable", intValue, chatId,
        "更改群申请邀请制");
};

function changeGroupApplyingShow() {
    divDecorate1()
    fail("更改群申请/邀请制")
    echo("输入要更改的群Id:<input id='changeGroupApplyingShow_chatId' type='text'/>")
    echo("输入要更改的属性:<input id='changeGroupApplyingShow_applying' type='text'/><font color='red' size='2px'>申请 1/邀请 0</font>")
    echo("<button id='changeGroupApplyingBtn' onclick='changeGroupApplyingFn()'>更改</button>")
    divDecorate2()
};

// 更改群的地理位置
function changeGroupLocationFn() {
    var chatId = getValueById("changeGroupLocationShow_chatId");

    var nation = getValueById("changeGroupLocationShow_nation")
    var province = getValueById("changeGroupLocationShow_province")
    var city = getValueById("changeGroupLocationShow_city")
    var longitude = getValueById("changeGroupLocationShow_longi").trim();
    var latitude = getValueById("changeGroupLocationShow_lati").trim();
    if ("" == nation.trim())
        nation = null
    if ("" == province.trim())
        province = null
    if ("" == city.trim())
        city = null

    wsp.chatLocationUpdating(db.chatOtherId, nation, province, city, longitude, latitude, chatId,
        "更改群的地理位置");

};

function changeGroupLocationShow() {
    divDecorate1()
    fail("更改群的地理位置")
    echo("输入要更改的群Id:<input id='changeGroupLocationShow_chatId' type='text'/>")
    echo("国家:<input id='changeGroupLocationShow_nation' type='text'/>")
    echo("省份:<input id='changeGroupLocationShow_province' type='text'/>")
    echo("城市:<input id='changeGroupLocationShow_city' type='text'/>")
    echo("经度:<input id='changeGroupLocationShow_longi' type='text'/>")
    echo("纬度:<input id='changeGroupLocationShow_lati' type='text'/>")
    echo("<button id='changeGroupLocationBtn' onclick='changeGroupLocationFn()'>更改</button>")
    divDecorate2()
};

function updateGroupNicknameFn() {

    var action = getValueById("updateGroupNicknameShow_input1");
    var chatId = getValueById("updateGroupNicknameShow_input2")
    var from = getValueById("updateGroupNicknameShow_input3")
    var targetUid = getValueById("updateGroupNicknameShow_input4");
    var nickname = getValueById("updateGroupNicknameShow_input5")

    wsp.chatGroupNickname(from, chatId, action, nickname, "设置群昵称", targetUid)
}

function updateGroupNicknameShow() {
    divDecorate1()
    fail("设置群昵称")
    echo("操作<select id='updateGroupNicknameShow_input1'>"
        + "<option value='set'>set/update</option>"
        + "<option value='rmv'>remove</option>" + "</select>")
    echo("输入操作的群Id:<input id='updateGroupNicknameShow_input2' type='text'/>")
    echo("输入操作的人Id:<input id='updateGroupNicknameShow_input3' type='text'/>")
    echo("输入目标的Id:<input id='updateGroupNicknameShow_input4' type='text'/>(为空则修改操作人自己)")
    echo("群昵称:<input id='updateGroupNicknameShow_input5' type='text'/>")
    echo("<button id='updateGroupNicknameShow' onclick='updateGroupNicknameFn()'>更改</button>")
    divDecorate2()
}

// --更改群公告
function changeGroupNoticeFn(chatId, str) {
    str = IfEmptySetDefaultValue(str, "更改群公告")
    if (chatId == undefined || "" == chatId)
        chatId = getValueById("changeGroupNoticeShow_input");
    wsp.chatOptionSetting(db.chatOtherId, "notice", str, chatId, "更新群公告");
}
function changeGroupNoticeShow() {
    divDecorate1()
    fail("更新群公告")
    echo("输入操作的群Id:<input id='changeGroupNoticeShow_input' type='text'/>")
    echo("<button id='changeGroupNoticeShow' onclick='changeGroupNoticeFn()'>更新</button>")
    divDecorate2()
};

// --群头像
function changeHeadFn(chatId, str) {
    str = IfEmptySetDefaultValue(str, "www.picchang.com/更新群头像")
    if (chatId == undefined || "" == chatId)
        chatId = getValueById("changeHeadShow_input");
    wsp.chatOptionSetting(db.chatOtherId, "head", str, chatId, "更新群头像");
};

function changeHeadShow() {
    divDecorate1()
    fail("更新群头像")
    echo("输入操作的群Id:<input id='changeHeadShow_input' type='text'/>")
    echo("<button id='changHeadShow' onclick='changeHeadFn()'>更新</button>")
    divDecorate2()
};
// --踢人
function kickMemberFn(chatId, otherId) {
    if (chatId == undefined || "" == chatId)
        chatId = getValueById("kickMemberShow_input1");
    if (otherId == undefined || "" == otherId)
        otherId = getValueById("kickMemberShow_input2");
    wsp.chatMemManage("remove", db.chatOtherId, otherId, chatId, "踢人");
};

function kickMemberShow() {
    divDecorate1()
    fail("踢人")
    echo("输入操作的群Id:<input id='kickMemberShow_input1' type='text'/>")
    echo("输入操作的人Id:<input id='kickMemberShow_input2' type='text'/>")
    echo("<button id='kickMemberShow' onclick='kickMemberFn()'>踢出</button>")
    divDecorate2()
};
// --群主转移
function changeGroupAdminFn(chatId, otherId) {
    if (chatId == undefined || "" == chatId)
        chatId = getValueById("changeGroupAdminShow_input1");
    if (otherId == undefined || "" == otherId)
        otherId = getValueById("changeGroupAdminShow_input2");
    wsp.chatMemManage("assign", db.chatOtherId, otherId, chatId, "群主转移");
}
function changeGroupAdminShow() {
    divDecorate1()
    fail("群主转移")
    echo("输入操作的群Id:<input id='changeGroupAdminShow_input1' type='text'/>")
    echo("输入操作的人Id:<input id='changeGroupAdminShow_input2' type='text'/>")
    echo("<button id='changeGroupAdminShow' onclick='changeGroupAdminFn()'>转让</button>")
    divDecorate2()
}
// --群成员权限操作
// function GroupMemberShowFn(){
// var action = getValueById("GroupMemberShow_1");
// var chatId = getValueById("GroupMemberShow_input2");

// var targetOrPath = getValueById("GroupMemberShow_input3");
// if(action == "add"){
// wsp.chatMemManage(action,db.chatOtherId,[path1_5],chatId,"群成员权限操作:"+action);
// }else{
// wsp.chatMemManage(action,db.chatOtherId,targetOrPath,chatId,"群成员权限操作:"+action);
// }

// path[path.length-1] = [path[path.length-1]];

// }
// --添加群成员
function GroupAddMemberFn(chatId, path) {
    var divId = "GroupAddMemberShow"
    if (chatId == undefined || "" == chatId)
        chatId = getValueById(divId + "_3");

    wsp.chatMemManage("add", db.chatOtherId, [ makeViewPath(getValueById(divId
        + "_1"), getValueById(divId + "_2")) ], chatId, {
        auto: false,
        m: "添加群成员"
    });

}
function GroupAddMemberShow() {
    divDecorate1()
    fail("添加群用户")
    var divId = "GroupAddMemberShow"
    pathView(divId)
    echo("输入操作的群Id:<input id='GroupAddMemberShow_3' type='text'/>");
    echo("<button id='GroupAddMemberShow' onclick='GroupAddMemberFn()'>添加</button>")
    divDecorate2()
}
// --群退出
function GroupExitFn(chatId) {
    if (chatId == undefined || "" == chatId)
        chatId = getValueById("GroupExitShow_input1");
    // var target =document.getElementById("GroupExitShow_input2")//
    // getValueById("GroupExitShow_input2");

    wsp.chatMemManage("leave", db.chatOtherId, "", chatId, "退出群");
}
function GroupExitShow() {
    divDecorate1()
    fail("退群")
    echo("输入操作的群Id:<input id='GroupExitShow_input1' type='text'/>");
    // echo("请输入退出的群otherId:<input id='GroupExitShow_input2' type='text'/>");
    echo("<button id='GroupExitShow' onclick='GroupExitFn()'>确定</button>")
    divDecorate2()
}
// --群屏蔽otherId
function GroupShieldFn(chatId) {
    if (chatId == undefined || "" == chatId)
        chatId = getValueById("GroupShieldShow_input1");
    // var target =
    // document.getElementById("GroupExitShow_input2");//getValueById("GroupExitShow_input2");

    wsp.chatMemManage("shield", db.chatOtherId, "", chatId, "屏蔽群");
}

function GroupShieldShow() {
    divDecorate1()
    fail("屏蔽群")
    echo("请输入群chatId:<input id='GroupShieldShow_input1' type='text'/>");
    // echo("请输入要屏蔽的otherId:<input id='GroupShieldShow_input2' type='text'/>");
    echo("<button id='GroupShieldShow' onclick='GroupShieldFn()'>确定</button>")
    divDecorate2()
}

// --回话授权otherId
function ChatAuthorizeFn(chatId) {
    if (chatId == undefined || "" == chatId)
        chatId = getValueById("ChatAuthorizeShow_input1");
    // var target =
    // document.getElementById("GroupExitShow_input2");//getValueById("GroupExitShow_input2");

    wsp.chatMemManage("authorize", db.chatOtherId, "", chatId, "授权会话");
}
function ChatAuthorizeShow() {
    divDecorate1()
    fail("授权会话")
    echo("输入操作的群Id:<input id='ChatAuthorizeShow_input1' type='text'/>");
    // echo("请输入要屏蔽的otherId:<input id='GroupShieldShow_input2' type='text'/>");
    echo("<button id='ChatAuthorizeShow' onclick='ChatAuthorizeFn()'>授权</button>")
    divDecorate2()
}

// -- 群解除屏蔽
function GroupUnShieldFn(chatId) {
    if (chatId == undefined || "" == chatId)
        chatId = getValueById("GroupUnShieldShow_input1");
    // var target =
    // document.getElementById("GroupExitShow_input2");//getValueById("GroupExitShow_input2");

    wsp.chatMemManage("unShield", db.chatOtherId, "", chatId, "取消屏蔽群");
}

function GroupUnShieldShow() {
    divDecorate1()
    fail("取消屏蔽群")
    echo("输入操作的群Id:<input id='GroupUnShieldShow_input1' type='text'/>");
    // echo("请输入要屏蔽的otherId:<input id='GroupUnShieldShow_input2'
    // type='text'/>");
    echo("<button id='GroupUnShieldShow' onclick='GroupUnShieldFn()'>取消</button>")
    divDecorate2()
}

/*
 * function GroupMemberShow(){ echo("群成员权限操作"+"<select
 * id='GroupMemberShow_1'>"+ "<option value='shield'>屏蔽</option>"+ "<option
 * value='leave'>退群</option>"+ "<option value='add'>拉人</option>"+ "</select>");
 * echo("chatId:<input id='GroupMemberShow_input2' type='text'/>");
 * echo("对象的otherId或路径数组，用逗号隔开:<input id='GroupMemberShow_input3'
 * type='text'/>"); echo("<button id='GroupMemberShow'
 * onclick='GroupMemberShowFn()'>群成员操作</button>") //GroupMemberShowFn(); }
 */
// --获取群成员资料
function getGroupMemberMsgFn(chatId, target) {
    if ("" == chatId || undefined == chatId) {
        chatId = getValueById("getGroupMemeberMsgShow_input1");
    }
    ;
    if ("" == target || undefined == target) {
        var target = getValueById("getGroupMemeberMsgShow_input2");
        target = strToArr(target);
    }
    ;
    wsp.queryUserInfoList(makeSessionPath([ db.chatOtherId, chatId, target ]),
        "self", "通过群查看好友资料")
}

function getGroupMemeberMsgShow() {
    divDecorate1()
    fail("通过群查看好友资料(已经废弃)")
    echo("输入操作的群Id:<input type='text' id='getGroupMemeberMsgShow_input1'/>")
    echo("输入操作的人Id:<input type='text' id='getGroupMemeberMsgShow_input2'/>")
    echo("<button id='getGroupMemeberMsgShow' onclick='getGroupMemberMsgFn()'>查看</button>")
    divDecorate2()
}
// --获取路由日志 //过期
function getRouteLogFn(userOtherIds) {
    if (undefined == userOtherIds || "" == userOtherIds) {
        userOtherIds = db.chatOtherId;
    }
    wsp.getRouteLog(userOtherIds.split(','), "获取路由日志");
}
function getRouteLogShow() {
    echo("请输入群otherIds 用逗号隔开：<input type='text' id='getRouteLogShow_input1'/>")
    echo("<button id='getRouteLogShow' onclick='getRouteLogFn()'>获取路由日志</button>")

}

// -- 批量发送信息 num 次数
function chatBatchFn(num, str, chatId) {
    if (undefined == chatId || "" == chatId) {
        chatId = getValueById("chatBatchShow_input1");
    }
    if (undefined == num || "" == num) {
        num = getValueById("chatBatchShow_input2");
    }
    if (undefined == str || "" == str) {
        str = getValueById("chatBatchShow_input3");
    }
    chatBatch = true;
    var arr = [];

    function getA(i) {
        if (undefined != arr) {
            arr.shift()(i++)
            setTimeout(getA, 300, i)
        }
    }

    function sendBatch(i) {
        wsp.chatSendMessage(db.chatOtherId, str + "   次数:" + i + "   日期:"
            + (new Date().format("hh:mm:ss.S")), 0, chatId, "洪水")
    }

    for (var i = 0; i < num; i++) {
        arr.push(sendBatch)
    }
    getA(0)

}
function chatBatchShow() {
    divDecorate1()
    fail("批量发送信息")
    echo("发送的群Id:<input type='text' id='chatBatchShow_input1'/>")
    echo("发送的次数:<input type='text' id='chatBatchShow_input2'/>")
    echo("发送的内容:<input type='text' id='chatBatchShow_input3' value='批量洪水来啦'/>")

    echo("<button id='chatBatchShow' onclick='chatBatchFn()'>发送</button>")
    divDecorate2()
}

// --获取群资料
function getChatDetailFn(chatId) {
    if (undefined == chatId || "" == chatId) {
        chatId = getValueById("getChatDetailShow_input1");
    }
    // for(var i = 0 ; i<500; i++)
    // wsp.getChatDetail(chatId.split(","),"获取群资料 Num: "+ i );
    wsp.getChatDetail(chatId.split(","), "获取群资料");
}
function getChatDetailShow() {
    divDecorate1()
    fail("获取群资料")
    echo("输入操作的群Id(多个,隔开):<input type='text' id='getChatDetailShow_input1'/>")
    echo("<button id='getChatDetailShow' onclick='getChatDetailFn()'>获取</button>")
    divDecorate2()
}

// --获取群成员资料，通过friends分支

function getChatMemberInfoFn(chatId) {
    if (undefined == chatId || "" == chatId) {
        chatId = getValueById("getChatMemberInfoShow_input1");
    }
    wsp.queryUserInfoList(
        makeSessionPath([ db.chatOtherId, chatId.split(",") ]), "friends",
        "获取群成员资料");
}
function getChatMemberInfoShow() {
    echo("请输入群chatId ，可以是数组：<input type='text' id='getChatMemberInfoShow_input1'/>")
    echo("<button id='getChatMemberInfoShow' onclick='getChatMemberInfoFn()'>获取群资料成员资料</button>")

}
// --获取路由otherId平台信息 过期

function getRouteInfosFn(chatIds) {
    if (undefined == chatIds || "" == chatIds) {
        chatIds = getValueById("getRouteInfosShow_input1");
    }
    wsp.getRouteInfos(strToArray(chatIds), "获取路由otherId平台信息");
}
function getRouteInfosShow() {
    echo("请输入群chatId ，可以是数组：<input type='text' id='getRouteInfosShow_input1'/>")
    echo("<button id='getRouteInfosShow' onclick='getRouteInfosFn()'>获取chatIdRouteInfos</button>")

}

// -- 向 chatId发送消息
function sendChatMsgFn(chatId, otherId, content) {
    if (undefined == chatId || "" == chatId) {
        chatId = getValueById("sendChatMsgShow_input1");
    }
    if (undefined == otherId || "" == otherId) {
        otherId = getValueById("sendChatMsgShow_input2");
    }
    if (undefined == content || "" == content) {
        content = getValueById("sendChatMsgShow_input3");
    }
    debug(chatId)
    wsp.chatSendMessage(otherId, content, 0, chatId, {
        m: "发送信息",
        auto: false
    })
}
function sendChatMsgShow() {
    divDecorate1()
    fail("通过Id发送消息")
    echo("输入操作的群Id:<input type='text' id='sendChatMsgShow_input1'/>")
    echo("输入操作的人Id:<input type='text' id='sendChatMsgShow_input2'/>")
    echo("输入发送的内容:<input type='text' id='sendChatMsgShow_input3'/>")
    echo("<button id='sendChatMsgShow' onclick='sendChatMsgFn()'>发送</button>")
    divDecorate2()
}

// --消息解析

function analyChatInfo(info) {
    for (var i in info) {
        if (info[i].m.t < 7) {
            ok("收到对话消息")
            getchatDetailByChatId(info[i].h);
            initTextAreaAndPutDataInDB(info[i].h);
            // FIXME: 获取群聊天信息

            debug("test:" + info[i].h)
        } else if (info[i].m.t == 85) {
            ok("收到了某个路人B来申请你的群");
            // 弹窗
            alert("有人来敲门");
            applyChatRequestPop2Admin(info[i]);

        } else if (info[i].m.t == 86) {
            ok("收到了你申请群的群主回复");
            applyChatReplyPop2Applicant(info[i]);

        } else if (info[i].m.t == 1001) {
            ok("收到了有人把你加入通讯录的通知");
            debug("info:" + JSON.stringify(info[i]));
        } else {
            ok("收到了系统消息")
            switch (info[i].m.t) {
                case 70:
                    ok("路径不连通的好友");
                    break;
                case 71:
                    debug(info[i].h)
                    if (isGroupChat(info[i].h)) {
                        ok("创建群会话");
                        getchatDetailByChatId(info[i].h);
                    } else {
                        ok("创建了1对1会话");
                    }
                    initTextAreaAndPutDataInDB(info[i].h);
                    break;
                case 72:
                    ok("添加成员");
                    break;
                case 73:
                    ok("删除成员");
                    break;
                case 74:
                    ok("退出群会话");
                    break;
                case 75:
                    ok("群主转移");
                    break;
                case 76:
                    ok("修改群名称");
                    break;
                case 77:
                    ok("修改群头像");
                    break;
                case 78:
                    ok("修改群公告");
                    break;
                case 79:
                    ok("屏蔽了该群");
                    break;
                case 80:
                    ok("更新群标签");
                    break;
                case 81:
                    ok("更新群分类");
                    break;
                case 82:
                    ok("更新群私密公开属性");
                    break;
                case 83:
                    ok("在群公开前提下切换群的申请/邀请机制");
                    break;
                case 84:
                    ok("更新群的地理位置");
                    break;
                case 700:
                    ok("路由信息");
                    break;
                default:
                    fail("接收到无法解析的系统消息");
            }
        }
    }
}

// --初始化群主操作窗口
var initGroupAdminShow = function () {

}
// --初始化一般群成员的操作窗口
var initGroupMemberShow = function () {

}
// --关掉群主操作的窗口

var closeGroupAdminShow = function () {

}
var initChatSession = function (num) {
    redFail("添加信任联系人")
    addTrustContactShow();
    redFail("创建会话相关")
    createChatByGroupShow();
    redFail("发送消息相关")
    chatBatchShow();
    sendChatMsgShow();
    redFail("群信息相关")
    changeGroupCategoryShow();
    changeGroupPrivacyShow();
    changeGroupApplyingShow();
    changeGroupLocationShow();
    redFail("群成员相关")
    GroupAddMemberShow();
    GroupExitShow();
    GroupShieldShow();
    GroupUnShieldShow();
    ChatAuthorizeShow();
    updateGroupNicknameShow();
    redFail("获取资料相关")
    getGroupMemeberMsgShow();
    getChatDetailShow();
    redFail("群申请相关")
    strangerApplyingChatShow();
    redFail("群主操作相关")
    changeChatNameShow();
    changeChatTagsShow();
    changeGroupNoticeShow();
    changeHeadShow();
    kickMemberShow();
    changeGroupAdminShow();
    chatReplyInfoShow();
    // wsp.createChatSession(db.chatOtherId,[path1_2],{m:"创建本人otherId
    // ->一度好友otherId对话",chatMark:1});
    // wsp.createChatSession(db.chatOtherId,[path1_4],{m:"创建本人otherId->二度好友otherId对话",chatMark:2})
    // tip("跨平台对话时，localId随着每次初始化测试环境，可能会变化，所以， 请注意修改config.js 中的path1_3")
    // wsp.createChatSession(db.chatOtherId,[path1_3],{m:"创建本人otherId->跨平台二度好友otherId对话",chatMark:3})
    // wsp.createChatSession(db.chatOtherId,[path1_3_1],{m:"创建本人OtherId->一度好友的另一个otherId",chatMark:31})
    // //for(var i =0; i<5; i++)
    // wsp.createChatSession(db.chatOtherId,[{"p0o":"q:ojstuv","p1i":["q:ceshisanpao"]},{"p0o":"q:ojstuv","p1i":["q:ceshierhuo"]}],{m:"创建111",chatMark:5})
    // wsp.createChatSession(db.chatOtherId,[{"p0o":"q:ojstuv","pt":["q:eq-primos"]},{"p0o":"q:ojstuv","pt":["q:ceshierhuo"]}],{m:"通过信任联系人创建表的点对点会话",chatMark:12})
    // wsp.createChatSession(db.chatOtherId,[{"p0o":"q:ojstuv","pt":["q:eq-primos"]},{"p0o":"q:ojstuv","pt":["q:ceshierhuo"]}],{m:"通过信任联系人创建表的群会话(一个信任一个不信任)",chatMark:12})
    // wsp.createChatSession(db.chatOtherId,[{"p0o":"q:ojstuv","pt":["q:eq-primos"]},{"p0o":"q:ojstuv","pt":["q:ceshisanpao"]}],{m:"通过信任联系人创建表的群会话(都是信任的)",chatMark:12})
    // wsp.createChatSession(db.chatOtherId,[{"p0o":"q:ojstuv","p1f":["q:eq-primos"]},{"p0o":"q:ojstuv","p1f":["q:ceshierhuo"]}],{m:"通过信任联系人创建表的群会话",chatMark:12})
    wsp.createChatSession(db.chatOtherId, [
        {
            "p0o": "s:3226887912",
            "p1f": ["i:1404796754"]//["q:eq-primos", "s:3954926628" ]
        }
    ], {
        m: "通过信任联系人创建表的群会话",
        chatMark: 12
    })
    // wsp.createChatSession(db.chatOtherId,[path1_2,{"p0o":"q:ojstuv","p1f":["q:eq-primos"]},path1_3,path1_5],{m:"创建本人otherId->群聊,加上群主1人",chatMark:4})
    // wsp.createChatSession(db.chatOtherId,[{"p0o":"q:ojstuv","p1f":["q:eq-primos","q:ceshisanpao","q:ojstuv","s:1581692875"]}],{m:"创建群，坑爹群1"})
    // wsp.createChatSession(db.chatOtherId,[{"p0o":"q:ojstuv","p1f":["q:ojstuv"]}],{m:"创建群，坑爹群2"})
    // wsp.createChatSession(db.chatOtherId,[{"p0o":"q:ojstuv","p1f":["s:1581692875"]}],{m:"创建群，坑爹群3"})
    wsp.getChatHistory([ db.chatOtherId ], "抓取历史信息");

}
