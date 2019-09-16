<template>
	<view class="content">
		<view class="header">
			<view class="center">
				<label>余额:{{amount/100}}元</label>
				<button @click="toWithdraw" v-if="amount > 0">提现</button>
			</view>
		</view>

		<view class="record">
			<view class="li" v-if="list.length > 0" v-for="(item,index) in list" :key="index">
				<view class="left">
					<label>{{balanceType[item.balanceType]}}</label>
					<text>{{item.createTime}}</text>
				</view>
				<view class="right">{{item.balanceType == 2 ? '-' : '+'}}{{item.amount}}</view>
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
				pageSize: 8,
				total: 1,
				amount: 0,
				balanceType: ['接单分成', '代理商分成', '提现']
			}
		},
		components: {
			emptyView
		},
		onLoad(options) {
			
			
		},
		onShow() {
			this.amount = uni.getStorageSync("doctorInfo").amount;
			this.pageNum = 1;
			this.total = 1;
			this.list = [];
			this.getUserAmounts();
		},
		onReady() {

		},
		onReachBottom() {
			this.getUserAmounts();
		},

		methods: {
			getUserAmounts() {
				let that = this;
				if (that.total <= (that.pageNum - 1) * that.pageSize) {
					return;
				}
				const params = {};
				params.pageNum = that.pageNum;
				params.pageSize = that.pageSize;
				that.$util.request({
					url: "/didi-doctor/doctorbalanceinfo/queryPage",
					param: params,
					success: function(res) {
						that.list = that.list.concat(res.data.list);
						that.pageNum += 1;
						that.total = res.data.total;
						for(var i = 0;i<that.list.length;i++){
							that.list[i].amount = that.list[i].amount/100;
						}
					},
					error: function() {}
				})
			},
			toWithdraw:function(){
				uni.navigateTo({
					url:'/pages/my/userWithdraw?amount='+this.amount
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
			button{
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
			}
		}
	}
</style>
