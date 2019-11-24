<template>
	<view class="content">
		<view class="record">
			<view class="li" v-if="learnList.length > 0" v-for="(item,index) in learnList" :key="index">
				<view class="left">
					<label>{{item.fileName}}</label>
				</view>
				<view class="right">
					<button @click="downloadlearn(item.url)">下载</button>
				</view>
			</view>
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
				learnList: [],
				page: 1,
				size: 10,
				totalPages: 1
			}
		},
		onShow() {
			let that = this;
			that.learnList = [];
			that.page = 1;
			that.size = 10;
			that.totalPages = 1;
			that.getlearnList();
		},
		onLoad() {

		},
		onPullDownRefresh() {
			// 增加下拉刷新数据的功能
			var self = this;
			self.getlearnList();
		},
		methods: {
			getlearnList: function() {
				let that = this;
				if (that.totalPages <= (that.page - 1) * that.size) {
					return;
				}
				var param = {};
				param.pageNum = that.page;
				param.pageSize = that.size;
				that.$util.request({
					url: "/didi-doctor/ossfile/findList",
					param: param,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						var data = res.data;
						if (data == null) {
							return;
						}
						that.learnList = that.learnList.concat(data);
						that.page = data.pageNum + 1;
						that.totalPages = data.total;
					},
					error: function() {}
				})
			},
			downloadlearn:function(url){
				console.log(url);
				uni.downloadFile({
				    url: url, 
				    success: function(res) {
						uni.playVoice({
						        filePath: res.tempFilePath
						      })
				    },
					fail:function(res) {
						console.log(res);
					}
				});
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
