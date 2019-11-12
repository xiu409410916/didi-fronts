<template>
	<view class="content">
		<view class="bg"></view>
		<view class="content-view">
			<view class="box-view">
					
				<!--头部-->
				<view class="meHead">
					<view class="meHeadAvatar"><image :src="patientInfo.avatarUrl" mode="aspectFill"></image></view>
					<view class="meHeadName">
						<button open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">{{ patientInfo.nickName }}</button>
					</view>
					<view class="meHeadName">
						<button plain="true" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">{{patientInfo.mobile}}</button>
					</view>
					
				</view>
				<!--头部-->
				
				<!--模板-->
				<!-- <view class="meOverBg">
					<view class="meVisitor">
						<view class="meVisitorLt">
							<view class="meVisitorTxt_02">剩余时间</view>
							<view class="meVisitorTxt_01">{{patientInfo.time}}分钟</view>
						</view>
						<view class="meVisitorLt">
							<view v-if="patientInfo.mobile!=null" class="meVisitorTxt_01">{{patientInfo.mobile}}</view>
							<button v-else class="meVisitorTxt_02" plain="true" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>
						</view>
					</view>
				</view> -->
				<!--模板-->
				
				<view class="con">
					<view class="vi" @click="toMyInquiry">
						<view class="left"><image src="../../static/inquiry.png"></image>我的问诊</view>
						<view class="right"><image src="../../static/you.png"></image></view>
					</view>
					<view class="vi" @click="toMyGene">
						<view class="left"><image src="../../static/time.png"></image>我的基因检测</view>
						<view class="right"><image src="../../static/you.png"></image></view>
						 <navigator></navigator> 
					</view>
					<view class="vi" @click="toQrCode">
						<view class="left"><image src="../../static/qrcode.png"></image>我的二维码</view>
						<view class="right"><image src="../../static/you.png"></image></view>
						<navigator></navigator>
					</view>
					<!-- <view class="vi" @click="toUserAmount" v-if="patientInfo.agentId">
						<view class="left"><image src="../../static/qrcode.png"></image>我的余额</view>
						<view class="right"><image src="../../static/you.png"></image></view>
						<navigator></navigator>
					</view> -->
					<view class="vi" @click="toDidiDetail">
						<view class="left"><image src="../../static/about.png"></image>关于我们</view>
						<view class="right"><image src="../../static/you.png"></image></view>
						<!-- <navigator></navigator> -->
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	
	
	export default {
		components:{
	
		},
		
		data() {
			return {
				patientInfo: {
					avatarUrl: '../../static/avatar.png',
					nickName:'点击登录',
					time:0,
					patientId:'',
					mobile:"获取手机号",
					agentId:null
				}
			}
		},
		onLoad() {
			let that = this;
			var info = uni.getStorageSync("patientInfo");
			// if(that.$util.isEmpty(info.avatarUrl)){
			// 	that.patientInfo = info;
			// }
			if(!that.$util.isEmpty(info.mobile)){
				info.mobile = '获取手机号';
			}
			if(!that.$util.isEmpty(info.avatarUrl)){
				info.avatarUrl = '../../static/avatar.png';
				info.nickName = '点击登录';
			}
			that.patientInfo = info;
			that.patientInfo.patientId = info.patientId;
		},
		onShow() {
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: '#00C694',
			    
			})
		},
		methods: {
			toMyTime:function(){
				uni.navigateTo({
					url:'/pages/my/userTime'
				})
			},
			toMyInquiry:function(){
				uni.navigateTo({
					url:'/pages/my/userInquiry'
				})
			},
			wxGetUserInfo:function(res) {
				let that = this
				if (!res.detail.iv) {
					uni.showToast({
						title: "您取消了授权,登录失败",
						icon: "none"
					});
					return false;
				}
				var uerInfo = res.detail.userInfo
				that.modifyInfoByOpenId(uerInfo.avatarUrl,uerInfo.nickName)
			},
			//POST 
			modifyInfoByOpenId:function(avatarUrl,nickName){
				let that=this;
				var temp = {};
				temp.patientId = that.patientInfo.patientId;
				temp.avatarUrl=avatarUrl;
				temp.nickName=nickName;
				that.$util.request({
					url: "/didi-patient/patientinfo/modifyUserInfo",
					param: temp,
					success: function(res) {
						if(!that.$util.isEmpty(res.data.mobile)){
							res.data.mobile = '获取手机号';
						}
						that.patientInfo = res.data;
						uni.setStorageSync('patientInfo', res.data);
					},
					error: function() {}
				})
			},
			getPhoneNumber: function(e) {
				if (e.target.errMsg == 'getPhoneNumber:ok') {
					this.createUserByWechatTelephone(e.target.encryptedData,e.target.iv)
				} else {
			        uni.navigateTo({
						url:'../../login/login'
					})
				} 
			},
			//微信手机号码创建用户
			createUserByWechatTelephone: function(encryptedData,iv){
				let that=this;
				const params={}
				params.encryptedData=encryptedData;
				params.iv=iv;
				that.$util.request({
					url: "/didi-patient/patientinfo/modifyMobileInfo",
					param: params,
					success: function(res) { 
						that.patientInfo = res.data;
						if(!that.$util.isEmpty(res.data.avatarUrl)){
							res.data.avatarUrl = '../../static/avatar.png';
							res.data.nickName = '点击登录';
						}
						uni.setStorageSync('patientInfo', res.data);
					},
					error: function() {}
				})
			},
			toDidiDetail:function(){
				uni.navigateTo({
					url:'/pages/my/didiDetail'
				})	
			},
			toQrCode:function(){
				uni.navigateTo({
					url:'/pages/my/userQrCode'
				})
			},
			toMyGene:function(){
				uni.navigateTo({
					url:'/pages/my/userGene'
				})
			},
			toUserAmount:function(){
				uni.navigateTo({
					url:'/pages/my/userAmount?agentId='+this.agentId
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
			height: 150upx;
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
			width: 20%;
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
			width: 30%;
			line-height: 120upx;
			
			overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap; 
			button{
				margin: 0rpx;
				padding: 0rpx;
				background-color: #00C694;
				display: inline;
				color: #FFFFFF;
				font-size: 28upx;
				width: 100rpx;
			}
			button::after{ border: none; }
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
		margin-top: 80upx;
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
					margin: 5 0 4upx 10upx;
				}
			}
		}
	}
	
	
</style>
