<template>
	<view class="content">
		<view class="record">
			<view class="li" v-if="list.length > 0" v-for="(item,index) in list" :key="index" @click="toInquiryDetail(item.inquiryId)">
				<view class="left">
					 <image :src="item.picUrl"></image>
				</view>
				<view class="right">
					<label style="color: red">{{statesDetail[item.states]}}</label>
					<label>{{item.createTime}}</label>
					<text>{{item.detail}}</text>
				</view>
			</view>
		</view>

		<empty-view :data="list" :top="36"></empty-view>
	</view>
</template>

<script>
	import emptyView from '../../components/emptyview.vue';

	export default {
		data() {
			return {
				list: [],
				pageNum: 1,
				pageSize: 10,
				total: 1,
				statesDetail: ['等待医生接诊中...', '正在问诊','', '已结束问诊','已取消问诊']
			}
		},
		components: {
			emptyView
		},
		onLoad(options) {


		},
		onShow() {
			this.pageNum = 1;
			this.total = 1;
			this.list = [];
			this.getUserInquiry();
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
				that.$util.request({
					url: "/didi-patient/inquiryinfo/queryPage",
					param: params,
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
					url:'/pages/my/inquiryDetail?inquiryId='+inquiryId
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
			margin-right: 50rpx;
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
				// margin-right: 40upx;
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
				}
			}
		}
	}
</style>
