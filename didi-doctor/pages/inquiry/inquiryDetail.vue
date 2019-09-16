<template>
	<view class="content">
		<form>
			<view class="text">
				<label>问题描述</label>
				<textarea v-model="temp.detail" auto-height="true"  disabled="true" />
			</view>
			<view class="li">
				<image :src="picUrls[0]"></image>
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
			<view class="savebox" v-if="temp.states == 0">
				<page-button :height="40" :width="100" @click="receptInquiry" name="接单"></page-button>
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
					de:''
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
					url: "/didi-doctor/inquiryinfo/getOneByEntity" ,
					param: dd,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						that.temp = res.data;
						that.picUrls = that.temp.picUrl.split(',');
					},
					error: function() {}
				})
			},
			receptInquiry:function(){
				let that = this;
				var dd = {"inquiryId":that.temp.inquiryId}
				that.$util.request({
					url: "/didi-doctor/inquiryreceptinfo/receptInquiry" ,
					param: dd,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						setTimeout(function(){
							uni.navigateTo({
								url:'/pages/index/index'
							})
						},1000)
						uni.showToast({
							title: '接单成功',
							icon: 'success',
							duration: 2000
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
