<template>
	<view class="content">
		<view class="record">
			<view class="li" v-if="list.length > 0" v-for="(item,index) in list" :key="index">
				<view class="left">
					<label>{{item.bankName}}</label>
					<text>{{item.bankAccount}}</text>
				</view>
				<view class="right">
					<label>{{states[item.states]}}</label>
					<text>{{item.createTime}}</text>
				</view>
			</view>
		</view>
		
		<empty-view :data="list" :top="30"></empty-view>
		<view class="defaultBox" v-if="isAudit == 2">
			<page-button :height="40" :width="300" @click="jumpToAddAgent" name="申请成为代理商"></page-button>
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
				list: [],
				page: 1,
				size: 10,
				totalPages: 1,
				doctorInfo:'',
				bankList:[],
				states:['正在审核','审核通过','审核失败'],
				isAudit:'2'		//是否有正在审核的
			}
		},
		onShow() {
			this.doctorInfo = uni.getStorageSync("doctorInfo");
			let that = this;
			that.list = [];
			that.page = 1;
			that.size = 10;
			that.totalPages = 1;
			that.getAgentList();
		},
		onLoad(options) {
			this.bankList = JSON.parse(options.bankList);
		},
		onPullDownRefresh() {
			// 增加下拉刷新数据的功能
			var self = this;
			self.getAgentList();
		},
		methods: {
			getAgentList: function() {
				let that = this;
				if (that.totalPages <= (that.page - 1) * that.size) {
					return;
				}
				var param = {};
				param.pageNum = that.page;
				param.pageSize = that.size;
				param.doctorId = that.doctorInfo.doctorId;
				that.$util.request({
					url: "/didi-doctor/agentinfo/queryPage",
					param: param,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						var data = res.data;
						if (data == null || data.list == null || data.list.length == 0) {
							return;
						}
						that.isAudit = data.list[0].states;
						that.list = that.list.concat(data.list);
						that.page = data.pageNum + 1;
						that.totalPages = data.total;
						for(var i = 0;i<that.list.length;i++){
							that.list[i].createTime = that.list[i].createTime.split(" ")[0];
						}
					},
					error: function() {}
				})
			},
			
			jumpToAddAgent: function() {
				if(this.doctorInfo.isAgent == '1'){
					uni.showToast({
						title: '不能重复申请',
						icon: 'success',
						duration: 2000
					})
					return;
				}
				uni.navigateTo({
					url: '/pages/my/userAgentAdd?bankList='+JSON.stringify(this.bankList)
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
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				label {
					font-size: $uni-font-size-lg;
					color: red;
				}
					
				text {
					color: $uni-text-color-grey;
					font-size: $uni-font-size-base;
					margin-top: 10upx;
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
