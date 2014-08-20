/**
 * Created by primos on 14-8-20.
 */

/**
 * 获取广场内容
 * @param limit
 * @param distance
 * @param filter
 */
function getPeopleByDistanceFn(limit, distance, filter) {
    if ("" == limit || limit == undefined) {
        limit = parseInt(getValueById("discover_people_limit"))
    }
    if ("" == distance || distance == undefined) {
        distance = parseFloat(getValueById("discover_people_distance"))
    }
    if ("" == filter || filter == undefined) {
        filter = getValueById("discover_people_filter")
    }
    wsp.getPeopleByDistance2(limit, distance, filter, "搜索广场用户");

}

/**
 * 获取广场新鲜事
 * @param limit
 * @param distance
 * @param filter
 */
function getStatusByDistanceFn(limit, distance, filter) {
    if ("" == limit || limit == undefined) {
        limit = getValueById("discover_moments_limit")
    }
    if ("" == distance || distance == undefined) {
        distance = getValueById("discover_moments_distance")
    }
    if ("" == filter || filter == undefined) {
        filter = getValueById("discover_moments_filter")
    }
    wsp.getStatusByDistance2(limit, distance, filter, "搜索广场新鲜事");

}

/**
 * 获取广场群组
 * @param limit
 * @param distance
 * @param filter
 */
function getGroupByDistanceFn(limit, distance, filter) {
    if ("" == limit || limit == undefined) {
        limit = getValueById("discover_group_limit")
    }
    if ("" == distance || distance == undefined) {
        distance = getValueById("discover_group_distance")
    }
    if ("" == filter || filter == undefined) {
        filter = getValueById("discover_group_filter")
    }
    wsp.getGroupsByDistance2(limit, distance, filter, "搜索广场群组");

}
/**
 * 分词搜索
 */
function searchByUserNameFn() {
    wsp.searchByUserName($$("discover_search_name"), parseInt($$("discover_search_limit")), parseInt($$("discover_search_timestamp")), "分词搜索")
}