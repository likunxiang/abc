<template>
	<view class="main" style="position: fixed;z-index: 100;top: 0rpx;left: 0rpx;">
		<view :style="'width: ' + x + 'px;height:' + y + 'px;position: relative;'">
			<view style="width: 100%;height: 100%;position: absolute;z-index: 101;top: 0rpx;left: 0rpx;">
				<image :src="open_mch_guide.open_mch_guide_d" mode="scaleToFill" style="width: 100%;height: 100%;"></image>
			</view>
			<view style="width: 100%;height: 100%;position: absolute;z-index: 102;top: 0rpx;left: 0rpx;" v-if="step==1">
				<image @click="next" :src="open_mch_guide.open_mch_guide_a" mode="scaleToFill" style="width: 100%;height: 100%;"></image>
			</view>
			<view style="width: 100%;height: 100%;position: absolute;z-index: 102;top: 0rpx;left: 0rpx;" v-if="step==2">
				<image :src="open_mch_guide.open_mch_guide_b" mode="scaleToFill" style="width: 100%;height: 100%;"></image>
				<!-- 去看看 -->
				<view class="to-speed-up" @click="toSpeedUp"></view>
				<!-- 关闭 -->
				<view class="close-all" @click="closeGuidance"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				open_mch_guide: {},
				x: uni.getSystemInfoSync().windowWidth,
				y: uni.getSystemInfoSync().windowHeight,
				step: 1, // 图片步骤
			}
		},
		props: {

		},
		created() {
			this.getGuidance()
		},
		methods: {
			next() {
				this.step = 2 // 图片步骤
			},
			closeGuidance() {
				this.$emit('closeGuidance')
			},
			toSpeedUp() {
				uni.navigateToMiniProgram({
					appId: 'wxfd13fd712d32b3cb',
					path: '/tool/speedUp/speedUp',
					extraData: {
						// 传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
						mch_id: uni.getStorageSync('_mchInfo').id,
						token: uni.getStorageSync(this.getApp().const.ACCESS_TOKEN)
					},
					envVersion: 'trial',
				
					// 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效
					success(res) {
						// 打开成功
					},
				
					fail: function(res) {}
				});
			},
			getGuidance() {
				console.log(this.getApp().api.user.new_open_mch_img);
				this.getApp().request({
					url: this.getApp().api.user.new_open_mch_img,
					success: (res) => {
						if (res.code == 0) {
							this.open_mch_guide = res.data
							console.log(res);
						} else {
							this.showToast(res.msg)
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.to-speed-up {
		position: absolute;
		z-index: 102;
		bottom: 36%;
		right: 125rpx;
		width: 140rpx;
		height: 60rpx;
	}
	.close-all {
		position: absolute;
		z-index: 102;
		bottom: 27%;
		right: 168rpx;
		width: 60rpx;
		height: 60rpx;
	}
</style>
