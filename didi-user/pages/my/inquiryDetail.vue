<template>
	<view class="content">
		<form>
			<view class="text">
				<!-- <label>过往病史</label> -->
				<textarea v-model="temp.detail" />
			</view>
			
			<view class="li">
				<label>患者姓名</label>
				<input class="inp" v-model="temp.realName" />
			</view>
			<view class="li">
				<label>身份证号</label>
				<input class="inp" v-model="temp.idCard" />
			</view>
			<view class="li">
				<label>体重(kg)</label>
				<input class="inp" v-model="temp.weight" />
			</view>
			<view class="li">
				<label>体重(kg)</label>
				<input class="inp" v-model="temp.weight" />
			</view>
			<view class="text">
				<label>过往病史</label>
				<textarea v-model="temp.medicalHistory" />
			</view>
			<view class="savebox">
				<page-button :height="40" :width="100" @click="submit" name="取消问诊"></page-button>
				<page-button :height="40" :width="100" @click="commentDoctor" name="评价医生"></page-button>
			</view>
		</form>
		
		
		<view class="comment" v-if="comments">
			<form>
				<view class="li">
				</view>
				<view class="text">
					<textarea placeholder="评价医生..." v-model="commentTemp.commentContent" />
				</view>
				<view class="savebox">
					<page-button :height="40" :width="100" @click="submitComment" name="确定"></page-button>
				</view>
			</form>
			
			
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
					medicalHistory:''
				},
				commentTemp:{
					commentRate:'',
					commentContent:''
				},
				comments:false
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
					url: "/didi-patient/inquiryinfo/getOneByEntity" ,
					param: dd,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						that.temp = res.data;
					},
					error: function() {}
				})
			},
			commentDoctor:function(){
				this.comments = true;
			},
			submitComment:function(){
				let that = this;
				that.$util.request({
					url: "/didi-patient/inquiryinfo/getOneByEntity" ,
					param: dd,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						that.temp = res.data;
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
		}
		
		
		.text {
			align-items: left;
			margin-left: 33px;
			margin-right: 33rpx;
		}
		.text textarea{
			width: 100%;
			height: 350rpx;
		}
		
		.savebox {
			display: flex;
			justify-content: center;
			padding: 50upx 0 30upx;
		}
		
	}
</style>
