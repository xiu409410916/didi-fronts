<template>
	<view class="content">
		<view class="info">
			<!-- #ifdef MP-WEIXIN -->
			<button plain="true">
			   <image class="img" :src="doctorInfo.avatarUrl"></image>
			</button>
	        <!-- #endif -->
			<view class="c-1">余额:{{doctorInfo.amount/100}}元</view>
			<view class="c-2" @click="pdLogin()">完善资料</view>
			<image class="set" src="http://pvllxl0mi.bkt.clouddn.com/shezhi.png" @click="setPassword"></image>
		</view>
		<view class="b">
			<button>{{doctorInfo.doctorName}}</button>
		</view>
	</view>
</template>

<script>
	export default{
		components:{  },
		props:{
			doctorInfo: {
				// avatarUrl: 'http://pvllxl0mi.bkt.clouddn.com/icon_weidenglu1@2x.png',
				// doctorName:'',
				// amount:0,
			}
		},
		data(){
			return{
				
			}
		}, 
		onShow(){
			
		},
		methods:{
			pdLogin:function(){
				uni.navigateTo({
					url: '/pages/my/userDetail'
				})
			},
			setPassword:function(){
				uni.navigateTo({
					url: '/pages/my/userPassword'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		width:100%;
		background: $uni-bg-color;
		border-bottom: 1px solid $uni-text-color-eee;
		.info{
			margin-left: 50upx;
			width: calc(100%-50upx);
			height: 185upx;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			padding-top: 30upx;
			.img{
				height: 185upx;
				width: 185upx;
				border-radius: 60upx;
			}
			.c-1{
				display: inline-block;
				width: 80px;
				line-height: 30px;
				height: 30px;
				background: linear-gradient(to right, $bg-start, $bg-end);
				text-align: center;
				border-radius: 35upx;
				color: $uni-text-color-inverse;
			}
			.c-2{
				display: inline-block;
				width: 80px;
				line-height: 28px;
				height: 28px;
				border: 1px solid #979797;
				text-align: center;
				border-radius: 35upx;
				color: $uni-text-color-qh;
			}
			.set{
				height: 50upx;
				width: 50upx;
				margin-right: 40upx;
			}
		}
		.b{
			margin-left: 50upx;
			width: calc(100%-50upx);
			height: 100upx;
			font-size: $uni-font-size-big;
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
			.link{
				display: inline-block;
				padding: 2upx 15upx;
				height: 36upx; 
				line-height: 36upx;
				font-size:$uni-font-size-sm;
				background: $uni-bg-color-yellow;
				border-radius: 30upx;
				margin-left: 20upx;
				color: $uni-text-color-inverse;
				text-align: center;
			}
		}
		
	}
	button{
		margin-left: 0;
		margin-right: 0;
		padding-left: 0px;
		padding-right: 0px;
	}
</style>
