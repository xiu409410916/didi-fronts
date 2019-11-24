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
			<view class="contOver" v-for="(item,index) in inquiryList" :key="index" @click="toInquiryDetail(item.inquiryId)">
				<view class="idxMainBox">
					<view class="contRtImg"><image :src="item.picUrl"></image></view>
					<view class="contOverLt">
						<view class="contTxt">{{ item.detail }}</view>
						<view class="contTime">{{ item.createTime }}</view>
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
					{ id:1, imgs:'../../static/my1.jpeg' },
					{ id:2, imgs:'../../static/my2.jpeg' }
				],//轮播图
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				page: 1,
				size: 10,
				totalPages: 1,
				inquiryList:[],//内容1
			}
		},
		onShow() {
			this.page = 1;
			this.totalPages = 1;
			this.inquiryList = [];
			this.getInquiryList();
		},
		onLoad() {
			uni.showShareMenu({
				"title":"滴滴答答"
			});
		},
		onPullDownRefresh() {
			// 增加下拉刷新数据的功能
			var self = this;
			self.getInquiryList();
		},
		methods: {
			getInquiryList: function() {
				let that = this;
				if (that.totalPages <= (that.page - 1) * that.size) {
					return;
				}
				var param = {};
				param.pageNum = that.page;
				param.pageSize = that.size;
				param.states = 0;
				param.payStates = 1;
				that.$util.request({
					url: "/didi-doctor/inquiryinfo/queryPage",
					param: param,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						var data = res.data;
						if (data == null) {
							return;
						}
						that.inquiryList = that.inquiryList.concat(data.list);
						for (var i = 0; i < that.inquiryList.length; i++) {
							that.inquiryList[i].picUrl = that.inquiryList[i].picUrl.split(',')[0];
						}
						that.page = data.pageNum + 1;
						that.totalPages = data.total;
					},
					error: function() {}
				})
			},
			toInquiryDetail:function(inquiryId){
				let that = this;
				if (that.$util.isPerfectInfo()) {
					uni.navigateTo({
						url:'/pages/inquiry/inquiryDetail?inquiryId='+inquiryId
					})
				}
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
