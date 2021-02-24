<template>
	<view class="main">
		<!-- 分享和海报图相关 -->
		<view :class="'share-modal ' + share_modal_active + ' ' + __device" catchtouchmove="true" @tap="shareModalClose" v-if="sharePic">
			<view :class="'share-modal-body ' + __device" @tap.stop="shop">
				<text class="close pa iconfont icon-guanbi2" @tap="shareModalClose"></text>
				<view class="flex-row">
					<view class="flex-grow-1 flex-x-center">
						<button open-type="share" class="share-bottom" style='height:100%;'>
							<text class="iconfont icon-weixin color-fff" style="font-size: 50rpx;"></text>
							<view>分享给好友</view>
						</button>
					</view>
					<view class="flex-grow-1 flex-x-center">
						<view @tap="getGoodsQrcode" class="share-bottom">
							<text class="iconfont icon-pengyouquan color-fff" style="font-size: 50rpx;"></text>
							<view>生成商品海报</view>
						</view>
					</view>
				</view>
				<!-- <view @tap="shareModalClose" class="share-modal-close flex-y-center flex-x-center">关闭</view> -->
			</view>
		</view>
		<!-- 生成海报 -->
		<view :class="'goods-qrcode-modal flex-y-center ' + goods_qrcode_active " catchtouchmove="true" @tap="goodsQrcodeClose">
			<view class="goods-qrcode-body flex-col" @tap.stop="stop">
				<view class="flex-grow-1" style="position: relative">
					<view style="position: absolute;left: 0;top:0;width: 100%;height: 100%;">
						<view class="goods-qrcode-box">
							<view class="goods-qrcode-loading flex-x-center flex-y-center" v-if="!goods_qrcode">
								<view class="flex-x-center flex-col">
									<image style="width: 150rpx;height: 150rpx" :src="__wxapp_img.system.loading2.url"></image>
									<view style="color: #888">海报生成中</view>
								</view>
							</view>
							<image @tap="goodsQrcodeClick" mode="aspectFit" :class="'goods-qrcode ' + (goods_qrcode?'active':'')" :data-src="goods_qrcode"
							 :src="goods_qrcode"></image>
						</view>
					</view>
				</view>
				<view class="flex-grow-0 flex-col flex-x-center" style="padding-top: 50rpx;">
					<view>
						<button v-if="goods_qrcode" @tap="saveGoodsQrcode" class="share-btn">
							保存图片
						</button>
						<button v-else style="opacity: .4">保存图片</button>
					</view>
				</view>
				<view class="goods-qrcode-close" @tap="goodsQrcodeClose">
					<image :src="__wxapp_img.store.close2.url" style="width: 40rpx;height: 40rpx;display: block"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			showModel: {
				type: String,
				default: ''
			},
			sharePic: {
				type: String,
				default: ''
			}
		},
		methods: {
			getGoodsQrcode: function() {
				var self = this
				self.setData({
					goods_qrcode_active: "active",
					share_modal_active: "",
				});
				var data = {
					goods_id: self.id,
					sidFsShare: 1
				}
				self.getApp().request({
					url: httpUrl,
					data: data,
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								goods_qrcode: res.data.pic_url,
							});
						}
						if (res.code == 1) {
							self.goodsQrcodeClose();
							uni.showModal({
								title: "提示",
								content: res.msg,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
			
									}
								}
							});
						}
					},
				});
			},
			goodsQrcodeClose: function() {
				var self = this
				self.setData({
					goods_qrcode_active: "",
					no_scroll: false,
				});
			},
			
			saveGoodsQrcode: function() {
				var self = this
				if (!uni.saveImageToPhotosAlbum) {
					// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
					uni.showModal({
						title: '提示',
						content: '当前版本过低，无法使用该功能，请升级到最新版本后重试。',
						showCancel: false,
					});
					return;
				}
			
				uni.showLoading({
					title: "正在保存图片",
					mask: false,
				});
			
				this.downloadFile({
					url: self.goods_qrcode,
					success: function(e) {
						uni.showLoading({
							title: "正在保存图片",
							mask: false,
						});
						uni.saveImageToPhotosAlbum({
							filePath: e.tempFilePath,
							success: function() {
								uni.showModal({
									title: '提示',
									content: '商品海报保存成功',
									showCancel: false,
								});
							},
							fail: function(e) {
								uni.showModal({
									title: '图片保存失败',
									content: e.errMsg,
									showCancel: false,
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
							content: e.errMsg + ";" + self.goods_qrcode,
							showCancel: false,
						});
					},
					complete: function(e) {
						uni.hideLoading();
					}
				});
			
			},
		}
	}
</script>

<style scoped>
	/* 分享和海报图 */
	.share-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.0);
		z-index: 10000;
		transform: translateY(100%);
		transition: background 250ms;
	}
	
	.share-modal .share-modal-body {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
		padding-top: 90rpx;
		transform: translateY(100%);
		transition: transform 250ms;
		text-align: center;
	}
	
	.share-modal-body text.close {
		width: 28rpx;
		height: 28rpx;
		right: 34rpx;
		top: 34rpx;
	}
	
	.share-modal-body .shareGet {
		color: #2c2c2c;
		font-weight: 600;
		font-size: 14px;
		margin-bottom: 20rpx;
	}
	
	.share-modal-body .tips {
		color: #D6D6D6;
		font-size: 12px;
		margin-bottom: 90rpx;
	}
	
	.shareGet span {
		color: #c10000;
		margin-left: 10rpx;
	}
	
	.share-modal.active {
		transform: translateY(0);
		background: rgba(0, 0, 0, 0.5);
	}
	
	.share-modal.active .share-modal-body {
		transform: translateY(0);
	}
	
	.share-modal .share-bottom {
		text-align: center;
		font-size: 9pt;
		margin: 0;
		padding: 0;
		margin-bottom: 70rpx;
		line-height: inherit;
		border: none;
		background: none;
		color: inherit;
		font-family: inherit;
		display: inline-block;
	}
	
	.share-modal .share-bottom:after {
		display: none;
	}
	
	.share-modal .share-bottom text {
		display: block;
		width: 100rpx;
		height: 100rpx;
		margin: 0 auto;
		margin-bottom: 30rpx;
		border-radius: 50%;
		line-height: 100rpx;
		text-align: center;
		background: #4CB202;
	}
	
	.share-modal .share-bottom:active image {
		opacity: 0.7;
	}
	
	.share-modal .share-modal-close {
		background: #fff;
		height: 100rpx;
		border-top: 1rpx solid #eee;
	}
	
	/* 商品海报 */
	.goods-qrcode-modal {
		position: fixed;
	  top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10000;
		background: rgba(0, 0, 0, 0.5);
		padding: 0rpx 40rpx;
	  padding-top: 140rpx;
		padding-bottom: 100rpx;
		transform: translateY(100%);
		opacity: 0.5;
		transition: opacity 250ms;
		visibility: hidden;
	}
	
	.goods-qrcode-body {
		height: 1052rpx;
	  width: 608rpx;
	  margin: 0 auto;
		border-radius: 10rpx;
		position: relative;
	}
	
	.goods-qrcode-modal.active {
		transform: translateY(0);
		opacity: 1;
		visibility: visible;
	}
	
	.goods-qrcode-modal .goods-qrcode-box {
		height: 100%;
		position: relative;
		box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.15);
	}
	
	.goods-qrcode-modal .goods-qrcode-loading {
		top: 0;
		left: 0;
		position: absolute;
		width: 100%;
		height: 100%;
	}
	
	.goods-qrcode-modal .goods-qrcode {
		top: 0;
		left: 0;
		position: absolute;
		width: 608rpx;
		height: 924rpx;
		background: #fff;
		display: none;
	}
	
	.goods-qrcode-modal .goods-qrcode.active {
		display: block;
	}
	
	.goods-qrcode-modal .goods-qrcode-close {
		position: absolute;
	  right: 0rpx;
		padding: 15rpx;
	}
</style>
