<template>
	<view class="content">
		<view class="form">
			<form>
				<view class="li">
					<label>问题描述</label>
					<textarea v-model="temp.detail" auto-height="true" disabled="true" />
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
					<textarea v-model="temp.de" auto-height="true" disabled="true" />
				</view>
				<view class="li">
					<label>过往病史</label>
					<textarea v-model="temp.medicalHistory" auto-height="true" disabled="true" />
				</view>
				<view class="savebox" v-if="temp.states == 0">
					<page-button :height="40" :width="100" @click="receptInquiry" name="接单"></page-button>
				</view>
			</form>
		
		</view>
		
		<view v-if="geneList.length > 0" class="geneList">
			<label>已有基因检测</label>
			<view class="gene" v-for="(item,index) in geneList" :key="index">
				{{(index+1)+'.'+item.geneName}}
			</view>
		</view>
		
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
				picUrls:[],
				geneList:[]
			}
		},
		onLoad(options) {
			this.temp.inquiryId = options.inquiryId;
			this.getInquiryDetail();
			this.getGeneList();
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
						
						that.temp.de = "";
						if(that.$util.isEmpty(res.data.allergic)){
							that.temp.de = that.temp.de +that.$json.allergic[res.data.allergic]+'过敏史/'; 
						}
						if(that.$util.isEmpty(res.data.conceive)){
							that.temp.de = that.temp.de +that.$json.conceive[res.data.conceive]+"/"; 
						}
						if(that.$util.isEmpty(res.data.liver)){
							that.temp.de = that.temp.de +'肝功能'+that.$json.liver[res.data.liver]+"/";
						}
						if(that.$util.isEmpty(res.data.kidney)){
							that.temp.de = that.temp.de +'肾功能'+that.$json.liver[res.data.kidney]; 
						}
						console.log(that.temp);
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
						var patientInfo = res.data.patientInfo;
						var orderInfo = res.data.inquiryInfo;
						// setTimeout(function(){
						// 	uni.navigateTo({
						// 		url:'/pages/index/index'
						// 	})
						// },1000)
						uni.showToast({
							title: '接单成功',
							icon: 'success',
							duration: 2000
						})
						var info = uni.getStorageSync("doctorInfo");
						var msg = '你好,我是'+uni.getStorageSync('doctorInfo').doctorName+'医生。';
						var time = that.$util.getFormatDate(new Date(),'yyyy-MM-dd hh:mm:ss');
						var message = {
							title: patientInfo.nickName,
							orderId: orderInfo.inquiryId,
							openId: patientInfo.openId,
							avatarUrl: patientInfo.avatarUrl,
							message: msg,
							time: time,
							count: 1,
							inquiryTime:that.$util.getInquiryTimeByType(orderInfo.payType),
							over:0,
							type: 2 //普通用户类型消息
						};
						var messageInfo = {
							orderId:orderInfo.inquiryId,
							id:that.$util.uuid(),
							username:info.doctorName,
							face:info.avatarUrl,
							fromUid: info.openId,
							toUid: patientInfo.openId,
							time:time,
							firstMsg:false,
							type:'text',
							msg:{content:msg}
						};
						console.log(message);
						console.log(messageInfo);
						that.$util.createMsgSession(message, messageInfo);
						
						uni.navigateTo({
							url:'/pages/message_info/message_info?msg='+msg+'&orderId='+orderInfo.inquiryId+'&toUser='+patientInfo.openId+'&name='+patientInfo.nickName+'&over=0'
						})
						
					},
					error: function() {}
				})
			},
			getGeneList:function(){
				let that = this;
				var dd = {"inquiryId":that.temp.inquiryId}
				that.$util.request({
					url: "/didi-doctor/inquirygeneinfo/findList" ,
					param: dd,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						that.geneList = res.data;
					},
					error: function() {}
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.form {
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
			textarea{
				width: 80%;
			}
		
			.inp {
				height: 100%;
				width: 80%;
				border-bottom: 2upx solid $uni-text-color-eee;
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: center;
			}
			image{
				width: 100rpx;
				height: 100rpx;
			}
		}
		
		.savebox {
			display: flex;
			justify-content: center;
			padding: 50upx 0 30upx;
		}
		
	}
	
	.geneList {
		width: 100%;
		background: $uni-text-color-inverse;
		margin-top: 20upx;
		padding: 10px 10px 10px 33px;
		
		
		label {
			width: 20%;
			color: $uni-text-color-qh;
			float: left;
		}
		
		.gene{
			width: 80%;
			margin-left: 20%;
			margin-top: 5rpx;
		}
	}
	
	
	
</style>
