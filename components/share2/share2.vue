<template>
	<view>
		<view class="shareeeee" v-if="isShowShare" :style="'height: ' + y + 'px;width:100%'" @tap="closeShare" catchtouchmove="true">
			<view @tap.stop="" style="width: 608rpx;height: 924rpx;background: #fff;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);">
				<view class="pa" style="left: 240rpx;top: 300rpx;" v-if="!imageSrc">
					<image style="width: 150rpx;height: 150rpx;" :src="loadingSrc"></image>
					<view style="color: #888">海报生成中</view>
				</view>
				<image style="height: 924rpx;width: 608rpx;" mode="aspectFill" class="share_image" :src="imageSrc"></image>
				<button class="share-btn" @tap.stop="less(savePhotoThrottle)" style="position: absolute;bottom: -115rpx;width: 230rpx;height: 90rpx;line-height: 90rpx;background-color: #EB0300;padding: 0;border-radius: 10rpx !important;color: #fff;font-size: 30rpx;right: 40rpx;">
					<view class="fs-24 color-fff fs-30" style="font-weight: bold;">下载海报</view>
				</button>
				<button class="share-btn" @tap.stop="cancelShow" style="position: absolute;bottom: -115rpx;width: 230rpx;height: 90rpx;line-height: 90rpx;background-color: #FFFFFF;padding: 0;border-radius: 10rpx !important;color: #595959;font-size: 30rpx;left: 40rpx;">
					<view class="fs-24 color-fff" style="color: #595959;font-size: 30rpx;font-weight: bold;">取消下载</view>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'share2',
		data() {
			return {
				isShowShare: false,
				qrcode_pic: '',
				y: uni.getSystemInfoSync().windowHeight,
				imageSrc: '',
			}
		},
		props: {
			// imageSrc: {
			// 	type: String,
			// 	default: ''
			// },
			loadingSrc: '',
		},
		methods: {
			cancelShow(){
				this.isShowShare = false;
			},
			savePhotoThrottle() {
				if (this.imageSrc == '') {
					this.showToast('请等待图片加载完成~', 2000);
					return;
				}
				// uni.saveImageToPhotosAlbum(OBJECT)
				this.downloadFile({
					url: this.imageSrc, //仅为示例，并非真实的资源
					success: (res) => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: _ => {
								this.isShowShare = false;
								uni.showModal({
									content: '图片已保存到相册，赶紧晒一下吧~',
									showCancel: false,
									confirmText: '知道了',
									confirmColor: '#72B9C3',
									success: (res) => {
										if (res.confirm) {
											this.isShowShare = false;
										}
									}
								});
							}
						});
					},
					fail: res => {
						console.log(res)
						this.showToast('图片下载失败', 1500);
					}
				});
			},
			closeShare() {
				this.isShowShare = false;
			},
			open(fn) {
				this.isShowShare = true;

				if (typeof fn == 'function') {
					fn();
				}
			},
			setSrc(src) {
				this.imageSrc = src || '';
			}
		}
	}
</script>

<style>
	.shareeeee {
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 9999;
	}
</style>
