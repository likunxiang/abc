<template>
	<view class="VipListPage pr" v-if="list">
		<view class="header">
			<custom title="我的会员" mode="2"></custom>
			<view class="header-main">
			<!-- 	<view class="color-fff">
					<text class="fs-50 mr-20 ns-text-bold">{{member_add}}</text>
					<text class="fs-24">人</text>
				</view> -->
				<view class="color-fff mt-10 flex justify-between align-center">
					<!-- <navigator :url="'/pages/article-detail/article-detail?id=' + art_id" class="color-fff">
						<text class="fs-30">会员锁定规则</text>
						<text class="iconfont icon-tishi1 fs-30 ml-10 ns-text-bold"></text>
					</navigator> -->
					<view class="color-fff">
						<text class="fs-50 mr-20 ns-text-bold">{{member_add}}</text>
						<text class="fs-24">人</text>
					</view>
					<view class="flex">
						<button open-type="share" class="header-btn mr-20">邀请会员</button>
						<navigator url="/member/sendCard/sendCard" class="header-btn">赠送亲卡</navigator>
					</view>
				</view>
			</view>
		</view>
		<view class="main plr-24">
			<view class="mb-24" style="padding-bottom: 0;">
				<view class="search flex align-center">
					<view class="iconfont icon-sousuo flex-grow-0 fs-40" style="color: #4D4D4D;"></view>
					<input class="fs-30 flex-grow-1" placeholder="搜索微信昵称" :value="searchValue" @blur="inputSearch" style="color: #9A9A9A;margin-left: 14rpx;"></input>
				</view>
			</view>
			<view class="flex justify-between mb-30">
				<view class="flex" style="width: 100%;">
					<view :class="'text-center flex1 ns-text-bold pr ' + (status == 1 ? 'fansPublic' : 'vipPublic')" @tap="changeVip"
					 data-status="1" data-type="0">
						<view class="fs-30">直接发展会员({{vipList.member}}人）</view>
						<view v-if="status == 1" class="line"></view>
					</view>
					<view :class="'text-center flex1 ns-text-bold pr ' + (status == 0 ? 'fansPublic' : 'vipPublic')" @tap="changeVip"
					 data-status="0" data-type="1">
						<view class="fs-30">会员裂变会员({{vipList.lb_member}}人）</view>
						<view v-if="status == 0" class="line"></view>
					</view>
				</view>
			</view>
			<view class="vipList" v-if="status == 0">
				<block v-if="list.length>0">
					<navigator class="flex viplist-main align-center" v-for="(item, index) in list" :key="index" >
						<view class="flex flex1 align-center">
							<view>
								<image class="pic" :src="item.user.avatar_url"></image>
							</view>
							<view class="txt">
								<view class="fs-30 color-2C2C2C ns-text-bold">{{item.user.nickname}}</view>
								<view class="fs-26 color-8D8D8D mt-5">{{item.addTimeStr}}</view>
							</view>
						</view>
						<view>
							<view>
								<view class="cumulativeNum"><text>累计消费</text> <text class="ns-text-bold" style="color: #EB0401;margin-left: 10rpx;margin: 10rpx;">{{item.xf}}</text> <text>笔</text></view>
							</view>
							<view class="flex justify-end mt-5">
								<view class="cumulativeNum"><text>共</text> <text class="ns-text-bold" style="color: #EB0401;margin-left: 10rpx;margin: 10rpx;">{{item.xf_price}}</text> <text>元</text></view>
							</view>
						</view>
					</navigator>
				</block>
				<block v-else>
					<view class="flow-box" style="margin: auto;color: #F0D0A5;padding: 24rpx 0;">
						<view style="width: 502rpx;margin: 40rpx auto 64rpx;">
							<image :src="empty_pic" mode="widthFix" style="width: 100%;"></image>
						</view>
						
						<view class="text-center fs-40" style="color: rgba(235, 4, 1, 0.55);">邀请会员 赚取津贴</view>
						<view class="text-center fs-40" style="color: rgba(235, 4, 1, 0.55);">津贴可以当钱花</view>
					</view>
				</block>
			</view>
			<view class="vipList" v-if="status == 1">
				<block v-if="list.length>0">
					<navigator class="flex viplist-main align-center" v-for="(item, index) in list" :key="index" >
						<view class="flex flex1 align-center">
							<view>
								<image class="pic" :src="item.user.avatar_url"></image>
							</view>
							<view class="txt">
								<view class="fs-30 color-2C2C2C ns-text-bold">{{item.user.nickname}}</view>
								<view class="fs-26 color-8D8D8D mt-5">{{item.addTimeStr}}</view>
							</view>
						</view>
						<view>
							<view>
								<view class="cumulativeNum"><text>累计消费</text> <text class="ns-text-bold" style="color: #EB0401;margin-left: 10rpx;margin: 10rpx;">{{item.xf}}</text> <text>笔</text></view>
							</view>
							<view class="flex justify-end mt-5">
								<view class="cumulativeNum"><text>共</text> <text class="ns-text-bold" style="color: #EB0401;margin-left: 10rpx;margin: 10rpx;">{{item.xf_price}}</text> <text>元</text></view>
							</view>
						</view>
					</navigator>
				</block>
				<block v-else>
					<view class="flow-box" style="margin: auto;color: #F0D0A5;padding: 24rpx 0;">
						<view style="width: 502rpx;margin: 40rpx auto 64rpx;">
							<image :src="empty_pic" mode="widthFix" style="width: 100%;"></image>
						</view>
						
						<view class="text-center fs-40" style="color: rgba(235, 4, 1, 0.55);">邀请会员 赚取津贴</view>
						<view class="text-center fs-40" style="color: rgba(235, 4, 1, 0.55);">津贴可以当钱花</view>
					</view>
				</block>

			</view>
		</view>
		<vipListLay v-if="open_status" :open_card_num="open_card_num" :open_card_value="open_card_value" :lay_pic="lay_pic"></vipListLay>
	</view>
</template>

<script>
	import custom from '@/components/custom/custom.vue'
	import vipListLay from '@/components/vipList/vipListLay.vue'
	export default {
		data() {
			return {
				status: 1,
				page: 1,
				is_show_modal: false,
				shopList: [],
				vipList: "",
				list: "",
				can_shopkeeper: "",
				share_step: "",
				stopLoadMore: false,
				parent_id: "",
				store_id: "",
				store_group_id: "",
				sid: "",
				shareImg: "",
				type: 0,
				searchValue: '',
				art_id: '',   // 文章id
				member_add: '0',  // 间接会员+直接会员
				empty_pic: '',
				lay_pic: '',
				open_status: false,  // 开店状态
				open_card_num: '0',  // 会员卡数量
				open_card_value: '0',  // 价值
			};
		},

		components: {
			custom,
			vipListLay
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			if (options.can_shopkeeper) {
				this.setData({
					can_shopkeeper: options.can_shopkeeper
				});
			}

			this.getVipList(1);
			this.setData({
				share_step: this.getApp().core.getStorageSync('_img').share2
			});
			this.getShareData();
			this.getShareImg();
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

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
			var self = this;
			var page = self.page;
			var index = page;
			var data = {
				userId: this.getApp().core.getStorageSync('USER_INFO').id,
				level: this.status,
				lb_cx: this.type,
				keyword: this.searchValue || ''
			};
			var url = this.getApp().api.LockPowder.vip_list;
			this.getApp().core.pading(self, url, data, function(res, index) {
				if (res.data.list.length == 0) {
					self.setData({
						stopLoadMore: true
					});
					return;
				}

				var newActList = res.data.list;
				var nowActList = self.list.concat(newActList);
				self.setData({
					list: nowActList
				});
			});
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {
			var mch_id = wx.getStorageSync('_mchInfo').id;
			var user_id = this.getApp().core.getStorageSync('USER_INFO').id;
			var nickname = this.getApp().core.getStorageSync('USER_INFO').nickname;
			var title = nickname + '邀请您来开通会员~';
			var img = this.getApp().core.getStorageSync('_img').open_member;
			this.shareVip();
			return {
				title: title,
				path: '/member/vipFirst/vipFirst?sid=' + this.sid + '&type=1' + '&mch_id=' + mch_id + '&user_id=' + user_id,
				imageUrl: img
			};
		},
		methods: {
			getVipList() {
				this.getApp().request({
					url: this.getApp().api.LockPowder.vip_list,
					data: {
						userId: this.getApp().core.getStorageSync('USER_INFO').id,
						page: 1,
						level: this.status,
						lb_cx: this.type,
						keyword: this.searchValue || ''
					},
					success: res => {
						if (res.code == 0) {
							this.setData({
								vipList: res.data,
								list: res.data.list
							});
							this.art_id = res.data.art_id
							this.member_add = res.data.member_add
							this.empty_pic = res.data.blank
							this.lay_pic = res.data.gift_bag
							if (res.data.open_mch_mem_card.code == 1) {
								this.open_status = true
								this.open_card_num = res.data.open_mch_mem_card.data.num
								this.open_card_value = res.data.open_mch_mem_card.data.value
							}
						}
					}
				});
			},
			inputSearch(e) {
				this.setData({
					searchValue: e.detail.value,
					page: 1,
					stopLoadMore: false,
				});
				this.getVipList();
			},
			changeVip(e) {
				let status = e.currentTarget.dataset.status;
				let type = e.currentTarget.dataset.type
				this.setData({
					status: status,
					type: type,
					stopLoadMore: false,
					page: 1
				});
				this.getVipList();
			},

			becomeOwner() {
				wx.navigateTo({
					url: '/pages/storeManager/storeManager'
				});
			},

			showModal() {
				this.setData({
					is_show_modal: true
				});
				this.getApp().request({
					url: this.getApp().api.LockPowder.exclusive_shop,
					data: {
						userId: this.getApp().core.getStorageSync('USER_INFO').id
					},
					success: res => {
						if (res.code == 0) {
							this.setData({
								shopList: res.data
							});
						}
					}
				});
			},

			closeModal() {
				this.setData({
					is_show_modal: false
				});
			},

			saveImg() {
				var self = this;

				if (!this.getApp().core.saveImageToPhotosAlbum) {
					// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
					this.getApp().core.showModal({
						title: '提示',
						content: '当前版本过低，无法使用该功能，请升级到最新版本后重试。',
						showCancel: false
					});
					return;
				}

				this.getApp().core.downloadFile({
					url: self.shopList.wechat_qr_pic,
					success: function(e) {
						this.getApp().core.showLoading({
							title: "正在保存图片",
							mask: false
						});
						this.getApp().core.saveImageToPhotosAlbum({
							filePath: e.tempFilePath,
							success: function() {
								this.getApp().core.showModal({
									title: '提示',
									content: '二维码保存成功',
									showCancel: false
								});
							},
							fail: function(e) {
								this.getApp().core.showModal({
									title: '图片保存失败',
									content: e.errMsg,
									showCancel: false
								});
							},
							complete: function(e) {
								this.getApp().core.hideLoading();
							}
						});
					},
					fail: function(e) {
						this.getApp().core.showModal({
							title: '图片下载失败',
							content: e.errMsg + ";" + self.wechat_qr_pic,
							showCancel: false
						});
					},
					complete: function(e) {
						this.getApp().core.hideLoading();
					}
				});
			},

			// 分享会员
			getShareData() {
				this.getApp().request({
					url: this.getApp().api.default.share_data,
					data: {
						userId: this.getApp().core.getStorageSync('USER_INFO').id
					},
					success: res => {
						if (res.code == 0) {
							this.setData({
								parent_id: res.data.parent_id,
								store_id: res.data.store_id,
								store_group_id: res.data.store_group_id,
								sid: res.data.id
							});
						} else {
							wx.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					}
				});
			},

			getShareImg() {
				this.getApp().request({
					url: this.getApp().api.default.vip_share_img,
					success: res => {
						if (res.code == 0) {
							this.setData({
								shareImg: res.data.vipImg
							});
						}
					}
				});
			},

			shareVip() {
				this.getApp().request({
					url: this.getApp().api.default.share_vip,
					data: {
						userId: this.getApp().core.getStorageSync('USER_INFO').id
					},
					success: res => {}
				});
			}

		}
	};
</script>
<style>
	@import "./vipList.css";
</style>
