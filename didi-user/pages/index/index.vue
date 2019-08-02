<template>
	<view class="content">
		<image class="logo" src="http://pic.haoayi.xyz/xfshequsit/20190725/14413236928cc6.jpg"></image>
		
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
