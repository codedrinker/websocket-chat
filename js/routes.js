/**
 * Created by primos on 14-8-20.
 */
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
                }
            }
        },
        function () {
            socketInit("zh_CN", "ios", "1.0.0", "web");
        }
    );
}

function beBind() {
    bindFn("1404796754", "i", strToArr("1404796754.7e10326.094011dc2e964942a98461bbb334b36c"));
}
/**
 * 加载网页的时候连接socket,做相关初始化
 */
function connect() {
    if (autoBind)
        wsp = makeWSProxy(wsUrl2, function (evt) {
//                extractor(evt);
            },
            function () {
                wsp.initSocket("ios", "zh_CN", "1.0.0", "primos-pc", {
                    auto: true,
                    m: "版本初始化"
                });
            }
        )
        ;
    else
        wsp = makeWSProxy(wsUrl2, function (evt) {
            extractor(evt);
        })
}
/**
 * 获得url重连socket
 * @param wsUrl
 */
function reconnect(wsUrl) {
    var wsUrl = $("#system_wsUrl_url").val()
    wsp = makeWSProxy(wsUrl);
}

/**
 * 初始化数据
 */
function init() {
    register();
    connect();
    layoutInitializator();
}