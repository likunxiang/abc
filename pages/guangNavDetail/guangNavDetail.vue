<template>
	<view>
		<common></common>

		<!-- 主体内容开始 -->
		<view class="guang-nav-detail">
			<!-- 筛选右侧栏 -->
			<view class="screen-box-model" catchtouchmove="true" v-if="is_screen">
				<view class="screen-box">
					<view>
						<view class="fs-30 color-333333 ns-text-bold">价格</view>
						<view class="flex align-center ptb-24">
							<view class="screen-box-box">
								<input style="height: 100%" type="text" placeholder="最低价" :value="minPrice" @blur="inputMinPrice"></input>
							</view>
							<view class="fs-30 color-666666 ml-16 mr-16">-</view>
							<view class="screen-box-box">
								<input style="height: 100%" type="text" placeholder="最高价" :value="maxPrice" @blur="inputMaxPrice"></input>
							</view>
						</view>
					</view>
					<!-- <view class="mt-24">
						<view class="fs-30 color-333333 ns-text-bold">分类</view>
						<view class="flex align-center ptb-24 ns-wrap">
							<view :class="'screen-box-box mb-24 ' + ((index+1)%3==0?'':'mr-24') + ' ' + (item.checked?'screen-box-box-active':'')" style="width: 200rpx;" v-for="(item, id) in screenList" :key="id" @tap="changeNav" :data-index="index">{{item.name}}</view>
						</view>
					</view> -->
					<view class="screen-box-btn-box fs-30 flex">
						<view class="screen-box-btn color-333333 mr-24" @tap="reset">重制</view>
						<view class="screen-box-btn color-fff" @tap="screenBtn" style="background: linear-gradient(-90deg,rgba(255,152,2,1),rgba(255,201,1,1));border: none;">确认</view>
					</view>
				</view>
			</view>

			<view class="nav-list">
				<view class="cu-bar search">
					<!-- #ifdef H5 -->
					<view class="search-form round" :style="'border-radius: 28rpx;height: 58rpx;background: #F4F4F4;line-height: 58rpx;'+'margin-top:'+ (customBar - statusBar)+'px;'">
						<text class="iconfont icon-sousuo fs-30 color-616161"></text>
						<input type="text" placeholder="请输入搜索关键字" @blur="inputSearch" :value="searchValue"></input>
					</view>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<view class="search-form round" style="border-radius: 28rpx;height: 58rpx;background: #F4F4F4;line-height: 58rpx;">
						<text class="iconfont icon-sousuo fs-30 color-616161"></text>
						<input type="text" placeholder="请输入搜索关键字" @blur="inputSearch" :value="searchValue"></input>
					</view>
					<!-- #endif -->
				</view>
			</view>
			<block>

				<view class="goods-list" style="height: 100%;">
					<!-- <view class="brand-box">
						<view class="brand-tuijian">
							<view class="title-box">品牌推荐</view>
							<view class="brand-list">
								<scroll-view scroll-x="true">
									<view class="flex" >
										<view class="brand-main">
											<image style="width: 112rpx;height: 112rpx;border-radius: 50%;background: #ccc;" mode="aspectFill"></image>
											<view class="text-center fs-26 color-333333 text-bold" style="padding: 16rpx 0;">三只松鼠</view>
										</view>
										<view class="brand-main">
											<image style="width: 112rpx;height: 112rpx;border-radius: 50%;background: #ccc;" mode="aspectFill"></image>
											<view class="text-center fs-26 color-333333 text-bold" style="padding: 16rpx 0;">三只松鼠</view>
										</view>
										<view class="brand-main">
											<image style="width: 112rpx;height: 112rpx;border-radius: 50%;background: #ccc;" mode="aspectFill"></image>
											<view class="text-center fs-26 color-333333 text-bold" style="padding: 16rpx 0;">三只松鼠</view>
										</view>
										<view class="brand-main">
											<image style="width: 112rpx;height: 112rpx;border-radius: 50%;background: #ccc;" mode="aspectFill"></image>
											<view class="text-center fs-26 color-333333 text-bold" style="padding: 16rpx 0;">三只松鼠</view>
										</view>
										<view class="brand-main">
											<image style="width: 112rpx;height: 112rpx;border-radius: 50%;background: #ccc;" mode="aspectFill"></image>
											<view class="text-center fs-26 color-333333 text-bold" style="padding: 16rpx 0;">三只松鼠</view>
										</view>
									</view>
								</scroll-view>
							</view>
						</view>
						
					</view> -->
					<view class="screen flex ns-justify-content-space-between">
						<view class="flex">
							<view class="flex ns-align-items-flex-center" @tap="openSort">
								<view class="fs-28">综合排序</view>
								<view class="ml-10 fs-34 color-D6D6D6">
									<text v-if="priceDefault" class="iconfont icon-paixu"></text>
									<text v-else :class="'iconfont color-F49E3A ' + (priceUp?'icon-asc':'icon-shengxu')"></text>
								</view>
							</view>
						</view>
						<view class="flex">
							<view class="flex ml-20 ns-align-items-flex-center" @tap="openScreen">
								<view class="fs-28">筛选</view>
								<view class="ml-10 fs-34 color-D6D6D6">
									<text v-if="priceDefault" class="iconfont icon-paixu"></text>
									<text v-else :class="'iconfont color-F49E3A ' + (priceUp?'icon-asc':'icon-shengxu')"></text>
								</view>
							</view>
						</view>

					</view>
					<block v-if="goodsList.length==0">
						<view class="flex-x-center flex-y-center goods-list">暂无相关商品</view>
					</block>
					<block v-else>
						<view class="flex ns-wrap ns-justify-content-space-between p-24 pr">
							<!-- 下拉选择区 -->
							<view class="sort-model" v-if="is_sort" @tap="closeSort">
								<view class="sort-box" @tap.stop="stop">
									<view :class="'sort-title flex justify-between align-center ' + (sortIns==item.value?'sort-title-active':'')"
									 v-for="(item, value) in sortList" :key="value" :data-sort="item.value" @tap="changeSort">
										<view>{{item.label}}</view>
										<view class="iconfont"></view>
									</view>
								</view>
							</view>
							<navigator :url="'/pages/goods/goods?id=' + item.id" class="bg-white goods mb-24" v-for="(item, index) in goodsList"
							 :key="index">
								<view style="width: 340rpx;height: 340rpx;position: relative;">
									<image style="width: 340rpx;height: 340rpx;background: #ccc;border-radius: 20rpx;" mode="aspectFill" :src="item.cover_pic"></image>
									<view v-if="item.goods_num==0" class="nonum-tip">已抢光</view>
								</view>

								<view class="goods-msg">
									<view class="goods-msg-title">{{item.name}}</view>
									<view class="fs-28 flex justify-between align-center">
										<view class="flex align-center">
											<view class="fs-28 color-FF0200 ns-text-bold">￥<text class="fs-36">{{filters.priceStr(item.price)[0]}}.</text><text>{{filters.priceStr(item.price)[1]}}</text></view>
											<!-- <view class="color-8D8D8D ns-text-through ml-16">¥ {{item.original_price}}</view> -->
										</view>
										<view class="add-cart-icon iconfont color-fff fs-26 icon-gouwuche_weixuanzhong" style="width: 40rpx;height: 40rpx;line-height: 40rpx;"
										 @tap.stop="openCart" :data-id="item.id" :data-index="index"></view>

									</view>
								</view>
							</navigator>
						</view>
					</block>
				</view>



			</block>
			<!-- <view class="cart flex ns-align-items-flex-center ns-justify-content-space-between color-fff" @tap="toCart">
				<view class="pr">
					<text class="iconfont icon-show_goumai mr-10 fs-40"></text>
		
					<view class="pa" v-if="cartNum>0" style="width: 30rpx;height: 30rpx;line-height:30rpx;overflow: hidden;text-align: center;top: -10rpx;right: -14rpx;background: #c10000;border-radius: 50%;font-size: 10px;">{{cartNum}}</view>
				</view>
				<view class="fs-24">购物车</view>
		
			</view> -->
			<slide-icon :showPic="mrtj_sc" :cartNum="cartNum"></slide-icon>
		</view>
		<!-- 主体内容结束 -->

		<!-- 多规格开始 -->
		<view v-if="true">
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
			<view class="attr-picker" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + ' ' + (__device=='device_iphone_x'?'bottom: 175rpx':'')"
			 v-if="show_attr_picker" catchtouchmove="preventTouchMove" @tap="hideAttrPicker">
				<scroll-view class="content-box" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + '' + (__device=='device_iphone_x'?'bottom: 175rpx':'')"
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
							<view class="flex flex-x-center" v-if="pageType == 'group' || !pageType || pageType == 'normal'">
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
		</view>
		<!-- 多规格结束 -->
	</view>
</template>

<script>
	// pages/guangNavDetail/guangNavDetail.js
	var gSpecificationsModel = require("../../components/goods/specifications_model.js"); //商城多规格选择
	import slideIcon from "../../components/slideIcon/slideIcon";

	export default {
		data() {
			return {
				customBar: getApp().globalData.customBar,
				statusBar: getApp().globalData.statusBar + 14,
				id: 0,
				goodsList: [],
				page: 1,
				priceDefault: true,
				priceUp: true,
				is_sort: false,
				screenIns: 0,
				pageType: 'normal',
				searchValue: "",
				show_attr_picker: false,
				goods: "",
				goods_attr: "",
				attr_group_list: "",
				showGetLogin: false,
				user_info_show: false,
				cartNum: "",
				screenList: "",
				sortList: "",
				sortIns: "",
				minPrice: "",
				maxPrice: "",
				cat_ids: "",
				is_screen: false,
				toview: "",
				sort: "",
				by: "",
				keyword: "",
				stopLoadMore: false,
				is_no_more: false,
				loadingSwitch: false,
				filters: require('../../utils/filters.js'),
				is_show_first: false,
				isParameter: '',
				groupNum: 0,
				role: '',
				attr_group_num: 1,
				old: '',
			};
		},

		components: {
			slideIcon,
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.setData({
				id: options.cat_id
			});
			this.getWalkGoodsList();
			this.getWalkSort();
			this.getCat();
			uni.setNavigationBarTitle({
				title: options.name
			});
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			var index = 'date' + this.navIns;
			this.setData({
				toview: index
			});
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.getCartNum();
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
		onPullDownRefresh: function() {
			var self = this;
			this.setData({
				cat_ids: self.cat_ids || self.id,
				keyword: self.searchValue || '',
				sort: self.sortIns || '',
				stopLoadMore: false,
				is_no_more: false,
				page: 1
			});
			this.getWalkGoodsList();
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
				var self = this;
				var page = self.page;
				var index = page;
				var data = {
					cat_ids: self.cat_ids || self.id,
					keyword: self.searchValue || '',
					sort: self.sortIns || ''
				};
				var url = this.getApp().api.default.walk_goods_list;
				this.getApp().core.pading(self, url, data, function(res, index) {
					if (res.data.list.length == 0) {
						self.setData({
							stopLoadMore: true,
							is_no_more: true
						});
						return;
					}

					var newGoodList = res.data.list;
					var nowGoodList = self.goodsList.concat(newGoodList);
					self.setData({
						goodsList: nowGoodList,
						loadingSwitch: true
					});
				});
			}
			/**
			 * 用户点击右上角分享
			 */
			// onShareAppMessage: function() {
			// 	return getApp().page.onShareQp(this,)
			// }
			,
		methods: {
			inputSearch(e) {
				this.setData({
					searchValue: e.detail.value,
					page: 1
				});
				this.getWalkGoodsList();
			},

			//加入购物车
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
				gSpecificationsModel.init(this);
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
			addCart: function() {
				var self = this;
				var token = uni.getStorageSync('ACCESS_TOKEN');

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
					self.getApp().request({
						url: self.getApp().api.cart.add_cart,
						method: "POST",
						data: {
							goods_id: self.goods.id,
							sku: self.goods.sku,
							num: self.form.number,
							from: 4
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
			},
			getCat: function() {
				var self = this;
				var page = self.page;
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.walk_son_cats,
					data: {
						cat_id: self.id
					},
					success: function(res) {
						if (res.code == 0) {
							uni.hideLoading();
							self.setData({
								screenList: res.data
							});
						}
					},
					fail: function() {},
					complete: function() {
						uni.stopPullDownRefresh();
					}
				});
			},

			getWalkGoodsList() {
				var self = this;
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.walk_goods_list,
					data: {
						keyword: self.searchValue || '',
						sort: self.sortIns || '',
						cat_ids: self.cat_ids || self.id
					},
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								goodsList: res.data.list
							});
						}
					},
					complete: function() {
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				});
			},

			getWalkSort() {
				this.getApp().request({
					url: this.getApp().api.default.walk_goods_sort,
					data: {},
					success: res => {
						if (res.code == 0) {
							this.setData({
								sortList: res.data
							});
						}
					}
				});
			},

			changeNav: function(e) {
				var self = this;
				var index = e.currentTarget.dataset.index;
				var arr = self.screenList;
				arr[index].checked = !arr[index].checked;
				self.setData({
					['screenList[' + index + ']']: arr[index],
					priceDefault: true,
					priceUp: true
				});
			},

			changeSort(e) {
				var sort = e.currentTarget.dataset.sort;
				this.setData({
					sortIns: sort,
					page: 1
				});
				this.getWalkGoodsList();
			},

			inputMinPrice(e) {
				this.setData({
					minPrice: e.detail.value
				});
			},

			inputMaxPrice(e) {
				this.setData({
					maxPrice: e.detail.value
				});
			},

			reset() {
				var arr = this.screenList;

				for (let i in arr) {
					arr[i].checked = false;
				}

				this.setData({
					minPrice: '',
					maxPrice: '',
					screenList: arr
				});
			},

			screenBtn() {
				var arr = this.screenList;
				var arrId = [];

				for (let i in arr) {
					if (arr[i].checked) {
						arrId.push(arr[i].id);
					}
				} // var arrIdStr = arrId.toString()


				if (!arrId) {
					uni.showToast({
						title: '请选择分类',
						icon: 'none',
						duration: 2500
					});
					return;
				}

				this.setData({
					cat_ids: arrId.toString()
				});
				this.getWalkGoodsList();
				this.closeScreen();
			},

			toCart: function() {
				uni.navigateTo({
					url: '/pages/cart/cart'
				});
			},

			openSort() {
				this.setData({
					is_sort: true
				});
			},

			closeSort() {
				this.setData({
					is_sort: false
				});
			},

			openScreen() {
				this.setData({
					is_screen: true
				});
			},

			closeScreen() {
				this.setData({
					is_screen: false
				});
			},

			// 价格排序
			priceSort: function() {
				var self = this;
				uni.showLoading({
					title: '加载中'
				});

				if (self.priceUp) {
					self.setData({
						priceDefault: false,
						priceUp: false
					});
					this.getApp().request({
						url: this.getApp().api.default.gyg_list,
						data: {
							cat_id: self.id,
							s_cat_id: self.s_cat_id || '',
							sort: 'price',
							by: 'asc'
						},

						success(res) {
							if (res.code == 0) {
								self.setData({
									goodsList: res.data.list,
									sort: 'price',
									by: 'asc'
								});
							}
						},

						complete(res) {
							uni.hideLoading();
						}

					});
				} else {
					self.setData({
						priceDefault: false,
						priceUp: true
					});
					self.getApp().request({
						url: self.getApp().api.default.gyg_list,
						data: {
							cat_id: self.id,
							s_cat_id: self.s_cat_id || '',
							sort: 'price',
							by: 'desc'
						},

						success(res) {
							if (res.code == 0) {
								self.setData({
									goodsList: res.data.list,
									sort: 'price',
									by: 'desc'
								});
							}
						},

						complete(res) {
							uni.hideLoading();
						}

					});
				}
			}
		}
	};
</script>

<style>
	/* pages/guangNavDetail/guangNavDetail.uniss */
	@import "../../components/goods/specifications_model.css";

	page {
		height: 100%;
		background: #f4f4f4;
	}

	.guang-nav-detail {
		min-height: 100%;
	}

	.nav-list {
		position: fixed;
		left: 0;
		top: 0;
		padding: 24rpx 0;
		background: #fff;
		width: 100%;
		z-index: 9;
		border-bottom: 1rpx solid #D6D6D6;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.nav-list-box {
		width: 152rpx;
		padding: 4rpx 0;
		text-align: center;

		font-size: 28rpx;
	}

	.nav-list-box-active {
		background: #252E3E;
		border-radius: 24rpx;
		color: #fff;
	}

	.screen {
		padding: 20rpx 28rpx;
		background-color: #fff;
		width: 100%;
	}

	.nav-screen {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		padding: 25rpx 24rpx;
		z-index: 999;
		background: black;
	}

	.choose-btn {
		width: 180rpx;
		height: 47rpx;
		line-height: 47rpx;
		padding-left: 15rpx;
		text-align: center;
		font-size: 28rpx;
		color: #fff;
		background: #F49E3A;
		border-radius: 24rpx;
	}

	.choose-option {
		position: fixed;
		top: 166rpx;
		left: 0rpx;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.35);
		/* background: #fff; */
		z-index: 999;

	}

	.choose-option-content {
		width: 200rpx;
		text-align: center;
		border: 1rpx solid #8D8D8D;
		line-height: 1 !important;
		padding: 8rpx 8rpx;
		border-radius: 25rpx;
		margin-bottom: 20rpx;
		margin-right: 39rpx;
		font-size: 28rpx;
		color: #8D8D8D;
	}

	.choose-active {
		color: #FF9100;
		border: 1rpx solid #FF9100;
	}

	.choose-option-content-no {
		border: 2rpx solid #D6D6D6;
		color: #8D8D8D;
	}

	.flex-grow-0 {
		flex-grow: 0;
	}

	.goods-list {
		padding-top: 110rpx;
	}

	.text-more-1 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.cart {
		position: fixed;
		left: 25rpx;
		bottom: 98rpx;
		width: 191rpx;
		height: 66rpx;
		padding: 12rpx 25rpx;
		background: rgba(46, 46, 46, 0.7);
		border-radius: 6rpx;
	}

	.goods {
		width: 340rpx;
		border-radius: 20rpx;
	}

	.goods-msg {
		padding: 18rpx 10rpx;
		margin-top: -4rpx;
	}

	.goods-msg-title {
		height: 33rpx;
		font-size: 24rpx;
		color: #595959;
		margin-bottom: 8rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.brand-box {
		background: #f4f4f4;
		padding: 16rpx 24rpx;
	}

	.brand-tuijian {
		width: 100%;
		border-radius: 20rpx;
		background: #fff;
		overflow: hidden;

	}

	.title-box {
		width: 190rpx;
		height: 74rpx;
		text-align: center;
		line-height: 74rpx;
		font-size: 38rpx;
		color: #FFFFFF;
		background: linear-gradient(-90deg, rgba(255, 55, 80, 1), rgba(255, 112, 6, 1));
		border-radius: 20rpx 0 20rpx 0;

	}

	.brand-list {
		padding: 8rpx 0 24rpx 24rpx;
	}

	.brand-main {
		width: 140rpx;
		margin-right: 24rpx;
		padding: 16rpx 14rpx 0;
	}

	.add-cart-icon {
		width: 30rpx;
		height: 30rpx;
		line-height: 30rpx;
		text-align: center;
		background-color: #F23005;
		border-radius: 50%;
	}

	.sort-model {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0rpx;
		left: 0rpx;
		background: rgba(0, 0, 0, .5);
		z-index: 10;
	}

	.sort-box {
		width: 100%;
		padding: 0 24rpx;
		border-radius: 0 0 30rpx 30rpx;
		background: #fff;
	}

	.sort-title {
		padding: 24rpx 0;
		color: #999999;
		font-size: 24rpx;
	}

	.sort-title-active {
		color: #FF8400;
	}

	.screen-box-model {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0rpx;
		left: 0rpx;
		background: rgba(0, 0, 0, .5);
		z-index: 10;
	}

	.screen-box {
		position: absolute;
		right: 0rpx;
		top: 0rpx;
		width: 697rpx;
		height: 100%;
		background: #fff;
		padding: 24rpx 25rpx;
		border-radius: 30rpx 0 0 30rpx;
	}

	.screen-box-box {
		width: 180rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		background: #EBEBEB;
		border-radius: 30rpx;
		font-size: 24rpx;
		color: #999999;
	}

	.screen-box-box-active {
		background: rgba(255, 195, 48, .2);
		color: #FF8400;
	}

	.screen-box-btn-box {
		position: absolute;
		bottom: 24rpx;
		right: 24rpx;
	}

	.screen-box-btn {
		width: 262rpx;
		height: 82rpx;
		line-height: 78rpx;
		text-align: center;
		border: 2rpx solid #616161;
		border-radius: 40rpx;
	}
</style>
