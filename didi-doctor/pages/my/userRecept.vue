<template>
	<view class="content">
		<view class="record">
			<view class="li" v-if="list.length > 0" v-for="(item,index) in list" :key="index">
				<view class="left">
					 <image :src="item.picUrl"></image>
				</view>
				<view class="right" @click="toInquiryDetail(item.inquiryId)">
					<label style="color: red">{{item.realName}}</label>
					<label>{{item.createTime}}</label>
					<text>{{item.detail}}</text>
				</view>
				<view class="rig">
					<page-button :height="25" :width="75" @click="toGene(item.inquiryId)" name="基因检测"></page-button>
				</view>
			</view>
		</view>

		<empty-view :data="list" :top="36"></empty-view>
	</view>
</template>

<script>
	import emptyView from '../../components/emptyview.vue';
	import PageButton from '../../components/button.vue';

	export default {
		data() {
			return {
				list: [],
				pageNum: 1,
				pageSize: 10,
				total: 1,
				doctorId:''
			}
		},
		components: {
			emptyView,
			PageButton
		},
		onLoad(options) {
			this.doctorId = uni.getStorageSync("doctorInfo").doctorId;
			// this.pageNum = 1;
			// this.total = 1;
			// this.list = [];
			this.getUserInquiry();
		},
		onShow() {
			
		},
		onReady() {

		},
		onReachBottom() {
			this.getUserInquiry();
		},

		methods: {
			getUserInquiry:function() {
				let that = this;
				if (that.total <= (that.pageNum - 1) * that.pageSize) {
					return;
				}
				const params = {};
				params.pageNum = that.pageNum;
				params.pageSize = that.pageSize;
				params.doctorId = that.doctorId;
				that.$util.request({
					url: "/didi-doctor/inquiryinfo/queryPage",
					param: params,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						that.list = that.list.concat(res.data.list);
						that.pageNum += 1;
						that.total = res.data.total;
						for (var i = 0; i < that.list.length; i++) {
							that.list[i].picUrl = that.list[i].picUrl.split(',')[0];
						}
					},
					error: function() {}
				})
			},
			toInquiryDetail:function(inquiryId){
				uni.navigateTo({
					url:'/pages/inquiry/inquiryDetail?inquiryId='+inquiryId
				})
			},
			toGene:function(inquiryId){
				uni.navigateTo({
					url:'/pages/my/userGeneAdd?inquiryId='+inquiryId
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>

	.record {
		width: 100%;
		background: $uni-bg-color;

		.li {
			margin-left: 40upx;
			// margin-right: 50rpx;
			height: 150upx;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid $uni-bg-color-grey;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;

			.left {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				
				image{
					width: 125rpx;
					height: 125rpx;
				}
			}

			.right {
				margin-left: 20upx;
				width:350rpx;
				color: #fb5b67;
				font-size: $uni-font-size-lg;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				
				label {
					font-size: $uni-font-size-lg;
					color: $uni-text-color-qh;
					
				}
				
				text {
					color: $uni-text-color-grey;
					font-size: $uni-font-size-base;
					margin-top: 10upx;
					width:350rpx;
					text-overflow:ellipsis;/* 超出部分显示省略号 */
				}
			}
			.rig{
				width: 225rpx;
			}
		}
	}
</style>
