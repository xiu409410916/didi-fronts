<template>
	<view class="content">
		<view class="time">
			<image src="../../static/banner.jpg"></image>
			<page-button :height="20" :width="100" @click="timeBuy(2)" name="购买"></page-button>
		</view>
			
		<view class="time">
			<image src="../../static/banner.jpg"></image>
			<page-button :height="20" :width="100" @click="timeBuy(3)" name="购买"></page-button>
		</view>
		
		<view class="time">
			<image src="../../static/banner.jpg"></image>
			<page-button :height="20" :width="100" @click="timeBuy(150)" name="购买"></page-button>
		</view>
		
		<view class="time">
			<image src="../../static/banner.jpg"></image>
			<page-button :height="20" :width="100" @click="timeBuy(200)" name="购买"></page-button>
		</view>


	</view>
</template>

<script>
	import PageButton from '../../components/button.vue';

	export default {
		components: {
			PageButton,
		},

		data() {
			return {
				
			}
		},
		onShow() {
			
		},
		methods: {
			timeBuy:function(time){
				let that = this;
				var temp = {};
				temp.time = time;
				that.$util.request({
					url: "/didi-patient/patientpayinfo/unifiedOrder",
					param: temp,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						var data = res.data;
						 //调用微信支付
						uni.requestPayment({
						  'appId': data.appId,
						  'timeStamp': data.timeStamp,
						  'nonceStr': data.nonceStr,
						  'package': data.package,
						  'signType': data.signType,
						  'paySign': data.paySign,
						  'success': function (res) {
						    util.showSuccessToast("支付成功");
						    setTimeout(function () {
								uni.navigateTo({
									url:'/pages/my/index'
								})
						    }, 1000);
						  },
						  'fail': function (res) {
						    uni.showToast({
						      title: res.message,
						      icon: 'none'
						    })
						  }
						})
					},
					error: function() {}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		background: $uni-text-color-inverse;
		margin-top: 20upx;
		.time{
			float: left;
			width: 350rpx;;
			margin-left: 25rpx;
			margin-top: 20rpx;
			image{
				width: 350rpx;
				height: 350rpx;
			}
			
		}
	}
</style>
