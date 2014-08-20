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
        )
        ;
    else
        wsp = makeWSProxy(wsUrl)
}
function reconnect(wsUrl) {
    var wsUrl = $("#system_wsUrl_url").val()
    wsp = makeWSProxy(wsUrl);
}