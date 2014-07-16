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