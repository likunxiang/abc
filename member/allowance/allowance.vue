<template>
	<!--pages/allowance/allowance.wxml-->
	<view class="page">
		<!-- 邀请会有弹窗 -->
		<view class="get-card-modal flex-x-center flex-y-center ns-column" v-if="is_recharge">
			<view class="get-card-modal-main pr">
				<view class="color-333333 flex-x-center ns-text-bold" style="font-size: 44rpx;">请输入充值金额</view>
				<view class="flex-x-center flex-y-center" style="margin-top: 51rpx;width: 100%;height: 88rpx;border-radius: 44rpx;background: #F4F4F4;">
					<input class="fs-32 color-333333 text-center" placeholder-class="color-333333" style="width: 268rpx;" type="text" :value="pay_value" placeholder="请输入大于1的金额" @blur="inputPay" />
				</view>
				<button class="get-card-modal-btn-pay" @click="less(buyVipOrder)">立即支付</button>
				<view class="text-center fs-24 color-999999" style="margin-top: 40rpx;line-height: 36rpx;">
					<view>津贴充值无法退回</view>
					<view>可用户发红包或下单抵扣</view>
				</view>
			</view>
			<view class="iconfont icon-guanbi color-999999" style="font-size: 60rpx;margin-top: 70rpx;" @tap="closeRecharge"></view>
		</view>
		<view class="header">
			<view class="total-box pr">
				<view class="flex justify-between align-center">
					<view class="text-center">
						<view class="fs-40 color-333333 text-center ns-text-bold">{{subsidy}}</view>
						<view class="fs-30 color-666666 mt-30">可用津贴(元)</view>
					</view>
					<view class="fs-30 text-center">
						<view class="fs-40 color-333333 text-center ns-text-bold">{{wait_add_subsidy}}</view>
						<view class="fs-30 color-666666 mt-30">待入账津贴(元)</view>
					</view>
				</view>
				<view class="flex  pr">
					<view class="total-box-header-recharge" url="/tool/sendReward/sendReward" v-if="check_buy_sub_qx" @click="openRecharge">
						<view>临时充值</view>
						<view class="recharge-tips fs-24 color-333333" v-if="recharge_tips" @click.stop="">
							<text>本功能为小亲发红包提供临时充值</text>
							<text class="iconfont icon-delete fs-30" style="color: #BEBEBE;margin-left: 22rpx;" @click="closeTips"></text>
						</view>
					</view>
					<navigator class="total-box-header" url="/tool/sendReward/sendReward" v-if="check_send_sub_qx">赠送津贴</navigator>
				</view>
				<view class="use-rule" @tap="toRule">规则</view>
			</view>
		</view>
		<scroll-view class="plr-24" scroll-y="true" style="height: calc(100vh - 360rpx);" @scrolltolower="getMore">
			<block v-if="subsidyList.length>0">
				<navigator :url="'/member/allowanceSource/allowanceSource?id=' + item.id" class="flex justify-between align-center"
				 style="padding: 32rpx 0;border-bottom: 1rpx solid rgba(190, 190, 190, .3);" v-for="(item, id) in subsidyList" :key="id">
					<view>
						<view class="fs-30 color-333333">{{item.desc}}</view>
						<view class="fs-24 color-999999" style="margin-top: 27rpx;">{{item.addTimeStr}}</view>
					</view>
					<view>
						<view :class="'fs-30 ' + (item.coinType==1?'color-FF0200':'color-333333')">{{item.coinType==1?'+':'-'}}{{item.num}}</view>
						<view class="fs-24 color-999999 ns-text-right" style="margin-top: 27rpx;" v-if="item.coinType==1">{{item.status==0?'已入账':(item.status==1?'待入账':'已失效')}}</view>
						<view class="fs-24 color-999999 ns-text-right" style="margin-top: 27rpx;" v-else>{{item.status==0?'已抵扣':(item.status==1?'待入账':'已失效')}}</view>
					</view>

				</navigator>
			</block>
			<block v-else>
				<view class="flex flex-x-center">
					<view style="padding-top: 108rpx;">
						<view class="empty-order-icon text-center marginAuto ">
							<view class="iconfont icon-icon color-fff" style="opacity: 0.5;font-size: 180rpx;"></view>
						</view>
						<view class="fs-30 color-999999" style="margin-top: 49rpx;">空空如也，这里什么也没有</view>
						<view @tap="showModalVip" class="to-home">赚取津贴</view>
					</view>

				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				subsidy: "", // 可用津贴
				wait_add_subsidy: '', // 待入账津贴
				subsidyList: "",
				tips: "",
				tipsBg: "",
				is_show_model_vip: false,
				card_bg: "",
				stopLoadMore: false,
				parent_id: "",
				store_id: "",
				store_group_id: "",
				sid: "",
				shareImg: "",
				article_id: '', // 文章id
				check_send_sub_qx: false,
				pay_value: '',
				is_recharge: false,
			};
		},

		components: {},
		props: {},
		computed: {
			recharge_tips() {
				return this.$store.state.recharge_tips
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.getAllowanceList();
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
		onShareAppMessage: function(options) {
			var mch_id = uni.getStorageSync('_mchInfo').id;
			var user_id = this.getApp().core.getStorageSync('USER_INFO').id;
			var nickname = this.getApp().core.getStorageSync('USER_INFO').nickname;
			var img = this.getApp().core.getStorageSync('_img').open_member;
			this.shareVip();
			var title = nickname + '邀请您来开通会员~';
			return {
				title: title,
				path: '/member/vipFirst/vipFirst?sid=' + this.sid + '&type=1' + '&mch_id=' + mch_id + '&user_id=' + user_id,
				imageUrl: img
			};
		},
		methods: {
			inputPay(e) {
				this.pay_value = e.detail.value
			},
			// 生成购买会员订单
			buyVipOrder() {
				this.getApp().request({
					url: this.getApp().api.default.vip_buy_order,
					data: {
						userId: this.getApp().core.getStorageSync('USER_INFO').id,
						type: 4,
						// 1购买会员，2成为小亲 3 购买亲卡
						buy_price: this.pay_value
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
														content: "充值失败",
														showCancel: false,
														confirmText: "确认",
														success: (res) => {}
													});
													return;
												}
			
												if (e.errMsg == "requestPayment:ok") {
													this.getApp().core.showModal({
														title: "提示",
														content: "充值成功",
														confirmText: "确认",
														success: (res) => {
															if (res.confirm) {
																this.getAllowanceList();
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
			closeTips() {
				this.$store.commit('vuexSet', {
					name: 'recharge_tips',
					value: false
				})
			},
			getAllowanceList() {
				this.getApp().request({
					url: this.getApp().api.default.allowance,
					data: {
						userId: this.getApp().core.getStorageSync('USER_INFO').id
					},
					success: res => {
						if (res.code == 0) {
							this.setData({
								subsidy: res.data.subsidy || '0.00',
								wait_add_subsidy: res.data.wait_add_subsidy || '0.00',
								check_send_sub_qx: res.data.check_send_sub_qx,
								check_buy_sub_qx: res.data.check_buy_sub_qx, // 是否允许临时购买津贴
								article_id: res.data.article_id,
								subsidyList: res.data.list,
								tips: res.data.tips,
								tipsBg: res.data.banner
							});
						}
					}
				});
			},

			// 邀请会员
			openRecharge() {
				this.setData({
					is_recharge: true,
				});
			},

			closeRecharge() {
				this.setData({
					is_recharge: false
				});
			},

			getMore() {
				var self = this;
				var page = self.page;
				var index = page;
				var data = {
					userId: this.getApp().core.getStorageSync('USER_INFO').id
				};
				var url = this.getApp().api.default.allowance;
				this.getApp().core.pading(self, url, data, function(res) {
					if (res.data.list.length == 0) {
						self.setData({
							stopLoadMore: true
						});
						return;
					}

					var newGoodList = res.data.list;
					var nowGoodList = self.subsidyList.concat(newGoodList);
					self.setData({
						subsidyList: nowGoodList
					});
				});
			},

			toRule() {
				uni.navigateTo({
					url: '/pages/article-detail/article-detail?id=' + this.article_id
				})
			},


			// 分享会员
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
						} // else {
						// 	wx.showToast({
						// 		title: res.msg,
						// 		icon: 'none'
						// 	})
						// }

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
						userId: this.getApp().core.getStorageSync('USER_INFO').id
					},
					success: res => {}
				});
			}

		}
	};
</script>
<style>
	/* pages/allowance/allowance.wxss */
	page {
		height: 100%;
		background: #F4F4F4;
	}

	.page {
		min-height: 100%;
	}

	.header {
		padding: 24rpx;
		padding-bottom: 0rpx;
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
		width: 580rpx;
		padding: 52rpx 40rpx 38rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
	}

	.get-card-modal-text {
		font-size: 38rpx;
		color: #B86A24;
		margin-top: 48rpx;
	}

	.get-card-modal-btn-pay {
		margin-top: 52rpx;
		width: 100%;
		height: 88rpx;
		font-size: 32rpx;
		color: #fff;
		background: #FF401A;
		border-radius: 44rpx;
		box-shadow: 0rpx 7rpx 16rpx 0px rgba(255, 69, 32, 0.55);
	}

	.total-box {
		background: #fff;
		border-radius: 10rpx;
		padding: 70rpx 87rpx 32rpx;
	}

	.total-box-header {
		margin: 45rpx auto 0;
		width: 200rpx;
		height: 66rpx;
		line-height: 66rpx;
		background: #F23005;
		border-radius: 10rpx;
		color: #fff;
		font-size: 30rpx;
		text-align: center;
	}

	.total-box-header-recharge {
		margin: 45rpx auto 0;
		width: 200rpx;
		height: 66rpx;
		line-height: 64rpx;
		border: 1rpx solid rgba(242, 48, 5, .8);
		border-radius: 10rpx;
		color: #F23005;
		font-size: 30rpx;
		text-align: center;
	}

	.recharge-tips {
		position: absolute;
		bottom: -104rpx;
		left: 28rpx;
		padding: 0rpx 20rpx;
		background: #fff;
		border: 1rpx solid #BEBEBE;
		border-radius: 10rpx;
		z-index: 1;
	}

	.recharge-tips::after {
		position: absolute;
		left: 40rpx;
		top: -13rpx;
		content: "";
		border: 1rpx solid rgba(0, 0, 0, 0);
		border-top-color: #BEBEBE;
		border-left-color: #BEBEBE;
		width: 16rpx;
		height: 16rpx;
		background: #fff;
		z-index: 9;
		transform: rotate(45deg) skew(15deg, 15deg);

	}

	.use-rule {
		position: absolute;
		top: 12rpx;
		right: 11rpx;
		width: 71px;
		text-align: center;
		padding: 10rpx 0;
		text-align: center;
		border: 1rpx solid rgba(242, 48, 5, .7);
		border-radius: 8rpx;
		font-size: 24rpx;
		color: #F23005;
	}

	.model {
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		right: 0rpx;
		bottom: 0rpx;
		background: rgba(0, 0, 0, .5);
		z-index: 10;
	}

	.model-box {
		width: 536rpx;
		padding: 62rpx;
		padding-top: 100rpx;
		padding-bottom: 60rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20px;
	}

	.model-bg {
		width: 557rpx;
		height: 321rpx;
		position: absolute;
		top: -210rpx;
		left: 8rpx;
	}

	.model-btn {
		width: 315rpx;
		height: 68rpx;
		line-height: 68rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;
		background: rgba(255, 64, 26, 1);
		border-radius: 34rpx;
	}

	.empty-order-icon {
		width: 280rpx;
		height: 280rpx;
		line-height: 280rpx;
		background: rgba(234, 234, 234, 1);
		border-radius: 50%;
	}

	.to-home {
		width: 359rpx;
		height: 82rpx;
		border: 2rpx solid rgba(255, 195, 48, 1);
		border-radius: 40rpx;
		margin: auto;
		margin-top: 47rpx;
		font-size: 30rpx;
		color: #FFC330;
		line-height: 78rpx;
		text-align: center;
	}
</style>
