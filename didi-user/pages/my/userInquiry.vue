<template>
	<view class="content">
		<view class="header">
			<view class="center">
				<label>时间:{{time}}分钟</label>
			</view>
		</view>

		<view class="record">
			<view class="li" v-if="list.length > 0" v-for="(item,index) in list" :key="index">
				<view class="left">
					<label>{{balanceType[item.timeType]}}</label>
					<text>{{item.orderNo}}</text>
				</view>
				<view class="right">
					<label>{{item.time}}</label>
					<text>{{item.createTime}}</text>
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
				time: 0,
				balanceType: ['购买', '消费', '退款','后台增加']
			}
		},
		components: {
			emptyView
		},
		onLoad(options) {


		},
		onShow() {
			this.time = uni.getStorageSync("patientInfo").time;
			this.pageNum = 1;
			this.total = 1;
			this.list = [];
			this.getUserTime();
		},
		onReady() {

		},
		onReachBottom() {
			this.getUserTime();
		},

		methods: {
			getUserTime() {
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
					},
					error: function() {}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		position: relative;
		height: 150upx;
		width: 100%;
		background: linear-gradient(to right, $bg-start, $bg-end);
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: $uni-spacing-row-base;

		.center {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #fff;
			padding-top: 20upx;
			font-size: 40upx;

			button {
				padding-left: 0rpx;
				padding-right: 0rpx;
				width: 100rpx;
				height: 50rpx;
				line-height: 50rpx;
				float: left;
				font-size: 30rpx;
				color: #fb5b67;
				margin-top: 10rpx;
			}
		}
	}

	.record {
		width: 100%;
		background: $uni-bg-color;

		.li {
			margin-left: 66upx;
			height: 125upx;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid $uni-bg-color-grey;

			.left {
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

			.right {
				margin-right: 40upx;
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
