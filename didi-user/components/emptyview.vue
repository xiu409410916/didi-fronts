<template>
	<view class="empty-view" :style="{'margin-top':marginTop}" v-if="data.length<=0">
	     <image class="icon" src="http://webcharpic.xfshequ.com/community/icon-kongbai@2x.png"></image>
	     <text class="text">无数据</text>
	</view>
</template>

<script>
	export default{
		props:{
			top:{
				type:Number,
				default:50
			},
			data:Array
		},
		computed: {
            marginTop() {
                return `${this.top}%`
            }
        },
		data(){
			return{
				picUrl:this.$config.picUrl
			}
		}
	}
</script>

<style scoped>
.empty-view{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-view .icon{
  height: 254upx;
  width: 448upx;
  margin-bottom: 30upx;
}

.empty-view .text{
  width: auto;
  font-size: 28upx;
  line-height: 35upx;
  color: #999;
}
</style>
