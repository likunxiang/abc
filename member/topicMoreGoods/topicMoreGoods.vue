<template>
	<view class="page">
		<common></common>
		<custom btnMode='2' title="更多商品" fixed="fixed" background="#fff" backColor="#000" titleColor="#333" mode="2" borderColor="rgba(0,0,0,.5)"></custom>
		<view class="p-24">
			<navigator :url="'/pages/goods/goods?id=' + item.id" :class="'goods-content flex ' + (index < goodList.length-1?'mb-24':'')" v-for="(item,index) in goodList" :key="index">
				<image :src="item.first_cover_pic" mode="aspectFill" class="goods-content-img flex-grow-0"></image>
				<view class="goods-msg flex-grow-1 flex ns-column justify-between">
					<view>
						<view class="fs-24 color-333333 ns-text-limit2 ns-text-bold" style="line-height: 42rpx;">{{item.name}}</view>
						<view class="flex align-end">
							<view class="fs-28 color-FF0200 ns-text-bold">
								<text>￥</text><text class="fs-38">{{filters.priceStr(item.price)[0]}}</text>.<text class="fs-28">{{filters.priceStr(item.price)[1]}}</text>
							</view>
							<view style="margin-left: 19rpx;">
								<text class="ns-text-through fs-24 color-999999"> ¥{{item.original_price}}</text>
							</view>
						</view>
					</view>
					<view class="fs-24 color-FF0200" v-if="item.xq_commission > '0' && role == 'shoper'">销售佣金 ¥{{item.xq_commission}}</view>
					
					<view class="flex justify-end">
						<button open-type="share" @tap.stop="stop" :data-pic="item.first_cover_pic" :data-name="item.name" :data-id="item.id" class="transmit">转发</button>
						<view class="add-cart" @tap.stop="openCart" :data-id="item.id" :data-index="index">加入购物车</view>
					</view>
				</view>
			</navigator>
			<!-- 爆款专区 -->
			<view class="hot-prefecture">
				<view class="hot-prefecture-title">
					<image :src="pic_hot_prefecture" mode="aspectFill" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="hot-prefecture-goods flex justify-between ns-wrap">
					<navigator v-for="(item, index) in allLookList" :key="index" :url="'/pages/goods/goods?id=' + item.id" class="goods mb-20 bg-white" >
						<view style="width: 340rpx;height: 340rpx;position: relative;">
							<image style="width: 340rpx;height: 340rpx;background: #ccc;border-radius: 20rpx 20rpx 0 0;" mode="aspectFill" :src="item.first_cover_pic"></image>
							<view v-if="item.goods_num==0" class="nonum-tip">
								已抢光
							</view>
						</view>
					
						<view class="goods-two-msg">
							<view class="fs-28 color-333333 ns-text-limit">{{item.name}}</view>
							<view class="fs-28 flex justify-between align-center" style="margin-top: 12rpx;">
								<view class="flex align-center">
									<view class="fs-28 color-FF0200 ns-text-bold">¥ {{item.price}}
									</view>
									<view class="color-999999 fs-22 ns-text-through ml-16">¥ {{item.original_price}}</view>
								</view>
								<view class="add-cart-icon fs-26 iconfont color-fff icon-gouwuche_weixuanzhong" style="width: 40rpx;height: 40rpx;line-height: 40rpx;background: #F23005;"
								 @tap.stop="openCart" :data-id="item.id" :data-index="index"></view>
					
							</view>
						</view>
					</navigator>
				</view>
			</view>
		</view>
		
		<!-- 多规格开始 -->
		<block data-src="/components/goods/specifications_model.wxml">
			<view class="attr-picker" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + ' ' + (pageType == 'addMenu'?'bottom: 90rpx':'') + ' ' + (__device=='device_iphone_x'?'bottom: 175rpx':'')"
			 v-if="show_attr_picker" catchtouchmove="preventTouchMove" @tap="hideAttrPicker">
				<scroll-view class="content-box" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + ' ' + (pageType == 'addMenu'?'bottom: 90rpx':'') + ' ' + (__device=='device_iphone_x'?'bottom: 175rpx':'')"
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
							<view class="fs-30 color-333333 ns-text-limit2">{{goods.name}}</view>
							<view style class="flex ns-align-items-flex-center mt-20">
								<view class="fs-36 color-FF0100 ns-text-bold">¥ {{goods.price}}</view>
								<view class="flex align-center" v-if="goods.m_price">
									<view class="iconfont icon-ziyuan101 fs-20 vip-icon" style="color: #F5DBAA;"></view>
									<view class="fs-36 color-333333 ns-text-bold">¥ {{goods.m_price}}</view>
								</view>
							</view>
						</view>
						<view class="flex-grow-0">
							<view @tap="hideAttrPicker" class="flex-x-center flex-y-center">
								<view style="width: 30rpx;height: 30rpx;font-size: 30rpx;" class="iconfont icon-guanbi2"></view>
							</view>
						</view>
					</view>
					<view class v-if="role=='shoper' && is_commission">
						<view class="commission-box-cart flex align-end">
							<view class="fs-24 color-333333 flex align-end" v-if="goods.c1">
								<view style="margin-bottom: 4rpx;margin-right: 4rpx;">销售佣金</view>
								<view class="fs-30 color-FF0000 ns-text-bold">¥ {{goods.c1}}</view>
							</view>
							<!-- <view class="fs-24 color-333333 flex align-end" style="margin-left: 57rpx;" v-if="goods.c19">
								<view style="margin-bottom: 4rpx;margin-right: 4rpx;">大亲(赚)</view>
								<view class="fs-30 color-FF0000 ns-text-bold">¥ {{goods.c19}}</view>
							</view> -->
						</view>
					</view>
					<scroll-view scroll-y="true" style="max-height: 650rpx;">
						<view style="padding: 24rpx 28rpx">
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
							<!-- 积分商品详情隐藏购买数量 -->
							<block v-if="pageType !== 'INTEGRAL' && pageType!== 'BOOK'">
								<view style="padding-bottom: 40rpx">
									<view class="flex-row flex-y-center mb-20">
										<view class="flex-grow-1 flex">
											<view class="fs-28 color-333333 ns-text-bold">数量</view>
											<view class v-if="goods.buy_max?filters.parseInt(goods.buy_max)!=0:(goods.buy_limit?filters.parseInt(goods.buy_limit)!=0:false)">（限购{{goods.buy_max?goods.buy_max:goods.buy_limit}}件）</view>
										</view>
										<view class="flex-grow-0">
		
											<view class="flex number-input-box ns-align-items-flex-center">
												<!-- <view style='margin-right:0.01rem;' class="flex-grow-0 flex-x-center flex-y-center number-btn number-sub {{form.number<=1?'disabled':''}}" bindtap="numberSub">-
							                </view> -->
												<view :class="'flex-grow-0 number-btn number-sub iconfont icon-jian ' + (form.number<=1?'disabled':'')"
												 style="margin-top: -6rpx;" @tap="numberSub"></view>
												<view class>
													<input style="padding:0;" class="flex-grow-1 number-input" :value="form.number" type="number" step="1" min="1"
													 @blur="numberBlur"></input>
												</view>
												<view :class="'flex-grow-0 number-btn number-add iconfont icon-jia ' + (form.number>=goods.goods_num?'':'disabled')"
												 style="margin-top: 0rpx;" @tap="numberAdd"></view>
												<!-- <view class="flex-grow-0 flex-x-center flex-y-center number-btn number-add" bindtap="numberAdd">+
							                </view> -->
											</view>
										</view>
									</view>
								</view>
							</block>
							<view class="flex flex-x-center" v-if="pageType == 'group' || !pageType || pageType == 'normal' || pageType == 'addMenu'">
								<view class="edit-standard-btn edit-standard-btn-yellow" @tap="addCart">确认</view>
							</view>
						</view>
					</scroll-view>
		
				</scroll-view>
			</view>
		</block>
		<!-- 多规格结束 -->
	</view>
</template>

<script>
	import custom from '@/components/custom/custom.vue'
	var gSpecificationsModel = require("../../components/goods/specifications_model.js"); //商城多规格选择
	export default {
		data() {
			return {
				filters: require('../../utils/filters.js'),
				gid: '',
				goodList: [],
				show_attr_picker: false,
				pageType: 'normal',
				form: {
					number: 1
				},
				allLookList: [],
				role: uni.getStorageSync('role'),
				page: 1,
				pic_hot_prefecture: uni.getStorageSync('_img').pic_hot_prefecture
			}
		},
		onLoad(e) {
			console.log(e);
			this.gid = e.id
			this.loadData()
			this.getLook()
		},
		onShow() {
			gSpecificationsModel.init(this);
		},
		methods: {
			loadData() {
				this.getApp().request({
					url: this.getApp().api.default.topic_more_goods,
					data: {
						gid: this.gid,
					},
					success: (res) => {
						console.log(res);
						if (res.code == 0) {
							this.goodList = res.data
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					},
				})
			},
			getLook() {
				this.getApp().request({
					url: this.getApp().api.default.all_look,
					success:(res) => {
						if (res.code == 0 && res.data.list.length > 0) {
								this.allLookList = res.data.list
						}
					}
				})
			},
			// 购物车相关
			openCart(e) {
				var id = e.currentTarget.dataset.id;
				var index = e.currentTarget.dataset.index;
				var goods = this.goodList[index];
				this.setData({
					show_attr_picker: true,
					goods: goods,
					['form.number']: 1
				});
				this.getGoodsAttr(id);
				gSpecificationsModel.init(this);
			},
			
			getGoodsAttr: function(id) {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.goods_attr,
					data: {
						id: id,
						from: self.goods.from ? self.goods.from : '1'
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
					self.setData({
						showGetLogin: true
					});
					this.$store.commit('vuexSet', {
						name: 'show_loginTpl',
						value: true
					})
					return
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
					this.getApp().request({
						url: this.getApp().api.cart.add_cart,
						method: "POST",
						data: {
							goods_id: self.goods.id,
							sku: self.goods.sku,
							num: self.form.number,
							from: self.goods.from ? self.goods.from : '1'
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
		},
		components: {
			custom
		},
		onReachBottom() {
			var self = this
			var url = self.getApp().api.default.all_look;
			var data = {
			};
			self.getApp().core.pading(self, url, data, function(res, index) {
				if (res.data.list.length == 0) {
					self.setData({
						stopLoadMore: true,
					});
					return;
				}
				var newList = res.data.list
				var nowList = self.allLookList
				self.allLookList = nowList.concat(newList)
			});
		},
		onShareAppMessage(options) {
			var user_info = this.getApp().getUser();
			var mch_info = uni.getStorageSync('_mchInfo');
			if (options.from === 'button') {
				var name = options.target.dataset.name;
				var id = options.target.dataset.id
				var sharePic = options.target.dataset.pic
				return {
					path: "/pages/goods/goods?id=" + id + "&from=1" + "&user_id=" + user_info.id + "&mch_id=" +
						mch_info.id,
					imageUrl: sharePic,
					title: name
				};
			} else {
				return {
					path: "member/topicMoreGoods/topicMoreGoods?id=" + this.gid + "&user_id=" + user_info.id + "&mch_id=" +
						mch_info.id,
				};
			}
		}
	}
</script>

<style>
	@import url("~@/components/goods/specifications_model.css");
	page {
		background: #fff;
	}
	.goods-content {
		width: 702rpx;
	}
	
	.goods-content-img {
		width: 250rpx;
		height: 250rpx;
		border-radius: 8rpx;
	}
	.goods-msg {
		padding: 0rpx 0rpx 11rpx 24rpx;
	}
	.transmit {
		width: 123rpx;
		height: 53rpx;
		border: 1rpx solid #F23005;
		line-height: 51rpx;
		text-align: center;
		border-radius: 26rpx;
		color: #F23005;
		font-size: 24rpx;
		background-color: #fff;
		margin-left: 0;
		margin-right: 0rpx;
	}
	
	.add-cart {
		width: 168rpx;
		height: 52rpx;
		background: #F23005;
		box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(242, 48, 5, 0.36);
		border-radius: 26rpx;
		line-height: 52rpx;
		text-align: center;
		border-radius: 26rpx;
		color: #fff;
		font-size: 24rpx;
		margin-left: 20rpx;
	}
	.hot-prefecture {
		margin-top: 60rpx;
	}
	.hot-prefecture-title {
		width: 470rpx;
		height: 46rpx;
		margin: auto;
	}
	.goods {
		width: 340rpx;
		background: #F4F4F4;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.hot-prefecture-goods {
		margin-top: 40rpx;
	}
	.goods-two-msg {
		padding: 20rpx 16rpx;
	}
</style>
