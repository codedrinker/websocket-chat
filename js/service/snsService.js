/**
 * Created by primos on 14-8-20.
 */
/**
 * 分享二维码到社交平台
 * @param otherId
 * @param content
 * @param url
 */
function qrcodeFn(otherId, content, url) {
    if ("" == otherId || otherId == undefined) {
        otherId = getValueById("sns_qrcode_otherid");
    }
    if ("" == content || content == undefined)
        content = getValueById("sns_qrcode_content")
    if ("" == url || url == undefined)
        url = getValueById("sns_qrcode_url")
    wsp.qrcode(otherId, content, url, {
        auto: false,
        m: "分享二维码到社交平台"
    })
}

/**
 * 更新社交平台的token
 * @param otherId
 * @param token
 */
function updateTokenFn(otherId, token) {
    if ("" == otherId || otherId == undefined) {
        otherId = getValueById("sns_updateToken_otherid")
    }
    if ("" == token || token == undefined) {
        token = getValueById("sns_updateToken_token")
        token = strToArr(token)
    }
    wsp.updateToken(otherId, makeToken(token), "更新token");
}

/**
 * 更新本站用户的地址位置坐标
 * @param longitude
 * @param latitude
 */
function updateUserGeoPointFn(longitude, latitude) {
    if ("" == longitude || longitude == undefined) {
        longitude = getValueById("info_update_point_longitude")
    }
    if ("" == latitude || latitude == undefined) {
        latitude = getValueById("info_update_point_latitude")
    }
    wsp.updateLocalUserGeoPoint(longitude.toString(), latitude.toString(), "随时更新自己的地理位置坐标")

}

/**
 * 邀请别人加入
 * @param otherId
 * @param content
 */
function inviteFriendsFn(otherId, content) {
    if ("" == otherId || otherId == undefined) {
        otherId = getValueById("sns_invite_otherid");
    }
    if ("" == content || content == undefined)
        content = getValueById("sns_invite_content")
    wsp.accountInvite(otherId, content, "邀请别人加入App")
}

/**
 * 分享到社交平台
 * @param otherId
 * @param content
 */
function snsShareFn(otherId, content) {
    if ("" == otherId || otherId == undefined) {
        otherId = getValueById("sns_share_otherid");
    }
    wsp.snsShare(otherId, "分享")
}
