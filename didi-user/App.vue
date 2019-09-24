<script>
	export default {
		onLaunch: function (query) {
			const scene = decodeURIComponent(query.scene)
			console.log('App Launch')
			console.log(scene);
			let that=this;
			uni.login({
				provider: 'weixin',
				success: function(res) {
					const code = res.code;
					that.loginByCode(code,scene)
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
			loginByCode(code,scene) {
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
