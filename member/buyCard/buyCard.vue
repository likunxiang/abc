<template>
	<view class="page flex ns-column justify-between">
		<view class="p-24">
			<view class="card-box flex-y-center" :style="'background: url(' + card_pic + ') no-repeat;background-size: 100% 100%'">
				<view class="flex align-center justify-between flex-grow-1">
					<view class="color-fff">
						<view class="fs-40 ns-text-bold">亲卡永久会员</view>
						<view class="fs-28 mt-5">没有特权  不惠生活</view>
					</view>
					<view class="fs-28 color-fff flex align-center">
						<view style="font-size: 60rpx;margin-right: 25rpx;">{{card_price}}</view>
						<view class="fs-30">元</view>
					</view>
				</view>
			</view>
			<view>
				<view class="flex justify-between color-595959">
					<view class="fs-30 ns-text-bold">购买数量</view>
					<view class="flex align-center">
						<view class="iconfont icon-jianshao3 fs-40" @click="reduce"></view>
						<view class="fs-36 ml-16 mr-16 ">{{card_num}}</view>
						<view class="iconfont icon-tianjia1 fs-40" @click="add"></view>
					</view>
				</view>
				<view class="flex justify-between color-595959" style="margin-top: 41rpx;">
					<view class="fs-30 ns-text-bold">需支付</view>
					<view>
						<text class="fs-36 ns-text-bold mr-24">{{totalPrice}}</text>
						<text class="fs-30 ns-text-bold">元</text>
					</view>
				</view>
			</view>
			<view class="buy-btn" @tap="buyVipOrder">立即购买</view>
		</view>
		<view class="footer">
			<view class="footer-main">
				<view class="text-center fs-36 ns-text-bold color-595959">自购亲卡使用说明</view>
				<view class="fs-28 color-595959" style="margin-top: 41rpx; line-height: 42rpx;">
					<rich-text :nodes="tips_text"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from "../../utils/util";
	export default {
		data() {
			return {
				card_num: 1,
				card_price: 9.9,
				total_price: 9.9,
				card_pic: '',
				tips_text: ''
			}
		},
		computed: {
			totalPrice() {
				return (this.card_num * this.card_price).toFixed(1)
			}
		},
		onLoad() {
			this.cardInfo()
		},
		methods: {
			reduce() {
				if (this.card_num > 1) {
					this.card_num = this.card_num - 1
				} else {
					return
				}
				
			},
			add() {
				if (this.card_num < 99) {
					this.card_num = this.card_num + 1
				} else {
					return
				}
			},
			cardInfo() {
				this.getApp().request({
					url: this.getApp().api.default.page_buy_card_info,
					data: {
						
					},
					success: res=> {
						console.log(res);
						if (res.code == 0) {
							this.card_price = res.data.pay_money
							this.card_pic = res.data.coupon_b
							this.tips_text = res.data.coupon_tips
						}
					},
				})
			},
			buyVipOrderThrottle: utils.throttle(function() {
				this.buyVipOrder();
			}, 1000),
			
			// 生成购买会员订单 
			buyVipOrder(e) {
				this.getApp().request({
					url: this.getApp().api.default.vip_buy_order,
					data: {
						userId: this.getApp().core.getStorageSync('USER_INFO').id,
						type: 3,
						// 1购买会员，2成为小亲 3 购买亲卡
						parent_id: this.parent_id || this.getApp().core.getStorageSync('parent_id') || this.getApp().core.getStorageSync(
							'u_id') || '',
						num: this.card_num || ''
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
														content: "购买失败",
														showCancel: false,
														confirmText: "确认",
														success: (res) => {}
													});
													return;
												}
			
												if (e.errMsg == "requestPayment:ok") {
													this.getApp().core.showModal({
														title: "提示",
														content: "购买成功",
														confirmText: "确认",
														cancelText: '继续购买',
														success: (res) => {
															if (res.confirm) {
																uni.navigateBack({
																	delta: 1,
																	fail(res) {
																		console.log(res);
																		uni.navigateBackMiniProgram({
																		  success(res) {
																		    console.log(res);
																		  },
																		  fail(res) {
																		  	console.log(res);
																		  }
																		})
																	}
																})
																
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
		}
	}
</script>

<style>
	page {
		background: #fff;
	}
	.page {
		min-height: 100%;
	}
	.card-box {
		width: 100%;
		height: 200rpx;
		padding-left: 210rpx;
		padding-right: 35rpx;
		margin-bottom: 41rpx;
	}
	.buy-btn {
		width: 240rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: linear-gradient(305deg, #FAD961 0%, #F76B1C 100%);
		box-shadow: 0px 0px 2rpx 0px rgba(210, 29, 29, 0.5);
		border-radius: 10rpx;
		font-size: 28rpx;
		color: #fff;
		margin: 81rpx auto 0;
	}
	.footer {
		padding: 0rpx 48rpx;
	}
	.footer-main {
		border-top: 1rpx dashed #979797;
		padding-top: 50rpx;
		padding-bottom: 60rpx;
	}
</style>
