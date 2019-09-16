<template>
	<view class="content">
		<form>
			<view class="text">
				<label>打分</label>
				<input v-model="temp.commentRate" placeholder="请输入1—10分的评价" />
			</view>
			<view class="text">
				<label>评价</label>
				<textarea v-model="temp.commentContent" placeholder="请输入对接单医生的评价..." />
			</view>
			<view class="savebox">
				<page-button :height="40" :width="100" @click="commentDoctor" name="评价医生"></page-button>
			</view>
		</form>

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
				temp:{
					inquiryId:'',
					receptId:'',
					doctorId:'',
					doctorName:'',
					commentRate:'',
					commentContent:''
				}
			}
		},
		onLoad(options) {
			this.temp = JSON.parse(options.detail)
		},
		onShow() {
			
		},
		methods: {
			commentDoctor:function(){
				let that = this;
				that.$util.request({
					url: "/didi-patient/patientcommentdoctor/add" ,
					param: that.temp,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						setTimeout(function() {
							uni.navigateBack({
								delta:-1
							})
						}, 1000)
						uni.showToast({
							title: '发布成功',
							icon: 'success',
							duration: 2000
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
		.text {
			align-items: left;
			margin-left: 33px;
			margin-right: 33rpx;
			padding-top: 30rpx;
			textarea{
				width: 80%;
				height: 350rpx;
				margin-left: 20%;
				border-bottom: 2upx solid $uni-text-color-eee;
				
			}
			input{
				border-bottom: 2upx solid $uni-text-color-eee;
				
			}
			label {
				width: 20%;
				color: $uni-text-color-qh;
				float: left;
			}
		}
		
		.savebox {
			display: flex;
			justify-content: center;
			padding: 50upx 0 30upx;
		}
		
	}
	
	
	
</style>
