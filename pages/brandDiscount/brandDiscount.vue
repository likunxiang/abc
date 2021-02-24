<template>
	<view class="guanyiguan page pr">
		<common></common>
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
			<view class="con flex ns-justify-content-space-between ns-align-items-flex-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;padding-left:20rpx;padding-right:20rpx;background: linear-gradient(90deg, #8314ee,#8814EE,#9613E9,#A113E5);'">
				<view class="go-back" style="font-size:30rpx;color:#FFFFFF;margin-top: 8rpx;" @tap="returnPage">
					<text class="iconfont icon-zuojiantoubeifen"></text>
				</view>
				<view class="search flex align-center ml-10" style="width: 470rpx;margin-top: 8rpx;">
					<view class="iconfont icon-sousuo flex-grow-0" style="color: #626262;opacity: 0.4;"></view>
					<input class="fs-24 flex-grow-1" placeholder="搜索您感兴趣的品牌" :value="searchValue" @blur="inputSearch" style="color: #9A9A9A;margin-left: 14rpx;"></input>
				</view>
				<view class="flex1"></view>
			</view>
			<view class="banner">
				<!-- <image class="banner" mode="aspectFill" :src="banner_pic"></image> -->
				<image class="banner" mode="aspectFill" :src="brand_banner"></image>
			</view>
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
						 style="width:148rpx;">
							<view>{{value.name}}</view>
						</view>
					</view>
					<!-- </scroll-view> -->



				</view>
			</view>
			<view class="guang-nav-list flex bg-white justify-between align-center" style="padding:16rpx 24rpx;border-top: 1rpx solid #E4E4E4;">
				<view style="width: 65%;">
					<!-- <scroll-view scroll-x="true" enable-flex="true" :scroll-into-view="toview">
						<view class="flex align-center">
							<view style="margin-right:10rpx" :class="'pr ns-flex-shrink-no ' + (chooseIns==0?'color-333333':'')">
								<view class="color-333333 fs-28">{{moren}}
								</view>
							</view>
						</view>
					</scroll-view> -->
				</view>
				<view class="flex align-center">
					<view class="flex ml-20 ns-align-items-flex-center color-333333" @tap="priceSort">
						<view style="font-size: 28rpx;font-weight: 400;">上新</view>
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
			<view class="more-content" :style="'margin-top: calc( ' + (customBar + 'px') + ' + 260rpx + 224rpx - 148rpx )'">
				<!--  more-active -->
				<view :class="'more-list ' + (value.checked?'more-active':'')" @tap.stop="changeMoreNav" v-for="(value, index) in catsArr"
				 :key="index" :data-num="index" :data-id="value.id" :data-index="index" :data-text="value.name">{{value.name}}</view>

			</view>
		</view>
		<view :style="'height:calc( ' + customBar + 'px + 260rpx + 224rpx - 148rpx );'"></view>
		<view class="main p-24" :style="'min-height: calc( 100vh - ' + customBar + 'px - 260rpx - 224rpx + 148rpx );'" v-if="mainEmpty">
			<!-- 品牌商品 -->
			<block>
				<view class="cida" v-for="(item, id) in actList" :key="id">
					<!-- 一行 -->
					<view class="bg-white mb-24" style="border-radius: 20rpx;" v-if="item.show_style == 1">
						<!-- 单品牌内容 -->
						<!-- 品牌名字 -->
						<view style="padding: 25rpx 24rpx;">
							<navigator :url="'/pages/activity/activity?aid=' + item.id" class="flex ns-justify-content-space-between align-center"
							 hover-class="none">
								<view class="flex" style="width: 85%;">
									<image lazy-load="true" style="width: 100rpx;height: 100rpx;border-radius: 20rpx;border: 2rpx solid #F4F4F4;"
									 mode="aspectFit" :src="item.banner"></image>
									<view class="ml-30 flex1">
										<view class="fs-30 color-333333">{{item.name}}</view>
										<view class="fs-24 color-999999 ns-text-limit flex mt-10" style="width: 400rpx;">共{{item.goods_sum}}款，全场¥<text
											 class="color-FF0200">{{item.min_price}}</text>起</view>
									</view>
								</view>
								<view class="flex align-center" style="width: 148rpx;height: 60rpx;background: #FF401A;border-radius: 30rpx;text-align:center;font-size:24rpx;color:#fff;line-height:60rpx;justify-content: center;">
									<view style="margin-right: -6rpx;">进入</view>
									<view class="iconfont icon-jinru color-fff text-center fs-36" style="color: #fff;margin-right: -12rpx;margin-top: 2rpx;"></view>
								</view>
							</navigator>
						</view>
						<!-- 品牌商品 -->
						<view class="flex" style="padding: 0rpx 16rpx 20rpx;">
							<scroll-view scroll-x="true">
								<view class="flex">
									<navigator :url="'/pages/goods/goods?id=' + goods.id" style="width: 216rpx;margin-right: 11rpx;" v-for="(goods, index) in item.goods"
									 :key="index" :data-id="goods.goods_id">
										<view style="position: relative;width: 216rpx;height: 216rpx;">
											<image lazy-load="true" mode="aspectFill" :src="goods.first_cover_pic" style="background: #ccc;width: 216rpx;height: 216rpx;position: relative;border-radius: 20rpx;"></image>
											<view class="sell-up" v-if="goods.goods_num==0">
												<view>已抢光</view>
												<view class="line"></view>
												<view style="font-size: 17rpx;">sold out</view>
											</view>
										</view>

										<view class="clear miaosha_price mt-20 flex align-center" style="font-size:26rpx;">
											<view class="qiang-tips">抢</view>
											<view class="fs-20 color-FF0200 ns-text-bold">￥<text class="fs-28">{{filters.priceStr(goods.price)[0]}}.</text><text>{{filters.priceStr(goods.price)[1]}}</text></view>
										</view>
										<view class="text-more-1 fs-24 color-333333 mt-16">{{goods.name}}</view>
									</navigator>
								</view>
							</scroll-view>

						</view>
					</view>
				</view>
			</block>

		</view>
		<view class="main p-24" :style="'min-height: calc( 100vh - ' + customBar + 'px - 260rpx - 224rpx + 148rpx );'" v-else>
			<view style="padding-top: 48rpx;">
				<view class="flex-x-center align-center color-999999">
					<view class="fs-40 iconfont icon-tongzhi2 mr-10"></view>
					<view class="fs-26">抱歉，没有找到相关的商品</view>
				</view>
					<!-- <view class="footer-box">
						<view class="footer-box-btn-pull" @tap="addBrand">添加品牌关注</view>
					</view>
					<view class="fs-26 color-000000 text-center">添加喜欢的品牌，活动上架第一时间通知您哦～</view> -->
					<view class="add-desc fs-26 color-333333 text-center">
					
						您可以填写正确的商品品牌名称在下方输入框
						例如：七匹狼，给我们36小时为您找来，并且
						第一时间通知您，支持比价哦～
					
					</view>
					<view class="add-content flex-x-center">
						<view class="add-content-input-box bg-white">
							<input class="add-content-input fs-30 color-333333" type="text" :value="addMsg" placeholder="例如：七匹狼" @blur="inputAddMsg" />
						</view>
						<view class="fs-30 color-fff ns-text-bold add-content-btn" @tap="addBrand">提交</view>
					</view>
			</view>

		</view>
		<!-- 导航结束 -->
		<slide-icon :showPic="mrtj_sc" :cartNum="cartNum"></slide-icon>
		<!-- 回到顶部 -->
		<to-top :scrollStop="scrollStop" :is_top="is_top" :page="page1" :totalPage="totalPage"></to-top>
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
				choose: [],
				//多选数组
				catsArr: [],
				moren: '全部产品',
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
				priceUp: true,
				is_screen: false,
				showChangeMore: false,
				pageType: 'normal',
				page: 1,
				cat_id: "",
				screenList: "",
				searchValue: "",
				stopLoadMore: false,
				is_no_more: false,
				actList: "",
				sort: 0,
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
				banner_pic: '', // Ebanner
				totalPage: 0,
				scrollStop: true,
				is_top: false,
				page1: 1,
				y: uni.getSystemInfoSync().windowHeight,
				mainEmpty: true,  // 用于加载中不展示空白页
				brand_banner: uni.getStorageSync('_img').brand_banner,
				addMsg: '',  // 添加品牌内容
				shareTitle: '',
				sharePic: ''
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
			this.banner_pic = uni.getStorageSync('_img').brand_banner
			this.getShareInfo()
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
		onShareAppMessage: function() {
			var self = this;
			var title = self.shareTitle;
			var img = self.sharePic
			return this.getApp().page.onShareQp(this, '', title, img);
		},
		methods: {
			getShareInfo() {
				var self = this
				self.getApp().request({
					url: self.getApp().api.default.shareCard,
					method: 'POST',
					data: {
						type: '105',
					},
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								sharePic: res.data.pic_url,
								shareTitle: res.data.goods_name
							})
						}
						if (res.code == 1) {
							uni.showToast({
								title: '卡片图片获取失败，请稍后再试',
								duration: 2500,
								icon: 'none'
							})
						}
					},
					fail: function() {
						uni.hideLoading()
						uni.showToast({
							title: '网络错误，请稍后再试',
							duration: 2500,
							icon: 'none',
						})
					}
				})
			},
			addBrand() {
				var token = uni.getStorageSync('ACCESS_TOKEN')
				if (!token) {
					this.setData({
						showGetLogin: true,
					})
					this.$store.commit('vuexSet',{name:'show_loginTpl',value:true})
					return
				}
				this.getApp().request({
					url: this.getApp().api.default.add_brand,
					method: 'POST',
					data: {
						brand_name: this.addMsg || ''
					},
					success: res => {
						if (res.code == 0) {
							uni.showToast({
								title: '添加成功',
							})
						}
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
							self.setData({
								catalog: res.data,
								catsArr: res.data[0].child
							});

							if (self.catalog.length > 0) {
								var cat_id = self.catalog[0].id;
								self.setData({
									cat_id: cat_id
								});
								self.getActivityFilter();
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
				this.getActivityFilter();
			},
			// 输入要添加的品牌信息
			inputAddMsg(e) {
				this.addMsg = e.detail.value
			},
			getActivityFilter: function() {
				var self = this;
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.walk_active_list_e,
					data: {
						cat_ids: self.cat_id,
						sort: self.sort || '',
						keyword: self.searchValue || ''
					},
					success: function(res) {
						if (res.code == 0) {
							uni.hideLoading();
							self.setData({
								actList: res.data.data,
								totalPage: res.data.meta.totalCount || 0,
								mainEmpty: res.data.data.length>0?true:false
							});
						}
					},
					complete: function() {
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
					page: 1,
					stopLoadMore: false,
					is_no_more: false,
					showChangeMore: false,
					moren: '全部产品'
				});
				uni.showLoading({
					title: '加载中'
				});
				uni.pageScrollTo({
					scrollTop: 0
				})
				this.getActivityFilter();
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
				this.getActivityFilter();
			},
			// 价格排序
			priceSort: function() {
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
						sort: 1
					});
				} else {
					self.setData({
						sort: 2
					});
				}

				this.getActivityFilter();
			},

			openScreen() {
				this.setData({
					is_screen: true
				});
				this.getScreenList();
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
				}); // this.getWalkGoodsList()

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
					keyword: self.searchValue || ''
				};
				var url = this.getApp().api.default.walk_active_list_e;
				uni.pading(self, url, data, function(res, index) {
					if (res.data.data.length == 0) {
						self.setData({
							stopLoadMore: true,
							is_no_more: true
						});
						return;
					}

					var newActList = res.data.data;
					var nowActList = self.actList.concat(newActList);
					self.setData({
						actList: nowActList,
						loadingSwitch: true
					});
				});
			}

		}
	};
</script>
<style>
	@import "./brandDiscount.css";
</style>
