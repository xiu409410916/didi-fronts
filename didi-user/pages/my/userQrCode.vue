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
			var info = uni.getStorageSync("patientInfo")
			this.qrCodeUrl = info.qrCodeUrl;
			if(!this.$util.isEmpty(this.qrCodeUrl)){
				this.getQrCodeUrl(info.patientId);
			}
		},
		onShow() {
			
		},
		methods: {
			getQrCodeUrl: function(patientId) {
				let that = this;
				var url = "/didi-patient/patientinfo/getPatientQrCode";
				that.$util.request({
					url: url,
					param: {patientId:patientId},
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						that.qrCodeUrl = res.data.qrCodeUrl;
						uni.setStorageSync('patientInfo', res.data);
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
