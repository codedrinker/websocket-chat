/**
 * Created by primos on 14-8-20.
 */


/**
 *反馈
 * @param content
 */
function feedBackFn(content) {
    if ("" == content || content == undefined) {
        content = getValueById("system_feedback_content")
    }
    wsp.feedback(content, "提交反馈");
}

/**
 * 建议一个
 * @param content
 * @param email
 */
function suggestionFn(content, email) {
    if ("" == content || content == undefined) {
        content = getValueById("system_suggestion_content")
    }
    if ("" == email || email == undefined) {
        email = getValueById("system_suggestion_email")
    }
    wsp.suggestion(content, email, "提交建议");

}