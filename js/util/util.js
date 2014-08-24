function log(obj) {
    if (openLog)
        console.log(obj);
}

function echo(s) {
    document.writeln(s + "<br/>");
}

function fail(title) {
    echo("<div style='clear: both;height: 30px;padding: 0 0px;border-radius: 4px;background: url(http://static.blog.csdn.net/skin/default/images/tit_bg.gif) repeat-x top;color: #333;font: bold 12px/30px Arial;text-indent:5px;display:block;list-style-type: disc;-webkit-margin-before: 1em;-webkit-margin-after: 1em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;-webkit-padding-start: 40px;'>"
        + title + "</div>")
}
// #e3e3e3

function baseMsgBlock(msg, color) {
    echo("<div style='border: solid 1px #ddd;border-radius: 5px;-webkit-border-radius: 5px;clear:both;padding: 0 0px;background-color:" + color + ";color: #333;font: bold 12px/30px Arial;text-indent:5px;display:block;list-style-type: disc;-webkit-margin-before: 1em;-webkit-margin-after: 1em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;-webkit-padding-start: 40px;'>"
        + msg + "</div>")
}

function msgBlock(msg) {
    baseMsgBlock(msg, "#A6D4F2")
}

function redFail(title) {
    echo("<div style='text-align:center;clear: both;height: 30px;padding: 0 0p" +
        "x;border-radius: 4px;background: url(http://static.blog.csdn.net/skin/default/ima" +
        "ges/tit_bg.gif) repeat-x top;color: #333;font: bold 12px/30px Arial;text-indent:5px;display:block;" +
        "list-style-type: disc;-webkit-margin-before: 1em;-webkit-margin-after: 1em;-webkit-" +
        "margin-start: 0px;-webkit-margin-end: 0px;-webkit-padding-start: 40px;'><font color='red'>"
        + title + "</font></div>")
}

function ok(s) {
    document.writeln("<span style='color:#008000;font: bold 12px/30px Arial;'>" + s + "</span><br/>")
}

function tip(s) {
    document.writeln("<span style='color:#FFAF60;font: bold 12px/30px Arial;'>提示:" + s + "</span><br/>")
}

function debug(s) {
    echo("<span style='color:#00CACA;font: bold 12px/30px Arial;'>debug::" + s + "</span>");
}

function info(s) {
    echo("<span style='color:#00CACA;font: bold 12px/30px Arial;'>" + s + "</span>");
}

function err(s) {
    alert(s);
}

function checkValueIfEmpty(value) {
    if ("" == value || undefined == value) {
        alert("输入值为空，请求被拦截")
        return
    }
};

function getValueById(id) {
    var re = $("#" + id).val()
    return re;
}
var $$ = getValueById;

var $name = function (name) {
    return document.getElementsByName(name)
}

function doLog(name, action) {
    action();
}

function isEmptyJsonObj(jsonObj) {
    var json = JSON.stringify(jsonObj);
    return json == undefined || json == "{}";
}

function noExistsJsonObj(jsonObj) {
    return JSON.stringify(jsonObj) == undefined;
}

function isEmptyOrUndefined() {
    for (var i in arguments.length) {
        if (undefined != arguments[i] && "" != arguments[i] && arguments[i] != "{}") {
            return false;
        }
    }
    return true;
}

function toJson(str) {
    if (str.length < 2)
        return str;
    return eval("(" + str + ")")
}

function Jsons(jsn) {
    this.json = jsn

    function jsonKeys(json) {
        var keys = new Array();
        var i = 0;
        for (var attr in json) {
            keys[i] = attr;
        }
        return keys;
    }

    function jsonValues(json) {
        var values = new Array();
        var i = 0;
        for (var attr in json) {
            values[i] = json[attr];
        }
        return values;
    }

    function jsonValueAsArray(json) {
        var values = new Array();
        var i = 0;
        for (var attr in json) {
            for (var j in json[attr])
                values[i++] = json[attr][j];
            // alert(json[attr]);
        }
        return values
    }

    return {
        keys: jsonKeys(json),
        values: jsonValues(json),
        valueArray: jsonValueAsArray(json)
    }
}

// var db_id = 0;
function showDB(Id_num) {
    var spanId = "db" + Id_num;
    var span = document.getElementById(spanId);
    span.style.display = "block"
}

function combineOtherId(platform, id) {
    return platform + ":" + id;
}

function snsType(otherId) {
    return otherId.split(":")[0]
}

// 逗号
function strToArr(str) {
    var arr = (str + "").split(',');
    return arr;
}

function strToPathArr(str) {
    if (str == "{}") {
        return str;
    }
    var arr = str.split("[");
    arr[1] = (arr[1].substring(0, arr[1].length - 1)).split(",")
    if (arr[0].length > 0) {
        var re = ((arr[0].slice(0, arr[0].length - 1)).split(","));
        re.push(arr[1])
        return re;
    } else {
        return [arr[1]];
    }
}

function splitStrToAry(str, splitChar) {
    var arr = (str + "").split(splitChar);
    return arr;
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (fmt) {// author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
// 过滤 json.r.info 。以获取{{localId,[otherId]},{.....}}
function getAccountsRelationByJsonInfo(json) {
    function getAccIds(list) {
        var ids = new Array();
        for (var i = 0; i < list.length; i++) {
            ids[i] = list[i]["id"];
        }
        return ids;
    }

    var accs = {};
    for (var i in json) {
        accs[i] = getAccIds(json[i]["l"])
    }

    return accs;
}

function divDecorate1() {
    echo("<div style='margin: 0 0 10px 0;border: solid 1px #ddd;border-radius: 5px;-webkit-border-radius: 5px;width:400px;'>")
}

function divDecorate2() {
    echo("</div>")
}

function titles(title) {
    echo("<div style='clear: both;height: 30px;padding: 0 0px;border-radius: 4px;background: url(http://static.blog.csdn.net/skin/default/images/tit_bg.gif) repeat-x top;color: #333;font: bold 12px/30px Arial;text-indent:5px;display:block;list-style-type: disc;-webkit-margin-before: 1em;-webkit-margin-after: 1em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;-webkit-padding-start: 40px;'>"
        + title + "</div>")
}


// 弹窗
function closePop(divId) {
    // (divId).innerHTML = "";
    document.body.removeChild(document.getElementById(divId))
}

function initPop(divId, title, content, buttonsHTML, width, height) {
    if (undefined == height) {
        height = 300
    }
    if (undefined == width) {
        width = 400
    }
    ;


    echo("<div id='" + divId + "' >"
        + "<div style='background:#ffffff;border:1px solid #333333; width:" + width + "px; position:absolute; height:" + height + ";top:" + (document.body.scrollTop + (screen.height - height) / 2) + "px;left:" + (screen.width - width) / 2 + "px;'>"
        + "	<h3>" + title + "</h3>"
        + "	<hr/>"
        + "	<div id='content'>"
        + "     <p>"
        + content
        + "	    </p>"
        + "     <p>"
        + buttonsHTML
        + "     </p>"
        + "	</div>" + "</div>" + "</div>")
}

function HashMap() {
    var size = 0;
    var entity = new Object();

    this.put = function (key, value) {
        if (!this.containsKey(key)) {
            size++;
        }
        entity[key] = value;
    }

    this.get = function (key) {
        if (this.containsKey(key)) {
            return entity[key];
        } else {
            return null;
        }
    }

    this.containsKey = function (key) {
        return key in entity;
    }

    this.containsValue = function (value) {
        for (var v in  entity) {
            if (entity[v] == value) {
                return true;
            }
        }
        return false;
    }

    this.keys = function () {
        var keys = new Array(size);
        for (var pop in entity) {
            keys.push(pop)
        }
        return keys;
    }

    this.values = function () {
        var values = new Array(size);
        for (var pop in entity) {
            values.push(entity[pop]);
        }
        return values;
    }

    this.remove = function (key) {
        if (delete entity(key)) {
            size--;
        }
    }

    this.size = function () {
        return size;
    }

    this.isEmpty = function () {
        return this.size == 0;
    }

}



