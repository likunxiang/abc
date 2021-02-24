<template>
	<view class="page">
		<custom mode="2" background="#E1122C" fixed="fixed" title="开店攻略" titleColor="#FFFFFF">
		</custom>
		<view class="plr-24">
			<view class="main">
				<view class="main-main pr">
					<view class="open-title">
						<image class="open-title-img" :src="bg_btn_opening" mode="aspectFill"></image>
						<view>开店指引</view>
					</view>
					<view class="text-E1122C">{{open_mch_text.one}}</view>
					<view class="text-E1122C" style="margin-top: 47rpx;">{{open_mch_text.two}}</view>
					<view class="show-wx flex">
						<image class="mch-pic" :src="avatar_url" mode="aspectFill"></image>
						<view class="wx-box flex justify-between align-center">
							<view class="fs-24 color-000000">
								<text>微信号：</text>
								<text>{{wechat_name}}</text>
							</view>
							<view class="fs-24" style="color: #FF2B49;" @tap="copyText" :data-text="wechat_name">复制</view>
						</view>
					</view>
					<view class="text-E1122C" style="margin-top: 47rpx;">{{open_mch_text.three}}</view>
					<!-- 二维码 -->
					<view class="qrcode-content">
						<view class="text-E1122C fs-30 text-center">{{nickname}}</view>
						<view class="tutor-pic-box">
							<image v-if="wechat_qr_pic" style="width: 200rpx;height: 200rpx;border-radius: 12rpx;" mode="aspectFill" :src="wechat_qr_pic"></image>
							<view v-else class="fs-28 rel" style="color:#333; line-height:200rpx; text-align:center;">
								<view class="zindex">【暂无二维码】</view>
								<image class="no_img" :src="code_img"></image>
							</view>
						</view>
						<view v-if="wechat_qr_pic" style="width:100%; text-align:center;" @tap="saveImg">
							<view class="saveCode">保存图片</view>
						</view>
						<view v-else style="width:100%; text-align:center;">
							<view class="saveCode" style="color:#999; background:#f4f4f4;">保存图片</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<navigator open-type="navigateBack" class="footer">我知道了</navigator>
	</view>
</template>

<script>
	import custom from '@/components/custom/custom.vue'
	export default {
		data() {
			return {
				open_mch_text: {},
				bg_btn_opening: uni.getStorageSync('_img').bg_btn_opening
			}
		},
		components: {
			custom
		},
		onLoad() {
			this.getSuperiorInfo()
			this.getText()
		},
		methods: {
			getSuperiorInfo() {
				this.getApp().request({
					url: this.getApp().api.default.get_superior_info,
					data: {
						userId: this.getApp().core.getStorageSync('USER_INFO').id,
						coupon_sub_id: this.mchID || ''
					},
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
			getText() {
				this.getApp().request({
					url: this.getApp().api.user.mch_desc_text,
					data: {
					},
					success: res => {
						if (res.code == 0) {
							this.open_mch_text = res.data.open_mch
						} else {
							uni.showModal({
								title: res.msg,
								showCancel: false
							});
						}
					}
				});
			},
			copyText: function(e) {
				var text = e.currentTarget.dataset.text;
				uni.setClipboardData({
					data: text,

					success(res) {
						uni.getClipboardData({
							success(res) {}

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
					url: self.wechat_qr_pic,
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
	}
</script>

<style>
	.page {
		min-height: 100%;
		background: #E1122C;
	}

	.main {
		width: 100%;
		padding: 12rpx 10rpx 28rpx 10rpx;
		background: #FEE1B2;
		border-radius: 30rpx;
		margin-top: 47rpx;
	}

	.main-main {
		width: 681rpx;
		background: #FFFFFF;
		border-radius: 30px;
		padding: 105rpx 32rpx 37rpx;
		box-shadow: 0rpx 0rpx 20rpx 10rpx #FEE1B2 inset;
	}

	.open-title {
		position: absolute;
		top: -60rpx;
		left: 50%;
		margin-left: -254rpx;
		width: 508rpx;
		height: 124rpx;
		font-size: 48rpx;
		color: #fff;
		font-weight: bold;
		text-align: center;
		line-height: 110rpx;
		z-index: 1;
	}

	.open-title-img {
		position: absolute;
		top: 0rpx;
		left: 0rpx;
		width: 508rpx;
		height: 124rpx;
		z-index: -1;
	}

	.text-E1122C {
		color: #E1122C;
		font-size: 24rpx;
		font-weight: bold;
	}

	.show-wx {
		margin-top: 30rpx;
	}

	.mch-pic {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}

	.wx-box {
		margin-left: 16rpx;
		padding: 0 20rpx 0 31rpx;
		width: 577rpx;
		height: 60rpx;
		background: #FEDFB2;
		border-radius: 30rpx;
	}

	.qrcode-content {
		width: 302rpx;
		border: 2rpx solid #FEE1B2;
		border-radius: 30rpx;
		margin: 40rpx auto 0;
		padding-top: 31rpx;
		padding-bottom: 37rpx;
	}

	.tutor-pic-box {
		width: 200rpx;
		height: 200rpx;
		background: #fff;
		border-radius: 12rpx;
		margin: 11rpx auto 0;
	}

	.saveCode {
		display: inline-block;
		width: 222rpx;
		height: 70rpx;

		background: linear-gradient(-90deg, #FE0106, #FF4459);
		border-radius: 35rpx;
		line-height: 70rpx;
		color: #fff;
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
		margin: 16rpx auto 0;

	}

	.qq-flex {
		display: flex;
		align-items: center;
		padding: 0 25rpx 0 25rpx
	}

	.rel {
		position: relative;

	}

	.no_img {
		position: absolute;
		top: 0;
		left: 0;
		width: 200rpx;
		height: 200rpx;
		border-radius: 12rpx;
		opacity: 0.1;

	}

	.zindex {
		position: relative;
		z-index: 4;

	}
	.footer {
		position: absolute;
		bottom: 33rpx;
		left: 24rpx;
		width: 702rpx;
		height: 90rpx;
		line-height: 90rpx;
		color: #fff;
		font-size: 30rpx;
		text-align: center;
		background: #F95433;
		border-radius: 45rpx;
	}
</style>
