<template>
	<!--pages/paySucceed/paySucceed.wxml-->
	<!--pages/paySucceed/paySucceed.wxml-->
	<view class="pr" style="height: 100%;">
		<image style="width: 750rpx;height: 100%;position: absolute;top: 0;left: 0;z-index: -1;" mode="aspectFill" :src="bg_img"></image>
		<view class="nav pr">
			<!-- 头部内容 -->
			<view class="con flex ns-justify-content-space-between ns-align-items-flex-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
				<view class="iconfont icon-zuojiantoubeifen go-back flex1" style="font-size:30rpx;color:#FFFFFF" @tap="returnPage"></view>
				<view></view>
				<view></view>
			</view>
			<view class="user-msg-box" style="margin-top: 40rpx;">
				<view class="flex-x-center" style="font-size: 30rpx;font-weight: bold; margin-top:47rpx;">我的上级【{{nickname}}】</view>
				<view class="tutor-pic-box">
					<image v-if="wechat_pic" style="width: 200rpx;height: 200rpx;border-radius: 12rpx;" mode="aspectFill" :src="wechat_pic"></image>
					<view v-else class="fs-28 rel" style="color:#333; line-height:200rpx; text-align:center;">
						<view class="zindex">【暂无二维码】</view>
						<image class="no_img" :src="code_img"></image>
					</view>
				</view>
				<!-- <view class="fs-30 color-000000 ns-text-bold text-center">您的专属导购【{{nickname}}】</view> -->
				<view v-if="wechat_pic" style="width:100%; text-align:center; margin-bottom:30rpx;" @tap="saveImg">
					<view class="saveCode">保存二维码</view>
				</view>
				<view v-else style="width:100%; text-align:center; margin-bottom:30rpx;">
					<view class="saveCode" style="color:#999; background-color:#f4f4f4;">保存二维码</view>
				</view>
				<view class="qq-flex">

					<view class="tutor-pic-box" style="width:94rpx;height:94rpx;border-radius: 50%;align-items: center; margin:0; margin-right:23rpx;">
						<image style="width: 94rpx;height: 94rpx;border-radius: 50%;border: 4rpx solid #FFFFFF;" mode="aspectFill" :src="avatar_url"></image>
					</view>
					<view class="wx-box flex ns-justify-content-space-between align-center align-items: center;">
						<text class="fs-24 color-000000" style="color:#9A9A9A;">微信号：<text class="ns-text-bold">{{wechat_name}}</text></text>
						<text class="fs-24" style="color: #F86228;" @tap="copy" :data-text="wechat_name">复制</text>
					</view>

				</view>

			</view>

		</view>
		<view class="text-center fs-24 color-fff" style="padding:0 0 30rpx 0;line-height:35rpx;width: 521rpx;margin: auto;margin-top:20rpx;">
			<view>
				<rich-text :nodes="warn"></rich-text>
			</view>
		</view>
		<!-- <view class="welfare-box">
		<view class="welfare-list flex align-center">
			<view class="welfare-sort fs-36">选货</view>
			<view class="ml-24">
				<view class="fs-30 ns-text-bold" style="color: #FF8400;">自己找货太麻烦？</view>
				<view class="fs-24 mt-15" style="color: #FF8400;">帮你找货，想要啥呢，专属导购为你服务</view>
			</view>
		</view>
		<view class="welfare-list flex align-center">
			<view class="welfare-sort fs-36">比价</view>
			<view class="ml-24">
				<view class="fs-30 ns-text-bold" style="color: #FF8400;">买贵了真难受呀！</view>
				<view class="fs-24 mt-15" style="color: #FF8400;">帮你比价，货比三家，专属导购为你服务</view>
			</view>
		</view>
		<view class="welfare-list flex align-center">
			<view class="welfare-sort fs-36">盯单</view>
			<view class="ml-24">
				<view class="fs-30 ns-text-bold" style="color: #FF8400;">东西太多忘了验收？</view>
				<view class="fs-24 mt-15" style="color: #FF8400;">帮你跟进订单状态，专属导购为你服务</view>
			</view>
		</view>
	</view> -->
		<!-- <view class="fs-30 color-333333 text-center" style="height:20rpx;"></view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				code_img: ''
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.getSuperiorInfo();
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			returnPage() {
				uni.navigateBack({
					delta: 1,
					fail: res => {
						uni.redirectTo({
							url: '/pages/index/index'
						});
					}
				});
			},

			getSuperiorInfo() {
				this.getApp().request({
					url: this.getApp().api.default.my_superior,
					data: {},
					success: res => {
						if (res.code == 0) {
							this.setData(res.data);
						} else {
							uni.showModal({
								title: res.msg,
								showCancel: false
							});
						}
					}
				});
			},

			copy: function(e) {
				var text = e.currentTarget.dataset.text;
				uni.setClipboardData({
					data: text,

					success(res) {
						uni.getClipboardData({
							success(res) {
								uni.showToast({
									title: '已复制成功，前往微信添加好友',
									icon: 'none'
								});
							}

						});
					}

				});
			},

			saveImg() {
				var self = this;

				if (!uni.saveImageToPhotosAlbum) {
					// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
					uni.showModal({
						title: '提示',
						content: '当前版本过低，无法使用该功能，请升级到最新版本后重试。',
						showCancel: false
					});
					return;
				}
				self.downloadFile({
					url: self.wechat_pic,
					success: function(e) {
						uni.showLoading({
							title: "正在保存图片",
							mask: false
						});
						uni.saveImageToPhotosAlbum({
							filePath: e.tempFilePath,
							success: function() {
								uni.showModal({
									title: '提示',
									content: '二维码保存成功',
									showCancel: false
								});
							},
							fail: function(e) {
								uni.showModal({
									title: '图片保存失败',
									content: e.errMsg,
									showCancel: false
								});
							},
							complete: function(e) {
								uni.hideLoading();
							}
						});
					},
					fail: function(e) {
						uni.showModal({
							title: '图片下载失败',
							content: e.errMsg + ";" + self.wechat_qr_pic,
							showCancel: false
						});
					},
					complete: function(e) {
						uni.hideLoading();
					}
				});
			}

		}
	};
</script>
<style>
	@import "./myTop.css";
</style>
