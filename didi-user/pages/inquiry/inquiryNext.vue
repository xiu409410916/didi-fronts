<template>
	<view class="content">
		<form>
			<view class="li">
				<label>患者姓名</label>
				<input class="inp" disabled="true" v-model="temp.realName" />
			</view>
			<view class="li">
				<label>身份证号</label>
				<input class="inp" disabled="true" v-model="temp.idCard" />
			</view>
			<view class="li">
				<label>性别</label>
				<label class="radio"><radio value="r1" />男</label>
                <label class="radio"><radio value="r2" />女</label>
			</view>
			<view class="li">
				<label>体重(kg)</label>
				<input class="inp" disabled="true" v-model="temp.weight" />
			</view>
			<view class="li">
				<label>备孕情况</label>
				<picker class="inp" @change="bindConceiveChange" :value="index" :range="conceive" range-key="value">
					<input placeholder="请选择" disabled="true" :value="conceive[index].value" />
				</picker>
			</view>
			<view class="li">
				<label>过敏史</label>
				<label class="radio"><radio value="r1" />男</label>
			    <label class="radio"><radio value="r2" />女</label>
			</view>
			<view class="li">
				<label>肝功能</label>
				<label class="radio"><radio value="r1" />男</label>
			    <label class="radio"><radio value="r2" />女</label>
			</view>
			<view class="li">
				<label>肾功能</label>
				<label class="radio"><radio value="r1" />男</label>
			    <label class="radio"><radio value="r2" />女</label>
			</view>
			<view class="li">
				<label>过往病史</label>
				<textarea class="inp" v-model="temp.medicalHistory" />
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
		onShow() {
			
		},
		methods: {
			bindConceiveChange: function(e) {
				let that = this;
				that.index = e.target.value;
				that.temp.bankName = that.bankList[that.bankIndex].bankName;
				that.temp.bankAccount = that.bankList[that.bankIndex].bankAccount;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		position: relative;
		
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
		
	}
</style>
