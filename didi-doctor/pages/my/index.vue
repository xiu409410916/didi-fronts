<template>
	<view class="content">
		<view class="bg"></view>
		<view class="content-view">
			<view class="box-view">
					
				<!--头部-->
				<view class="meHead">
					<view class="meHeadAvatar"><image :src="doctorInfo.avatarUrl" mode="aspectFill"></image></view>
					<view class="meHeadName"><text@click="BindGetUserInfo()">{{ doctorInfo.doctorName }}</text></view>
				</view>
				<!--头部-->
				
				<!--模板-->
				<view class="meOverBg">
					<view class="meVisitor">
						<view class="meVisitorLt">
							<view class="meVisitorTxt_02">余额</view>
							<view class="meVisitorTxt_01">{{doctorInfo.amount/100}}元</view>
						</view>
						<view class="meVisitorLt" @click="pdLogin()">
							<view class="meVisitorTxt_02">完善资料</view>
							<view class="meVisitorTxt_01">未完善</view>
						</view>
					</view>
				</view>
				<!--模板-->
				
				<view class="con">
					<view class="vi" @click="toUserAmount">
						<view class="left"><image src="../../static/logo.png"></image>我的余额</view>
						<view class="right"><image src="../../static/you.png"></image></view>
					</view>
					<view class="vi" @click="toBankInfo">
						<view class="left"><image src="../../static/logo.png"></image>我的银行卡</view>
						<view class="right"><image src="../../static/you.png"></image></view>
						<navigator></navigator>
					</view>
					<view class="vi">
						<view class="left"><image src="../../static/logo.png"></image>我的接单</view>
						<view class="right"><image src="../../static/you.png"></image></view>
						<navigator></navigator>
					</view>
					<view class="vi">
						<view class="left"><image src="../../static/logo.png"></image>成为代理商</view>
						<view class="right"><image src="../../static/you.png"></image></view>
						<navigator></navigator>
					</view>
					<view class="vi" @click="toMy">
						<view class="left"><image src="../../static/logo.png"></image>关于我们</view>
						<view class="right"><image src="../../static/you.png"></image></view>
						<navigator></navigator>
					</view>
				</view>
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
				doctorInfo: {
					avatarUrl: '../../static/avatar.png',
					doctorName:'点击登录',
					amount:0,
				}
			}
		},
		onShow() {
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: '#00C694',
			    
			})
			// this.doctorInfo = uni.getStorageSync("doctorInfo");
		},
		methods: {
			pdLogin:function(){
				uni.navigateTo({
					url: '/pages/my/userDetail'
				})
			},
			setPassword:function(){
				uni.navigateTo({
					url: '/pages/my/userPassword'
				})
			},
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
	.content{
		width: 100%;
		position: relative;
		.bg {
			width: 100%;
			height: 220upx;
			display: block;
			background: #00C694;
		}
		.content-view {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			.box-view {
				width: 92%;
				margin: 0 auto;
			}
		}
	}
	
	.meHead{
		overflow: hidden;
		position: relative; 
		.meHeadAvatar{ 
			float: left;
			width: 19%;
			margin-top: 10upx; 
			image{ 
				width: 110upx;
				height: 110upx;
				display: block;
				border-radius: 50%; 
			}
		}
		.meHeadName{ 
			float: left;
			width: 81%;
			line-height: 120upx;
			color: #FFFFFF;
			font-size: 28upx;
			overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap; 
		}
	}
	
	.meOverBg{ 
		background: #FFFFFF;
		overflow: hidden;
		border-radius: 12upx;
		margin-top: 30upx; 
		.meVisitor{ 
			display: flex;
			flex-direction: row; 
			.meVisitorLt{ 
				width: 50%;
				text-align: center;
				margin: 30upx 0; 
				&:nth-child(1){ 
					border-left: 1px #F5F5F5 solid;
					border-right: 1px #F5F5F5 solid; 
				}
				.meVisitorTxt_01{ 
					font-size: 28upx;
					color: #666666; 
				}
				.meVisitorTxt_02{
					font-size: 30upx;
					color: #3B7ED5; 
				}
			}
		}
	}
	
	.con{
		background: #FFFFFF;
		overflow: hidden;
		border-radius: 12upx;
		margin-top: 30upx;
		.vi{
			overflow: hidden;
			padding: 30upx;
			border-bottom: 1px #F5F5F5 solid;
			transition: all 0.4s;
			&:active{ background: #E2E2E2; }
			&:last-child{ border-bottom: none; }
			.left {
				float: left;
				font-size: 28upx;
				color: #333333;
				image {
					width: 35upx;
					height: 35upx;
					vertical-align: middle;
					margin: 0 10upx 4upx 0;
				}
			}
			.right {
				float: right;
				font-size: 28upx;
				color: #333333;
				image {
					width: 20upx;
					height: 20upx;
					vertical-align: middle;
					margin: 0 0 4upx 10upx;
				}
			}
		}
	}
	
	
</style>
