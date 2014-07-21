// 获取 好友平台
function getSnsPlatform(str) {
	return str.split(":")[0];
};

// 判定是json否空
function isEmptyObject(obj) {
	for ( var name in obj) {
		return false;
	}
	return true;
};
// json操作集
function jsonAppend(j1, j2) {
	if (isEmptyObject(j2)) {
		return j1;
	} else if (isEmptyObject(j1)) {
		return j2;
	} else {
		var j1s = JSON.stringify(j1);
		var j2s = JSON.stringify(j2);
		return JSON.parse(j1s.slice(0, (j1s.length - 1)) + ","
				+ j2s.slice(1, +j2s.length));
	}
};

//加载菊花
function showspin(id){
	var opts = {
		lines: 11, // The number of lines to draw
		length: 17, // The length of each line
		width: 10, // The line thickness
		radius: 30, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 26, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#000', // #rgb or #rrggbb or array of colors
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: '50%', // Top position relative to parent
		left: '50%' // Left position relative to parent
		};
	var target = document.getElementById(id);
	var spinner = new Spinner(opts).spin(target);
}

//退出浏览器提示
var is_focus = false;
function alert_if_is_focus() {
    if (is_focus)
        return '您确定要退出程序吗？';
}