<template>
	
</template>

<script>
	export default{
		components:{  },
		props:{
			doctorInfo: {
				avatarUrl: '../../static/avatar.png',
				doctorName:'点击登录',
				amount:0,
			}
		},
		data(){
			return{
				
			}
		}, 
		onShow(){
			
		},
		methods:{
			pdLogin:function(){
				uni.navigateTo({
					url: '/pages/my/userDetail'
				})
			},
			setPassword:function(){
				uni.navigateTo({
					url: '/pages/my/userPassword'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	
	
</style>
