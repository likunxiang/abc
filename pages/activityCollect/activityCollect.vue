<template>
	<view>
		<common></common>
		<!-- 主体内容开始 -->
		<view class="activity flex ns-column">
			<view class="nav pr" style="height:286rpx;">

				<image style="width: 100%;height: 286rpx;position: absolute;z-index: -1;" mode="aspectFill" :src="act_bg"></image>
				<view class="con flex justify-between align-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
					<view class="backBtn flex1" @tap="goBack">
						<text class="iconfont icon-zuojiantoubeifen"></text>
					</view>
					<view class="flex1 text-center"></view>
					<view class="flex1"></view>
				</view>
				<view style="position: absolute;right: 82rpx;bottom: 25rpx;">
					<view style="width: 50rpx;height: 50rpx;border-radius: 50%;background: rgba(0,0,0,0.4);text-align: center;line-height: 50rpx;color: #fff;"
					 class="iconfont icon-sousuo" @tap="toSearch"></view>
					<view class="fs-20 text-center">搜索</view>
				</view>
				<view style="position: absolute;right: 24rpx;bottom: 25rpx;">
					<view style="width: 50rpx;height: 50rpx;border-radius: 50%;background: rgba(0,0,0,0.4);text-align: center;line-height: 50rpx;color: #fff;"
					 class="iconfont icon-fenxiang" @tap="showShareModal"></view>
					<view class="fs-20 text-center">分享</view>
				</view>
			</view>
			<view class="guang-nav-list flex" style="padding:0rpx 24rpx 0 24rpx" v-if="type != 3">
				<view>
					<scroll-view scroll-x="true" enable-flex="true">
						<view class="flex align-center">
							<view v-for="(value, index) in catalog" :key="index" :class="'nav-tab flex-grow-0 ns-flex-shrink-no pr ' + (value.id==chooseIns?'color-333333':'')"
							 @tap="changeNav" :data-num="index" :data-index="value.id" :data-text="value.name">
								<view>{{value.name}}</view>
								<view v-if="value.id==chooseIns" class="nav-active"></view>
							</view>
						</view>
					</scroll-view>
				</view>

			</view>

			<!-- 商品区 -->
			<scroll-view scroll-y="true" class="goods-list flex ns-wrap ns-justify-content-space-between" style="height: calc(100vh - 376rpx);"
			 @scrolltolower="getMore" :scroll-top="topNum"  @scroll="scroll_view" >
				<view class=" " v-if="list&&list.length > 0">
					<view>
						<view v-for="(item, index) in list" :key="index" class="bg-white mb-24" style="border-radius: 20rpx;" v-if="item.banner!=null">
							<!-- 单品牌内容 -->
							<!-- 品牌名字 -->
							<view style="padding: 25rpx 24rpx;">
								<navigator :url="'/pages/activity/activity?aid=' + item.id" class="flex ns-justify-content-space-between"
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
									<view class="flex ">
										<view style="margin-right: 12rpx;color:#999999;font-size:18rpx">更多<text class="iconfont icon-jinru color-fff ml-10"
											 style="border-radius: 50%;background:linear-gradient(-90deg,rgba(255,152,2,1),rgba(255,201,1,1));;width: 20rpx;height: 20rpx;font-size: 20rpx;text-align: center;"></text></view>

									</view>
								</navigator>

							</view>
							<!-- 品牌商品 -->
							<view class="flex " style="padding: 0rpx 24rpx 20rpx; ">
								<scroll-view scroll-x="true">
									<view class="flex">
										<navigator v-for="(item1, index2) in item.goods" :key="index2" :url="'/pages/goods/goods?id=' + item1.id"
										 style="width: 200rpx;margin-right: 16rpx;" :data-id="item1.goods_id">
											<view style="position: relative;width: 180rpx;height: 180rpx;">
												<image lazy-load="true" mode="aspectFill" :src="item1.first_cover_pic" style="background: #ccc;width: 180rpx;height: 180rpx;position: relative;border-radius: 20rpx;"></image>
												<view class="sell-up " v-if="item1.num==0">
													<view>已抢光</view>
													<view class="line"></view>
													<view style="font-size: 17rpx;">sold out</view>
												</view>
											</view>
											<view class="ns-text-limit fs-24 color-333333 mt-15">{{item1.name}}</view>
											<view class="miaosha_price m-10 flex align-center" style="font-size:20rpx;">
												<view class=" color-FF0200 ns-text-bold">￥<text class="fs-26">{{filters.priceStr(item1.price)[0]}}.</text><text>{{filters.priceStr(item1.price)[1]}}</text></view>
											</view>

										</navigator>

									</view>
								</scroll-view>

							</view>
						</view>
					</view>
				</view>
				<view class="flex-x-center color-8D8D8D ns-padding-bottom-sm" v-if="is_no_more">没有更多啦~</view>
			</scroll-view>

			<view :class="'share-modal ' + share_modal_active" catchtouchmove="true" @tap="shareModalClose">
				<view class="share-modal-body" @tap.stop="shop">
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
							<view @tap="showShare" class="share-bottom">
								<text class="iconfont icon-pengyouquan color-fff" style="font-size: 50rpx;"></text>
								<view>生成商品海报</view>
							</view>
						</view>
					</view>
					<!-- <view bindtap="shareModalClose" class="share-modal-close flex-y-center flex-x-center">关闭</view> -->
				</view>
			</view>
			<view class="share pa" v-if="isShowShare" :style="'height: ' + y + 'px;'" @tap="closeShare" catchtouchmove="true">

				<view style="width: 608rpx;height: 924rpx;background: #fff;margin-bottom: 50rpx;" class="pr">
					<view class="pa" style="left: 240rpx;top: 300rpx;" v-if="!qrcode_pic">
						<image style="width: 150rpx;height: 150rpx" :src="__wxapp_img.system.loading2.url"></image>
						<view style="color: #888">海报生成中</view>
					</view>
					<image style="height: 924rpx;width: 608rpx;" mode="widthFix" class="share_image" :src="qrcode_pic"></image>
					<button class="share-btn" @tap.stop="savePhotoThrottle">
						<view class="fs-24 color-fff">保存到相册</view>
					</button>
				</view>
			</view>
		</view>

		<!-- 主体内容结束 -->
		<view class="to-top-btn ns-text-center color-fff" v-show="is_top" @tap.stop="toTop">
			<view class="iconfont icon-zhiding1"></view>
			<view class="fs-20">顶部</view>
		</view>
	</view>
</template>



<script>
	import util from "@/utils/util";
	var activity_id = '';
	var gSpecificationsModel = require("../../components/goods/specifications_model.js"); //商城多规格选择
	

	export default {
		data() {
			return {
				x: uni.getSystemInfoSync().windowWidth,
				y: uni.getSystemInfoSync().windowHeight,
				chooseOpen: false,
				optionList: [],
				moren: '全部品类',
				chooseText: '',
				isShowShare: false,
				cartNum: 0,
				is_show: false,
				goodListMsg: {},
				goodList: [],
				discountDefault: true,
				priceDefault: true,
				discountUp: true,
				priceUp: true,
				cat_id: '',
				page: 1,
				page_count: 0,
				count: 0,
				// 总的数据条数
				qrcode_pic: '',
				// 二维码图片
				role: 'user',
				scrollTop: false,
				chooseIns: 0,
				choose: [],
				//多选数组
				catsArr: [],
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				type: 1 //1开始  2预告
					,
				act_bg: "",
				stopLoadMore: false,
				share_modal_active: "",
				no_scroll: false,
				catalog: "",
				list: [],
				loadingSwitch: false,
				filters: require('../../utils/filters.js'),
				is_no_more: false,
				is_top: false,
				topNum:-1,
			};
		},

		components: {
		
		},


		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var self = this;
			this.getApp().page.onLoad(this, options);

			if (options) {
				this.setData({
					chooseIns: options.cat_id,
					cat_id: options.cat_id,
					act_bg: options.waiting == 2 ? uni.getStorageSync('_img').activity_start : uni.getStorageSync('_img').act,
					type: options.waiting
				});
			}

			this.getCatList();
			this.getActivityFilter();
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			// this.getCartNum()
			//gSpecificationsModel.init(this);
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
			this.setData({
				page: 1,
				is_top:false
			});
			this.getActivityFilter();
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function(res) {
			var self = this;
			var title = '新春特卖，买新衣，购年货';
			var cat_id = self.cat_id;

			if (res.from === 'button') {
				// 来自页面内转发按钮
				this.shareModalClose();
			}

			return this.getApp().page.onShareQp(this, 'cat_id=' + cat_id, title);
		},
		computed:{
			top_num(){
				return this.topNum;
			}
		},
		methods: {
			scroll_view(e){
				if(e.detail.scrollTop>500){
					this.is_top = true;
				}
				else {
					this.is_top = false;
				}
				
			},
			toTop(){
				this.topNum = 0;
				setTimeout(()=>{
					this.is_top = false;
				},200)
			},
			changeNav(e) {
				var index = e.currentTarget.dataset.index;
				this.setData({
					chooseIns: index,
					cat_id: index,
					page: 1,
					stopLoadMore: false
				});
				this.getActivityFilter();
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

			showShareModal: function() {
				var self = this;
				self.setData({
					share_modal_active: "active",
					no_scroll: true
				});
			},
			shareModalClose: function() {
				var self = this;
				self.setData({
					share_modal_active: "",
					no_scroll: false
				});
			},
			getCatList: function() {
				var self = this;
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.walk_old_cats,
					success: function(res) {
						if (res.code == 0) {
							uni.hideLoading();
							res.data.shift();
							self.setData({
								catalog: res.data
							});
						}
					},
					fail: function() {},
					complete: function() {
						uni.stopPullDownRefresh();
					}
				});
			},
			getActivityFilter: function() {
				var self = this;
				uni.showLoading({
					title: '加载中'
				}); // var page = self.data.page
				// page++
				// self.setData({
				// 	page:page
				// })

				this.getApp().request({
					url: this.getApp().api.default.walk_active_list,
					data: {
						cat_ids: self.cat_id || '',
						type: this.type == 2 ? 2 : 1,
						is_home: this.type == 3 ? 2 : ''
					},
					success: function(res) {
						if (res.code == 0) {
							uni.hideLoading();
							self.setData({
								list: res.data.data
							});
						}
					},
					complete: function() {
						uni.stopPullDownRefresh();
					}
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
			showShare: function() {
				this.setData({
					isShowShare: true
				});
				this.shareModalClose();
				this.getAcitivityQrcode();
			},
			getAcitivityQrcode: function() {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.get_act_collect_pic,
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								qrcode_pic: res.data.pic_url
							});
						}
					}
				});
			},
			closeShare: function() {
				this.setData({
					isShowShare: false
				});
			},
			savePhotoThrottle: util.throttle(function() {
				this.savePhoto();
			}, 1000),
			savePhoto: function() {
				var self = this;

				if (!self.qrcode_pic) {
					uni.showToast({
						title: '请等待图片加载完成~',
						duration: 2000,
						icon: 'none'
					});
					return;
				}

				uni.getImageInfo({
					src: self.qrcode_pic,

					success(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.path,

							success(res) {
								uni.showModal({
									content: '图片已保存到相册，赶紧晒一下吧~',
									showCancel: false,
									confirmText: '知道了',
									confirmColor: '#72B9C3',
									success: function(res) {
										if (res.confirm) {
											self.setData({
												isShowShare: false
											});
										}
									}
								});
							},

							fail: function(res) {
								if (res.errMsg == 'saveImageToPhotosAlbum:fail auth deny') {
									uni.showToast({
										title: '请前往设置开启相册授权',
										duration: 2000,
										icon: 'none'
									});
								}
							}
						});
					}

				});
			},
			toSearch: function() {
				uni.navigateTo({
					url: '/pages/newSearch/newSearch'
				});
			},
			shop: function() {},
			/**
			 * 页面上拉触底事件的处理函数
			 */
			getMore: function() {
				var self = this;
				var page = self.page;
				var index = page;
				var data = {
					cat_ids: self.cat_id,
					type: this.type
				};
				var url = this.getApp().api.default.walk_active_list;
				this.getApp().core.pading(self, url, data, function(res, index) {
					uni.hideLoading();
					//console.log(res);
					if (res.data.length == 0) {
						self.setData({
							stopLoadMore: true
						});
						return;
					}

					var newActList = res.data.data;
					var nowActList = self.list.concat(newActList);
					self.setData({
						list: nowActList,
						loadingSwitch: true
					});
				});
			}
		}
	};
</script>
<style>
	/* pages/activity/activity.wxss */
	/* @import "../../components/goods/specifications_model.css"; */
	page {
		height: 100%;
		background: rgba(207, 207, 207, 0.33);
	}

	.nav {
		height: 300rpx;
		background: rgba(0, 0, 0, .5);
		color: #fff;
		z-index: 9;
		position: relative;
	}

	.activity-header {
		width: 100%;
		padding: 0 24rpx;
	}

	.con {

		width: 100%;
		display: flex;
		padding: 0 24rpx;
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
		font-size: 36rpx;
		display: flex;
		align-items: center;
		height: 100%;
		max-width: 100%;
		color: #FFFFFF;
		opacity: 0.5;
	}

	.activity {
		min-height: 100%;
	}

	.guang-nav-list {
		width: 100%;
		overflow: hidden;
		color: #999999;
		background: #fff;
		font-size: 30rpx;
	}

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

	.shopTab {
		padding: 4rpx 8rpx;
		text-align: center;
		color: #fff;
		left: 15rpx;
		bottom: 15rpx;
		background: #C10000;
		font-size: 20rpx;
		border-radius: 4rpx;
	}

	.share-box {
		position: absolute;
		top: 25rpx;
		right: 20rpx;
		width: 50rpx;
		height: 50rpx;
		background-color: transparent;
		padding: 0;
		border: 0;
	}

	.share-box::after {
		border: 0;
	}

	.canvas-box {
		position: fixed;
		top: 99999px;
		left: 0;
	}

	.activity-head {
		width: 100%;
		height: 300rpx;
		position: relative;
	}

	.activity-title {
		width: 750rpx;
		height: 92rpx;
		background: rgba(0, 0, 0, 0.37);
		position: absolute;
		bottom: 0;
		padding: 5rpx 28rpx;

	}

	.time-box {
		width: 54rpx;
		height: 61rpx;
		text-align: center;
		line-height: 61rpx;
		background: #fff;
		font-size: 32rpx;
		color: #FF6E09;
		margin: 0 5rpx;
		font-weight: bold;
		border-radius: 8rpx;
	}

	.tips-box {
		padding: 25rpx 27rpx 0;
		background: #fff;
		position: relative;
	}

	.tips {
		padding: 25rpx 24rpx;
		padding-bottom: 67rpx;
		background: rgba(255, 180, 180, 0.14);
	}

	.tip-btn {
		width: 100%;
		height: 43rpx;
		line-height: 43rpx;
		padding: 0 273rpx;
		left: 0;
		bottom: 0;
		background: rgba(255, 180, 180, 0.3);
		border-radius: 0px 0px 8rpx 8rpx;
	}

	.screen {

		padding: 24rpx 0;
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
		padding: 4rpx 0 4rpx 20rpx;
		text-align: center;
		font-size: 28rpx;
		color: #fff;
		background: #F49E3A;
		border-radius: 24rpx;
	}

	.choose-option {
		position: absolute;
		top: 0;
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

	.goods-list {
		padding: 20rpx 28rpx 0;
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
		font-size: 28rpx;
		color: #333333;
		margin-bottom: 8rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.add-cart-icon {
		width: 30rpx;
		height: 30rpx;
		line-height: 30rpx;
		text-align: center;
		background-color: #F23005;
		border-radius: 50%;
	}

	.under-line {
		position: absolute;
		bottom: -10rpx;
		left: 50%;
		margin-left: -30rpx;
		width: 60rpx;
		height: 8rpx;
		background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
		border-radius: 4rpx;
	}

	.change {
		transform: rotate(-180deg);
	}

	.share {
		left: 0;
		right: 0;
		z-index: 999;
		top: 0;
		background: rgba(0, 0, 0, 0.35);
		padding: 81rpx 71rpx 0;
		display: flex;
		align-items: center;
	}

	.share-content {
		width: 608rpx;
		height: 924rpx;
		background: #fff;
		padding: 25rpx;
	}

	.shop-name {
		width: 223rpx;
		padding: 8rpx 0;
		font-size: 28rpx;
		color: #fff;
		background: #252E3E;
		border-radius: 28rpx;
		margin: 0 auto 20rpx;
		text-align: center;
	}

	.content {
		margin: 51rpx auto 0;
		padding: 0 22rpx;
	}

	.content-bottom {
		padding-left: 22rpx;
		display: flex;
		align-items: flex-end;
	}

	.share-btn {
		position: absolute;
		bottom: -115rpx;
		width: 608rpx;
		height: 78rpx;
		line-height: 78rpx;
		background-color: #F49E3A;
		padding: 0;
		border: 0rpx solid #fff;
		border-radius: 0 !important;
		color: #fff;
		font-size: 30rpx;
	}

	button {
		background-color: none !important;
		border: none;
	}

	button::after {
		border: 1px solid rgba(0, 0, 0, 0);

	}

	.share-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.0);
		z-index: 1000;
		transform: translateY(100%);
		transition: background 250ms;
	}

	.share-modal .share-modal-body {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
		padding-top: 90rpx;
		transform: translateY(100%);
		transition: transform 250ms;
		text-align: center;
	}

	.share-modal-body text.close {
		width: 28rpx;
		height: 28rpx;
		right: 34rpx;
		top: 34rpx;
	}

	.share-modal-body .shareGet {
		color: #2c2c2c;
		font-weight: 600;
		font-size: 14px;
		margin-bottom: 20rpx;
	}

	.share-modal-body .tips {
		color: #D6D6D6;
		font-size: 12px;
		margin-bottom: 90rpx;
	}

	.shareGet span {
		color: #c10000;
		margin-left: 10rpx;
	}

	.share-modal.active {
		transform: translateY(0);
		background: rgba(0, 0, 0, 0.5);
	}

	.share-modal.active .share-modal-body {
		transform: translateY(0);
	}

	.share-modal .share-bottom {
		text-align: center;
		font-size: 9pt;
		margin: 0;
		padding: 0;
		margin-bottom: 70rpx;
		line-height: inherit;
		border: none;
		background: none;
		color: inherit;
		font-family: inherit;
		display: inline-block;
	}

	.share-modal .share-bottom:after {
		display: none;
	}

	.share-modal .share-bottom text {
		display: block;
		width: 100rpx;
		height: 100rpx;
		margin: 0 auto;
		margin-bottom: 30rpx;
		border-radius: 50%;
		line-height: 100rpx;
		text-align: center;
		background: #4CB202;
	}

	.share-modal .share-bottom:active image {
		opacity: 0.7;
	}

	.share-modal .share-modal-close {
		background: #fff;
		height: 100rpx;
		border-top: 1rpx solid #eee;
	}
	.to-top-btn {
		position: fixed;
		bottom: 200rpx;
		right: 40rpx;
		border-radius: 50%;
		width: 70rpx;
		height: 70rpx;
		background: rgba(61, 61, 61, 0.5);
		z-index: 10;
		padding: 6rpx 0;
	
	}
</style>
