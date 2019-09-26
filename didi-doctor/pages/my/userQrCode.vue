<template>
	<view class="content">
		
		<image :src="qrCodeUrl"></image>
	</view>
</template>

<script>


	export default {
		components: {
			
		},

		data() {
			return {
				qrCodeUrl:''
			}
		},
		onLoad(options) {
			var info = uni.getStorageSync("doctorInfo")
			this.qrCodeUrl = info.qrCodeUrl;
			if(!this.$util.isEmpty(this.qrCodeUrl)){
				this.getQrCodeUrl(info.doctorId);
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
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		background: $uni-text-color-inverse;
		margin-top: 20upx;
		
		
	}
	
	
	
</style>
