<template>
	<view>
		<view v-if="showToast" class="downLoadwx" @tap="closeToast" catchtouchmove="preventTouchMove">
			<view class="bg" :hover-stop-propagation="true" @tap.stop="openToast">
				<image :src="showImg"></image>
				<view class="text">请上传微信</view>
				<view class="text">方便顾客联系您</view>
				<view class="btn" @tap.stop="toGo">马上去</view>
			</view>
		</view>
		<!-- <block wx:if="{{show_get_tel}}"> -->
		<block v-if="show_get_tel">
			<view class="new-modal">
				<view class="new-modal-content">
					<view class="new-modal-header" style="padding:30rpx 0;line-height:60rpx;font-size:11pt;border-bottom: 1rpx solid #eee;">上传微信需先绑定手机号</view>
					<view class="new-modal-body" style="min-height:0;margin-bottom:0;">
						<view style="padding:32rpx 0 40rpx 0;text-align: center">
							<image v-if="__platform == 'wx'" src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/login.jpg"
							 style="width: 88rpx;height: 88rpx;"></image>
							<image v-else src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/login.jpg" style="width: 88rpx;height: 88rpx;"></image>
						</view>
						<view style="padding:0 41rpx;">
							<view class="flex-x-center" style="margin-bottom:40rpx;">申请获取您微信绑定的手机号</view>
						</view>
						<view class="flex-x-center">
							<view>
								<button style="background-color:#04be01;width:500rpx;height:80rpx;border-radius:80rpx;color:#fff;margin-bottom:40rpx;"
								 open-type="getPhoneNumber" @getphonenumber="getTel" class="btn new-modal-btn" hover-class="none">确认</button>
							</view>
						</view>
						<view class="flex-x-center">
							<view>
								<button style="border:1px solid #ccc;width:500rpx;height:80rpx;line-height:80rpx;border-radius:80rpx;color:#ccc;margin-bottom:40rpx;"
								 @tap="closeTel" class="btn new-modal-btn">取消</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'downLoadwx',
		data() {
			return {
				showToast: false,
				show_get_tel: false,
				showImg: '',
				is_show_get_tel: false,
			}
		},
		methods: {
			getTel: function(e) {
				var self = this;

				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '未授权',
					})
				} else {
					uni.showLoading({
						title: '授权中',
					});
					var ivObj = e.detail.iv
					var telObj = e.detail.encryptedData
					var codeObj = "";
					var that = this;
					//console.log(e.detail)
					//执行Login
					wx.login({
						success: res => {
							//用code传给服务器调换session_key
							// wx.getUserInfo({
							// 	success: (res) => {
							// 		console.log(res)
							// 		wx.request({
							// 			url: getApp().api.default.get_Tel,
							// 			data: {
							// 				code: data.code,
							// 				encryptedData: res.encryptedData,
							// 				iv: res.iv,
							// 			},
							// 			success: function(res) {
							// 				console.log(res)
							// 			},
							// 			fail: function(res) {
							// 				console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
							// 			}
							// 		})

							// 		return
							// 	},
							// })

							self.getApp().request({
								url: self.getApp().api.default.get_Tel, //接口请求地址
								method: 'POST',
								data: {
									// appid: " ", //小程序appid，登录微信后台查看
									// secret: " ", //小程序secret，登录微信后台可查看
									code: res.code,
									encrypted_data: telObj,
									iv: ivObj
								},
								//成功返回数据
								success: function(res) {
									if (res.code == 0) {
										uni.showModal({
											title: res.msg,
											showCancel: false,
											success: (res) => {
												self.setData({
													show_get_tel: false,
													showToast: false
												});
												wx.navigateToMiniProgram({
													appId: 'wxfd13fd712d32b3cb',
													path: '/pages/bangdingWeChat/bangdingWeChat',
													extraData: { // 传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
														mch_id: uni.getStorageSync('_mchInfo').id,
														token: uni.getStorageSync(self.getApp().const.ACCESS_TOKEN)
													},
													envVersion: 'trial', // 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效
													success(res) {
														// 打开成功

													},
													fail: function(res) {

													}
												})
											}
										})
									} else {
										uni.showModal({
											title: res.msg,
											showCancel: false,
										})
									}

								}
							})
						},
						complete: function(res) {
							uni.hideLoading();
						}
					})
				}
			},
			closeToast: function() {
				var self = this
				self.setData({
					showToast: false
				})
			},
			closeTel: function() {
				var self = this
				self.setData({
					show_get_tel: false
				})
			},
			toGo: function() {
				var self = this
				if (self.is_show_get_tel) {
					self.setData({
						show_get_tel: true
					});
				} else {
					self.setData({
						showToast: false
					});
					wx.navigateToMiniProgram({
						appId: 'wxfd13fd712d32b3cb',
						path: '/pages/bangdingWeChat/bangdingWeChat',
						extraData: { // 传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
							mch_id: uni.getStorageSync('_mchInfo').id,
							token: uni.getStorageSync(self.getApp().const.ACCESS_TOKEN)
						},
						envVersion: 'trial', // 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效
						success(res) {
							// 打开成功

						},
						fail: function(res) {

						}
					})
				}

			},
			openToast: function() {
				// var self = this.currentPage
				// self.setData({
				//   showToast: true
				// })
			}

		},
		created() {
			this.getApp().request({
				url: this.getApp().api.default.upload_info,
				data: {},
				success: (res) => {
					// console.log('00000000', res)
					if (res.code == 0) {
						if (res.wechat_qr_pic == 1) {
							this.setData({
								showToast: true
							});
						}
						if (res.check_mch_tel == 1) {
							this.setData({
								is_show_get_tel: true
							});
						}
					}
				}
			})
		}
	}
</script>

<style>
	.downLoadwx {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9999;
		color: #333;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.downLoadwx .bg {
		width: 400rpx;
		height: 450rpx;
		background: #FFFFFF;
		border-radius: 40rpx;

	}

	.downLoadwx .bg image {
		display: block;
		width: 180rpx;
		height: 165rpx;
		margin: -35rpx auto 35rpx auto;
	}

	.downLoadwx .bg .text {
		color: #333;
		font-size: 32rpx;
		text-align: center;
		line-height: 50rpx;
	}

	.downLoadwx .bg .btn {
		text-align: center;
		width: 240rpx;
		height: 88rpx;
		background: #FF5028;
		box-shadow: 0rpx 20rpx 30rpx 0rpx rgba(255, 79, 39, 0.2);
		border-radius: 44rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		line-height: 88rpx;
		margin: 40rpx auto 0 auto;
	}
</style>
