<template>
	<view class="share_share">
		<uni-popup type="center" ref="share" opacity="0.7">
			<view class="" style="text-align: center;">
				<image class="share_img" :src="share_img" mode="widthFix"></image>
				
				<!-- 按钮区域 -->
				<view class="fs-24 color-fff" style="margin-top: 31rpx;">
					长按图片可快速转发海报图片
				</view>
				<view class="flex flex-x-a" style="margin-top: 30rpx;" @tap="close">
					<view class="flex flex-y flex-y-center">
						<button @tap="close" class="fffff" open-type="share" :data-type="9">
							<view style="background-color: #FFFFFF;width:100rpx;height:100rpx;border-radius: 50%;font-size: 70rpx;color: #18CE38;" class="iconfont icon-weixin flex flex-x-center flex-y-center">
								
							</view>
							<view class="pt-24 fs-24 color-fff" style="white-space: nowrap;transform: translateX(-8rpx);">
								分享好友群
							</view>
						</button>
					</view>
					<view class="flex flex-y flex-y-center"  >
						<view  @tap.stop="less(xiazai)" style="background-color: #FFFFFF;width:100rpx;height:100rpx;border-radius: 50%;font-size:60rpx;color: #F2370D;" class="iconfont icon-xiazai1 flex flex-x-center flex-y-center">
							
						</view>
						<view  @tap.stop="less(xiazai)" class="pt-24 fs-24 color-fff">
							下载海报
						</view>
					</view>
				</view>
				<!-- 按钮区域 -->
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:'share',
		data(){
			return {
				
			}
		},
		props:{
			share_img:''
		},
		methods:{
			open(){
				this.$refs.share.open();
			},
			close(){
				this.$refs.share.close();
			},
			xiazai(){
				// uni.downloadFile({
				//     url: this.share_img, //仅为示例，并非真实的资源
				//     success: (res) => {
				
				// 		this.$refs.share.close();
				//     },
				// 	fail:(res)=>{
				// 		uni.showToast({
				// 			icon:"none",
				// 			title:'下载失败'
				// 		});
				// 	}
				// });
				this.$refs.share.close();
				this.downloadFile({
					url: this.share_img,
					success: (res) => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: (res)=> {
								//console.log('saveImageToPhotosAlbum',res)
								uni.showToast({
									icon:'none',
									title: '保存成功',
								})
							},
							fail(res) {
								//console.log(res)
								uni.showToast({
									icon:'none',
									title: '保存失败',
								})
							}
						})
					},
					fail: (res) => {
						uni.showToast({
							icon: "none",
							title: '下载失败'
						});
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.share_img{
		width: 648rpx;
		height: 991rpx;
		border-radius: 20rpx;
	}
	.fffff{
		padding: 0;
		margin: 0;
		display: inline !important;
		background-color: transparent;
		line-height: 24rpx;
		text-align: center;
		width: 100rpx;
		
		overflow: visible;

	}
</style>
