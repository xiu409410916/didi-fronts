<template>
	<view class="content">
		<form>
			<view class="text">
				<label>问题描述</label>
				<textarea v-model="temp.detail" auto-height="true"  disabled="true" />
			</view>
			<view class="li">
				<image :src="picUrls[0]"></image>
				<image :src="picUrls[1]"></image>
				<image :src="picUrls[2]"></image>
			</view>
			<view class="li">
				<label>患者姓名</label>
				<input class="inp" v-model="temp.realName" disabled="true" />
			</view>
			<view class="li">
				<label>身份证号</label>
				<input class="inp" v-model="temp.idCard" disabled="true" />
			</view>
			<view class="li">
				<label>体重(kg)</label>
				<input class="inp" v-model="temp.weight" disabled="true" />
			</view>
			<view class="li">
				<label>介绍</label>
				<input class="inp" v-model="temp.de" disabled="true" />
			</view>
			<view class="text">
				<label>过往病史</label>
				<textarea v-model="temp.medicalHistory" auto-height="true" />
			</view>
			<view class="li" v-if="temp.states == 1 || temp.states == 3">
				<label>医生姓名</label>
				<input class="inp" v-model="temp.doctorName" disabled="true" />
			</view>
			<view class="text" v-if="temp.states == 1 || temp.states == 3">
				<label>医生简介</label>
				<textarea v-model="temp.introduction" auto-height="true" />
			</view>
			<view class="savebox">
				<page-button v-if="temp.payStates != 1 && temp.states == 0" :height="40" :width="100" @click="payInquiry" name="立即支付"></page-button>
				<page-button v-if="temp.states == 0" :height="40" :width="100" @click="cancelInquiry" name="取消问诊"></page-button>
				<page-button v-if="temp.states == 3" :height="40" :width="100" @click="commentDoctor" name="评价医生"></page-button>
			</view>
		</form>

	</view>
</template>

<script>
	import PageButton from '../../components/button.vue';

	export default {
		components: {
			PageButton,
		},

		data() {
			return {
				temp:{
					inquiryId:'',
					detail:'',
					picUrl:'',
					realName:'',
					idCard:"",
					gender:"",
					weight:'',
					allergic:'',
					conceive:'',
					liver:'',
					kidney:'',
					medicalHistory:'',
					states:'',
					doctorId:'',
					doctorName:'',
					introduction:'',
					receptId:'',
					de:'',
					payStates:''
				},
				picUrls:[]
			}
		},
		onLoad(options) {
			this.temp.inquiryId = options.inquiryId;
			this.getInquiryDetail();
		},
		onShow() {
			
		},
		methods: {
			getInquiryDetail:function(){
				let that = this;
				var dd = {"inquiryId":that.temp.inquiryId}
				that.$util.request({
					url: "/didi-patient/inquiryinfo/getDetailInfo" ,
					param: dd,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						that.temp = res.data;
						that.picUrls = that.temp.picUrl.split(',');
					},
					error: function() {}
				})
			},
			commentDoctor:function(){
				uni.navigateTo({
					url:'/pages/my/commentDoctor?detail='+JSON.stringify(this.temp)
				})
			},
			cancelInquiry:function(){
				let that = this;
				var dd = {"inquiryId":that.temp.inquiryId}
				that.$util.request({
					url: "/didi-patient/inquiryinfo/cancelInquiry" ,
					param: dd,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						uni.showToast({
							title: '取消成功',
							icon: 'success',
							duration: 2000
						})
						that.getInquiryDetail();
					},
					error: function() {}
				})
			},
			payInquiry:function(){
				let that = this;
				var temp = {};
				temp.inquiryId = that.temp.inquiryId;
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
	.content {
		width: 100%;
		background: $uni-text-color-inverse;
		margin-top: 20upx;
	
		.li {
			width: calc(100%-33px);
			margin-left: 33px;
			height: 100upx;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
		
			label {
				width: 20%;
				color: $uni-text-color-qh;
			}
		
			.inp {
				height: 100%;
				width: 80%;
				border-bottom: 2upx solid $uni-text-color-eee;
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: center;
		
				.nla {
					width: 20%;
					display: flex;
					flex-flow: row nowrap;
					justify-content: flex-start;
					align-items: center;
		
					.name {
						color: $uni-text-color-grey;
						font-size: $uni-font-size-sm;
					}
				}
			}
		
			.nobottom {
				border-bottom: 0;
			}
			
			image{
				width: 100rpx;
				height: 100rpx;
			}
		}
		
		
		.text {
			align-items: left;
			margin-left: 33px;
			margin-right: 33rpx;
			padding-top: 30rpx;
			textarea{
				width: 80%;
				height: 350rpx;
				margin-left: 20%;
				
			}
			label {
				width: 20%;
				color: $uni-text-color-qh;
				float: left;
			}
		}
		
		.savebox {
			display: flex;
			justify-content: center;
			padding: 50upx 0 30upx;
		}
		
	}
	
	
	
</style>
