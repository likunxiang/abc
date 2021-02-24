<template>
	<view class="page p-24" v-if="request_end">
		<common></common>
		<!-- <view class="status-bar">
	            <view class="flex ns-align-items-flex-center">
					<image style="width: 30rpx;height: 30rpx; margin-right: 20rpx;" mode="widthFix" src="image/icon-dfk.png"></image>
					<view>{{order.status}}</view>
				</view>
				<view class="fs-22 mt-20" >{{order.status_msg}}</view>
	        </view> -->

		<!-- <navigator url="/pages/express-detail/express-detail?id={{order.order_id}}&order_type={{order.order_type}}" class="block flex-row" wx:if="{{order.express_no && order.is_send==1}}">
	            <view class="flex-grow-1">
	                <view class="mb-10">快递公司：{{order.express}}</view>
	                <view class="">快递单号：{{order.express_no}}</view>
	            </view>
	            <view class="flex-grow-0 flex-y-center">
	                <image src="{{__wxapp_img.store.jiantou_r.url}}" style="width: 12rpx;height: 22rpx"></image>
	            </view>
	
	            <view class="block-row flex-row" wx:if="{{false}}">
	                <view class="flex-grow-1">快递单号：{{order.express_no}}</view>
	                <view class="flex-grow-0">
	                    <text class="copy-text-btn" bindtap="copyText" data-text="{{order.express_no}}">复制</text>
	                </view>
	            </view>
	        </navigator> -->
		<view class="public-box fs-30 color-333333 mb-24">
			<view class="mb-24">
				<text>{{order.name}}</text>
				<text class="ml-16">{{order.mobile}}</text>
			</view>
			<view class="ns-text-bold" v-if="order.address">
				{{order.address}}
			</view>
		</view>

		<view class="ptb-20 padding-lr bg-white mb-20" v-if="order.is_zt == 1">
			<view class="flex-row block-row fs-24 justify-between">
				<view class="flex align-center">
					<view class="fs-34 color-4A4A4A ns-text-bold">
						{{order.dis_people_name}}
					</view>
					<view class="ml-30 color-000000">
						{{order.dis_phone}}
					</view>
				</view>
				<view class="flex">
					<view class="iconfont icon-dianhuazixunhuawuzongheguanlibl color-489A19 fs-40" @tap="call" :data-tel="order.dis_phone"></view>
					<view class="iconfont icon-daohang color-489A19 fs-40 ml-30" @tap="daohang" :data-longitude="order.dis_longitude"
					 :data-latitude="order.dis_latitude"></view>
				</view>
			</view>
			<view class="color-000000 fs-28 ns-text-bold mt-10">自提点: {{order.dis_address}}</view>
		</view>
		<!-- <block wx:if="{{order.is_offline == 1}}">
	            <view class="block flex-row">
	                <view class='flex-grow-1'>
	                    <view class="flex-grow-1">门店名称：{{order.shop.name}}</view>
	                    <view class="flex-grow-1">联系电话：{{order.shop.mobile}}</view>
	                    <view class="flex-grow-1">门店地址：{{order.shop.address}}</view>
	                </view>
	                <view class='flex-grow-0 flex-y-center' wx:if='{{order.shop.longitude}}'>
	                    <text class='copy-text-btn' bindtap='location'>导航</text>
	                </view>
	            </view>
	        </block> -->


		<!-- <view class="ns-text-sm ns-text-bold ns-bg-white ns-padding-horizontal-sm ns-padding-top-sm">
			<view class="flex ns-justify-content-space-between ns-align-items-flex-center">
				<view class="fs-24 color-2C2C2C ns-text-bold">商品清单</view>
				<view class="fs-24 color-F49E3A ns-text-bold flex ns-align-items-flex-center">
					<view class="iconfont icon-kefu mr-10" style="margin-top: 5rpx;"></view>
					<button open-type="contact" session-from="nickName={{nickName}}|avatarUrl={{avatarUrl}}|type={{type}}|userId={{userId}}|mchId={{mchId}}|storeId={{storeId}}|orId={{orId}}"
					 bindcontact="handleContact" style="line-height: 1;border: none;padding: 0;font-size: 24rpx;color: #F49E3A;border-radius: 0;">联系客服</button>
				</view>
			</view>
		</view> -->

		<view class="public-box mb-24">
			<view class>
				<view class="fs-24 color-999999 mb-30 flex justify-between align-center">
					<view>{{order.addtime}}</view>
					<view class="flex justify-end" v-if="order.order_refund_cancel == 0">
					</view>
					<view class="flex justify-end" v-if="order.order_refund_cancel == 1">
						<view class="cancel-btn fs-24 color-666666 " @tap="cancelOrder">取消订单</view>
					</view>
					<view class="flex justify-end" v-if="order.order_refund_cancel == 2">
						<view class="cancel-btn fs-24 color-666666 " @tap="buyAgain">加入购物车</view>
					</view>
				</view>
				<view v-for="(item, index) in order.goods_list.list" :key="index" class="flex-row goods-item">
					<view class="flex-grow-0">
						<navigator :url="'/pages/goods/goods?id=' + item.goods_id + '&from=' + item.from" style="font-size: 0">
							<image mode="aspectFill" style="width: 200rpx;height: 200rpx;border-radius: 14rpx;" :src="item.goods_pic"></image>
						</navigator>
					</view>
					<view class="flex flex-grow-1" style="padding-left: 20rpx">
						<view class="flex-grow-1">
							<view class="fs-30 color-333333 ns-text-limit2" style="margin-bottom: 10rpx">
								<navigator :url="'/pages/goods/goods?id=' + item.goods_id + '&from=' + item.from">{{item.name}}</navigator>
							</view>
							<view class="flex align-center justify-between">
								<view v-for="(attr, index2) in item.attr" :key="index2" class="flex-grow-1 ns-text-limit" style="font-size: 24rpx;color: #999999;margin-right: 20rpx;display: inline-block">
									{{attr.attr_group_name}}：{{attr.attr_name}}
								</view>
								<view class="flex-grow-0" style="font-size: 30rpx;color: #333333;">x {{item.num}}</view>
							</view>
							<view class="flex justify-between align-center">
								<!-- <view class="type-box1 flex-x-center flex-y-center color-fff fs-24" wx:if="{{item.dis_type == 2}}">{{item.delivery_type}}</view>
								<view class="ziti flex align-center text-center fs-20 mb-16" style="color: #FFC330;" wx:if="{{item.dis_type == 1}}">
									<view style="border-right: 1rpx dashed #FFC330;width: 64rpx;">自提</view>
									<view class="flex1">{{item.delivery_type}}</view>
								</view> -->
								<view>
									<view class="express-insurance color-fff fs-24" v-if="item.goods_insure_desc">{{item.goods_insure_desc}}</view>
								</view>
								<view v-if="item.order_refund_enable==1">
									<navigator v-if="item.status==1" class="refund-btn ns-text-center" :url="'/pages/order-refund/order-refund?id=' + item.order_detail_id + '&status=1&refund_type_id=3'">申请退款
									</navigator>
									<navigator v-if="item.status==2" class="refund-btn" :url="'/pages/order-refund/order-refund?id=' + item.order_detail_id + '&status=2'">申请售后
									</navigator>
									<navigator v-if="item.status==3" class="refund-btn" :url="'/pages/order-refund/order-refund?id=' + item.order_detail_id + '&status=3'">申请退货
									</navigator>

								</view>
								<navigator class="refund-btn" v-if="item.status==4 || item.status==6" :url="'/pages/order-refund-detail/order-refund-detail?id=' + item.order_refund_id + '&status=' + item.status" >售后详情</navigator>
							</view>

							<view class="flex justify-between mt-16">
								<block v-if="order.discount > 0">
									<view class="flex-grow-1 flex justify-end">
										<view class="flex align-center" v-if="item.vm && item.vm>0">
											<view class="iconfont icon-ziyuan101 icon-box"></view>
											<view class=" color-333333 fs-30 ns-text-bold">￥{{item.vm}}</view>
										</view>
									</view>
								</block>
								<block v-else>
									<view class="flex-grow-1 flex align-center">
										<view class="flex align-center" v-if="item.vm && item.vm>0">
											<view class="iconfont icon-ziyuan101 icon-box"></view>
											<view class=" color-333333 fs-30 ns-text-bold">￥{{item.vm}}</view>
										</view>
									</view>
									<view class="price fs-30 color-333333">¥ <text class="fs-30">{{filters.priceStr(item.single_price)[0]}}.</text><text>{{filters.priceStr(item.single_price)[1]}}</text></view>
								</block>
								
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
		<view class="public-box mb-24">
			<view class="block">
				<view class="flex-row block-row fs-30 color-333333">
					<view class="flex-grow-1">商品总价</view>
					<block v-if="order.discount > 0">
						<view class="flex-grow-0 fs-30 color-FF0200" v-if="order">¥ <text class="fs-30">{{filters.priceStr(order.total_price)[0]}}.</text><text>{{filters.priceStr(order.total_price)[1]}}</text></view>
						<view class="flex-grow-0" v-else>￥0.00</view>
					</block>
					<block v-else>
						<view class="flex-grow-0 fs-30 color-FF0200" v-if="order">¥ <text class="fs-30">{{filters.priceStr(order.goods_total_price)[0]}}.</text><text>{{filters.priceStr(order.goods_total_price)[1]}}</text></view>
						<view class="flex-grow-0" v-else>￥0.00</view>
					</block>
					
				</view>
				<!-- <view class="flex-row block-row">
			            <view class="flex-grow-1">商品数量</view>
			            <view class="flex-grow-0">×{{order.num}}</view>
			        </view> -->
				<view class="flex-row block-row fs-30 color-333333" v-if="order.user_coupon_id">
					<view class="flex-grow-1">优惠券优惠</view>
					<view class="flex-grow-0">-￥{{order.coupon_sub_price}}</view>
				</view>
				<!-- <view class="flex-row block-row" wx:if='{{order.integral && order.integral.forehead > 0}}'>
			            <view class="flex-grow-1">积分抵扣</view>
			            <view class="flex-grow-0">-￥{{order.integral.forehead}}</view>
			        </view> -->
				<!-- <view class="flex-row block-row" wx:if='{{order.discount<10 && order.discount}}'>
			            <view class="flex-grow-1">会员折扣</view>
			            <view class="flex-grow-0">{{order.discount}}折</view>
			        </view> -->
				<view class="flex-row block-row fs-30 color-333333" v-if="order.before_update">
					<view class="flex-grow-1">{{order.before_update}}</view>
					<view class="flex-grow-0">￥{{order.money}}</view>
				</view>
				<view class="flex-row block-row fs-30 color-333333" v-if="order.colonel">
					<view class="flex-grow-1">团长优惠</view>
					<view class="flex-grow-0">￥{{order.colonel}}</view>
				</view>
				<view class="flex-row block-row fs-30 color-333333">
					<view class="flex-grow-1">运费</view>
					<view class="flex-grow-0">￥{{order.express_price}}</view>
				</view>
				<view class="flex-row block-row fs-30 color-333333" v-if="order.insure_buy_money > 0">
					<view class="flex-grow-1 flex">
						<view>运费险</view>
						<view class="fs-30 color-999999 ml-16">{{order.insure_give_desc}}</view>
					</view>
					<view class="flex-grow-0">￥{{order.insure_buy_money}}</view>
				</view>
				<block v-if="order.discount > 0">
				</block>
				<block v-else>
					<view class="flex-row block-row fs-30 color-333333" v-if="order.youhui_price ">
						<view class="flex-grow-1">亲卡抵扣</view>
						<view class="flex-grow-0 ">-￥{{order.youhui_price}}</view>
					</view>
				</block>
				<view class="flex-row block-row fs-30 color-333333" v-if="order.use_subsidy">
					<view class="flex-grow-1">津贴优惠</view>
					<view class="flex-grow-0">-￥{{order.use_subsidy}}</view>
				</view>
				<view v-if="order.remark">
					<view>买家留言</view>
					<view style="width:100%;overflow:auto;word-wrap:break-word;">{{order.remark}}</view>
				</view>
				<view v-if="order.words">
					<view>商家留言</view>
					<view class="fs-sm" style="width:100%;overflow:auto;word-wrap:break-word;">{{order.words}}</view>
				</view>
				<view class="ns-flex ns-justify-content-end block-footer fs-30 color-333333">
					<view>共{{order.num}}件商品</view>
					<view class="fs-30 ml-8">合计：
						<text class="fs-30">￥<text class="fs-30">{{filters.priceStr(order.pay_price)[0]}}.</text><text>{{filters.priceStr(order.pay_price)[1]}}</text></text>
					</view>
				</view>
			</view>
		</view>


		<view class="public-box fs-24 color-333333">
			<view class="fs-36 color-333333 ns-text-bold mb-30">订单信息</view>
			<view class="flex ns-justify-content-space-between mb-30">
				<view class="fs-24 color-999999">支付方式</view>
				<view v-if="order.pay_type==0">未支付</view>
				<view v-if="order.pay_type==1">微信支付</view>
			</view>
			<view class="mb-30 flex ns-justify-content-space-between">
				<view class="flex ns-justify-content-space-between ns-align-items-flex-center">
					<view class="fs-24 color-999999">订单编号</view>


				</view>
				<view class="flex align-center">
					<view class="copy-btn mr-20 color-333333" style="white-space: nowrap;" @tap="copyText" :data-text="order.order_no">复制</view>
					<view>{{order.order_no}}</view>
				</view>

			</view>
			<view class="flex ns-justify-content-space-between">
				<view class="fs-24 color-999999">下单时间</view>
				<view>{{order.addtime}}</view>
			</view>
			<!-- <view class='pay-type'>{{order.pay_type_text}}</view> -->
		</view>




	</view>
</template>


<script>
	export default {
		data() {
			return {
				isPageShow: false,
				order: {
					goods_list: {
						list: []
					}
				},
				getGoodsTotalPrice: function() {
					return this.order.total_price;
				},
				order_id: 0,
				nickName: "",
				avatarUrl: "",
				userId: "",
				mchId: "",
				storeId: "",
				orId: "",
				type: 0,
				status: "",
				route: "",
				filters: require('../../utils/filters.js'),
				request_end: false,  // 请求完毕
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.setData({
				nickName: uni.getStorageSync('USER_INFO').nickname,
				avatarUrl: uni.getStorageSync('USER_INFO').avatar_url,
				userId: uni.getStorageSync('USER_INFO').id,
				mchId: uni.getStorageSync('_mchInfo').id,
				storeId: uni.getStorageSync('STORE').id,
				orId: options.order_id,
				type: 3 //订单页面进入

			});
			this.getApp().page.onLoad(this, options);
			var self = this;
			uni.showLoading({
				title: "正在加载"
			});
			// var pages = getCurrentPages();
			// var current_page = pages[pages.length - 2];

			// //#ifdef MP-WEIXIN 
			// current_page = current_page.$vm
			// //console.log('微信路由测试',current_page.__route__)
			// //#endif
			self.setData({
				status: options.status
			});
			self.setData({
				order_id: options.order_id,
				// route: current_page.route
			});
		},

		onShow() {
			this.loadDate();
		},

		methods: {
			loadDate() {
				var self = this;
				self.getApp().request({
					url: self.getApp().api.order.detail,
					data: {
						order_id: self.order_id,
						route: self.route
					},
					success: function(res) {
						var address = uni.getStorageSync(self.getApp().const.PICKER_ADDRESS);
						var res_data = res.data;

						if (res.code == 0) {
							self.setData({
								order: res_data,
								isPageShow: true
							});
						}
					},
					complete: function() {
						uni.hideLoading();
						self.request_end = true
					}
				});
			},
			buyAgain() {
				var self = this;
				var order_no = self.order.order_no;
				this.getApp().request({
					url: this.getApp().api.order.buy_again,
					method: 'POST',
					data: {
						order_no: order_no
					},
					success: function(res) {
						if (res.code == 0) {
							uni.reLaunch({
								url: '/pages/cart/cart'
							});
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}
				});
				
			},
			// 整单取消
			cancelOrder: function() {
				var self = this;
				uni.showModal({
					title: '提示',
					content: '取消订单，宝贝会被别人抢走哦～确定要取消吗？',
					success(res) {
						if (res.confirm) {
							uni.showLoading({
								title: "操作中"
							});
							self.getApp().request({
								url: self.getApp().api.order.cancel_order,
								data: {
									order_id: self.order_id
								},
								success: function(res) {
									uni.hideLoading();

									if (res.code == 0) {
										uni.showModal({
											title: "提示",
											content: res.msg,
											showCancel: false,
											success: function(res) {
												if (res.confirm) {
													self.loadDate();
												}
											}
										});
									} else {
										uni.showModal({
											title: "提示",
											content: res.msg,
											showCancel: false,
											success: function(res) {}
										});
									}
								}
							});
						}
					}
				})

			},
			copyText: function(e) {
				var self = this;
				var text = e.currentTarget.dataset.text;
				this.setClipboardData({
					data: text,
					success: function() {
						uni.showToast({
							title: "已复制"
						});
					}
				});
			},
			location: function() {
				var self = this;
				var shop = self.order.shop;
				uni.openLocation({
					latitude: parseFloat(shop.latitude),
					longitude: parseFloat(shop.longitude),
					address: shop.address,
					name: shop.name
				});
			},

			daohang(e) {
				var latitude = parseFloat(e.currentTarget.dataset.latitude);
				var longitude = parseFloat(e.currentTarget.dataset.longitude);
				uni.openLocation({
					latitude: latitude,
					longitude: longitude
				});
			},

			call(e) {
				var text = e.currentTarget.dataset.tel;
				uni.makePhoneCall({
					phoneNumber: text,

					success(res) {},

					fail(res) {
						return;
					}

				});
			},

			kf() {
				let that = this;
				uni.getStorage({
					key: 'USER_INFO',

					success(user) {
						uni.getStorage({
							key: '_mchInfo',

							success(mch) {
								uni.navigateTo({
									url: '/pages/web/web?type=1&user_id=' + user.data.id + '&mch_id=' + mch.data.id + '&order_id=' + that.order_id
								});
							}

						});
					}

				});
			},

			orderRevoke: function(e) {
				var self = this;
				uni.showModal({
					title: "提示",
					content: "是否退款该订单？",
					cancelText: "否",
					confirmText: "是",
					success: function(res) {
						if (res.cancel) return true;

						if (res.confirm) {
							uni.showLoading({
								title: "操作中"
							});
							self.getApp().request({
								url: self.getApp().api.order.revoke,
								data: {
									order_id: e.currentTarget.dataset.id
								},
								success: function(res) {
									uni.hideLoading();
									uni.showModal({
										title: "提示",
										content: res.msg,
										showCancel: false,
										success: function(res) {
											if (res.confirm) {
												self.onLoad({
													id: self.order.order_id
												});
											}
										}
									});
								}
							});
						}
					}
				});
			},
			orderPay: function(e) {
				let self = this;
				var order_id = e.currentTarget.dataset.id;
				var paramData = {};
				var url = this.getApp().api.order.pay_data;
				paramData.order_id = order_id;
				var route = "pages/order/order";
				uni.showLoading({
					title: "正在提交",
					mask: true
				});
				WechatPay(paramData, url, route);

				function WechatPay(paramData, url, route) {
					paramData.pay_type = "WECHAT_PAY";
					self.getApp().request({
						url: url,
						data: paramData,
						complete: function() {
							uni.hideLoading();
						},
						success: function(res) {
							if (res.code == 0) {
								uni.requestPayment({
									_res: res,
									timeStamp: res.data.timeStamp,
									nonceStr: res.data.nonceStr,
									package: res.data.package,
									signType: res.data.signType,
									paySign: res.data.paySign,
									success: function(e) {},
									fail: function(e) {},
									complete: function(e) {
										if (e.errMsg == "requestPayment:fail" || e.errMsg == "requestPayment:fail cancel") {
											//支付失败转到待支付订单列表
											uni.showModal({
												title: "提示",
												content: "订单尚未支付",
												showCancel: false,
												confirmText: "确认",
												success: function(res) {
													if (res.confirm) {
														uni.redirectTo({
															url: "/" + route + "?status=0"
														});
													}
												}
											});
											return;
										}

										uni.redirectTo({
											url: "/" + route + "?status=1"
										});
									}
								});
							}

							if (res.code == 1) {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								});
							}
						}
					});
				}
			},
			orderConfirm: function(e) {
				var self = this;
				uni.showModal({
					title: "提示",
					content: "是否确认已收到货？",
					cancelText: "否",
					confirmText: "是",
					success: function(res) {
						if (res.cancel) return true;

						if (res.confirm) {
							uni.showLoading({
								title: "操作中"
							});
							self.getApp().request({
								url: self.getApp().api.order.confirm,
								data: {
									order_id: e.currentTarget.dataset.id
								},
								success: function(res) {
									uni.hideLoading();
									uni.showToast({
										title: res.msg
									});

									if (res.code == 0) {
										self.loadOrderList(3);
									}
								}
							});
						}
					}
				});
			}
		}
	};
</script>
<style>
	page {
		overflow-x: hidden;
	}

	button::after {
		border: none;
	}

	.icon-box {
		width: 30rpx;
		height: 30rpx;
		text-align: center;
		line-height: 30rpx;
		color: #F0D0A5;
		background: rgba(0, 0, 0, 1);
		border-radius: 50%;
		margin-right: 7rpx;
		font-size: 20rpx;
	}

	.cancel-btn {
		width: 141rpx;
		height: 51rpx;
		line-height: 49rpx;
		text-align: center;
		border: 1rpx solid rgba(153, 153, 153, .5);
		border-radius: 25rpx;
	}

	.ziti {
		width: 170rpx;
		height: 38rpx;
		line-height: 34rpx;
		border: 2rpx solid #FFC330;
		border-radius: 19rpx;
	}

	.page {
		min-height: 100%;
		padding: 24rpx;
		padding-bottom: 98rpx;
	}

	.body {
		min-height: 100%;

	}

	.status-bar {

		padding: 30rpx;
		color: #fff;
		font-size: 30rpxpx;
		height: 148rpx;


		background-color: #252E3E;
	}

	.block {
		background: #fff;
	}

	.bg-252E3E {
		background-color: #252E3E;
	}

	.block .block-row {
		margin-bottom: 10rpx;
	}

	.block .block-footer {
		border-top: 1rpx solid #f4f4f4;
		padding: 24rpx 0;
		padding-bottom: 0;
		margin-top: 32rpx;
		text-align: right;
	}

	.goods-item {
		padding-bottom: 32rpx;
	}

	.goods-item:last-child {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
		width: 100%;
	}

	.refund-btn {
		width: 131rpx;
		height: 51rpx;
		line-height: 49rpx;
		border: 1rpx solid rgba(153, 153, 153, .5);
		text-align: center;
		border-radius: 23rpx;
		font-size: 24rpx;
		color: #333333;
	}

	.refund-text {
		float: right;
		display: inline-block;
		margin-top: 20rpx;
	}

	.pay-type {
		width: 100%;
		padding: 32rpx 0 8rpx 0;
		border-top: 1rpx solid #e2e2e2;
		margin-top: 32rpx;
	}

	.play-btn {
		width: 136rpx;
		height: 45rpx;
		background: #F49E3A;
		border: 1rpx solid #F49E3A !important;
		color: #fff;
		border-radius: 20rpx;
		line-height: 45rpx;
		text-align: center;
		font-size: 24rpx;
		margin: 0 0 0 24rpx !important;
	}

	.play-btn1 {
		width: 136rpx;
		height: 45rpx;
		border: 1rpx solid #999 !important;
		border-radius: 20rpx;
		line-height: 45rpx;
		text-align: center;
		margin: 0 0 0 24rpx !important;
		background-color: #FFFFFF;
		font-size: 24rpx;
		color: #595959;
	}

	.bg-F49E3A {
		background: #F49E3A;
		border: 1rpx solid #F49E3A !important;
		color: #fff;
	}

	.order-footer {
		height: 98rpx;
		margin-top: -98rpx;
		border-top: 1rpx solid #e2e2e2;
		background-color: #ffffff;
		padding: 0 24rpx;
		text-align: right;
		justify-content: flex-end;
	}

	.copy-btn {
		width: 41rpx;
		height: 21rpx;
		line-height: 19rpx;
		text-align: center;
		border: 1rpx solid rgba(97, 97, 97, .4);
		opacity: 0.4;
		border-radius: 4rpx;
		font-size: 14rpx;
	}
	
	.express-insurance {
		padding: 0 12rpx;
		height: 37rpx;
		line-height: 35rpx;
		border: 1rpx solid #F23005;
		border-radius: 6rpx;
		color: #F23005;
		font-size: 24rpx;
	}
</style>
