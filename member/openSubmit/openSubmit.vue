<template>
	<view class="page pr">
		<view class="header">
			<custom mode="2" btnMode="2" backColor="#fff" houseBk="#fff" borderColor='#ccc' background="linear-gradient(270deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);" pageBack="true" @goback="goback"></custom>
			<view class="user-msg-box flex-x-center mt-20 flex-y-center color-fff">
				<view class="iconfont icon-xuanzhong " style="font-size: 60rpx;"></view>
				<view style="font-size: 40rpx;font-weight: bold;margin-left: 16rpx;">提交成功</view>
			</view>
			<view class="flex-x-center" style="font-size: 30rpx;margin-top:30rpx;color: rgba(255, 255, 255, 0.76);">后台审核需要1～3个工作日</view>
		</view>
		<view class="main">
			<view class="main-title fs-30">- 关注公众号获取开店提醒 -</view>
			<image :src="wxgzh_msg" style="width: 580rpx;" mode="widthFix"></image>
		</view>
		<view class="footer">
			<navigator url="/pages/webView/webView?url=https://mp.weixin.qq.com/s/m_HRdX9zgPIYySVTVJmG8w" class="footer-btn">点击，去关注公众号</navigator>
		</view>
	</view>
</template>

<script>
	import custom from '@/components/custom/custom.vue'

	export default {
		data() {
			return {
				wxgzh_msg: uni.getStorageSync('_img').wxgzh_msg
			}
		},
		methods: {
			goback() {
				uni.navigateBack({
					delta: 2,
					fail: (res) => {
						this.uniBack();
					}
				})
			}
		}
	}
</script>

<style>
	.page {
		min-height: 100%;
		background: #fff;
		padding-bottom: 152rpx;
	}

	.header {
		background: linear-gradient(270deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
		padding-bottom: 143rpx;
	}
	.main {
		width: 750rpx;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		margin-top: -103rpx;
		padding: 0 85rpx;
	}
	.main-title {
		color: #737373;
		font-weight: bold;
		text-align: center;
		padding-top: 27rpx;
		padding-bottom: 20rpx;
	}
	.footer {
		position: fixed;
		width: 100%;
		padding: 34rpx 24rpx;
		bottom: 0;
		left: 0;
	}
	.footer-btn {
		width: 100%;
		height: 90rpx;
		text-align: center;
		font-size: 30rpx;
		color: #fff;
		font-weight: bold;
		background: #EC0E0C;
		border-radius: 45rpx;
		line-height: 90rpx;
	}
</style>
