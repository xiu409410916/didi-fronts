import util from './util.js'

//调起支付
function getPayParam(orderId){
	let that=this; 
	util.request({
		url: "/order-pay/wxPay/getPayParam",
		param: {orderId:orderId},
		contentType:'application/x-www-form-urlencoded',
		success: function(res) { 
			uni.requestPayment({
				provider: 'wxpay',
				timeStamp: res.data.timeStamp,
				nonceStr: res.data.nonceStr,
				package: res.data.package,
				signType: res.data.signType,
				paySign: res.data.paySign,
				success: function (res) {
					uni.redirectTo({
					   url: '../presult/presult?state=1'
					});
				},
				fail: function (err) {
					orderQuery(orderId)
				}
			});
		},
		error: function() {}
	})
}
function orderQuery(orderId){
	let that=this; 
	util.request({
		url: "/order-pay/wxPay/orderQuery",
		param: {orderId:orderId},
		contentType:'application/x-www-form-urlencoded',
		success: function(res) { 
			uni.redirectTo({
			   url: '../presult/presult?state=1'
			});
		},
		error: function() {
			uni.redirectTo({
			   url: '../presult/presult?state=0&id='+orderId
			});
		}
	})
}

//积分支付
function integralPay(pointsType,describe,orderId){
	let that=this; 
	const param={}
	param.pointsType=pointsType
	param.describe=describe
	param.orderId=orderId
	util.request({
		url: "/order-pay/pointsPay/pointsPay",
		param: param,
		contentType:'application/x-www-form-urlencoded',
		success: function(res) { 
			uni.redirectTo({
			   url: '../presult/presult?state=1'
			});
		},
		error: function() {}
	})
}

module.exports = {
	getPayParam,
	integralPay
}