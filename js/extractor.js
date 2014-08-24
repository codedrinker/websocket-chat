/**
 * Created by primos on 14-8-21.
 */

function extractor(evt) {
    var json = toJson(evt.data);
    if (json.e) {
        //需要处理错误码
        handleError(json)
    } else if (json.h) {
        //请求成功
        if (json.h["p0"] == "setting") {
            if (json.h["p1"] == "socketInit") {
                if (json.h["m"].auto = true)
                    beBind();
            }
        } else if (json.h["p0"] == "accounts") {
            if (json.h["p1"] == "bind") {
                var accounts = json.r.pop
                for (var index in accounts) {
                    floatAccountViewer(accounts[index].id, accounts[index].n, accounts[index].h)
                }
                wsp.initTrustContact("list");
            }
        }
        else if (json.h["p0"] == "trustContact") {
            if (json.h["p1"] == "init") {
                var contacts = json.r.info.u
                var defaultAccount = ""
                for (var index in contacts) {
                    defaultAccount = index
                    contactsListViewer(index, contacts[index].info.n, contacts[index].info.h)
                }
                wsp.listStatus2(defaultAccount, "trust", "text&image", 20, "初始化朋友圈")
            }
        } else if (json.h["p0"] == "status") {
            if (json.h["p1"] == "list") {
                var moments = json.r.info.l
                var infoObj = json.r.info.b
                for (var index in moments) {
                    var moment = moments[index].s
                    momentsListViewer(moment.u, infoObj[moment.u].n, infoObj[moment.u].h, moment.s, moment.p, moment.c, moment.t, moment.mc, moment.z, moment.i)
                }
            }
        }
    } else {
        //服务器错误
    }
}

function handleError(json) {
    if (json.e) {
        var err = json.e["c"]
        if (json.e["c"] == "205005")
            alert("缺啥参数")
        else if (err == "200002") {
            logout();
        }

    }
}