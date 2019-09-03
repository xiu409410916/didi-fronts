<template>
	<view> 
	   <button plain="true" class="fx-btn" :disabled="disabled" :style="{'height':fxheight,'line-height':fxheight,'width':fxwidth}" @click="btnuse">{{name}}</button>
	</view>
</template>

<script>
	export default{
		props: {
			/**
		     * id
		     */
			id:{
				type:Number,
				default:0
			},
			/**
		     * 高
		     */
			name:String,
			/**
		     * 高
		     */
			height:{
				type:Number,
				default:25
			},
			/**
		     * 宽
		     */
			width:{
				type:Number,
				default:100
			},
			/**
		     * 宽
		     */
			disabled:{
				type:Boolean,
				default:false
			}
		},
		computed: {
            fxheight() {
                return `${this.height}px`
            },
			fxwidth() {
                return `${this.width}px`
            }
        },
		methods:{ 
			btnuse(){
				this.$emit('click',this.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fx-btn{
		display: inline-block;
		background: linear-gradient(to right, $bg-start, $bg-end);
		border-radius: 40upx;
		border: none;
		text-align: center;
		color: #fff;
		font-size: 14px;
	}
</style>
