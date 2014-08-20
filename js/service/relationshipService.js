/**
 * Created by primos on 14-8-20.
 */

/**
 * 同步通讯录好友
 * @param otherId
 * @param contactsInput
 */
function syncContactsFn(otherId, contactsInput) {
    if ("" == otherId || otherId == undefined) {
        otherId = getValueById("relationship_sync_mobile_otherid");
    }
    if ("" == contactsInput || contactsInput == undefined) {
        contactsInput = getValueById("relationship_sync_mobile_contact");
    }
    wsp.syncContacts(otherId, strToArr(contactsInput), {
        m: "同步手机通讯录"
    })
}