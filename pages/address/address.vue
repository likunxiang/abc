<template>
	<view class="address-address">
		<common></common>
		<view class="body after-navber">


			<view v-if="show_no_data_tip" class="flex-x-center flex-y-center">
				<view style="padding-top: 185rpx;">
					<view class="empty-address-icon text-center marginAuto ">
						<view class="iconfont icon-dizhi1 color-fff" style="opacity: 0.5;font-size: 220rpx;"></view>
					</view>
					<view class="fs-30 color-999999" style="margin-top: 49rpx;">空空如也，您还没有收货地址哦～</view>
				</view>

			</view>
			<view class="address-list">
				<view v-for="(item, index) in address_list" :key="index" class="address-item">

					<view class="userinfo flex-row fs-30 color-333333 ns-text-bold">
						<view class>{{item.name}}</view>
						<view style="margin-left: 37rpx;">{{item.mobile}}</view>
					</view>
					<view class="address-detail fs-30 color-333333">{{item.address}}</view>
					<view class="flex-row">
						<view class="flex-grow-1">
							<view style="display: inline-block" v-if="item.is_default==1">
								<view class="default-address active flex-row flex-y-center">
									<view style="width: 40rpx;height: 40rpx;margin-right: 12rpx;color: #F23005;" class="iconfont icon-xuanzhong fs-40"></view>
									<text class="color-2C2C2C">设为默认地址</text>
								</view>
							</view>
							<view style="display: inline-block" v-else>
								<view @tap="setDefaultAddress" :data-index="index" class="default-address flex-row flex-y-center align-center"
								 v-if="item.id>0">
									<view style="height: 40rpx;">
										<text class="iconfont icon-weixuanzhong fs-40 color-8D8D8D"></text>
									</view>
									<text class="color-2C2C2C">设为默认地址</text>
								</view>
								<view class="ns-text-bold" v-if="item.id<0">店主代收</view>
							</view>
						</view>
						<view class="flex-grow-0 flex-row" v-if="item.id>0">
							<navigator class="address-option fs-26 color-666666" :url="'/pages/address-edit/address-edit?id=' + item.id">
								编辑
							</navigator>
							<view @tap="deleteAddress" class="address-option ns-align-items-flex-center fs-26 color-666666" :data-index="index"
							 :data-id="item.id">
								删除
							</view>
						</view>
					</view>
				</view>

			</view>

		</view>
		<view class="bottom-bar flex flex-x-center" :style="{'height':(jianrong=='device_iphone_x'?'165rpx':'100rpx')}">
			<!-- <view @tap="getWechatAddress">使用微信地址</view> -->
			<view class="add-btn flex-x-center flex-y-center" @tap="toAddAdress">
				<view class="iconfont icon-hao fs-24 mr-20"></view>
				<view class="fs-30">新建收货地址</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				address_list: [],
				show_no_data_tip: "",
				page: 1,
				stopLoadMore: false,
				jianrong: uni.getStorageSync('jianrong')
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.getApp().page.onLoad(this, options);
		},

		/**
		 * 用户点击右上角分享
		 */
		// onShareAppMessage: function () {
		//   getApp().page.onShareAppMessage(this);
		//   var self = this;
		//   var user_info = getApp().getUser();
		//   var mch_id = wx.getStorageSync('_mchInfo').id;
		//   return {
		//     path: "/pages/address/address?user_id=" + user_info.id + "&mch_id=" + mch_id,
		//     title: self.data.store.name
		//   };
		// },

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.getApp().page.onShow(this);
			var self = this;
			this.page = 1
			this.stopLoadMore = false

			//#ifndef APP-PLUS 
			uni.showNavigationBarLoading();
			//#endif
			this.getApp().request({
				url: this.getApp().api.user.address_list,
				success: function(res) {
					//#ifndef APP-PLUS

					uni.hideNavigationBarLoading();

					//#endif

					if (res.code == 0) {
						self.setData({
							address_list: res.data.list
						});
					}

					self.setData({
						show_no_data_tip: self.address_list.length == 0
					});
				}
			});
		},
		methods: {
			toAddAdress: function() {
				uni.navigateTo({
					url: "/pages/address-edit/address-edit"
				});
			},
			setDefaultAddress: function(e) {
				var self = this;
				var index = e.currentTarget.dataset.index;
				var address = self.address_list[index];
				uni.showLoading({
					title: "正在保存",
					mask: true
				});
				this.getApp().request({
					url: this.getApp().api.user.address_set_default,
					data: {
						address_id: address.id
					},
					success: function(res) {
						uni.hideLoading();

						if (res.code == 0) {
							var address_list = self.address_list;

							for (var i in address_list) {
								if (i == index) {
									address_list[i].is_default = 1;
								} else {
									address_list[i].is_default = 0;
								}
							}

							self.setData({
								address_list: address_list
							});
						}
					}
				});
			},
			deleteAddress: function(e) {
				var self = this;
				var address_id = e.currentTarget.dataset.id;
				var index = e.currentTarget.dataset.index;
				uni.showModal({
					title: "提示",
					content: "确认删除改收货地址？",
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: "正在删除",
								mask: true
							});
							self.getApp().request({
								url: self.getApp().api.user.address_delete,
								data: {
									address_id: address_id
								},
								success: function(res) {
									if (res.code == 0) {
										// getApp().core.redirectTo({
										//     url: "/pages/address/address",
										// });
										uni.hideLoading();
										self.getApp().request({
											url: self.getApp().api.user.address_list,
											success: function(res) {
												uni.hideNavigationBarLoading();

												if (res.code == 0) {
													self.setData({
														address_list: res.data.list
													});
												}

												self.setData({
													show_no_data_tip: self.address_list.length == 0
												});
											}
										});
									}

									if (res.code == 1) {
										uni.hideLoading();
										uni.showToast({
											title: res.msg
										});
									}
								}
							});
						}
					}
				});
			},
			getWechatAddress: function(e) {
				let self = this;
				//#ifdef MP-WEIXIN || MP-ALIPAY

				uni.chooseAddress({
					success: function(e) {
						if (e.errMsg != 'chooseAddress:ok') return;
						uni.showLoading();
						self.getApp().request({
							url: self.getApp().api.user.add_wechat_address,
							method: "post",
							data: {
								national_code: e.nationalCode,
								name: e.userName,
								mobile: e.telNumber,
								detail: e.detailInfo,
								province_name: e.provinceName,
								city_name: e.cityName,
								county_name: e.countyName
							},
							success: function(res) {
								if (res.code == 1) {
									uni.showModal({
										title: '提示',
										content: res.msg,
										showCancel: false
									});
									return;
								}

								if (res.code == 0) {
									uni.setStorageSync(self.getApp().const.PICKER_ADDRESS, res.data);
									uni.hideLoading();
									self.getApp().request({
										url: self.getApp().api.user.address_list,
										success: function(res) {
											uni.hideNavigationBarLoading();

											if (res.code == 0) {
												self.setData({
													address_list: res.data.list
												});
											}

											self.setData({
												show_no_data_tip: self.address_list.length == 0
											});
										}
									});
								}
							},
							complete: function() {
								uni.hideLoading();
							}
						});
					}
				});
				//#endif
			}
		},
		onReachBottom: function() {
			var self = this

			var page = self.page
			var data = {}
			var url = this.getApp().api.user.address_list
			this.getApp().core.pading(self, url, data, (res) => {
				//console.log('首页上拉',res)
				if (res.data.list.length == 0) {
					self.setData({
						stopLoadMore: true,
					})
					return
				}
				//var newActList = res.data.data
				var newList = res.data.list
				var nowList = self.address_list.concat(newList)
				self.setData({
					address_list: nowList,
				})
			})
		}
	};
</script>
<style>
	/* pages/address/address.wxss */
	page {
		height: 100%;
		background: #F4F4F4;
	}

	.page {
		min-height: 100%;
	}

	.body {}

	.empty-address-icon {
		width: 280rpx;
		height: 280rpx;
		background: rgba(234, 234, 234, 1);
		border-radius: 50%;
	}

	.bottom-bar {
		position: fixed;
		bottom: 0;
		padding: 15rpx 24rpx;
		box-shadow: 0rpx -3rpx 16rpx 0rpx rgba(214, 214, 214, 0.6);
		background: #fff;
		width: 100%;
		height: 100rpx;
		
		z-index: 1000;
	}

	.bottom-bar .add-btn {
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		background: #F23005;
		border-radius: 35rpx;
		color: #fff;
	}

	.address-list {
		padding-bottom: 170rpx;
	}

	.address-item {
		background: #fff;
		margin-bottom: 20rpx;
		padding: 24rpx;
	}

	.userinfo {
		margin-bottom: 20rpx;
	}

	.address-detail {
		border-bottom: 1rpx solid #f4f4f4;
		margin-bottom: 24rpx;
		padding-bottom: 24rpx;
	}

	.address-option {
		width: 101rpx;
		height: 51rpx;
		line-height: 49rpx;
		border: 1rpx solid rgba(51, 51, 51, .3);
		border-radius: 25rpx;
		margin-left: 16rpx;
		text-align: center;
	}

	.address-option image {
		width: 32rpx;
		height: 32rpx;
		margin-right: 16rpx;
	}

	.default-address {
		width: auto;
	}

	.default-address.active {
		color: #c10000;
	}
</style>
