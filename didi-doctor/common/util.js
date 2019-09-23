import {serverUrl} from '../config/index.js'

function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	},
	dateFormat:function(dateStr){ 
		var date = new Date(dateStr);
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '-' + _format(date.getMonth() + 1) + '-' + _format(date.getDay());
	}
}; 

function substr(v){
	if(v!=""&v!=undefined&v!=null){
		if(v.substr(v.length-1,1)==","||v.substr(v.length-1,1)==";"){
			return v.substr(0,v.length-1);
		}
		return v
	}
}

function subFilter(v,len) {
	if(v!=""&v!=undefined&v!=null){
		if(v.length>len){
			return v.substr(0,len);
		}else{
			return v;
		}
	}
}

function request(param){
	uni.showLoading({
    title: '加载中'
    });
	uni.request({
		url:  param.url.startsWith('http') ? param.url : serverUrl + param.url,
		data: param.contentType?param.param:JSON.stringify(param.param),
		method:'POST',
		header: {
		 'content-type': param.contentType?param.contentType:'application/json', 
		 'token':uni.getStorageSync('Token')?uni.getStorageSync('Token'):''
		},
		dateType: "json",
		success: (res) => {
			uni.hideLoading();
			if (res == null) {
				res = {};
			}
			if (typeof res == "string") {
				res = JSON.parse(res);
			}
			if (typeof(param.success) == 'function') {
				if (res.data.errorCode == "SUCCESS") {
					param.success(res.data);
				} else if (res.data.errorCode == "E003") {
					uni.showModal({
						title: '提示',
						content: '您未登陆，请先登陆',
						success: function (res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/center/center'
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					param.error(res.data);
					uni.showToast({
						title: res.data.message,
						icon:'none',
						duration: 2000
					});
				}
			} else {
				uni.showToast({
					title: '读取数据失败',
					icon:'none',
					duration: 2000
				});
			}

		},
		fail: (res) => {
			uni.hideLoading();
			uni.showToast({
				title: '读取数据失败',
				icon:'none',
				duration: 2000
			});
		}
    });
}

function getSystemInfo(){
	try {
		const res = uni.getSystemInfoSync();
		return res;
	} catch (e) {
		// error
	}
}

function isEmojiCharacter(substring){
    if(substring){
        var reg = new RegExp("[~#^$@%&!?%*]", 'g');
        if (substring.match(reg)) {
            return true;
        }
        for ( var i = 0; i < substring.length; i++) {
            var hs = substring.charCodeAt(i);
            if (0xd800 <= hs && hs <= 0xdbff) {
                if (substring.length > 1) {
                    var ls = substring.charCodeAt(i + 1);
                    var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                    if (0x1d000 <= uc && uc <= 0x1f77f) {
                        return true;
                    }
                }
            } else if (substring.length > 1) {
                var ls = substring.charCodeAt(i + 1);
                if (ls == 0x20e3) {
                    return true;
                }
            } else {
                if (0x2100 <= hs && hs <= 0x27ff) {
                    return true;
                } else if (0x2B05 <= hs && hs <= 0x2b07) {
                    return true;
                } else if (0x2934 <= hs && hs <= 0x2935) {
                    return true;
                } else if (0x3297 <= hs && hs <= 0x3299) {
                    return true;
                } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                    || hs == 0x2b50) {
                    return true;
                }
            }
        }
    }
}


function otime(str){
	if(str<10){
		return '0'+str
	}else{
		return str
	}
}


//判断值是否有效
function isEmpty(value){
	if(value==""||value==0||value==null||value==undefined){
		return false
	}
	return true
}

//身份证号合法性验证 
//支持15位和18位身份证号
//支持地址编码、出生日期、校验位验证
function IdentityCodeValid(code) { 
	var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
	var tip = "";
	var pass= true;
	//验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
	if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
		tip = "身份证号格式错误";
		pass = false;
	}
	
   else if(!city[code.substr(0,2)]){
		tip = "地址编码错误";
		pass = false;
	}
	else{
		//18位身份证需要验证最后一位校验位
		if(code.length == 18){
			code = code.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子
			var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
			//校验位
			var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for (var i = 0; i < 17; i++)
			{
				ai = code[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if(parity[sum % 11] != code[17]){
				tip = "身份证号格式错误";
				pass =false;
			}
		}
	}
	if(!pass){
		uni.showToast({
			title: tip,
			icon:'none',
			duration: 2000
		});
	};
	return pass;
}

function random(){
	var num = '';
	for(var i=0;i<3;i++)
	{
		num+=Math.floor(Math.random()*10);
	}
	return num
}

// 医生是否完善资料
function isPerfectInfo(){
	var doctor = uni.getStorageSync("doctorInfo");
	if(!isEmpty(doctor.doctorName)){
		uni.showToast({
			title: '请完善资料',
			icon: 'success',
			duration: 2000
		})
		return false;
	}
	if(doctor.states != 1){
		uni.showToast({
			title: '资料还在审核',
			icon: 'success',
			duration: 2000
		})
		return false;
	}
	return true;
}

module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	substr:substr,
	subFilter:subFilter,
	request:request,
	getSystemInfo:getSystemInfo,
	isEmojiCharacter:isEmojiCharacter,
	otime:otime,
	isEmpty,
	IdentityCodeValid,
	random,
	isPerfectInfo
}
