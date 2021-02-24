<template>
	<view>
		<!-- <custom :title="title" mode="2" fixed="fixed" backColor="#666666" titleColor="#666666" background="#FFFFFF"></custom> -->
		<view>
			<video :autoplay="true" style="width: 100%;height: 100vh;" :src="src" controls></video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',//头部标题
				src:'',//视频地址
			}
		},
		methods: {
			
		},
		onLoad(e) {
			this.title = e.title || '';
			uni.setNavigationBarTitle({
				title:e.title || ''
			})
			if(e.src) {
				this.src = e.src
				return
			}
			if(e.id){
				//tK_video
				this.getApp().request({
					url: this.getApp().api.taoke.tK_video,
					data: {
						id:e.id
					},
					success: (res) => {
						if (res.code == 0) {
							this.src = res.data.url || '';
						} else {
							if (res.code == 1) {
								uni.showToast({
									icon:'none',
									title:res.msg,
									duration:1000
								})
								setTimeout(()=>{
									this.uniBack();
								},800)
							}
						}
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			}else{
				uni.showToast({
					icon:'none',
					title:'该内容已被删除',
					duration:1500
				});
				setTimeout(()=>{
					this.uniBack();
				},500);
			}
		}
	}
</script>

<style >
 page{
	 height: 100vh;
	 overflow-y: hidden;
 }
</style>
