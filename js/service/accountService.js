/**
 * Created by primos on 14-8-20.
 */

/**
 * 绑定
 * @param accounts_bind_id
 * @param accounts_bind_type
 * @param accounts_bind_token
 */
function bindFn(accounts_bind_id, accounts_bind_type, accounts_bind_token) {
    if ("" == accounts_bind_id || accounts_bind_id == undefined) {
        accounts_bind_id = getValueById("accounts_bind_id")
    }
    if ("" == accounts_bind_type || accounts_bind_type == undefined) {
        accounts_bind_type = getValueById("accounts_bind_type")
    }
    if ("" == accounts_bind_token || accounts_bind_token == undefined) {
        accounts_bind_token = getValueById("accounts_bind_token")
        accounts_bind_token = strToArr(accounts_bind_token)
    }
    wsp.bind(accounts_bind_id, accounts_bind_type, makeToken(accounts_bind_token), {
        auto: false,
        m: "绑定帐号"
    });
}

/**
 * 绑定前初始化socket
 * @param accounts_socketInit_locale
 * @param accounts_socketInit_device
 * @param accounts_socketInit_version
 * @param accounts_socketInit_mobile
 */
function socketInit(accounts_socketInit_locale, accounts_socketInit_device, accounts_socketInit_version, accounts_socketInit_mobile) {
    var accounts_socketInit_locale = $("#accounts_socketInit_locale").val()
    var accounts_socketInit_device = $("#accounts_socketInit_device").val()
    var accounts_socketInit_version = $("#accounts_socketInit_version").val()
    var accounts_socketInit_mobile = $("#accounts_socketInit_mobile").val()
    wsp.initSocket(accounts_socketInit_device, accounts_socketInit_locale, accounts_socketInit_version, accounts_socketInit_mobile, {
        auto: true,
        m: "版本初始化"
    });
}

/**
 * 更新语言
 * @param language
 */
function changeLanguageFn(language) {
    if ("" == language || language == undefined) {
        language = getValueById("accounts_setLocal_locale")
    }
    wsp.updateLanguage(language, "更换语言");
}