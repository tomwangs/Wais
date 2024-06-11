import https from './http.js';

let apiFun = {};


//注册
apiFun.randomCode = function(params) {
	return https.get('/random', params)
}

apiFun.login = function(params) {
	return https.post('/login', params)
}

//用户信息
apiFun.userInfo = function(params) {
	return https.get('/userInfo', params)
}

//直推
apiFun.getShare = function(params) {
	return https.get('/share', params)
}

//获取sol-usdt
apiFun.getNodePrice = function(params) {
	return https.get('/sol', params)
}

//质押详情
apiFun.getZyInfos = function(params) {
	return https.get('/power/sum', params)
}

//质押记录
apiFun.getZyBills = function(params) {
	return https.get('/power/list', params)
}

//质押地址
apiFun.getZyAddr = function(params) {
	return https.get('/depositAds', params)
}

//【普通直推
apiFun.getShareList = function(params) {
	return https.get('/share2', params)
}

export default apiFun;