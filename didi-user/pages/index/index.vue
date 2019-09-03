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
			<view class="contOver" v-for="(item,index) in contOneList" :key="index">
				<view class="idxMainBox">
					<view class="contRtImg"><image :src="item.imgs"></image></view>
					<view class="contOverLt">
						<view class="contTxt">{{ item.title }}</view>
						<view class="contTime">{{ item.updateTime }}</view>
					</view>
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
					{ id:1, imgs:'../../static/banner.jpg' },
					{ id:2, imgs:'../../static/banner.jpg' }
				],//轮播图
				contOneList:[
					{ id:1, title:'d发酵的发酵发酵粉阿噶鸡辣椒啊大', updateTime:'2019-7-30', imgs:'../../static/banner.jpg' },
					{ id:2, title:'发大发看风景啊剪短发发酵的风景啊多了', updateTime:'2019-7-30', imgs:'../../static/banner.jpg' },
				],//内容1
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
			}
		},
		onLoad() {

		},
		methods: {

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
				float: right;
				width: 500upx; 
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
	
</style>
