<template>
	<view>
		<custom height="0" lineColor="#dcdcdc" borderColor="rgba(220,220,220,0.6)" btnMode="2" backColor="#000000" houseBk="true"
		 mode="2" fixed="fixed"></custom>

		<view>
			<image :src="options.image || ''" mode="aspectFill" style="background-color: #F4F4F4;width: 750rpx;height: 750rpx;line-height: 0;font-size: 0;"></image>
		</view>

		<view style="width: 690rpx;margin-left: 30rpx;margin-top: 20rpx;background-color: #F5F5F5;border-radius: 8rpx;padding: 40rpx 40rpx 30rpx 40rpx;">
			<view style="width: 610rpx;height: 90rpx;" class="flex flex-y-center">
				<view style="width: 416rpx;height: 88rpx;line-height: 88rpx;background-color: #FFFFFF;text-align: center;border-radius: 8rpx;border: 1rpx dashed #EB0401;font-size: 30rpx;color: #595959;border-right: none;border-radius: 8rpx 0 0 8rpx;">
					{{options.link || ''}}
				</view>
				<view hover-class="click1" @tap="copy_link" style="width: 194rpx;height: 90rpx;line-height: 90rpx;color: #FFFFFF;font-size: 30rpx;text-align: center;background-color: #EB0401;border-radius: 8rpx;"
				 :style="{'background-color':!copy_success?'#EB0401':'#489A19'}">
					一键复制
				</view>
			</view>
			<view class="" style="font-size: 30rpx;color: #EB0401;text-align: center;margin-top: 23rpx;" :style="{'color':!copy_success?'#EB0401':'#489A19'}">
				{{!copy_success?text1:text2}}
			</view>
		</view>

		<view>
			<image :src="init_img.czsm" mode="widthFix" style="width: 750rpx;margin-top: 47rpx;padding:0 24rpx;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: {}, //页面传过来的参数
				text1: '点击“一键复制”，打开手机淘宝APP购买',
				text2: '复制成功，打开淘宝APP领券下单',
				copy_success: false,
			}
		},
		methods: {
			copy_link() {
				this.setClipboardData({
					data: this.options.link,
					success: () => {
						this.copy_success = true;

						this.timer = setTimeout(() => {
							this.uniBack();
						}, 5000);


					}
				});
			}
		},
		onLoad(e) {
			uni.hideShareMenu();
			this.options = e || {};
			console.log(e);
		},
		onUnload() {
			if (this.timer) {
				clearTimeout(this.timer);
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
</style>
