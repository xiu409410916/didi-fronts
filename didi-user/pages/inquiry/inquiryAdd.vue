<template>
	<view class="content">
		<form>
			<view class="li">
				<textarea class="inp" v-model="temp.detail" placeholder="请描述你的性别，年龄，症状，就诊经历，我们会保证你的隐私权..." />
			</view>
			<view class="nli">
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
				console.log("---------");
				console.log(this.temp.picUrl);
				uni.navigateTo({
					url:"/pages/inquiry/inquiryNext"
				})
			},
			getAvatarUrl:function(v){
				this.temp.picUrl.concat(v+";");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		position: relative;
		
		.li {
			width: calc(100%-33px);
			margin-left: 33px;
			height: 100upx;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
		
			label {
				width: 20%;
				color: $uni-text-color-qh;
			}
		
			.inp {
				height: 100%;
				width: 80%;
				border-bottom: 2upx solid $uni-text-color-eee;
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: center;
		
				.nla {
					width: 20%;
					display: flex;
					flex-flow: row nowrap;
					justify-content: flex-start;
					align-items: center;
		
					.name {
						color: $uni-text-color-grey;
						font-size: $uni-font-size-sm;
					}
				}
			}
		
			.nobottom {
				border-bottom: 0;
			}
		}
		
	}
</style>
