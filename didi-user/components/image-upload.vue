<template>
	<view class="content">
		<view class="upload">
			<view class="imgbox" v-for="(item,index) in nrefundPicUrls" :key="index" v-if="nrefundPicUrls.length>0">
				<label class="del" @click="del(index)">X</label>
				<image class="img" :src="item"></image>
			</view>
			<view class="upimg" @click="upload">
				<image class="icon_up" src="http://pvllxl0mi.bkt.clouddn.com/upload.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { serverUrl } from '../config/index.js'
	export default{
		props:{
			picUrls:String,
			count:{
				type:Number,
				default:1
			}
		},
		data(){
			return{
				refundPicUrls:[],
				isbo:true
			}
		},
		computed: {
			nrefundPicUrls(){
				let that=this;
				if(that.$util.isEmpty(that.picUrls)&that.isbo){
					if(that.picUrls.indexOf(',')>-1){
						that.refundPicUrls=that.refundPicUrls.concat(that.picUrls.split(','));
					}else{
						that.refundPicUrls=that.refundPicUrls.concat([that.picUrls])
					}
				}
				return that.refundPicUrls
			}
		}, 
		methods:{
			upload(){
				let that=this;
				uni.chooseImage({
					count: that.count, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有['album', 'camera']
					sourceType: ['album', 'camera'], //从相册选择
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
						var tempFilePaths = res.tempFilePaths; 
						var uploadImgCount = 0;  
                        for (var i = 0, h = tempFilePaths.length; i < h; i++) {  
							//启动上传等待中...  
							uni.showToast({  
								title: '正在上传...',  
								icon: 'loading',  
								mask: true,  
								duration: 10000  
							})  
							uni.uploadFile({  
								url: serverUrl+'/didi-patient/ossfile/fileUpload', 
								filePath: tempFilePaths[i],  
								name: 'file',
								header: {  
									"Content-Type": "multipart/form-data",
									'partnerId':uni.getStorageSync('channelId')?uni.getStorageSync('channelId'):'1',
		                            'token':uni.getStorageSync('Token')?uni.getStorageSync('Token'):''
								},
								success: (res) => {  
									uploadImgCount++;
									var data = JSON.parse(res.data);
									that.isbo=false
									if(that.count==1){
										that.refundPicUrls=data.data
									}else if(that.count==5){
										that.refundPicUrls=that.refundPicUrls.concat(data.data);
										that.refundPicUrls=that.refundPicUrls.slice(0,5)
									}
									//如果是最后一张,则隐藏等待中  
									if (uploadImgCount == tempFilePaths.length) {  
									  uni.hideToast();  
									} 
									that.$emit('click',that.refundPicUrls)
					
								},  
								fail: function(err) {  
									uni.showModal({  
										title: '上传失败',  
										content: '上传失败，请稍后再试',  
										showCancel: false  
									});  
								},  
								complete:function(res){  
									uni.hideLoading();  
								}  
							}); 
						}
					}
				});
			},
			del(i){
				this.isbo=false
				this.refundPicUrls.splice(i,1)
				this.$emit('click',this.refundPicUrls)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		width: 100%;
		.upload{
			width: 100%;
			min-height: 230upx;
			display: flex;
			flex-flow: row wrap;
			justify-content: flex-start;
			align-items: center;
			padding-top: 20upx;
			.imgbox{
				position: relative;
			}
			.del{
				position: absolute;
				top: 5upx;
				right: 30upx;
			}
			.img{
				height: 200upx;
				width: 200upx;
				background: #f4f4f4;
				margin-right: 20upx;
			}
			.upimg{
				height: 192upx;
				width: 192upx;
				border: 2px dashed #ccc;
				border-radius: 10upx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 10upx;
				.icon_up{
					height: 60upx;
					width: 60upx;
				}
			}
		}
	}
</style>
