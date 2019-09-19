<template>
	<view class="content">
		<form>
			<view class="li">
				<label>银行名称</label>
				<picker class="inp" @change="bindBankChange" :value="bankIndex" :range="bankList" range-key="bankName">
					<input placeholder="请选择" disabled="true" :value="bankList[bankIndex].bankName" />
				</picker>
			</view>
			<view class="li">
				<label>银行账号</label>
				<input class="inp" disabled="true" v-model="bankList[bankIndex].bankAccount" />
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
					bankName:"",
					bankAccount:"",
					bankCode:""
				},
				bankList:[{"bankName":"","bankAccount":"","bankCode":""}],
				bankIndex: null
			}
		},
		onLoad(options) {
			// this.getBankList();
			this.bankList = JSON.parse(options.bankList);
		},
		methods: {
			// getBankList:function(){
			// 	let that = this;
			// 	that.$util.request({
			// 		url: "/didi-doctor/doctorbankinfo/findList",
			// 		param: {},
			// 		contentType: 'application/x-www-form-urlencoded',
			// 		success: function(res) {
			// 			console.log(res.data);
			// 			that.bankList = res.data;
			// 		},
			// 		error: function() {}
			// 	})
			// },
			bindBankChange: function(e) {
				let that = this;
				that.bankIndex = e.target.value;
				that.temp.bankName = that.bankList[that.bankIndex].bankName;
				that.temp.bankAccount = that.bankList[that.bankIndex].bankAccount;
				that.temp.bankCode = that.bankList[that.bankIndex].bankCode;
			},
			submit: function() {
				let that = this;
				if (that.typeIndex == '1' && !that.$util.isEmpty(that.temp.bankName) ) {
					uni.showToast({
						title: '请选择银行',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				that.$util.request({
					url: "/didi-doctor/agentinfo/applyToAgent",
					param: that.temp,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						uni.showToast({
							title: '申请成功',
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
