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
                for (var index in contacts) {
                    contactsListViewer(index, contacts[index].info.n, contacts[index].info.h)
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