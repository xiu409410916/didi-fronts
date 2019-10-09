<template>
	<view class="content">
		<form>
			<view class="text">
				<label>打分</label>
				<image :src="url[0]" @click="starClick(0)"></image>
				<image :src="url[1]" @click="starClick(1)"></image>
				<image :src="url[2]" @click="starClick(2)"></image>
				<image :src="url[3]" @click="starClick(3)"></image>
				<image :src="url[4]" @click="starClick(4)"></image>
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
				},
				commentRate:'',
				url:['../../static/star.png','../../static/star.png','../../static/star.png','../../static/star.png','../../static/star.png']
			}
		},
		onLoad(options) {
			this.temp = JSON.parse(options.detail)
		},
		onShow() {
			
		},
		methods: {
			commentDoctor:function(){
				// let that = this;
				if(!this.$util.isEmpty(this.commentRate)){
					uni.showToast({
						title: '请打分',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!this.$util.isEmpty(this.temp.commentContent)){
					uni.showToast({
						title: '请输入评价内容',
						icon:'none',
						duration: 2000
					});
					return;
				}
				this.temp.commentRate = this.commentRate;
				console.log(this.temp);
				this.$util.request({
					url: "/didi-patient/patientcommentdoctor/add" ,
					param: this.temp,
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
			},
			starClick:function(index){
				this.commentRate = index + 1;
				for(var i = 0 ; i< index+1 ;i++){
					this.url[i] = '../../static/star_select.png';
				}
				for(var i = index+1 ; i< 5 ;i++){
					this.url[i] = '../../static/star.png';
				}
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
			}
			label {
				width: 20%;
				color: $uni-text-color-qh;
				float: left;
			}
			image{
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
			}
		}
		
		.savebox {
			display: flex;
			justify-content: center;
			padding: 50upx 0 30upx;
		}
		
	}
	
	
	
</style>
