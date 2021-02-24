<template>
	<view>
		<!--pages/getVipCard/getVipCard.wxml-->

		<common></common>

		<block data-src="/components/goods/specifications_model.wxml">
			<view class="attr-picker" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + ' ' + (__device=='device_iphone_x'?'bottom: 175rpx':'')"
			 v-if="show_attr_picker" catchtouchmove="preventTouchMove" @tap="hideAttrPicker">
				<scroll-view class="content-box" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'')"
				 @tap.stop="stop">
					<view class="flex-row" style="padding: 24rpx">
						<view class="flex-grow-0">
							<view class="goods-pic-box">
								<block v-if="goods.attr_pic">
									<image @tap="previewImage" :data-url="goods.attr_pic" mode="aspectFill" :src="goods.attr_pic"></image>
								</block>
								<block v-else>
									<image @tap="previewImage" :data-url="goods.first_cover_pic" mode="aspectFill" :src="goods.first_cover_pic"></image>
								</block>
							</view>
						</view>
						<view class="flex-grow-1" style="padding: 0 24rpx">
							<block v-if="pageType === 'PINTUAN'">
								<view style="font-size: 40rpx;" class="flex color-FF0200">
									<view class>¥ <text style="font-size: 60rpx;">{{filters.priceStr(goods.price)[0]}}.</text><text>{{filters.priceStr(goods.price)[1]}}</text></view>
								</view>
							</block>
							<block v-else>
								<view style class="flex ns-align-items-flex-center">
									<view class="color-FF0200" style="font-size: 40rpx;">¥ <text style="font-size: 60rpx;">{{filters.priceStr(goods.price)[0]}}.</text><text>{{filters.priceStr(goods.price)[1]}}</text></view>
								</view>
							</block>
						</view>
						<view class="flex-grow-0">
							<view @tap="hideAttrPicker" class="flex-x-center flex-y-center">
								<view style="width: 30rpx;height: 30rpx;font-size: 30rpx;" class="iconfont icon-guanbi2"></view>
							</view>
						</view>
					</view>
					<scroll-view scroll-y="true" style="max-height: 650rpx;">
						<view style="padding: 24rpx 28rpx">
							<view class="mb-24" v-if="role=='shoper' && is_commission">
								<view class="attr-group flex align-center">
									<view class=" fs-28 color-333333 ns-text-bold" style="margin-right: 32rpx;">佣金</view>
									<view class="fs-24 color-333333 flex" v-if="goods.c1">
										<view>销售佣金</view>
										<view>¥{{goods.c1}}</view>
									</view>
									<!-- <view class="fs-24 color-333333 flex ml-24" v-if="goods.c19">
										<view>大亲(赚)</view>
										<view>¥{{goods.c19}}</view>
									</view> -->
								</view>
							</view>
							<view>
								<view class="attr-group" v-if="groupNum && !oid">
									<view class="attr-group-name">{{attr_group_num.attr_group_name}}</view>
									<view class="attr-list">
										<text :class="'attr-item ' + (group_checked?'':'active')">{{goods.group_num}}人团</text>
									</view>
								</view>
								<view v-for="(attr_group, groupindex) in attr_group_list" :key="groupindex" class="attr-group" v-if="attr_group.attr_list.length>0">
									<view class="attr-group-name fs-28 color-333333 ns-text-bold">{{attr_group.attr_group_name}}</view>
									<view class="attr-list">
										<text v-for="(item, childindex) in attr_group.attr_list" :key="childindex" :class="'attr-item ' + (item.checked?'active':'') + ' ' + (item.isHave ?'':'attr_num_0')"
										 :data-groupindex="groupindex" :data-childindex="childindex" :data-type="item.isHave?1:0" @tap="storeAttrClick">{{item.attr_name}}</text>
									</view>
								</view>
							</view>
							<view style="height: 0;border-bottom: 1rpx solid #F4F4F4;margin-bottom: 23rpx"></view>

							<view class="flex flex-x-center" v-if="pageType == 'cart'">
								<navigator :url="'/pages/goods/goods?id=' + goods_id + '&from=' + from" class="edit-standard-btn mr-20">查看详情</navigator>
								<view class="edit-standard-btn edit-standard-btn-yellow" @tap="saveEditStandard">确认</view>
							</view>
							<view class="flex flex-x-center" v-if="pageType == 'private'">
								<view class="edit-standard-btn" @tap="saveEditStandard">确认</view>
							</view>
							<view class="flex flex-x-center" v-if="pageType == 'group' || !pageType || pageType == 'normal'">
								<view class="edit-standard-btn edit-standard-btn-yellow" @tap="addCart">确认</view>
							</view>
						</view>
					</scroll-view>

				</scroll-view>
			</view>
		</block>
		<view class="page">

			<custom mode="2" background="#1F1F1F" backColor="#F4DAA9" btnMode="2" borderColor="#F4DAA9" titleColor="#F4DAA9"
			 :title="type==1?'领取亲卡':'赠送会员'"></custom>
			<!-- 规则 -->
			<view class="get-card-modal flex-x-center flex-y-center ns-column" v-if="is_show_model">
				<view class="get-card-modal-main-vip pr">
					<view style="padding: 53rpx 40rpx 30rpx 40rpx;">
						<view class="color-333333 flex-x-center ns-text-bold" style="font-size: 44rpx;">活动规则</view>
						<view class="time-top-text fs-24 color-333333" style="margin-top: 46rpx;">
							<view>1.亲卡购买后，即可赠送给好友，每一位好友限领一张，好友一旦领取成功您将获得10元津贴</view>
							<view style="margin-top: 39rpx;">2.亲卡购买成功后，不支持退款</view>
							<view style="margin-top: 39rpx;">3.好友领取成功之后将扣除一张亲卡</view>
							<view style="margin-top: 39rpx;">4.好友超过8个小时未领取则亲卡将自动退回</view>
						</view>
						<view class="get-card-modal-btn-vip" @tap="closeModal">确定</view>

					</view>
				</view>
			</view>
			<block v-if="type == 1">
				<view class="header text-center pr" style="padding-bottom:144rpx ">
					<!-- 0 可领取 -->
					<view v-if="card_status == 0">
						<view class="fs-30 text-center marginAuto" style="width: 538rpx;">您的好友向您传送一张会员卡，点击领取 即刻享受商场里面丰富优质的会员商品</view>
						<view class="fs-34 color-fff" style="margin-top: 72rpx;">{{timer}}</view>
						<view class="flex justify-between" style="margin: 50rpx auto 0; ">
							<view class="receive-btn-one" @tap="receiveVip">立即领取</view>
						</view>
					</view>
					<!-- 1 已经是永久会员 -->
					<view v-if="card_status == 1">
						<view class="fs-30 text-center marginAuto" style="width: 538rpx;">您已经是永久会员了</view>
						<navigator hover-class="none" url="/pages/index/index">
							<view class="to-gyg-icon iconfont icon--dianpu ns-text-bold" style="color: #2C2419;font-size: 50rpx;"></view>
							<view class="fs-20 mt-16" style="color: #F3D9A8;">进店逛一逛</view>
						</navigator>
					</view>
					<!-- 2 分享会员卡已失效 -->
					<view v-if="card_status == 2">
						<navigator hover-class="none" url="/pages/index/index">
							<view class="to-gyg-icon iconfont icon-kong2 ns-text-bold" style="color: #F4DAA9;font-size: 80rpx;background: transparent"></view>
							<view class="fs-30" style="color: #F4DAA9;margin-top: 46rpx;">来晚一步，亲卡被领光了</view>
						</navigator>
						<view class="receive-btn-one" style="margin-top: 62rpx;" @tap="buyVipOrder">我是土豪，9.9元直接买</view>
					</view>
					<view class="title fs-40 color-333333 ns-text-bold" v-if="type==1 || share_type==0">会员专享商品 </view>
				</view>
			</block>
			<block v-if="type==1">
				<view class="bg-white pr">
					<view class="under-line"></view>
					<view class=" flex ns-wrap justify-between p-24">
						<navigator v-for="(goods, index) in vipGoodsList" :key="index" :url="'/pages/goods/goods?id=' + goods.id + '&from=' + goods.from"
						 hover-class="none" :class="'fs-24 pb-20 ' + ((index+1)%3==0?'':'mr-15')" style="width: 224rpx;">
							<view style="width: 224rpx;height: 224rpx;position: relative;">
								<image style="width: 224rpx;height: 224rpx;border-radius: 20rpx;border: 6rpx solid #F4DAA9;" :src="goods.first_cover_pic"></image>
								<view class="discounts">省{{goods.m_sub_price}}元</view>
							</view>
							<view class="pt-20 ns-text-limit  fs-24 color-333333">
								{{goods.name}}
							</view>
							<view class="ns-flex ns-justify-content-space-between align-center">
								<view class="fs-20 color-FF0200 ns-text-bold">￥<text class="fs-26">{{filters.priceStr(goods.m_price)[0]}}.</text><text>{{filters.priceStr(goods.m_price)[1]}}</text></view>
								<view class="add-cart-icon fs-30 iconfont color-fff icon-gouwuche_weixuanzhong" style="width: 40rpx;height: 40rpx;line-height: 40rpx;"
								 @tap.stop="openCart" :data-id="goods.id" :data-index="index"></view>
							</view>
						</navigator>
					</view>
				</view>
				<image :src="share_member" class="bg_img_s"></image>
			</block>

			<!-- 已领取过显示这个 -->
			<view class="received flex-y-center" v-if="received" @tap.stop="closeReceived" catchtouchmove="preventTouchMove">
				<view class="received-content" @tap.stop="showReceived">
					<view class="received-text">您已经成为我们的会员</view>
					<view @tap.stop="toIndex" class="received-btn">进店逛一逛</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var gSpecificationsModel = require("../../components/goods/specifications_model.js"); //商城多规格选择
	//商城多规格选择
	import utils from "../../utils/util";
	import custom from '@/components/custom/custom.vue'
	export default {
		data() {
			return {
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				is_show_modal: true,
				pageType: 'normal',
				received: false, //显示已领取弹框
				type: "",
				parent_id: "",
				showGetLogin: false,
				user_info_show: false,
				show_attr_picker: false,
				goods: "",
				goods_attr: "",
				attr_group_list: "",
				headerHeight: "",
				status: "",
				share_type: "",
				store_id: "",
				store_group_id: "",
				sid: "",
				vipGoodsList: "",
				shareList: "",
				vipDay: "",
				endTime: "",
				sd: "",
				sh: "",
				sm: "",
				daojishi: false,
				shareImg: "",
				share_step: "",
				share_member: "",
				shareInfo: {
					user: {
						nickname: ''
					}
				},
				is_show_model: false,
				card_bg: "",
				filters: require('../../utils/filters.js'),
				form: {
					number: 1
				},
				is_show_first: false,
				isParameter: '',
				cardNum: 1, // 会员卡的数量
				is_show_buy_card: false, // 购买会员卡开关
				buy_card_total_price: 9.9, // 购买会员卡总价
				buy_type: 1, // 购买类型  1.购买会员，2购买小亲，3购买亲卡
				all_card: 0, // 剩余会员卡数量
				sign: '', // 用于绑定关系
				card_id: '', // 会员卡id
				card_status: '', // 亲卡状态  0 可领取 1已经是永久会员 2不可领取
				timer: '', // 亲卡有效时，倒计时
				issue_card: '', // 亲卡还剩多少张
				wait_card: '', // 待领取亲卡有多少张
				use_card: '', // 成功赠送的会员卡数量
			};
		},

		components: {
			custom
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			console.log(options);
			this.getApp().page.onLoad(this, options);
			if (options.type) {
				this.setData({
					type: options.type
				});
			}

			//#ifdef MP-WEIXIN
			uni.hideShareMenu();
			//#endif
			var self = this;

			if (options.user_id) {
				this.getApp().core.setStorageSync('u_id', options.user_id);
				self.setData({
					parent_id: options.user_id
				});
				self.doInit(options);
				self.getShareInfo();
			}

			if (options.sid) {
				this.getApp().core.setStorageSync('s_id', options.sid);
				this.getApp().page.getServerShareInfo(options, function() {
					self.doInit(options);
					self.getShareInfo();
				});
				if (options.sign) {
					this.sign = options.sign
				}
				if (options.card_id) {
					this.card_id = options.card_id
				}
			} else {
				self.doInit(options);
			}
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
			} ///获取领取亲卡状态
			// this.getStatus();

		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			gSpecificationsModel.init(this);
		},

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
		onShareAppMessage: function() {
			var mch_id = uni.getStorageSync('_mchInfo').id;
			var user_id = this.getApp().core.getStorageSync('USER_INFO').id;
			var nickname = this.getApp().core.getStorageSync('USER_INFO').nickname;
			var title = nickname + ' 送你一张超值会员卡，大家一起省钱啊，感恩～';
			var img = this.shareImg;

			this.getShareDataReal(this.getShareData)
			return {
				title: title,
				path: '/member/getVipCard/getVipCard?sid=' + this.sid + '&sign=' + this.sign + '&type=1' + '&mch_id=' + mch_id,
				imageUrl: img
			};
		},
		methods: {
			// 卡展示状态
			cardShowStatus() {
				console.log('e', this.parent_id, this.sign, this.card_id);
				this.getApp().request({
					url: this.getApp().api.default.card_show_status,
					data: {
						parent_id: this.parent_id,
						sign: this.sign,
						card_id: this.card_id
					},
					success: res => {
						console.log(res);
						if (res.code == 0) {
							var card_status = res.data.status
							if (card_status == 0) {
								var timer_str_hour = parseInt(res.data.sur_time / 60 / 60) + '时'
								var timer_str_min = parseInt(res.data.sur_time / 60 % 60) + '分'
								this.timer = '距离亲卡失效还剩' + timer_str_hour + timer_str_min
							}
							this.card_status = card_status
							console.log('亲卡状态', card_status);
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}

				})
			},
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

			doInit: function(options) {
				this.getShareImg();
				this.getGoodsList();
				this.cardShowStatus()
			},
			buyVipOrderThrottle: utils.throttle(function() {
				this.buyVipOrder();
			}, 1000),

			buyQinCardThrottle: utils.throttle(function() {
				this.buy_type = 3
				this.buyVipOrder();
			}, 1000),
			// 生成购买会员订单 
			buyVipOrder(e) {
				var type = this.type;
				this.getApp().request({
					url: this.getApp().api.default.vip_buy_order,
					data: {
						userId: this.getApp().core.getStorageSync('USER_INFO').id,
						type: 1,
						// 1购买会员，2成为小亲 3 购买亲卡
						bind: type == 1 ? '1' : '',
						parent_id: this.parent_id || this.getApp().core.getStorageSync('parent_id') || this.getApp().core.getStorageSync(
							'u_id') || '',
						num: this.cardNum || ''
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
														success: (res) => {}
													});
													return;
												}

												if (e.errMsg == "requestPayment:ok") {
													this.getApp().core.showModal({
														title: "提示",
														content: "购买成功",
														showCancel: false,
														confirmText: "确认",
														success: (res) => {
															if (res.confirm) {
																this.getShareList();
																this.getShareData()
																// uni.redirectTo({
																// 	url: '/member/paySucceed/paySucceed'
																// });
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

			// 购物车相关
			openCart(e) {
				var id = e.currentTarget.dataset.id;
				var index = e.currentTarget.dataset.index;
				var goods = this.vipGoodsList[index];
				goods.price = goods.m_price;
				this.setData({
					show_attr_picker: true,
					goods: goods,
					['form.number']: 1
				});
				this.getGoodsAttr(id);
			},

			getGoodsAttr: function(id) {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.goods_attr,
					data: {
						id: id,
						from: self.goods.from || 1
					},
					success: function(res) {
						if (res.code == 0) {
							if (res.data.attr[0].num == 0) {
								for (var i in res.data.attr) {
									if (res.data.attr[i].num > 0) {
										res.data.attr[0].total_num = true;
										break;
									}
								}
							}

							self.setData({
								goods_attr: res.data.attr,
								attr_group_list: res.data.attr_group_list
							});

							if (res.data.attr != null && res.data.attr_group_list != null) {
								self.selectDefaultAttr(res.data);
							}
						}
					}
				});
			},
			//加入购物车
			addCart: function() {
				var self = this;
				var token = this.getApp().core.getStorageSync('ACCESS_TOKEN');

				if (!token) {
					self.setData({
						showGetLogin: true,
						user_info_show: true
					});
					this.$store.commit('vuexSet', {
						name: 'show_loginTpl',
						value: true
					})
				}

				this.submit('ADD_CART');
			},
			submit: function(type) {
				var self = this;

				if (self.form.number > self.goods.num) {
					this.getApp().core.showToast({
						title: "商品库存不足，请选择其它规格或数量",
						icon: 'none'
					});
					return true;
				}

				if (type == 'ADD_CART') {
					//加入购物车
					uni.showLoading({
						title: "正在提交",
						mask: true
					});
					this.getApp().request({
						url: this.getApp().api.cart.add_cart,
						method: "POST",
						data: {
							goods_id: self.goods.id,
							sku: self.goods.sku,
							num: self.form.number,
							from: self.goods.from || 1
						},
						success: function(res) {
							uni.hideLoading();
							uni.showToast({
								title: res.msg,
								duration: 1500,
								icon: 'none'
							});
							self.setData({
								show_attr_picker: false
							});
							self.sendEvent("加入购物车", {
								"商品名称": self.goods.name,
								"商品ID": self.goods.id,
							})
						}
					});
				}
			},


			getGoodsList() {
				this.getApp().request({
					url: this.getApp().api.default.vip_goods_list,
					data: {
						userId: this.getApp().core.getStorageSync('USER_INFO').id
					},
					success: res => {
						if (res.code == 0) {
							this.setData({
								vipGoodsList: res.data.list
							});
						} else {
							uni.showModal({
								title: res.msg
							});
						}
					}
				});
			},



			receiveVip() {
				this.getApp().request({
					url: this.getApp().api.default.receive_vip,
					data: {
						parent_id: this.parent_id,
						card_id: this.card_id
					},
					// TODO
					success: res => {
						if (res.code == 0) {
							if (res.data.code == 2) {
								uni.showModal({
									title: res.data.msg,
									showCancel: false,
									success: res => {
										if (res.confirm) {
											uni.redirectTo({
												url: '/pages/index/index'
											});
										}
									}
								});
							} else {
								uni.showModal({
									title: '领取成功',
									showCancel: false,
									success: res => {
										if (res.confirm) {
											uni.redirectTo({
												url: '/pages/index/index'
											});
										}
									}
								});
							}

							if (this.getApp().core.getStorageSync('u_id')) {
								this.getApp().core.removeStorageSync('u_id');
							}
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
								shareImg: res.data.vipImg,
								share_step: this.getApp().core.getStorageSync('_img').share1,
								share_member: this.getApp().core.getStorageSync('_img').shareMenber
							});
						}
					}
				});
			},

			getShareInfo() {
				this.getApp().request({
					url: this.getApp().api.default.vip_get_share_info,
					data: {
						parent_id: this.parent_id
					},
					success: res => {
						if (res.code == 0) {
							this.setData({
								shareInfo: res.data
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

			goGYG() {
				uni.redirectTo({
					url: '/pages/guanyiguan/guanyiguan'
				});
			},

			showModel() {
				this.setData({
					is_show_model: true,
					card_bg: this.getApp().core.getStorageSync('_img').b1
				});
			},

			closeModal() {
				this.setData({
					is_show_model: false
				});
			},

			preventTouchMove: function(e) {},
			showReceived: function() {
				this.setData({
					received: true
				});
			},
			closeReceived: function() {
				this.setData({
					received: false
				});
			},
			toIndex: function() {
				uni.redirectTo({
					url: '/pages/index/index'
				});
			} // getStatus: function() {
			// 	let self = this;
			// 	getApp().request({
			// 		url: getApp().api.default.get_received_status,
			// 		data: {
			// 		},
			// 		success: function(res) {
			// 			if (res.code == 0) {
			// 				//0 已经是正式会员  1未参加过活动  2，3， 4，5，6，7表示已经参与过活动
			// 				let status = res.data.status;
			// 				let statusArr = [2, 3, 4, 5, 6, 7];
			// 				// console.log(self.data.type,'*****',status)
			// 				if (self.data.type == 1 && statusArr.indexOf(status) != -1) {
			// 					self.setData({
			// 						received: true
			// 					})
			// 				}
			// 			}
			// 			// console.log(res)
			// 		}
			// 	})
			// }

		}
	};
</script>
<style>
	/* pages/getVipCard/getVipCard.wxss */
	@import "../../components/goods/specifications_model.css";

	page {
		background: #fff;
		height: 100%;
	}

	.line {
		width: 1rpx;
		height: 94rpx;
		background: #fff;
		opacity: 0.3;
		margin-left: 36rpx;
	}

	.page {
		min-height: 100%;
	}

	.to-gyg-icon {
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: linear-gradient(0deg, #F5DBAA, #D6B681);
		border-radius: 50%;
		margin: 50rpx auto 0;
	}

	.get-card-modal {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, .7);
		z-index: 1000;
	}

	.get-card-modal-main-vip {
		width: 580rpx;
		background: #fff;
		border-radius: 20rpx;
	}

	.get-card-modal-main-buy {
		width: 630rpx;
		background: #FFFFFF;
		padding: 50rpx 33rpx;
		border-radius: 8rpx;
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

	.get-card-modal-btn-vip {
		width: 500rpx;
		height: 88rpx;
		background: #FF401A;
		box-shadow: 0px 7rpx 16rpx 0rpx rgba(255, 69, 32, 0.55);
		border-radius: 44rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 32rpx;
		color: #fff;
		margin-top: 57rpx;
	}

	.get-card-modal-btn-buy {
		width: 338rpx;
		height: 98rpx;
		line-height: 98rpx;
		background: #FFC330;
		border-radius: 49rpx;
		color: #fff;
		font-size: 30rpx;
		text-align: center;
		margin: auto;
		margin-top: 60rpx;
	}

	.rule-btn {
		position: absolute;
		width: 94rpx;
		height: 61rpx;
		border: 1rpx solid rgba(255, 255, 255, 0.3);
		border-radius: 30rpx 0px 0px 30rpx;
		text-align: center;
		line-height: 59rpx;
		color: #fff;
		font-size: 24rpx;
		right: -24rpx;
		top: 12rpx;
	}

	.buy-box {
		width: 402rpx;
		height: 82rpx;
		line-height: 78rpx;
		border: 2rpx solid rgba(190, 190, 190, 0.7);
		border-radius: 4rpx;
	}

	.nav {
		min-height: 0px;
		background: #1F1F1F;
		color: #fff;
		z-index: 9;
		position: relative;
	}

	.con {
		position: fixed;
		width: 100%;
		top: 0;
		display: flex;
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
		margin-left: 30rpx;
		font-size: 36rpx;
		display: flex;
		align-items: center;
		height: 100%;
		justify-content: center;
		max-width: 100%;
		color: #FFFFFF;
		opacity: 0.5;
	}

	.header {
		background: #1F1F1F;
		padding: 0 24rpx;
		font-size: 60rpx;
		color: #F4DAA9;
		padding-top: 44rpx;
	}

	.sender-num {
		width: 750rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #F4F4F4;
		border-radius: 30rpx 30rpx 0px 0px;
		font-size: 30rpx;
		color: #333;
		text-align: center;
		margin-left: -24rpx;
		margin-top: 46rpx;
	}

	.rule-box {
		width: 589rpx;
		border: 2rpx solid #F4DAA9;
		border-radius: 20px;
		padding: 40rpx 30rpx;
	}

	.invite-btn {
		width: 702rpx;
		height: 88rpx;
		background: linear-gradient(-90deg, rgba(245, 219, 170, 1), rgba(214, 182, 129, 1));
		border-radius: 44rpx;
		text-align: center;
		line-height: 88rpx;
		color: #2C2419;
		font-size: 34rpx;
		font-weight: bold;
		margin-top: 16rpx;
	}

	.invite-btn-empty {
		background: #1F1F1F;
		border: 2rpx solid rgb(244, 218, 169);
		line-height: 84rpx;
		color: #F4DAA9;
	}

	.receive-btn {
		width: 336rpx;
		line-height: 70rpx;
		text-align: center;
		height: 70rpx;
		background: linear-gradient(0deg, #F5DBAA, #D6B681);
		border-radius: 35rpx;
		font-size: 30rpx;
		color: #2C2419;
	}

	.receive-btn-one {
		width: 702rpx;
		line-height: 70rpx;
		text-align: center;
		height: 70rpx;
		background: linear-gradient(0deg, #F5DBAA, #D6B681);
		border-radius: 35rpx;
		font-size: 30rpx;
		font-weight: 600;
		color: #2C2419;
	}

	.buy-vip-btn {
		line-height: 66rpx;
		background: #1F1F1F;
		color: #F3D9A8;
		border: 2rpx solid #F3D9A8;
	}

	.under-line {
		position: absolute;
		top: -5rpx;
		left: 50%;
		margin-left: -65rpx;
		width: 130rpx;
		height: 8rpx;
		background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
		border-radius: 4rpx;
		z-index: 1;
	}

	.add-cart-icon {
		width: 30rpx;
		height: 30rpx;
		line-height: 30rpx;
		text-align: center;
		background-color: #F23005;
		border-radius: 50%;
	}

	.friend-avatar {
		padding: 30rpx 98rpx 0;
	}

	.avatar-box {
		width: 134rpx;
		height: 134rpx;
		line-height: 126rpx;
		border: none;
		background-color: #fff;
		cursor: pointer;
		box-sizing: border-box;
		background-image: linear-gradient(#414141, #272626), linear-gradient(to bottom right, #FFDEAE, #D6B681);
		padding: 4rpx;
		border-radius: 50%;
		background-clip: content-box, padding-box;
		overflow: hidden;
	}

	.day-num {
		width: 302rpx;
		height: 82rpx;
		background: #1D1D1D;
		border: 2rpx solid #F4DAA9;
		box-shadow: 0rpx 5rpx 10rpx 0rpx rgba(228, 199, 148, 0.8);
		border-radius: 4rpx;
	}

	.day-num-box {
		width: 70rpx;
		height: 70rpx;
		background: rgba(244, 218, 169, 1);
		border-radius: 8rpx;
		font-size: 50rpx;
		color: #1f1f1f;
		font-weight: bold;
		text-align: center;
		line-height: 70rpx;
		margin-left: 16rpx;
		margin-right: 16rpx;
	}

	.share-success {
		padding-bottom: 11rpx;
		border-bottom: 1px solid #EBEBEB;
		margin-bottom: 50rpx;
	}

	.discounts {
		width: 123rpx;
		height: 53rpx;
		line-height: 53rpx;
		text-align: center;
		background: linear-gradient(-90deg, rgba(245, 219, 170, 1), rgba(214, 182, 129, 1));
		border-radius: 0 20rpx 0rpx 20rpx;
		position: absolute;
		left: 3rpx;
		bottom: 3rpx;
		font-size: 24rpx;
		color: #2C2419;
	}

	.icon-box {
		width: 280rpx;
		height: 280rpx;
		background: rgba(234, 234, 234, 1);
		border-radius: 50%;
	}

	/* 已领取 */
	.received {
		position: fixed;
		width: 750rpx;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 99;
	}

	.received-content {
		width: 460rpx;
		height: 300rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
		text-align: center;
	}

	.received-text {



		font-size: 32rpx;
		font-weight: 400;
		color: #111111;
		line-height: 170rpx;
	}

	.received-btn {
		width: 220rpx;
		height: 80rpx;
		background: linear-gradient(0deg, #F5DBAA, #D6B681);
		box-shadow: 0px 11px 23px 0px rgba(247, 172, 41, 0.2);
		border-radius: 40rpx;
		margin: 0 auto;


		font-weight: 400;
		color: #2C2419;
		line-height: 80rpx;
	}

	.bg_img_s {
		background-size: 750rpx 1928rpx;
		width: 750rpx;
		height: 1928rpx;

	}

	.day-num {
		position: relative;
		/* overflow: hidden; */
	}

	.day-num::after {
		content: "";
		position: absolute;
		z-index: 9;
		box-sizing: border-box;
		/* background-color: #1F1F1F; */
		background-color: #1F1F1F;
		width: 24rpx;
		height: 24rpx;
		border: 2rpx solid #F4DAA9;
		border-radius: 50%;
		left: 167rpx;
		top: -14rpx;
		border-top-color: transparent;
		border-left-color: transparent;
		transform: rotate(45deg);

	}

	.day-num::before {
		content: "";
		position: absolute;
		z-index: 9;
		box-sizing: border-box;
		/* background-color: #1F1F1F; */
		background-color: #1F1F1F;
		width: 24rpx;
		height: 24rpx;
		border: 2rpx solid #F4DAA9;
		border-radius: 50%;
		left: 167rpx;
		bottom: -14rpx;
		border-top-color: transparent;
		border-left-color: transparent;
		transform: rotate(-135deg);
		/* box-shadow: 3rpx 3rpx 3rpx 3rpx rgba(31,31,31,0.9); */
	}
</style>
