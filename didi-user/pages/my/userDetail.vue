<template>
	<view class="content">
		<form>
			<view class="li">
				<label>真实姓名</label>
				<input class="inp" placeholder="10个字符以内" v-model="temp.doctorName" />
			</view>
			<view class="li">
				<label>手机号</label>
				<input class="inp" placeholder="11个字符以内" v-model="temp.mobile" />
			</view>
			<view class="li">
				<label>身份证号</label>
				<input class="inp" placeholder="15个字符以内" v-model="temp.idCard" />
			</view>
			<view class="nli">
				<label>头像</label>
				<image-upload @click="getAvatarUrl" :picUrls="temp.avatarUrl"></image-upload>
			</view>
			<view class="li">
				<label>教育程度</label>
				<picker class="inp" @change="bindPickerChange" :value="index" :range="array">
					<input placeholder="请选择" disabled="true" :value="array[index]" />
				</picker>
			</view>
			<view class="nli">
				<label>学历上传</label>
				<image-upload @click="getEducationUrl" :picUrls="temp.educationUrl"></image-upload>
			</view>
			<view class="li">
				<label>医院职称</label>
				<input class="inp" placeholder="15个字符以内" v-model="temp.title" />
			</view>
			<view class="nli">
				<label>职业资格证</label>
				<image-upload @click="getCredentialUrl" :picUrls="temp.credentialUrl"></image-upload>
			</view>

			<view class="text">
				<textarea placeholder="简介..." class="inp" v-model="temp.introduction"></textarea>
			</view>

			<view class="savebox">
				<page-button :height="40" :width="300" @click="submit" name="下一步"></page-button>
			</view>
		</form>
	</view>
</template>

<script>
	import ImageUpload from '../../components/image-upload.vue';
	import PageButton from '../../components/button.vue';

	export default {
		components: {
			ImageUpload,
			PageButton
		},
		data() {
			return {
				temp: {
					doctorName: '',
					mobile: '',
					idCard: '',
					avatarUrl: '',
					educationUrl: '',
					title: '',
					educationLevel:'',
					credentialUrl: '',
					introduction: ''
				},
				array: [ '中专','大专', '本科', '硕士','博士'],
				index: null,
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
				this.temp.educationLevel = this.array[this.index]
			},
			getAvatarUrl:function(v){
				this.temp.avatarUrl=v;
			},
			getCredentialUrl:function(v){
				this.temp.credentialUrl=v;
			},
			getEducationUrl:function(v){
				this.temp.educationUrl=v;
			},
			submit:function(){
				let that = this;
				uni.navigateTo({
					url:'/pages/my/userPassword'
				})
				if(!that.$util.isEmpty(that.temp.doctorName)){
					uni.showToast({
						title: '请输入真实姓名',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!that.$util.isEmpty(that.temp.mobile)){
					uni.showToast({
						title: '请输入手机号',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!that.$util.IdentityCodeValid(that.temp.idCard)){
					uni.showToast({
						title: '请输入正确的身份证号',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!that.$util.isEmpty(that.temp.avatarUrl)){
					uni.showToast({
						title: '请上传头像',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!that.$util.isEmpty(that.temp.educationLevel)){
					uni.showToast({
						title: '请选择教育程度',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!that.$util.isEmpty(that.temp.educationUrl)){
					uni.showToast({
						title: '请上传学历证书',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!that.$util.isEmpty(that.temp.title)){
					uni.showToast({
						title: '请输入医院职称',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!that.$util.isEmpty(that.temp.credentialUrl)){
					uni.showToast({
						title: '请上传职业资格证书',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!that.$util.isEmpty(that.temp.introduction)){
					uni.showToast({
						title: '请输入简介',
						icon:'none',
						duration: 2000
					});
					return;
				}
				that.$util.request({
					url: "/didi-doctor/doctorinfo/updateInfo",
					param: that.temp,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						uni.setStorageSync('doctorInfo', res.data);
						uni.showToast({
							title: '提交成功',
							icon: 'success',
							duration: 2000
						})
						setTimeout(function() {
							// uni.navigateBack({
							// 	delta: 1
							// })
							uni.navigateTo({
								url:'/pages/my/userPassword'
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
