function mobileUserCheckFn(captcha) {
	if ("" == captcha || captcha == undefined)
		captcha = getValueById("captcha");
	wsp.mobileVerify(captcha, {
		m : "手机验证"
	})
}

function mobileUserCheckView() {
	divDecorate1();
	/*fail("手机验证==不支持多次验证(暂未做到)")
	echo("captcha:<input type='text' id='captcha' value=''/>")
	echo("<button id='mobileUserCheckView' onclick='mobileUserCheckFn()'>手机验证</button>")*/
	fail("重新获取手机验证码")
	echo("phoneNumber:<input type='text' id='PhoneNumber' value=''/>")
	echo("<button id='resetCaptchaView' onclick='resetCaptchaFn()'>重新获取手机验证码</button>")
	divDecorate2();
}

function resetCaptchaFn(phoneNumber) {
	if ("" == phoneNumber || phoneNumber == undefined)
		phoneNumber = getValueById("PhoneNumber");
	wsp.mobileUserLogin(phoneNumber, {
		m : "重置手机验证码"
	});
}



function myFunction(number) {
	var captcha = prompt("请输入你的验证码:",number);
	if (captcha != null) {
		wsp.mobileObtainCodeVerify(captcha,"r", {
			m : "手机验证"
		});
	}
}
function syncContactsFn(otherId, contactsInput) {
	if ("" == otherId || otherId == undefined) {
		otherId = getValueById("syncContactsShow_input1");
	}
	/*
	 * var contacts = new HashMap(); if ("" == contactsInput || contactsInput ==
	 * undefined) { contactsInput = getValueById("syncContactsShow_input2");
	 * alert(contactsInput); var lianxiren = splitStrToAry(contactsInput,";");
	 * for (var lx in lianxiren) { var contact=splitStrToAry(lx,"#");
	 * contacts.put(contact[0], strToArr(contact[1])); } }
	 */
	if ("" == contactsInput || contactsInput == undefined) {
		contactsInput = getValueById("syncContactsShow_input2");
	}
	wsp.syncContacts(otherId, strToArr(contactsInput), {
		m : "同步手机通讯录"
	})
}
function syncContactsShow() {
	divDecorate1()
	echo("OtherUid：<input id='syncContactsShow_input1' value=''/>")
	echo("MapContacts：<input id='syncContactsShow_input2' value=''/>")
	echo("<button id='inviteinviteFriendsShow' onclick='syncContactsFn()'>同步手机通讯录</button>")
	divDecorate2()
}

var initButtons = function(number) {
	echo("<br/>")
	myFunction(number);
}