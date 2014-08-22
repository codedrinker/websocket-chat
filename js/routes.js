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

/**
 * 加载网页的时候连接socket,做相关初始化
 */
function connect() {
    if (autoBind)
        wsp = makeWSProxy(wsUrl, function (evt) {
                extractor(evt);
            },
            function () {
                socketInit(true);
            }
        )
        ;
    else
        wsp = makeWSProxy(wsUrl, function (evt) {
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

function polling() {
    setInterval(function () {
        pollingForward();
    }, 20000);
}

function setPaneHeight(id, pir) {
    var height = $(window).height();
    var h = (parseInt(height) * pir) + "px";
    $("#return-alert").css("height", h)
    $("#message").css("height", h)
}

function initPanePosition() {
    var height = $(window).height();
    var h = (parseInt(height) * 0.7) + "px";
    $("#head_float_pane").css("height", h)
    $("#menu_float_pane").css("height", h)
    $("#chat_float_pane").css("height", h)
    $("#return-alert").css("height", h)
    $("#message").css("height", h)
}

/**
 * 初始化数据
 */
function init() {
    connect();
    registerMachine();
    polling();
    initPanePosition();
}
/**
 * 注册机,其实这里主要是注册其他模块的一些模板,具体的模块注册再每一个注册机里面
 */
function registerMachine() {
    register();
}