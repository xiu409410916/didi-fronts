<template>
	<view class="content">
		<image :src="qrCodeUrl"></image>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				doctorInfo:null,
				qrCodeUrl:''
			}
		},
		onLoad() {
			this.doctorInfo = uni.getStorageSync("doctorInfo");
			this.qrCodeUrl = this.doctorInfo.qrCodeUrl;
			if(!this.$util.isEmpty(this.qrCodeUrl)){
				this.getQrCodeUrl();
			}
		},
		methods: {
			getQrCodeUrl: function() {
				let that = this;
				that.$util.request({
					url: "http://127.0.0.1:9002/didi-patient/doctorinfo/getDoctorQrCode",
					param: {doctorId:this.doctorInfo.doctorId},
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						this.qrCodeUrl = res.data.qrCodeUrl;
						uni.setStorageSync("doctorInfo",res.data);
					},
					error: function() {}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}
</style>
