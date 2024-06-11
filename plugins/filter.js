// 时间戳转换
export function formatDate(timestamp) {
	var date = new Date(timestamp);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	var time = year + '-' + formatNum(month) + '-' + formatNum(day) + ' ' + formatNum(hour) + ':' + formatNum(minute) +
		':' + formatNum(second);
	return time;
}

function formatNum(num) {
	return num < 10 ? '0' + num : num;
}