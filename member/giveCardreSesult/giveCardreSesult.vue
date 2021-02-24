<template>
	<view class="page pr">
		<image :src="page_bg" mode="widthFix" style="width: 100%;position: absolute;left: 0rpx;top: 0rpx;z-index: -1;"></image>
		<view class="main">
			<view class="fs-30 " style="color: #FD3305;text-spacing: 50rpx;line-height: 46rpx;">邀请你加下好友，享受我的专属导购服务吧，根据你的需求帮你找货，在各大平台帮你比价、找券，省钱、省事、省时间</view>
			<view class="fs-30 ns-text-bold" style="color: #FD3305;margin-top: 30rpx;">添加微信，有需要随时联系我，我等你来</view>
			<view class="fs-30 flex" style="margin-top: 37rpx;">
				<image :src="user.avatar_url" mode="aspectFill" style="width: 72rpx;height: 72rpx;border-radius: 50%;"></image>
				<view class="wx-info-box flex align-center">
					<view class="fs-30" style="color: #FD3305;">微信号：{{mch.wechat_name}}</view>
				</view>
			</view>
			<view class="copy-btn" @click="mycopy(mch.wechat_name)">复制微信号，添加好友领红包</view>
			<view class="fs-30 color-333333 text-center" style="margin-top: 39rpx;">添加成功，有惊喜福利赠送</view>
			<view class="flex-x-center" style="margin: 32rpx auto 0;">
				<image :src="pic_red_bag" mode="widthFix" style="width: 315rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				parent_id: '',
				page_bg: uni.getStorageSync('_img').jhy,
				pic_red_bag: uni.getStorageSync('_img').sub_red,
				user: {},
				mch: {}
			}
		},
		onLoad(options) {
			this.parent_id = options.id
			this.getParent()
		},
		methods: {
			getParent() {
				this.getApp().request({
					url: this.getApp().api.default.get_send_mem_parent,
					data: {
						parent_id: this.parent_id
					},
					success: (res) => {
						if (res.code == 0) {
							
							this.user = res.data.user
							this.mch = res.data.mch
						} else {
							this.showToast(res.msg)
						}
					}
							
				})
			}
		}
	}
</script>

<style>
	.page {
		background: #F43005;
		padding-bottom: 20rpx;
	}
.main {
	position: absolute;
	left: 46rpx;
	right: 46rpx;
	top: 331rpx;
	padding: 49rpx 43rpx 47rpx;
	background: #fff;
	border-radius: 20rpx;
}
.wx-info-box {
	width: 470rpx;
	text-align: center;
	height: 72rpx;
	margin-left: 26rpx;
	padding-left: 61rpx;
	background: #FFEBE7;
	border-radius: 36rpx;
}
.copy-btn {
	width: 100%;
	height: 88rpx;
	line-height: 88rpx;
	background: linear-gradient(0deg, #F23005, #FF3305);
	box-shadow: 0px 8rpx 20rpx 0px rgba(255, 81, 40, 0.47);
	border-radius: 44rpx;
	text-align: center;
	font-size: 30rpx;
	color: #fff;
	margin-top: 35rpx;
}
</style>
