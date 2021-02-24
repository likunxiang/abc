<template>
	<!--pages/setting/setting.wxml-->
	<view class="page pr">
		<common></common>
		<view class="body-box">
			<view class="setting-list flex ns-justify-content-space-between ns-align-items-flex-center border-bottom">
				<view class="fs-30 color-2C2C2C ns-text-bold">我的店铺码</view>
				<view class="flex align-center color-8D8D8D" @click="shareShop">
					<view class="fs-30">点击下载</view>
					<view class="iconfont icon-jinru fs-40 ml-20"></view>
				</view>
			</view>
			<view class="setting-list flex ns-justify-content-space-between ns-align-items-flex-center border-bottom" style="padding-right: 34rpx;">
				<view class="fs-30 color-2C2C2C ns-text-bold">逛店记录</view>
				<view class="flex align-center">
					<view class="flex align-center" @click="changeGuang">
						<view :class="'iconfont fs-40 color-2C2C2C mr-20 ' + (guangSwitch?'icon-selected-copy':'icon-weixuanzhong') "></view>
						<view>打开</view>
					</view>
					<view class="flex align-center" style="margin-left: 50rpx;" @click="changeGuang">
						<view :class="'iconfont fs-40 color-2C2C2C mr-20 ' + (guangSwitch?'icon-weixuanzhong':'icon-selected-copy') "></view>
						<view>关闭</view>
					</view>
				</view>
			</view>
			<navigator :url="'/pages/article-detail/article-detail?id=' + lxwm_id" class="setting-list flex ns-justify-content-space-between ns-align-items-flex-center border-bottom">
				<view class="fs-30 color-2C2C2C ns-text-bold">联系我们</view>
				<view class="iconfont icon-jinru fs-40 ml-20 color-8D8D8D"></view>
			</navigator>
			<navigator :url="'/pages/article-detail/article-detail?id=' + gyqp_id" class="setting-list flex ns-justify-content-space-between ns-align-items-flex-center border-bottom">
				<view class="fs-30 color-2C2C2C ns-text-bold">关于亲铺</view>
				<view class="iconfont icon-jinru fs-40 ml-20 color-8D8D8D"></view>
			</navigator>
			<navigator url="/tool/complaintAndAdvice/complaintAndAdvice" class="setting-list flex ns-justify-content-space-between ns-align-items-flex-center">
				<view class="fs-30 color-2C2C2C ns-text-bold">有奖反馈</view>
				<view class="iconfont icon-jinru fs-40 ml-20 color-8D8D8D"></view>
			</navigator>
		</view>

		<!-- 生成店铺码 -->
		<view class="flex-y-center" :style="'width:' + x + 'px;height:' + y + 'px;position: fixed;top: 0;background: rgba(0, 0, 0, 0.4);z-index: 999;'"
		 v-if="shopShow" @tap="closeShop" catchtouchmove="true">
			<view class="shareShop">
				<view>
					<view class="shopHead">
						<image :src="user_info.avatar_url" class="shopHeadImg"></image>
						<view class="font_blod">{{ user_info.nickname }}</view>
						<view class="tips">邀请您来这里逛逛呀～</view>
					</view>
					<!-- 小程序码 -->
					<view class="shopCode" style="height:370rpx">
						<image class="appcode-img" :src="codeImg.qrcode_pic"></image>
					</view>
				</view>
				<view class="flex shopBottom flex-x-center">
					<view class="flex1" style="color: #c11111" @tap.stop="downImg">保存图片</view>
					<view class="flex1" style="color: #333" @tap.stop="closeShop">关闭</view>
				</view>
			</view>
		</view>

		<view class="logout fs-30" @tap="logout" v-if="user_info.name != ''">注销登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				x: uni.getSystemInfoSync().windowWidth,
				y: uni.getSystemInfoSync().windowHeight,
				userId: uni.getStorageSync('USER_INFO').id,
				guangSwitch: false,
				switchList: [{
						id: 0,
						value: '打开',
						checked: true
					},
					{
						id: 1,
						value: '关闭',
						checked: false
					}
				],
				shopShow: false,
				user_info: {},
				lxwm_id: '',
				gyqp_id: ''
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.loadGuang();
			this.user_info = uni.getStorageSync('USER_INFO')
		},


		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			logout: function() {
				let jianrong = uni.getStorageSync('jianrong', '');
				uni.showModal({
					title: '提示',
					content: '是否注销登录',
					success: function(res) {
						if (res.confirm) {
							uni.clearStorage();

							uni.redirectTo({
								url: '/pages/user/user',
								success: () => {
									uni.setStorageSync('jianrong', jianrong)
								}
							});
						}
					}
				});
			},
			shareShop: function() {
				var self = this; // 生成小程序码

				this.getApp().request({
					url: this.getApp().api.maijia.shop_qrcode,
					data: {
						page: 'pages/index/index'
					},
					success: res => {
						self.setData({
							shopShow: true,
							codeImg: res.data
						});
					},
					fail: function(err) {
						if (err.msg) {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 3000
							});
						}
					}
				});
			},
			closeShop: function() {
				this.setData({
					shopShow: false
				});
			},
			//下载图片
			downImg: function() {
				var downUrl = this.codeImg.qrcode_pic;
				let self = this;

				if (!downUrl) {
					// 生成小程序码
					this.getApp().request({
						url: this.getApp().api.maijia.shop_qrcode,
						data: {
							page: 'pages/index/index'
						},
						success: res => {
							if (res.data.qrcode_pic) {
								downUrl = res.data.qrcode_pic;
							}
						},
						fail: function(err) {
							if (err.msg) {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 3000
								});
							}
						}
					});
				}

				this.downloadFile({
					url: downUrl,
					//需要下载的图片url
					success: function(res) {
						//成功后的回调函数
						uni.saveImageToPhotosAlbum({
							//保存到本地
							filePath: res.tempFilePath,

							success(res) {
								uni.showToast({
									title: '保存成功',
									icon: 'success',
									duration: 2000
								});
							},

							fail: function(err) {
								if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
									uni.openSetting({
										success(settingdata) {
											if (settingdata.authSetting['scope.writePhotosAlbum']) {
												self.loadData();
											} else {
												console.log('获取权限失败，给出不给权限就无法正常使用的提示');
											}
										}
									});
								}
							}
						});
					}
				});
			},
			changeGuang: function(e) {
				this.guangSwitch = !this.guangSwitch
				this.editGuang();
			},
			loadGuang: function() {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.mch.user.get_user_privacy,
					data: {
						userId: uni.getStorageSync('USER_INFO').id
					},
					success: function(res) {
						if (res.code == 0) {
							if (res.data.guangdian == 0) {
								self.setData({
									guangSwitch: false
								});
							} else {
								self.setData({
									guangSwitch: true
								});
							}
							self.lxwm_id = res.data.lxwm
							self.gyqp_id = res.data.gyqp
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}
				});
			},
			editGuang: function() {
				var self = this;
				var flag = self.guangSwitch;

				if (flag) {
					flag = 1;
				} else {
					flag = 0;
				}

				this.getApp().request({
					url: this.getApp().api.mch.user.user_privacy,
					data: {
						userId: uni.getStorageSync('USER_INFO').id,
						flag: flag
					},
					success: function(res) {}
				});
			}
		}
	};
</script>
<style>
	/* pages/setting/setting.wxss */
	.page {
		min-height: 100%;
		padding-top: 10rpx;
	}

	.body-box {
		background: #fff;
		padding-left: 41rpx;
	}

	.setting-list {
		padding: 28rpx 19rpx 31rpx 16rpx;
	}

	.border-bottom {
		border-bottom: 1rpx solid rgba(214, 214, 214, 0.5);
	}

	.logout {
		position: fixed;
		bottom: 48rpx;
		left: 50%;
		margin-left: -168rpx;
		width: 336rpx;
		background: #fff;
		height: 78rpx;
		line-height: 78rpx;
		text-align: center;
		border-radius: 39rpx;
		color: #333333;
	}

	.shareShop {
		width: 508rpx;
		height: 616rpx;
		background: #fff;
		margin: 0 auto;
		border-radius: 13rpx 13rpx 0 0;
		transform: translateY(-100rpx);
	}

	.shopHead {
		height: 246rpx;
		background: #1a4c4b;
		padding: 20rpx 0;
		color: #fff;
		text-align: center;
		font-size: 12px;
		border-radius: 13rpx 13rpx 0 0;
	}

	.shopHead image {
		width: 111rpx;
		height: 111rpx;
		border: 10rpx solid #f5f5f5;
		border-radius: 50%;
		display: block;
		margin: 0 auto;
	}

	.shopHead .font_blod {
		font-weight: 600;
		margin-top: 20rpx;
	}

	.shopBottom {
		text-align: center;
		font-size: 14px;
		color: #595959;
		letter-spacing: 0;
		height: 76rpx;
		background: #fff;
		border-radius: 0 0 13rpx 13rpx;
		position: relative;
		overflow: hidden;
	}
</style>
