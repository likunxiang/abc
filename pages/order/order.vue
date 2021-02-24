<template>
	<view class="order-order">
		<!--公共开始 -->
		<common></common>
		<!-- 公共结束 -->

		<!-- 主体部分开始 -->

		<view class="body after-navber">
			<view class="myheader" :style="'height:calc( 77rpx + ' + (customBar + 'px') + ')'">
				<view class="guding">
					<view :style="'height:' + ('' + customBar + 'px') + ';padding-top:' + (statusBar + 'px')" class="header-content">
						<view @tap="goback" class="goback iconfont icon-zuojiantoubeifen"></view>
						<view class="header-input" :style="'height:' + ( custom.height + 'px' ) + ';border-radius:' + ( custom.height/2 + 'px') + ';'">
							<!-- <view class="header-input" :style="'height:' + ( customBar - statusBar  + 'px' ) + ';border-radius:' + ( (customBar - statusBar)/2 + 'px') + ';'"> -->
							<text class="input-before iconfont icon-sousuo"></text>
							<input placeholder="搜索我的订单" :value="keyword" @input="inputChange" @blur="inputBlur"></input>
							<text @tap="deleteInput" v-if="keyword!=''" class="input-after iconfont icon-guanbi"></text>
						</view>
					</view>

					<!-- <navigator class="return-index-btn" open-type="redirect" wx:if="{{show_index}}" url="/pages/index/index">
		        <image src="{{__wxapp_img.nav.index.url}}" style="width: 50rpx;height: 50rpx"></image>
		    </navigator> -->

					<view class="flex-row tab-bar justify-between ">

						<view @tap="changeNav" data-status="-1" :class="'nav-item pr ' + (status==-1?'active':'')">
							<view>全部订单</view>
							<view class="under-line" v-if="status==-1?'active':''"></view>
						</view>

						<view @tap="changeNav" data-status="0" :class="'nav-item pr ' + (status==0?'active':'')">
							<view>待付款</view>
							<view class="under-line" v-if="status==0?'active':''"></view>
							<view class="num-box" v-if="orderAll.statistics.is_pay>0">{{orderAll.statistics.is_pay}}</view>
						</view>

						<view @tap="changeNav" data-status="1" :class="'nav-item pr ' + (status==1?'active':'')">
							<view>待发货</view>
							<view class="under-line" v-if="status==1?'active':''"></view>
							<view class="num-box" v-if="orderAll.statistics.is_send>0">{{orderAll.statistics.is_send}}</view>
						</view>

						<view @tap="changeNav" data-status="2" :class="'nav-item pr ' + (status==2?'active':'')">
							<view>待收货</view>
							<view class="under-line" v-if="status==2?'active':''"></view>
							<view class="num-box" v-if="orderAll.statistics.to_be_received>0">{{orderAll.statistics.to_be_received}}</view>
						</view>

						<view @tap="changeNav" data-status="3" :class="'nav-item pr ' + (status==3?'active':'')">
							<view>已完成</view>
							<view class="under-line" v-if="status==3?'active':''"></view>
							<view class="num-box" v-if="orderAll.statistics.is_confirm>0">{{orderAll.statistics.is_confirm}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="order-list pr plr-24">
				<!-- 取消遮罩层 -->
				<view class="cancel-zhezhao" :style="'height: ' + y + 'px;'" catchtouchmove="true" v-if="isCancelOrder">
					<view class="cancel-content">
						<view class="mb-10 flex-x-center">取消订单</view>
						<view class="mt-30 fs-28 color-595959">
							<view class="mb-20">请选择取消订单的原因（必填）：</view>
							<view v-for="(value, key) in cancelCauseList" :key="key" class="flex ns-align-items-flex-center mb-20"
							 :data-index="key" :data-text="value" @tap="chooseCause">
								<image style="width: 27rpx;height: 27rpx;" mode="widthFix" :src="key==cancelIns?'/static/images/icon-choose.png':'/static/images/icon-choose-no.png'"></image>
								<view class="ml-20">{{value}}</view>
							</view>
						</view>
						<view class="fs-28 color-8D8D8D" style="padding-top: 16rpx;">注：订单一旦取消，无法恢复</view>
						<view class="cancel-btn-content flex ns-justify-content-space-between">
							<view class="cancel-btn bg-FACD9D" @tap="cancelCancelOrder">再想想</view>
							<view class="cancel-btn" @tap="cancelOrder">确认取消</view>
						</view>
					</view>
				</view>
				<!-- 提醒发货 遮罩层-->
				<view class="cancel-zhezhao flex-x-center flex-y-center color-2C2C2C" :style="'height: ' + y + 'px;'"
				 catchtouchmove="true" v-if="isRemind" @tap="closeRemind">
					<view class="remind-content fs-28">
						<view class="flex-x-center ns-text-bold">正在为您加急发货</view>
						<view class="mt-20 ">
							<view class="flex-x-center">开启发货提醒</view>
							<view class="flex-x-center">第一时间收到物流发货消息</view>
						</view>
						<view class="remind-btn" @tap="remindBtn">开启发货提醒</view>
					</view>
				</view>
				<!-- 提货码 遮罩层-->
				<view class="cancel-zhezhao flex-x-center flex-y-center color-2C2C2C " :style="'height: ' + y + 'px;'"
				 catchtouchmove="true" v-if="is_code">
					<view class="pick-code-content fs-28 pr">
						<view class="pick-header">
							<view>提货码</view>
							<view style="margin-top: 12rpx;">{{pickName}}</view>
						</view>
						<view class="pick-main ">
							<view class="flex-x-center fs-40 color-4A4A4A">编号-{{codeNo}}</view>
							<view class="code-box">
								<image style="width: 300rpx;height: 300rpx;" :src="qrcode_pic"></image>
							</view>
							<view class="fs-30 color-9B9B9B mt-10 flex-x-center">请出示提货码后提货</view>
						</view>
						<view class="pick-close flex-x-center">
							<view class="iconfont icon-guanbi fs-50 color-fff" @tap="closePickCode"></view>
						</view>
					</view>

				</view>
				<!-- 订单部分 -->
				<view v-for="(order, orderIndex) in order_list" :key="orderIndex" v-if="order_list.length>0">
					<!-- 待付款 样式-->
					<view class="order-list-no-pay" v-if="order.is_pay=='0'">
						<view class="order-list-no-pay-header flex ns-justify-content-space-between pr">
							<view class="fs-24 color-595959">{{order.addtime}}</view>
							<view class="fs-24 color-FF3F19" v-if="order.is_pay=='0' && order.is_cancel=='0'">等待付款</view>
							<view class="fs-24 color-FF3F19" v-if="order.is_cancel=='1'">已取消</view>
							<!-- 优惠券相关 -->
							<navigator :url="'/member/mchMean/mchMean?id=' + order.check_wait_sub + '&mchID=' + order.check_wait_sub " v-if="order.check_wait_sub" class="flex align-center" style="position: absolute;left: 265rpx;bottom: -16rpx;">
								<image class="discounts-pic" :src="logo_gift" mode="aspectFit"></image>
							</navigator>
						</view>
						<navigator v-for="(packList, index) in order.pack_list" :key="index" :url="'/pages/order-detail/order-detail?order_id=' + order.order_id + '&status=1'"
						 class="order-list-no-pay-body">
							<view v-for="(goodsList, index2) in packList.list" :key="index2" class="flex mb-20">
								<image class="ns-flex-shrink-no" style="width: 200rpx;height: 200rpx;border-radius: 14rpx;" mode="aspectFill"
								 :src="goodsList.goods_pic"></image>
								<view style="padding-left: 19rpx;" class="flex1">
									<view class="flex ns-justify-content-space-between">
										<view style="width: 300rpx;">
											<view class="ns-text-limit2 fs-30 color-333333">{{goodsList.goods_name}}</view>
											<view class="fs-24 color-999999 flex ns-wrap " style="margin-top: 16rpx;">
												<view v-for="(attr, index) in goodsList.attr_list" :key="index" class="mr-10 ns-text-limit">
													{{attr.attr_group_name}}: {{attr.attr_name}}
												</view>
											</view>
										</view>
										<view class="ns-text-right">
											<view class="price fs-20 color-333333 text-bold">¥
												<text class="fs-30">{{filters.priceStr(goodsList.price)[0]}}.</text>
												<text>{{filters.priceStr(goodsList.price)[1]}}</text>
											</view>
											<view style="font-size: 24rpx;color: #999999;margin-top: 5rpx;">x {{goodsList.num}}</view>
											<!-- <block wx:if='{{goodsList.zt_status}}'>
									 			<view class="fs-24 color-489A19" wx:if="{{goodsList.zt_status && goodsList.zt_status==1}}">进行中</view>
									 			<view class="fs-24 color-F49E3A" wx:else>团购失败</view>
									 		</block> -->
											<!-- <block wx:else>
									 			<view class="fs-24 {{goodsList.status==7?'color-489A19':'color-F49E3A'}}">{{goodsList.status_text}}</view>
									 		</block> -->
										</view>
									</view>
								</view>
							</view>
						</navigator>
						<!-- <view class="order-list-no-pay-footer flex ns-justify-content-space-between">
							<view></view>
							<view>
								<view class="fs-24 color-333333">共 {{order.detail_count}} 款商品 应付总额
									<text class="fs-24">¥ <text>{{filters.priceStr(order.total_price)[0]}}.</text>
										<text>{{filters.priceStr(order.total_price)[1]}}</text>
									</text>
								</view>
							</view>
						</view> -->
						<view class="fs-24 color-333333 flex justify-end plr-24" style="padding-bottom: 33rpx;">
							<view>
								<text>总额：</text>
								<text class="fs-20">¥ <text class="fs-30 ns-text-bold">{{filters.priceStr(order.all_price)[0]}}.</text>
									<text class="ns-text-bold">{{filters.priceStr(order.all_price)[1]}}</text></text>
							</view>
							<view style="margin-left: 46rpx;">
								<text>津贴抵扣：</text>
								<text class="fs-20">¥ <text class="fs-30 ns-text-bold">{{filters.priceStr(order.ysb)[0]}}.</text>
									<text class="ns-text-bold">{{filters.priceStr(order.ysb)[1]}}</text></text>
							</view>
							<view style="margin-left: 47rpx;">
								<text>实付：</text>
								<text class="fs-20">¥ <text class="fs-30 ns-text-bold">{{filters.priceStr(order.total_price)[0]}}.</text>
									<text class="ns-text-bold">{{filters.priceStr(order.total_price)[1]}}</text></text>
							</view>
						</view>
						<view class="order-list-no-pay-btn flex ns-row-reverse">
							<view class="order-list-btn order-list-btn-yellow" @tap="orderPay" v-if="order.is_pay=='0' && order.is_cancel=='0'"
							 :data-id="order.order_id" :data-index="orderIndex">去支付
							</view>
							<view class="order-list-btn" v-if="order.is_pay=='0' && order.is_cancel=='0'" :data-id="order.order_id" @tap="orderRevoke">取消订单
							</view>
							<!-- <view class="pt-20 fs-28 color-489A19" wx:if="{{true}}">团购失败，等待退款</view> -->
						</view>
					</view>

					<!-- 已付款 样式 -->
					<view class="order-list-pay" v-if="order.is_pay=='1'">
						<view class="order-list-no-pay-header pr flex justify-between">
							<view class="fs-24 color-595959">{{order.addtime}}</view>
							<!-- 优惠券相关 -->
							<navigator :url="'/member/mchMean/mchMean?id=' + order.check_wait_sub + '&mchID=' + order.check_wait_sub" v-if="order.check_wait_sub"
							 class="flex align-center" style="position: absolute;left: 265rpx;bottom: -16rpx;">
								<image class="discounts-pic" :src="logo_gift" mode="aspectFit"></image>
							</navigator>
							<view class="fs-24 color-FF3F19" v-if="order.is_cancel=='1'">已取消</view>
						</view>

						<view v-for="(packList, index) in order.pack_list" :key="index" class="order-list-pay-body">
							<!-- <view class="flex ns-justify-content-space-between" style="margin-bottom: 15rpx;" wx:if="{{packList.express && packList.express != 'zt_order'}}">
								<view class="fs-24 color-595959 ns-text-bold" wx:if="{{!packList.express}}">出库中</view>
								<view class="fs-24 color-595959 ns-text-bold ns-text-limit" style="width: 600rpx;">物流单号：{{packList.express_no}}</view>
								<view class="fs-24 color-F49E3A">{{packList.status_text}}</view>
							</view> -->
							<navigator v-for="(goodsList, index2) in packList.list" :key="index2" :url="status==4?'/pages/order-refund-detail/order-refund-detail?id='+goodsList.order_refund_id:'/pages/order-detail/order-detail?order_id='+order.order_id+'&status='+ packList.status"
							 class="flex mb-20 ">
								<image class="ns-flex-shrink-no" style="width: 200rpx;height: 200rpx;border-radius: 14rpx;" mode="aspectFill"
								 :src="goodsList.goods_pic"></image>
								<view class="flex1 flex ns-justify-content-space-between" style="margin-left: 20rpx;">
									<view style="width: 300rpx;">
										<view class="ns-text-limit2 fs-30 color-333333">{{goodsList.goods_name}}</view>
										<view class="fs-24 color-999999 flex ns-wrap " style="margin-top: 10rpx;">
											<view v-for="(attr, index) in goodsList.attr_list" :key="index" class="mr-10 ns-text-limit">
												{{attr.attr_group_name}}: {{attr.attr_name}}
											</view>
										</view>
									</view>
									<view class="ns-text-right">
										<view class="price fs-20 color-333333 text-bold">¥
											<text class="fs-30">{{filters.priceStr(goodsList.total_price)[0]}}.</text>
											<text>{{filters.priceStr(goodsList.total_price)[1]}}</text>
										</view>
										<view style="font-size: 24rpx;color: #999999;margin-top: 5rpx;">x {{goodsList.num}}</view>
										
										<view class="fs-24 color-F49E3A" v-if="goodsList.status==4 || goodsList.status==10 || goodsList.status==11">{{goodsList.status_text}}</view>
										<!-- <block wx:if='{{goodsList.zt_status}}'>
											<view class="fs-24 color-489A19" wx:if="{{goodsList.zt_status && goodsList.zt_status==1}}">进行中</view>
											<view class="fs-24 color-F49E3A" wx:else>团购失败</view>
										</block>
										<block wx:else>
											<view class="fs-24 {{goodsList.status==7?'color-489A19':'color-F49E3A'}}">{{goodsList.status_text}}</view>
										</block> -->

										<!-- <navigator class="order-list-btn" style="margin-left: 0;" wx:if="{{goodsList.status==1}}" url="/pages/order-refund/order-refund?id={{goodsList.order_detail_id}}&status=3">申请退款
										</navigator>
										<navigator class="order-list-btn" style="margin-left: 0;" wx:if="{{goodsList.status==2}}" url="/pages/order-refund/order-refund?id={{goodsList.order_detail_id}}&status=1">申请售后
										</navigator>
										<navigator class="order-list-btn" style="margin-left: 0;" wx:if="{{goodsList.status==3}}" url="/pages/order-refund/order-refund?id={{goodsList.order_detail_id}}&status=4">申请退货
										</navigator> -->
									</view>
								</view>
							</navigator>

							<view class="flex ns-row-reverse align-center">
								<view class="order-list-btn" v-if="!packList.express && packList.status==1" @tap="openRemind" :data-id="order.order_no"
								 :data-index="orderIndex">提醒发货
								</view>
								<view v-if="packList.express && (packList.status==2 || packList.status==3) && packList.express != 'zt_order'">
									<navigator class="order-list-btn" :url="'/pages/express-detail/express-detail?id=' + packList.order_detail_id">查看物流</navigator>
								</view>
								<view class="order-list-btn" v-if="packList.express && packList.status==2" @tap="orderConfirm" :data-id="packList.order_detail_id">确认收货
								</view>
								<view class="order-list-btn order-list-btn-yellow" v-if="packList.express && packList.is_send==1 && packList.express == 'zt_order'"
								 @tap="openPickCode" :data-id="packList.order_id">
									<view>提货码</view>
								</view>
								<view class="order-list-btn" v-if="packList.status==3">
									<navigator url="/pages/guanyiguan/guanyiguan">逛一逛</navigator>
								</view>
								
								<view class="fs-24 color-F49E3A">{{packList.status_text}}</view>
							</view>
						</view>
						<!-- <view class="order-list-pay-footer flex ns-justify-content-space-between">
							<view></view>
							<view>
								<view class="fs-20">共 {{order.detail_count}} 款商品 应付总额
									<text class="color-C10000">¥ {{order.total_price}}</text>
								</view>
							</view>
						</view> -->
						<view class="fs-24 color-333333 flex justify-end plr-24" style="padding-bottom: 33rpx;">
							<view>
								<text>总额：</text>
								<text class="fs-20">¥ <text class="fs-30 ns-text-bold">{{filters.priceStr(order.all_price)[0]}}.</text>
									<text class="ns-text-bold">{{filters.priceStr(order.all_price)[1]}}</text></text>
							</view>
							<view style="margin-left: 46rpx;">
								<text>津贴抵扣：</text>
								<text class="fs-20">¥ <text class="fs-30 ns-text-bold">{{filters.priceStr(order.ysb)[0]}}.</text>
									<text class="ns-text-bold">{{filters.priceStr(order.ysb)[1]}}</text></text>
							</view>
							<view style="margin-left: 47rpx;">
								<text>实付：</text>
								<text class="fs-20">¥ <text class="fs-30 ns-text-bold">{{filters.priceStr(order.total_price)[0]}}.</text>
									<text class="ns-text-bold">{{filters.priceStr(order.total_price)[1]}}</text></text>
							</view>
						</view>
					</view>
				</view>
				<view v-if="order_list==0" class="flex flex-x-center">
					<view style="padding-top: 108rpx;">
						<view class="empty-order-icon text-center marginAuto ">
							<view class="iconfont icon-icon color-fff" style="opacity: 0.5;font-size: 180rpx;"></view>
						</view>
						<view class="fs-30 color-999999" style="margin-top: 49rpx;">空空如也，这里什么也没有</view>
						<navigator url="/pages/index/index" open-type="redirect" class="to-home">马上去购物
						</navigator>
					</view>

				</view>
			</view>

		</view>

		<!-- 主体部分结束 -->

	</view>
</template>

<script>
	// order.js
	var app = getApp();
	var api = getApp().api;
	var is_no_more = false;
	var is_loading = false;
	var p = 2;

	export default {
		data() {
			return {
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				y: uni.getSystemInfoSync().windowHeight,
				status: -1,
				order_list: [],
				show_no_data_tip: true,
				hide: 1,
				qrcode: "",
				cancelCauseList: [],
				isCancelOrder: false,
				cancelIns: -1,
				order_id: 0,
				isRemind: false,
				orderAll: {
					statistics: {
						is_pay: 0,
						is_send: 0,
						to_be_received: 0,
						is_confirm: 0,
					}

				},
				page: 1,
				stopLoadMore: false,
				refundId: uni.getStorageSync('refundId'),
				sendId: uni.getStorageSync('sendId'),
				keyword: '', //搜索值
				options: "",
				status_0: "",
				show_index: false,
				is_code: false,
				qrcode_pic: "",
				pickName: "",
				codeNo: "",
				count: "",
				pay_type_list: "",
				cancelText: "",
				filters: require('../../utils/filters.js'),
				logo_gift: uni.getStorageSync('_img').logo_gift

			};
		},

		components: {},

		onLoad: function(options) {
			this.getApp().page.onLoad(this, options);
			var self = this;
			is_no_more = false;
			is_loading = false;
			p = 2;
			let status_0 = 0;

			if (options.status_0) {
				status_0 = options.status_0;
			}

			self.setData({
				options: options,
				status_0: status_0
			});
			self.loadOrderList(options.status || -1);
			var pages = getCurrentPages();

			if (pages.length < 2) {
				self.setData({
					show_index: true
				});
			}
		},
		onReachBottom: function() {
			var self = this; // if (is_loading || is_no_more)
			// 	return;
			// is_loading = true;

			var page = self.page;

			if (self.stopLoadMore == true) {
				return;
			}

			++page;
			self.setData({
				page: page
			});
			uni.showLoading({
				title: '加载中'
			});
			this.getApp().request({
				url: this.getApp().api.order.detail_list,
				data: {
					status: self.status,
					page: page,
					keyword: self.keyword
				},
				success: function(res) {
					if (res.code == 0) {
						var order_list = self.order_list.concat(res.data.list);

						if (res.data.list.length == 0) {
							self.setData({
								stopLoadMore: true
							});
							return;
						}

						self.setData({
							order_list: order_list,
							pay_type_list: res.data.pay_type_list
						});
					}
				},
				complete: function() {
					uni.hideLoading();
					is_loading = false;
				}
			});
		},
		onShow: function() {
			this.getApp().page.onShow(this);
		},

		onPullDownRefresh() {
			var status = this.status;
			this.loadOrderList(status);
			this.setData({
				page: 1
			});
		},

		methods: {
			openPickCode(e) {
				this.setData({
					is_code: true
				});
				var pick_order_id = e.currentTarget.dataset.id;
				this.getApp().request({
					url: this.getApp().api.group.pick_qrcode,
					data: {
						userId: uni.getStorageSync('USER_INFO').id,
						order_id: pick_order_id
					},
					success: res => {
						if (res.code == 0) {
							this.setData({
								qrcode_pic: res.data.qrcode_pic,
								pickName: res.data.zt_address_data.dispatching_name,
								codeNo: res.data.order_id
							});
						} else {
							uni.showModal({
								title: res.msg,
								showCancel: false
							});
						}
					}
				});
			},

			closePickCode() {
				this.setData({
					is_code: false
				});
			},

			buyAgain: function(e) {
				var self = this;
				var order_no = e.currentTarget.dataset.no;
				this.getApp().request({
					url: this.getApp().api.order.buy_again,
					method: 'POST',
					data: {
						order_no: order_no
					},
					success: function(res) {
						if (res.code == 0) {}
					}
				});
				uni.navigateTo({
					url: '/pages/cart/cart'
				});
			},
			loadOrderList: function(status) {
				if (status == undefined) status = -1;
				var self = this;
				self.setData({
					status: status
				});
				uni.showLoading({
					title: "正在加载",
					mask: true
				});
				var data = {
					status: self.status,
					keyword: self.keyword
				};
				var options = self.options;

				if (typeof self.options.order_id !== 'undefined') {
					data.order_id = self.options.order_id;
				}

				this.getApp().request({
					url: this.getApp().api.order.detail_list,
					data: data,
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								order_list: res.data.list,
								orderAll: res.data,
								cancelCauseList: res.data.cancel_order_options,
								// pay_type_list: res.data.pay_type_list
								count: res.data.row_count
							});
							var item = uni.getStorageSync(self.getApp().const.ITEM);

							if (item) {
								uni.removeStorageSync(self.getApp().const.ITEM);
							}
						}

						if (self.order_list) {
							self.setData({
								show_no_data_tip: self.order_list.length == 0
							});
						}
					},
					complete: function() {
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				});
			},

			/**
			 * 已废弃
			 * 新支付接口在/commons/order-pay/order-pay.js
			 */
			orderPay_1: function(e) {
				var self = this;
				var pay_type_list = self.pay_type_list;
				if (pay_type_list.length == 1) {
					uni.showLoading({
						title: "正在提交",
						mask: true
					});

					if (pay_type_list[0]['payment'] == 0) {
						self.WechatPay(e);
					}

					if (pay_type_list[0]['payment'] == 3) {
						self.BalancePay(e);
					}
				} else {
					uni.showModal({
						title: '提示',
						content: '选择支付方式',
						cancelText: '余额支付',
						confirmText: '线上支付',
						success: function(res) {
							uni.showLoading({
								title: "正在提交",
								mask: true
							});

							if (res.confirm) {
								self.WechatPay(e);
							} else if (res.cancel) {
								self.BalancePay(e);
							}
						}
					});
				}
			},
			// 提醒发货按钮
			openRemind: function(e) {
				var self = this;
				uni.showLoading({
					title: "操作中"
				});
				this.getApp().request({
					url: this.getApp().api.order.urge_send,
					data: {
						order_no: e.currentTarget.dataset.id
					},
					success: function(res) {
						uni.hideLoading();
						self.setData({
							isRemind: true
						});
					}
				});
			},
			// 开去发货提醒按钮
			remindBtn: function() {
				var self = this;
				//#ifdef MP-WEIXIN
				wx.requestSubscribeMessage({
					tmplIds: [self.sendId, self.refundId],
					success: function(res) {}
				});
				//#endif
				self.setData({
					isRemind: false
				});
			},
			closeRemind: function() {
				var self = this;
				self.setData({
					isRemind: false
				});
			},
			WechatPay: function(e) {
				this.getApp().request({
					url: this.getApp().api.order.pay_data,
					data: {
						order_id: e.currentTarget.dataset.id,
						pay_type: "WECHAT_PAY"
					},
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
														url: "/pages/order/order?status=0"
													});
												}
											}
										});
										return;
									}

									uni.redirectTo({
										url: "/pages/order/order?status=1"
									});
								}
							});
						}

						if (res.code == 1) {
							uni.showToast({
								title: res.msg,
								image: "/static/images/icon-warning.png"
							});
						}
					}
				});
			},
			BalancePay: function(e) {
				this.getApp().request({
					url: this.getApp().api.order.pay_data,
					data: {
						order_id: e.currentTarget.dataset.id,
						pay_type: "BALANCE_PAY"
					},
					complete: function() {
						getApp().core.hideLoading();
					},
					success: function(res) {
						if (res.code == 0) {
							uni.redirectTo({
								url: "/pages/order/order?status=1"
							});
						}

						if (res.code == 1) {
							uni.showModal({
								title: '提示',
								content: res.msg,
								showCancel: false
							});
						}
					}
				});
			},
			orderRevoke: function(e) {
				var self = this;
				this.setData({
					isCancelOrder: true,
					order_id: e.currentTarget.dataset.id
				});
			},
			chooseCause: function(e) {
				var self = this;
				var index = e.currentTarget.dataset.index;
				var text = e.currentTarget.dataset.text;
				var ins = self.cancelIns;
				self.setData({
					cancelIns: index,
					cancelText: text
				});
			},
			cancelOrder: function() {
				var self = this;
				var ins = self.cancelIns;

				if (ins == '-1') {
					uni.showModal({
						title: "提示",
						content: '请选择原因'
					});
				} else {
					uni.showLoading({
						title: "操作中"
					});
					this.getApp().request({
						url: this.getApp().api.order.revoke,
						data: {
							order_id: self.order_id,
							cancel_order_options: self.cancelText
						},
						success: function(res) {
							self.setData({
								isCancelOrder: false,
								cancelIns: -1
							});
							uni.hideLoading();
							uni.showModal({
								title: "提示",
								content: res.msg,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										self.loadOrderList(self.status);
									}
								}
							});
						}
					});
				}
			},
			cancelCancelOrder: function() {
				this.setData({
					isCancelOrder: false
				});
			},
			orderConfirm: function(e) {
				var self = this;
				uni.showModal({
					title: "提示",
					content: "是否确认已收到货？",
					cancelText: "否",
					confirmText: "是",
					success: (res) => {
						if (res.cancel) return true;

						if (res.confirm) {
							uni.showLoading({
								title: "操作中"
							});
							this.getApp().request({
								url: this.getApp().api.order.confirm,
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
			},
			orderQrcode: function(e) {
				var self = this;
				var order_list = self.order_list;
				var index = e.target.dataset.index;
				uni.showLoading({
					title: "正在加载",
					mask: true
				});

				if (self.order_list[index].offline_qrcode) {
					self.setData({
						hide: 0,
						qrcode: self.order_list[index].offline_qrcode
					});
					uni.hideLoading();
				} else {
					this.getApp().request({
						url: this.getApp().api.order.get_qrcode,
						data: {
							order_no: order_list[index].order_no
						},
						success: function(res) {
							if (res.code == 0) {
								self.setData({
									hide: 0,
									qrcode: res.data.url
								});
							} else {
								uni.showModal({
									title: '提示',
									content: res.msg
								});
							}
						},
						complete: function() {
							uni.hideLoading();
						}
					});
				}
			},
			hideFun: function(e) {
				this.setData({
					hide: 1
				});
			},
			changeNav: function(e) {
				let status = e.currentTarget.dataset.status;
				this.setData({
					status: status,
					stopLoadMore: false,
					page: 1
				});
				this.loadOrderList(status);
			},

			//input值改变
			inputChange(e) {
				//console.log(e.detail.value);
				this.setData({
					keyword: e.detail.value
				});
			},

			//input失去焦点
			inputBlur(e) {
				//console.log('失去焦点');
				if (this.keyword) {}

				this.setData({
					page: 1
				}); //执行条件搜索

				this.loadOrderList(this.status);
			},

			//删除input值
			deleteInput(e) {
				this.setData({
					keyword: ''
				});
				this.setData({
					page: 1
				}); //执行条件搜索

				this.loadOrderList(this.status);
			},

			//返回
			goback() {
				var pageRoute = getCurrentPages();
				var routeLength = getCurrentPages().length;
				var frontRoute = pageRoute[routeLength - 2].route;

				if (frontRoute == 'pages/cart/cart') {
					wx.redirectTo({
						url: '/pages/cart/cart'
					});
				} else {
					wx.navigateBack({
						delta: 1
					});
				}
			}

		}
	};
</script>

<style>
	/* order.wxss */
	.discounts-pic {
		width: 70rpx;
		height: 68rpx;
	}

	.discounts-text {
		font-size: 24rpx;
		font-family: HuXiaoBo-NanShen;
		color: #FC681A;
	}

	@keyframes swing {
		10% {
			transform: rotate(15deg);
		}

		20% {
			transform: rotate(-10deg);
		}

		30% {
			transform: rotate(5deg);
		}

		40% {
			transform: rotate(-5deg);
		}

		50%,
		100% {
			transform: rotate(0deg);
		}
	}

	.discounts-pic {
		transform-origin: bottom center;
		animation: swing 6s .15s linear infinite;
		width: 70rpx;
		height: 68rpx;
	}

	.tab-bar {
		background: #fff;
		position: relative;
		/* top: 0;
	left: 0; */
		width: 100%;
		height: 77rpx;
		line-height: 77rpx;
		z-index: 1000;
		padding: 0 24rpx;
	}

	.tab-bar~.order-list {
		padding: 0 24rpx;
		padding-top: 93rpx;
	}

	.tab-bar navigator {
		text-align: center;
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

	.num-box {
		width: 30rpx;
		height: 30rpx;
		background: #FF401A;
		border-radius: 50%;
		font-size: 24rpx;
		text-align: center;
		line-height: 30rpx;
		color: #fff;
		position: absolute;
		top: 10rpx;
		right: -10rpx;
	}

	.tab-bar .nav-item {
		font-size: 30rpx;
		height: 77rpx;
		line-height: 77rpx;
		color: #999999;
	}

	.tab-bar .nav-item.active {
		color: #333333;
		font-size: 30rpx;
		font-weight: 600;
	}

	.under-line {
		position: absolute;
		bottom: 0rpx;
		left: 50%;
		margin-left: -22rpx;
		width: 44rpx;
		height: 8rpx;
		background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
		border-radius: 4rpx;
	}


	/* v 1.1 */

	.order-list-no-pay {
		padding-bottom: 30rpx;
		background-color: #fff;
		margin-bottom: 16rpx;
		border-radius: 20rpx;
	}

	.order-list-pay {
		background-color: #fff;
		margin-bottom: 16rpx;
		border-radius: 20rpx;
	}

	.order-list-no-pay-header {
		padding: 24rpx 25rpx 0;
		font-size: 24rpx;
		color: #999999;
	}

	.order-list-no-pay-body {
		padding: 20rpx 30rpx 0;
	}

	.order-list-pay-body {
		padding: 32rpx 24rpx;
	}

	.order-list-no-pay-footer {
		margin-top: 41rpx;
		padding: 0 30rpx;
	}

	.order-list-pay-footer {
		padding: 20rpx 30rpx;
	}

	.order-list-no-pay-btn {
		padding: 0 30rpx;
	}

	.order-list-btn {
		margin-left: 17rpx;
		width: 136rpx;
		height: 51rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 23rpx;
		text-align: center;
		line-height: 49rpx;
		font-size: 24rpx;
		color: #333333;
		border: 1px solid rgba(153, 153, 153, 0.1);
	}

	.order-list-btn-yellow {
		color: #FF401A;
		border: 1rpx solid rgba(255, 64, 26, 0.5);
	}


	/* 遮罩 */

	.cancel-zhezhao {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		padding: 40rpx 100rpx;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.35);
	}

	.cancel-content {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		height: 612rpx;
		border-radius: 8rpx 8rpx 0px 0px;
		padding: 30rpx 53rpx;
	}

	.cancel-btn-content {
		position: absolute;
		bottom: 42rpx;
		left: 0;
		right: 0;
		padding: 0 40rpx;
		width: 100%;
	}

	.cancel-btn {
		width: 325rpx;
		height: 78rpx;
		background: #F39E3B;
		text-align: center;
		line-height: 78rpx;
		color: #fff;
	}

	.bg-FACD9D {
		background: #FACD9D;
	}

	.remind-content {
		width: 508rpx;
		height: 302rpx;
		background: #fff;
		border-radius: 20rpx;
		padding: 46rpx 32rpx 39rpx;
	}

	.remind-btn {
		margin: 36rpx auto 0;
		text-align: center;
		width: 308rpx;
		height: 63rpx;
		line-height: 63rpx;
		color: #fff;
		background: #F49E37;
		border-radius: 30rpx;
	}

	.pick-code-content {
		width: 512rpx;
		background: #fff;
		border-radius: 13rpx;
		box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.5);
	}

	.pick-header {
		padding: 20rpx 0;
		background-color: #489A19;
		text-align: center;
		color: #FFFFFF;
		font-size: 30rpx;
		border-radius: 13rpx 13rpx 0 0;
	}

	.pick-main {
		padding: 37rpx 100rpx 47rpx;
	}

	.code-box {
		width: 312rpx;
		height: 312rpx;
		background-color: #fff;
	}

	.pick-close {
		position: absolute;
		bottom: -100rpx;
		left: 0;
		height: 58rpx;
		width: 100%;
	}


	/* sdfdsf */

	.myheader {
		overflow: hidden;
		margin-bottom: 20rpx;
	}

	.guding {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		background-color: #fff;
		box-sizing: border-box;
		z-index: 999;
	}

	.header-content {
		display: flex;
		align-items: center;
	}

	.goback {
		padding-left: 25rpx;
		padding-right: 20rpx;
	}

	.header-input {
		width: 460rpx;
		display: flex;
		align-items: center;
		background-color: #F4F4F4;
	}

	.header-input .input-before {
		color: #616161;
		padding: 0 16rpx 0 16rpx;
	}

	.header-input input {
		flex: 1;
	}

	.header-input .input-after {
		padding: 0 16rpx 0 16rpx;
	}
</style>
