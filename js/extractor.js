/**
 * Created by primos on 14-8-21.
 */

function extractor(evt) {
    var json = toJson(evt.data);
    if (json.e)
        errorHander(json)
    else if (json.h) {
        if (json.h["s"])
            pushHandler(json);
        else {
            if (json.h["p0"] == "setting")
                settingHandler(json);
            else if (json.h["p0"] == "accounts")
                accountsHandler(json);
            else if (json.h["p0"] == "trustContact")
                contactsHandler(json);
            else if (json.h["p0"] == "status")
                momentsHandler(json);
            else if (json.h["p0"] == "chat")
                chatHandler(json);
        }
    } else {
        //服务器错误
    }
}

function errorHander(json) {
    if (json.e) {
        var err = json.e["c"]
        if (json.e["c"] == "205005")
            alert("缺啥参数")
        else if (err == "200002") {
            if (window.confirm('您的账号已经再其他地方登陆,重新登陆?')) {
                window.location.href = "index.html";
            }
        } else {

        }
    }
}
function chatHandler(json) {
    if (json.h["p1"] == "create") {
        var chatId = json.r["chatId"]
        var chatPaneId = "#return-alert"
        if (localStorage.chatId == chatId) {

        } else {
        }
        /*$(chatPaneId).attr({
         chat_id: chatId
         });*/
    } else {
    }
}

function momentsHandler(json) {
    if (json.h["p1"] == "list") {
        var moments = json.r.info.l
        var infoObj = json.r.info.b
        for (var index in moments) {
            var moment = moments[index].s
            momentsListViewer(moment.u, infoObj[moment.u].n, infoObj[moment.u].h, moment.s, moment.p, moment.c, moment.t, moment.mc, moment.z, moment.i)
        }
    }
}

function contactsHandler(json) {
    if (json.h["p1"] == "init") {
        var contacts = json.r.info.u
        var defaultAccount = ""
        for (var index in contacts) {
            defaultAccount = index
            contactsListViewer(index, contacts[index].info.n, contacts[index].info.h)
        }
        wsp.listStatus2(defaultAccount, "trust", "text&image", 20, "初始化朋友圈")
    }
}

function accountsHandler(json) {
    if (json.h["p1"] == "bind") {
        var accounts = json.r.pop
        for (var index in accounts) {
            floatAccountViewer(accounts[index].id, accounts[index].n, accounts[index].h)
        }
        wsp.initTrustContact("list");
        settingIniter();
    }
}

function settingHandler(json) {
    if (json.h["p1"] == "socketInit") {
        if (json.h["m"].auto = true)
            beBind();
    }
}

function pushHandler(json) {
    if (json.h["s"] == "chatMsg.online") {
        /**
         *
         "h": {
            "s": "chatMsg.online"
          },
         "info": [
         {
            "t": 1410281067970,
            "u": [
                "i:1404796754"
            ],
            "m": {
                "t": 0,
                "c": "然后呢。。"
            },
            "g": 0,
            "h": "se:i:1404796754~s:1971789097",
            "r": "s:1971789097"
        }
         ]
         }
         */
        var messages = json.info
        log(messages)
        for (var index in messages) {
            if (messages[index].h == localStorage.chatId) {
                if (messages[index].m.t == 0) {
                    replyMsg(messages[index].m.c)
                } else {
                    
                }

            } else {
            }
        }
    }
    else {
    }
}