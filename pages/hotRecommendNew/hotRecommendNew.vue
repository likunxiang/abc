<template>
	<view>
		<common></common>
		<!--pages/acitivityPage/acitivityPage.wxml-->
		<block data-src="/components/share/share.wxml">
			<view :class="'share-modal ' + share_modal_active + ' ' + __device" catchtouchmove="true" @tap="shareModalClose"
			 v-if="true">
				<view :class="'share-modal-body ' + __device" @tap.stop="shop">
					<text class="close pa iconfont icon-guanbi2" @tap="shareModalClose"></text>
					<!-- <view class="shareGet">分享赚 <span>¥ 65</span></view>
		        <view class="tips">收益仅自己可见</view> -->
					<view class="flex-row">
						<view class="flex-grow-1 flex-x-center">
							<button open-type="share" class="share-bottom" style="height:100%;">
								<text class="iconfont icon-weixin color-fff" style="font-size: 50rpx;"></text>
								<view>分享给好友</view>
							</button>
						</view>
						<view class="flex-grow-1 flex-x-center">
							<view @tap="getGoodsQrcode" class="share-bottom">
								<text class="iconfont icon-pengyouquan color-fff" style="font-size: 50rpx;"></text>
								<view>生成商品海报</view>
							</view>
						</view>
					</view>
					<!-- <view bindtap="shareModalClose" class="share-modal-close flex-y-center flex-x-center">关闭</view> -->
				</view>
			</view>

			<!-- 生成海报 -->
			<view :class="'goods-qrcode-modal ' + goods_qrcode_active + ' flex-y-center'" catchtouchmove="true" @tap="goodsQrcodeClose"
			 v-if="share_type == 'code'">
				<view class="goods-qrcode-body flex-col" @tap.stop="shop">
					<view class="flex-grow-1" style="position: relative">
						<view style="position: absolute;left: 0;top:0;width: 100%;height: 100%;">
							<view class="goods-qrcode-box">
								<view class="goods-qrcode-loading flex-x-center flex-y-center" v-if="!goods_qrcode">
									<view class="flex-x-center flex-col">
										<image style="width: 150rpx;height: 150rpx" :src="__wxapp_img.system?__wxapp_img.system.loading2.url:''"></image>
										<view style="color: #888">海报生成中</view>
									</view>
								</view>
								<image @tap="goodsQrcodeClick" mode="aspectFill" :class="'goods-qrcode ' + (goods_qrcode?'active':'')"
								 :data-src="goods_qrcode" :src="goods_qrcode"></image>
							</view>
						</view>
					</view>
					<view class="flex-grow-0 flex-col flex-x-center" style="padding-top: 50rpx;">
						<view>
							<button v-if="goods_qrcode" @tap="saveGoodsQrcode" class="share-btn">保存图片</button>
							<button v-else style="opacity: .4">保存图片</button>
						</view>
					</view>
					<view class="goods-qrcode-close" @tap="goodsQrcodeClose">
						<image :src="__wxapp_img.store.close2.url" style="width: 40rpx;height: 40rpx;display: block"></image>
					</view>
				</view>
			</view>
		</block>

		<view class="page ns-column">
			<view class="header pr">
				<image :src="bg" style="height: 100%;width: 100%;"></image>
				<view class="con flex justify-between align-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
					<view class="backBtn" @tap="goBack">
						<text class="iconfont icon-zuojiantoubeifen"></text>
					</view>
					<view></view>
					<view></view>
				</view>
				<view class="text-center" style="width: 50rpx;height: 50rpx;position: absolute;right: 20rpx;bottom: 50rpx;border-radius: 50%;background: rgba(0,0,0,0.4);text-align: center;line-height: 50rpx;color: #fff;"
				 @tap="showShareModal">
					<view class="iconfont icon-fenxiang"></view>
					<view class="fs-20 color-fff" style="margin-top: -10rpx;">分享</view>
				</view>
				<!-- <view class="roll-tips flex-x-center align-center">
			<swiper autoplay="true" interval="5000" duration="300" vertical="true" circular="true" style="width: 268rpx;height: 52rpx;">
				<swiper-item wx:for="{{scrollList}}" wx:key="key">
					<view class="flex-x-center align-center" style="width: 268rpx;height: 52rpx;">
						<view class="roll-tips-img">
							<image class="roll-tips-img bg-blue" mode="aspectFill" src="{{item.avatar_url}}"></image>
						</view>
						<view class="ml-10 fs-20 color-fff">
							{{item.name}} {{item.msg}}
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view> -->
			</view>
			<scroll-view scroll-y="true" style="height: calc(100vh - 286rpx);background-color: #F4F4F4;padding: 24rpx 24rpx 0;">
				<view class>
					<navigator :url="'/pages/goods/goods?id=' + item.id" class="mb-24 flex" style="background: #fff;border-radius: 20rpx;padding: 16rpx;width: 100%;"
					 v-for="(item, index) in goodsList" :key="index">
						<view class="pr ns-flex ns-justify-content-center">
							<image lazy-load="true" style="width: 248rpx;height: 248rpx;border-radius: 12rpx;" mode="aspectFill" :src="item.first_cover_pic"></image>
							<view v-if="item.goods_num==0" class="nonum-tip">已抢光</view>
						</view>
						<view class="bg-white ml-24 flex1 flex ns-column justify-between" style="width: 397rpx">
							<view>
								<view class="ns-text-limit fs-28 color-333333">{{item.name}}</view>
								<view class="goods-desc color-FFA102 fs-22 ns-flex-shrink-no mt-16">{{item.desc}}</view>
							</view>

							<view class="flex justify-between align-center" style="font-size:36rpx;width: 100%;">
								<view class="flex align-center">
									<view class="color-FF0200" style="font-weight:600">
										<text class="fs-28">￥</text><text>{{filters.priceStr(item.price)[0]}}</text>.<text class="fs-28">{{filters.priceStr(item.price)[1]}}</text>
									</view>
									<!-- <view class="fs-28 color-999999 ml-16 ns-text-through">¥ 104.00</view> -->
								</view>
								<view class="cart-box iconfont icon-gouwuche_weixuanzhong color-fff" @tap.stop="openCart(index)" :data-id="item.id"
								 :data-index="index"></view>
							</view>
						</view>

					</navigator>
				</view>
			</scroll-view>
			<slide-icon :showPic="mrtj_sc" :cartNum="cartNum"></slide-icon>
		</view>

		<!-- 多规格开始 -->
		<block data-src="/components/goods/specifications_model.wxml">
			<view class="get-card-modal flex-x-center flex-y-center ns-column" v-if="is_show_first">
				<view class="get-card-modal-main-first pr flex-y-center" :style="'background: url(' + first_order_img + ') no-repeat center;background-size: 750rpx 772rpx;'">
					<view class="text-center" style="width: 750rpx; height: 772rpx;">
						<view class=" get-card-modal-text-first" style="margin-top: 275rpx;">
							<view>送你一次</view>
							<view>首单享会员机会</view>
						</view>
						<view class="small-tips-first text-center">首次下单可以享受会员价</view>
						<view class="btn-text-first text-center" @tap="closeModal">确定</view>
					</view>
				</view>
			</view>
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
							<block v-if="pageType === 'PINTUAN'">
								<!-- <view style="font-size: 40rpx;" class="flex color-FF0200">
								<view class="">¥ <text style="font-size: 60rpx;">{{filters.priceStr(goods.price)[0]}}.</text><text>{{filters.priceStr(goods.price)[1]}}</text></view>
							</view> -->
								<view class="fs-36 color-FF0100 ns-text-bold mt-20">{{goods.price}}</view>
							</block>
							<block v-else>
								<view style class="flex ns-align-items-flex-center mt-20">
									<view class="fs-36 color-FF0100 ns-text-bold">¥ {{goods.price}}</view>
									<view class="flex align-center" v-if="goods.m_price">
										<view class="iconfont icon-ziyuan101 fs-20 vip-icon" style="color: #F5DBAA;"></view>
										<view class="fs-36 color-333333 ns-text-bold">¥ {{goods.m_price}}</view>
									</view>
									<!-- <view class="color-FF0200" style="font-size: 40rpx;">¥ <text style="font-size: 60rpx;">{{filters.priceStr(goods.price)[0]}}.</text><text>{{filters.priceStr(goods.price)[1]}}</text></view> -->
									<!-- <view class="oldMoney ns-text-bold" wx:if="{{goods.price<(goods.origin_price?goods.origin_price:goods.original_price)}}">￥{{goods.origin_price?goods.origin_price:goods.original_price}}</view> -->
									<!-- <view class="ml-10 color-595959 fs-24" wx:if="{{role=='shoper'&&goods.c1>0}}">赚￥{{goods.c1}}</view> -->
									<!-- <text wx:if="{{goods.is_member_price === true}}" class='is_member_price'>会员价</text> -->
								</view>
							</block>
							<!-- <view class="fs-24 color-333333">已选：红色 ，L码：一件</view> -->
							<!-- <view style="font-size:9pt">
							库存{{goods.num}}
						</view> -->
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
						<!-- <view class="commission-cart flex align-center justify-between text-center">
						<view class="flex align-end">
							<view class="fs-24 color-333333">黄金(赚)</view>
							<view class="fs-30 ns-text-bold" style="color: #FF0000;">¥ {{goods.c1}}</view>
						</view>
						<view class="flex align-end">
							<view class="fs-24 color-333333">钻石(赚)</view>
							<view class="fs-30 ns-text-bold" style="color: #FF0000;">¥ 10.00</view>
						</view>
						<view class="flex align-end">
							<view class="fs-24 color-333333">皇冠(赚)</view>
							<view class="fs-30 ns-text-bold" style="color: #FF0000;">¥ 10.00</view>
						</view>
					</view> -->
						<view style="padding: 24rpx 28rpx">
							<view>
								<view class="attr-group" v-if="groupNum && !oid">
									<view class="attr-group-name">{{attr_group_num.attr_group_name}}</view>
									<view class="attr-list">
										<!--删除了 bindtap="groupCheck" -->
										<text :class="'attr-item ' + (group_checked?'':'active')">{{goods.group_num}}人团</text>
										<!-- <text class="attr-item {{item.checked?'active':''}}" wx:if="{{attr_group_num.attr_list.length>0}}" wx:for="{{attr_group_num.attr_list}}" wx:key="{{item.id}}" data-id="{{item.id}}" bindtap="attrNumClick">{{item.group_num}}人团
		                            </text> -->
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
												<view :class="'flex-grow-0 number-btn number-add iconfont icon-jia ' + (form.number>=goods.goods_num?'disabled':'')"
												 style="margin-top: 0rpx;" @tap="numberAdd"></view>
												<!-- <view class="flex-grow-0 flex-x-center flex-y-center number-btn number-add" bindtap="numberAdd">+
		                                    </view> -->
											</view>
										</view>
									</view>
								</view>
							</block>
							<block v-if="false">
								<view class="fs-28 color-333333 ns-text-bold">保障服务</view>
								<view style="margin-top: 24rpx;">
									<view class="flex align-center">
										<view></view>
										<view class="fs-24 color-333333">全面保障</view>
									</view>
									<view class="flex justify-between mb-20" style="padding-left: 33rpx;padding-top: 22rpx;">
										<view class="flex">
											<view class="iconfont icon-weixuanzhong color-FF0200 fs-30"></view>
											<view class="fs-24 ml-10">
												<view class="color-333333">次年电池换新</view>
												<view class="color-999999 mt-10">容量续航问题免费换原厂电池</view>
											</view>
										</view>
										<view class="fs-24 color-FF0200">¥9.90</view>
									</view>
									<view class="flex justify-between" style="padding-left: 33rpx;padding-top: 22rpx;">
										<view class="flex">
											<view class="iconfont icon-xuanzhong color-FF0200 fs-30"></view>
											<view class="fs-24 ml-10">
												<view class="color-333333">次年电池换新</view>
												<view class="color-999999 mt-10">容量续航问题免费换原厂电池</view>
											</view>
										</view>
										<view class="fs-24 color-FF0200">¥9.90</view>
									</view>
								</view>
								<view style="margin-top: 24rpx;">
									<view class="flex align-center">
										<view></view>
										<view class="fs-24 color-333333">全面保障</view>
									</view>
									<view class="flex justify-between mb-20" style="padding-left: 33rpx;padding-top: 22rpx;">
										<view class="flex">
											<view class="iconfont icon-weixuanzhong color-FF0200 fs-30"></view>
											<view class="fs-24 ml-10">
												<view class="color-333333">次年电池换新</view>
												<view class="color-999999 mt-10">容量续航问题免费换原厂电池</view>
											</view>
										</view>
										<view class="fs-24 color-FF0200">¥9.90</view>
									</view>
									<view class="flex justify-between" style="padding-left: 33rpx;padding-top: 22rpx;">
										<view class="flex">
											<view class="iconfont icon-weixuanzhong color-FF0200 fs-30"></view>
											<view class="fs-24 ml-10">
												<view class="color-333333">次年电池换新</view>
												<view class="color-999999 mt-10">容量续航问题免费换原厂电池</view>
											</view>
										</view>
										<view class="fs-24 color-FF0200">¥9.90</view>
									</view>
								</view>
							</block>
							<view class="flex flex-x-center" v-if="pageType == 'cart'">
								<navigator :url="'/pages/goods/goods?id=' + goods_id + '&from=' + from" class="edit-standard-btn mr-20">查看详情</navigator>
								<view class="edit-standard-btn edit-standard-btn-yellow" @tap="saveEditStandard">确认</view>
							</view>
							<view class="flex flex-x-center" v-if="pageType == 'private'">
								<view class="edit-standard-btn" @tap="saveEditStandard">确认</view>
							</view>
							<view class="flex flex-x-center" v-if="pageType == 'group' || !pageType || pageType == 'normal' || pageType == 'addMenu'">
								<view class="edit-standard-btn edit-standard-btn-yellow" @tap="addCart">确认</view>
							</view>
						</view>
					</scroll-view>

				</scroll-view>
			</view>
			<!-- 产品参数 -->
			<view class="attr-picker " :style="__device=='device_iphone_x'?'bottom: 175rpx':''" v-if="isParameter"
			 catchtouchmove="preventTouchMove" @tap="closeParameter">
				<view @tap.stop="stop" class="content-box" :style="'padding:32rpx 24rpx 0;border-radius:30rpx 30rpx 0px 0px;' + (__device=='device_iphone_x'?'bottom: 175rpx':'')">
					<view class="flex-x-center fs-38 color-333333 mb-30">产品参数</view>
					<scroll-view scroll-y="true" style="max-height: 500rpx;">
						<view v-for="(item, index) in goods.param_json" :key="index" class="parameter-list flex fs-30">
							<view class="color-999999" style="width: 246rpx;">{{item.name}}</view>
							<view class="color-333333">{{item.value}}</view>
						</view>
					</scroll-view>
					<view class="save-btn" @tap="closeParameter">确定</view>
				</view>
			</view>
		</block>
		<!-- 多规格结束 -->
	</view>
</template>

<!-- <script module="filters" lang="wxs" src="../../utils/filters.wxs"></script> -->

<script>
	// pages/acitivityPage/acitivityPage.js
	var gSpecificationsModel = require("../../components/goods/specifications_model.js"); //商城多规格选择
	//商城多规格选择
	var shareWay = require("../../components/share/share.js");
	import slideIcon from "../../components/slideIcon/slideIcon";

	export default {
		data() {
			return {
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				filters: require('../../utils/filters.js'),
				share_type: 'code',
				aid: "",
				bg: "",
				goodsList: "",
				minGoodsInfo: "",
				show_attr_picker: false,
				goods: "",
				goods_attr: "",
				form: {},
				attr_group_list: "",
				showGetLogin: false,
				user_info_show: false,
				goods_qrcode_active: "",
				share_modal_active: "",
				goods_qrcode: "",
				pageType: 'normal',
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
		onLoad: function(options) {
			this.setData({
				aid: options.aid
			});
			this.loadData();
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
			shareWay.init(this);
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
		onShareAppMessage: function(res) {
			var self = this;
			var title = '爆品返场';

			if (res.from === 'button') {
				// 来自页面内转发按钮
				this.shareModalClose();
			}

			return this.getApp().page.onShareQp(this, '', title);
		},
		methods: {
			getCartNum: function() {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.cartCount,
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								cartNum: Number(res.data.count) || 0
							});
						}
					}
				});
			},
			goBack() {
				wx.navigateBack({
					delta: 1,
					fail: res => {
						wx.redirectTo({
							url: '/pages/index/index'
						});
					}
				});
			},
			shop() {

			},
			loadData: function(options) {
				self = this;
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.active_list,
					data: {
						aid: self.aid
					},
					success: function(res) {
						uni.hideLoading();

						if (res.code == 0) {
							self.setData({
								bg: res.data.activity.background,
								goodsList: res.data.page.goods,
								minGoodsInfo: res.data.activity.min_goods_info
							});
						}

						if (res.code == 1) {
							wx.showModal({
								content: res.msg,
								icon: 'none',
								complete: function() {
									wx.redirectTo({
										url: '/pages/index/index'
									});
								}
							});
						}
					},
					complete: function(res) {}
				});
			},

			// 购物车相关
			openCart(index) {
				var id = this.goodsList[index].id;
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
				var token = this.getApp().getStorageSync('ACCESS_TOKEN');

				if (!token) {
					self.setData({
						showGetLogin: true,
						user_info_show: true
					});
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
					this.getApp().request({
						url: this.getApp().api.cart.add_cart,
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
			getGoodsQrcode: function() {
				var self = this;
				self.setData({
					goods_qrcode_active: "active",
					share_modal_active: ""
				});

				if (self.goods_qrcode) {
					return true;
				}

				this.getQrcode();
			},

			getQrcode() {
				var picInfo = this.minGoodsInfo;
				var end_date = picInfo.end_date; // 结束时间获取

				var endTime = new Date(end_date * 1000);
				var month = endTime.getMonth() + 1;

				if (month < 10) {
					month = '0' + month;
				}

				var d = endTime.getDate();

				if (d < 10) {
					d = '0' + d;
				}

				var h = endTime.getHours();

				if (h < 10) {
					h = '0' + h;
				}

				var m = endTime.getMinutes();

				if (m < 10) {
					m = '0' + m;
				}

				var show_end_time = month + '月' + d + '日' + '  ' + h + ':' + m + '结束';
				this.getApp().request({
					url: this.getApp().api.default.walk_activity_detail,
					data: {
						goods_pic: picInfo.goods_pic,
						act_name: picInfo.act_name,
						price_str: picInfo.price_str,
						end_date: show_end_time,
						activity: picInfo.activity,
						qrcode_type: 15
					},
					success: res => {
						if (res.code == 0) {
							this.setData({
								goods_qrcode: res.data.pic_url
							});
						}

						if (res.code == 1) {
							this.goodsQrcodeClose();
							uni.showModal({
								title: "提示",
								content: res.msg,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {}
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
	@import "./hotRecommendNew.css";
</style>
