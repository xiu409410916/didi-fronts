<template>
	<view class="content">
		

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
			this.qrCodeUrl = uni.getStorageSync("doctorInfo").qrCodeUrl;
			if(!this.$util.isEmpty(qrCodeUrl)){
				this.getQrCodeUrl();
			}
		},
		onShow() {
			
		},
		methods: {
			getQrCodeUrl: function() {
				that.$util.request({
					url: "/didi-doctor/inquiryinfo/queryPage",
					param: param,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						var data = res.data;
						if (data == null) {
							return;
						}
						that.inquiryList = that.inquiryList.concat(data.list);
						for (var i = 0; i < that.inquiryList.length; i++) {
							that.inquiryList[i].picUrl = that.inquiryList[i].picUrl.split(',')[0];
						}
						that.page = data.pageNum + 1;
						that.totalPages = data.total;
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
