/**
 * Created by primos on 14-8-20.
 */
function connect() {
    if (autoBind)
        wsp = makeWSProxy(wsUrl, function (evt) {
                var json = toJson(evt.data);
                if (json.h) {
                    if (json.h["p0"] == "setting") {
                        if (json.h["p1"] == "socketInit") {
                            bindFn();
                        }
                    }
                }
            }
            ,
            function () {
                socketInit();
            }
        );
    else
        wsp = makeWSProxy(wsUrl)
}
function reconnect(wsUrl) {
    var wsUrl = $("#system_wsUrl_url").val()
    wsp = makeWSProxy(wsUrl);
}
function customerLogin() {
    wsp = makeWSProxy(wsUrl2, function (evt) {
            var json = toJson(evt.data);
            if (json.h) {
                if (json.h["p0"] == "setting") {
                    if (json.h["p1"] == "socketInit") {
                        var accounts_bind_id = $("#customer_login_id").val();
                        var accounts_bind_token = $("#customer_login_token").val();
                        var accounts_bind_type = $("#customer_login_type").val();
                        var accounts_bind_token_arr = strToArr(accounts_bind_token)
                        bindFn(accounts_bind_id, accounts_bind_type, makeToken(accounts_bind_token_arr));
                    }
                } else if (json.h["p0"] == "accounts") {
                    alert("hello world")
                }
            }
        },
        function () {
            var accounts_socketInit_locale = "zh_CN";
            var accounts_socketInit_device = "ios";
            var accounts_socketInit_version = "1.0.0"
            var accounts_socketInit_mobile = "web"
            socketInit(accounts_socketInit_locale, accounts_socketInit_device, accounts_socketInit_version, accounts_socketInit_mobile);
        }
    );
}