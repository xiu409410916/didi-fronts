<template>
	<view class="content">
		<image-upload></image-upload>
	</view>
</template>

<script>
	
	import ImageUpload from '../../components/image-upload.vue';
	
	export default {
		components:{
				ImageUpload
		},
		
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

	
</style>
