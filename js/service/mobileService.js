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