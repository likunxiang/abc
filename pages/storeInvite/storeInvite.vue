<template>
	<view class="managerBox pr" :style="'background-image: url(' + to_mch_img + ');'">

		<common></common>
		<view class="con flex justify-between align-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
			<view class="backBtn" @tap="goBack">
				<text class="iconfont icon-zuojiantoubeifen"></text>
			</view>
			<view></view>
			<view></view>
		</view>
		<!-- 查看如何建群 -->
		<navigator class="examine" url="/pages/article-detail/article-detail?id=72"></navigator>

		<view class="btn-box">
			<view class="shopBtn-empty shopBtn" @tap="toMch">
				<view class="ns-text-bold" style="text-shadow: 0rpx 3rpx 0rpx rgba(227, 94, 53, 0.61);">申请开店</view>
				<view class="fs-24 color-fff text-center">(已有群，立即申请开店)</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/storeManager/storeManager.js
	import utils from "../../utils/util";

	export default {
		data() {
			return {
				loading: false,
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				showGetLogin: false,
				user_info_show: false,
				to_mch_img: "",
				member: "",
				parent_id: "",
				store_id: "",
				store_group_id: "",
				sid: "",
				shareImg: "",
				role: uni.getStorageSync('role'),
				vipCardStatus: '',
				vipLevel: ''
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var self = this;
			this.getApp().page.onLoad(this, options);
			var token = uni.getStorageSync('ACCESS_TOKEN');

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

			this.setData({
				to_mch_img: uni.getStorageSync('_img').tomch_invite
			});
			setTimeout(function() {
				self.setData({
					loading: true
				});
			}, 500);
			uni.hideShareMenu()
			this.getShareData();
			this.getShareImg();
			this.getVipCardStatus()
		},
		// 支付

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
		methods: {
			toMch() {
				var role = this.role
				if (role == 'shoper') {
					uni.showModal({
						content: '您已经是店主了，不需要重复开店',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								uni.redirectTo({
									url: '/pages/index/index'
								})
							}
						}
					})
					return
				}
				var status = this.vipCardStatus;
				console.log(this.vipLevel);
				console.log(this.vipLevel < 2);
				if (this.vipLevel < 2) {
					uni.showModal({
						content: '您还不是永久会员，需先成为永久会员才能成为店主',
						confirmText: '成为会员',
						success: res => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/member/vipFirst/vipFirst'
								});
							} else {
								return
							}
						}
					});
				} else {
					uni.navigateTo({
						url: '/member/openshop/openshop'
					});
				}
				
			},
			getVipCardStatus() {
				this.getApp().request({
					url: this.getApp().api.default.vip_card_status,
					success: res => {
						if (res.code == 0) {
							this.setData({
								vipCardStatus: res.data.status,
								vipLevel: res.data.level,
							});
						}
					}
				});
			},

			goBack() {
				uni.navigateBack({
					fail: res => {
						uni.redirectTo({
							url: '/pages/index/index'
						});
					}
				});
			},

			// 分享会员
			getShareData() {
				this.getApp().request({
					url: this.getApp().api.default.share_data,
					data: {
						userId: uni.getStorageSync('USER_INFO').id
					},
					success: res => {
						if (res.code == 0) {
							this.setData({
								parent_id: res.data.parent_id,
								store_id: res.data.store_id,
								store_group_id: res.data.store_group_id,
								sid: res.data.id
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

			shareVip() {
				this.getApp().request({
					url: this.getApp().api.default.share_vip,
					data: {
						userId: uni.getStorageSync('USER_INFO').id
					},
					success: res => {}
				});
			}

		}
	};
</script>

<style>
	page {
		background: #C2242B;
	}

	.managerBox {
		width: 750rpx;
		height: 1500rpx;
		background-size: 750rpx 1500rpx;
		background-repeat: no-repeat;
	}

	.con {
		width: 100%;
		top: 0;
		left: 0;
		display: flex;
		padding: 0 24rpx;
		position: fixed;
	}

	.progress-box {
		position: absolute;
		bottom: 870rpx;
		padding: 0 56rpx;
		width: 100%;
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

	.btn-box {
		left: 0rpx;
		width: 750rpx;
		bottom: 404rpx;
		position: absolute;
		padding: 0rpx 24rpx;
		width: 100%;
		opacity: 0;

	}

	.shopBtn-empty {
		width: 702rpx;
		height: 98rpx;
		border-radius: 52rpx;
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #fff;
		text-align: center;
		padding-top: 12rpx;
	}

	.shopBtn {
		background: #FE5B2A;
		border: none;
		box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(255, 255, 255, .65) inset;
	}

	button {
		background-color: #C31927;
		margin: 0;
	}

	.examine {
		position: absolute;
		bottom: 270rpx;
		width: 702rpx;
		left: 24rpx;
		height: 98rpx;
		border-radius: 52rpx;
		opacity: 0;
	}
</style>
