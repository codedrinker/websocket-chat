var space = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var buttonStyle = "style='width:124px; height:40px; CURSOR: hand;border:0; background-color:#b43200'"

function divPre() {
	echo("<div style='margin: 0 0 10px 0;border: solid 1px #ddd;border-radius: 5px;-webkit-border-radius: 5px;width:400px;'>")
}
function divEnd() {
	echo("</div>")
}
function titleUl(title) {
	echo("<div style='clear: both;height: 30px;padding: 0 0px;border-radius: 4px;background: url(http://static.blog.csdn.net/skin/default/images/tit_bg.gif) repeat-x top;color: #333;font: bold 12px/30px Arial;text-indent:5px;display:block;list-style-type: disc;-webkit-margin-before: 1em;-webkit-margin-after: 1em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;-webkit-padding-start: 40px;'>"
			+ title + "</div>")
}
//postStatusWithGeo
function postStatusFn(otherId, type, bgUrl, content, img, isSync,location,coordinates) {
	if ("" == otherId || otherId == undefined) {
		otherId = getValueById("postStatusShow_otherId")
	}
	if ("" == type || type == undefined) {
		type = parseInt(getValueById("postStatusShow_type"))
	}
	if ("" == bgUrl || bgUrl == undefined) {
		bgUrl = getValueById("postStatusShow_bgUrl")
	}
	if ("" == content || content == undefined) {
		content = getValueById("postStatusShow_content")
	}
	if ("" == img || img == undefined) {
		img = getValueById("postStatusShow_img")
	}
	if ("" == isSync || isSync == undefined) {
		isSync = getValueById("postStatusShow_isSync")
	}
	if ("" == location || location == undefined) {
		location = getValueById("postStatusShow_location")
	}
	if ("" == coordinates || coordinates == undefined) {
		coordinates = getValueById("postStatusShow_coordinates")
	}

    if(location != ""){
    var str = coordinates.split(',');
//    var dou = new Array([3]);
//    for(var i = 0;i<str.length;i++){
//        dou[i]= parseFloat(str[i]);
//    }
    wsp.postStatusWithGeo(otherId, type, bgUrl, content, img, isSync.split(','),location,str, {
                    auto : false,
                    m : "发表内容"
                });
    }else{
        wsp.postStatus(otherId, type, bgUrl, content, img, isSync.split(','), {
                auto : false,
                m : "发表内容"
            });
        }
}
function postStatusShow() {
	divPre()
	titleUl("发表内容")
	echo("otherId:<input type='text' id='postStatusShow_otherId' value='"
			+ cSnsPlatform + ":" + cSnsUserId + "'/>")
	echo("type:<input type='text' id='postStatusShow_type' value='0'/>")
	echo("bgUrl:<input type='text' id='postStatusShow_bgUrl' value='http://a.hiphotos.baidu.com/image/w%3D2048/sign=a26cd2c508d162d985ee651c25e7a8ec/6a600c338744ebf8ba28f83edbf9d72a6059a752.jpg'/>")
	echo("content  :<input type='text' style='width:120px' id='postStatusShow_content' value='偶尔发表一个说说，不然别人以为我是僵尸粉'/>")
	echo("img  :<input type='text' style='width:120px' id='postStatusShow_img' value='http://a.hiphotos.baidu.com/image/w%3D2048/sign=a26cd2c508d162d985ee651c25e7a8ec/6a600c338744ebf8ba28f83edbf9d72a6059a752.jpg'/>")
	echo("isSync  :<input type='text' style='width:120px' id='postStatusShow_isSync' value='"+ cSnsPlatform + ":" + cSnsUserId + "'/><br/>")
	echo("location  :<input type='text' style='width:120px' id='postStatusShow_location' value='北京'/><br/>")
	echo("coordinates  :<input type='text' style='width:120px' id='postStatusShow_coordinates' value='116.3,39.9'/><br/>")
	echo(space + "<button id='postStatusShow'" + buttonStyle
			+ " onclick='postStatusFn()'>发表内容</button>")
	divEnd()
}

// obj.commentStatus = function(otherId, statusId, type, content, mark) {
// doLogSendReq("comment a status", websocket, [ "status", "comment",
// otherId, statusId, type, content ], mark);
// };

function commentStatusFn(otherId, statusId, type, content) {
	if ("" == otherId || otherId == undefined) {
		otherId = getValueById("commentStatusShow_otherId")
	}
	if ("" == type || type == undefined) {
		type = parseInt(getValueById("commentStatusShow_type"))
	}
	if ("" == statusId || statusId == undefined) {
		statusId = getValueById("commentStatusShow_statusId")
	}
	if ("" == content || content == undefined) {
		content = getValueById("commentStatusShow_commentContent")
	}
	wsp.commentStatus(otherId, statusId, type, content, {
		auto : false,
		m : "评论内容"
	});
}
function commentStatusShow() {
	divPre()
	titleUl("通过内容Id对内容进行评论")
	echo("otherId:<input type='text' id='commentStatusShow_otherId' value='"
			+ cSnsPlatform + ":" + cSnsUserId + "'/>")
	echo("type:<input type='text' id='commentStatusShow_type' value='0'/>")
	echo("statusId:<input type='text' id='commentStatusShow_statusId' value=''/>")
	echo("content:<input type='text' style='width:120px' id='commentStatusShow_commentContent' value='偶尔评论别人一下，不然别人以为我是僵尸粉'/><br/>")
	echo(space + "<button id='commentStatusShow'" + buttonStyle
			+ " onclick='commentStatusFn()'>评论内容</button>")
	divEnd()
}

function likeStatusFn(otherId, statusId) {
	if ("" == otherId || otherId == undefined) {
		otherId = getValueById("likeStatusShow_otherId")
	}
	if ("" == statusId || statusId == undefined) {
		statusId = getValueById("likeStatusShow_statusId")
	}
	wsp.likeStatus(otherId, statusId, {
		auto : false,
		m : "赞"
	});
}
function likeStatusShow() {
	divPre()
	titleUl("通过内容Id对内容进行赞")
	echo("otherId:<input type='text' id='likeStatusShow_otherId' value='"
			+ cSnsPlatform + ":" + cSnsUserId + "'/>")
	echo("statusId:<input type='text' id='likeStatusShow_statusId' value=''/>")
	echo(space + "<button id='likeStatusShow'" + buttonStyle
			+ " onclick='likeStatusFn()'>赞</button>")
	divEnd()
}

// obj.delStatus = function(realTarget, otherId, targetId, mark) {
// doLogSendReq("del a status", websocket, [ "status", "del", otherId,
// type, bgUrl, content, img, isSync ], mark);
// };
function delStatusFn(realTarget, otherId, targetId) {
	if ("" == otherId || otherId == undefined) {
		otherId = getValueById("delStatusShow_otherId")
	}
	if ("" == realTarget || realTarget == undefined) {
		realTarget = getValueById("delStatusShow_realTarget")
	}
	if ("" == targetId || targetId == undefined) {
		targetId = getValueById("delStatusShow_targetId")
	}
	wsp.delStatus(realTarget, otherId, targetId, {
		auto : false,
		m : "删除评论或者内容"
	});
}
function delStatusShow() {
	divPre()
	titleUl("通过目标id删除相应的内容或者评论")
	echo("otherId:<input type='text' id='delStatusShow_otherId' value='"
			+ cSnsPlatform + ":" + cSnsUserId + "'/>")
	echo("要删除的类型:<select id='delStatusShow_realTarget' value='status'>"
			+ "<option value='status'>status</option>'"
			+ "<option value='comment'>comment</option>" + "</select>")
	echo("要删除的目标的Id:<input type='text' id='delStatusShow_targetId' value=''/><br/>")
	echo(space + "<button id='delStatusShow'" + buttonStyle
			+ " onclick='delStatusFn()'>删除评论或者内容</button>")
	divEnd()
}

// obj.initStatus = function(mark) {
// doLogSendReq("init", websocket, [ "status", "init" ], mark);
// };
function initStatusFn() {
	wsp.initStatus({
		auto : false,
		m : "初始化未读"
	});
}

function getStatusByDistancShowFn(){
    wsp.getStatusByDistance({
        auto : false,
        m : "获得广场内容"
    });
}
function getStatusByDistancShow(){
	divPre()
	titleUl("获得广场内容")
	echo(space
			+ "<button id='getStatusByDistancShow' onclick='getStatusByDistancShowFn()'>获得广场内容</button>")
	divEnd()
}

function initStatusShow() {
	divPre()
	titleUl("初始化未读")
	echo(space
			+ "<button id='initStatusShow' onclick='initStatusFn()'>初始化未读</button>")
	divEnd()
}

function initStatusFn2() {
	wsp.initStatus2({
		auto : false,
		m : "初始化未读2"
	});
}
function initStatusShow2() {
	divPre()
	titleUl("初始化未读2")
	echo(space
			+ "<button id='initStatusShow2' onclick='initStatusFn2()'>初始化未读2</button>")
	divEnd()
}

// obj.listStatus = function(otherId, realTarget, limit, timestamp, mark) {
// doLogSendReq("listStatus", websocket, [ "status", "list", otherId,
// realTarget, limit, timestamp ], mark);
// };
function listStatusFn(otherId, realTarget, resultType, limit, timestamp) {
	if ("" == otherId || otherId == undefined) {
		otherId = getValueById("listStatusShow_otherId")
	}
	if ("" == realTarget || realTarget == undefined) {
		realTarget = getValueById("listStatusShow_realTarget")
	}
	if ("" == resultType || resultType == undefined) {
		resultType = getValueById("listStatusShow_resultType")
	}
	if ("" == limit || limit == undefined) {
		limit = getValueById("listStatusShow_limit")
	}
	if ("" == timestamp || timestamp == undefined) {
		timestamp = getValueById("listStatusShow_timestamp")
	}
	if (timestamp == 0) {
		wsp.listStatus2(otherId, realTarget, resultType,limit, {
			auto : false,
			m : "显示内容列表"
		});
	} else {
		wsp.listStatus(otherId, realTarget, resultType,limit, timestamp, {
			auto : false,
			m : "显示内容列表"
		});
	}

}
function listStatusShow() {
	divPre()
	titleUl("分页显示内容列表")
	echo("要显示的内容的Id:<input type='text' id='listStatusShow_otherId' value='"
			+ cSnsPlatform + ":" + cSnsUserId + "'/>")
	echo("要显示的内容类型:<select id='listStatusShow_realTarget' value='status'>"
			+ "<option value='trust'>朋友圈页面</option>'"
			+ "<option value='self'>个人资料页面</option>" + "</select>")
	echo("要返回的内容类型:<select id='listStatusShow_resultType' value='status'>"
			+ "<option value='text'>文字</option>'"
			+ "<option value='text&image'>图文</option>'"
			+ "<option value='image'>图片</option>" + "</select>")
	echo("limit:<input type='text' id='listStatusShow_limit' value='10'/>")
	echo("timestamp:<input type='text' id='listStatusShow_timestamp' value='0'/><br/>")
	echo(space + "<button id='listStatusShow'" + buttonStyle
			+ " onclick='listStatusFn()'>显示内容列表</button>")
	divEnd()
}

// obj.commments = function(statusId, limit, timestamp, mark) {
// doLogSendReq("post a status", websocket, [ "status", "comments",
// statusId, limit, timestamp ], mark);
// };
function commmentsFn(statusId, limit, timestamp) {
	if ("" == statusId || statusId == undefined) {
		statusId = getValueById("commmentsShow_statusId")
	}
	if ("" == limit || limit == undefined) {
		limit = parseInt(getValueById("commmentsShow_limit"))
	}
	if ("" == timestamp || timestamp == undefined) {
		timestamp = Number(getValueById("commmentsShow_timestamp"))
	}
	wsp.commments(statusId, limit, timestamp, {
		auto : false,
		m : "显示评论列表"
	});
}
function commmentsShow() {
	divPre()
	titleUl("分页显示评论列表")
	echo("显示评论列表的Id:<input type='text' id='commmentsShow_statusId' value=''/>")
	echo("limit:<input type='text' id='commmentsShow_limit' value='10'/>")
	echo("timestamp:<input type='text' id='commmentsShow_timestamp' value='0'/><br/>")
	echo(space + "<button id='commmentsShow'" + buttonStyle
			+ " onclick='commmentsFn()'>显示评论列表</button>")
	divEnd()
}

function recommendStatusFn(otherId, limit, timestamp) {
	if ("" == otherId || otherId == undefined) {
		otherId = getValueById("recommendStatusShow_otherId")
	}
	if ("" == limit || limit == undefined) {
		limit = parseInt(getValueById("recommendStatusShow_limit"))
	}
	if ("" == timestamp || timestamp == undefined) {
		timestamp = Number(getValueById("recommendStatusShow_timestamp"))
	}
	if (timestamp == 0) {
		wsp.recommendStatus2(otherId, limit, timestamp, {
			auto : false,
			m : "recommendStatus"
		});
	} else {
		wsp.recommendStatus(otherId, limit, timestamp, {
			auto : false,
			m : "recommendStatus"
		});
	}
}
function recommendStatusShow() {
	divPre()
	titleUl("显示广场推荐的内容")
	echo("recommendStatus的otherId:<input type='text' id='recommendStatusShow_otherId' value='"
			+ cSnsPlatform + ":" + cSnsUserId + "'/>")
	echo("limit:<input type='text' id='recommendStatusShow_limit' value='10'/>")
	echo("timestamp:<input type='text' id='recommendStatusShow_timestamp' value='0'/><br/>")
	echo(space + "<button id='recommendStatusShow'" + buttonStyle
			+ " onclick='recommendStatusFn()'>显示</button>")
	divEnd()
}

var isInitStatusFn = function() {
	if (isInitStatus) {
		return;
	} else {
		isInitStatus = true;
	}
	postStatusShow();
	likeStatusShow();
	commentStatusShow();
	delStatusShow();
	initStatusShow();
	getStatusByDistancShow();
	initStatusShow2();
	listStatusShow();
	commmentsShow();
	recommendStatusShow();
}