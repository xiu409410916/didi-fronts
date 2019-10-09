<template>
	<view class="content">
		<form>
			<view class="text">
				<textarea v-model="temp.detail" placeholder="请描述你的性别，年龄，症状，就诊经历，我们会保证你的隐私权...(10-500个字)" />
			</view>
			<view class="nli">
				<label>病情图片(上传的附件仅为解答的医生可见,至少上传一张)</label>
				<image-upload @click="getAvatarUrl" :picUrls="temp.url"></image-upload>
				<image-upload @click="getAvatarUrl" :picUrls="temp.url"></image-upload>
				<image-upload @click="getAvatarUrl" :picUrls="temp.url"></image-upload>
			</view>
			
			<view class="savebox">
				<page-button :height="40" :width="300" @click="submit" name="下一步"></page-button>
			</view>
		</form>

	</view>
</template>

<script>
	import PageButton from '../../components/button.vue';
	import ImageUpload from '../../components/image-upload.vue';

	export default {
		components: {
			ImageUpload,
			PageButton,
		},

		data() {
			return {
				temp:{
					detail:'',
					url:'',
					picUrl:''
				}
			}
		},
		onShow() {
			
		},
		methods: {
			submit:function(){
				let that = this;
				if(!that.$util.isEmpty(that.temp.detail)){
					uni.showToast({
						title: '请输入病情描述',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(that.temp.detail.length < 10 || that.temp.detail.length > 500){
					uni.showToast({
						title: '请输入10-500个字符',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!that.$util.isEmpty(that.temp.picUrl)){
					uni.showToast({
						title: '请上传至少一张图片',
						icon:'none',
						duration: 2000
					});
					return;
				}
				var data = JSON.stringify(that.temp);
				uni.navigateTo({
					url:"/pages/inquiry/inquiryNext?temp="+data
				})
			},
			getAvatarUrl:function(v){
				this.temp.picUrl = this.temp.picUrl + v[0] + ",";
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		background: $uni-text-color-inverse;
		margin-top: 20upx;

		.nli {
			min-height: 270upx;
			width: calc(100%-33px);
			margin-left: 33px;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			margin-top: 30upx;
	
			label {
				display: block;
				width: 100%;
				color: $uni-text-color-qh;
			}
		}
	
		.savebox {
			display: flex;
			justify-content: center;
			padding: 50upx 0 30upx;
		}
	
		.text {
			align-items: left;
			margin-left: 33px;
			margin-right: 33rpx;
		}
	
		.text textarea {
			width: 100%;
			height: 250rpx;
		}
	}
</style>
