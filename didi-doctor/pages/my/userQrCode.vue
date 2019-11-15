<template>
	<view class="content">
		<label>医生端小程序</label>
		<!-- <image :src="qrCodeUrl"></image> -->
		<image :src="qrCodeUrlAgent"></image>
	</view>
</template>

<script>


	export default {
		components: {
			
		},

		data() {
			return {
				qrCodeUrl:'',
				qrCodeUrlAgent:''
			}
		},
		onLoad(options) {
			var info = uni.getStorageSync("doctorInfo")
			// this.qrCodeUrl = info.qrCodeUrl;
			// if(!this.$util.isEmpty(this.qrCodeUrl)){
			// 	this.getQrCodeUrl(info.doctorId);
			// }
			this.qrCodeUrlAgent = info.qr_code_url_agent;
			if(!this.$util.isEmpty(this.qrCodeUrlAgent)){
				this.getQrCodeUrlAgent(info.doctorId);
			}
		},
		onShow() {
			
		},
		methods: {
			getQrCodeUrl: function(doctorId) {
				let that = this;
				var url = "/didi-patient/doctorinfo/getDoctorQrCode";
				that.$util.request({
					url: url,
					param: {doctorId:doctorId},
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						that.qrCodeUrl = res.data.qrCodeUrl;
						uni.setStorageSync('doctorInfo', res.data);
						console.log(that.qrCodeUrl);
					},
					error: function() {}
				})
			},
			getQrCodeUrlAgent: function(doctorId) {
				let that = this;
				var url = "/didi-doctor/doctorinfo/getQrCodeForDididada";
				that.$util.request({
					url: url,
					param: {doctorId:doctorId},
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						that.qrCodeUrlAgent = res.data.qrCodeUrlAgent;
						uni.setStorageSync('doctorInfo', res.data);
						console.log(that.qrCodeUrlAgent);
					},
					error: function() {}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		background: $uni-text-color-inverse;
		margin-top: 20upx;
		image{
			width: 300rpx;
			height: 300rpx;
		}
		
	}
	
	
	
</style>
