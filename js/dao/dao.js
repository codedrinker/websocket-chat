/*
 下个版本
 1.重构 bind accountSetting 方法， 改为1个方法
 */
function wsSend(websocket, json) {
    if (json.m.m == json.m.auto)
        json.m = {
            m: json.m
        }
    json.m["t"] = new Date().getTime()
    var sendStr = JSON.stringify(json);
    log(sendStr);
    websocket.send(sendStr);
}

function makeToken(tokenAbout) {
    var token = new Object();
    for (var i = 0; i < tokenAbout.length; i++) {
        token["t" + i] = tokenAbout[i];
    }
    return token;
}

function makeTupleParam(tupleAbout) {
    var tuple = new Object();
    for (var i = 0; i < tupleAbout.length; i++) {
        tuple["p" + i] = tupleAbout[i];
    }
    return tuple;
}

function makeTupleIntParam(tupleAbout) {
    var tuple = new Object();
    for (var i = 0; i < tupleAbout.length; i++) {
        tuple["p" + i] = parseInt(tupleAbout[i]);
    }
    return tuple;
}

function makeLocalUserInfoParam(firstName, lastName, birthday, gender, location, email, aSign) {
    var localUserInfo = new Object();
    localUserInfo["p1"] = firstName;
    localUserInfo["p2"] = lastName;
    localUserInfo["p3"] = birthday;
    localUserInfo["p4"] = gender;
    localUserInfo["p5"] = location;
    localUserInfo["p6"] = email;
    localUserInfo["p7"] = aSign;
    return localUserInfo;
}

function makeSectionInfoParam(intro, logo, website, category, location) {
    var sectionInfo = new Object();
    sectionInfo["p1"] = intro;
    sectionInfo["p2"] = logo;
    sectionInfo["p3"] = website;
    sectionInfo["p4"] = category;
    sectionInfo["p5"] = location;
    return sectionInfo;
}

function makeAutoLoginStar(platform, language, version, mId) {
    var star = new Object();
    star["platform"] = platform;
    star["language"] = language;
    star["version"] = version;
    star["mId"] = mId;
    return star;

}

function makeChatSessionLocation(nation, province, city) {
    var location = new Object();
    location["nation"] = nation;
    location["province"] = province;
    location["city"] = city;
    return location;
}

var friendsPathFields = [ "p0o", "p1i", "p1", "p1o", "p2i", "p2", "p2o" ];
var friendsPathFields2 = [ "p0o", "p1i", "p2i", "p2", "p2o" ];
var sessionPathFields = [ "p0o", "p1s", "p2i", "p2" ];
var allPathFields = [ "p0o", "p1f" ]
var trustPathFields = [ "p0o", "p1t", "p1", "p1o" ]

function makePath(pathArray, fields) {
    var path = new Object();
    var check = false;
    for (var i = 0; i < pathArray.length; i++) {
        if (pathArray[i] instanceof Array && i == (pathArray.length - 1))
            check = true;
        path[fields[i]] = pathArray[i];
    }
    if (!check)
        msgBlock("路径错误：" + pathArray.toString);
    return path;
}

function makeViewPath(field, str) {
    var pathArr = strToPathArr(str);
    if ("{}" == str) {
        return makeSelfPath();

    } else {
        var fieldArr
        if ("session" == field) {
            fieldArr = sessionPathFields;
        } else if ("cross" == field) {
            fieldArr = friendsPathFields2;
        } else if ("list" == field) {
            fieldArr = friendsPathFields;
        } else if ("trust" == field) {
            fieldArr = trustPathFields;
        } else {
            fieldArr = allPathFields;
        }
        return makePath(pathArr, fieldArr);
    }
}

function makeSelfPath() {
    return {};
}

function makeFriendsPath(pathArray) {
    return makePath(pathArray, friendsPathFields);
}
function makeCrossPath(pathArray) {
    return makePath(pathArray, friendsPathFields2);
}
function makeSessionPath(pathArray) {
    return makePath(pathArray, sessionPathFields);
}

function fullHeadBak(len) {
    var array = new Array();
    for (var i = 0; i < len; i++) {
        array[i] = ("p" + i);
    }
    return array;
}
var markTestRandmon = 0;
function makeReqJson(params, mark) {
    var json = new Object();
    for (var i = 0; i < params.length; i++) {
        json['p' + i] = params[i];
    }
    json['b'] = fullHeadBak(params.length);
    if (mark)
        json['m'] = mark;
    else if (markTestRandmon % 2 == 0) {
        json['m'] = "testMark" + markTestRandmon++;
        markTestRandmon++;
    }

    return json;
}

function wsSendReq(ws, params, mark) {
    wsSend(ws, makeReqJson(params, mark));
}

function doLogSendReq(actionName, ws, params, mark) {
    doLog(actionName, function () {
        wsSendReq(ws, params, mark);
    })
}

function makeWSProxy(url, onmsg, onopen, onclose, onerror) {
    var beginShakingTime = (new Date());
    log("开始连接服务器 " + beginShakingTime.format("yyyy-MM-dd hh:mm:ss.S"))
    var websocket = (new WebSocket(url));
    var ws = websocket;
    websocket.onopen = function (evt) {
        log(evt.data);
        var endShakingTime = (new Date());
        log("服务器连接成功 " + endShakingTime.format("yyyy-MM-dd hh:mm:ss.S"));
        if (onopen) {
            var timecost = endShakingTime.getTime() - beginShakingTime.getTime();
            log(timecost)
            onopen(evt);
        }
    };
    websocket.onclose = function (evt) {
        log('*close' + evt.data + "time:" + (new Date()).format("yyyy-MM-dd hh:mm:ss.S"));
        if (onclose)
            onclose(evt);
    };
    websocket.onmessage = function (evt) {
        extractor(evt);
        log(evt.data);
        var json = toJson(evt.data)
        if (json.h != undefined && json.h.s == undefined) {
            if (onmsg) {
                if (json.h.m != undefined & json.h.m.t != undefined) {
                    var timecost = new Date().getTime() - json.h.m.t
                    log(timecost)
                }
                onmsg(evt);
            }
        } else {
            onmsg(evt);
            log(evt.data);
        }

    };
    websocket.onerror = function (evt) {
        log("*error " + evt.data + "time:" + (new Date()).format("yyyy-MM-dd hh:mm:ss.S"));
        if (onerror)
            onerror(evt);
    };
    var obj = new Object();
    obj.self = websocket;
    obj.loadCategory = function (mark) {
        doLogSendReq("loadCategory", websocket, [ "load", "category" ], mark);
    };
    obj.bind = function (snsUid, snsType, token, mark) {
        doLogSendReq("sendBind", websocket, [ "accounts", "bind", snsUid,
            snsType, token ], mark);
    };
    obj.customBind = function (snsUid, snsType, token, mark, level) {
        if (undefined == level)
            level = 0
        doLogSendReq("sendBind", websocket, [ "accounts", "customBind", snsUid,
            snsType, token, level ], mark);
    };
    obj.autoLogin = function (platform, language, version, mobileId, snsUid, snsType, token, mark) {
        doLogSendReq("sendAutoLogin", websocket, [ "accounts", "autoLogin",
                snsUid, snsType, token,
                makeAutoLoginStar(platform, language, version, mobileId) ],
            mark);
    };
    obj.initSocket = function (platform, language, version, mobileId, mark) {
        doLogSendReq("sendInitSocket", websocket, [ "setting", "socketInit",
            platform, language, version, mobileId ], mark);
    };

    obj.queryUserInfoList = function (path, selfOrFriends, mark) {
        doLogSendReq("sendQueryUserInfoList", ws, [ "otherUser",
            "queryDbByOtherId", selfOrFriends, path ], mark);
    };
    obj.queryAccountsByOtherId = function (path, selfOrFriends, mark) {
        doLogSendReq("sendQueryAccount" + "-" + selfOrFriends, ws, [
                "accounts", 'queryDbByOtherId', 'list', selfOrFriends, path ],
            mark);
    };

    obj.queryPrivacyByOtherId = function (path, selfOrFriends, mark) {
        doLogSendReq("sendQueryPrivacy" + "-" + selfOrFriends, ws, [ "privacy",
            "query", selfOrFriends, path ], mark)
    };

    obj.queryFriendsByOtherId = function (path, listOrCount, mark) {
        doLogSendReq("sendQueryFriends" + "-" + listOrCount, ws, [ 'routeList',
            'queryDbByOtherId', listOrCount, path ], mark);
    };
    /****privacy Setting***/
    obj.setPrivacy = function (accessType, accessLevel, otherId, mark) {
        doLogSendReq("setPrivacy", ws,
            [ "privacy", "setting", accessType, accessLevel, otherId ], mark);
    };

    obj.initPrivacy = function (mark) {
        doLogSendReq("initPrivacy", ws,
            [ "privacy", "init" ], mark);

    };
    /** ********************localuser About********************** */
    obj.updateLocalUserInfo = function (action, localInfo, mark) {
        doLogSendReq("sendUpdateLocalUserInfo" + "-" + action, ws, ['localUser', action, localInfo ], mark);
    };
    obj.updateLocalUserTags = function (tags, mark) {
        doLogSendReq("sendUpdateLocalUserTags" + "-" + tags, ws, [ 'localUser', 'updateTags', tags ], mark);
    };
    obj.linkInfoToOtherAcc = function (otherAccs, action, mark) {
        doLogSendReq("sendLinkInfoToOtherAcc", ws, [ 'localUser',
            'linkInfoToOtherAcc', otherAccs, action ], mark);
    };
    obj.queryLocalUserInfo = function (privateOrProtected, selects, selfOrFriends, path, mark) {
        doLogSendReq("sendQueryLocalUserInfo" + "-" + privateOrProtected, ws, [
            'localUser', 'queryDb' + privateOrProtected + 'BylocalId',
            selects, selfOrFriends, path ], mark);
    };
    obj.updateLocalUserGeoPoint = function (longitude, latitude, mark) {
        doLogSendReq("sendUpdateGeoPoint" + "- (" + longitude + "," + latitude + ")", ws, [
            'localUser', 'updateGeoPoint', longitude, latitude ], mark);
    };
    /** ********************************************* */

        // 用户标签
    obj.updateTags = function (target, tags, mark) {
        doLogSendReq("updateLocalUserTags", ws, [ "tags", "update", target, tags ], mark);
    };

    obj.saveMobileId = function (mobileId, mark) {
        doLogSendReq("sendSaveMobileIdMsg", ws, [ "localUser",
            "updateMobileId", mobileId ], mark);
    };
    obj.setVersion = function (platform, language, clientVersion, mark) {
        doLogSendReq("sendSetVersion", websocket, [ "setting", "setVersion",
            platform, language, clientVersion ], mark);
    };
    obj.updateMobileId = function (mobileId, mark) {
        doLogSendReq("sendUpdateMobileId", ws, [ "localUser", "updateMobileId",
            mobileId ], mark);
    };

    // 通知模块
    obj.readInformMsgByPage = function (startTime, limits, mark) {
        doLogSendReq("readNotification limit " + limits, ws,
            [ "notification", "init", startTime, limits ], mark);
    };

    // 开关
    obj.settingOption = function (option, action, mark) {
        doLogSendReq("settingOption", ws, [ "setting", option, action ], mark);
    };
    obj.updateFriendsByOtherId = function (path, listOrCount, mark) {
        doLogSendReq("sendQueryFriends" + "-" + listOrCount, ws, [ 'routeList',
            'upsertAndReturn', listOrCount, path ], mark);
    };
    obj.updateUserInfosByOtherId = function (path, selfOrFriends, mark) {
        doLogSendReq("updateUserInfosByOtherId" + "-" + selfOrFriends, ws, [
            'otherUser', 'upsertAndReturn', selfOrFriends, path ], mark);
    };
    obj.accountSetting2 = function (otherUserId, action, oldLocalId, mark) {
        doLogSendReq("accountSetting:" + action, websocket, [ "accounts",
            "setting", otherUserId, action , oldLocalId], mark);
    };
    obj.accountSetting = function (otherUserId, action, mark) {
        doLogSendReq("accountSetting:" + action, websocket, [ "accounts",
            "setting", otherUserId, action ], mark);
    };
    // 账号选择 otherUserIds 为多个otherId组成的字符串
    obj.accountSelect = function (otherUserIds, localId, mark) {
        if (undefined != localId)
            doLogSendReq("accountSelect:", websocket, [ "accounts", "setting",
                otherUserIds, "select", localId ], mark);
        else
            doLogSendReq("accountSelect:", websocket, [ "accounts", "setting",
                otherUserIds, "select" ], mark);
    }
    // action 为 accsAllInfo majorAccInfo
    obj.getSelfInfo = function (action, mark) {
        doLogSendReq("getMajorOtherId:", websocket, [ "accounts",
            "initSelfInfo", action ], mark);
    }
    obj.updateLocalInfo = function (action, attr, mark) { // 过期接口 激活接口 注意更改名称
        doLogSendReq("updateLocalInfo", ws, [ "localUser", action, attr ], mark);
    };
    obj.indirectFriends = function (path, listOrCount, mark) {
        doLogSendReq("indirectFriends" + "-" + listOrCount, ws, [ 'routeList',
            'indirectFriends', listOrCount, path ], mark);
    };
    obj.indirectFriendInfos = function (path, selfOrFriends, mark) {
        doLogSendReq("indirectFriendInfos" + "-" + selfOrFriends, ws, [
            'otherUser', 'indirectFriends', selfOrFriends, path ], mark);
    };
    obj.accountInvite = function (toId, content, mark) {
        doLogSendReq("accountInvite", ws, [ 'accounts', 'request',
            'friendsInvite', toId, content ], mark);
    };
    obj.qrcode = function (toId, content, url, mark) {
        doLogSendReq("sns-qrcode", ws, [ 'sns', 'status',
            'qrcode', toId, content, url ], mark);
    };
    obj.snsShare = function (toId, mark) {
        doLogSendReq("accountInvite", ws, [ 'accounts', 'request', 'share',
            toId ], mark);
    };
    obj.fullowing = function (toId, mark) {
        doLogSendReq("accountInvite", ws, [ 'accounts', 'request',
            'friendsRequest', toId ], mark);
    };

    obj.systemAddVersion = function (platform, localLanguage, lastVersion, criticalVersion, message, title, url, mark) {
        doLogSendReq("systemAddVersion", ws, [ 'system', 'addVersion',
            platform, localLanguage, lastVersion, criticalVersion, message,
            title, url ], mark);
    };

    obj.feedback = function (content, mark) {
        doLogSendReq("feedback", ws, [ "localUser", "feedback", content ], mark);
    };

    obj.suggestion = function (content, email, mark) {
        doLogSendReq("suggestion", ws,
            [ "system", "suggestion", content, email ], mark);
    };

    obj.initAccounts = function (mark) {
        doLogSendReq("sendInitAccount" + "-" + self, ws, [ "accounts",
            'init&tokenAndInfo' ], mark);
    };

    // 常用联系人
    obj.addContact = function (sender, path, mark) {
        doLogSendReq("addContact", ws, [ "localUser", "contact", "add", sender,
            path ], mark);
    };
    obj.listContact = function (mark) {
        doLogSendReq("listContact", ws, [ "localUser", "contact", "list" ],
            mark);
    };
    obj.removeContact = function (sender, target, mark) {
        doLogSendReq("removeContact", ws, [ "localUser", "contact", "remove",
            sender, target ], mark);
    };
    /** **********************************信任联系人************************************ */
        // 信任联系人
    obj.addTrustContact = function (otherIds, typz, mark) {
        doLogSendReq("addContact", ws, [ "trustContact", "add", otherIds, typz ], mark);
    };
    obj.listTrustContact = function (mark) {
        doLogSendReq("listContact", ws, [ "trustContact", "list" ], mark);
    };
    obj.initTrustContact = function (mark) {
        doLogSendReq("listContact", ws, [ "trustContact", "init" ], mark);
    }
    obj.removeTrustContact = function (otherIds, mark) {
        doLogSendReq("removeContact", ws, [ "trustContact", "remove", otherIds ], mark);
    };
    obj.updateTrustContactAlias = function (otherId, alias, mark) {
        doLogSendReq("updateContactAlias", ws, [ "trustContact", "updateAlias", otherId, alias ], mark);
    };

    // *****************************内容相关**************************************//

    obj.postStatus = function (otherId, type, bgUrl, content, img, isSync, mark) {
        doLogSendReq("post a status", websocket, [ "status", "post", otherId, type, bgUrl, content, img, isSync ], mark);
    };
    obj.postStatusWithGeo = function (otherId, type, bgUrl, content, img, isSync, location, coordinates, mark) {
        doLogSendReq("post a status", websocket, [ "status", "post", otherId, type, bgUrl, content, img, isSync, location, coordinates], mark);
    };
    obj.commentStatus = function (otherId, statusId, type, content, mark) {
        doLogSendReq("comment a status", websocket, [ "status", "comment",
            otherId, statusId, type, content ], mark);
    };
    obj.likeStatus = function (otherId, statusId, mark) {
        doLogSendReq("like a status", websocket, [ "status", "like",
            otherId, statusId ], mark);
    };
    obj.delStatus = function (realTarget, otherId, targetId, mark) {
        doLogSendReq("del a status", websocket, [ "status", "del", realTarget,
            otherId, targetId ], mark);
    };
    obj.initStatus = function (mark) {
        doLogSendReq("init", websocket, [ "status", "init" ], mark);
    };
    obj.initStatus2 = function (mark) {
        doLogSendReq("init2", websocket, [ "status", "init2" ], mark);
    };
    obj.listStatus = function (otherId, realTarget, resultType, limit, timestamp, mark) {
        doLogSendReq("listStatus", websocket, [ "status", "list", otherId, realTarget, resultType, limit, timestamp ], mark);
    };
    obj.listStatus2 = function (otherId, realTarget, resultType, limit, mark) {
        doLogSendReq("listStatus", websocket, [ "status", "list", otherId, realTarget, resultType, limit ], mark);
    };
    obj.recommendStatus = function (otherId, limit, timestamp, mark) {
        doLogSendReq("recommendStatus", websocket, [ "status", "recommend", otherId, limit, timestamp ], mark);
    };
    obj.recommendStatus2 = function (otherId, limit, timestamp, mark) {
        doLogSendReq("recommendStatus", websocket, [ "status", "recommend", otherId, limit], mark);
    };
    obj.commments = function (statusId, limit, timestamp, mark) {
        doLogSendReq("post a status", websocket, [ "status", "comments", statusId, limit, timestamp ], mark);
    };

    // *********************对话Dao*****************************************//
    obj.chatAutoReplyDealing = function (actionType, settingMsg, isOn, targetUid, mark) {
        if (actionType == "getReply")
            doLogSendReq("get your chat automated reply settings", websocket, [ "chat", "accessory", "getReply" ], mark);
        else if (actionType == "setReply")
            doLogSendReq("set your chat automated reply items", websocket, [ "chat", "accessory", "setReply", settingMsg, isOn, targetUid ], mark);
    };
    obj.createChatSession = function (sender, tos, mark) {
        // {"p0o":"q:benbenaiyy1314", "p1i":["q:eq-primos"]}
        doLogSendReq("send create chatSession", websocket, [ "chat", "create", sender, tos ], mark);
    };
    obj.applyChatGroup = function (from, action, actionValue, chatId, mark, toId) {
        if (undefined == toId || null == toId || "" === toId)
            doLogSendReq("stranger applying a chat group", websocket, [ "chat", "apply",
                from, action, actionValue, chatId ], mark);
        else
            doLogSendReq("admin answer a chat group applying", websocket, [ "chat", "apply",
                from, action, actionValue, chatId, toId ], mark);
    };
    obj.chatGroupNickname = function (from, chatId, action, nickname, mark, targetUid) {
        if (undefined == targetUid || null == targetUid || "" == targetUid)
            doLogSendReq("update his own group nickname", websocket, [ "chat", "nickname",
                from, chatId, action, nickname], mark);
        else
            doLogSendReq("master updates your group nickname", websocket, [ "chat", "nickname",
                from, chatId, action, nickname, targetUid], mark);
    };
    //db.chatOtherId, "name",      str,    chatId, "更改群名称"
    obj.chatOptionSetting = function (from, action, actionValue, chatId, mark) {
        doLogSendReq("send chat session setting", websocket, [ "chat", "update", from, action, actionValue, chatId ], mark);
    };
    obj.chatMinorOptionSetting = function (from, option, optionValue, chatId, mark) {
        doLogSendReq("send chat group option of int value", websocket, [ "chat", "setting", from, option, optionValue, chatId ], mark);
    };
    obj.chatLocationUpdating = function (from, nation, province, city, longitude, latitude, chatId, mark) {
        doLogSendReq("send chat session location", websocket, [ "chat",
            "location", from, makeChatSessionLocation(nation, province, city), chatId,
            longitude, latitude ], mark);
    };
    obj.chatUpdateTags = function (sender, chatId, tags, mark) {
        doLogSendReq("send chat session setting", websocket, [ "chat",
            "updateTags", sender, chatId, tags ], mark);
    };
    obj.chatMemManage = function (action, from, targetOrPath, chatId, mark) {
        if (targetOrPath == undefined || "" == targetOrPath) {
            doLogSendReq("send member management info", websocket, [ "chat",
                action, from, chatId ], mark);
        } else {
            doLogSendReq("send member management info", websocket, [ "chat",
                action, from, targetOrPath, chatId ], mark);
        }

    };
    obj.chatSendMessage = function (from, content, type, chatId, mark) {
        doLogSendReq("send message", websocket, [ "chat", "sendMsg", from,
            content, type, chatId ], mark);
    };
    // fromOtherIds 数组
    obj.getChatHistory = function (fromOtherIds, mark) {
        doLogSendReq("send get chat history", websocket, [ "chatInit",
            "getUnreadMsg", fromOtherIds ], mark);
    };
    // chatIds 是数组
    obj.getChatDetail = function (chatIds, mark) {
        doLogSendReq("send get message of chat order", websocket, [ "chatInit",
            "getChatDetail", chatIds ], mark);
    };
    // account 是数组 //过期
    obj.getRouteLog = function (account, mark) {
        doLogSendReq("send get message of chat order", websocket, [ "chatInit",
            "getRouteLogs", account ], mark);

    };
    // 过期
    obj.getRouteInfos = function (chatIds, mark) {
        doLogSendReq("send get route infos", websocket, [ "chatInit",
            "getRouteInfos", chatIds ], mark);
    };

    // 群：邀请人加入群
    obj.inivteOtherId = function (path, mark) {
        doLogSendReq("send get message of chat order", websocket, [
            "otherUser", "inviteAccount", 'self', path ], mark);
    };

    obj.queryBindStatusHistory = function (path, friendsOrTrust, mark) {
        doLogSendReq("send get message of List and history", websocket, [
            "queryHistory", "bindHistory", friendsOrTrust, path ], mark);
    }
    // action friendsInfo selfInfo
    obj.queryPersonalSelfInfo = function (action, path, mark) {
        doLogSendReq("send get 资料页信息", websocket, [ "queryPersonalInfo",
            action, path ], mark)
    };
    obj.queryPersonalFriendInfo = function (action, path, num, mark) {
        doLogSendReq("send get 资料页信息", websocket, [ "queryPersonalInfo",
            action, path, num ], mark)
    };

    obj.apnsToken = function (token) {
        if (token == undefined)
            doLogSendReq(
                "send apns token msg",
                websocket,
                [ "login", "updatePushToken",
                    "2303d96caf117884dd8291654c79b6e3b06fa0b6959b372e0aea1e290f4a4aca" ])
        else
            doLogSendReq("send apns token msg", websocket, [ "login",
                "updatePushToken", token ])
    };

    obj.updateLanguage = function (language, mark) {
        doLogSendReq("updateLanguage", ws,
            [ "setting", 'setLanguage', language ], mark);
    };

    // --搜索

    obj.conditionsSearch = function (searchName, gender, ageLowerBound, ageUpperBound, location, limit, index, mark) {
        doLogSendReq("send condistionsSearch", websocket, [ "search",
            "searchByConditions", searchName, limit, index, gender,
            location, ageLowerBound, ageUpperBound ], mark)
    };
    obj.conditionsSearchName = function (searchName, limit, index, mark) {
        doLogSendReq("send condistionsSearch names", websocket, [ "search",
            "searchByConditions", searchName, limit, index ], mark)
    };
    obj.search = function (searchName, mark) {
        doLogSendReq("send globalSearch by name msg", websocket, [ "search",
            "searchByName", searchName ], mark)
    };
    obj.searchByUserName = function (searchName, limit, timestamp, mark) {
        doLogSendReq("send textSegmentsSearch by id msg", websocket, [ "textSegments", "searchByUserName", searchName, limit, timestamp], mark)
    };
    obj.initTextSegments = function (mark) {
        doLogSendReq("send initTextSegments by id msg", websocket, [ "textSegments", "init"], mark)
    }
    obj.stop = function (mark) {
        doLogSendReq("send stop globalSearch by name msg", websocket, [
            "search", "stopSearch" ], mark)
    };
    obj.cloudSearch = function (searchName, page, size, mark) {
        doLogSendReq("send globalCloudSearch by name msg", websocket, [
            "cloudSearch", "searchByName", searchName, page, size ], mark)
    };

    obj.logout = function () {
        doLogSendReq("send apns logout msg", websocket, [ "login", "logout" ])
    };
    obj.test = function () {
        doLogSendReq("send wrong thing", websocket, [ "fff", "fff" ])
    };

    // --更新token
    obj.updateToken = function (otherId, token, mark) {
        doLogSendReq("update token ....", websocket, [ "update", "token", otherId, token ], mark)
    };

    // --RocketSpace相关
    obj.sectionInit = function (mark) {
        doLogSendReq("SectionInit", websocket, [ "section", "init"], mark)
    }

    obj.sectionAddOrRemoveMember = function (operation, sectionId, otherIds, mark) {
        doLogSendReq("SectionAddOrRemoveMember", websocket, [ "section", operation, sectionId, otherIds], mark)
    }

    obj.querySection = function (sectionIds, mark) {
        doLogSendReq("QuerySection", websocket, [ "section", "query", sectionIds], mark)
    }

    obj.showIntroduction = function (sectionId, mark) {
        doLogSendReq("ShowIntroduction", websocket, [ "introduction", "show", sectionId], mark)
    }

    obj.updateIntroductionInfo = function (sectionId, sectionInfo, mark) {
        doLogSendReq("UpdateIntroductionInfo", websocket, ["introduction", "update", sectionId, sectionInfo ], mark);
    };

    // 手机用户相关的一些
    obj.mobileUserLogin = function (locale, areaCode, phoneNumber, mark) {
        doLogSendReq("MobileUserLogin", websocket, [ "mobileUser",
            "authorize", locale, areaCode, phoneNumber ], mark)
    };
    obj.mobileVerify = function (captcha, mark) {
        doLogSendReq("MobileVerify", websocket, [ "mobileUser", "verifiyAction",
            "checkCaptcha", captcha ], mark)
    };
    obj.mobileObtainCodeVerify = function (captcha, snsType, mark) {
        doLogSendReq("mobileObtainCodeVerify", websocket, [ "mobileUser", "verifiyCode",
            snsType , captcha ], mark)
    };
    obj.mobileObtainCode = function (locale, areaCode, phoneNumber, snsType, mark) {
        doLogSendReq("mobileObtainCode", websocket, [ "mobileUser", "obtain",
            locale, areaCode, phoneNumber, snsType], mark)
    };
    obj.resetCaptcha = function (mark) {
        doLogSendReq("Reset Captcha", websocket,
            [ "mobileUser", "resetCaptcha" ], mark)
    };
    obj.setUserInfo = function (otherId, userName, headRef, mark) {
        doLogSendReq("Set user Info", websocket, [ "mobileUser",
            "setUserInfoAction", otherId, userName, headRef ], mark)
    };
    obj.syncContacts = function (otherUid, contacts, mark) {
        doLogSendReq("SyncMobileContacts", websocket, [ "mobileUser",
            "syncContacts", otherUid, contacts ], mark)
    };
//, 66375.21107225525, ["se:m:37664649834954~-1891294528459811035"]
    obj.getGroupsByDistance = function () {
        doLogSendReq("getByDistance", websocket, [ "topsPage",
            "groupsByDistance", [116.3539772679896, 40.18194358943014], 30, 13397505.75768729, ["se:q:jianrentan8425~4685216756464741645"]], "mark")
    };
    obj.getPeopleByDistance = function () {
        doLogSendReq("getByDistance", websocket, [ "topsPage",
            "personByDistance", [116.3541630587947, 40.18196736480039], 20, 0, []], "mark")
    }
    obj.getStatusByDistance = function () {
        doLogSendReq("getByDistance", websocket, [ "topsPage",
            "statusByDistance", [12.5, 25.5], 3, 0, []], "mark")
    }
    obj.getPeopleByDistance2 = function (limit, distance, last, mark) {
        doLogSendReq("getByDistance", websocket, [ "topsPage",
            "personByDistance", [116.479253991613, 39.9973768908142], limit, distance, [last]], mark)
    }
    obj.getStatusByDistance2 = function (limit, distance, last, mark) {
        doLogSendReq("getByDistance", websocket, [ "topsPage",
            "statusByDistance", [116.3541630587947, 40.18196736480039], limit, distance, [last]], mark)
    }
    obj.getGroupsByDistance2 = function (limit, distance, last, mark) {
        doLogSendReq("getByDistance", websocket, [ "topsPage",
            "groupsByDistance", [116.3541630587947, 40.18196736480039], limit, distance, [last]], mark)
    }
    obj.createNewEvent = function (name, pier, desc, startTime, lastTime, roles, mark) {
        doLogSendReq("events", websocket, ["events", "createNewEvent", name, pier, desc, startTime, lastTime, roles], mark)
    }

    //["events", "createNewEvent", name, pier, desc, loc, startTime, lastTime, roles,Longitude,Latitude]
    obj.createNewEvent2 = function (name, pier, desc, loc, startTime, lastTime, roles, longitude, latitude, mark) {
        doLogSendReq("events", websocket, ["events", "createEvent", name, pier, desc, loc, startTime, lastTime, roles, longitude, latitude], mark)
    }

    //["events", "createNewEvent", name, pier, desc, loc, startTime, lastTime, roles,Longitude,Latitude]
    obj.acviteEvent = function (eventId, criteria, mark) {
        doLogSendReq("events", websocket, ["events", "activeEvent", eventId, criteria], mark)
    }

    //{"p0":"events","p1":"join","p2":"ev:joZhU07Q50iBECH","p3":"s:1856265441","p4":0}
    obj.joinEvent = function (eventId, otherUid, role, mark) {
        doLogSendReq("events", websocket, ["events", "joinEvent", eventId, otherUid, role], mark)
    }
    obj.getEventByDistance = function (limit, distance, last, mark) {
        doLogSendReq("getByDistance", websocket, [ "events", "eventByDistance", [116.3, 39.3], limit, distance, [last]], mark)
    }

    //{"p0":"events","p1":"addExhibitor","p2":"ev:joZhU07Q50iBECH","p3":"keeeweee","p4":"logo","p5":"desc","p6":"location","p7":"category"}
    obj.addExhibitor = function (eventId, name, logo, desc, location, category, mark) {
        doLogSendReq("events", websocket, ["events", "addExhibitor", eventId, name, logo, desc, location, category], mark)
    }

    // {"p0":"events","p1":"getParticipants","p2":"ev:joZhU07Q50iBECH"}
    obj.getParticipants = function (eventId, mark) {
        doLogSendReq("events", websocket, ["events", "getParticipants", eventId], mark)
    }

    //{"p0":"events","p1":"createExhibitor","p2":"ev:joZhU07Q50iBECH","p3":"s:1856265441","p4":"keeeweee","p5":"logo","p6":"desc","p7":"location","p8":"category"}
    obj.createExhibitor = function (eventId, otherUid, name, logo, desc, location, category, mark) {
        doLogSendReq("events", websocket, ["events", "createExhibitor", eventId, otherUid, name, logo, desc, location, category], mark)
    }

    //eventName, eventPier, name, logo, desc, location, category
    obj.addAnExhibitor = function (eventName, eventPier, name, logo, desc, location, category, mark) {
        doLogSendReq("events", websocket, ["events", "addAnExhibitor", eventName, eventPier, name, logo, desc, location, category], mark)
    }
    obj.getExhibitorList = function (eventId, mark) {
        doLogSendReq("events", websocket, ["events", "getExhibitorList", eventId], mark)
    }
    obj.getExhibitorInfo = function (exhibitorId, mark) {
        doLogSendReq("events", websocket, ["events", "getExhibitorInfo", exhibitorId], mark)
    }
    obj.updateExhibitor = function (exhibitorId, name, logo, desc, location, category, mark) {
        doLogSendReq("events", websocket, ["events", "updateExhibitor", exhibitorId, name, logo, desc, location, category], mark)
    }
    obj.addExhibitorMember = function (exhibitorId, otherIds, mark) {
        doLogSendReq("events", websocket, ["events", "addExhibitorMember", exhibitorId, otherIds], mark)
    }
    obj.fireExhibitorMember = function (exhibitorId, otherIds, mark) {
        doLogSendReq("events", websocket, ["events", "fireExhibitorMember", exhibitorId, otherIds], mark)
    }
    obj.joinExhibitor = function (exhibitorId, otherId, mark) {
        doLogSendReq("events", websocket, ["events", "joinExhibitor", exhibitorId, otherId], mark)
    }
    obj.quitExhibitor = function (exhibitorId, otherId, mark) {
        doLogSendReq("events", websocket, ["events", "quitExhibitor", exhibitorId, otherId], mark)
    }
    return obj;
}

// 获取 好友平台
function getSnsPlatform(str) {
    return str.split(":")[0];
};
// 判定是json否空
function isEmptyObject(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
};
// json操作集
function jsonAppend(j1, j2) {
    if (isEmptyObject(j2)) {
        return j1;
    } else if (isEmptyObject(j1)) {
        return j2;
    } else {
        var j1s = JSON.stringify(j1);
        var j2s = JSON.stringify(j2);
        return JSON.parse(j1s.slice(0, (j1s.length - 1)) + ","
            + j2s.slice(1, +j2s.length));
    }
};
