<script>
	const io = require('common/weapp.socket.io.js');
	export default {
		globalData: {
			socket:''
		},
		onLaunch: function () {
			console.log('App Launch')
			let that=this;
			uni.setTabBarBadge({
				index: 1,
				text: '31'
			});
			uni.login({
				provider: 'weixin',
				success: function(res) {
					const code = res.code;
					that.loginByCode(code)
				}
			});
			var messageList = [
						  {
						    title: "马云",
						    openId:"user888",
						    avatarUrl: [
						      uni.getStorageSync("patientInfo").avatarUrl
						    ],
						    message: "什么鬼，我有支付宝[禁止滑动]",
						    time: "2019-07-16 15:15",
						    count: 0,
						    type: 2 //普通用户类型消息
						  },
						  {
						    title: "李彦宏",
						    openId:"user777",
						    avatarUrl: [
						      uni.getStorageSync("patientInfo").avatarUrl
						    ],
						    message: "抄袭我的吧，我早都做过了",
						    time: "2019-08-15 12:13",
						    count: 102,
						    type: 2 //普通用户类型消息
						  },
						  {
						    title: "雷军",
						    openId:"user666",
						    avatarUrl: [
						      uni.getStorageSync("patientInfo").avatarUrl
						    ],
						    message: "微信给你下线，看你还嘚瑟",
						    time: "2019-09-19 12:11",
						    count: 0,
						    type: 2 //普通用户类型消息
						  }
			];
			uni.setStorageSync("messageList",messageList);
			var messageDetail = {"user888":[
						  {id:0,fromUid:'oucHX5YU-wAfuttdkkEu31JWoou8',username:'myName',face:uni.getStorageSync("patientInfo").avatarUrl,time:"12:56",type:"text",msg:{content:"为什么温度会相差那么大？"},hasRead:"1"},
						  {id:1,fromUid:1,username:'myName',face:uni.getStorageSync("patientInfo").avatarUrl,time:"12:57",type:"text",msg:{content:"这个是有偏差的，两个温度相差十几二十度是很正常的，如果相差五十度，那即是质量问题了。"},hasRead:"1"},
						  {id:2,fromUid:1,username:'myName',face:uni.getStorageSync("patientInfo").avatarUrl,time:"12:59",type:"voice",msg:{content:"[语音]",url:"/static/voice/3.aac",length:"00:06"},hasRead:"1"},
						  {id:3,fromUid:'oucHX5YU-wAfuttdkkEu31JWoou8',username:'myName',face:uni.getStorageSync("patientInfo").avatarUrl,time:"13:05",type:"voice",msg:{content:"[语音]",url:"/static/voice/2.mp3",length:"00:06"},hasRead:"1"},
						  {id:4,fromUid:'oucHX5YU-wAfuttdkkEu31JWoou8',username:'myName',face:uni.getStorageSync("patientInfo").avatarUrl,time:"13:05",type:"img",msg:{content:"[图片]",url:"/static/img/p10.jpg",w:200,h:200},hasRead:"1"},
						  {id:5,fromUid:1,username:'myName',face:uni.getStorageSync("patientInfo").avatarUrl,time:"12:59",type:"img",msg:{content:"[图片]",url:"/static/img/q.jpg",w:1920,h:1080},hasRead:"1"}
			]}
			uni.setStorageSync("messageDetail",messageDetail);  
		},
		onShow: function () {
			console.log('App Show')
			uni.removeStorageSync('updateCart');
		},
		onHide: function () {
			console.log('App Hide')
		},
		methods: {
			loginByCode(code) {
				let that = this;
				const param = {}
				param.code = code
				that.$util.request({
					url: "/didi-doctor/ex/login/login_by_weixin",
					param: param,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						uni.setStorageSync('Token', res.data.openId);
						uni.setStorageSync('doctorInfo', res.data);
						that.connectMsgServer(res.data);
					},
					error: function() {}
				})
			},
			connectMsgServer(patientInfo){
				var that = this;
				var fromUser = patientInfo.openId;
				var url = 'http://localhost:9092?token='+fromUser;
				const socket = io.connect(url);
				getApp().globalData.socket = socket;
				socket.on('connect', function () {
					console.log('系统通知: '+fromUser+'成功连接至websocket服务器');
				});
				socket.on('disconnect', function () {
					console.log('系统通知: '+fromUser+'已从websocket服务器断开连接');
				});
				socket.on('chat', function (data) {
					// var content = {content:data.message};
					// var lastid = that.msgList[that.msgList.length-1].id;
					// lastid++;
					var msg = data;
					that.$util.updateMessage(msg,'0');
					uni.vibrateLong();
					// var msg = {id:lastid,openId:openId,uid:1,username:that.$data.info.nickName,face:that.$data.info.avatarUrl,time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,msg:content};
					console.log('系统通知: 收到来自'+data.username+'的悄悄话:'+data.msg.content);
				});
			},
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './common/uni.css';
	@import "./static/iconfont/font.scss";
</style>

