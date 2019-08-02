<template>
	<view class="content">
		<image class="logo" src="http://pvllxl0mi.bkt.clouddn.com/20190802/1532217291bca2.jpg"></image>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 300upx;
		width: 100%;
	}

	
</style>
