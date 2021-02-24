<template>
	<view class="page">
		
		<view class="progress">
			<custom mode="1" fixed="fixed" ></custom>
			<view class="progress-box mt-20">
				<view class="progress-main">
					<view class="progress-main-title flex justify-between">
						<view class="" style="width: 144rpx;"></view>
						<view class="flex1 text-center color-000000 fs-40">升级进度</view>
						<view class="to-my-team fs-24 flex-y-center flex-x-center" @click="toMyTeam">
							<text>我的亲团</text>
							<text class="iconfont icon-bofang2 fs-18 ml-10" style="margin-top: 6rpx;"></text>
						</view>
					</view>
					<view class="progress-main-main color-000000 flex justify-between">
						<view>
							<view class="fs-28">直接大亲</view>
							<view class="fs-36 ns-text-bold mt-16">{{big_mch}}</view>
						</view>
						<view>
							<view class="fs-28">直接小亲*</view>
							<view class="fs-36 ns-text-bold mt-16">{{small_mch}}</view>
						</view>
						<view>
							<view class="fs-28">一步之遥</view>
							<view class="fs-36 ns-text-bold mt-16">{{step}}</view>
						</view>
					</view>
					<view class="progress-main-footer color-000000 fs-24 text-center">
						* 直接小亲：不含新开店30天以内的小亲
					</view>
				</view>
			</view>
		</view>
		<image :src="cw_daqin" mode="widthFix" style="width: 100%;"></image>
		<button open-type="share" class="footer-btn">点击，立即邀请开店</button>
	</view>
</template>

<script>
	import custom from '@/components/custom/custom.vue'
	export default {
		data() {
			return {
				cw_daqin: '',
				pic_invite_mch: uni.getStorageSync('_img').pic_invite_mch,
				step: '',
				big_mch: '',
				small_mch: '',
			}
		},
		onLoad() {
			this.getProgress()
		},
		methods: {
			getProgress() {
				this.getApp().request({
					url: this.getApp().api.user.user_level_step,
					data: {},
					success: (res) => {
						console.log(res);
						if (res.code == 0) {
							this.cw_daqin = res.data.url
							this.big_mch = res.data.big_mch
							this.small_mch = res.data.small_mch
							this.step = res.data.step
						} else {
							cw_daqin
						}
					}
				})
			},
			toMyTeam() {
				uni.navigateToMiniProgram({
					appId: 'wxfd13fd712d32b3cb',
					path: '/pages/myTeam/myTeam',
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
		},
		onShareAppMessage() {
			var mch_id = uni.getStorageSync('_mchInfo').id;
			var user_id = this.getApp().core.getStorageSync('USER_INFO').id;
			var nickname = this.getApp().core.getStorageSync('USER_INFO').nickname;
			var title = nickname + '邀请你一起开店，点击立即开启';
			var img = this.pic_invite_mch;
			return {
				title: title,
				path: '/pages/storeInvite/storeInvite?mch_id=' + mch_id + '&user_id=' + user_id,
				imageUrl: img
			};
		}
	}
</script>

<style>
	.page {
		min-height: 100%;
		padding-bottom: 90rpx;
	}
	.footer-btn {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 100rpx;
		background: #FFFFFF;
		box-shadow: 0px -1rpx 8rpx 0px rgba(210, 210, 210, 0.5);
		font-size: 30rpx;
		line-height: 100rpx;
		text-align: center;
		font-weight: bold;
		color: #F23005;
		border-radius: 0rpx;
	}
	.progress {
		width: 100%;
		background: #F23005;
		position: relative;
		z-index: 1;
		
	}
	.progress-box {
		padding: 0 34rpx;
	}
	.progress-main {
		width: 682rpx;
		height: 343rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 0 28rpx;
	}
	.progress-main-title {
		padding: 26rpx 0;
		border-bottom: 1rpx solid rgba(141,141,141,.76);
	}
	.to-my-team {
		width: 144rpx;
		height: 50rpx;
		line-height: 50rpx;
		background: #F23005;
		border-radius: 10rpx;
		color: #FFFFFF;
	}
	.progress-main-main {
		padding: 32rpx 38rpx;
		border-bottom: 1rpx solid rgba(141,141,141,.76);
	}
	.progress-main-footer {
		padding-top: 22rpx;
		padding-bottom: 25rpx;
		opacity: 0.76;
	}
</style>
