include("config.js");
function wsSend(websocket, json) {
	if (json.m.m == json.m.auto)
		json.m = {
			m : json.m
		}
	json.m["t"] = new Date().getTime()
	var sendStr = JSON.stringify(json);

	echo("*send params is " + sendStr);
	websocket.send(sendStr);
}

function makeToken(tokenAbout) {
	var token = new Object();
	for ( var i = 0; i < tokenAbout.length; i++) {
		token["t" + i] = tokenAbout[i];
	}
	return token;
}

function makeTupleParam(tupleAbout) {
	var tuple = new Object();
	for ( var i = 0; i < tupleAbout.length; i++) {
		tuple["p" + i] = tupleAbout[i];
	}
	return tuple;
}

function makeTupleIntParam(tupleAbout) {
	var tuple = new Object();
	for ( var i = 0; i < tupleAbout.length; i++) {
		tuple["p" + i] = parseInt(tupleAbout[i]);
	}
	return tuple;
}

function makeAutoLoginStar(platform, language, version, mId) {
	var star = new Object();
	star["platform"] = platform;
	star["language"] = language;
	star["version"] = version;
	star["mId"] = mId;
	return star;

}

var friendsPathFields = [ "p0o", "p1i", "p1", "p1o", "p2i", "p2", "p2o" ];
var friendsPathFields2 = [ "p0o", "p1i", "p2i", "p2", "p2o" ];
var sessionPathFields = [ "p0o", "p1s", "p2i", "p2" ];
var allPathFields = [ "p0o", "p1f" ]
var trustPathFields = [ "p0o", "p1t", "p1", "p1o" ]

function makePath(pathArray, fields) {
	var path = new Object();
	var check = false;
	for ( var i = 0; i < pathArray.length; i++) {
		if (pathArray[i] instanceof Array && i == (pathArray.length - 1))
			check = true;
		path[fields[i]] = pathArray[i];
	}
	if (!check)
		fail("路径错误：" + pathArray.toString);
	return path;
}

function makeViewPath(field, str) {
	var pathArr = strToPathArr(str);
	if ("{}" == str) {
		return makeSelfPath();

	} else {
		var fieldArr
		if ("session" == field) {
			fieldArr = sessionPathFields;
		} else if ("cross" == field) {
			fieldArr = friendsPathFields2;
		} else if ("list" == field) {
			fieldArr = friendsPathFields;
		} else if ("trust" == field) {
			fieldArr = trustPathFields;
		} else {
			fieldArr = allPathFields;
		}
		return makePath(pathArr, fieldArr);
	}
}

function getLastPathFields(pathArray) {
	var maxIndex = 0;
	for ( var i in pathArray) {
		for ( var j in friendsPathFields) {
			if (friendsPathFields[j] == i) {
				var temIndex = j;
				if (maxIndex < temIndex)
					maxIndex = temIndex;
				break;
			}
		}
	}
	return friendsPathFields[maxIndex];
}

function getLastPathIndex(pathArray) {
	var maxIndex = 0;
	for ( var i in pathArray) {
		for ( var j in friendsPathFields) {
			if (friendsPathFields[j] == i) {
				var temIndex = j;
				if (maxIndex < temIndex)
					maxIndex = temIndex;
				break;
			}
		}
	}
	return parseInt(maxIndex);
}

function makeSelfPath() {
	return {};
}

function makeFriendsPath(pathArray) {
	return makePath(pathArray, friendsPathFields);
}
function makeCrossPath(pathArray) {
	return makePath(pathArray, friendsPathFields2);
}
function makeSessionPath(pathArray) {
	return makePath(pathArray, sessionPathFields);
}
function makeTrustPath(pathArray) {
	return makePath(pathArray, trustPathFields);
}

function fullHeadBak(len) {
	var array = new Array();
	for ( var i = 0; i < len; i++) {
		array[i] = ("p" + i);
	}
	return array;
}

function markArrayStr(arr) {
	var array = new Array();
	for ( var i = 0; i < arr; i++) {
		array[i] = len[i];
	}
	return array;
}

function fullHeadBak(len) {
	var array = new Array();
	for ( var i = 0; i < len; i++) {
		array[i] = ("p" + i);
	}
	return array;
}
var markTestRandmon = 0;
function makeReqJson(params, mark) {
	var json = new Object();
	for ( var i = 0; i < params.length; i++) {
		json['p' + i] = params[i];
	}
	json['b'] = fullHeadBak(params.length);
	if (mark)
		json['m'] = mark;
	else if (markTestRandmon % 2 == 0) {
		json['m'] = "testMark" + markTestRandmon++;
		markTestRandmon++;
	}

	return json;
}

function wsSendReq(ws, params, mark) {
	wsSend(ws, makeReqJson(params, mark));
}

function doLogSendReq(actionName, ws, params, mark) {
	doLog(actionName, function() {
		wsSendReq(ws, params, mark);
	})
}

function makeWSProxy(onmsg, onopen, onclose, onerror) {
	var beginShakingTime = (new Date());
	console.info("开始握手:" + beginShakingTime.format("yyyy-MM-dd hh:mm:ss.S"))
	var websocket = (new WebSocket(wsUrl));
	var ws = websocket;
	websocket.onopen = function(evt) {
		var endShakingTime = (new Date());
		console.info("打开socket成功" + evt.data + " 打开时间:" + endShakingTime.format("yyyy-MM-dd hh:mm:ss.S"));
		if (onopen) {
			var timecost = endShakingTime.getTime() - beginShakingTime.getTime();
			console.info(timecost + "毫秒")
			onopen(evt);
		}
	};
	websocket.onclose = function(evt) {
		console.info('socket断开连接' + evt.data + " time:"+ (new Date()).format("yyyy-MM-dd hh:mm:ss.S"));
		if (onclose)
			onclose(evt);
	};
	websocket.onmessage = function(evt) {
		console.info('*msg ' + evt.data);
		var json = toJson(evt.data)
		if (json.h != undefined && json.h.s == undefined) {
			if (onmsg) {
				if (json.h.m != undefined & json.h.m.t != undefined) {
					var timecost = new Date().getTime() - json.h.m.t
					if (timecost < 1000)
						debug("耗时：" + timecost + "毫秒")
					else
						fail("耗时：" + timecost + "毫秒")
				}
				onmsg(evt);
			}
		} else {
			onmsg(evt);
		}

	};
	websocket.onerror = function(evt) {
		echo("*error " + evt.data + "         time:"
				+ (new Date()).format("yyyy-MM-dd hh:mm:ss.S"));
		if (onerror)
			onerror(evt);
	};
	var obj = new Object();
	obj.self = websocket;
	obj.customBind = function(snsUid, snsType, token, mark, level) {
		doLogSendReq("sendBind", websocket, [ "accounts", "customBind", snsUid,
				snsType, token, 0 ], mark);
	};
	return obj;
}

】