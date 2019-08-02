<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
			let that=this;
			uni.login({
				provider: 'weixin',
				success: function(res) {
					const code = res.code;
					that.loginByCode(code)
				}
			})
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
					url: "/usermanager-client/ex/loginByCode",
					param: param,
					contentType: 'application/x-www-form-urlencoded',
					success: function(res) {
						uni.setStorageSync('Token', res.data.weixinOpenid);
						uni.setStorageSync('userInfo', res.data);
						// if(!res.data.telephone){
						// 	setTimeout(function(){
						// 		uni.redirectTo({
						// 			url:'../../login/authorize'
						// 		})
						// 	},1000) 
						// }
					},
					error: function() {}
				})
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
</style>
