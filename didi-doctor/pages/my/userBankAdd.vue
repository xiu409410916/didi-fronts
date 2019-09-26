<template>
	<view class="content">
		<form>
			<view class="li">
				<label>开户行</label>
				<picker class="inp" @change="bindPickerChange" :value="index" :range="bankList" :range-key="name">
					<input placeholder="请选择" disabled="true" :value="bankList[index].name" />
				</picker>
			</view>
			<view class="li">
				<label>银行卡</label>
				<input class="inp" placeholder="32个字符以内" v-model="temp.bankAccount" />
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
				temp: {
					bankName: '',
					bankAccount: '',
					bankCode:''
				},
				bankList: [],
				index: null,
			}
		},
		onLoad() {
			this.bankList = this.$json.bankList;
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
				this.temp.bankName = this.bankList[this.index].name
				this.temp.bankCode = this.bankList[this.index].key
			},
			submit: function() {
				let that = this;
				if (!that.$util.isEmpty(that.temp.bankName)) {
					uni.showToast({
						title: '请选择开户行',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if (!that.$util.isEmpty(that.temp.bankAccount)) {
					uni.showToast({
						title: '请输入银行卡号',
						icon: 'none',
						duration: 2000
					});
					return;
				}

				that.$util.request({
					url: "/didi-doctor/doctorbankinfo/add",
					param: that.temp,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						uni.showToast({
							title: '新增成功',
							icon: 'success',
							duration: 2000
						})
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
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
