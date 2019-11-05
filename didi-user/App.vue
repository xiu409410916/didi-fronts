<script>
	const io = require('common/weapp.socket.io.js');
	export default {
		globalData: {
			socket: ''
		},
		onLaunch: function(query) {
			const scene = decodeURIComponent(query.scene)
			console.log('App Launch')
			console.log("scene-----------" + scene);
			let that = this;
			uni.login({
				provider: 'weixin',
				success: function(res) {
					const code = res.code;
					that.loginByCode(code, scene)
				}
			})
			var messageList = [];
			if (!uni.getStorageSync("messageList")) {
				//消息列表为空 初始化消息列表
				var messageList = [];
				uni.setStorageSync("messageList", messageList);
			}
			// uni.setStorageSync("messageDetail", messageDetail); 
		},
		onShow: function() {
			console.log('App Show')
			uni.removeStorageSync('updateCart');
			this.getHistoryMessage();
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			getHistoryMessage() {
				var patientInfo = uni.getStorageSync("patientInfo");
				if(null == patientInfo){
					return;
				}
				uni.showToast({
					icon:'none',
					title:'加载消息中...',
					// duration:1500,
					mask:true,
				})
				this.$util.request({
					url: "/didi-patient/message/getUserUnreadedMessage",
					param: {userId:patientInfo.openId},
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						console.log(res);
					},
					error: function() {}
				})
			},
			loginByCode(code, scene) {
				let that = this;
				const param = {}
				param.code = code;
				param.scene = scene;
				that.$util.request({
					url: "/didi-patient/ex/login_by_weixin",
					param: param,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						uni.setStorageSync('Token', res.data.openId);
						uni.setStorageSync('patientInfo', res.data);
						that.connectMsgServer(res.data);
					},
					error: function() {}
				})
			},
			connectMsgServer(patientInfo) {
				var that = this;
				var fromUser = patientInfo.openId;
				var url = 'http://localhost:9092?token=' + fromUser;
				const socket = io.connect(url);
				getApp().globalData.socket = socket;
				socket.on('connect', function() {
					console.log('系统通知: ' + fromUser + '成功连接至websocket服务器');
				});
				socket.on('disconnect', function() {
					console.log('系统通知: ' + fromUser + '已从websocket服务器断开连接');
				});
				socket.on('chat', function(data) {
					// var content = {content:data.message};
					// var lastid = that.msgList[that.msgList.length-1].id;
					// lastid++;
					var msg = data;
					that.$util.updateMessage(msg, '0');
					uni.vibrateLong();
					// var msg = {id:lastid,openId:openId,uid:1,username:that.$data.info.nickName,face:that.$data.info.avatarUrl,time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,msg:content};
					console.log('系统通知: 收到来自' + data.username + '的悄悄话:' + data.msg.content);
				});
			},
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './common/uni.css';
	@import "./static/iconfont/font.scss";
</style>
