<template>
	<view>
		<view class="content" @touchstart="hideEmoji">
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop"
			 :scroll-into-view="scrollToView">
				<view class="row" v-for="(row,index) in msgList" :key="index" :id="'msg'+row.id">
					<!-- 自己发出的消息 -->
					<view class="my" v-if="row.fromUid==myuid">
						<view class="left">
							<view v-if="row.type=='text'" class="bubble">
								<rich-text :nodes="row.msg.content"></rich-text>
							</view>
							<view v-if="row.type=='voice'" class="bubble voice" @tap="playVoice(row)" :class="playMsgid == row.id?'play':''">
								<view class="length">{{row.msg.length}}</view>
								<view class="icon my-voice"></view>
							</view>
							<view v-if="row.type=='img'" class="bubble img" @tap="showPic(row)">
								<image :src="row.msg.url" :style="{'width': row.msg.w+'px','height': row.msg.h+'px'}"></image>
							</view>
						</view>
						<view class="right">
							<image :src="row.face"></image>
						</view>
					</view>
					<!-- 别人发出的消息 -->
					<view class="other" v-if="row.fromUid!=myuid">
						<view class="left">
							<image :src="row.face"></image>
						</view>
						<view class="right">
							<view class="username">
								<view class="name">{{row.username}}</view>
								<view class="time">{{row.time}}</view>
							</view>
							<view v-if="row.type=='text'" class="bubble">
								<rich-text :nodes="row.msg.content"></rich-text>
							</view>
							<view v-if="row.type=='voice'" class="bubble voice" @tap="playVoice(row)" :class="playMsgid == row.id?'play':''">
								<view class="icon other-voice"></view>
								<view class="length">{{row.msg.length}}</view>
							</view>
							<view v-if="row.type=='img'" class="bubble img" @tap="showPic(row)">
								<image :src="row.msg.url" :style="{'width': row.msg.w+'px','height': row.msg.h+'px'}"></image>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 表情栏 -->
		<view class="emoji-box" :class="showEmji" @touchmove.stop.prevent="discard">
			<swiper class="swiper" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="'/static/img/emoji/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 底部输入栏 -->
		<view v-if="over=='0'" class="input-box" :class="showEmji" @touchmove.stop.prevent="discard">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			<view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="more" @tap="chooseImage">
				<view class="icon tupian"></view>
			</view>
			<!-- #endif -->
			<view class="textbox">
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']" @touchstart="voiceBegin"
				 @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">{{voiceTis}}</view>
				<view class="text-mode" :class="isVoice?'hidden':''">
					<view class="box">
						<textarea auto-height="true" v-model="textMsg" id="textMsg" />
						</view>
					<view class="em" @tap="chooseEmoji">
						<view class="icon biaoqing"></view>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="chooseImage">
				<view class="icon tupian"></view>
			</view>
			<!-- #endif -->
			<label for="textMsg">
			<view class="send" :class="isVoice?'hidden':''" @tap="sendText">
				<view class="btn">
					发送
				</view>
			</view>
			</label>
		</view>
		<view v-else-if="over=='1'" class="over-view">
			<text>咨询已结束</text>
		</view>
		
		<!-- 录音效果(上滑取消) -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''"><view class="icon luyin2" ></view></view>
			<view class="cancel" :class="willStop?'':'hidden'"><view class="icon chehui" ></view></view>
			<view class="tis" :class="willStop?'change':''">{{recordTis}}</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import { serverUrl } from '../../config/index.js'
	export default {
		data() {
			return {
				//文字消息
				fromUser:'',
				toUser:'',
				textMsg:app.globalData.msg,
				//消息列表
				scrollAnimation:false,
				scrollTop:0,
				scrollToView:'',
				msgList:[],
				msgImgList:[],
				myuid:'',
				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER:uni.getRecorderManager(),
				// #endif
				isVoice:false,
				voiceTis:'按住 说话',
				recordTis:"手指上滑 取消发送",
				recording:false,
				willStop:false,
				initPoint:{identifier:0,Y:0},
				recordTimer:null,
				recordLength:0,
				over:'1',
				//播放语音相关参数
				AUDIO:uni.createInnerAudioContext(),
				playMsgid:null,
				VoiceTimer:null,
				//表情定义
				showEmji:'',
				info : uni.getStorageSync("patientInfo"),
				emojiList:[
					[{"url":"100.gif",alt:"[微笑]"},{"url":"101.gif",alt:"[伤心]"},{"url":"102.gif",alt:"[美女]"},{"url":"103.gif",alt:"[发呆]"},{"url":"104.gif",alt:"[墨镜]"},{"url":"105.gif",alt:"[哭]"},{"url":"106.gif",alt:"[羞]"},{"url":"107.gif",alt:"[哑]"},{"url":"108.gif",alt:"[睡]"},{"url":"109.gif",alt:"[哭]"},{"url":"110.gif",alt:"[囧]"},{"url":"111.gif",alt:"[怒]"},{"url":"112.gif",alt:"[调皮]"},{"url":"113.gif",alt:"[笑]"},{"url":"114.gif",alt:"[惊讶]"},{"url":"115.gif",alt:"[难过]"},{"url":"116.gif",alt:"[酷]"},{"url":"117.gif",alt:"[汗]"},{"url":"118.gif",alt:"[抓狂]"},{"url":"119.gif",alt:"[吐]"},{"url":"120.gif",alt:"[笑]"},{"url":"121.gif",alt:"[快乐]"},{"url":"122.gif",alt:"[奇]"},{"url":"123.gif",alt:"[傲]"}],
					[{"url":"124.gif",alt:"[饿]"},{"url":"125.gif",alt:"[累]"},{"url":"126.gif",alt:"[吓]"},{"url":"127.gif",alt:"[汗]"},{"url":"128.gif",alt:"[高兴]"},{"url":"129.gif",alt:"[闲]"},{"url":"130.gif",alt:"[努力]"},{"url":"131.gif",alt:"[骂]"},{"url":"132.gif",alt:"[疑问]"},{"url":"133.gif",alt:"[秘密]"},{"url":"134.gif",alt:"[乱]"},{"url":"135.gif",alt:"[疯]"},{"url":"136.gif",alt:"[哀]"},{"url":"137.gif",alt:"[鬼]"},{"url":"138.gif",alt:"[打击]"},{"url":"139.gif",alt:"[bye]"},{"url":"140.gif",alt:"[汗]"},{"url":"141.gif",alt:"[抠]"},{"url":"142.gif",alt:"[鼓掌]"},{"url":"143.gif",alt:"[糟糕]"},{"url":"144.gif",alt:"[恶搞]"},{"url":"145.gif",alt:"[什么]"},{"url":"146.gif",alt:"[什么]"},{"url":"147.gif",alt:"[累]"}],
					[{"url":"148.gif",alt:"[看]"},{"url":"149.gif",alt:"[难过]"},{"url":"150.gif",alt:"[难过]"},{"url":"151.gif",alt:"[坏]"},{"url":"152.gif",alt:"[亲]"},{"url":"153.gif",alt:"[吓]"},{"url":"154.gif",alt:"[可怜]"},{"url":"155.gif",alt:"[刀]"},{"url":"156.gif",alt:"[水果]"},{"url":"157.gif",alt:"[酒]"},{"url":"158.gif",alt:"[篮球]"},{"url":"159.gif",alt:"[乒乓]"},{"url":"160.gif",alt:"[咖啡]"},{"url":"161.gif",alt:"[美食]"},{"url":"162.gif",alt:"[动物]"},{"url":"163.gif",alt:"[鲜花]"},{"url":"164.gif",alt:"[枯]"},{"url":"165.gif",alt:"[唇]"},{"url":"166.gif",alt:"[爱]"},{"url":"167.gif",alt:"[分手]"},{"url":"168.gif",alt:"[生日]"},{"url":"169.gif",alt:"[电]"},{"url":"170.gif",alt:"[炸弹]"},{"url":"171.gif",alt:"[刀子]"}],
					[{"url":"172.gif",alt:"[足球]"},{"url":"173.gif",alt:"[瓢虫]"},{"url":"174.gif",alt:"[翔]"},{"url":"175.gif",alt:"[月亮]"},{"url":"176.gif",alt:"[太阳]"},{"url":"177.gif",alt:"[礼物]"},{"url":"178.gif",alt:"[抱抱]"},{"url":"179.gif",alt:"[拇指]"},{"url":"180.gif",alt:"[贬低]"},{"url":"181.gif",alt:"[握手]"},{"url":"182.gif",alt:"[剪刀手]"},{"url":"183.gif",alt:"[抱拳]"},{"url":"184.gif",alt:"[勾引]"},{"url":"185.gif",alt:"[拳头]"},{"url":"186.gif",alt:"[小拇指]"},{"url":"187.gif",alt:"[拇指八]"},{"url":"188.gif",alt:"[食指]"},{"url":"189.gif",alt:"[ok]"},{"url":"190.gif",alt:"[情侣]"},{"url":"191.gif",alt:"[爱心]"},{"url":"192.gif",alt:"[蹦哒]"},{"url":"193.gif",alt:"[颤抖]"},{"url":"194.gif",alt:"[怄气]"},{"url":"195.gif",alt:"[跳舞]"}],
					[{"url":"196.gif",alt:"[发呆]"},{"url":"197.gif",alt:"[背着]"},{"url":"198.gif",alt:"[伸手]"},{"url":"199.gif",alt:"[耍帅]"},{"url":"200.png",alt:"[微笑]"},{"url":"201.png",alt:"[生病]"},{"url":"202.png",alt:"[哭泣]"},{"url":"203.png",alt:"[吐舌]"},{"url":"204.png",alt:"[迷糊]"},{"url":"205.png",alt:"[瞪眼]"},{"url":"206.png",alt:"[恐怖]"},{"url":"207.png",alt:"[忧愁]"},{"url":"208.png",alt:"[眨眉]"},{"url":"209.png",alt:"[闭眼]"},{"url":"210.png",alt:"[鄙视]"},{"url":"211.png",alt:"[阴暗]"},{"url":"212.png",alt:"[小鬼]"},{"url":"213.png",alt:"[礼物]"},{"url":"214.png",alt:"[拜佛]"},{"url":"215.png",alt:"[力量]"},{"url":"216.png",alt:"[金钱]"},{"url":"217.png",alt:"[蛋糕]"},{"url":"218.png",alt:"[彩带]"},{"url":"219.png",alt:"[礼物]"},]				
				],
				//表情图片图床名称
				onlineEmoji:{"100.gif":"AbNQgA.gif","101.gif":"AbN3ut.gif","102.gif":"AbNM3d.gif","103.gif":"AbN8DP.gif","104.gif":"AbNljI.gif","105.gif":"AbNtUS.gif","106.gif":"AbNGHf.gif","107.gif":"AbNYE8.gif","108.gif":"AbNaCQ.gif","109.gif":"AbNN4g.gif","110.gif":"AbN0vn.gif","111.gif":"AbNd3j.gif","112.gif":"AbNsbV.gif","113.gif":"AbNwgs.gif","114.gif":"AbNrD0.gif","115.gif":"AbNDuq.gif","116.gif":"AbNg5F.gif","117.gif":"AbN6ET.gif","118.gif":"AbNcUU.gif","119.gif":"AbNRC4.gif","120.gif":"AbNhvR.gif","121.gif":"AbNf29.gif","122.gif":"AbNW8J.gif","123.gif":"AbNob6.gif","124.gif":"AbN5K1.gif","125.gif":"AbNHUO.gif","126.gif":"AbNIDx.gif","127.gif":"AbN7VK.gif","128.gif":"AbNb5D.gif","129.gif":"AbNX2d.gif","130.gif":"AbNLPe.gif","131.gif":"AbNjxA.gif","132.gif":"AbNO8H.gif","133.gif":"AbNxKI.gif","134.gif":"AbNzrt.gif","135.gif":"AbU9Vf.gif","136.gif":"AbUSqP.gif","137.gif":"AbUCa8.gif","138.gif":"AbUkGQ.gif","139.gif":"AbUFPg.gif","140.gif":"AbUPIS.gif","141.gif":"AbUZMn.gif","142.gif":"AbUExs.gif","143.gif":"AbUA2j.gif","144.gif":"AbUMIU.gif","145.gif":"AbUerq.gif","146.gif":"AbUKaT.gif","147.gif":"AbUmq0.gif","148.gif":"AbUuZV.gif","149.gif":"AbUliF.gif","150.gif":"AbU1G4.gif","151.gif":"AbU8z9.gif","152.gif":"AbU3RJ.gif","153.gif":"AbUYs1.gif","154.gif":"AbUJMR.gif","155.gif":"AbUadK.gif","156.gif":"AbUtqx.gif","157.gif":"AbUUZ6.gif","158.gif":"AbUBJe.gif","159.gif":"AbUdIO.gif","160.gif":"AbU0iD.gif","161.gif":"AbUrzd.gif","162.gif":"AbUDRH.gif","163.gif":"AbUyQA.gif","164.gif":"AbUWo8.gif","165.gif":"AbU6sI.gif","166.gif":"AbU2eP.gif","167.gif":"AbUcLt.gif","168.gif":"AbU4Jg.gif","169.gif":"AbURdf.gif","170.gif":"AbUhFS.gif","171.gif":"AbU5WQ.gif","172.gif":"AbULwV.gif","173.gif":"AbUIzj.gif","174.gif":"AbUTQs.gif","175.gif":"AbU7yn.gif","176.gif":"AbUqe0.gif","177.gif":"AbUHLq.gif","178.gif":"AbUOoT.gif","179.gif":"AbUvYF.gif","180.gif":"AbUjFU.gif","181.gif":"AbaSSJ.gif","182.gif":"AbUxW4.gif","183.gif":"AbaCO1.gif","184.gif":"Abapl9.gif","185.gif":"Aba9yR.gif","186.gif":"AbaFw6.gif","187.gif":"Abaiex.gif","188.gif":"AbakTK.gif","189.gif":"AbaZfe.png","190.gif":"AbaEFO.gif","191.gif":"AbaVYD.gif","192.gif":"AbamSH.gif","193.gif":"AbaKOI.gif","194.gif":"Abanld.gif","195.gif":"Abau6A.gif","196.gif":"AbaQmt.gif","197.gif":"Abal0P.gif","198.gif":"AbatpQ.gif","199.gif":"Aba1Tf.gif","200.png":"Aba8k8.png","201.png":"AbaGtS.png","202.png":"AbaJfg.png","203.png":"AbaNlj.png","204.png":"Abawmq.png","205.png":"AbaU6s.png","206.png":"AbaaXn.png","207.png":"Aba000.png","208.png":"AbarkT.png","209.png":"AbastU.png","210.png":"AbaB7V.png","211.png":"Abafn1.png","212.png":"Abacp4.png","213.png":"AbayhF.png","214.png":"Abag1J.png","215.png":"Aba2c9.png","216.png":"AbaRXR.png","217.png":"Aba476.png","218.png":"Abah0x.png","219.png":"Abdg58.png"}
			};
		},
		onUnload() {
			clearInterval(this.interval);//停止
		},
		onHide() {
			uni.switchTab({
				url:'../message/index'
			})
		},
		onLoad(option) {
			var that = this;
			var toUser = option.toUser;
			this.orderId = option.orderId;
			this.titleName = option.name;
			this.toUser = toUser;
			this.socket = app.globalData.socket;
			this.over = option.over;
			this.myuid = uni.getStorageSync("patientInfo").openId;
			uni.setNavigationBarTitle({
				title: this.titleName 
			});
			this.resetUnreadMsgList();
			
			this.getMsgList();
			this.interval = setInterval(function() {
			      that.loadMessageDetail()
			}, 2000)
			
			
			//语音自然播放结束
			this.AUDIO.onEnded((res)=>{
				this.playMsgid=null;
			});
			// #ifndef H5
			//录音开始事件
			this.RECORDER.onStart((e)=>{
				this.recordBegin(e);
			})
			//录音结束事件
			this.RECORDER.onStop((e)=>{
				this.recordEnd(e);
			})
			// #endif
		},
		methods:{
			getLeftTime(){
				if(this.messageListInfo == null || this.messageListInfo == undefined){
					return '';
				}
				var endTime = this.messageListInfo.endTime;
				if(endTime == null){
					return '';
				}else if(new Date() <= new Date(endTime)){
					return this.$util.getFormatDate(new Date(endTime),'hh:mm'+'结束');
				}else{
					return '已结束';
				}
				
			},
			loadMessageDetail(){
				//获取消息列表中未读的消息
				var messageDetail = uni.getStorageSync("messageDetail");
				var userMsgDetail = messageDetail['order'+this.orderId];
				if(userMsgDetail != null){
					for(var i=0;i<userMsgDetail.length;i++){
						if(userMsgDetail[i].hasRead == '0'){
							this.screenMsg(userMsgDetail[i]);
							userMsgDetail[i].hasRead ='1';
						}
					}
					this.resetUnreadMsgCount();
				}
				messageDetail['order'+this.orderId] = userMsgDetail;
				uni.setStorageSync("messageDetail",messageDetail);
			},
			
			resetUnreadMsgCount(){
				// 消息列表置未读消息数置为0
				var that = this;
				var messageList = uni.getStorageSync('messageList');
				for (var i=0;i<messageList.length;i++){
					if(messageList[i].orderId == this.orderId){
						messageList[i].count = 0;
						this.messageListInfo = messageList[i];
						
					}
				}
				var leftTime = this.getLeftTime();
				uni.setNavigationBarTitle({
					title: that.titleName + ' '+leftTime
				})
				uni.setStorageSync('messageList',messageList);
			},
			resetUnreadMsgList(){
				var messageDetail = uni.getStorageSync("messageDetail");
				var userMsgDetail = messageDetail['order'+this.orderId];
				if(userMsgDetail != null){
					for(var i=0;i<userMsgDetail.length;i++){
						if(userMsgDetail[i].hasRead == '0'){
							userMsgDetail[i].hasRead ='1';
						}
						// this.resetUnreadMsgCount();
					}
					messageDetail['order'+this.orderId] = userMsgDetail;
				}else{
					messageDetail = {};
					messageDetail['order'+this.orderId] = [];
				}
				// messageDetail[this.toUser] = userMsgDetail;
				uni.setStorageSync("messageDetail",messageDetail);
			},
			getMsgList(){
				// this.resetUnreadMsgCount();
				// 消息列表
				let list = uni.getStorageSync("messageDetail")['order'+this.orderId];
				// 获取消息中的图片,并处理显示尺寸
				if(list != null) {
					for(let i=0;i<list.length;i++){
						if(list[i].type=='img'){
							list[i] = this.setPicSize(list[i]);
							console.log("list[i]: " + JSON.stringify(list[i]));
							this.msgImgList.push(list[i].msg.url);
						}
					}
					this.msgList = list;
				}
				
				// 滚动到底部
				this.$nextTick(function() {
					this.scrollTop = 9999;
					this.scrollAnimation = true;
				});
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(row){
				let maxW = uni.upx2px(350);
				let maxH = uni.upx2px(350);
				if(row.msg.w>maxW||row.msg.h>maxH){
					let scale = row.msg.w/row.msg.h;
					if(row.msg.w>row.msg.h){
						row.msg.w = maxW;
						row.msg.h = row.msg.w/scale
					}else{
						row.msg.h = maxH;
						row.msg.w = row.msg.h*scale;
					}
				}
				return row;
			},
			// 接受消息(筛选处理)
			screenMsg(msg){
				//从长连接处转发给这个方法，进行筛选处理
				// if(msg.fromUid!=this.myuid){
				// 	uni.vibrateLong();
				// }
				switch (msg.type){
					case 'text':
						this.addTextMsg(msg);
						break;
					case 'voice':
						this.addVoiceMsg(msg);
						break;
					case 'img':
						this.addImgMsg(msg);
						break;
				}
				if(msg.id){
					this.$nextTick(function() {
						this.scrollToView = 'msg'+msg.id
					});
				}
			},
			// 选择表情
			chooseEmoji(){
				this.showEmji = this.showEmji=='showEmoji'?'hideEmoji':'showEmoji';
			},
			// 隐藏表情
			hideEmoji(){
				this.showEmji = this.showEmji=='showEmoji'?'hideEmoji':'';
			},
			//添加表情
			addEmoji(em){
				this.textMsg+=em.alt;
			},
			// 发送文字消息
			sendText(){
				this.hideEmoji();
				if(!this.textMsg){
					return;
				}
				let content = this.replaceEmoji(this.textMsg);
				let msg = {content:content};
				this.sendMsg(msg,'text');
				this.textMsg = '';
			},
			//替换表情符号为图片
			replaceEmoji(str){
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g,(item, index)=>{
					console.log("item: " + item);
					for(let i=0;i<this.emojiList.length;i++){
						let row = this.emojiList[i];
						for(let j=0;j<row.length;j++){
							let EM = row[j];
							if(EM.alt==item){
								//在线表情路径，图文混排必须使用网络路径
								let onlinePath = 'https://s2.ax1x.com/2019/04/12/'
								let imgstr = '<img src="'+onlinePath+this.onlineEmoji[EM.url]+'">';
								console.log("imgstr: " + imgstr);
								return imgstr;
							}
						}
					}
				});
				// return '<div style="display: flex;align-items: center;">'+replacedStr+'</div>';
				return replacedStr;
			},
			// 选择图片发送
			chooseImage(){
				var that = this;
				this.hideEmoji();
				uni.chooseImage({
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res)=>{
						for(let i=0;i<res.tempFilePaths.length;i++){
							var filePath = res.tempFilePaths[i];
							console.log(res.tempFilePaths[i]);
							uni.showLoading({mask:true});
							uni.uploadFile({
								url: serverUrl+'/didi-patient/ossfile/fileUpload', 
								filePath: filePath,  
								name: 'file',
								header: {  
									"Content-Type": "multipart/form-data",
									'partnerId':uni.getStorageSync('channelId')?uni.getStorageSync('channelId'):'1',
							        'token':uni.getStorageSync('Token')?uni.getStorageSync('Token'):''
								},
								success: (result) => {  
									var resData =  JSON.parse(result.data);
									uni.getImageInfo({
										src: filePath,
										success: (image)=>{
											let msg = {
												content:'[图片]', 
												url:resData.data[0],
												w:image.width,
												h:image.height,
											};
											that.sendMsg(msg,'img');
										},
									});
								},  
								fail: function(err) {  
									uni.showToast({
										title:"发送失败，请重试",
										icon:"none",
										duration:2000
									})
								},  
								complete:function(res){  
									uni.hideLoading();  
								}  
							}); 
						}
					}
				});
			},
			// 发送消息
			sendMsg(content,type){
				//实际应用中，此处应该提交长连接，模板仅做本地处理。
				var that = this;
				var nowDate = new Date();
				//检查订单是否结束 false结束 true未结束
				if(!this.checkSessionNotOuttime(nowDate)){
					//消息超时 提示消息并更改状态
					this.over = '1';
					this.messageListInfo.over = '1';
					//更新缓存
					var messageList = uni.getStorageSync('messageList');
					for (var i=0;i<messageList.length;i++){
						if(messageList[i].orderId == this.orderId){
							messageList[i] = this.messageListInfo;
							this.messageListInfo = messageList[i];
						}
					}
					uni.setStorageSync('messageList',messageList);
					
					uni.showToast({
						title: '此次订单已结束！',
						icon:'none',
						duration: 2000
					});
					return;
				}
				let singleRequest = {
					orderId:this.orderId,
					id:that.$util.uuid(),
					username:this.info.nickName,
					face:this.info.avatarUrl,
					fromUid: that.myuid,
					toUid: that.toUser,
					time:this.$util.getFormatDate(new Date(),'yyyy-MM-dd hh:mm:ss'),
					type:type,
					msg:content
				};
				console.log(singleRequest);
				this.socket.emit('chat', singleRequest, function (data) {
					console.log('系统通知: 你刚刚和 '+that.toUser+' 说了句悄悄话');
					if (data && data.flag) {
						console.log('系统通知: 悄悄话 '+data.message+' 说了句悄悄话');
					} else {
						console.log('系统通知: 悄悄话 '+data.message+' 说了句悄悄话');
					}
				});
				//检查是否为用户第一条消息
				this.checkFistMsg(singleRequest);
				//屏幕添加发送的消息
				this.screenMsg(singleRequest);
				//发送的消息记录到缓存
				this.$util.updateMessage(singleRequest,"1");
			},
			
			checkFistMsg(msg) {
				var that = this;
				var messageDetail = uni.getStorageSync("messageDetail");
				var userMsgDetail = messageDetail['order'+this.orderId];	//获取消息数组
				//判断用户之前是否有发送过消息
				var tmpArr = userMsgDetail.filter(function(p){
				  return p.fromUid === that.myuid;
				});
				if(tmpArr.length<1){
					//未发送过消息 调用首次发送消息
					that.$util.request({
						url: "/didi-patient/inquiryinfo/patientFirstSendMessage",
						param: {"inquiryId":that.orderId}, 
						contentType: 'application/x-www-form-urlencoded',
						success: function(res) {
							//记录接单开始时间 付费时间
							var startTime= res.data.startTime;
							var endTime= res.data.endTime;
							var payType = res.data.payType;
							var inquiryTime = that.$util.getInquiryTimeByType(payType);
							var messageListInfo = that.messageListInfo;
							messageListInfo.startTime = startTime;
							messageListInfo.endTime = endTime;
							messageListInfo.inquiryTime = inquiryTime;
							//更新缓存
							var messageList = uni.getStorageSync('messageList');
							for (var i=0;i<messageList.length;i++){
								if(messageList[i].orderId == that.orderId){
									messageList[i] = messageListInfo;
									that.messageListInfo = messageList[i];
								}
							}
							uni.setStorageSync('messageList',messageList);
							var leftTime = that.getLeftTime();
							uni.setNavigationBarTitle({
								title: that.titleName+' '+leftTime
							});
						},
						error: function() {}
					})
				}
			},
			
			checkSessionNotOuttime(checkDate){
				var startTime = this.messageListInfo.startTime;
				var endTime = this.messageListInfo.endTime;
				var inquiryTime = this.messageListInfo.inquiryTime;
				console.log(this.messageListInfo);
				if(endTime == null){
					//第一次发送的消息不作判断
					return true;
				}else if(checkDate <= new Date(endTime)){
					//未超时
					return true;
				}else{
					return false;
				}
			},
			
			// 处理文字消息
			addTextMsg(msg){
				this.msgList.push(msg);
			},
			// 处理语音消息
			addVoiceMsg(msg){
				this.msgList.push(msg);
			},
			// 处理图片消息
			addImgMsg(msg){
				msg = this.setPicSize(msg);
				this.msgImgList.push(msg.msg.url);
				this.msgList.push(msg);
			},
			// 预览图片
			showPic(row){
				uni.previewImage({
					indicator:"none",
					current:row.msg.url,
					urls: this.msgImgList
				});
			},
			// 播放语音
			playVoice(msg){
				this.playMsgid=msg.id;
				this.AUDIO.src = msg.msg.url;
				console.log("msg.msg.url: " + msg.msg.url);
                this.AUDIO.play();
			},
			// 录音开始
			voiceBegin(e){
				if(e.touches.length>1){
					return ;
				}
				this.initPoint.Y = e.touches[0].clientY;
				this.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({format:"aac"});//录音开始,
			},
			//录音开始UI效果
			recordBegin(e){
				this.recording = true;
				this.voiceTis='松开 结束';
				this.recordLength = 0;
				this.recordTimer = setInterval(()=>{
					this.recordLength++;
				},1000)
			},
			// 录音被打断
			voiceCancel(){
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.willStop = true;//不发送录音
				this.RECORDER.stop();//录音结束
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e){
				if(!this.recording){
					return;
				}
				let touche = e.touches[0];
				//上滑一个导航栏的高度触发上滑取消发送
				if(this.initPoint.Y - touche.clientY>=uni.upx2px(100)){
					this.willStop = true;
					this.recordTis = '松开手指 取消发送'
				}else{
					this.willStop = false;
					this.recordTis = '手指上滑 取消发送'
				}
			},
			// 结束录音
			voiceEnd(e){
				if(!this.recording){
					return;
				}
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.RECORDER.stop();//录音结束
			},
			
			//录音结束(回调文件)
			recordEnd(e){
				var that = this;
				clearInterval(this.recordTimer);
				if(!this.willStop){
					let msg = {
						content:'[语音]',
						length:0,
						url:e.tempFilePath
					}
					let min = parseInt(this.recordLength/60);
					let sec = this.recordLength%60;
					min = min<10?'0'+min:min;
					sec = sec<10?'0'+sec:sec;
					msg.length = min+':'+sec;
					
					uni.showLoading({mask:true});
					var filePath = e.tempFilePath;
					uni.uploadFile({
						url: serverUrl+'/didi-patient/ossfile/fileUpload',
						filePath: filePath,  
						name: 'file',
						header: {  
							"Content-Type": "multipart/form-data",
							'partnerId':uni.getStorageSync('channelId')?uni.getStorageSync('channelId'):'1',
						    'token':uni.getStorageSync('Token')?uni.getStorageSync('Token'):''
						},
						success: (result) => {  
							var resData =  JSON.parse(result.data);
							msg.url = resData.data[0];
							that.sendMsg(msg,'voice');
						},  
						fail: function(err) {  
							uni.showToast({
								title:"发送失败，请重试",
								icon:"none",
								duration:2000
							})
						},
						complete:function(res){  
							uni.hideLoading();  
						}  
					}); 
				}else{
					console.log('取消发送录音');
				}
				this.willStop = false;
			},
			// 切换语音/文字输入
			switchVoice(){
				this.hideEmoji();
				this.isVoice = this.isVoice?false:true;
			},
			discard(){
				return;
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #e5e5e5;
}

	.icon {
		font-size:56upx;
		color: #333;
	}
.hidden{
	display: none !important;
}
@keyframes showEM {
	0% {transform: translateY(0);}
	100% {transform: translateY(-42vw);}
}
@keyframes hideEM {
	0% {transform: translateY(-42vw);}
	100% {transform: translateY(0);}
}
.emoji-box{
	&.hideEmoji{animation: hideEM .15s linear both;}
	&.showEmoji{animation: showEM .15s linear both;}
	width: 96%;
	height: 42vw;
	padding: 20upx 2%;
	background-color: #f3f3f3;
	border-top: solid 1upx #ddd;
	position: fixed;
	z-index: 20;
	top: 100%;
	.swiper{
		swiper-item{
			display: flex;
			flex-wrap: wrap;
			view{
				width: 12vw;
				height: 12vw;
				display: flex;
				justify-content: center;
				image{
					width: 60%;
				}
			}
		}
	}
}
.input-box{
	&.hideEmoji{animation: hideEM .15s linear both;}
	&.showEmoji{animation: showEM .15s linear both;}
	width: 98%;
	min-height: 100upx;
	padding: 0 1%;
	background-color: #f2f2f2;
	display: flex;
	position: fixed;
	z-index: 20;
	bottom: 0;
	.voice,.more{
		flex-shrink: 0;
		width: 90upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.send{
		//H5发送按钮左边距
		/* #ifdef H5 */
		margin-left: 20upx;
		/* #endif */
		flex-shrink: 0;
		width: 100upx;
		height: 100upx;
		display: flex;
		align-items: center;
		.btn{
			width: 90upx;
			height: 56upx;
			display: flex;
			justify-content: center;
			align-items: center;
			background:linear-gradient(to right,#f09b37,#eb632c);
			color: #fff;
			border-radius: 6upx;
			font-size: 24upx;
		}
	}
	.textbox{
		width: 100%;
		min-height: 70upx;
		margin-top: 15upx;
		.voice-mode{
			width: calc(100% - 2upx);
			height: 68upx;
			border-radius: 70upx;
			border:solid 1upx #cdcdcd;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			background-color: #fff;
			color: #555;
			&.recording{
				background-color: #e5e5e5;
			}
		}
		.text-mode{
			width: 100%;
			min-height: 70upx;
			display: flex;
			background-color: #fff;
			border-radius: 40upx;
			.box{
				width: 100%;
				padding-left: 30upx;
				min-height: 70upx;
				display: flex;
				align-items: center;
				textarea{
					width: 100%;
				}
			}
			.em{
				flex-shrink: 0;
				width: 80upx;
				height: 70upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
}
.over-view {
	width: 700upx;
	background-color: rgba($color: #aaaaaa, $alpha: 0.5);
	color: #FFFFFF;
	text-align: center;
	min-height: 40upx;
	padding: 10upx 0;
	position: fixed;
	z-index: 20;
	bottom: 10upx;
	left: 25upx;
}
.record{
	width: 40vw;
	height: 40vw;
	position: fixed;
	top: 55%;
	left: 30%;
	background-color: rgba(0,0,0,.6);
	border-radius: 20upx;
	.ing{
		width: 100%;
		height: 30vw;
		display: flex;
		justify-content: center;
		align-items: center;
		@keyframes volatility {
			0% {background-position: 0% 130%;}
			20% {background-position: 0% 150%;}
			30% {background-position: 0% 155%;}
			40% {background-position: 0% 150%;}
			50% {background-position: 0% 145%;}
			70% {background-position: 0% 150%;}
			80% {background-position: 0% 155%;}
			90% {background-position: 0% 140%;}
			100% {background-position: 0% 135%;}
		}
		.icon{
			background-image:linear-gradient(to bottom,#f09b37,#fff 50%); 
			background-size:100% 200%;
			animation: volatility 1.5s ease-in-out -1.5s infinite alternate;
			-webkit-background-clip:text; 
			-webkit-text-fill-color:transparent; 
			font-size: 150upx;
			color: #f09b37;
		}
	}
	.cancel{
		width: 100%;
		height: 30vw;
		display: flex;
		justify-content: center;
		align-items: center;
		.icon{
			color: #fff;
			font-size: 150upx;
		}
	}
	.tis{
		width: 100%;
		height: 10vw;
		display: flex;
		justify-content: center;
		font-size: 28upx;
		color: #fff;
		&.change{
			color: #f09b37;
		}
	}
}
.content{
	width: 100%;
	.msg-list{
		width: 96%;
		padding: 0 2%;
		position: absolute;
		top: 0;
		bottom: 100upx;
		.row{
			&:first-child{
				margin-top: 20upx;
			}
			padding: 20upx 0;
			.my .left,.other .right{
				width: 100%;
				display: flex;
				.bubble{
					max-width: 70%;
					min-height: 50upx;
					border-radius: 10upx;
					padding: 15upx 20upx;
					display: flex;
					align-items: center;
					font-size: 32upx;
					word-break: break-word;
					&.img{
						background-color: transparent;
						padding:0;
						overflow: hidden;
						image{
							max-width: 350upx;
							max-height: 350upx;
						}
					}
					&.voice{
						.icon{
							font-size: 40upx;
							display: flex;
							align-items: center;
						}
						.icon:after
						{
							content:" ";
							width: 53upx;
							height: 53upx;
							border-radius: 100%;
							position: absolute;
							box-sizing: border-box;
						}
						.length{
							font-size: 28upx;
						}
					}
				}
			}
			.my .right,.other .left{
				flex-shrink: 0;
				width: 80upx;
				height: 80upx;
				image{
					width: 80upx;
					height: 80upx;
					border-radius: 10upx;
				}
			}
			.my{
				width: 100%;
				display: flex;
				justify-content: flex-end;
				.left{
					min-height: 80upx;
					
					align-items: center;
					justify-content: flex-end;
					.bubble{
						background-color: #f06c7a;
						color: #fff;
						&.voice{
							.icon{
								color: #fff;
							}
							.length{
								margin-right: 20upx;
							}
						}
						&.play{
							@keyframes my-play {
								0% {
									transform: translateX(80%);
								}
								100% {
									transform: translateX(0%);
								}
							}
							.icon:after
							{
								border-left: solid 10upx rgba(240,108,122,.5);
								animation: my-play 1s linear infinite;
							}
						}
					}
				}
				.right{
					margin-left: 15upx;
				}
			}
			.other{
				width: 100%;
				display: flex;
				.left{
					margin-right: 15upx;
				}
				.right{
					flex-wrap: wrap;
					.username{
						width: 100%;
						height: 45upx;
						font-size: 24upx;
						color: #999;
						display: flex;
						.name{
							margin-right: 50upx;
						}
					}
					.bubble{
						background-color: #fff;
						color: #333;
						&.voice{
							.icon{
								color: #333;
								
							}
							.length{
								margin-left: 20upx;
							}
						}
						&.play{
							@keyframes other-play {
								0% {
									transform: translateX(-80%);
								}
								100% {
									transform: translateX(0%);
								}
							}
							.icon:after
							{
								border-right: solid 10upx rgba(255,255,255,.8);
								
								animation: other-play 1s linear infinite;
							}
						}
					}
				}
			}
		}
	}
}
</style>
