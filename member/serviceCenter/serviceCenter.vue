<template>
	<!--pages/serviceCenter/serviceCenter.wxml-->
	<view class="page flex ns-column">
		<view class="p-24">
			<view class="public-box flex justify-between align-center" style="padding: 28rpx 24rpx;">
				<view class=" flex align-center  ">
					<view class="iconfont icon-sousuo  color-999999 fs-30" style="margin-right: 4rpx;"></view>
					<input type="text" class="fs-30 color-595959" style="width: 100%;" placeholder="请输入搜索内容" placeholder-style="color: #999999;"
					 :value="searchValue" @blur="seachInput"></input>
				</view>
				<view class="iconfont icon-guanbi1" style="color: #AAAAAA;" @tap="clearSearch" v-if="is_search"></view>
			</view>
			<view class="flex1" v-if="is_search">
				<!-- 搜索有内容 -->
				<view v-if="searchList.length>0">
					<navigator :url="'/member/selfHelpService/selfHelpService?id=' + item.id" v-for="(item, index) in searchList" :key="index" class="search-box fs-30 color-999999">{{item.name}}</navigator>
				</view>
				<!-- 搜索有内容 end -->
				<view v-else class="" style="padding: 150rpx 150rpx 0;">
					<view class="fs-30 color-333333 text-center">哎呀～没料到你会问这个问题呢联系客服获得贴心服务</view>
					<button class="relation-kf-btn" open-type="contact"
					 :session-from="'nickName=' + nickName + '|avatarUrl=' + avatarUrl + '|type=' + type + '|userId=' + userId + '|mchId=' + mchId + '|storeId=' + storeId">
					 点击联系客服</button>
					<view class="text-center fs-24 color-333333">
						<view>客服在线时间</view>
						<view>{{kf_time}}</view>
					</view>
				</view>
			</view>
			<view class="public-box flex align-center mt-24" style="padding: 24rpx;" v-if="!is_search">
				<image style="width: 120rpx;height: 120rpx;border-radius: 50%;background: #CCCCCC;" mode="aspectFill" :src="shoppers_info.avatar_url"></image>
				<view class="ml-24 flex1">
					<view class="fs-30">
						<text class="color-999999">您的专属导购：</text>
						<text class="color-333333">{{shoppers_info.nickname}}</text>
					</view>
					<view class="mt-24 flex justify-between align-center">
						<view>
							<text class="color-999999">微信号：</text>
							<text class="color-333333">{{shoppers_info.wechat_name}}</text>
						</view>
						<view class="copy-btn fs-24 color-999999" @tap.stop="mycopy(shoppers_info.wechat_name)">复制</view>
					</view>
				</view>
			</view>
		</view>
		<view class="flex" v-if="!is_search" style="height: calc( 100vh - 340rpx);background: #415FFB;">
			<view class="nav-silde" style="height: 100%">
				<scroll-view scroll-y="true" style="height: 100%" >
					<view v-for="(item, index) in navList" :key="index" :class="'nav-box ' + (navIns == index?'nav-box-active':'')"
					 @tap="changeNav(index)">{{item.name}}</view>
				</scroll-view>
				
			</view>
			<view class="question-silde flex1" style="height: 100%">
				<scroll-view scroll-y="true" style="height: 100%" @scrolltolower="moreQuestion">
					<navigator hover-class="none" :url="'/member/selfHelpService/selfHelpService?id=' + item.id" v-for="(item, index) in questionList" :key="index" class="question-box">{{item.name}}</navigator>
				</scroll-view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList: [{
					id: 1,
					name: '常见问题'
				}, {
					id: 2,
					name: '购物指南'
				}, {
					id: 3,
					name: '订单指南'
				}, {
					id: 4,
					name: '退货退款'
				}],
				navIns: 0,
				questionList: [{
					id: 1,
					name: '安全小提示'
				}, {
					id: 2,
					name: '发货时间'
				}, {
					id: 3,
					name: '如何申请售后'
				}, {
					id: 4,
					name: '商品质量问题'
				}],
				questionIns: 0,
				searchList: [{
					id: 1,
					name: '多长时间可以申请退货退款'
				}, {
					id: 2,
					name: '退货注意事项'
				}, {
					id: 3,
					name: '如何申请退货退款/仅退款'
				}, {
					id: 4,
					name: '商品质量问题'
				}],
				searchValue: "",
				is_search: false,
				shoppers_info: {},
				kf_time: '',
				stopLoadMore: false,
				page: 1,
				nickName: '',
				avatarUrl: '',
				type: '',
				userId: '',
				mchId: '',
				storeId: '',
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.getShoppers()
			this.getTypeList()
			let USER_INFO = uni.getStorageSync('USER_INFO') || {};
			this.setData({
				nickName: USER_INFO.nickname,
				avatarUrl: USER_INFO.avatar_url,
				type: 1,
				//我的页面进入
				userId: USER_INFO.id,
				mchId: typeof uni.getStorageSync('_mchInfo') == 'object' ? uni.getStorageSync('_mchInfo').id : '',
				storeId: typeof uni.getStorageSync('STORE') == 'object' ? uni.getStorageSync('STORE').id : ''
			});
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
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			seachInput(e) {
				if (e.detail.value == '') {
					this.is_search = false
					this.searchValue = e.detail.value
				} else {
					this.searchValue = e.detail.value
					this.is_search = true
					this.getAnswersList('search')
				}
			},

			clearSearch() {
				this.setData({
					searchValue: '',
					is_search: false
				}); // this.getWalkGoodsList()
			},

			changeNav(index) {
					this.navIns = index
					let navList = this.navList
					this.navId = navList[index].id
					this.getAnswersList()
			},
			// 获取专属导购信息
			getShoppers() {
				this.getApp().request({
					url: this.getApp().api.answers.get_shoppers,
					data: {},
					success: (res) => {
						console.log(res);
						if (res.code == 0) {
							this.shoppers_info = res.data
						} else {
							this.showToast(res.msg)
						}
					}
				})
			},
			// 获取分类列表
			getTypeList() {
				this.getApp().request({
					url: this.getApp().api.answers.type_list,
					data: {},
					success: (res) => {
						console.log(res);
						if (res.code == 0) {
							this.navList = res.data
							this.navId = this.navList[0].id
							this.getAnswersList()
						} else {
							this.showToast(res.msg)
						}
					}
				})
			},
			// 获取相应分类下的问答列表
			getAnswersList(type) {
				let list_type = type || ''
				this.getApp().request({
					url: this.getApp().api.answers.answers_list,
					data: {
						type: this.navId || '',
						keyword: this.searchValue || '',
						page: this.page || '1'
					},
					success: (res) => {
						console.log(res);
						if (res.code == 0) {
							if (list_type == 'search') {
								console.log(list_type);
								this.searchList = res.data.list
								this.kf_time = res.data.kf_time
							} else {
								this.questionList = res.data.list
							}
						} else {
							this.showToast(res.msg)
						}
					}
				})
			},
			// 加载更多问题
			moreQuestion() {
				var self = this;
				var page = self.page;
				var data = {
					type: self.navId || '',
					keyword: self.searchValue || '',
					page: self.page || '1'
				};
				var url = self.getApp().api.answers.answers_list
				uni.pading(self, url, data, function(res) {
					if (res.data.list.length == 0) {
						
						self.stopLoadMore = true
					
						return;
					}
				
					var newList = res.data.list;
					var nowList = self.questionList.concat(newList);
					self.questionList = nowList
				});
			}
		}
	};
</script>
<style>
	/* pages/serviceCenter/serviceCenter.wxss */
	page {
		background: #F4F4F4;
		height: 100%;
	}

	.page {
		min-height: 100%;
	}

	.copy-btn {
		width: 75rpx;
		height: 41rpx;
		line-height: 39rpx;
		text-align: center;
		border: 1rpx solid rgba(153, 153, 153, 1);
		border-radius: 4rpx;
	}

	.nav-silde {
		width: 165rpx;
		background: #F4F4F4;
	}

	.nav-box {
		width: 100%;
		height: 92rpx;
		line-height: 92rpx;
		text-align: center;
		font-size: 30rpx;
		color: #333333;
	}

	.nav-box-active {
		background: #fff;
	}

	.question-silde {
		background: #fff;
		padding: 0 24rpx;
	}

	.question-box {
		width: 100%;
		height: 92rpx;
		line-height: 92rpx;
		font-size: 30rpx;
		color: #666666;
	}

	.search-box {
		height: 76rpx;
		line-height: 76rpx;
		background: rgba(244, 244, 244, 1);
	}

	.relation-kf-btn {
		width: 260rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		background: #F23005;
		border-radius: 10rpx;
		color: #fff;
		font-size: 30rpx;
		margin: 40rpx auto;
	}
</style>
