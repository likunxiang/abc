<template>
	<!--pages/complaintAndAdvice/complaintAndAdvice.wxml-->
	<view class="complaint-advice pr">
		<view class="ptb-27 px-41 bg-F7F7F7 flex ns-align-items-flex-center ns-justify-content-space-between">
			<view class="info">
				<view>
					小亲，你好
				</view>
				<view>
					感谢你对我们的支持和理解，当你在使用亲铺的过程中，如果遇到包括商品、客服、运营、或者是软件异常，都可以给我们反馈哦；对同类问题前三位反馈的小亲，有奖励哦～
				</view>
			</view>
			<!--<view class="flex ns-align-items-flex-center">
			<view class="black-box"></view>
			<view class="color-2C2C2C fs-30 ml-20 ns-text-bold">描述你的投诉或建议</view>
		</view> -->
		</view>
		<view class="text-box bg-white">
			<view class="textarea-box">
				<textarea @input="watchTextarea" cols="30" rows="10" maxlength="200" :value="shopName" placeholder="点击填写你遇到的问题"
				 class="bg-white fs-30 "></textarea>
				<view class="flex ns-justify-content-end color-8D8D8D fs-30">{{valueLength}}/200</view>
			</view>

		</view>
		<view class="pic-box">
			<view class="mb-20 fs-28 color-2C2C2C" style="line-height: 40rpx;">您也可以提供问题相关图片，帮助我们理解问题所在：</view>
			<view class="flex">
				<view class="flex ns-wrap">
					<view v-for="(item, index) in imageList" :key="index" class="flex flex-gorw-0 pr">
						<image style="width: 200rpx;height: 200rpx;margin-right: 20rpx;margin-bottom: 20rpx;" mode="aspectFill" :src="item">
						</image>
						<view style="position: absolute;top: 0;right: 20rpx;background: rgba(0,0,0,.3);border-radius: 50%;" class="iconfont icon-delete fs-30 color-fff"
						 @tap="delImage" :data-index="index"></view>
					</view>
					<view v-if="isKeepImage" style="width: 200rpx;height: 200rpx;margin-bottom: 20rpx;text-align: center;line-height: 200rpx;background: #EFEEF1;"
					 @tap="changeImage">
						<text class="iconfont icon-zengjia color-fff" style="font-size: 60rpx;"></text>
					</view>
					<!-- <image style="width: 45rpx;height: 45rpx;position: absolute;top: 0;right: 0;" mode="aspectFill" src="image/icon-del.png"></image> -->
				</view>
			</view>
		</view>
		<!-- 
  <view class="ptb-24 px-24 bg-F7F7F7 flex ns-align-items-flex-center ns-justify-content-space-between">
		<view class="flex ns-align-items-flex-center">
			<view class="black-box"></view>
			<view class="color-2C2C2C fs-30 ml-20 ns-text-bold">或者联系投诉专员</view>
		</view>
	</view>
	<view class="complaint flex ns-justify-content-space-between ns-align-content-center">
		<view class="flex ns-align-content-center">
			<view class="fs-28 color-595959 ns-text-bold">投诉专员微信</view>
			<view class="ml-24 fs-28 color-595959">{{complaintWX}}</view>
		</view>
		<view class="copy-btn" data-text="{{complaintWX}}" bindtap="copyText">复制微信号去添加</view>
	</view>
  -->

		<view class="btn-box">
			<view class="tip">
				<view>感谢您的反馈</view>
				<view>我们会在第一时间为您解决疑难</view>
			</view>
			<button class="save-btn" @tap="saveBtnThrottle">提交</button>
		</view>
	</view>
</template>

<script>
	// pages/complaintAndAdvice/complaintAndAdvice.js
	import util from "../../utils/util";

	export default {
		data() {
			return {
				value: '',
				valueLength: 0,
				isKeepImage: true,
				imageList: [],
				complaintWX: 'qinpu2019',
				shopName: ""
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {},

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
			// 监视value长度
			watchTextarea: function(event) {
				var self = this;
				this.setData({
					shopName: event.detail.value,
					valueLength: event.detail.cursor
				});
			},
			// 选择图片
			changeImage: function() {
				var self = this;
				uni.chooseImage({
					count: 9,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: function(res) {
						var tempFilePaths = res.tempFilePaths;
						var arr = self.imageList.concat(tempFilePaths);
						self.setData({
							imageList: arr
						});

						if (arr.length >= 9) {
							self.setData({
								isKeepImage: false
							});
						}
					}
				});
			},
			// 删除图片
			delImage: function(e) {
				var self = this;
				var index = e.currentTarget.dataset.index;
				var imageList = self.imageList;
				var arr = imageList.splice(index, 1);

				if (imageList.length < 9) {
					self.setData({
						isKeepImage: true
					});
				}

				self.setData({
					imageList: imageList
				});
			},
			saveBtnThrottle: util.throttle(function() {
				this.saveBtn();
			}, 1000),
			saveBtn: function() {
				var self = this;
				var value = self.shopName;
				var arr = self.imageList;

				if (arr.length > 0 || value.length < 0) {
					for (let i = 0; i < arr.length; i++) {
						uni.uploadFile({
							url: self.getApp().api.user.user_suggest,
							filePath: arr[i],
							name: value,
							header: {
								'access-token': uni.getStorageSync('ACCESS_TOKEN'), 
							},
							formData: {
								content: value
							},

							success(res) {
								uni.showModal({
									title: "提示",
									content: '提交成功',
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											uni.navigateBack();
										}
									}
								});
							}

						});
					}

					return;
				}

				if (value.length > 0) {
					this.suggest();
				}
			},
			// 复制微信号
			copyText: function(e) {
				uni.setClipboardData({
					data: e.currentTarget.dataset.text,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '复制成功',
									icon: 'none'
								});
							}
						});
					}
				});
			},
			// 上传投诉建议 网络接口
			suggest: function() {
				var self = this;
				self.getApp().request({
					url: self.getApp().api.user.user_suggest,
					method: 'POST',
					data: {
						content: self.shopName
					},
					success: function(res) {
						if (res.code == 0) {
							uni.showModal({
								title: "提示",
								content: '提交成功',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.navigateBack();
									}
								}
							});
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}
				});
			}
		}
	};
</script>
<style>
	/* pages/complaintAndAdvice/complaintAndAdvice.wxss */
	page {
		background: #fff;
		height: 100%;
	}

	.complaint-advice {
		min-height: 100%;
		padding-bottom: 230rpx;
	}

	.complaint-advice .info {
		width: 684rpx;

		font-size: 28rpx;
		line-height: 40rpx;
		margin-left: 41rpx;
		margin-top: 27rpx;
		margin-bottom: 27rpx;
	}

	.bg-F7F7F7 {
		background: #F7F7F7;
	}

	.black-box {
		width: 13rpx;
		height: 37rpx;
		background: rgba(44, 44, 44, 1);
	}

	.text-box {
		padding-left: 41rpx;

	}

	.textarea-box {
		padding: 20rpx 25rpx 20rpx 0rpx;
		border-bottom: 1rpx solid #D6D6D6;
	}

	textarea {
		height: 240rpx;
		width: 100%;
	}

	.pic-box {
		padding: 30rpx 41rpx 0;
	}

	.complaint {
		padding: 43rpx 41rpx 0 57rpx;
	}

	.copy-btn {
		width: 200rpx;
		padding: 5rpx 0;
		border: 1rpx solid #97512D;
		border-radius: 30rpx;
		font-size: 20rpx;
		color: #97512D;
		text-align: center;
	}

	.tip {
		width: 336rpx;
		height: 66rpx;
		margin: 130rpx auto 20rpx;
		text-align: center;
		font-size: 24rpx;
		color: #B0B0B0;
		line-height: 33rpx;
	}

	.btn-box {
		position: absolute;
		bottom: 0rpx;
		left: 220rpx;
		padding: 51rpx 0;
	}

	.save-btn {

		font-size: 30rpx;
		background: #1A4C4B;
		color: #fff;
		width: 308rpx;

		height: 78rpx;
	}

	button {
		border-radius: 0rpx !important;
	}
</style>
