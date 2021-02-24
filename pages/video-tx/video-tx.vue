<template>
	<view class="">
		<view class="woaini">
			<txv-video class="myvideo" :vid="src" playerid="xxxxx" autoplay style="width: 100%;height: 100vh;"></txv-video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// src: 'z3225qji9io',
				src:'',
			}
		},
		onLoad(e) {
			this.title = e.title || '';
			uni.setNavigationBarTitle({
				title: e.title || ''
			})
			
			
			
			if (e.src) {
				this.src = e.src;
				this.timeOut(()=>{
					const TxvContext = requirePlugin("tencentvideo");  
					let txvContext = TxvContext.getTxvContext('xxxxx')
					txvContext.requestFullScreen();
				},100)
				return
			}
			if (e.id) {
				//tK_video
				this.getApp().request({
					url: this.getApp().api.taoke.tK_video,
					data: {
						id: e.id
					},
					success: (res) => {
						if (res.code == 0) {
							this.src = res.data.url || '';
							
						} else {
							if (res.code == 1) {
								uni.showToast({
									icon: 'none',
									title: res.msg,
									duration: 1000
								})
								setTimeout(() => {
									this.uniBack();
								}, 800)
							}
						}
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			} else {
				// return;
				uni.showToast({
					icon: 'none',
					title: '该视频已被删除',
					duration: 1500
				});
				setTimeout(() => {
					this.uniBack();
				}, 500);
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #000000;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		padding-bottom: 100rpx;
		height: 100vh;
		overflow: hidden;
	}

	.woaini {
		background-color: red;
		width: 750rpx;
	}
</style>
