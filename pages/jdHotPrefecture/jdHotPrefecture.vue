<template>
	<view class="guanyiguan">
		<common></common>
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
								<view class="attr-group" v-for="(attr_group, groupindex) in attr_group_list" :key="groupindex" v-if="attr_group.attr_list.length>0">
									<view class="attr-group-name fs-28 color-333333 ns-text-bold">{{attr_group.attr_group_name}}</view>
									<view class="attr-list">
										<text v-for="(item, childindex) in attr_group.attr_list" :key="childindex" :class="'attr-item ' + (item.checked?'active':'') + ' ' + (item.isHave ?'':'attr_num_0')"
										 :data-groupindex="groupindex" :data-childindex="childindex" :data-type="item.isHave?1:0" @tap="storeAttrClick">{{item.attr_name}}</text>
									</view>
								</view>
							</view>
							<view style="height: 0;border-bottom: 1rpx solid #F4F4F4;margin-bottom: 23rpx"></view>
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
			<!-- 产品参数 -->
			<view class="attr-picker" :style="__device=='device_iphone_x'?'bottom: 175rpx':''" v-if="isParameter" catchtouchmove="preventTouchMove"
			 @tap="closeParameter">
				<view @tap.stop="stop" class="content-box" :style="'padding:32rpx 24rpx 0;border-radius:30rpx 30rpx 0px 0px;' + (__device=='device_iphone_x'?'bottom: 175rpx':'')">
					<view class="flex-x-center fs-38 color-333333 mb-30">产品参数</view>
					<scroll-view scroll-y="true" style="max-height: 500rpx;">
						<view class="parameter-list flex fs-30" v-for="(item, index) in goods.param_json" :key="index">
							<view class="color-999999" style="width: 246rpx;">{{item.name}}</view>
							<view class="color-333333">{{item.value}}</view>
						</view>
					</scroll-view>
					<view class="save-btn" @tap="closeParameter">确定</view>
				</view>
			</view>
		</block>
		<view class="page pr">
			<!-- 筛选右侧栏 -->
			<view class="screen-box-model" :style="'height: calc( 100vh - ' + customBar + 'px);top: ' + customBar + 'px;'"
			 catchtouchmove="true" v-if="is_screen" @tap="closeScreen">
				<view class="screen-box" @tap.stop="stop">
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
					<view class="mt-24" v-if="screenList.length>0">
						<view class="fs-30 color-333333 ns-text-bold">分类</view>
						<view class="flex align-center ptb-24 ns-wrap">
							<view :class="'screen-box-box mb-24 ' + ((index+1)%3==0?'':'mr-24') + ' ' + (item.checked?'screen-box-box-active':'')"
							 style="width: 200rpx;" v-for="(item, id) in screenList" :key="id" @tap="changeNav" :data-index="index">{{item.name}}</view>
						</view>
					</view>
					<view class="screen-box-btn-box fs-30 flex">
						<view class="screen-box-btn color-333333 mr-24" @tap="reset">重置</view>
						<view class="screen-box-btn color-fff" @tap="screenBtn" style="background: linear-gradient(-90deg,rgba(255,152,2,1),rgba(255,201,1,1));border: none;">确认</view>
					</view>
				</view>
			</view>
			<!-- 导航开始 -->
			<view class="heardBanner">
				<view class="con flex ns-justify-content-space-between ns-align-items-flex-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;padding-left:20rpx;padding-right:20rpx;background: linear-gradient(90deg, #b91811,#CB2118,#D02418,#c71d16);'">
					<view class="go-back" style="font-size:30rpx;color:#FFFFFF; margin-top: 8rpx;" @tap="returnPage">
						<text class="iconfont icon-zuojiantoubeifen;"></text>
					</view>
					<view class="search flex align-center ml-10" style="width: 470rpx;margin-top: 8rpx;">
						<view class="iconfont icon-sousuo flex-grow-0" style="color: #626262;opacity: 0.4;"></view>
						<input class="fs-24 flex-grow-1" placeholder="搜索JD的爆款商品" :value="searchValue" @blur="inputSearch" style="color: #9A9A9A;margin-left: 14rpx;"></input>
					</view>
					<view class="flex1"></view>
				</view>
				<view class="banner">
					<!-- <image class="banner" mode="aspectFill" :src="banner_pic"></image> -->
					<image class="banner" mode="aspectFill" :src="hot_kuan"></image>
				</view>
				<!-- <view class="p-24 bg-white">
					<view class="search flex align-center">
						<view class="iconfont icon-sousuo flex-grow-0" style="color: #626262;opacity: 0.4;"></view>
						<input class="fs-24 flex-grow-1" placeholder="搜索JD的爆款商品" :value="searchValue" @blur="inputSearch" style="color: #9A9A9A;margin-left: 14rpx;"></input>
					</view>
				</view> -->

				<view class="guang-nav-list flex bg-white">
					<view style="width: 100%;">
						<!-- <scroll-view scroll-x="true" enable-flex="true" scroll-into-view="{{toview}}" style="padding-right: 24rpx;">
					<view class="flex align-center" style="padding-left: 24rpx;">
						<view class="nav-tab flex-grow-0 ns-flex-shrink-no pr {{index==chooseIns?'nav-active':''}}" bindtap="changeNav"
						 wx:for="{{catalog}}" wx:for-item="value" wx:key="id" wx:for-index="index" data-id="{{value.id}}" data-index="{{index}}"
						 data-text="{{value.name}}">
							<view>{{value.name}}</view>
						</view>
					</view>
				</scroll-view> -->
						<!-- <scroll-view scroll-x="true" enable-flex="true" scroll-into-view="{{toview}}" style="width: 700rpx; box-sizing: border-box;"> -->
						<view class="flex align-center" style="width:700rpx; justify-content: space-around; box-sizing: border-box;margin-left: 25rpx;">
							<view :class="'nav-tab flex-grow-0 ns-flex-shrink-no pr ' + (index==chooseIns?'nav-active':'')" @tap="changeNav"
							 v-for="(value, index) in catalog" :key="index" :data-id="value.id" :data-index="index" :data-text="value.name"
							 style="width:140rpx;">
								<view>{{value.name}}</view>
							</view>
						</view>
						<!-- </scroll-view> -->


					</view>
				</view>
				<view class="guang-nav-list flex bg-white justify-between align-center" style="padding:16rpx 24rpx;border-top: 1rpx solid #E4E4E4;">
					<view style="width: 40%;">
						<scroll-view scroll-x="true" enable-flex="true" :scroll-into-view="toview">
							<view class="flex align-center">
								<view style="margin-right:10rpx" :class="'pr ns-flex-shrink-no ' + (chooseIns==0?'color-333333':'')">
									<view class="color-333333 fs-28" @tap.stop="showChange1">{{moren}}<text :class="'iconfont icon-xiangxia-copy  ' + (showChangeMore?'change':'')"
										 style="display:inline-block;transition:all 0.3s;"></text>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="flex align-center">
						<view class="flex ml-20 ns-align-items-flex-center color-333333" @tap="commissionSort" v-if="role == 'shoper'">
							<view>佣金</view>
							<view class="ml-10 fs-40 color-D6D6D6">
								<text v-if="commissionDefault" class="iconfont icon-paixu"></text>
								<text v-else :class="'iconfont color-F49E3A ' + (commissionUp?'icon-asc':'icon-shengxu')"></text>
							</view>
						</view>
						<view class="flex ml-20 ns-align-items-flex-center color-333333" @tap="priceSort">
							<view style="font-weight: 400;font-size: 28rpx;">价格</view>
							<view class="ml-10 fs-40 color-D6D6D6">
								<text v-if="priceDefault" class="iconfont icon-paixu"></text>
								<text v-else :class="'iconfont color-F49E3A ' + (priceUp?'icon-asc':'icon-shengxu')"></text>
							</view>
						</view>
						<view class="flex ml-20 ns-align-items-flex-center color-333333" @tap="openScreen">
							<view style="color: #343434;">筛选</view>
							<view class="ml-10 fs-30 color-D6D6D6">
								<text class="iconfont icon-shaixuan"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="more1" v-if="showChangeMore" @tap.stop="closeChange" catchtouchmove="preventTouchMove">
				<view class="more-content" :style="'margin-top: calc( ' + (customBar + 'px') + ' + 260rpx + 224rpx - 148rpx )'">
					<!--  more-active -->
					<view :class="'more-list ' + (value.checked?'more-active':'')" @tap="changeMoreNav" v-for="(value, index) in catsArr"
					 :key="index" :data-num="index" :data-id="value.id" :data-index="index" :data-text="value.name">{{value.name}}</view>

				</view>
			</view>
			<view :style="'height:calc( ' + customBar + 'px + 260rpx + 224rpx - 148rpx );'"></view>
			<view class="main p-24" :style="'min-height: calc( 100vh - ' + customBar + 'px - 260rpx - 224rpx + 148rpx  );'" v-if="mainEmpty">
				<!-- 品牌商品 -->
				<view class="flex justify-between ns-wrap">
					<navigator :url="'/pages/goods/goods?id=' + item.id" class="cida goods mb-20 bg-white" v-for="(item, id) in goodList"
					 :key="id">
						<view style="width: 340rpx;height: 340rpx;position: relative;">
							<image style="width: 340rpx;height: 340rpx;background: #ccc;border-radius: 20rpx;" mode="aspectFill" :src="item.cover_pic"></image>
							<view v-if="item.goods_num==0" class="nonum-tip">已抢光</view>
						</view>

						<view class="goods-msg">
							<view class="goods-msg-title">{{item.name}}</view>
							<view class="fs-28 flex justify-between align-center">
								<view class="flex align-center">
									<view class="fs-28 color-FF0200 ns-text-bold">￥<text class="fs-36">{{filters.priceStr(item.price)[0]}}.</text>
										<text>{{filters.priceStr(item.price)[1]}}</text>
									</view>
								</view>
								<view class="add-cart-icon fs-26 iconfont color-fff icon-gouwuche_weixuanzhong" style="width: 40rpx;height: 40rpx;line-height: 40rpx;"
								 @tap.stop="openCart" :data-id="item.id" :data-index="id"></view>

							</view>
						</view>
					</navigator>
				</view>
			</view>
			<view class="main p-24" :style="'min-height: calc( 100vh - ' + customBar + 'px - 260rpx - 224rpx + 148rpx );'"
			 v-else>
				<view style="padding-top: 48rpx;">
					<view class="flex-x-center align-center color-999999">
						<view class="fs-40 iconfont icon-tongzhi2 mr-10"></view>
						<view class="fs-26">抱歉，没有找到相关的商品</view>
					</view>
					<!-- <view class="footer-box">
							<view class="footer-box-btn-pull" @tap="recond">添加爆款</view>
						</view>
						<view class="fs-26 color-000000 text-center">您可以填写正确的商品名称添加爆款，给我们36小时为您找来，并且第一时间通知您，支持比价哦～</view> -->
					<view class="add-desc fs-26 color-333333 text-center">

						您可以填写正确的商品品牌名称在下方输入框
						例如：七匹狼，给我们36小时为您找来，并且
						第一时间通知您，支持比价哦～

					</view>
					<view class="add-content flex-x-center">
						<view class="add-content-input-box bg-white">
							<input class="add-content-input fs-30 color-333333" type="text" :value="addMsg" placeholder="例如：七匹狼" @blur="inputAddMsg" />
						</view>
						<view class="fs-30 color-fff ns-text-bold add-content-btn" @tap="recond">提交</view>
					</view>
				</view>

			</view>
			<!-- 导航结束 -->
			<slide-icon :showPic="mrtj_sc" :cartNum="cartNum"></slide-icon>
			<!-- 回到顶部 -->
			<to-top :scrollStop="scrollStop" :is_top="is_top" :page="page1" :totalPage="totalPage"></to-top>
		</view>
	</view>
</template>


<script>
	// pages/jdHotMenu/jdHotMenu.js
	var gSpecificationsModel = require("../../components/goods/specifications_model.js"); //商城多规格选择
	import slideIcon from "../../components/slideIcon/slideIcon";
	import toTop from '../../components/toTop/toTop.vue'
	export default {
		data() {
			return {
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				filters: require('../../utils/filters.js'),
				chooseIns: 0,
				chooseMoreIns: 0,
				moren: '全部品类',
				choose: [],
				//多选数组
				catsArr: [],
				catalog: [{
					name: '食品饮料',
					id: 0
				}, {
					name: '家居日用',
					id: 1
				}, {
					name: '美妆个护',
					id: 2
				}, {
					name: '零食坚果',
					id: 3
				}, {
					name: '家用电器',
					id: 4
				}],
				priceDefault: true,
				commissionDefault: true, // 佣金排序
				commissionUp: true,
				priceUp: true,
				is_screen: false,
				showChangeMore: false,
				page: 1,
				pageType: 'normal',
				cat_id: "",
				screenList: "",
				searchValue: "",
				stopLoadMore: false,
				is_no_more: false,
				goodList: [],
				sort: "",
				minPrice: "",
				maxPrice: "",
				cat_ids: "",
				show_attr_picker: false,
				goods: "",
				goods_attr: "",
				attr_group_list: "",
				showGetLogin: false,
				user_info_show: false,
				cartNum: "",
				loadingSwitch: false,
				form: {
					number: 1
				},
				role: 'user',
				banner_pic: '', // jdbanner
				totalPage: 0,
				scrollStop: true,
				is_top: false,
				page1: 1,
				y: uni.getSystemInfoSync().windowHeight,
				mainEmpty: true, // 用于加载中不展示空白页
				hot_kuan: uni.getStorageSync('_img').hot_kuan,
				addMsg: '', // 添加品牌内容
			};
		},

		components: {
			slideIcon,
			toTop
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.getCats();
			this.setData({
				role: uni.getStorageSync('role') || 'user',
				banner_pic: uni.getStorageSync('_img').hot_kuan
			});
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
		onPageScroll(e) {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.scrollStop = true
			}, 300)
			var self = this;
			var top = e.scrollTop
			var touchTop = top + 300
			if (top >= 600) {
				self.setData({
					is_top: true
				})
				/////////////
				if (this.totalPage == 0) {
					this.scrollStop = true;
					return;
				}
				this.scrollStop = false;
				let height = 0;
				let height_a = 0;
				let height_b = 0;
				let info = uni.createSelectorQuery().select(".guanyiguan");
				info.boundingClientRect((data) => { //data - 各种参数

					height = data.height;
					let class1 = '.cida'
					let info2 = uni.createSelectorQuery().select(class1);
					info2.boundingClientRect((data) => { //data - 各种参数
						//console.log('data',data)
						if (data == null) {
							return;
						}
						height_b = data.height; //一个子元素的高度

						//console.log('距离底部', (height - this.y) - top)

						let cha = parseInt(((height - this.y) - top) / (height_b * 5)) > 0 ? parseInt(((height - this.y) - top) /
							(height_b * 5)) : 1;

						let page = this.page;
						if (this.is_no_more == true) {
							--page;
						}
						if (cha > page) {
							cha = page;
						}

						this.page1 = (page - cha + 1) > this.totalPage ? this.totalPage : (page - cha + 1);

					}).exec()
				}).exec()
			}
			if (top < 600 && self.is_top) {
				self.setData({
					is_top: false
				})

			}


		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
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
							self.setData({
								catalog: res.data,
								catsArr: res.data[0].child
							});

							if (self.catalog.length > 0) {
								var cat_id = self.catalog[0].id;
								self.setData({
									cat_id: cat_id
								});
								self.getWalkGoodsList();
							}
						}
					},
					fail: function() {},
					complete: function() {
						uni.stopPullDownRefresh();
					}
				});
			},
			getScreenList: function() {
				var self = this;
				var page = self.page;
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.walk_son_cats,
					data: {
						cat_id: self.cat_id
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

			inputSearch(e) {
				this.setData({
					searchValue: e.detail.value,
					chooseIns: '-1',
					cat_id: '',
					page: 1,
					stopLoadMore: false,
					is_no_more: false
				});
				this.getWalkGoodsList();
			},
			// 输入要添加的品牌信息
			inputAddMsg(e) {
				this.addMsg = e.detail.value
			},
			recond() {
				var token = uni.getStorageSync('ACCESS_TOKEN')
				if (!token) {
					this.setData({
						showGetLogin: true,
					})
					this.$store.commit('vuexSet', {
						name: 'show_loginTpl',
						value: true
					})
					return
				}
				var keyword = this.addMsg;

				if (!keyword) {
					return;
				}

				this.getApp().request({
					url: this.getApp().api.default.recond_goods_want,
					method: 'POST',
					data: {
						keyword: keyword
					},
					success: res => {
						if (res.code == 0) {
							wx.showToast({
								title: '添加成功',
							});
						} else {
							wx.showModal({
								title: res.msg,
								showCancel: false
							});
						}
					}
				});
			},

			getWalkGoodsList() {
				var self = this;
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.walk_goods_list_JD,
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
								totalPage: res.data.meta.totalCount || 0,
								mainEmpty: res.data.list.length > 0 ? true : false
							});
						}
					},
					complete: function() {
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				});
			},

			returnPage() {
				wx.navigateBack({
					delta: 1,
					fail: res => {
						wx.redirectTo({
							url: '/pages/index/index'
						});
					}
				});
			},

			changeNav(e) {
				var index = e.currentTarget.dataset.index;
				var id = e.currentTarget.dataset.id;
				this.setData({
					chooseIns: index,
					cat_id: id,
					sort: '',
					page: 1,
					stopLoadMore: false,
					is_no_more: false,
					showChangeMore: false,
					moren: '全部品类'
				});
				uni.showLoading({
					title: '加载中'
				});
				this.getWalkGoodsList();
			},

			changeMoreNav: function(e) {
				var id = e.currentTarget.dataset.id;
				var name = e.currentTarget.dataset.name;
				var index = e.currentTarget.dataset.index;
				var num = e.currentTarget.dataset.num;
				let newCatArr = this.catsArr;
				newCatArr[index].checked = !newCatArr[index].checked;
				var newChooseIns = [];
				var moren = [];
				newCatArr.map((item, index) => {
					if (item.checked) {
						newChooseIns.push(item.id);
						moren.push(item.name);
					}
				});

				this.setData({
					chooseMoreIns: newChooseIns.join(','),
					cat_id: newChooseIns.join(','),
					moren: moren.join(',') ? moren.join(',') : '全部品类',
					priceDefault: true,
					commissionDefault: true,
					sort: '',
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
			commissionSort: function() {
				//多选关闭
				this.setData({
					page: 1,
					stopLoadMore: false,
					is_no_more: false
				});
				let self = this;
				var up = self.commissionUp;
				self.setData({
					priceDefault: true,
					commissionDefault: false,
					commissionUp: !up
				});
				uni.showLoading({
					title: '加载中'
				});

				if (self.commissionUp == true) {
					self.setData({
						sort: 1
					});
				} else {
					self.setData({
						sort: 5
					});
				}

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
					commissionDefault: true,
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
					wx.showToast({
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
				var token = this.getApp().core.getStorageSync('ACCESS_TOKEN');

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
					this.getApp().request({
						url: this.getApp().api.cart.add_cart,
						method: "POST",
						data: {
							goods_id: self.goods.id,
							sku: self.goods.sku,
							num: self.form.number,
							from: '1'
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
			showChange1: function() {
				var chooseIns = this.chooseIns;
				this.setData({
					showChangeMore: !this.showChangeMore,
					catsArr: this.catalog[chooseIns].child
				});
			},
			//多选关闭
			closeChange: function() {
				this.setData({
					showChangeMore: false
				});
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
				var url = this.getApp().api.default.walk_goods_list_JD;
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
	@import "./jdHotPrefecture.css";
</style>
