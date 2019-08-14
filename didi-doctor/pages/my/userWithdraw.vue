<template>
	<view class="content">
		<form>
			<view class="li">
				<label>提现方式</label>
				<picker class="inp" @change="bindWithdrawTypeChange" :value="typeIndex" :range="withdrawType">
					<input placeholder="请选择" disabled="true" :value="withdrawType[typeIndex]" />
				</picker>
			</view>
			<view class="li" v-if="typeIndex == 1">
				<label>银行名称</label>
				<picker class="inp" @change="bindBankChange" :value="bankIndex" :range="bankList" range-key="bankName">
					<input placeholder="请选择" disabled="true" :value="bankList[bankIndex].bankName" />
				</picker>
			</view>
			<view class="li" v-if="typeIndex == 1">
				<label>银行账号</label>
				<input class="inp" disabled="true" v-model="bankList[bankIndex].bankAccount" />
			</view>
			<view class="li">
				<label>可提余额</label>
				<input class="inp" disabled="true" v-model="amount" />
			</view>
			<view class="li">
				<label>体现余额</label>
				<input class="inp" v-model="temp.amount" />
			</view>
			<view class="li">
				<label>提现密码</label>
				<input class="inp" placeholder="8个字符以内" password="true" v-model="temp.withdrawPassword" />
			</view>
			<view class="savebox">
				<page-button :height="40" :width="300" @click="submit" name="提交"></page-button>
			</view>
		</form>
	</view>
</template>

<script>
	import PageButton from '../../components/button.vue';

	export default {
		components: {

			PageButton
		},
		data() {
			return {
				temp:{
					withdrawType:'',
					bankName:"",
					bankAccount:"",
					amount:'',
					withdrawPassword:''
				},
				amount:0,
				withdrawType:['提到余额','提到银行卡'],
				typeIndex:null,
				bankList:[{"bankName":"","bankAccount":""}],
				bankIndex: null
			}
		},
		onLoad(options) {
			this.amount = options.amount/100;
			this.getBankList();
		},
		methods: {
			getBankList:function(){
				let that = this;
				that.$util.request({
					url: "/didi-doctor/doctorbankinfo/findList",
					param: {},
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						console.log(res.data);
						that.bankList = res.data;
					},
					error: function() {}
				})
			},
			bindWithdrawTypeChange:function(e){
				this.typeIndex = e.target.value
				this.temp.withdrawType = this.withdrawType[this.typeIndex]
			},
			bindBankChange: function(e) {
				let that = this;
				that.bankIndex = e.target.value;
				that.temp.bankName = that.bankList[that.bankIndex].bankName;
				that.temp.bankAccount = that.bankList[that.bankIndex].bankAccount;
			},
			submit: function() {
				let that = this;
				if (that.typeIndex == null) {
					uni.showToast({
						title: '请选择提现方式',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if (that.typeIndex == '1' && !that.$util.isEmpty(that.temp.bankName) ) {
					uni.showToast({
						title: '请选择银行',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if (!that.$util.isEmpty(that.temp.amount)) {
					uni.showToast({
						title: '请输入提现金额',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if (!that.$util.isEmpty(that.temp.withdrawPassword)) {
					uni.showToast({
						title: '请输入提现密码',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				that.temp.amount = that.temp.amount*100;
				that.$util.request({
					url: "/didi-doctor/withdrawinfo/doctorWithdraw",
					param: that.temp,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						that.temp.amount = that.temp.amount/100;
						uni.setStorageSync('doctorInfo', res.data);
						uni.showToast({
							title: '体现成功',
							icon: 'success',
							duration: 2000
						})
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
						}, 500)
					},
					error: function() {
						that.temp.amount = that.temp.amount/100;
					}
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

		.nli {
			min-height: 270upx;
			width: calc(100%-33px);
			margin-left: 33px;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			margin-top: 30upx;

			label {
				display: block;
				width: 100%;
				color: $uni-text-color-qh;
			}
		}

		.savebox {
			display: flex;
			justify-content: center;
			padding: 50upx 0 30upx;
		}

		.text {
			align-items: left;
			margin-left: 33px;
			margin-right: 33rpx;
		}

		.text textarea {
			width: 100%;
			height: 250rpx;
		}
	}
</style>
