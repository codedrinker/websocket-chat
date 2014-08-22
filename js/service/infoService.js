/**
 * Created by primos on 14-8-20.
 */

/**
 * 获取本站用户信息
 * @param path
 * @param friendsOrSelf
 */
function getLocalInfoFn(path, friendsOrSelf) {
    if (isEmptyOrUndefined(path, friendsOrSelf)) {
        wsp.queryLocalUserInfo("LocalInfo", "info", $$("info_get_localuser_target"), makeViewPath($$("info_get_localuser_type"), $$("info_get_localuser_path")), "获取用户自己本站资料")
    } else {
        wsp.queryLocalUserInfo("LocalInfo", "info", $$("info_get_localuser_target"), path, "获取用户自己本站资料")
    }
}

/**
 * 更新本站用户信息
 * @param firstName
 * @param lastName
 * @param brithday
 * @param gender
 * @param location
 * @param email
 * @param aSign
 */
function updateLocalUserInfoFn(firstName, lastName, brithday, gender, location, email, aSign) {
    if ("" == firstName || firstName == undefined) {
        firstName = getValueById("info_set_localuser_firstname")
    }
    if ("" == lastName || lastName == undefined) {
        lastName = getValueById("info_set_localuser_lastname")
    }
    if ("" == brithday || brithday == undefined) {
        brithday = getValueById("info_set_localuser_birthday")
        brithday = strToArr(brithday)
    }
    if ("" == gender || gender == undefined) {
        gender = getValueById("info_set_localuser_gender")
    }
    if ("" == location || location == undefined) {
        location = getValueById("info_set_localuser_location")
        location = strToArr(location)
    }
    if ("" == email || email == undefined) {
        email = getValueById("info_set_localuser_email")
    }
    if ("" == aSign || aSign == undefined) {
        aSign = getValueById("info_set_localuser_desc")
    }
    wsp.updateLocalUserInfo("updateLocalUserInfo", makeLocalUserInfoParam(firstName, lastName, makeTupleIntParam(brithday), gender, makeTupleParam(location), email, aSign), "更新本站用户资料");
}

function updateLocalUserTagsFn(tags) {
    if ("" == tags || tags == undefined) {
        tags = getValueById("info_set_tags_tag")
    }
    wsp.updateLocalUserTags(tags.split(","), "添加用户的标签");
}