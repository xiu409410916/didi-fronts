<template>
	<view class="content">
		<user-info></user-info>
		
		<view class="con">
			
			<view class="vi" @click="toUserAmount">
				<image src="../../static/logo.png" class="left"></image>
				<text class="text">我的余额</text>
				<image src="../../static/my-1.png" class="right"></image>
			</view>
			
			<view class="vi" @click="toBankInfo">
				<image src="../../static/logo.png" class="left"></image>
				<text class="text">我的银行卡</text>
				<image src="../../static/my-1.png" class="right"></image>
			</view>
			
			<view class="vi">
				<image src="../../static/logo.png" class="left"></image>
				<text class="text">我的接单</text>
				<image src="../../static/my-1.png" class="right"></image>
			</view>
			
			<view class="vi">
				<image src="../../static/logo.png" class="left"></image>
				<text class="text">成为代理商</text>
				<image src="../../static/my-1.png" class="right"></image>
			</view>
			
			<view class="vi" @click="toMy">
				<image src="../../static/logo.png" class="left"></image>
				<text class="text">关于我们</text>
				<image src="../../static/my-1.png" class="right"></image>
			</view>
			
		</view>
	</view>
</template>

<script>
	
	import UserInfo from '../../components/userinfo.vue';
	
	export default {
		components:{
				UserInfo,
		},
		
		data() {
			return {
				doctorInfo:{}
			}
		},
		onShow() {
			this.doctorInfo = uni.getStorageSync("doctorInfo");
		},
		methods: {
			toBankInfo:function(){
				uni.navigateTo({
					url:'/pages/my/userBank'
				})
			},
			toUserAmount:function(){
				uni.navigateTo({
					url:'/pages/my/userAmount?amount='+this.doctorInfo.amount
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

	.con{
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: $uni-bg-color;
		.vi{
			height: 100rpx;
			width: 650rpx;
			border-bottom: 1px solid $uni-text-color-eee;
			font-size: 40rpx;
			image{
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
	
	
</style>
