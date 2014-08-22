/**
 * Created by primos on 14-8-21.
 */

function extractor(evt) {
    var json = toJson(evt.data);
    if (json.h) {
        if (json.h["p0"] == "setting") {
            if (json.h["p1"] == "socketInit") {
                if (json.h["m"].auto = true)
                    bindFn();
            }
        } else if (json.h["p0"] == "accounts") {
            if (json.h["p1"] == "bind") {
                log("success")
            }
        }
    }
}