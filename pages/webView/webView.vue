<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			// console.log(options);

			let url = options.url + '?';
			let all = JSON.parse(JSON.stringify(options));
			delete(all.url);
			url = url + this.getApp().helper.objectToUrlParams(all)
			console.log(url)
			this.url = url || options.url;
		},
		methods: {

		}
	}
</script>

<style>

</style>
