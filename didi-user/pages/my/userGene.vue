<template>
	<view class="content">
		<view class="record">
			<view class="li" v-if="list.length > 0" v-for="(item,index) in list" :key="index">
				<view class="left">
					 <image :src="item.geneUrl"></image>
				</view>
				<view class="right">
					<label style="color: red">{{payStates[item.payStates]}}</label>					
					<label>{{item.createTime}}</label>
					<text>{{item.geneName}}</text>
				</view>
				<view class="right">
					<page-button v-if="item.payStates == 0" :height="25" :width="85" @click="payInquiry(item.inquiryGeneId)" name="立即支付"></page-button>
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
				payStates:['支付中','支付成功','支付失败','退款成功']
			}
		},
		components: {
			emptyView,
			PageButton
		},
		onLoad(options) {


		},
		onShow() {
			this.pageNum = 1;
			this.total = 1;
			this.list = [];
			this.getUserGene();
		},
		onReady() {

		},
		onReachBottom() {
			this.getUserGene();
		},

		methods: {
			getUserGene:function() {
				let that = this;
				if (that.total <= (that.pageNum - 1) * that.pageSize) {
					return;
				}
				const params = {};
				params.pageNum = that.pageNum;
				params.pageSize = that.pageSize;
				that.$util.request({
					url: "/didi-patient/inquirygeneinfo/queryPage",
					param: params,
					success: function(res) {
						that.list = that.list.concat(res.data.list);
						that.pageNum += 1;
						that.total = res.data.total;
					},
					error: function() {}
				})
			},
			payInquiry:function(inquiryGeneId){
				let that = this;
				var temp = {};
				temp.inquiryGeneId = inquiryGeneId;
				that.$util.request({
					url: "/didi-patient/patientpayinfo/unifiedOrder",
					param: temp,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						var data = res.data;
						 //调用微信支付
						uni.requestPayment({
						  'appId': data.appId,
						  'timeStamp': data.timeStamp,
						  'nonceStr': data.nonceStr,
						  'package': data.package,
						  'signType': data.signType,
						  'paySign': data.paySign,
						  'success': function (res) {
						    util.showSuccessToast("支付成功");
						    setTimeout(function () {
								uni.navigateBack({
									delta:1
								})
						    }, 1000);
						  },
						  'fail': function (res) {
						    uni.showToast({
						      title: res.message,
						      icon: 'none'
						    })
						  }
						})
					},
					error: function() {}
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
				margin-right: 20upx;
				width:70%;
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
