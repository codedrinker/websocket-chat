/**
 * Created by primos on 14-8-22.
 */


function pollingForward() {
    var image = $("body").css("background-image")
    var index = (parseInt(image.substring(image.indexOf(".") - 1).substring(0, 1)) + 1) % 9
    $("body").css("background-image", "url('../image/res/bg" + index + ".jpg')");
}

function pollingBack() {
    var image = $("body").css("background-image")
    var index = (parseInt(image.substring(image.indexOf(".") - 1).substring(0, 1)) - 1 + 9) % 9
    $("body").css("background-image", "url('../image/res/bg" + index + ".jpg')");
}

function polling() {
    setInterval(function () {
        pollingForward();
    }, 20000);
}

function setPaneHeight(id, pir) {
    var height = $(window).height();
    var h = (parseInt(height) * pir) + "px";
    $("#" + id).css("height", h)
    log(h)
}

function setMenuPaneHeight(id) {
    setPaneHeight(id, 0.65)
}

function setChatPaneHeight(id) {
    setPaneHeight(id, 0.7)
}

function initFlowLayout() {
    polling();
    setChatPaneHeight("return-alert")
}