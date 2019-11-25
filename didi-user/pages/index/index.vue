<template>
	<view class="content">
		
		<!--轮播图-->
		<swiper class="swiper" indicator-active-color='#fff' :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item,index) in bannerList" :key='index' @click="JumpFuneralNews(index,item)">
				<view class="swiper-item uni-bg-red">
					<image :src="item.imgs"></image>
				</view>
				<view class="swiper-title">
					<view class="swiper-title-box">{{ item.title }}</view>
				</view>
			</swiper-item>
		</swiper>
		<!--轮播图-->
		
		<!--内容1-->
		<view class="contBg">
			<!-- <view class="contOver">
				<view class="idxMainBox" @click="toTimeBuy">
					<view class="contRtImg"><image src="../../static/banner.jpg"></image></view>
					<view class="contOverLt">
						<view class="contTxt">购买时间卡</view>
						<view class="contTime">问诊前购买，快速方便，剩余时间可随机退回</view>
					</view>
					<view class="right"><image src="../../static/you.png"></image></view>
				</view>
				
			</view> -->
			<view class="contOver">
				<view class="idxMainBox" @click="toInquiryAdd">
					<view class="contRtImg"><image src="../../static/banner.jpg"></image></view>
					<view class="contOverLt">
						<view class="contTxt">快速问诊</view>
						<view class="contTime">描述症状，快速匹配医生，及时解答</view>
					</view>
					<view class="right"><image src="../../static/you.png"></image></view>
				</view>
			</view>
		</view>
		<!--内容1-->
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList:[
					{ id:1, imgs:'../../static/my1.jpeg' },
					{ id:2, imgs:'../../static/my2.jpeg' }
				],//轮播图
				
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 1500,
			}
		},
		onLoad() {
			uni.showShareMenu({
				"title":"滴滴健康"
			});
		},
		
		methods: {
			toTimeBuy:function(){
				uni.navigateTo({
					url:'/pages/time/timeBuy'
				})
			},
			toInquiryAdd:function(){
				var info = uni.getStorageSync("patientInfo");
				if(!this.$util.isEmpty(info.mobile)){
					uni.showToast({
						title: '请先获取手机号',
						icon:'none',
						duration: 2000
					});
					return;
				}
				uni.navigateTo({
					url:'/pages/inquiry/inquiryAdd'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
		.swiper{
			height: 307rpx; 
			.swiper-item image{ 
				width: 100%;
				height: 307rpx;
				display: block; 
			}
		}
	}
	
	.contBg{
		background: #FFFFFF;
		overflow: hidden;
		margin-bottom: 30upx; 
		margin-top:30upx;
		.contOver{ 
			border-bottom: 1px #EDEDED solid;
			overflow: hidden;
			transition: all 0.4s; 
			&:active{ background: #E2E2E2; }
			&:last-child{ border-bottom: none; }
			.idxMainBox{ 
				width: 92%;
				margin: 0 auto; 
			}
			.contOverLt{ 
				float: left;
				width: 500upx; 
				margin-left: 30rpx;
				.contTxt{
					color: #333333;
					font-size: 30upx;
					width: 100%;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp:2;
					-webkit-box-orient:vertical;
					overflow: hidden;
					padding-top: 30upx;
				}
				.contTime{ 
					color: #888888;
					font-size: 24upx;
					margin-top: 30upx; 
					margin-bottom: 30upx;
				}
			}
			.contRtImg{ 
				float: left;
				width: 100upx;
				height: 100upx;
				margin: 30upx 0; 
				image{ 
					border-radius: 50%;
					width: 100upx;
					height: 100upx;
					display: block;
				}
			}
			
			
		}
	}
	
	
	.right {
		float: right;
		font-size: 28upx;
		color: #333333;
		margin-top: 60rpx;
		image {
			width: 20upx;
			height: 20upx;
			vertical-align: middle;
			margin: 0 0 4upx 10upx;
		}
	}
	
</style>
