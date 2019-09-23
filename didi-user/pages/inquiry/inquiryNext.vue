<template>
	<view class="content">
		<form>
			<view class="li">
				<label>患者姓名</label>
				<input class="inp" v-model="temp.realName" />
			</view>
			<view class="li">
				<label>身份证号</label>
				<input class="inp" v-model="temp.idCard" />
			</view>
			<view class="li">
				<label>性别</label>
				<radio-group @change="genderChange">
					<radio value="0" />男</label>
					<radio value="1" />女</label>
				</radio-group>
			</view>
			<view class="li">
				<label>体重(kg)</label>
				<input class="inp" v-model="temp.weight" />
			</view>
			<view class="li">
				<label>备孕情况</label>
				<picker class="inp" @change="bindConceiveChange" :value="index" :range="conceive" range-key="value">
					<input placeholder="请选择" disabled="true" :value="conceive[index].value" />
				</picker>
			</view>
			<view class="li">
				<label>过敏史</label>
				<radio-group @change="allergicChange">
					<radio value="0" />无</label>
					<radio value="1" />有</label>
				</radio-group>
			</view>
			<view class="li">
				<label>肝功能</label>
				<radio-group @change="liverChange">
					<radio value="0" />异常</label>
					<radio value="1" />正常</label>
				</radio-group>
			</view>
			<view class="li">
				<label>肾功能</label>
				<radio-group @change="kidneyChange">
					<radio value="0" />异常</label>
					<radio value="1" />正常</label>
				</radio-group>
			</view>
			<view class="text">
				<label>过往病史</label>
				<textarea placeholder="请输入过往病史..." v-model="temp.medicalHistory" />
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
			PageButton,
		},

		data() {
			return {
				temp:{
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
				conceive:[{"key":"-1","value":"请选择"},{"key":"0","value":"无备孕计划"},{"key":"1","value":"备孕中"},{"key":"2","value":"怀孕中"},{"key":"3","value":"哺乳期"}],
				index:-1
		
			}
		},
		onLoad(options) {
			this.temp = JSON.parse(options.temp);
		},
		onShow() {
			
		},
		methods: {
			genderChange:function(e){
				this.temp.gender = e.target.value
			},
			allergicChange:function(e){
				this.temp.allergic = e.target.value
			},
			liverChange:function(e){
				this.temp.liver = e.target.value
			},
			kidneyChange:function(e){
				this.temp.kidney = e.target.value
			},
			bindConceiveChange: function(e) {
				let that = this;
				that.index = e.target.value;
				that.temp.conceive = that.conceive[that.index].key;
			},
			submit:function(){
				let that = this;
				if(!that.$util.isEmpty(that.temp.realName)){
					uni.showToast({
						title: '请输入真实姓名',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!that.$util.isEmpty(that.temp.idCard)){
					uni.showToast({
						title: '请输入身份证号',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!that.$util.isEmpty(that.temp.gender)){
					uni.showToast({
						title: '请选择性别',
						icon:'none',
						duration: 2000
					});
					return;
				}
				that.$util.request({
					url: "/didi-patient/inquiryinfo/add" ,
					param: that.temp,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						setTimeout(function() {
							uni.redirectTo({
								url:'/pages/index/index'
							})
						}, 1000);
						uni.showToast({
							title: '发布成功',
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
