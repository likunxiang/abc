<template>
	<view class="page p-24" v-if="isPageShow">
		<common></common>
		<view style="padding-bottom: 128rpx;min-height: 100%;">
			<view class="mb-20 public-box">
				<view class="fs-24 color-333333 ns-text-bold mb-30">商品清单</view>
				<view class="flex">
					<view class="mr-20">
						<image style="width: 200rpx;height: 200rpx;border-radius: 14rpx;" mode="aspectFill" :src="goods.goods_pic"></image>
					</view>
					<view class="flex ns-column justify-between">
						<view>
							<view class="fs-30 color-333333">{{goods.name}}</view>
							<view class="flex">
								<view class="fs-24 color-999999">
									<view v-for="(item, index) in goods.attr" :key="index" style="margin-right: 40rpx;">
										{{item.attr_group_name}}:{{item.attr_name}}
									</view>
								</view>
							</view>
						</view>
						<view class="fs-24 flex">
							<view class="color-999999">申请数量：<text class="color-333333">{{goods.num}}</text></view>
							<view style="margin-left: 33rpx;">退款金额：
								<text class="fs-20">￥<text class="fs-26">{{filters.priceStr(goods.total_price)[0]}}.</text><text>{{filters.priceStr(goods.total_price)[1]}}</text></text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="flex-row bg-white switch-tab mb-20">
	        <view wx:if="{{refund_status!=3}}" class="flex-grow-1 flex-x-center" bindtap="switchTab" data-id="1">
	            <text class="flex-y-center {{switch_tab_1}}">退货退款</text>
	        </view>
	        <view wx:if="{{refund_status!=4}}" class="flex-grow-1 flex-x-center" bindtap="switchTab" data-id="2">
	            <text class="flex-y-center {{switch_tab_2}}">退款</text>
	        </view>
	    </view> -->
			<!-- v1.10 申请售后改版 -->
			<block v-if="!refund_type_id">
				<view v-for="(item, index) in refundType" :key="index" :data-id="item.id" @tap="bindRefundType">
					<view class="public-box mb-20 flex justify-between align-center" v-if="item.id == 3">
						<view class="flex align-center">
							<view class="iconfont icon-tuikuan1 fs-50" style="color: #FF3F19;"></view>
							<view class="ml-24">
								<view class="color-000000 fs-30 ns-text-bold">我要退款（无需退货）</view>
								<view class="mt-15 fs-24 color-999999">没收到货：或者已通过协商同意不用退货只退款</view>
							</view>
						</view>
						<view class="iconfont icon-jinru fs-30"></view>
					</view>
					<view class="public-box mb-20 flex justify-between align-center" v-if="item.id == 1">
						<view class="flex align-center">
							<view class="iconfont icon-tuihuo fs-50" style="color: #FF851A;"></view>
							<view class="ml-24">
								<view class="color-000000 fs-30 ns-text-bold">我要退货退款</view>
								<view class="mt-15 fs-24 color-999999">已收到货，需要退还已收到的商品</view>
							</view>
						</view>
						<view class="iconfont icon-jinru fs-30"></view>
					</view>
				</view>
			</block>
			<!-- <view class="flex-row bg-white form-row ns-justify-content-space-between">
			<view>
				<text class="form-label">申请类型</text>
			</view>
			<picker mode="selector" bindchange="bindRefundChange" value="{{refundIndex}}" range="{{refundType}}" range-key="name">
				<view class="picker fs-24 color-999999">
					{{defaultRefundIndex==0?'请选择退款类型':refundType[refundIndex].name}}
				</view>
			</picker>
	
		</view>
	 -->
			<!-- 退货退款 -->
			<block v-else>
				<view class="public-box mb-20">
					<!-- <view class="flex-row bg-white form-row ns-justify-content-space-between">
					<view>
						<text class="form-label">申请类型</text>
					</view>
					<picker mode="selector" bindchange="bindRefundChange" value="{{refundIndex}}" range="{{refundType}}" range-key="name">
						<view class="picker fs-24 color-999999">
							{{defaultRefundIndex==0?'请选择退款类型':refundType[refundIndex].name}}
						</view>
					</picker>
			
				</view> -->
					<block v-if="sup_id == 16 && type == 3">
						<view class="flex-row bg-white form-row ns-justify-content-space-between">
							<view>
								<text class="form-label">收货状态</text>
							</view>
							<picker mode="selector" @change="bindPickStatus" :value="pickIndex" :range="pickStatus" range-key="name" :disabled="pickStatusDisabled">
								<view class="picker fs-24 color-999999">
									{{defaultPickIndex==0?'请选择退款类型':pickStatus[pickIndex].name}}
								</view>
							</picker>

						</view>
					</block>
					<block v-if="sup_id == 13 && refundId != 3 && show_jd">
						<view class="flex-row bg-white form-row ns-justify-content-space-between">
							<view class>
								<text class="form-label">包装情况</text>
							</view>
							<view class="fs-24 color-999999 flex ">
								<view v-for="(item, index) in packagingStatus" :key="index" class="flex justify-between ml-24" @tap="changePackaging"
								 :data-index="item.type">
									<view :class="'iconfont ' + (packagingIns==item.type?'icon-xuanzhong color-FFC330':'icon-weixuanzhong') + ' mr-10'"></view>
									<view>{{item.name}}</view>
								</view>
							</view>
						</view>
						<view class="flex-row bg-white form-row ns-justify-content-space-between">
							<view class>
								<text class="form-label">是否有包装</text>
							</view>
							<view class="fs-24 color-999999 flex">
								<view v-for="(item, index) in is_package" :key="index" class="flex justify-between ml-24" @tap="changePackage"
								 :data-index="item.type">
									<view :class="'iconfont ' + (packageIns==item.type?'icon-xuanzhong color-FFC330':'icon-weixuanzhong') + ' mr-10'"></view>
									<view>{{item.name}}</view>
								</view>
							</view>
						</view>
						<view class="flex-row bg-white form-row ns-justify-content-space-between">
							<view class>
								<text class="form-label">是否检测报表</text>
							</view>
							<view class="fs-24 color-999999 flex">
								<view v-for="(item, index) in is_check" :key="index" class="flex justify-between ml-24" @tap="changeCheck"
								 :data-index="item.type">
									<view :class="'iconfont ' + (checkIns==item.type?'icon-xuanzhong color-FFC330':'icon-weixuanzhong') + ' mr-10'"></view>
									<view>{{item.name}}</view>
								</view>
							</view>
						</view>
						<!-- <view class="flex-row bg-white form-row ns-justify-content-space-between">
					    <view class="">
					        <text class="form-label">取件方式</text>
					    </view>
					    <view class="fs-24 color-999999 flex">
					        <view class="flex justify-between ml-24" wx:for="{{sendWay}}" wx:key="key" bindtap="changeSendWay" data-index="{{item.type}}">
								<view class="iconfont {{sendWayIns==item.type?'icon-xuanzhong color-FFC330':'icon-weixuanzhong'}} mr-10"></view>
								<view>{{item.name}}</view>
							</view>
					    </view>
					</view> -->
						<view class="flex-row bg-white form-row ns-justify-content-space-between" v-if="false">
							<view class>
								<text class="form-label">到货方式</text>
							</view>
							<view class="fs-24 color-999999 flex">
								<view v-for="(item, index) in aog" :key="index" class="flex justify-between ml-24" @tap="changeAog" :data-index="item.type">
									<view :class="'iconfont ' + (aogWayIns==item.type?'icon-xuanzhong color-FFC330':'icon-weixuanzhong') + ' mr-10'"></view>
									<view>{{item.name}}</view>
								</view>
							</view>
						</view>
						<view class="flex-row bg-white form-row ns-justify-content-space-between">
							<view class="flex align-center">
								<text class="form-label">退款数量：</text>
								<block v-if="is_edit_num">
									<input type="text" :value="refund_num" @blur="inputNum" :focus="is_edit_num"></input>
								</block>
								<block v-else>
									<text class="fs-26 color-333333">{{refund_num}}</text>
								</block>
							</view>
							<view class="fs-24 color-999999" @tap="editNum">
								修改
							</view>
						</view>
					</block>
					<block v-else>
						<view class="flex-row bg-white form-row ns-justify-content-space-between">
							<view>
								<text class="form-label">退款原因</text>
							</view>
							<picker @change="bindTuiKuangChange" :value="returnIndex" :range="tuikuangCause" range-key="name">
								<view class="picker fs-24 color-999999">
									{{defaultTuiKuangIndex==0?'请选择退款原因':tuikuangCause[tuikuangIndex].name}}
								</view>
							</picker>

						</view>
					</block>

					<!-- <view class="flex-row bg-white form-row ns-justify-content-space-between">
				    <view >
				        <text class="form-label">退货原因</text>
				    </view>
				    <picker mode="selector" bindchange="bindReturnChange" value="{{returnIndex}}" range="{{returnCause}}" range-key="name">
				       <view class="picker fs-24 color-999999">
				         {{defaultReturnIndex==0?'请选择退款原因':returnCause[returnIndex].name}}
				       </view>
				     </picker>
					 
				</view> -->

					<view class="flex-row bg-white form-row ns-justify-content-space-between">
						<view class="flex align-center">
							<text class="form-label">退款金额：</text>
							<block v-if="is_edit_price">
								<input type="text" :value="refund_price" @blur="inputPrice" :focus="is_edit_price"></input>
							</block>
							<block v-else>
								<text class="fs-26 color-FF0200">￥{{refund_price}}</text>
							</block>
						</view>
						<view class="fs-24 color-999999" @tap="editPrice">
							修改
						</view>
					</view>
					<view class="bg-white form-row flex">
						<view class="mb-20">
							<text class="form-label">申请说明：</text>
						</view>
						<input type="text" @input="descInput" placeholder="选填"></input>
						<!-- <view class="">
				        <textarea style="width: 600rpx;padding: 20rpx;background: #F8F6F7;height: 180rpx;" rows="2" bindinput="descInput" data-type="1" placeholder="点击这里开始填写"></textarea>
				    </view> -->
					</view>
				</view>

				<view class="mb-20 public-box">
					<view class="mb-20">
						<text class="form-label">上传凭证（必填）</text>
					</view>
					<view class="image-list flex ns-wrap">
						<view v-for="(item, index) in refund_data.pic_list" :key="index" class="image-preview" :data-index="index">
							<text class="flex-x-center flex-y-center image-del" @tap="deleteImage" data-type="1" :data-index="index">×
							</text>
							<image :src="item" style="width: 160rpx;height: 160rpx" mode="aspectFill"></image>
						</view>
						<view v-if="!refund_data.pic_list||refund_data.pic_list.length<3" class="image-picker" @tap="chooseImage"
						 data-type="1">
							<view style="width: 160rpx;height: 160rpx;background: #F0EEEF; text-align: center;line-height: 160rpx;">
								<text class="iconfont icon-jiahao fs-40 color-fff"></text>
							</view>
						</view>
					</view>
					<view>{{refund_status == 1?'请上传任意一张照片':warn}}</view>
				</view>
			</block>

		</view>

		<block v-if="refund_type_id">
			<form report-submit="true" @submit="refundSubmit">
				<view class="flex">
					<navigator open-type="navigateBack" class="cancel-btn">
						<text>取消</text>
					</navigator>
					<button class="submit-btn" formType="submit">
						<text>提交</text>
					</button>
				</view>
			</form>
		</block>

	</view>
</template>


<script>
	var goodsRefund = require("../../components/goods/goods_refund.js");

	export default {
		data() {
			return {
				filters: require('../../utils/filters.js'),
				isPageShow: false,
				pageType: 'STORE',
				goods: {},
				refund_data: {},
				returnCause: [],
				reciveStatus: [],
				tuikuangCause: [],
				refundType: [{
					id: 1,
					name: "退货退款"
				}, {
					id: 3,
					name: "退款"
				}],
				defaultReturnIndex: 0,
				defaultReciveIndex: 0,
				defaultTuiKuangIndex: 0,
				defaultRefundIndex: 0,
				defaultPickIndex: 0,
				// returnIndex: 0,
				// reciveIndex: 0,
				// tuikuangIndex: 0,
				refund_status: 1,
				//退款类型
				refundId: uni.getStorageSync('refundId'),
				sendId: uni.getStorageSync('sendId'),
				packagingStatus: [{
					type: 0,
					name: '无包装'
				}, {
					type: 10,
					name: '包装完整'
				}, {
					type: 20,
					name: '包装破损'
				}],
				packagingIns: 0,
				is_package: [{
					type: 1,
					name: '是'
				}, {
					type: 0,
					name: '否'
				}],
				packageIns: 1,
				is_check: [{
					type: 1,
					name: '是'
				}, {
					type: 0,
					name: '否'
				}],
				checkIns: 0,
				sendWay: [{
					type: 4,
					name: '上门取件'
				}, {
					type: 40,
					name: '客户发货'
				}],
				sendWayIns: 4,
				aog: [{
					type: 10,
					name: '京东配送'
				}, {
					type: 20,
					name: '第三方物流'
				}],
				aogIns: 10,
				show_jd: true //用于判断  待发货 true是非待发货
					,
				refund_type_id: 0,
				switch_tab_1: "",
				switch_tab_2: "",
				refund_num: "",
				refund_price: "",
				warn: "",
				sup_id: "",
				is_edit_num: false,
				is_edit_price: false,
				returnIndex: "",
				reciveIndex: "",
				tuikuangIndex: "",
				pickIndex: "",
				type: "",
				tuikuangCause_16: "",
				pickStatus: "",
				order_detail_id: '',  // 售后id
				pickStatusDisabled: false, // 禁用收货状态
				pickStatusId: '',// 待发货，收货状态默认选中 "未收到货" 并不可重选
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.getApp().page.onLoad(this, options);
			var self = this;
			this.setData({
				refund_status: options.status,
			});

			if (options.refund_type_id) {
				this.setData({
					refund_type_id: 3,
					show_jd: false
				});
			}

			if (this.refund_status == 2) {
				self.setData({
					switch_tab_1: "",
					switch_tab_2: "active"
				});
			}
			

			uni.showLoading({
				title: '加载中'
			});
			this.getApp().request({
				url: this.getApp().api.order.refund_preview,
				data: {
					order_detail_id: options.id
				},
				success: function(res) {
					uni.hideLoading();

					if (res.code == 0) {
						// var sup_info = wx.getStorageSync('SUP_INFO',res.supp_info)
						// if (!sup_info) {
						// 	wx.setStorageSync('SUP_INFO',res.supp_info)
						// }
						// var sup_id = res.supp_id
						self.setData({
							goods: res.data,
							refund_num: res.data.num,
							refund_price: res.data.total_price,
							returnCause: res.data.reasons_for_return,
							order_detail_id: res.data.order_detail_id,
							// 退货原因
							reciveStatus: res.data.receipt_status,
							// 收货状态
							refundType: res.data.refund_type,
							warn: res.warn,
							isPageShow: true,
							sup_id: res.supp_id // 0 不是京东订单 1是京东订单

						});
						// 待发货，收货状态默认选中 "未收到货" 并不可重选
						if (self.refund_status == 1 && self.sup_id == 16) {
							
							self.defaultPickIndex = 1,
							self.pickIndex = 1
							self.pickStatusDisabled = true
							self.pickStatusId = 2
						}
						self.getReasonList();
					}

					if (res.code == 1) {
						uni.showModal({
							title: "提示",
							content: res.msg,
							image: "/static/images/icon-warning.png",
							success: function(res) {
								if (res.confirm) {
									uni.navigateBack();
								}
							}
						});
					}
				}
			});
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			this.getApp().page.onReady(this);
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.getApp().page.onShow(this);
			goodsRefund.init(this);
		},
		methods: {
			editNum() {
				this.setData({
					is_edit_num: true
				});
			},

			inputNum(e) {
				if (e.detail.value > this.goods.num) {
					uni.showToast({
						title: '数量错误',
						icon: 'none'
					});
					this.setData({
						is_edit_num: false,
						refund_num: this.goods.num
					});
				} else {
					this.setData({
						is_edit_num: false,
						refund_num: e.detail.value
					});
				}
			},

			editPrice() {
				this.setData({
					is_edit_price: true
				});
			},

			inputPrice(e) {
				if (e.detail.value > this.goods.total_price) {
					uni.showToast({
						title: '金额错误',
						icon: 'none'
					});
					this.setData({
						is_edit_price: false,
						refund_price: this.goods.total_price
					});
				} else {
					this.setData({
						is_edit_price: false,
						refund_price: e.detail.value
					});
				}
			},

			changePackaging(e) {
				var index = e.currentTarget.dataset.index;
				this.setData({
					packagingIns: index
				});
			},

			changePackage(e) {
				var index = e.currentTarget.dataset.index;
				this.setData({
					packageIns: index
				});
			},

			changeCheck(e) {
				var index = e.currentTarget.dataset.index;
				this.setData({
					checkIns: index
				});
			},

			changeSendWay(e) {
				var index = e.currentTarget.dataset.index;
				this.setData({
					sendWayIns: index
				});
			},

			changeAog(e) {
				var index = e.currentTarget.dataset.index;
				var packagingStatus = this.packagingStatus;
				this.setData({
					aogIns: index
				});
			},

			// bindRefundChange: function(e) {
			// 	var id = this.data.refundType[e.detail.value].id
			// 	this.setData({
			// 		defaultRefundIndex: 1,
			// 		refundIndex: e.detail.value,
			// 		refundId: id
			// 	})
			// 	this.getReasonList()
			// },
			// v1.10
			bindRefundType(e) {
				var self = this;
				var id = e.currentTarget.dataset.id;
				self.setData({
					refund_type_id: id
				});
				console.log(this.refund_type_id);
				this.getReasonList();
			},

			bindReturnChange: function(e) {
				this.setData({
					defaultReturnIndex: 1,
					returnIndex: e.detail.value
				});
			},
			bindStatusChange: function(e) {
				this.setData({
					defaultReciveIndex: 1,
					reciveIndex: e.detail.value
				});
			},
			bindTuiKuangChange: function(e) {
				this.setData({
					defaultTuiKuangIndex: 1,
					tuikuangIndex: e.detail.value
				});
			},

			// 收货状态 
			bindPickStatus(e) {
				this.setData({
					defaultPickIndex: 1,
					pickIndex: e.detail.value
				});
				this.pickStatusId = this.pickStatus[this.pickIndex].id
				this.tuikuangIndex == ''
				this.getReasonList()
				// if (type == 1) {
				// 	this.setData({
				// 		tuikuangCause: this.tuikuangCause_16[2]
				// 	});
				// } else {
				// 	this.setData({
				// 		tuikuangCause: this.tuikuangCause_16[1]
				// 	});
				// }
			},

			getReasonList() {
				// var type = this.data.refundType[this.data.refundIndex].id
				var type = this.refund_type_id;
				console.log(type);
				var pickStatusId = this.pickStatusId
				this.getApp().request({
					url: this.getApp().api.order.getReason,
					data: {
						type: type,
						receipt_status: pickStatusId || '',
						supp_id: this.sup_id,
						order_detail_id: this.order_detail_id
					},
					success: res => {
						if (res.code == 0) {
							console.log(res);
							if (type == 1) {
								this.setData({
									tuikuangCause: res.data.reasons_for_return,
									// 退款原因
									type: type
								});
							} else {
								this.setData({
									tuikuangCause: res.data.reason_for_return,
									// 退款原因
									type: type
								});

								if (this.sup_id == 16) {
									this.setData({
										// tuikuangCause_16: res.data.reason_for_return,
										tuikuangCause: res.data.reason_for_return,
										// 退款原因
										pickStatus: res.data.receipt_status,
										type: type
									});
								}
							}
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					}
				});
			}

		}
	};
</script>
<style>
	.goods-info {
		padding: 30rpx 24rpx;
		border-top: 1rpx solid #e3e3e3;
	}

	.switch-tab {
		border-bottom: 1rpx solid #e3e3e3;
	}

	.switch-tab text {
		height: 100rpx;
		border-bottom: 5rpx solid transparent;
	}

	.switch-tab text.active {
		border-bottom-color: #c10000;
		color: #c10000;
	}

	.switch-body {
		display: none;
	}

	.switch-body.active {
		display: block;
	}

	.form-row {
		padding: 20rpx 0rpx;
	}

	.form-row .form-label {
		white-space: nowrap;
		width: 135rpx;
		display: inline-block;
		font-size: 24rpx;
		color: #333333;
	}

	.form-row textarea {
		height: 120rpx;
	}

	.refund-price {
		color: #c10000;
	}

	.image-list {
		margin-left: -20rpx;
		margin-top: -20rpx;
	}

	.image-picker {
		font-size: 0;
	}

	.image-picker,
	.image-preview {
		display: inline-block;
		margin-left: 20rpx;
		margin-top: 20rpx;
	}

	.image-preview {
		position: relative;
		overflow: hidden;
	}

	.image-preview .image-del {
		position: absolute;
		top: -15rpx;
		right: -15rpx;
		height: 50rpx;
		width: 50rpx;
		background: rgba(0, 0, 0, .4);
		color: #fff;
		font-weight: bolder;
		border-radius: 999rpx;
		font-size: 13pt;
		box-shadow: 0 1rpx 2rpx rgba(0, 0, 0, .2);
		z-index: 2;
	}

	.submit-btn {
		height: 88rpx;
		line-height: 88rpx;
		background: #F49E3A;
		color: #fff;
		width: 339rpx;
		border-radius: 44rpx !important;
		margin-top: -112rpx;
		padding-bottom: 20rpx;
		background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
	}

	.cancel-btn {
		height: 88rpx;
		line-height: 88rpx;
		color: #fff;
		width: 339rpx;
		border-radius: 44rpx;
		margin-top: -112rpx;
		padding-bottom: 20rpx;
		text-align: center;
		color: #333333;
		border: 1rpx solid rgba(97, 97, 97, .4);
	}

	.active {
		visibility: visible;
	}
</style>
