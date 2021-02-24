<template>
	<view>
		<view class="page">
			<!-- 筛选右侧栏 -->
			<view class="screen-box-model" style="height:100vh;" catchtouchmove="true" v-if="is_screen" @tap="closeScreen">
				<view class="screen-box" @tap.stop="stop">
					<view>
						<view class="fs-30 color-333333 ns-text-bold">价格</view>
						<view class="flex align-center ptb-24">
							<view class="screen-box-box">
								<input style="height: 100%" type="text" placeholder="最低价" :value="minPrice" @blur="inputMinPrice"></input>
							</view>
							<view class=" fs-30 color-666666 ml-16 mr-16">-</view>
							<view class="screen-box-box">
								<input style="height: 100%" type="text" placeholder="最高价" :value="maxPrice" @blur="inputMaxPrice"></input>
							</view>
						</view>
					</view>
					<view class="mt-24" v-if="screenList.length>0">
						<view class="fs-30 color-333333 ns-text-bold">分类</view>
						<view class="flex align-center ptb-24 ns-wrap">
							<view v-for="(item, index) in screenList" :key="index" :class="'screen-box-box mb-24 ' + ((index+1)%3==0?'':'mr-24') + ' ' + (item.checked?'screen-box-box-active':'')"
							 style="width: 200rpx;" @tap="changeNav" :data-index="index">{{item.name}}</view>
						</view>
					</view>
					<view class="screen-box-btn-box fs-30 flex">
						<view class="screen-box-btn color-333333 mr-24" @tap="reset">重置</view>
						<view class="screen-box-btn color-fff" @tap="screenBtn" style="background: linear-gradient(-90deg,rgba(255,152,2,1),rgba(255,201,1,1));border: none;">确认</view>
					</view>
				</view>
			</view>
			<view class="heardBanner">
				<view class="p-24 bg-white">
					<view class="search flex align-center">
						<view class="iconfont icon-sousuo flex-grow-0" style="color: #626262;opacity: 0.4;"></view>
						<input class="fs-24 flex-grow-1" placeholder="搜索JD的爆款商品" :value="searchValue" @input="inputSearch" style="color: #9A9A9A;margin-left: 14rpx;"></input>
					</view>
				</view>
				<view class="guang-nav-list flex bg-white justify-between" style="padding:0rpx 0rpx 0 24rpx;border-top: 1rpx solid #E4E4E4;">
					<view style="width: 65%;">
						<scroll-view scroll-x="true" enable-flex="true" :scroll-into-view="toview">
							<view class="flex align-center">
								<view style="margin-right:10rpx" :class="'pr nav-tab ns-flex-shrink-no ' + (chooseIns==0?'color-333333':'')">
									<view class="color-333333" @tap.stop="showChange1">{{moren}}
										<text :class="'iconfont icon-xiangxia-copy  ' + (showChangeMore?'change':'')" style="display:inline-block;transition:all 0.3s;"></text>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="flex align-center">
						<view class="flex ml-20 ns-align-items-flex-center color-333333" @tap="priceSort">
							<view>价格</view>
							<view class="ml-10 fs-40 color-D6D6D6">
								<text v-if="priceDefault" class="iconfont icon-paixu"></text>
								<text v-else :class="'iconfont color-F49E3A ' + (priceUp?'icon-asc':'icon-shengxu')"></text>
							</view>
						</view>
						<!-- <view class="flex ml-20 ns-align-items-flex-center color-333333" bindtap="openScreen">
							<view style="color: #343434;">筛选</view>
							<view class="ml-10 fs-30 color-D6D6D6">
								<text class="iconfont icon-shaixuan"></text>
							</view>
						</view> -->
					</view>
				</view>
			</view>
			<view class="more1" v-if="showChangeMore" @tap.stop="closeChange" catchtouchmove="preventTouchMove">
				<view class="more-content" style="margin-top: 194rpx" @tap.stop="showChange">
					<!--  more-active -->
					<view v-for="(value, index) in catsArr" :key="index" :class="'more-list ' + (value.checked?'more-active':'')" @tap="changeMoreNav"
					 :data-num="index" :data-id="value.id" :data-index="index" :data-text="value.name">{{value.name}}
					</view>

				</view>
			</view>
			<view style="height:194rpx"></view>
			<view class="main p-24 pr" style="min-height: calc( 100vh - 194rpx );overflow: hidden;">
				<!-- JD提示 -->
				<view class="JD-tips fs-24 color-333333">JD商品满129元包邮，商品未满129元需要加运费</view>
				<!-- 品牌商品 -->
				<block v-if="true">
					<view v-for="(item, index) in goodList" :key="index">
						<!-- 一行 -->
						<navigator :url="'/pages/goods/goods?id=' + item.id" class="mb-24 flex" style="border-radius: 20rpx;">
							<view class="good-image flex-grow-0" style="margin-right: 26rpx;">
								<image mode="aspectFit" class="good-image" :src="item.cover_pic"></image>
							</view>
							<view class="flex ns-column justify-between flex-grow-1">
								<view class="fs-28 color-333333 word">{{item.name}}</view>
								<view class="flex align-center justify-between">
									<view class="flex color-FF0200 ">
										<view class="fs-26" style="margin-top: 10rpx;">¥</view>
										<view class="fs-36"><text class="fs-36">{{filters.priceStr(item.price)[0]}}.</text><text>{{filters.priceStr(item.price)[1]}}</text></view>
									</view>
									<view class="iconfont add-cart-icon icon-gouwuche_weixuanzhong fs-30 color-fff" @tap.stop="openCart" :data-id="item.id"
									 :data-index="index" :data-list="item"></view>
								</view>
							</view>
						</navigator>
					</view>
				</block>
				<!-- 底部提示 -->
				<view class="footer-tips flex justify-between">
					<view>
						<view class="flex justify-between">
							<view>商品总计 ：</view>
							<view class="fs-28 color-FF0200">¥{{total_price_add_menu}}</view>
						</view>
						<view class="fs-24 color-333333">{{showText}}</view>
					</view>
					<navigator url="/pages/cart/cart" class="to-cart-btn fs-28 color-fff">去购物车</navigator>
				</view>
			</view>
			<!-- 导航结束 -->
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



<script>
	// pages/jdHotMenu/jdHotMenu.js
	var gSpecificationsModel = require("../../components/goods/specifications_model.js"); //商城多规格选择
	import slideIcon from '@/components/slideIcon/slideIcon.vue'
	export default {
		data() {
			return {
				filters: require('../../utils/filters.js'),
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				chooseIns: 0,
				chooseMoreIns: 0,
				choose: [],
				//多选数组
				catsArr: [],
				priceDefault: true,
				priceUp: true,
				is_screen: false,
				showChangeMore: false,
				moren: '全部品类',
				page: 1,
				pageType: 'addMenu',
				goodList: "",
				showText: "",
				total_price_add_menu: "",
				cat_id: "",
				stopLoadMore: false,
				is_no_more: false,
				searchValue: "",
				sort: 0,
				minPrice: "",
				maxPrice: "",
				screenList: "",
				cat_ids: "",
				show_attr_picker: false,
				goods: "",
				goods_attr: "",
				attr_group_list: "",
				showGetLogin: false,
				user_info_show: false,
				cartNum: 0,
				loadingSwitch: false,
				toview:'',
				mrtj_sc:'',
				//多规格变量
				is_show_first:false,
				isParameter:'',
				role:'',
				groupNum:0,
				form: {
					number: 1
				}
			
				
			};
		},

		components: {
			slideIcon
		},
	
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.getCats();
			this.getWalkGoodsList();
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
		onReachBottom: function() {
			this.getMore();
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			getWalkGoodsList() {
				var self = this;
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.get_collage_goods,
					data: {
						cat_ids: self.cat_id,
						sort: self.sort || '',
						keyword: self.searchValue || '',
						min_price: self.minPrice || '',
						max_price: self.maxPrice || ''
					},
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								goodList: res.data.list,
								showText: res.data.free_price,
								total_price_add_menu: res.data.all_price
							});
						}
					},
					complete: function() {
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				});
			},

			getCats: function() {
				var self = this;
				var page = self.page;
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.common_walk_cats,
					success: function(res) {
						if (res.code == 0) {
							uni.hideLoading();
							var arr = res.data;

							for (let i in arr) {
								arr[i].checked = false;
							}

							self.setData({
								catsArr: arr
							});
						}
					},
					fail: function() {},
					complete: function() {
						uni.stopPullDownRefresh();
					}
				});
			},

			returnPage() {
				uni.navigateBack({
					delta: 1,
					fail: res => {
						uni.redirectTo({
							url: '/pages/index/index'
						});
					}
				});
			},

			changeNav(e) {
				var index = e.currentTarget.dataset.index;
				this.setData({
					chooseIns: index,
					cat_id: index,
					page: 1,
					stopLoadMore: false,
					is_no_more: false
				});
			},

			inputSearch(e) {
				this.setData({
					searchValue: e.detail.value,
					page: 1,
					stopLoadMore: false,
					is_no_more: false
				});
				this.getWalkGoodsList();
			},

			changeMoreNav: function(e) {
				var id = e.currentTarget.dataset.id;
				var name = e.currentTarget.dataset.name;
				var index = e.currentTarget.dataset.index;
				let newCatArr = this.catsArr;
				newCatArr[index].checked = !newCatArr[index].checked;
				var newChooseIns = [];
				var moren = [];
				newCatArr.map((item, index) => {
					if (item.checked) {
						newChooseIns.push(item.id);
						moren.push(item.name);
					}
				}); // console.log(newChooseIns.join(','))

				this.setData({
					chooseMoreIns: newChooseIns.join(','),
					cat_id: newChooseIns.join(','),
					moren: moren.join(',') ? moren.join(',') : '全部品类',
					priceDefault: true,
					catsArr: newCatArr,
					page: 1,
					stopLoadMore: false,
					is_no_more: false
				});
				uni.showLoading({
					title: '加载中'
				});
				this.getWalkGoodsList();
			},
			// 价格排序
			priceSort: function() {
				//多选关闭
				this.setData({
					page: 1,
					stopLoadMore: false,
					is_no_more: false
				});
				let self = this;
				var up = self.priceUp;
				self.setData({
					priceDefault: false,
					priceUp: !up
				});
				uni.showLoading({
					title: '加载中'
				});

				if (self.priceUp == true) {
					self.setData({
						sort: 3
					});
				} else {
					self.setData({
						sort: 2
					});
				}

				this.getWalkGoodsList();
			},

			openScreen() {
				this.setData({
					is_screen: true
				});
			},

			stop() {
				return;
			},

			closeScreen() {
				this.setData({
					is_screen: false
				});
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
			},

			getGoodsAttr: function(id) {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.goods_attr,
					data: {
						id: id,
						from: '1'
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
						showGetLogin: true,
						user_info_show: true
					});
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
							from: self.goods.from ? self.goods.from : '1'
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
								show_attr_picker: false,
								showText: res.data.free_price,
								total_price_add_menu: res.data.all_price
							});
							self.sendEvent("加入购物车", {
								"商品名称": self.goods.name,
								"商品ID": self.goods.id,
							})
						}
					});
				}
			},
			showChange1: function() {
				this.setData({
					showChangeMore: !this.showChangeMore
				});
			},
			//多选关闭
			closeChange: function() {
				this.setData({
					showChangeMore: false
				});
			},
			showChange(){},
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

			// 上拉分页
			getMore() {
				var self = this;
				var page = self.page;
				var index = page;
				var data = {
					cat_ids: self.cat_id,
					sort: self.sort || '',
					keyword: self.searchValue || '',
					min_price: self.minPrice || '',
					max_price: self.maxPrice || ''
				};
				var url = this.getApp().api.default.get_collage_goods;
				this.getApp().core.pading(self, url, data, function(res, index) {
					if (res.data.list.length == 0) {
						self.setData({
							stopLoadMore: true,
							is_no_more: true
						});
						return;
					}

					var newGoodList = res.data.list;
					var nowGoodList = self.goodList.concat(newGoodList);
					self.setData({
						goodList: nowGoodList,
						loadingSwitch: true
					});
				});
			}

		}
	};
</script>
<style>
	/* pages/jdHotPrefecture/jdHotPrefecture.wxss */
	@import "../../components/goods/specifications_model.css";

	page {
		background: #fff;
	}

	.page {
		min-height: 100%;
		width: 750rpx;
	}

	.heardBanner {
		width: 750rpx;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9;
	}

	.search {
		width: 702rpx;
		height: 60rpx;
		line-height: 60rpx;
		background: #F4F4F4;
		border-radius: 30rpx;
		padding: 0 24rpx;
	}

	.search-goods {
		width: 702rpx;
		height: 89rpx;
		line-height: 89rpx;
		background: #F4F4F4;
		border-radius: 8rpx;
		padding: 0 26rpx;
		margin-top: 40rpx;
	}

	/* 滑动选择 */
	.nav-tab {
		padding: 25rpx 0rpx;
		font-size: 30rpx;
		margin-right: 47rpx;
	}

	.nav-active {
		width: 44rpx;
		height: 8rpx;
		position: absolute;
		bottom: 0rpx;
		left: 50%;
		margin-left: -22rpx;
		background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
		border-radius: 4rpx;
		padding-right: 47rpx;
	}

	/* 滑动选择 end*/

	.screen-box-model {
		position: fixed;
		width: 100%;
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

	.main {
		width: 750rpx;
		background: #fff;
		padding-top: 108rpx;
		padding-bottom: 124rpx;
	}

	.sell-up {
		width: 113rpx;
		height: 113rpx;
		border-radius: 50%;
		background: rgba(38, 38, 38, 0.45);
		position: absolute;
		left: 44rpx;
		top: 43rpx;
		padding: 24rpx 0;
		text-align: center;
		font-size: 22rpx;
		color: #fff;
	}

	.line {
		width: 67rpx;
		height: 2rpx;
		background: #fff;
		margin: 4rpx auto;
	}

	.text-more-1 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}



	.more1 {
		width: 750rpx;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		bottom: 0;
	}

	.more-content {
		width: 750rpx;
		background-color: #fff;
		padding: 6rpx 27rpx 0rpx 27rpx;
		/* margin-top: 286rpx; */
		margin-top: 370rpx;
		border-radius: 0px 0px 30rpx 30rpx;
		min-height: 200rpx;
		animation: open 0.3s;
		-moz-animation: open 0.3s;
		/* Firefox */
		-webkit-animation: open 0.3s;
		/* Safari 和 Chrome */
		-o-animation: open 0.3s;
		overflow: hidden;
	}

	.more-list {
		display: inline-block;
		height: 54rpx;
		line-height: 54rpx;
		padding-left: 22rpx;
		padding-right: 22rpx;
		font-size: 26rpx;
		color: #999;
		border-radius: 27rpx;
		background-color: #f4f4f4;
		margin-right: 32rpx;
		margin-bottom: 32rpx;
	}

	.more-active {
		color: #ffc330;
		background-color: #fff3d6;
	}

	@keyframes open {
		from {
			transform: translateY(-200rpx);
		}

		to {
			transform: translateY(0);
		}
	}

	/* 旋转 */

	.change {
		transform: rotate(180deg);
	}

	.JD-tips {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		padding: 26rpx 24rpx;
		background: #F4F4F4;
	}

	.good-image {
		width: 220rpx;
		height: 220rpx;
		border-radius: 14rpx;
		background: #0081FF;
	}

	.add-cart-icon {
		width: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		background-color: #F23005;
		border-radius: 50%;
	}

	.footer-tips {
		width: 750rpx;
		padding: 14rpx 24rpx;
		background: #fff;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		z-index: 1;
	}

	.to-cart-btn {
		width: 180rpx;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		background: linear-gradient(-90deg, #FFC500, #FF9902);
		border-radius: 36rpx;
		font-weight: bold;
	}
	
	.word{
		word-break: break-word;
	}
</style>
