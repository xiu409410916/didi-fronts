<template>
	<view class="content">

	<!-- 	<view class="bankList" v-if="bankList.length>0" v-for="(item,index) in bankList" :key="index">
			<text class="bankName">{{item.bankName}}</text>
			<text class="bankAccount">{{item.bankAccount}}</text>
			<button @click="deleteBank(item.bankId)">删除</button>
		</view> -->
		<view class="record">
			<view class="li" v-if="bankList.length > 0" v-for="(item,index) in bankList" :key="index">
				<view class="left">
					<label>{{item.bankName}}</label>
					<text>{{item.bankAccount}}</text>
				</view>
				<view class="right">
					<button @click="deleteBank(item.bankId)">删除</button>
				</view>
			</view>
		</view>
		
		<empty-view :data="bankList" :top="30"></empty-view>
		<view class="defaultBox">
			<page-button :height="40" :width="300" @click="jumpToAddBank" name="新增银行卡"></page-button>
		</view>

	</view>
</template>

<script>
	import PageButton from '../../components/button.vue';
	import EmptyView from '../../components/emptyview.vue';

	export default {
		components: {
			PageButton,
			EmptyView
		},
		data() {
			return {
				bankList: [],
				page: 1,
				size: 10,
				totalPages: 1
			}
		},
		onShow() {
			let that = this;
			that.bankList = [];
			that.page = 1;
			that.size = 10;
			that.totalPages = 1;
			that.getBankList();
		},
		onLoad() {

		},
		onPullDownRefresh() {
			// 增加下拉刷新数据的功能
			var self = this;
			self.getBankList();
		},
		methods: {
			getBankList: function() {

				let that = this;
				if (that.totalPages <= (that.page - 1) * that.size) {
					return;
				}
				var param = {};
				param.pageNum = that.page;
				param.pageSize = that.size;
				that.$util.request({
					url: "/didi-doctor/doctorbankinfo/queryPage",
					param: param,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						var data = res.data;
						if (data == null) {
							return;
						}
						that.bankList = that.bankList.concat(data.list);
						that.page = data.pageNum + 1;
						that.totalPages = data.total;
					},
					error: function() {}
				})
			},
			jumpToAddBank: function() {
				uni.navigateTo({
					url: '/pages/my/userBankAdd'
				})
			},
			deleteBank:function(bankId){
				let that = this;
				var param = {};
				param.bankId = bankId;
				that.$util.request({
					url: "/didi-doctor/doctorbankinfo/delete",
					param: param,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						uni.showToast({
							title: '删除成功',
							icon: 'success',
							duration: 2000
						})
						setTimeout(function() {
							that.bankList = [];
							that.page = 1;
							that.size = 10;
							that.totalPages = 1;
							that.getBankList();
						}, 500)
					
					},
					error: function() {}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		// justify-content: center;

	}
	
	.record {
		width: 100%;
		background: $uni-bg-color;
		.li {
			margin-left: 66upx;	
			margin-top: 20rpx;
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
	}
	
	
	.defaultBox {
		width: 100%;
		position: fixed;
		height: 100rpx;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		background-color: #fff;
		padding: 30upx 0 30upx;
	}
</style>
