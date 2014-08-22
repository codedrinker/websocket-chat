// --绑定账号


/**
 *
 * 以下是重构之前的信息,没有删除,但是大部分已经不再使用
 */

function pathView(divId) {
    echo("路径构造<select id='" + divId + "_1'>"
        + "<option value='list'> 一般路径</option>"
        + "<option value='cross'>不跨平台二度</option>"
        + "<option value='session'>通过群构造</option>"
        + "<option value='trust'>信任路径(p1t)</option>"
        + "<option value='all'>全局路径(p1f)</option>" + "</select>")

    echo("路径(注意格式):<input type='text' id='" + divId + "_2'/>")
}

function listOrCountView(divId) {
    echo("countOrList:<select id='" + divId + "_3'>"
        + "<option value='list'>list</option>"
        + "<option value='count'>count</option>" + "</select>")
}

function friendsOrSelfView(divId) {
    echo("friendsOrSelf:<select id='" + divId + "_3'>"
        + "<option value='friends'>friends</option>"
        + "<option value='self'>self</option>"
        + "<option value='chatMem'>chatMem</option>" + "</select>")
}

function buttonView(divId, content) {
    var onclickName = divId.substring(0, divId.length - 4) + "Fn";
    echo("<button id='" + divId + "' onclick= '" + onclickName + "()'>"
        + content + "</button>")
}

function settingOptionView(divId) {
    echo("5种开关：<select id='"
        + divId
        + "_1'>"
        + "<option value='snsFriendsOption'>平台关系开关---snsFriendsOption</option>"
        + "<option value='snsUserInfoOption'>平台信息开关---snsUserInfoOption</option>"
        + "<option value='localInfoOption'>本站信息开关---localInfoOption</option>"
        + "<option value='accountRSOption'>本站关系开关---accountRSOption</option>"
        + "<option value='chatMsgOption'>对话开关---chatMsgOption</option>"
        + "<option value='sectionOption'>群组开关---sectionOption</option>"
        + "</select>")
}

function openOrCloseView(divId) {
    echo("打开或关闭：<select id='" + divId + "_2'>"
        + "<option value='on'>on</option>"
        + "<option value='off'>off</option>"
        + "<option value='other'>other</option>" + "</select>")
}

function friendOrTrustView(divId) {
    echo("friendOrTrust：<select id='" + divId + "_3'>"
        + "<option value='friends'>friends</option>"
        + "<option value='trust'>trust 信任</option>" + "</select>")
}

function selfInfoView(divId) {
    echo("自己的信息选项：<select id='" + divId + "_1'>"
        + "<option value='accsAllInfo'>accsAllInfo</option>"
        + "<option value='majorAccInfo'>majorAccInfo</option>"
        + "</select>")

}
// function requestTypeView(divId){
// echo("功能选项：<select id='" + divId + "_1'>" + "<option
// value='friendsInvite'>邀请别人加入App</option>" + "<option
// value='friendsRequest'>关注</option>" + "</select>")

// }

/*
 * function autoOrHandView(divId){ echo("friendsOrSelf:<select
 * id='"+divId+"_3'>"+ "<option value=0>手动</option>"+ "<option value=1>自动</option>"+ "</select>") }
 */

// --获取列表OrCount


function syncContactsFn(otherId, contactsInput) {
    if ("" == otherId || otherId == undefined) {
        otherId = getValueById("syncContactsShow_input1");
    }
    if ("" == contactsInput || contactsInput == undefined) {
        contactsInput = getValueById("syncContactsShow_input2");
    }
    wsp.syncContacts(otherId, strToArr(contactsInput), {
        m: "同步手机通讯录"
    })
}
function syncContactsShow() {
    divDecorate1()
    echo("OtherUid：<input id='syncContactsShow_input1' value=''/>")
    echo("MapContacts：<input id='syncContactsShow_input2' value=''/>")
    echo("<button id='inviteinviteFriendsShow' onclick='syncContactsFn()'>同步手机通讯录</button>")
    divDecorate2()
}


function getListOrCountByDbFn(path, listOrCount, isCross) {
    var divId = "getListOrCountByDbShow";
    if (isEmptyOrUndefined(isCross)) {
        isCross = $$(divId + "_1")
    }
    if ("cross" != isCross) {
        if (isEmptyOrUndefined(path, listOrCount)) {
            wsp.queryFriendsByOtherId(makeViewPath($$(divId + "_1"), $$(divId
                + "_2")), $$(divId + "_3"), "获取列表或Count-View")
        } else {
            wsp.queryFriendsByOtherId(path, listOrCount, "获取列表或Count")
        }
    } else {
        if (isEmptyOrUndefined(path, listOrCount)) {
            wsp.indirectFriends(
                makeViewPath($$(divId + "_1"), $$(divId + "_2")), $$(divId
                    + "_3"), "获取列表或Count-View")
        } else {
            wsp.indirectFriends(path, listOrCount, "获取列表或Count")
        }
    }

}

function getListOrCountByDbShow() {
    divDecorate1();
    var divId = "getListOrCountByDbShow";
    pathView(divId);
    listOrCountView(divId);
    buttonView(divId, "获取列表或count")
    divDecorate2()

}

// --获取列表信息+history
function queryFriendHistoryFn(path, friendOrTrust) {
    var divId = "queryFriendHistoryShow";
    if (isEmptyOrUndefined(path, friendOrTrust)) {//
        wsp.queryBindStatusHistory(makeViewPath($$(divId + "_1"), $$(divId
            + "_2")), $$(divId + "_3"), {
            auto: false,
            m: "获取列表信息+history"
        })
    } else {
        fail("do Noting")
    }

}

function queryFriendHistoryShow() {
    divDecorate1();
    var divId = "queryFriendHistoryShow";
    pathView(divId);
    friendOrTrustView(divId);
    buttonView(divId, "获取列表信息+history")
    divDecorate2()

}

// -- 更新列表
function updateListOrCountFn(path, listOrCount) {
    var divId = "updateListOrCountShow";

    if (isEmptyOrUndefined(path, listOrCount)) {
        wsp.updateFriendsByOtherId(makeViewPath($$(divId + "_1"), $$(divId
            + "_2")), $$(divId + "_3"), "更新列表或Count-View")
    } else {
        wsp.updateFriendsByOtherId(path, listOrCount, "更新列表或Count")
    }
}

function updateListOrCountShow() {
    var divId = "updateListOrCountShow";
    divDecorate1()
    fail("请注意打开开关")
    tip("通过一般路径更新一度好友列表即可。。 二度 请使用   获取列表或count")
    pathView(divId);
    listOrCountView(divId);
    buttonView(divId, "更新列表或count")
    divDecorate2()
}

// --获取otherId的平台信息
function getInfoSelfOrFriendsByDbFn(path, friendsOrSelf, isCross) {
    var divId = "getInfoSelfOrFriendsByDbShow";
    if (isEmptyOrUndefined(isCross)) {
        isCross = $$(divId + "_1")
    }
    if ("cross" != isCross) {
        if (isEmptyOrUndefined(path, friendsOrSelf)) {
            wsp.queryUserInfoList(makeViewPath($$(divId + "_1"), $$(divId
                + "_2")), $$(divId + "_3"), "获取用户信息SelfOrFriends-View")
        } else {
            wsp.queryUserInfoList(path, friendsOrSelf, "获取用户信息SelfOrFriends")
        }
    } else {
        if (isEmptyOrUndefined(path, friendsOrSelf)) {
            wsp.indirectFriendInfos(makeViewPath($$(divId + "_1"), $$(divId
                + "_2")), $$(divId + "_3"), "获取用户信息SelfOrFriends-View")
        } else {
            wsp.indirectFriendInfos(path, friendsOrSelf, "获取用户信息SelfOrFriends")
        }
    }

}

function getInfoSelfOrFriendsByDbShow() {
    var divId = "getInfoSelfOrFriendsByDbShow";
    divDecorate1()
    pathView(divId);
    friendsOrSelfView(divId);
    buttonView(divId, "获取otherId信息")
    divDecorate2()
}

// -- 获取otherId的本地信息
function getProtectedInfoByOtherIdFn(path, friendsOrSelf) {
    var divId = "getProtectedInfoByOtherIdShow";

    if (isEmptyOrUndefined(path, friendsOrSelf)) {

        wsp.queryLocalUserInfo("Protected", "photos,bg,bio", $$(divId + "_3"),
            makeViewPath($$(divId + "_1"), $$(divId + "_2")),
            "获取otherId的本地信息-View")
    } else {
        wsp.queryLocalUserInfo("Protected", "photos,bg,bio", friendsOrSelf,
            path, "获取otherId的本地信息")
    }

}

function getProtectedInfoByOtherIdShow() {
    var divId = "getProtectedInfoByOtherIdShow";
    divDecorate1()
    pathView(divId);
    friendsOrSelfView(divId);
    buttonView(divId, "获取otherId的本地信息")
    divDecorate2()
}

// --更新用户信息
function updateInfoSelfOrFriendsFn(path, friendsOrSelf) {
    var divId = "updateInfoSelfOrFriendsShow";
    if (isEmptyOrUndefined(path, friendsOrSelf)) {
        wsp.updateUserInfosByOtherId(makeViewPath($$(divId + "_1"), $$(divId
            + "_2")), $$(divId + "_3"), "更新用户信息SelfOrFriends-View")
    } else {
        wsp
            .updateUserInfosByOtherId(path, friendsOrSelf,
            "更新用户信息SelfOrFriends")
    }

}

function updateInfoSelfOrFriendsShow() {
    divDecorate1()
    var divId = "updateInfoSelfOrFriendsShow";
    fail("请注意打开开关")
    tip("用来更新好友列表（一度）。请选择 一般路径。 ")
    pathView(divId);
    friendsOrSelfView(divId);
    buttonView(divId, "更新otherId信息")
    divDecorate2()
}

// --获取本站的帐号关系Info
function getAccountSelfOrFriendsFn(path, friendsOrSelf) {
    var divId = "getAccountSelfOrFriendsShow";

    if (isEmptyOrUndefined(path, friendsOrSelf)) {
        wsp.queryAccountsByOtherId(makeViewPath($$(divId + "_1"), $$(divId
            + "_2")), $$(divId + "_3"), {
            auto: false,
            m: "获取本站的帐号关系Info-View"
        })
    } else {
        wsp.queryAccountsByOtherId(path, friendsOrSelf, {
            auto: false,
            m: "获取本站的帐号关系Info-View"
        })
    }
}

function getAccountSelfOrFriendsShow() {
    var divId = "getAccountSelfOrFriendsShow";
    divDecorate1()
    tip("本站账号关系用来抓取一度好友和自身的账号关系 请使用一般路径   。。不能抓取二度好友的本站关系")
    pathView(divId);
    friendsOrSelfView(divId);
    buttonView(divId, "获取本站的帐号关系Info")
    divDecorate2()
}

// -- 开关
function SettingOptionFn(option, onOrOff) {
    var divId = "SettingOptionShow";
    if (isEmptyOrUndefined(option, onOrOff)) {
        wsp.settingOption($$(divId + "_1"), $$(divId + "_2"), {
            auto: false,
            m: "开关-View"
        })
    } else {
        wsp.settingOption(option, onOrOff, {
            auto: false,
            m: "开关设定"
        })
    }

}

function SettingOptionShow() {
    divDecorate1()
    var divId = "SettingOptionShow";
    settingOptionView(divId);
    openOrCloseView(divId);
    buttonView(divId, "打开或关闭开关")
    divDecorate2()
}

/*
 * //--获取一度好友的列表，不跨平台 function get1FriendsFn(path){
 * if(isEmptyOrUndefined(path)){
 * wsp.indirectFriends(makeViewPath(getValueById("get1FriendsShow_1"),getValueById("get1FriendsShow_2")),"list","获取一度好友的好友列表，不跨平台")
 * }else{ wsp.indirectFriends(makeCrossPath(path),"list","获取一度好友的好友列表，不跨平台") } }
 * function get1FriendsShow(){ // echo("请输入用户otherId：<input
 * id='get1FriendsShow_input1' type='text' />"); // echo("请输入用户好友OtherIds，可以是数组：<input
 * id='get1FriendsShow_input2' type='text' />"); pathView("get1FriendsShow");
 * echo("<button id='get1FriendsShow' onclick=
 * 'get1FriendsFn()'>查询一度好友的好友列表（不跨平台）</button>") } //--获取一度好友的列表，跨平台 function
 * get1CrossFriendsFn(path){ if(isEmptyOrUndefined(path)){
 * wsp.queryFriendsByOtherId(makeViewPath(getValueById("get1CrossFriendsShow_1"),getValueById("get1CrossFriendsShow_2")),"list","获取一度好友的好友列表，不跨平台")
 * }else{ wsp.queryFriendsByOtherId(makeFriendsPath(path),"跨平台查询一度好友列表")
 * }//wsp.indirectFriendInfos(makeCrossPath([myOtherId,friendOtherIds.split(',')]),"self","获取一度好友的好友列表，跨平台") }
 * function get1CrossFriendsShow(){ pathView("get1CrossFriendsShow"); //
 * echo("请输入用户otherId：<input id='get1CrossFriends_input1' type='text' />"); //
 * echo("请输入用户好友OtherIds，可以是数组：<input id='get1CrossFriends_input2' type='text'
 * />"); echo("<button id='get1CrossFriendsShow' onclick=
 * 'get1CrossFriendsFn()'>查询一度好友的好友列表(跨平台)</button>") }
 * 
 * //--获取二度好友的信息，不跨平台 function get1FriendInfoFn(path,selfOrFriends){ // var
 * prePath = getValueById("get1FriendInfoShow_input1") // var lastPath =
 * getValueById("get1FriendInfoShow_input2")
 * if(isEmptyOrUndefined(path,selfOrFriends)){
 * wsp.indirectFriendInfos(makeViewPath(getValueById("get1FriendInfoShow_1"),getValueById("get1FriendInfoShow_2")),getValueById("get1FriendInfoShow_3"),"获取一度好友的好友列表，不跨平台")
 * }else{
 * wsp.indirectFriendInfos(makeFriendsPath(path),selfOrFriends,"获取二度好友信息,不跨平台") } //
 * wsp.indirectFriendInfos(makeCrossPath([prePath,lastPath.split(",")]),"获取二度好友信息,不跨平台") }
 * function get1FriendInfoShow(){ pathView("get1FriendInfoShow");
 * friendsOrSelfView("get1FriendInfoShow"); // echo("请输入前端路径：<input
 * id='get1FriendInfoShow_input1' type='text' />"); // echo("请输入跨平台，可以是数组：<input
 * id='get1FriendInfoShow_input2' type='text' />"); echo("<button
 * id='get1FriendInfoShow' onclick= 'get1FriendInfoFn()'>获取二度好友信息（不跨平台）</button>") }
 * 
 * //-获取二度好友信息，跨平台 function get1CrossFriendInfoFn(){ var prePath =
 * getValueById("get1CrossFriendInfoShow_input1") var lastPath =
 * getValueById("get1CrossFriendInfoShow_input2")
 * //wsp.indirectFriendInfos(makeCrossPath([prePath,lastPath.split(",")]),"获取二度好友信息")
 * //wsp.queryUserInfo } function get1CrossFriendInfoShow(){ echo("请输入前端路径：<input
 * id='get1CrossFriendInfoShow_input1' type='text' />"); echo("请输入跨平台，可以是数组：<input
 * id='get1CrossFriendInfoShow_input2' type='text' />"); echo("<button
 * id='get1CrossFriendInfoShow' onclick= 'get1CrossFriendInfoFn()'>获取二度好友信息（跨平台）</button>") }
 */
// --根据数据库中的内容自动获取二度好友信息(不跨平台)
function get1FriendInfoAutoFn() {
    var userOtherIds = getDBUserOtherIds();
    for (var i in userOtherIds) {
        var friendIds = getFriendIdsByOtherId(userOtherIds[i])
        // debug("self"+userOtherIds[i])
        // debug("friends"+friendIds);

        if (friendIds.length > 0)
            wsp.indirectFriendInfos(
                makeCrossPath([ userOtherIds[i], friendIds ]), "friends",
                "自动初始化二度好友(不跨平台)")
    }
}

function get1FriendInfoAutoShow() {
    divDecorate1()
    echo("<button id='get1FriendInfoAutoShow' onclick= 'get1FriendInfoAutoFn()'>自动初始化2度好友信息（不跨平台）</button>")
    divDecorate2()
}

// --根据数据库中的内容自动获取二度好友信息(跨平台)
function get1CrossFriendInfoAutoFn() {
    var selfLocalId = db.self.localId;
    for (var localId in db.accounts) {
        if (localId != selfLocalId) {
            var friendsOtherIds = getOtherIdsByLocalId(localId)
            debug("localId -friends:" + localId);
            debug("friends- otherIds:" + friendsOtherIds)
            // var myOtherId ;
            if (friendsOtherIds.length > 0) {
                // FIXME: 会发送多余请求，考虑如何去重
                for (var i in friendsOtherIds) {
                    var myOtherId = getUserOtherIdByFriendId(friendsOtherIds[i]);
                    if (myOtherId == undefined)
                        continue;
                    // debug("self"+myOtherId);
                    // debug("friends"+friendsOtherIds[i]);
                    // //wsp.queryUserInfoList(makeFriendsPath([myOtherId,friendsOtherIds[i],localId,friendsOtherIds]),"friends","自动化初始2度好友信息(跨平台)")
                    wsp.queryFriendsByOtherId(makeFriendsPath([ myOtherId,
                            friendsOtherIds[i], localId, friendsOtherIds ]),
                        "list", "自动化初始1度好友列表(跨平台)")
                }

            }
        }
    }
}

// --获取一度更新
function get1CrossFriendInfoAutoShow() {
    divDecorate1()
    echo("<button id='get1CrossFriendInfoAutoShow' onclick= 'get1CrossFriendInfoAutoFn()'>自动初始化2度好友信息（跨平台）</button>")
    divDecorate2()
}

// -- 获取用户自己的隐私信息
function getPrivateInfoFn() {
    var divId = "getPrivateInfoShow"
    wsp.queryLocalUserInfo("Private", "list", "self", {}, {
        auto: false,
        m: "获取用户自己的隐私信息"
    })
}

function getPrivateInfoShow() {
    var divId = "getPrivateInfoShow"
    divDecorate1()
    fail("获取用户自己的隐私信息")
    buttonView(divId, "获取用户自己的隐私信息")
    divDecorate2()
}

// function accountsRequestFn = function(content){

// }

// function accountsRequestShow = function(){
// var divId = "accountsRequestShow"
// requestTypeView()
// echo("otherId：<input type='text' value='' id='"+divId+"_2'/>")
// divDecorate1()
// buttonView(divId,"邀请或者关注")
// divDecorate2()
// }
// --邀请或者请求变为好友
function inviteFriendsFn(otherId, content) {
    if ("" == otherId || otherId == undefined) {
        otherId = getValueById("inviteFriendsShow_input1");
    }
    if ("" == content || content == undefined)
        content = getValueById("inviteFriendsShow_input2")
    wsp.accountInvite(otherId, content, {
        auto: false,
        m: "邀请别人加入App"
    })
}

function inviteFriendsShow() {
    divDecorate1()
    echo("输入要邀请的otherId<input id='inviteFriendsShow_input1' value=''/>")
    echo("输入content<input id='inviteFriendsShow_input2' value=''/>")
    echo("<button id='inviteinviteFriendsShow' onclick='inviteFriendsFn()'>邀请别人加入Connected</button>")
    divDecorate2()
}
// --邀请或者请求变为好友
function qrcodeShow() {
    divDecorate1()
    echo("otherUid<input id='qrcodeShow_input1' value=''/>")
    echo("输入content<input id='qrcodeShow_input2' value=''/>")
    echo("输入qrcode<input id='qrcodeShow_input3' value=''/>")
    echo("<button id='qrcodeShow' onclick='qrcodeFn()'>分享</button>")
    divDecorate2()
}

function snsShareFn(otherId, content) {
    if ("" == otherId || otherId == undefined) {
        otherId = getValueById("snsShareShow_input1");
    }
    wsp.snsShare(otherId, {
        auto: false,
        m: "分享"
    })
}

function snsShareShow() {
    divDecorate1()
    echo("分享的ID<input id='snsShareShow_input1' value=''/>")
    echo("<button id='snsShareShow' onclick='snsShareFn()'>分享</button>")
    divDecorate2()
}

function fullowingFn(otherId) {
    var divId = "fullowingShow"
    if (isEmptyOrUndefined(otherId))
        otherId = $$(divId + "_1")
    wsp.fullowing(otherId, {
        auto: false,
        m: "关注 别人"
    })
}

function fullowingShow() {
    var divId = "fullowingShow"
    divDecorate1()
    echo("输入要关注的otherId<input id='" + divId + "_1' value=''/>")
    buttonView(divId, "关注")
    divDecorate2()
}

// --添加个人相册
function addAlbumFn(url) {
    if ("" == url || url == undefined) {
        url = getValueById("addAlbumShow_input1")
    }
    wsp.updateLocalAlbumInfo("addAlbum", url);

}

function updateLocalInfoFn(action, value) {
    var divId = "updateLocalInfoShow"

    if (isEmptyOrUndefined(action, value)) {
        wsp.updateLocalInfo($$(divId + "_1"), $$(divId + "_2"), {
            auto: false,
            m: "更新本站的信息"
        })
    } else {
        wsp.updateLocalInfo(action, view, {
            auto: false,
            m: "更新本站的信息"
        })
    }
}

function updateLocalInfoShow() {
    divDecorate1()
    var divId = "updateLocalInfoShow"
    fail("更新本站个签、相册、和名单用---")
    tip("更新背景图 黑名单可用，其它过期")
    echo("操作：<br/> <select id='" + divId + "_1'>"
        + "<option value='updateBgUrl'>更新背景图</option>"
        + "<option value='updateIntro'>签名</option>"
        + "<option value='addAlbum'>添加相册</option>"
        + "<option value='delAlbum'>删除相册</option>"
        + "<option value='addBlack'>添加黑名单</option>"
        + "<option value='delBlack'>删除黑名单</option>" + "</select>")
    echo("<input id='" + divId + "_2' type='text' value=''/>")
    buttonView(divId, "本站信息update")
    divDecorate2()
}

function updateUserTagsFn(target, tags) {
    if ("" == target || target == undefined) {
        target = getValueById("updateUserTagsShow_input1")
    }
    if ("" == tags || tags == undefined) {
        tags = getValueById("updateUserTagsShow_input2")
    }
    wsp.updateTags(target, tags.split(","), "添加用户的标签");
}

function updateUserTagsShow() {
    divDecorate1()
    var divId = "updateUserTagsShow"
    fail("应该废弃了的更新用户标签")
    echo("目标ID:<input type='text' id='updateUserTagsShow_input1' value=''/>")
    echo("标签:<input type='text' id='updateUserTagsShow_input2' value=''/>")
    echo("<button id='updateUserTagsShow' onclick='updateUserTagsFn()'>更新</button>")
    divDecorate2()
}

function updateUserGeoPointFn(longitude, latitude) {
    if ("" == longitude || longitude == undefined) {
        longitude = getValueById("updateUserGeoPointShow_input1")
    }
    if ("" == latitude || latitude == undefined) {
        latitude = getValueById("updateUserGeoPointShow_input2")
    }
    wsp.updateLocalUserGeoPoint(longitude.toString(), latitude.toString(), "随时更新自己的地理位置坐标")

}

function updateUserGeoPointShow() {
    divDecorate1();
    fail("更新用户的地理位置坐标经纬度")
    echo("经度（度数）: <input type='text' id='updateUserGeoPointShow_input1' value='116.3541630587947'/>")
    echo("纬度（度数）: <input type='text' id='updateUserGeoPointShow_input2' value='40.18196736480039'/>")
    echo("<button id='updateUserGeoPointShow' onclick='updateUserGeoPointFn()'>更新</button>")
    divDecorate2();
}

function readNotificationByPageFn(limit) {
    if ("" == limit || undefined == limit) {
        limit = Number(getValueById("readNotificationMsg_input"))
    } else {
        limit = Number(limit)
    }
    wsp.readInformMsgByPage((new Date()).getTime(), limit, "不好啦，我要读历史通知啦，你妈贵姓")

}

function readNotificationByPageShow() {
    divDecorate1();
    fail("读取通知列表，分页读")
    echo("每页记录数: <input type='text' id='readNotificationMsg_input' value=''/>")
    echo("<button id='notificationByPageShowBtn' onclick='readNotificationByPageFn()'>读取</button>")
    divDecorate2();
}

function updatePrivacyFn() {
    var accessType = $$("updatePrivacy_name");
    var accessLevel = Number($$("updatePrivacy_value"));
    var otherId = $$("updatePrivacy_otherId");
    wsp.setPrivacy(accessType, accessLevel, otherId, "隐私设置");

}

function readAllPrivacySettingsFn() {
    wsp.initPrivacy("查看所有隐私项");

}

function updatePrivacyShow() {
    divDecorate1();
    fail("更改隐私项")
    echo("隐私项名称：<select id='"
        + "updatePrivacy_name"
        + "'>"
        + "<option value='squareShow'>广场页隐私</option>"
        + "<option value='snsAccountShow'>平台身份隐藏隐私</option>"
        + "<option value='searchShow'>全局搜索隐私</option>"
        + "<option value='snsFriendsShow'>社交好友隐私</option>"
        + "</select>")

    echo("隐私项开或关：<select id='"
        + "updatePrivacy_value"
        + "'>"
        + "<option value='0'>关</option>"
        + "<option value='1'>开</option>"
        + "</select>")
    echo("otherId:<input type='text' id='updatePrivacy_otherId' value=''/>")
    echo("<button id='updatePrivacy_Btn' onclick='updatePrivacyFn()'>更新</button>")
    echo("<button id='readAllPrivacySettings_Btn' onclick='readAllPrivacySettingsFn()'>读取</button>")

    divDecorate2();
}

function updateLocalUserTagsFn(tags) {
    if ("" == tags || tags == undefined) {
        tags = getValueById("updateLocalUserTagsShow_input1")
    }
    wsp.updateLocalUserTags(tags.split(","), "添加用户的标签");
}

function updateLocalUserTagsShow() {
    divDecorate1()
    var divId = "updateLocalUserTagsShow"
    fail("更新用户标签")
    echo("标签:<input type='text' id='updateLocalUserTagsShow_input1' value=''/>")
    echo("<button id='updateLocalUserTagsShow' onclick='updateLocalUserTagsFn()'>更新</button>")
    divDecorate2()
}

function addAlbumShow() {
    divDecorate1()
    echo("输入要添加的个人相册<input type='text' id='addAlbumShow_input1' value=''/>")
    echo("<button id='addAlbumShow' onclick='addAlbumFn()'>添加个人相册</button>")
    divDecorate2()
}

// --删除个人相册
function delAlbumFn(url) {
    if ("" == url || url == undefined) {
        url = getValueById("delAlbumShow_input1")
    }
    wsp.updateLocalUserInfo("delAlbum", url);

}

function delAlbumShow() {
    divDecorate1()
    echo("输入删除个人相册<input type='text' id='delAlbumShow_input1' value=''/>")
    echo("<button id='delAlbumShow' onclick='delAlbumFn()'>删除个人相册</button>")
    divDecorate2()
}

// --更新个性签名
function updateIntroFn(url) {
    if ("" == url || url == undefined) {
        url = getValueById("updateIntroShow_input1")
    }
    wsp.updateLocalUserInfo("updateIntro", url);

}

function updateIntroShow() {
    divDecorate1()
    echo("更新个性签名<input type='text' id='updateIntroShow_input1' value=''/>")
    echo("<button id='updateIntroShow' onclick='updateIntroFn()'>更新个性签名</button>")
    divDecorate2()
}

// --添加黑名单
function addBlackFn(otherId) {
    if ("" == otherId || otherId == undefined) {
        otherId = getValueById("addBlackShow_input1")
    }
    wsp.updateLocalUserInfo("addBlack", otherId, "增加黑名单");

}

function addBlackShow() {
    divDecorate1()
    echo("增加黑名单<input type='text' id='addBlackShow_input1' value=''/>")
    echo("<button id='addBlackShow' onclick='addBlackFn()'>增加黑名单</button>")
    divDecorate2()
}

// --删除黑名单
function delBlackFn(otherId) {
    if ("" == otherId || otherId == undefined) {
        otherId = getValueById("delBlackShow_input1")
    }
    wsp.updateLocalUserInfo("delBlack", otherId, "删除黑名单");

}

function delBlackShow() {
    divDecorate1()
    echo("删除黑名单<input type='text' id='delBlackShow_input1' value=''/>")
    echo("<button id='delBlackShow' onclick='delBlackFn()'>删除黑名单</button>")
    divDecorate2()
}

// --解除绑定
function unbindFn(otherId) {
    if ("" == otherId || otherId == undefined) {
        otherId = getValueById("unbindShow_input1")
    }
    wsp.accountSetting(otherId, "unbind", "解除绑定，otherId为" + otherId);

}

function unbindShow() {
    divDecorate1()
    echo("解除绑定的otherId<input type='text' id='unbindShow_input1' value=''/>")
    echo("<button id='unbindShow' onclick='unbindFn()'>解除绑定</button>")
    divDecorate2()

}

// --更新token

function updateTokenFn(otherId, token) {
    if ("" == otherId || otherId == undefined) {
        otherId = getValueById("updateTokenShow_input1")
    }
    if ("" == token || token == undefined) {
        token = getValueById("updateTokenShow_input2")
        token = strToArr(token)
    }
    wsp.updateToken(otherId, makeToken(token), {
        auto: false,
        m: "更新token"
    });
}

function updateTokenShow() {
    divDecorate1()
    fail("更新过期的token")
    echo("otherId:<input type='text' id='updateTokenShow_input1' value=''/>")
    echo("token  :<input type='text' style='width:120px' id='updateTokenShow_input2' value=''/>")
    echo("<button id='updateTokenShow' onclick='updateTokenFn()'>更新Token</button>")
    divDecorate2()
}

function updateLocalUserInfoFn(firstName, lastName, brithday, gender, location, email, aSign) {
    if ("" == firstName || firstName == undefined) {
        firstName = getValueById("firstName")
    }
    if ("" == lastName || lastName == undefined) {
        lastName = getValueById("lastName")
    }
    if ("" == brithday || brithday == undefined) {
        brithday = getValueById("updateLocalUserInfoShow_input1")
        brithday = strToArr(brithday)
    }
    if ("" == gender || gender == undefined) {
        gender = getValueById("updateLocalUserInfoShow_input2")
    }
    if ("" == location || location == undefined) {
        location = getValueById("updateLocalUserInfoShow_input3")
        location = strToArr(location)
    }
    if ("" == email || email == undefined) {
        email = getValueById("updateLocalUserInfoShow_input4")
    }
    if ("" == aSign || aSign == undefined) {
        aSign = getValueById("updateLocalUserInfoShow_input5")
    }

    wsp.updateLocalUserInfo("updateLocalUserInfo", makeLocalUserInfoParam(
        firstName, lastName, makeTupleIntParam(brithday), gender,
        makeTupleParam(location), email, aSign), {
        auto: false,
        m: "更新LocalUserInfo"
    });
}

function updateLocaluserInfoShow() {
    divDecorate1()
    fail("更新LocalUserInfo")
    echo("firstName:<input type='text' id='firstName' value='Uni'/>")
    echo("lastName:<input type='text' id='lastName' value='Messenger'/>")
    echo("birthday:<input type='text' id='updateLocalUserInfoShow_input1' value='1990,12,27'/>")
    echo("gender  :<input type='text' style='width:120px' id='updateLocalUserInfoShow_input2' value='m'/>")
    echo("location  :<input type='text' style='width:120px' id='updateLocalUserInfoShow_input3' value='zg,bj,sd'/>")
    echo("email  :<input type='text' style='width:120px' id='updateLocalUserInfoShow_input4' value='test@test.com'/>")
    echo("aSign  :<input type='text' style='width:120px' id='updateLocalUserInfoShow_input5' value='不知道，不明了'/>")
    echo("<button id='updateLocaluserInfoShow' onclick='updateLocalUserInfoFn()'>更新LocalUserInfo</button>")
    divDecorate2()
}

// 条件搜索开始
function conditionsSearchFn(ageLowerBound, ageUpperBound, gender, location, nickName, limit, index) {
    if ("" == nickName || nickName == undefined) {
        nickName = getValueById("conditionsSearchShow_input5")
    }
    if ("" == gender || gender == undefined) {
        gender = getValueById("conditionsSearchShow_input3")
    }
    if ("" == ageLowerBound || ageLowerBound == undefined) {
        ageLowerBound = parseInt(getValueById("conditionsSearchShow_input1"))
    }
    if ("" == ageUpperBound || ageUpperBound == undefined) {
        ageUpperBound = parseInt(getValueById("conditionsSearchShow_input2"))
    }
    if ("" == limit || limit == undefined) {
        limit = parseInt(getValueById("conditionsSearchShow_input6"))
    }
    if ("" == index || index == undefined) {
        index = parseInt(getValueById("conditionsSearchShow_input7"))
    }
    if ("" == location || location == undefined) {
        location = getValueById("conditionsSearchShow_input4")
        location = strToArr(location)
    }
    wsp.conditionsSearch(nickName, gender, ageLowerBound, ageUpperBound,
        makeTupleParam(location), limit, index, {
            auto: false,
            m: "条件搜索"
        });
}

function conditionsSearchShow() {
    divDecorate1()
    fail("条件查询")
    echo("年龄段:<input type='text' style='width:40px' id='conditionsSearchShow_input1' value='21'/> - <input type='text'  style='width:40px' id='conditionsSearchShow_input2' value='24'/>")
    echo("性别:<input type='text' style='width:120px' id='conditionsSearchShow_input3' value='m'/>")
    echo("位置  :<input type='text' style='width:120px' id='conditionsSearchShow_input4' value='zg,bj,sd'/>")
    echo("昵称  :<input type='text' style='width:120px' id='conditionsSearchShow_input5' value='王'/>")
    echo("limit:<input type='text' style='width:120px' id='conditionsSearchShow_input6' value='20'/>")
    echo("index:<input type='text' style='width:120px' id='conditionsSearchShow_input7' value='0'/>")
    echo("<button id='conditionsSearchShow' onclick='conditionsSearchFn()'>条件搜索</button>")
    divDecorate2()
}

function conditionsSearchNameFn(nickName, limit, index) {
    if ("" == nickName || nickName == undefined) {
        nickName = getValueById("conditionsSearchNameShow_input1")
    }
    if ("" == limit || limit == undefined) {
        limit = parseInt(getValueById("conditionsSearchNameShow_input2"))
    }
    if ("" == index || index == undefined) {
        index = parseInt(getValueById("conditionsSearchNameShow_input3"))
    }
    wsp.conditionsSearchName(nickName, limit, index, {
        auto: false,
        m: "条件搜索"
    });
}

function conditionsSearchNameShow() {
    divDecorate1()
    fail("条件查询")
    echo("昵称  :<input type='text' style='width:120px' id='conditionsSearchNameShow_input1' value='王'/>")
    echo("limit:<input type='text' style='width:120px' id='conditionsSearchNameShow_input2' value='20'/>")
    echo("index:<input type='text' style='width:120px' id='conditionsSearchNameShow_input3' value='0'/>")
    echo("<button id='conditionsSearchNameShow' onclick='conditionsSearchNameFn()'>条件搜索</button>")
    divDecorate2()
}
// 条件搜索结束

// -- 获取用户自己本站资料
function getLocalInfoFn(path, friendsOrSelf) {
    var divId = "getLocalInfoShow"
    if (isEmptyOrUndefined(path, friendsOrSelf)) {
        wsp.queryLocalUserInfo("LocalInfo", "info", $$(divId + "_3"),
            makeViewPath($$(divId + "_1"), $$(divId + "_2")), {
                auto: false,
                m: "获取用户自己本站资料"
            })
    } else {
        wsp.queryLocalUserInfo("LocalInfo", "info", friendsOrSelf, path, {
            auto: false,
            m: "获取用户自己本站资料"
        })
    }
}

function getLocalInfoShow() {
    var divId = "getLocalInfoShow"
    divDecorate1()
    pathView(divId);
    friendsOrSelfView(divId);
    buttonView(divId, "获取用户自己本站资料")
    divDecorate2()
}

function linkInfotoAccsFn(otherAccs, action) {
    if ("" == otherAccs || otherAccs == undefined) {
        otherAccs = getValueById("linkInfotoAccsShow_input1")
    }
    if ("" == action || action == undefined) {
        action = getValueById("linkInfotoAccsShow_input2")
    }
    wsp.linkInfoToOtherAcc(otherAccs, action, {
        auto: false,
        m: "关联资料到其他账号"
    });
}

function linkInfotoAccsShow() {
    divDecorate1()
    fail("关联资料到其他账号")
    echo("otherAccs:<input type='text' id='linkInfotoAccsShow_input1' value='q:z1251316150'/>")
    echo("linkAction:<select id='linkInfotoAccsShow_input2'>"
        + "<option value='link'>Llink</option>"
        + "<option value='unlink'>UnLink</option>" + "</select>")
    echo("<button id='linkInfotoAccsShow' onclick='linkInfotoAccsFn()'>关联资料到其他账号</button>")
    divDecorate2()
}

// //--Accounts self
// // function tokenAndInfoFn() {
// // wsp.initAccounts("获取token和信息");

// // }

// function tokenAndInfoShow() {
// divDecorate1()
// echo("<button id='tokenAndInfoShow'
// onclick='tokenAndInfoFn()'>获取token和信息</button>")
// divDecorate2()
// }

// --绑定时 的账号筛选
function accountSelectFn(otherIds) {
    if ("" == otherIds || otherIds == undefined) {
        otherIds = getValueById("accountSelectShow_input1")
    }
    wsp.accountSetting(otherIds, "select", {
        auto: false,
        m: "账号选择的，otherIds为" + otherIds
    });

}

function accountSelectShow() {
    divDecorate1()
    echo("账号选择的的otherIds，用逗号隔开：<input type='text' id='accountSelectShow_input1' value=''/>")
    echo("<button id='accountSelectShow' onclick='accountSelectFn()'>账号选择的</button>")
    divDecorate2()

}
function accountSelectFn2(otherIds, oldLocalId) {
    if ("" == otherIds || otherIds == undefined) {
        otherIds = getValueById("accountSelectShow2_input1")
    }
    if ("" == oldLocalId || oldLocalId == undefined) {
        oldLocalId = getValueById("accountSelectShow2_oldLocalId")
    }
    wsp.accountSetting2(otherIds, "select", oldLocalId, {
        auto: false,
        m: "账号选择的，otherIds为" + otherIds
    });

}

function accountSelectShow2() {
    divDecorate1()
    echo("账号选择的的otherIds，用逗号隔开：<input type='text' id='accountSelectShow2_input1' value=''/>")
    echo("老的LocalId：<input type='text' id='accountSelectShow2_oldLocalId' value=''/>")
    echo("<button id='accountSelectShow2' onclick='accountSelectFn2()'>账号选择的2</button>")
    divDecorate2()

}

function initBindPopFn(divId, autoValue, localId) {
    var values = $name("bindIds")
    var temArray = []
    for (var i = 0; i < values.length; i++) {
        if (values[i].checked) {
            temArray.push(values[i].value)
        }
    }

    wsp.accountSelect(temArray.join(","), localId, {
        auto: autoValue,
        m: "账号选择，otherIds为" + temArray
    });

}

function initBindPopShow(json, auto) {
    var divId = "initBindPopShow"
    var temArray = [];
    var ol = json.r.ol;
    for (var i in json.r.pop) {
        temArray.push([ json.r.pop[i].n, json.r.pop[i].id ]);
    }
    var otherId = json.r.o;
    var content = ""
    for (var i in temArray) {
        var name = temArray[i][0]
        var id = temArray[i][1]
        if (id == otherId) {
            content += "<input type='checkbox' name='bindIds' value='" + id
                + "' checked='true'/>" + name + "/" + id + "<br/>"
        } else
            content += "<input type='checkbox' name='bindIds' value='" + id
                + "' checked='true'/>" + name + "/" + id + "<br/>"
    }
    var func = "initBindPopFn"

    var args = []
    if (ol == undefined)
        args = [ divId, auto ]
    else
        args = [ divId, auto, "\"" + ol + "\"" ]

    btnsHtml = "		<button id='' onclick='" + func + "(" + args + ")"
        + ";closePop(" + "\"" + divId + "\"" + ")'>绑定</button>"

    initPop(divId, "绑定弹窗", content, btnsHtml)
}

function bindShow() {
    divDecorate1()
    echo("绑定 的Id<input type='text' id='bindShow_input1' value='eq-primos'/>")
    echo("绑定 平台缩写<input type='text' id='bindShow_input2' value='q'/>")
    echo("绑定 的token，数组形式<input type='text' id='bindShow_input3' value='27ed13298e1356f9e2c89baedaafe931,4C09EB2E2A56AEE2E46C6289BD56925E'/>")
    echo("绑定类型：<select id= 'bindShow_input4'>"
        + "<option value=0>手动绑定</option>" + "<option value=1>自动绑定</option>"
        + "</select>")
    tip("请注意更新mobileId 和版本信息")
    echo("<button id='bindShow' onclick='bindFn()'>绑定</button>")
    divDecorate2()
}

// 手机Id 和版本信息
function mobileIdAndVersionFn(moblieId, version, platForm, language) {
    if (isEmptyOrUndefined(moblieId, version, platForm, language)) {
        var divId = "mobileIdAndVersionShow"
        wsp.saveMobileId($$(divId + "_1"), {
            auto: false,
            m: "保存mobileId"
        })
        wsp.setVersion($$(divId + "_3"), $$(divId + "_4"), $$(divId + "_2"), {
            auto: false,
            m: "保存版本信息"
        })

    } else {
        wsp.saveMobileId(moblieId, {
            auto: false,
            m: "保存mobileId"
        })
        wsp.setVersion(platForm, language, version, {
            auto: false,
            m: "保存版本信息"
        })
    }
}

function mobileIdAndVersionShow() {
    divDecorate1()
    var divId = "mobileIdAndVersionShow"
    echo("mobileId：<input type='text' value='full' id='" + divId + "_1'/>")
    echo("版本信息：<input type='text' value='1.0.0' id='" + divId + "_2'/>")
    echo("平台:<select id='" + divId + "_3'>"
        + "<option value='android'>android</option>"
        + "<option value='ios'>ios</option>" + "</select>")
    echo("语言<select id='" + divId + "_4'>"
        + "<option value='zh_CN'>zh_CN(简体中文)</option>"
        + "<option value='zh_Hant'>zh_Hant(繁体中文)</option>"
        + "<option value='en_US'>en_US(美国英语)</option>" + "</select>")
    echo("<button id='" + divId
        + "' onclick='mobileIdAndVersionFn()'>更新版本和mobileId</button>")
    divDecorate2()
}

// --举报用户
function reportFn(otherId) {
    if ("" == otherId || otherId == undefined) {
        otherId = getValueById("reportShow_input1")
    }
    wsp.accountSetting(otherId, "updateMajor", "举报帐号，otherId为" + otherId);

}

function reportShow() {
    divDecorate1()
    echo("举报帐号的otherId<input type='text' id='reportShow_input1' value='s:1581692875'/>")
    echo("<button id='reportShow' onclick='reportFn()'>举报帐号</button>")
    divDecorate2()

}

// --更改主帐号
function changeAdminFn(otherId) {
    if ("" == otherId || otherId == undefined) {
        otherId = getValueById("changeAdminShow_input1")
    }
    wsp.accountSetting(otherId, "updateMajor", "更改主帐号，otherId为" + otherId);

}

function changeAdminShow() {
    divDecorate1()
    echo("更改主帐号的otherId<input type='text' id='changeAdminShow_input1' value='s:1581692875'/>")
    echo("<button id='changeAdminShow' onclick='changeAdminFn()'>更改主帐号</button>")
    divDecorate2()

}

// --添加联系人
function addContactFn(sender, path) {
    var divId = "addContactShow";
    sender = $$(divId + "_3")
    wsp.addContact(sender, makeViewPath($$(divId + "_1"), $$(divId + "_2")),
        "添加常用联系人");

}

function addContactShow() {
    divDecorate1()
    tip("过期")
    var divId = "addContactShow";
    pathView(divId)
    echo("发送者<input type='text' id='addContactShow_3' value='" + cSnsPlatform + ":" + cSnsUserId + "'/>")
    buttonView(divId, "添加常用联系人")
    /*
     * echo("发送者<input type='text' id='addContactShow_input1' value=''/>")
     * echo("路径，数组<input type='text' id='addContactShow_input2' value=''/>")
     * echo("路径构造<select id='addContactShow_input3'>"+ "<option value='list'>
     * 普通的构造</option>"+ "<option value='cross'>indirectFriend</option>"+ "<option
     * value='group'>通过群构造</option>"+ "</select>") echo("<button
     * id='addContactShow' onclick='addContactFn()'>添加常用联系人</button>")
     */
    divDecorate2()
}

// --删除常用联系人
function delContactFn(sender, target) {
    if ("" == sender || sender == undefined) {
        sender = getValueById("delContactShow_input1")
    }
    if ("" == target || target == undefined) {
        target = getValueById("delContactShow_input2")
    }
    wsp.removeContact(sender, target, "删除常用联系人");

}

function delContactShow() {
    divDecorate1()
    tip("过期")
    echo("发送者<input type='text' id='delContactShow_input1' value=''/>")
    echo("目标的otherId：<input type='text' id='delContactShow_input2' value=''/>")
    echo("<button id='delContactShow' onclick='delContactFn()'>删除常用联系人</button>")
    divDecorate2()
}

// --常用联系人列表
function contactListFn() {
    wsp.listContact("显示常用联系人列表");
}

function contactListShow() {
    divDecorate1()
    tip("过期")
    echo("<button id='contactListShow' onclick='contactListFn()'>显示常用联系人列表</button>")
    divDecorate2()
}

// -- 添加信任联系人
function addTrustContactFn(otherIds, typz) {
    var divId = "addTrustContactShow";
    if (isEmptyOrUndefined(otherIds))
        wsp.addTrustContact(strToArr($$(divId + "_1")),
            getValueById("addTrustContactShow_2"), {
                auto: false,
                m: "添加信任联系人"
            });
    else
        wsp.addTrustContact(otherIds, typz, {
            auto: false,
            m: "添加信任联系人"
        });

}

function addTrustContactShow() {
    divDecorate1()
    var divId = "addTrustContactShow";
    // pathView(divId)
    echo("可以是数组，用逗号隔开：<input type='text' id='" + divId + "_1' value=''/>")
    echo("信任类型:<select id='" + divId + "_2'>"
        + "<option value='F'>Friend</option>"
        + "<option value='G'>Group</option>" + "</select>")
    buttonView(divId, "添加信任联系人")
    divDecorate2()
}

// -- 删除信任联系人
function delTrustContactFn(otherIds) {
    var divId = "delTrustContactShow"
    if (isEmptyOrUndefined(otherIds))
        wsp.removeTrustContact(strToArr($$(divId + "_1")), "删除信任联系人");
    else
        wsp.removeTrustContact(otherIds, "删除信任联系人");

}

function delTrustContactShow() {
    divDecorate1()
    var divId = "delTrustContactShow"
    echo("otherIds,数组:<input type='text' id='" + divId + "_1' value=''/>")

    echo("<button id='delTrustContactShow' onclick='delTrustContactFn()'>删除信任联系人</button>")
    divDecorate2()
}

// -- 修改信任联系人备注
function updateTrustContactAliasFn(otherId) {
    var divId = "updateTrustContactAliasShow"
    if (isEmptyOrUndefined(otherId))
        wsp.updateTrustContactAlias($$(divId + "_1"), $$(divId + "_2"), "修改信任联系人备注名")
}

function updateTrustContactAliasShow() {
    divDecorate1()
    var divId = "updateTrustContactAliasShow"
    echo("otherId:<input type='text' id='" + divId + "_1' value=''/>")
    echo("备注:<input type='text' id='" + divId + "_2' value=''/>")
    echo("<button id='updateTrustContactAliasShow' onclick='updateTrustContactAliasFn()'>修改信任联系人备注名</button>")
    divDecorate2()
}

// -- 显示信任联系人
function listTrustContactFn() {
    var divId = "listTrustContactShow"
    wsp.listTrustContact({
        auto: false,
        m: "显示信任联系人列表"
    });
}

function listTrustContactShow() {
    divDecorate1()
    var divId = "listTrustContactShow"
    buttonView(divId, "显示信任联系人列表")
    divDecorate2()
}

// -- 新显示信任联系人
function newListTrustContactFn() {
    wsp.initTrustContact({
        auto: false,
        m: "新显示信任联系人列表"
    });
}

function newListTrustContactShow() {
    divDecorate1()
    echo("<button id='newListTrustContactShow' onclick='newListTrustContactFn()'>新显示信任联系人列表</button>")
    divDecorate2()
}


// -- 反馈
function feedBackFn(content) {
    if ("" == content || content == undefined) {
        content = getValueById("feedBackShow_input1")
    }

    wsp.feedback(content, "提交反馈");

}

function feedBackShow() {
    divDecorate1()
    echo("反馈内容<input type='text' id='feedBackShow_input1' value='我是反馈'/>")
    echo("<button id='feedBackShow' onclick='feedBackFn()'>提交反馈</button>")
    divDecorate2()
}

// -- 建议
function suggestionFn(content, email) {
    if ("" == content || content == undefined) {
        content = getValueById("suggestionShow_input1")
    }
    if ("" == email || email == undefined) {
        email = getValueById("suggestionShow_input2")
    }
    wsp.suggestion(content, email, "提交建议");

}

function suggestionShow() {
    divDecorate1()
    echo("email <input type='text' id='suggestionShow_input2' value='你很火啊@gmail.com'/>")
    echo("建议内容<input type='text' id='suggestionShow_input1' value='我是建议'/>")
    echo("<button id='suggestionShow' onclick='suggestionFn()'>提交建议</button>")
    divDecorate2()
}

// -- getPeopleByDistance2
function getEventByDistanceFn(limit, distance, filter) {
    if ("" == limit || limit == undefined) {
        limit = parseInt(getValueById("getEventByDistanceShow_input1"))
    }
    if ("" == distance || distance == undefined) {
        distance = parseFloat(getValueById("getEventByDistanceShow_input2"))
    }
    if ("" == filter || filter == undefined) {
        filter = getValueById("getEventByDistanceShow_input3")
    }
    wsp.getEventByDistance(limit, distance, filter, "getEventByDistance");

}

function getEventByDistanceShow() {
    divDecorate1()
    tip("线上活动")
    echo("limit： <input type='text' id='getEventByDistanceShow_input1' value='5'/>")
    echo("distance：<input type='text' id='getEventByDistanceShow_input2' value='0'/>")
    echo("filter：<input type='text' id='getEventByDistanceShow_input3' value=''/>")
    echo("<button id='getEventByDistanceShow' onclick='getEventByDistanceFn()'>查找</button>")
    divDecorate2()
}

// -- getPeopleByDistance2
function getPeopleByDistance2Fn(limit, distance, filter) {
    if ("" == limit || limit == undefined) {
        limit = parseInt(getValueById("getPeopleByDistance2Show_input1"))
    }
    if ("" == distance || distance == undefined) {
        distance = parseFloat(getValueById("getPeopleByDistance2Show_input2"))
    }
    if ("" == filter || filter == undefined) {
        filter = getValueById("getPeopleByDistance2Show_input3")
    }
    wsp.getPeopleByDistance2(limit, distance, filter, "getPeopleByDistance2");

}

function getPeopleByDistance2Show() {
    divDecorate1()
    tip("广场用户")
    echo("limit： <input type='text' id='getPeopleByDistance2Show_input1' value='2'/>")
    echo("distance：<input type='text' id='getPeopleByDistance2Show_input2' value='0'/>")
    echo("filter：<input type='text' id='getPeopleByDistance2Show_input3' value=''/>")
    echo("<button id='getPeopleByDistance2Show' onclick='getPeopleByDistance2Fn()'>查找</button>")
    divDecorate2()
}

// -- getStatusByDistance2
function getStatusByDistance2Fn(limit, distance, filter) {
    if ("" == limit || limit == undefined) {
        limit = getValueById("getStatusByDistance2Show_input1")
    }
    if ("" == distance || distance == undefined) {
        distance = getValueById("getStatusByDistance2Show_input2")
    }
    if ("" == filter || filter == undefined) {
        filter = getValueById("getStatusByDistance2Show_input3")
    }
    wsp.getStatusByDistance2(limit, distance, filter, "getStatusByDistance2");

}

function getStatusByDistance2Show() {
    divDecorate1()
    tip("广场内容")
    echo("limit： <input type='text' id='getStatusByDistance2Show_input1' value='2'/>")
    echo("distance：<input type='text' id='getStatusByDistance2Show_input2' value='0'/>")
    echo("filter：<input type='text' id='getStatusByDistance2Show_input3' value=''/>")
    echo("<button id='getStatusByDistance2Show' onclick='getStatusByDistance2Fn()'>查找</button>")
    divDecorate2()
}

// -- getStatusByDistance2
function getGroupsByDistance2Fn(limit, distance, filter) {
    if ("" == limit || limit == undefined) {
        limit = getValueById("getGroupsByDistance2Show_input1")
    }
    if ("" == distance || distance == undefined) {
        distance = getValueById("getGroupsByDistance2Show_input2")
    }
    if ("" == filter || filter == undefined) {
        filter = getValueById("getGroupsByDistance2Show_input3")
    }
    wsp.getGroupsByDistance2(limit, distance, filter, "getGroupsByDistance2");

}

function getGroupsByDistance2Show() {
    divDecorate1()
    tip("广场群")
    echo("limit： <input type='text' id='getGroupsByDistance2Show_input1' value='2'/>")
    echo("distance：<input type='text' id='getGroupsByDistance2Show_input2' value='0'/>")
    echo("filter：<input type='text' id='getGroupsByDistance2Show_input3' value=''/>")
    echo("<button id='getGroupsByDistance2Show' onclick='getGroupsByDistance2Fn()'>查找</button>")
    divDecorate2()
}

/*
 * //-- 建议 function suggestionFn(content,email){ if(""==content || content ==
 * undefined){ content = getValueById("suggestionShow_input1") } if(""==email ||
 * email == undefined){ email = getValueById("suggestionShow_input2") }
 * wsp.suggestion(content,email,"提交建议"); } function suggestionShow(){
 * echo("email <input type='text' id='suggestionShow_input2'
 * value='你很火啊@gmail.com 后台对mail格式为进行判定'/>") echo("建议内容<input type='text'
 * id='suggestionShow_input1' value='我是建议'/>") echo("<button
 * id='suggestionShow' onclick='suggestionFn()'>提交建议</button>") }
 */

// -- 更改语言版本
function changeLanguageFn(language) {
    if ("" == language || language == undefined) {
        language = getValueById("changeLanguageShow_input1")
    }
    wsp.updateLanguage(language, "更换语言");

}

function changeLanguageShow() {
    divDecorate1()
    // en_US zh_CN zh_Hant
    echo("更换语言<select id='changeLanguageShow_input1'>"
        + "<option value='en_US'>en_US</option>"
        + "<option value='zh_CN'>zh_CN</option>"
        + "<option value='zh_Hant'>zh_Hant</option>" + "</select>")
    echo("<button id='changeLanguageShow' onclick='changeLanguageFn()'>更换语言</button>")
    divDecorate2()
}

// --搜索
function searchFn(searchName) {
    var divId = "searchShow"
    if (isEmptyOrUndefined(searchName)) {
        wsp.search($$(divId + "_1"), {
            auto: false,
            m: "全局搜索名字"
        })
    } else {
        wsp.search(serchName, {
            auto: false,
            m: "全局搜索名字"
        })

    }

}
// ///////////////////////////////////////////
function cloudSearchShow() {
    divDecorate1()
    var divId = "cloudSearchShow"
    echo("" +
        "要搜索的名字：<input type='text' id='" + divId + "_1'/>")
    echo("要搜索的名字：<input type='number' id='" + divId + "_2' value='0'/>")
    echo("要搜索的名字：<input type='number' id='" + divId + "_3' value='50'/>")
    buttonView(divId, "CloudSearch")
    divDecorate2()
}

function searchByUserNameFn() {
    var divId = "searchByUserNameShow"
    wsp.searchByUserName($$(divId + "_1"), parseInt($$(divId + "_2")), parseInt($$(divId + "_3")), "分词搜索")
}

function searchByUserNameShow() {
    divDecorate1()
    var divId = "searchByUserNameShow"
    echo("要搜索的名字：<input type='text' id='" + divId + "_1'/>")
    echo("limit：<input type='text' value='20' id='" + divId + "_2'/>")
    var time = (new Date()).getTime();
    echo("timestamp：<input type='text' value='" + time + "' id='" + divId + "_3'/>")
    echo("<button id='searchByUserNameShow' onclick='searchByUserNameFn()'>分词搜索</button>")
    divDecorate2()
}

function initTextSegmentsFn() {
    var divId = "initTextSegmentsShow"
    wsp.initTextSegments("初始化分词")
}

function initTextSegmentsShow() {
    divDecorate1()
    var divId = "initTextSegmentsShow"
    echo("//FIXME: 这个跟个人没关,应该是系统级的,所以放在这是个问题")
    echo("别你妹的乱点,服务器一会卡死了!!!")
    echo("<button id='initTextSegmentsShow' onclick='initTextSegmentsFn()'>初始化分词</button>")
    divDecorate2()
}

function cloudSearchFn(searchName, page, size) {
    var divId = "cloudSearchShow"
    if (isEmptyOrUndefined(searchName)) {
        wsp.cloudSearch($$(divId + "_1"), parseInt($$(divId + "_2")),
            parseInt($$(divId + "_3")), {
                auto: false,
                m: "全局搜索名字"
            })
    } else {
        wsp.cloudSearch(serchName, page, size, {
            auto: false,
            m: "全局搜索名字"
        })

    }
}
// ///////////////////////////////////////////////
function getSelfInfoFn(action) {
    var divId = "getSelfInfoShow"
    if (isEmptyOrUndefined(action)) {
        action = $$(divId + "_1")
    }
    wsp.getSelfInfo(action, {
        auto: false,
        m: "获取用户账号上的信息"
    })
}

function getSelfInfoShow() {
    divDecorate1()
    var divId = "getSelfInfoShow"
    selfInfoView(divId)
    buttonView(divId, "获取自己的信息")
    divDecorate2()
}
// -- 获取资料页面的信息
function getPersonalSelfInfoFn(path) {
    var divId = "getPersonalSelfInfoShow"
    if (isEmptyOrUndefined(path)) {
        path = makeViewPath($$(divId + "_1"), $$(divId + "_2"))
    }
    wsp.queryPersonalSelfInfo("selfInfo", path, {
        auto: false,
        m: "获取好友各个平台的信息"
    })
}
function getPersonalSelfInfoShow() {
    var divId = "getPersonalSelfInfoShow"
    divDecorate1()
    pathView(divId)
    buttonView(divId, "获取好友各个平台的信息")
    divDecorate2()

}
function getPersonalFriendInfoFn(path, num) {

    var divId = "getPersonalFriendInfoShow"
    if (isEmptyOrUndefined(path, num)) {
        path = makeViewPath($$(divId + "_1"), $$(divId + "_2"))
        num = parseInt($$(divId + "_3"))
        // debug(typeof num == Number)
    }
    wsp.queryPersonalFriendInfo("friendsInfo", path, num, {
        auto: false,
        m: "获取资料页好友列表信息"
    })
}
function getPersonalFriendInfoShow() {
    var divId = "getPersonalFriendInfoShow"
    divDecorate1()
    pathView(divId)
    echo("获取个数：<input type='text' id='" + divId + "_3' value='5'/>")
    buttonView(divId, "获取资料页好友列表信息")
    divDecorate2()
}

function searchShow() {
    divDecorate1()
    var divId = "searchShow"
    echo("要搜索的名字：<input type='text' id='" + divId + "_1'/>")
    buttonView(divId, "全局搜索")
    divDecorate2()
}

function stopSearchFn() {
    wsp.stop({
        auto: false,
        m: "停止全局搜索"
    })
}

function stopSearchShow() {
    divDecorate1()
    var divId = "stopSearchShow"
    buttonView(divId, "停止全局搜索")
    divDecorate2()
}

// *--------------------IOS-------------------------------
function ioslogoutFn() {
    var divId = "ioslogoutShow"
    wsp.logout()
}

function ioslogoutShow() {
    divDecorate1()
    var divId = "ioslogoutShow"
    buttonView(divId, "ios 登出")
    divDecorate2()
}

function iosapnsTokenFn(token) {
    var divId = "iosapnsTokenShow"
    if (isEmptyOrUndefined(token)) {
        wsp.apnsToken($$(divId + "_1"))
    } else {
        wsp.apnsToken(token)
    }
}

function iosapnsTokenShow() {
    divDecorate1()
    tip("无法模拟ios推送")
    var divId = "iosapnsTokenShow"
    echo("iso apnsToken : <input value='2303d96caf117884dd8291654c79b6e3b06fa0b6959b372e0aea1e290f4a4aca' type='text' id='"
        + divId + "_1'/>")
    buttonView(divId, "ios 推送 token")
    divDecorate2()
}

// *--------------------IOS-------------------------------

// --定时器
function updateTimerFn() {
    echo("定时器--------------刷新一次信息");
    // wsp.updateUserInfosByOtherId(makeSelfPath(),"self");
    // wsp.updateUserInfosByOtherId(makeFriendsPath([["q:ojstuv"]]),"friends");
    // 更新下本人的平台信息
    // for(var acc in db.accounts){
    // wsp.updateUserInfosByOtherId(makeFriendsPath([[acc]]),"friends");
    // }
    // wsp.updateUserInfosByOtherId(makeFriendsPath([[cSnsPlatform+":"+cSnsUserId]]),"self");

    // wsp.updateUserInfosByOtherId(makeFriendsPath([getDBUserOtherIds()]),"friends","更新用户好友的信息");
    wsp.updateUserInfosByOtherId(makeFriendsPath([ DB.getUserOtherIds() ]),
        "self", "更新用户自己的信息");
    wsp.updateFriendsByOtherId(makeFriendsPath([ DB.getUserOtherIds() ]),
        "list", "更新用户的好友列表");
    // 更新好友的信息
    setTimeout("updateTimerFn()", time_interval);
}

function updateTimerShow() {
    divDecorate1()
    tip("定时器的间隔是" + time_interval);
    echo("<button id='updateTimerShow' onclick='updateTimerFn()'>打开定时器</button>");
    divDecorate2()
}

function setMobileUserInfoFn(otherId, username, headRef) {
    if ("" == otherId || otherId == undefined)
        otherId = getValueById("otherId");
    if ("" == username || username == undefined)
        username = getValueById("username");

    if ("" == headRef || headRef == undefined)
        headRef = getValueById("headRef");

    wsp.setUserInfo(otherId, username, headRef, {
        m: "更新手机用户资料"
    });
}

function setMobileUserInfoView() {
    divDecorate1();
    fail("更新手机用户资料")
    echo("OtherUid：<input id='otherId' value=''/>")
    echo("userName:<input type='text' id='username' value=''/>")
    echo("headRef::<input type='text' id='headRef' value=''/>")
    echo("<button id='mobileUserCheckView' onclick='setMobileUserInfoFn()'>设置用户名</button>")
    divDecorate2();
}


//*************************************RocketSpace这次迭代相关******************************************************/

// -- 通讯录操作
function sectionInitFn() {
    wsp.sectionInit("初始化通讯录列表");
}

function sectionInitShow() {
    divDecorate1()
    echo("初始化通讯录列表")
    echo("<button id='sectionInitShow' onclick='sectionInitFn()'>初始化通讯录列表</button>")
    divDecorate2()
}

function sectionAddOrRemoveMemberFn() {
    var operation = getValueById("sectionAddOrRemoveMemberShow_input1")
    var sectionId = getValueById("sectionAddOrRemoveMemberShow_input2")
    var otherIds = getValueById("sectionAddOrRemoveMemberShow_input3")
    wsp.sectionAddOrRemoveMember(operation, sectionId, strToArr(otherIds), "添加或删除成员");
}

function sectionAddOrRemoveMemberShow() {
    divDecorate1()
    echo("添加或删除成员")
    echo("操作<select id='sectionAddOrRemoveMemberShow_input1'>"
        + "<option value='add'>add</option>"
        + "<option value='remove'>remove</option>" + "</select>")
    echo("sectionId：<input type='text' id='sectionAddOrRemoveMemberShow_input2'/>")
    echo("otherIds,数组：<input type='text' id='sectionAddOrRemoveMemberShow_input3'/>")
    echo("<button id='sectionAddOrRemoveMemberShow' onclick='sectionAddOrRemoveMemberFn()'>添加或删除成员</button>")
    divDecorate2()
}

function querySectionFn() {
    var sectionIds = getValueById("querySectionShow_input1")
    wsp.querySection(strToArr(sectionIds), "获取section信息");
}

function querySectionShow() {
    divDecorate1()
    echo("获取section信息")
    echo("sectionIds：<input type='text' id='querySectionShow_input1'/>")
    echo("<button id='querySectionShow' onclick='querySectionFn()'>获取section信息</button>")
    divDecorate2()
}

// -- 企业名片操作
function showIntroductionFn() {
    var sectionId = getValueById("showIntroductionShow_input1")
    wsp.showIntroduction(sectionId, "展示企业名片");
}

function showIntroductionShow() {
    divDecorate1()
    echo("展示企业名片")
    echo("memberId：<input type='text' id='showIntroductionShow_input1' value='sn:r:8618911765343~1406881544172~3967'/>")
    echo("<button id='showIntroductionShow' onclick='showIntroductionFn()'>展示企业名片</button>")
    divDecorate2()
}

function updateIntroductionInfoFn() {
    var baseId = "updateIntroductionInfoShow_";
    var sectionId = getValueById(baseId + "sectionId");
    var intro = getValueById(baseId + "intro");
    var logo = getValueById(baseId + "logo");
    var website = getValueById(baseId + "website");
    var category = getValueById(baseId + "category");
    var location = getValueById(baseId + "location");

    wsp.updateIntroductionInfo(sectionId, makeSectionInfoParam(intro, logo, website, category, location), "更新企业名片");
}

function updateIntroductionInfoShow() {
    divDecorate1()
    fail("更新企业名片")
    echo("sectionId:<input type='text' id='updateIntroductionInfoShow_sectionId' value='sn:r:8618911765343~1406881544172~3967'/>")
    echo("intro:<input type='text' id='updateIntroductionInfoShow_intro' value='KeeeWeee,Connecting the world!'/>")
    echo("logo:<input type='text' id='updateIntroductionInfoShow_logo' value='http://h.hiphotos.baidu.com/image/pic/item/38dbb6fd5266d016c626a7a7952bd40735fa3505.jpg'/>")
    echo("website:<input type='text' style='width:120px' id='updateIntroductionInfoShow_website' value='http://www.keeeweee.com'/>")
    echo("category:<input type='text' style='width:120px' id='updateIntroductionInfoShow_category' value='Social Network'/>")
    echo("location:<input type='text' style='width:120px' id='updateIntroductionInfoShow_location' value='San Francisco,CA,U.S'/>")
    echo("<button id='updateIntroductionInfoShow' onclick='updateIntroductionInfoFn()'>更新企业名片</button>")
    divDecorate2()
}

function getExhibitorListFn() {
    var eventId = getValueById("getExhibitorListShow_input1");
    wsp.getExhibitorList(eventId, "获取参展商列表")
}

function getExhibitorListShow() {
    divDecorate1()
    echo("获取参展商列表")
    echo("eventId：<input type='text' id='getExhibitorListShow_input1' value='ev:joZhU07Q50iBECH'/>")
    echo("<button id='getExhibitorListShow' onclick='getExhibitorListFn()'>获取参展商列表</button>")
    divDecorate2()
}

function getExhibitorInfoFn() {
    var exhibitorId = getValueById("getExhibitorInfoShow_input1");
    wsp.getExhibitorInfo(exhibitorId, "获取参展商信息")
}

function getExhibitorInfoShow() {
    divDecorate1()
    echo("获取参展商信息")
    echo("memberId：<input type='text' id='getExhibitorInfoShow_input1' value='ex:ev:Disrupt~NY-2014~KeeeWeee'/>")
    echo("<button id='getExhibitorInfoShow' onclick='getExhibitorInfoFn()'>获取参展商信息</button>")
    divDecorate2()
}
//wsp.createNewEvent2(name, pier, desc, loc, startTime, lastTime, roles, longitude, latitude, mark)parseInt
//["events", "createNewEvent", name, pier, desc, loc, startTime, lastTime, roles,Longitude,Latitude]
function addNewEventFn(name, pier, desc, loc, startTime, lastTime, roles, longitude, latitude) {
    if ("" == name || name == undefined) {
        name = getValueById("addNewEventShow_name")
    }
    if ("" == pier || pier == undefined) {
        pier = getValueById("addNewEventShow_pier")
    }
    if ("" == desc || desc == undefined) {
        desc = getValueById("addNewEventShow_desc")
    }
    if ("" == loc || loc == undefined) {
        loc = getValueById("addNewEventShow_loc")
    }
    if ("" == startTime || startTime == undefined) {
        startTime = Number(getValueById("addNewEventShow_startTime"))
    }
    if ("" == lastTime || lastTime == undefined) {
        lastTime = parseInt(getValueById("addNewEventShow_lastTime"))
    }
    if ("" == roles || roles == undefined) {
        roles = getValueById("addNewEventShow_roles").split(",")
    }
    if ("" == longitude || longitude == undefined) {
        longitude = getValueById("addNewEventShow_longitude")
    }
    if ("" == latitude || latitude == undefined) {
        latitude = getValueById("addNewEventShow_latitude")
    }
    wsp.createNewEvent2(name, pier, desc, loc, startTime, lastTime, roles, longitude, latitude, {
        auto: false,
        m: "添加活动"
    });

}
//wsp.createNewEvent2(name, pier, desc, loc, startTime, lastTime, roles, longitude, latitude, mark)
//"Disrupt", "NY-2014", "TechCrunch Disrupt is one of the most anticipated technology conferences of the year", 1417842727228, 42, ["Visitor", "Investor", "Reporter"], "创建Disrupt活动"
function addNewEventShow() {
    divDecorate1()
    fail("添加活动")
    echo("name:<input type='text' id='addNewEventShow_name' value='Disrupt'/>")
    echo("pier:<input type='text' id='addNewEventShow_pier' value='NY-2014'/>")
    echo("desc:<input type='text' id='addNewEventShow_desc' value='TechCrunch Disrupt is one of the most anticipated technology conferences of the year'/>")
    echo("loc:<input type='text' style='width:120px' id='addNewEventShow_loc' value='加利福尼亚'/>")
    echo("startTime:<input type='text' style='width:120px' id='addNewEventShow_startTime' value='" + ((new Date()).getTime() + (24 * 3 * 3600 * 1000)) + "'/>")
    echo("lastTime:<input type='text' style='width:120px' id='addNewEventShow_lastTime' value='4'/><br/>")
    echo("roles:<input type='text' style='width:120px' id='addNewEventShow_roles' value='Investor,Vistor,Reportor'/><br/>")
    echo("longitude:<input type='text' style='width:120px' id='addNewEventShow_longitude' value='116.3'/><br/>")
    echo("latitude:<input type='text' style='width:120px' id='addNewEventShow_latitude' value='39.3'/><br/>")
    echo("<button id='addNewEventShow' onclick='addNewEventFn()'>添加活动</button>")
    divDecorate2()
}
/*
 *
 * obj.updateExhibitor = function (exhibitorId, name, logo, desc, location, category, mark) {
 doLogSendReq("events", websocket, ["events", "updateExhibitor", exhibitorId, name, logo, desc, location, category], mark)
 }
 *
 *
 * */
function updateExhibitorFn() {
    var baseId = "updateExhibitorShow_";
    var exhibitorId = getValueById(baseId + "exhibitorId");
    var name = getValueById(baseId + "name");
    var logo = getValueById(baseId + "logo");
    var desc = getValueById(baseId + "desc");
    var location = getValueById(baseId + "location");
    var category = getValueById(baseId + "category");

    wsp.updateExhibitor(exhibitorId, name, logo, desc, location, category, "更新展商信息")

}


function updateExhibitorShow() {
    divDecorate1()
    fail("更新展商信息")
    echo("exhibitorId:<input type='text' id='updateExhibitorShow_exhibitorId' value='ex:ev:Disrupt~NY-2014~KeeeWeee'/>")
    echo("name:<input type='text' id='updateExhibitorShow_name' value='KeeeWeee'/>")
    echo("logo:<input type='text' id='updateExhibitorShow_logo' value='http://keeeweee.com/assets/img/logo.png'/>")
    echo("desc:<input type='text' id='updateExhibitorShow_desc' value='We are KeeeWeee'/>")
    echo("location:<input type='text' style='width:120px' id='updateExhibitorShow_location' value='NewYork'/>")
    echo("category:<input type='text' style='width:120px' id='updateExhibitorShow_category' value='Social Network'/><br/>")
    echo("<button id='addNewEventShow' onclick='updateExhibitorFn()'>更新展商信息</button>")
    divDecorate2()
}

//acviteEvent
//criteria
function acviteEventFn(eventId, criteria) {
    if ("" == eventId || eventId == undefined) {
        eventId = getValueById("acviteEventShow_eventId")
    }
    if ("" == criteria || criteria == undefined) {
        criteria = getValueById("acviteEventShow_criteria")
    }
    wsp.acviteEvent(eventId, criteria, {
        auto: false,
        m: "上线下线活动"
    });

}

function acviteEventShow() {
    divDecorate1()
    fail("添加活动")
    echo("eventId:<input type='text' id='acviteEventShow_eventId' value=''/>")
    echo("criteria：<select id='"
        + "acviteEventShow_criteria"
        + "'>"
        + "<option value='0'>下线</option>"
        + "<option value='1'>上线</option>"
        + "</select>")
    echo("<button id='acviteEventShow' onclick='acviteEventFn()'>更新</button>")
    divDecorate2()
}

///joinEvent

function joinEventFn(eventId, otherUid, role) {
    if ("" == eventId || eventId == undefined) {
        eventId = getValueById("joinEventShow_eventId")
    }
    if ("" == otherUid || otherUid == undefined) {
        otherUid = getValueById("joinEventShow_otherUid")
    }
    if ("" == role || role == undefined) {
        role = parseInt(getValueById("joinEventShow_role"))
    }
    wsp.joinEvent(eventId, otherUid, role, {
        auto: false,
        m: "参加活动"
    });

}

function joinEventShow() {
    divDecorate1()
    fail("参加活动")
    echo("eventId:<input type='text' id='joinEventShow_eventId' value=''/>")
    echo("otherUid:<input type='text' id='joinEventShow_otherUid' value=''/>")
    echo("role:<input type='text' id='joinEventShow_role' value='0'/>")
    echo("<button id='joinEventShow' onclick='joinEventFn()'>更新</button>")
    divDecorate2()
}

function addExhibitorFn() {
    var baseId = "addExhibitorShow_";
    var eventId = getValueById(baseId + "eventId");
    var name = getValueById(baseId + "name");
    var logo = getValueById(baseId + "logo");
    var desc = getValueById(baseId + "desc");
    var location = getValueById(baseId + "location");
    var category = getValueById(baseId + "category");
    wsp.addExhibitor(eventId, name, logo, desc, location, category, "添加展商")

}


function addExhibitorShow() {
    divDecorate1()
    fail("添加展商")
    echo("eventId:<input type='text' id='addExhibitorShow_eventId' value='ev:TeUfOwVFYYafUFL'/>")
    echo("name:<input type='text' id='addExhibitorShow_name' value='KeeeWeee'/>")
    echo("logo:<input type='text' id='addExhibitorShow_logo' value='http://keeeweee.com/assets/img/logo.png'/>")
    echo("desc:<input type='text' id='addExhibitorShow_desc' value='We are KeeeWeee'/>")
    echo("location:<input type='text' style='width:120px' id='addExhibitorShow_location' value='NewYork'/>")
    echo("category:<input type='text' style='width:120px' id='addExhibitorShow_category' value='Social Network'/><br/>")
    echo("<button id='addExhibitorShow' onclick='addExhibitorFn()'>添加展商</button>")
    divDecorate2()
}

function createExhibitorFn() {
    var baseId = "createExhibitorShow_";
    var eventId = getValueById(baseId + "eventId");
    var otherUid = getValueById(baseId + "otherUid");
    var name = getValueById(baseId + "name");
    var logo = getValueById(baseId + "logo");
    var desc = getValueById(baseId + "desc");
    var location = getValueById(baseId + "location");
    var category = getValueById(baseId + "category");
    wsp.createExhibitor(eventId, otherUid, name, logo, desc, location, category, "创建展商")

}


function createExhibitorShow() {
    divDecorate1()
    fail("创建展商")
    echo("eventId:<input type='text' id='createExhibitorShow_eventId' value='ev:TeUfOwVFYYafUFL'/>")
    echo("otherUid:<input type='text' id='createExhibitorShow_otherUid' value='r:8618610611153'/>")
    echo("name:<input type='text' id='createExhibitorShow_name' value='KeeeWeee'/>")
    echo("logo:<input type='text' id='createExhibitorShow_logo' value='http://keeeweee.com/assets/img/logo.png'/>")
    echo("desc:<input type='text' id='createExhibitorShow_desc' value='We are KeeeWeee'/>")
    echo("location:<input type='text' style='width:120px' id='createExhibitorShow_location' value='NewYork'/>")
    echo("category:<input type='text' style='width:120px' id='createExhibitorShow_category' value='Social Network'/><br/>")
    echo("<button id='addExhibitorShow' onclick='createExhibitorFn()'>创建展商</button>")
    divDecorate2()
}

//getParticipants
function getParticipantsFn() {
    var baseId = "getParticipantsShow_";
    var eventId = getValueById(baseId + "eventId");
    wsp.getParticipants(eventId, "查看参加活动人员")

}


function getParticipantsShow() {
    divDecorate1()
    fail("查看参加活动人员")
    echo("eventId:<input type='text' id='getParticipantsShow_eventId' value='ev:TeUfOwVFYYafUFL'/>")
    echo("<button id='getParticipantsShow' onclick='getParticipantsFn()'>查看</button>")
    divDecorate2()
}

function addExhibitorMemberFn() {
    var exhibitorId = getValueById("addExhibitorMemberShow_input1")
    var otherIds = getValueById("addExhibitorMemberShow_input2")
    wsp.addExhibitorMember(exhibitorId, strToArr(otherIds), "添加展商成员");
}

function addExhibitorMemberShow() {
    divDecorate1()
    echo("添加展商成员")
    echo("exhibitorId：<input type='text' id='addExhibitorMemberShow_input1'/>")
    echo("otherIds,数组：<input type='text' id='addExhibitorMemberShow_input2'/>")
    echo("<button id='addExhibitorMemberShow' onclick='addExhibitorMemberFn()'>添加展商成员</button>")
    divDecorate2()
}

function fireExhibitorMemberFn() {
    var exhibitorId = getValueById("fireExhibitorMemberShow_input1")
    var otherIds = getValueById("fireExhibitorMemberShow_input2")
    wsp.fireExhibitorMember(exhibitorId, strToArr(otherIds), "删除展商成员");
}

function fireExhibitorMemberShow() {
    divDecorate1()
    echo("删除展商成员")
    echo("exhibitorId：<input type='text' id='fireExhibitorMemberShow_input1'/>")
    echo("otherIds,数组：<input type='text' id='fireExhibitorMemberShow_input2'/>")
    echo("<button id='fireExhibitorMemberShow' onclick='fireExhibitorMemberFn()'>删除展商成员</button>")
    divDecorate2()
}

function joinExhibitorFn() {
    var exhibitorId = getValueById("joinExhibitorShow_input1")
    var otherId = getValueById("joinExhibitorShow_input2")
    wsp.joinExhibitor(exhibitorId, otherId, "加入展商");
}

function joinExhibitorShow() {
    divDecorate1()
    echo("加入展商")
    echo("exhibitorId：<input type='text' id='joinExhibitorShow_input1'/>")
    echo("otherId：<input type='text' id='joinExhibitorShow_input2'/>")
    echo("<button id='joinExhibitorShow' onclick='joinExhibitorFn()'>加入展商</button>")
    divDecorate2()
}

function quitExhibitorFn() {
    var exhibitorId = getValueById("quitExhibitorShow_input1")
    var otherId = getValueById("quitExhibitorShow_input2")
    wsp.quitExhibitor(exhibitorId, otherId, "退出展商");
}

function quitExhibitorShow() {
    divDecorate1()
    echo("退出展商")
    echo("exhibitorId：<input type='text' id='quitExhibitorShow_input1'/>")
    echo("otherId：<input type='text' id='quitExhibitorShow_input2'/>")
    echo("<button id='quitExhibitorShow' onclick='quitExhibitorFn()'>退出展商</button>")
    divDecorate2()
}

var initButtons = function () {
    if (isInitButtons) {
        return;
    } else {
        isInitButtons = true;
    }
    redFail("自动化 ")
    // get1FriendInfoAutoShow();
    // get1CrossFriendInfoAutoShow();

    qrcodeShow();
    getPeopleByDistance2Show();
    getStatusByDistance2Show();
    getGroupsByDistance2Show();
    syncContactsShow();
    setMobileUserInfoView();
    getLocalInfoShow();
    updateLocaluserInfoShow();
    updateLocalUserTagsShow();
//	linkInfotoAccsShow();
//	updateTimerShow();
    updateTokenShow();
    updateUserGeoPointShow();
    redFail("一般性操作")
//	updateUserTagsShow();
//	conditionsSearchShow();
//	conditionsSearchNameShow();
    inviteFriendsShow();
    snsShareShow();
//	fullowingShow();
    // updateIntroShow();
    getPrivateInfoShow()
    // addAlbumShow();
    // delAlbumShow();
    getSelfInfoShow();
//	reportShow();
//	changeAdminShow();
    // tokenAndInfoShow();
    updateLocalInfoShow()
    // addBlackShow();
    // delBlackShow();
    // addContactShow();
    // delContactShow();

    // contactListShow();

    feedBackShow();
    suggestionShow();
    changeLanguageShow();

    redFail("CloudSearch");
//	cloudSearchShow();
    searchShow();
    initTextSegmentsShow();
    searchByUserNameShow();
    // stopSearchShow()

    redFail("绑定 解绑");
//	mobileIdAndVersionShow();
    bindShow();
    accountSelectShow();
    accountSelectShow2();
    unbindShow();

    redFail("打开或关闭开关")
    SettingOptionShow();

    redFail("信任联系人列表");
    listTrustContactShow();
    newListTrustContactShow();
    delTrustContactShow();
    addTrustContactShow();
    updateTrustContactAliasShow();

    redFail("通过路径请求");
//	getProtectedInfoByOtherIdShow();
    getAccountSelfOrFriendsShow();
    getListOrCountByDbShow();
    queryFriendHistoryShow();
    getInfoSelfOrFriendsByDbShow();
    updateInfoSelfOrFriendsShow();
    updateListOrCountShow();
    getPersonalFriendInfoShow()
    getPersonalSelfInfoShow()

    redFail("ios专属");
    readNotificationByPageShow();
    updatePrivacyShow();
    iosapnsTokenShow();
    ioslogoutShow();

    redFail("RocketSpace这次迭代相关");
    sectionInitShow();
    querySectionShow();
    sectionAddOrRemoveMemberShow();
    showIntroductionShow();
    updateIntroductionInfoShow();

    redFail("disrupt - 活动相关");
    getParticipantsShow();
    addNewEventShow();
    addExhibitorShow();
    createExhibitorShow();
    getEventByDistanceShow();
    addNewEventShow();
    joinEventShow();

    redFail("disrupt - 参展商相关");
    getExhibitorListShow();
    getExhibitorInfoShow();
    updateExhibitorShow();
    addExhibitorMemberShow();
    fireExhibitorMemberShow();
    joinExhibitorShow();
    quitExhibitorShow();

}