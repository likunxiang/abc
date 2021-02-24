<template>
	<view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(e) {
			let scene = decodeURIComponent(e.scene || '');
			let str = this.getApp().helper.scene_decode(scene);
			console.log('/pages/goodsTK/goodsTk' + '?' + this.getApp().helper.objectToUrlParams(str))
			uni.reLaunch({
				url: '/pages/goodsTK/goodsTK' + '?' + this.getApp().helper.objectToUrlParams(str)
			})
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
</style>
