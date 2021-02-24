<template>
	<view>
		<!--pages/acitivityPage/acitivityPage.wxml-->
		<common></common>
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
										<image style="width: 150rpx;height: 150rpx" :src="__wxapp_img.system&&__wxapp_img.system.loading2.url"></image>
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
							<button v-if="goods_qrcode" @tap="saveGoodsQrcode" class="share-btn">
								保存图片
							</button>
							<button v-else style="opacity: .4">保存图片</button>
						</view>
					</view>
					<view class="goods-qrcode-close" @tap="goodsQrcodeClose">
						<image :src="__wxapp_img.store.close2.url" style="width: 40rpx;height: 40rpx;display: block"></image>
					</view>
				</view>
			</view>
			<!-- 生成店铺码 -->
			<view :class="'goods-qrcode-modal ' + goods_qrcode_active + ' flex-y-center'" catchtouchmove="true" @tap="goodsQrcodeClose"
			 v-if="share_type == 'onlyCode'">
				<view class="shareShop">
					<view>
						<view class="shopHead">
							<image :src="mch.user.avatar_url" class="shopHeadImg"></image>
							<view class="font_blod">{{mch.name?mch.name:mch.user.nickname}}</view>
							<view class="tipss">邀请您来这里逛逛呀～</view>
						</view>
						<!-- 小程序码 -->
						<view class="shopCode" style="height:370rpx">
							<image class="appcode-img" :src="goods_qrcode"></image>
						</view>
					</view>
					<view class="flex shopBottom flex-x-center">
						<view class="flex1" style="color: #c11111" @tap.stop="saveGoodsQrcode">保存图片</view>
						<icon type="clear" size="40" color="#fff" class="shop-close" @tap="closeShop"></icon>
					</view>
				</view>
			</view>
		</block>
		<view class="page ns-column">
			<view class="header pr">
				<view class="con flex justify-between align-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
					<view class="backBtn" @tap="goBack">
						<text class="iconfont icon-zuojiantoubeifen"></text>
					</view>
					<view></view>
					<view></view>
				</view>
				<image :src="bg" style="height: 100%;width: 100%;background: #ccc;position: absolute;top: 0;left: 0;z-index: -1;"></image>
				<view class="text-center" style="width: 50rpx;height: 50rpx;position: absolute;right: 20rpx;bottom: 50rpx;border-radius: 50%;background: rgba(0,0,0,0.4);text-align: center;line-height: 50rpx;color: #fff;"
				 @tap="showShareModal">
					<view class="iconfont icon-fenxiang"></view>
					<view class="fs-20 color-fff" style="margin-top: -10rpx;">分享</view>
				</view>
			</view>
			<scroll-view scroll-y="true" style="height: calc(100vh - 286rpx);background-color: #F4F4F4;padding: 24rpx;">
				<navigator v-for="(item, index) in ptList" :key="index" :url="'/pages/pt/details/details?id=' + item.goods_id"
				 class="goods-box flex mb-24">
					<view class="goods-img ns-flex-shrink-no">
						<image style="width: 100%;height: 100%;background-color: #ccc;" mode="aspectFill" :src="item.first_cover_pic"></image>
					</view>
					<view class="flex ns-column justify-between">
						<view>
							<view class="fs-28 color-333333 ns-text-limit2" style="line-height: 42rpx;">{{item.name}}</view>
							<view class="goods-desc color-FFA102 fs-22 ns-flex-shrink-no mt-16" v-if="item.desc">{{item.desc}}</view>
						</view>
						<view class="pt-tips text-center color-fff fs-22">
							{{item.group_num}}人团
						</view>
						<view class="flex justify-between">
							<view class="flex align-center ns-text-bold">
								<view class="color-FF0200">
									<text class="fs-28">¥</text><text class="fs-36">{{filters.priceStr(item.price)[0]}}.</text><text class="fs-28">{{filters.priceStr(item.price)[1]}}</text>
								</view>
								<!-- <view class="fs-28 color-999999 ml-16 ns-text-through">¥ {{item.original_price}}</view> -->
							</view>
							<view class="buy-btn fs-24 color-fff text-center">发起拼团</view>
						</view>
					</view>
				</navigator>
			</scroll-view>
			<slide-icon :showPic="mrtj_sc" :cartNum="cartNum"></slide-icon>
		</view>
	</view>
</template>



<script>
	// pages/acitivityPage/acitivityPage.js
	var shareWay = require("../../components/share/share.js");
	import slideIcon from "../../components/slideIcon/slideIcon";

	export default {
		data() {
			return {
				filters: require('../../utils/filters.js'),
				navList: ['今日必抢', '明日预告'],
				navIns: 0,
				loading: false,
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				share_type: 'code',
				bg: "",
				ptList: "",
				minGoodsInfo: "",
				stopLoadMore: false,
				goods_qrcode_active: "",
				share_modal_active: "",
				goods_qrcode: ""
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
			this.getList();
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			shareWay.init(this);
			this.getCartNum()
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
			var title = '限时秒杀';

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
								cartNum: res.data.count
							});
						}
					}
				});
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
			goodsQrcodeClick() {},
			getList: function() {
				var self = this;
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.pintuan_list,
					data: {
						mode: 'page'
					},
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								bg: res.data.banner.a,
								ptList: res.data.list,
								minGoodsInfo: res.data.min_goods_info
							});
						}
					},
					complete: function() {
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				});
			},

			getMore() {
				var self = this;
				var page = self.page;
				var index = page;
				var data = {
					mode: 'page'
				};
				var url = this.getApp().api.default.miaosha_list;
				this.getApp().core.pading(self, url, data, function(res) {
					if (res.data.list.length == 0) {
						self.setData({
							stopLoadMore: true
						});
						return;
					}

					var newGoodList = res.data.list;
					var nowGoodList = self.ptList.concat(newGoodList);
					self.setData({
						ptList: nowGoodList
					});
				});
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
					url: this.getApp().api.default.activity_qrcode,
					data: {
						goods_pic: picInfo.goods_pic,
						act_name: picInfo.act_name,
						price_str: picInfo.price_str,
						end_date: show_end_time,
						activity: picInfo.activity,
						qrcode_type: 13
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
			},
			shop() {},

		}
	};
</script>
<style>
	@import "~@/components/share/share.css";

	.page {}

	.header {
		width: 100%;
		height: 286rpx;
	}

	.con {
		width: 100%;
		top: 0;
		left: 0;
		display: flex;
		padding: 0 24rpx;
	}

	.backBtn {
		font-size: 36rpx;
		display: flex;
		align-items: center;
		height: 100%;
		justify-content: center;
		max-width: 100%;
		color: #FFFFFF;
		opacity: 0.5;
	}

	.roll-tips {
		position: absolute;
		width: 366rpx;
		height: 54rpx;
		top: 25rpx;
		left: 30rpx;
		background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
		border-radius: 25rpx;
	}

	.roll-tips-img {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
	}

	.nav-tab {
		padding: 25rpx 154rpx;
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

	.goods-box {
		padding: 16rpx;
		background-color: #fff;
		border-radius: 20rpx;
	}

	.goods-img {
		width: 248rpx;
		height: 248rpx;
		border-radius: 12rpx;
		margin-right: 24rpx;
		overflow: hidden;
	}

	.goods-desc {
		height: 30rpx;
		line-height: 30rpx;
		background: rgba(254, 248, 225, 1);
		border-radius: 6rpx;
		padding: 0 15rpx;
	}

	.pt-tips {
		width: 80rpx;
		height: 36rpx;
		line-height: 36rpx;
		background: linear-gradient(-90deg, rgba(84, 98, 255, 1), rgba(185, 83, 255, 1));
		border-radius: 0px 18rpx 18rpx 23rpx;
	}

	.buy-btn {
		width: 131rpx;
		height: 45rpx;
		line-height: 45rpx;
		background: linear-gradient(-90deg, rgba(255, 55, 80, 1), rgba(255, 112, 6, 1));
		border-radius: 23rpx;
	}
</style>
