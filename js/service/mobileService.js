/**
 * Created by primos on 14-8-20.
 */

/**
 * 更新手机用户资料
 * @param otherId
 * @param username
 * @param headRef
 */
function setMobileUserInfoFn(otherId, username, headRef) {
    if ("" == otherId || otherId == undefined)
        otherId = getValueById("mobile_update_otherid");
    if ("" == username || username == undefined)
        username = getValueById("mobile_update_nickname");

    if ("" == headRef || headRef == undefined)
        headRef = getValueById("mobile_update_headRef");
    wsp.setUserInfo(otherId, username, headRef, {
        m: "更新手机用户资料"
    });
}

function obtainMobleFn(locale, phoneNumber, areaCode, typz) {
    var locale = getValueById("obtain_mobile_locale")
    var phoneNumber = getValueById("obtain_mobile_phone")
    var areaCode = getValueById("obtain_mobile_areacode")
    var typz = getValueById("obtain_mobile_type")
    wsp.mobileObtainCode(locale, phoneNumber, areaCode, typz, "测试登陆");
}

function verifyObtainCode(captcha, typz) {
    var captcha = getValueById("verify_obtain_code_captcha")
    var typz = getValueById("verify_obtain_code_typz")
    wsp.mobileObtainCodeVerify(captcha, typz, "验证验证码是否正确");
}

