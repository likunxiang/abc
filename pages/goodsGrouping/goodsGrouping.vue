<template>
	<view class="page pr" v-if="false">
		<common></common>
		<slide-icon :showPic="mrtj_sc" :cartNum="cartNum"></slide-icon>
		<view class="header">
			<view class="cu-bar search" style="margin-top: 40rpx;">
				<view class="search-form round" style="border-radius: 28rpx;height: 58rpx;line-height: 58rpx;margin: 0;">
					<text class="iconfont icon-sousuo fs-30 color-616161"></text>
					<input type="text" placeholder="请输入搜索关键字" placeholder-style="color:#999;font-size:26rpx"></input>
				</view>
			</view>
			<view class="nav-tab flex justify-between align-center">
				<view class="flex">
					<view v-for="(item, index) in navList" :key="index" :class="'fs-30 pr ' + (navIns==index?'color-333333':'color-999999')"
					 :data-index="index" @tap="changeNav" style="margin-right: 46rpx;">
						<view>{{item}}</view>
						<view class="under-line" v-if="navIns==index"></view>
					</view>
				</view>
				<view class="flex">
					<view class="flex ml-20 ns-align-items-flex-center" @tap="priceSort">
						<view class="fs-28">价格</view>
						<view class="ml-10 fs-34 color-D6D6D6">
							<text v-if="priceDefault" class="iconfont icon-paixu"></text>
							<text v-else :class="'iconfont color-F49E3A ' + (priceUp?'icon-asc':'icon-shengxu')"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main flex justify-between">
			<navigator v-for="(nav, idx) in item.goods" :key="idx" class=" miaosha-goods mb-20" style="background: #fff;border-radius: 20rpx;width: 340rpx;overflow: hidden;"
			 :url="'/pages/goods/goods?id=' + nav.id">
				<view class="pr ns-flex ns-justify-content-center">
					<image lazy-load="true" style="width: 340rpx;height: 340rpx;border-radius: 20rpx 20rpx 0 0;" mode="aspectFill"
					 :src="nav.first_cover_pic"></image>
					<!-- <view class="pa shopTab" wx:if="{{filters.parseInt(nav.price)!==filters.parseInt(nav.original_price)&&filters.parseInt(nav.price)<filters.parseInt(nav.original_price)}}">{{filters.toFix((nav.price/nav.original_price)*10,1)}}折</view> -->
					<view v-if="nav.goods_num==0" class="nonum-tip">已抢光</view>
				</view>
				<view class="bg-white" style="padding: 0 16rpx 16rpx;">
					<view class="ns-text-limit fs-28 color-333333">{{nav.name}}</view>
					<view class="clear miaosha_price flex ns-align-items-flex-center justify-between" style="font-size:36rpx;">
						<view class style="color:#c10000;margin-right:21rpx;font-weight:600">
							￥{{filters.toFix1(nav.price)}}
						</view>
						<view class="fs-30 iconfont icon-gouwuche_weixuanzhong add-cart-icon" @tap.stop="openCart" :data-id="item.id"
						 :data-index="index"></view>
						<!-- <view class="flex ns-align-items-flex-center" wx:if="{{role=='shoper' && nav.commission_price>0}}">
									<view class="yongjin">赚</view>
									<view class="fs-28 color-2C2C2C">￥{{nav.commission_price}}</view>
								</view> -->
						<!-- <view class="pull-left" style="text-decoration:line-through">
					            ￥{{nav.original_price}}
					          </view> -->
					</view>
				</view>

			</navigator>
		</view>
	</view>
</template>

<script>
	// pages/goodsGrouping/goodsGrouping.js
	var gSpecificationsModel = require("../../components/goods/specifications_model.js"); //商城多规格选择
	import slideIcon from "../../components/slideIcon/slideIcon";

	export default {
		data() {
			return {
				priceDefault: true,
				priceUp: true,
				navList: ['全部商品', '鞋子', '配件'],
				navIns: 0,
				show_attr_picker: false,
				goods: [],
				goods_attr: "",
				attr_group_list: "",
				showGetLogin: false,
				user_info_show: false,
				mrtj_sc: '',
				cartNum: 0
			};
		},

		components: {
			slideIcon
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			gSpecificationsModel.init(this);
			this.getCartNum();
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
		onShareAppMessage: function() {},
		methods: {
			changeNav(e) {
				var index = e.currentTarget.dataset.index;
				this.setData({
					navIns: index
				});
			},

			// 价格排序
			priceSort: function() {
				var self = this; // uni.showLoading({
				// 	title: '加载中'
				// })

				if (self.priceUp) {
					self.setData({
						priceDefault: false,
						priceUp: false
					}); // getApp().request({
					// 	url: getApp().api.default.gyg_list,
					// 	data: {
					// 		cat_id: self.data.id,
					// 		s_cat_id: self.data.s_cat_id || '',
					// 		sort: 'price',
					// 		by: 'asc'
					// 	},
					// 	success(res) {
					// 		if (res.code == 0) {
					// 			self.setData({
					// 				goodsList: res.data.list,
					// 				sort: 'price',
					// 				by: 'asc'
					// 			})
					// 		}
					// 	},
					// 	complete(res) {
					// 		uni.hideLoading()
					// 	}
					// })
				} else {
					self.setData({
						priceDefault: false,
						priceUp: true
					}); // getApp().request({
					// 	url: getApp().api.default.gyg_list,
					// 	data: {
					// 		cat_id: self.data.id,
					// 		s_cat_id: self.data.s_cat_id || '',
					// 		sort: 'price',
					// 		by: 'desc'
					// 	},
					// 	success(res) {
					// 		if (res.code == 0) {
					// 			self.setData({
					// 				goodsList: res.data.list,
					// 				sort: 'price',
					// 				by: 'desc'
					// 			})
					// 		}
					// 	},
					// 	complete(res) {
					// 		uni.hideLoading()
					// 	}
					// })
				}
			},

			// 购物车相关
			openCart(e) {
				var id = e.currentTarget.dataset.id;
				var index = e.currentTarget.dataset.index;
				var goods = this.goodsList[index];
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
						from: 4
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
				var token = uni.getStorageSync('ACCESS_TOKEN');

				if (!token) {
					// self.setData({
					//   showGetLogin: true,
					//   user_info_show: true
					// });
					this.$store.commit('vuexSet', {
						name: 'show_loginTpl',
						value: true
					})
					return;
				}

				this.submit('ADD_CART');
			},
			submit: function(type) {
				var self = this;

				if (self.form.number > self.goods.num) {
					uni.showToast({
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
					self.getApp().request({
						url: self.getApp().api.cart.add_cart,
						method: "POST",
						data: {
							goods_id: self.goods.id,
							sku: self.goods.sku,
							num: self.form.number
						},
						success: function(res) {
							uni.hideLoading();
							self.getCartNum()
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
			getCartNum: function() {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.cartCount,
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								cartNum: res.data.count
							});
						}
					}
				});
			}
		}
	};
</script>
<style>
	.page {
		background-color: #F4F4F4;
		padding-top: 158rpx;
	}

	.header {
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: 25rpx 24rpx 0;
	}

	.add-cart-icon {
		width: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		background-color: #F23005;
		border-radius: 50%;
	}

	.nav-tab {
		padding: 25rpx 0;
	}

	.nav-active {
		border-bottom: 8rpx solid #FFC901;
	}

	.under-line {
		position: absolute;
		left: 50%;
		width: 44rpx;
		height: 8rpx;
		background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
		border-radius: 4rpx;
		margin-left: -22rpx;
		bottom: -24rpx;
	}

	.main {
		padding: 24rpx;
	}
</style>
