<template>
	<!--pages/vipFirst/vipFirst.wxml http://122.51.7.57/aaa.png -->
	<view class="pr">
		<common></common>
		<view :style="'height:' + customBar + 'px'">
			<view class="con flex align-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
				<view class="backBtn" @tap="goBack">
					<text class="iconfont icon-zuojiantoubeifen"></text>
				</view>
				<block v-if="type == 1">
					<view style="background: #E7CA9D;border: 2rpx solid #FFFFFF;width: 72rpx;height: 72rpx;border-radius: 50%;">
						<image src="" mode="aspectFit" style="width: 72rpx;height: 72rpx;border-radius: 50%;"></image>
					</view>
					<view class="fs-28" style="color: #FEFEFE;">超人，邀请您开通会员</view>
				</block>
				<block v-else>
					<view></view>
					<view></view>
				</block>
				
			</view>
		</view>
		<view class="page bg_img_s" :style="'background-image: url(' + bg + ');'">
			<!-- <block wx:if="{{type==1}}">
			<view class="get-btn" bindtap="buyVipOrderThrottle">立即购买</view>
		</block>
		<block wx:elif="{{type==2}}">
			<button class="get-btn" open-type="share">立即分享</button>
		</block>
		<block wx:else>
			<view
			 class="fs-24 color-fff text-center"
			 bindtap="buyVipOrderThrottle"
			 style="text-decoration: underline;color: #F4DAA9;position: absolute;left: 24rpx;bottom: 136rpx;width: 702rpx;height: 88rpx;"
			>支付9.9元，成为永久会员
			</view>
			<view class="get-btn" bindtap="showModal">分享赚亲卡</view>
		</block> -->
			<!-- 领取会员卡遮罩 -->
			<view class="get-card-modal flex-x-center flex-y-center ns-column" v-if="is_show_model && card_bg">
				<view class="get-card-modal-main pr bg_img_s" :style="'background-image: url(' + card_bg + ')'">
					<view class="color-fff flex-x-center" style="font-size: 45rpx;">活动规则</view>
					<view class="time-top-text fs-24 color-fff" style="margin-top: 75rpx;">
						<view>点击开始分享，参与「分享赚亲卡」分享越多，赚取亲卡天数越多，最多不超过21天</view>
						<view style="margin-top: 50rpx;">活动期仅限3天，加油分享吧～</view>
					</view>
					<button class="get-card-modal-btn" open-type="share">立即分享</button>
				</view>
				<view class="iconfont icon-guanbi color-999999" style="font-size: 60rpx;margin-top: 70rpx;" @tap="closeModal"></view>
			</view>
			<!-- 两个按钮 -->
			<view class="qq-btn flex flex-y-center fs-30 justify-between">
				<view class="fs-30 color-fff btn-text">
					<text>永久会员：限时</text>
					<text class="fs-50 ml-8 mr-8">9.9</text>
					<text>元</text>
				</view>
				<button class="btn fs-30 ns-text-bold" @tap="buyVipOrderThrottle">立即支付</button>
			</view>
		</view>
		<view style="background: #007AFF;height: 98rpx;"></view>

	</view>
</template>

<script>
	// pages/vipFirst/vipFirst.js
	import utils from "../../utils/util";

	export default {
		data() {
			return {
				is_show_model: false,
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				type: "",
				bg: "",
				shareImg: "",
				parent_id: "",
				store_id: "",
				store_group_id: "",
				sid: "",
				card_bg: "",
				windowHeight: 0
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.getApp().page.onLoad(this, options);
			this.getWindowHeight();
			if (options.type) {
				this.setData({
					type: options.type
				});
			}

			this.getBg();

			if (this.type == 2) {
				this.getShareData();
				this.getShareImg();
			}
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
		onPullDownRefresh: function() {

		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {
			var mch_id = uni.getStorageSync('_mchInfo').id;
			var user_id = this.getApp().core.getStorageSync('USER_INFO').id;
			var nickname = this.getApp().core.getStorageSync('USER_INFO').nickname;
			var title = nickname + '邀请您来开通会员~';
			var img = this.getApp().core.getStorageSync('_img').open_member;
			this.shareVip();
			return {
				title: title,
				path: '/member/vipFirst/vipFirst?sid=' + this.sid + '&type=1' + '&mch_id=' + mch_id + '&user_id=' + user_id,
				imageUrl: img
			};
		},
		methods: {
			getBg() {
				this.getApp().request({
					url: this.getApp().api.default.vip_share_img,
					success: res => {
						if (res.code == 0) {
							this.setData({
								bg: res.data.shareCart
							});
						}
					}
				});
			},

			getShareImg() {
				this.getApp().request({
					url: this.getApp().api.default.vip_share_img,
					success: res => {
						if (res.code == 0) {
							this.setData({
								shareImg: res.data.vipImg
							});
						}
					}
				});
			},

			getWindowHeight() {
				const that = this
				uni.getSystemInfo({
					success(res) {
						that.windowHeight = res.screenHeight
					}
				});
			},


			getShareData() {
				this.getApp().request({
					url: this.getApp().api.default.share_data,
					data: {
						userId: this.getApp().core.getStorageSync('USER_INFO').id
					},
					success: res => {
						if (res.code == 0) {
							this.setData({
								parent_id: res.data.parent_id,
								store_id: res.data.store_id,
								store_group_id: res.data.store_group_id,
								sid: res.data.id
							});
							uni.showModal({
								title: this.id,
								showCancel: false
							});
						}
					}
				});
			},

			shareVip() {
				this.getApp().request({
					url: this.getApp().api.default.share_vip,
					data: {
						userId: this.getApp().core.getStorageSync('USER_INFO').id
					},
					success: res => {}
				});
			},

			buyVipOrderThrottle: utils.throttle(function() {
				var token = this.getApp().core.getStorageSync('ACCESS_TOKEN');

				if (!token) {
					this.setData({
						showGetLogin: true,
						user_info_show: true
					});
					this.$store.commit('vuexSet', {
						name: 'show_loginTpl',
						value: true
					})
					return;
				}
				this.buyVipOrder();
			}, 1000),

			// 生成购买会员订单 
			buyVipOrder() {
				var type = this.type;
				this.getApp().request({
					url: this.getApp().api.default.vip_buy_order,
					data: {
						userId: this.getApp().core.getStorageSync('USER_INFO').id,
						type: 1,
						// 1购买会员，2成为小亲
						bind: type == 3 ? '1' : '',
						parent_id: this.parent_id || this.getApp().core.getStorageSync('parent_id') || this.getApp().core.getStorageSync(
							'u_id') || ''
					},
					success: res => {
						if (res.code == 0) {
							var order_id = res.data.id;
							this.getApp().request({
								url: this.getApp().api.default.vip_pay_data,
								data: {
									id: order_id,
									pay_type: 1
								},
								success: res => {
									if (res.code == 0) {
										uni.requestPayment({
											timeStamp: res.data.timeStamp,
											nonceStr: res.data.nonceStr,
											package: res.data.package,
											signType: res.data.signType,
											paySign: res.data.paySign,

											success(res) {},

											fail(res) {},

											complete: e => {
												if (e.errMsg == "requestPayment:fail" || e.errMsg == "requestPayment:fail cancel") {
													//支付失败转到待支付订单列表
													this.getApp().core.showModal({
														title: "提示",
														content: "订单尚未支付",
														showCancel: false,
														confirmText: "确认",
														success: function(res) {}
													});
													return;
												}

												if (e.errMsg == "requestPayment:ok") {
													this.getApp().core.showModal({
														title: "提示",
														content: "成功开通会员",
														showCancel: false,
														confirmText: "确认",
														success: function(res) {
															if (res.confirm) {
																uni.redirectTo({
																	url: '/member/homePage/homePage'
																});
															}
														}
													});
												}
											}
										});
									} else {
										uni.showToast({
											title: res.msg,
											icon: 'none'
										});
									}
								}
							});
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					}
				});
			},

			// 支付
			goBack() {
				uni.navigateBack({
					delta: 1,
					fail: res => {
						uni.redirectTo({
							url: '/pages/index/index'
						});
					}
				});
			},

			showModal() {
				this.setData({
					is_show_model: true,
					card_bg: this.getApp().core.getStorageSync('_img').b1
				});
				this.getShareImg();
			},

			closeModal() {
				this.setData({
					is_show_model: false
				});
			}

		}
	};
</script>
<style>
	/* pages/vipFirst/vipFirst.wxss */

	.page {
		height: 1970rpx;
		width: 100%;
	}

	.get-card-modal {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, .7);
		z-index: 10000;
	}

	.get-card-modal-main {
		width: 471rpx;
		height: 550rpx;
		padding: 48rpx;
		background: #0081FF;
	}

	.vip-img {
		width: 132rpx;
		height: 132rpx;
		border: 4rpx solid #B86A24;
		background-color: #CCCCCC;
		border-radius: 50%;
	}

	.get-card-modal-text {
		font-size: 38rpx;
		color: #B86A24;
		margin-top: 48rpx;
	}

	.get-card-modal-btn {
		position: absolute;
		bottom: 47rpx;
		left: 50%;
		margin-left: -145rpx;
		width: 289rpx;
		height: 68rpx;
		background: linear-gradient(90deg, rgba(219, 197, 161, 1), rgba(211, 179, 128, 1));
		border-radius: 34rpx;
		text-align: center;
		line-height: 68rpx;
		font-size: 27rpx;
		color: #222222;
	}

	.con {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		top: 0;
		left: 0;
		display: flex;
		padding: 0 24rpx;
		background: radial-gradient(circle, #FF002C 0%, #F21431 100%);;
	}

	.title {
		position: absolute;
		width: 100%;
		left: 0rpx;
		bottom: 0rpx;
		background: #fff;
		border-radius: 30rpx 30rpx 0 0;
		padding: 23rpx 0 19rpx;

	}

	.backBtn {
		font-size: 36rpx;
		display: flex;
		align-items: center;
		height: 100%;
		justify-content: center;
		max-width: 100%;
		color: #FFFFFF;
		opacity: 0.5;
	}

	.get-btn {
		position: absolute;
		left: 24rpx;
		bottom: 76rpx;
		width: 702rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		color: #2C2419;
		font-size: 40rpx;
		font-weight: bold;
		background: linear-gradient(-90deg, rgba(245, 219, 170, 1), rgba(214, 182, 129, 1));
		border-radius: 44rpx;
	}

	.qq-btn {
		position: fixed;
		width: 750rpx;
		padding: 13rpx 24rpx;
		bottom: 0rpx;
		text-align: center;
		color: #fff;
		background: linear-gradient(0deg, #F94444 0%, #FF001D 100%);
		box-shadow: 0px -9px 29px 0px rgba(251, 55, 60, 0.28);
	}

	.qq-btn .btn {
		width: 288rpx;
		height: 66rpx;
		line-height: 66rpx;
		background: #FDD289;
		border-radius: 37rpx;
		color: #EF2F00;
	}

	.qq-btn .btn1 {
		width: 336rpx;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 35rpx;
		background: linear-gradient(-90deg, rgba(245, 219, 170, 1), rgba(214, 182, 129, 1));
		color: #2D241A;
	}
	.btn-text {
		background: linear-gradient(to bottom, #FBEFD6, #FFE2AB);
		-webkit-background-clip: text;
		color: transparent;
		-webkit-text-fill-color: transparent;
		text-fill-color: transparent;
	}

	.bg_img_s {

		background-repeat: no-repeat;
		background-size: 100% auto;
		width: 750rpx;

	}
</style>
