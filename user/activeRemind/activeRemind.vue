<template>
	<!--活动提醒-->
	<view class="active-remind">

		<!-- 导航开始 -->
		<!-- 	<view class="heardBanner">
		<view class="con flex ns-justify-content-space-between ns-align-items-flex-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;padding-left:20rpx;padding-right:20rpx;'">
			<view class="  go-back flex1" style="font-size:30rpx;color:#FFFFFF;" @tap="returnPage">
				<text class="iconfont icon-zuojiantoubeifen;"></text>
			</view>
			<view class="qTitle flex1 ns-text-center " style="font-size:37rpx;color:#ffffff;">活动提醒</view>
			<view class="flex1"></view>
		</view>
	</view>
	<view :style="'height:' + customBar + 'px;'"></view> -->
		<!-- 导航结束 -->
		<!-- 导航开始 -->
		<custom mode="2" fixed="fixed" title="活动提醒" background="#FFFFFF" backColor="#333333" titleColor="#333333"></custom>
		<!-- 导航结束 -->

		<!-- 顾客列表开始 -->
		<view class="user-list">
			<view class="user-line1">这些顾客对活动感兴趣：</view>
			<view class="user-line2">
				<text v-for="(item, index) in activityRemindList.users" :key="index">{{item}}</text>
			</view>
		</view>
		<!-- 顾客列表结束 -->

		<!-- 活动列表开始 -->
		<view class="active-list">
			<view v-for="(item, index) in activityRemindList.activities" :key="index" class="active-item">

				<!-- 商品详情 -->
				<view class="line2 ns-justify-content-space-between">
					<view class="flex">
						<view class="line2-left">
							<image :src="item.banner"></image>
						</view>
						<view class="line2-right">
							<view class="line2-name ns-text-limit fs-28 ns-text-bold" style="width:280rpx;">{{item.name}}</view>
							<view class="line2-price">
								<view><text class="money">￥</text><text class="ns-text-bold">{{item.price?filters.priceStr(item.price)[0]:'0'}}.<text
										 class="fs-24">{{item.price?filters.priceStr(item.price)[1]:'00'}}</text></text> 起</view>
							</view>
						</view>
					</view>
					<!-- 分享按钮 -->
					<view class="line2-other">
						<view @tap="openshare" :data-goods="item.goods" :data-id="item.id" :data-content="item.market_label" :data-name="item.name"
						 :data-price="item.price" class="share iconfont icon-show_fenxiang"> <text class="fs-28">分享</text></view>
						<view class="share iconfont icon-jinru2" @tap="goActivityPage" :data-id="item.id"></view>
					</view>
				</view>
				<!-- 图片列表开始 -->
				<view class="images">
					<view v-for="(value, index) in item.goods" :key="index" v-if="index<=3" class="images-item">
						<image :src="value.cover_pic" :data-pic="value.cover_pic" @tap="browsePic" mode="aspectFill"></image>
						<view :class="item.goods.length-4 == 0 ? '' : 'number'">
							+{{item.goods.length-4}}
						</view>
					</view>

				</view>
				<!-- 图片列表结束 -->
				<!-- 文字部分开始 -->
				<view class="remind-text">
					<!-- <view class="remind-name" wx:for="{{activityRemindList.users}}">{{item}} </view> -->
					<view class="remind-content">
						{{item.market_label}}
					</view>
				</view>
				<!-- 文字部分结束 -->
				<!-- 日期开始 -->
				<view class="remind-time">
					活动时间
					<text>{{item.start_date}} ~ {{item.end_date}}</text>
				</view>
				<!-- 日期结束 -->
			</view>
		</view>
		<!-- 活动列表结束 -->

		<!-- 分享开始 -->
		<view class="my-share" catchtouchmove="stop" @tap.stop="quxiao" v-if="showShare">
			<view class="show-content" @tap.stop="stop">
				<view class="share-item">
					<button open-type="share" data-type="1">
						<view class="icon iconfont icon-weixin"></view>
						<view class="text">只分享活动链接</view>
					</button>
				</view>
				<view class="share-item" data-type="2">
					<button open-type="share">
						<view class="icon iconfont icon-weixin1"></view>
						<view class="text">复制文字后分享</view>
					</button>
				</view>
				<!-- 关闭 -->
				<view @tap.stop="quxiao" class="share-close iconfont icon-guanbi2"></view>
			</view>
		</view>
		<!-- 分享结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBar: getApp().globalData.gstatusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				showShare: false,
				//显示分享
				brand_id: '',
				activityRemindList: [],
				id: '',
				content: '',
				price: '',
				name: '',
				imgUrl: '',
				sharePic: '',
				shareTitle: '',
				filters: require('../../utils/filters.js')
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.getApp().page.onLoad(this, options);
			this.setData({
				brand_id: options.id
			});
			this.getActivityRemindList();
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
		onShareAppMessage: function(res) {
			var user_info = this.getApp().core.getStorageSync(this.getApp().const.USER_INFO);
			var mch_id = this.getApp().core.getStorageSync('_mchInfo').id;

			if (res.target.dataset.type == 1) {
				this.setData({
					showShare: false
				});
			} else {
				this.setData({
					showShare: false
				});
				this.copyText();
			}

			return {
				// title: `【${this.name}】活动开始啦，全场最低【${this.price}】起～点击链接，快进来逛逛吧`,
				title: this.shareTitle || `【${this.name}】活动开始啦，全场最低【${this.price}】起～点击链接，快进来逛逛吧`,
				path: 'pages/activity/activity?aid=' + this.id + "&user_id=" + user_info.id + "&mch_id=" + mch_id,
				imageUrl: this.sharePic || ''
			};
		},
		methods: {
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

			stop() {},

			openshare(e) {
				// console.log(e.currentTarget.dataset.content);
				var imgUrl = []
				var goods = e.currentTarget.dataset.goods
				for (let i in goods) {
					if (i < 4) {
						imgUrl.push(goods[i].cover_pic)
					} else {
						break
					}

				}
				this.setData({
					id: e.currentTarget.dataset.id,
					content: e.currentTarget.dataset.content,
					price: e.currentTarget.dataset.price,
					name: e.currentTarget.dataset.name,
					imgUrl: imgUrl.toString(),
					showShare: true
				});
				this.getSharePic()
			},

			copyText() {
				var text = this.content; // console.log(text + '11111');
				uni.setClipboardData({
					data: text,

					success(res) {
						uni.getClipboardData({
							success(res) {}

						});
					}

				});
			},

			//关闭分享遮罩
			quxiao() {
				this.setData({
					showShare: false
				});
			},

			getActivityRemindList() {
				this.getApp().request({
					url: this.getApp().api.maijia.activity_remind,
					data: {
						brand_id: this.brand_id
					},
					success: res => {
						if (res.code == 0) {
							this.activityRemindList = res.data
						} // else {
						//     getApp().core.showModal({
						//         title: '提示',
						//         content: res.msg,
						//         showCancel: false,
						//     });
						// }

					}
				});
			},

			browsePic(e) {
				let goodsList = this.activityRemindList.activities[0].goods;
				let arr = [];
				goodsList.forEach((item, index) => {
					arr.push(goodsList[index].cover_pic);
				});
				uni.previewImage({
					current: e.currentTarget.dataset.pic,
					// 当前显示图片的http链接
					urls: arr // 需要预览的图片http链接列表

				});
			},

			goActivityPage(e) {
				uni.navigateTo({
					url: '/pages/activity/activity?aid=' + e.currentTarget.dataset.id
				});
			},
			// 开启分享前，先获取分享卡牌
			getSharePic() {
				var self = this
				uni.showLoading({
					title: '加载中'
				})
				self.getApp().request({
					url: self.getApp().api.default.shareCard,
					method: 'POST',
					data: {
						pics: self.imgUrl,
						// price: tmpprice,
						sale_price: self.price,
						id: self.id,
						type: '106',
						goods_name: self.name
					},
					success: function(res) {
						if (res.code == 0) {
							uni.hideLoading()
							self.setData({
								sharePic: res.data.pic_url,
								shareTitle: res.data.goods_name
							})
						}
						if (res.code == 1) {
							uni.hideLoading()
							uni.showToast({
								title: '卡片图片获取失败，请稍后再试',
								duration: 2500,
								icon: 'none'
							})
							self.setData({
								is_commission: true
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
						self.setData({
							is_commission: true
						})
					}
				})
			},

		}
	};
</script>
<style>
	/* user/activeRemind/activeRemind.wxss */


	/* user/remindAll/remindAll.wxss */

	page {
		background: #f7f7f7;
	}

	.heardBanner {
		width: 750rpx;
		background: linear-gradient(134deg, rgba(48, 35, 174, 1) 0%, rgba(200, 109, 215, 1) 100%);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9;
	}


	/* 活动列表 */

	.active-list {}

	.active-item {
		width: 700rpx;
		margin: 30rpx 0 30rpx 25rpx;
		border-radius: 8rpx;
		background-color: #ffffff;
		box-sizing: border-box;
		padding: 17rpx 20rpx 25rpx 20rpx;
		font-size: 30rpx;
		color: #4A4A4A;
		font-weight: 400;
	}

	.line2 {
		display: flex;
		/* align-items: center; */
	}

	.line2-left image {
		width: 120rpx;
		height: 120rpx;
		/* background-color: #000; */
		line-height: 0;
		font-size: 0;
	}

	.line2-right {
		/* width: 300rpx; */
	}

	.line2-price {
		color: #C10000;
		font-size: 32rpx;
		margin-top: 20rpx;
		box-sizing: border-box;
		padding-left: 20rpx;
	}

	.line2-name {
		padding-left: 20rpx;
		padding-top: 13rpx;
	}

	.line2-price .money {
		font-size: 24rpx;
	}

	.line2-price .price {
		font-size: 24rpx;
	}

	.line2-other {}

	.line2-other>view {
		display: inline-block;
		color: #FFFFFF;
		line-height: 46rpx;
		padding: 0 16rpx;
		background-color: #489A19;
		border-radius: 23rpx;
		margin-top: 13rpx;
		margin-left: 22rpx;
	}

	.line2-other>view:nth-of-type(2) {
		padding: 0;
		text-align: center;
		width: 46rpx;
		height: 46rpx;
	}


	/* 图片列表 */

	.images {
		display: flex;
	}

	.images-item {
		width: 154rpx;
		height: 154rpx;
		margin-right: 15rpx;
		position: relative;
		overflow: hidden;
		border-radius: 8rpx;
	}

	.images-item .number {
		display: none;
	}

	.images-item:nth-of-type(4n) {
		margin-right: 0;
	}

	.images-item:nth-of-type(4n) .number {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 154rpx;
		height: 154rpx;
		background-color: rgba(0, 0, 0, 0.5);
		text-align: center;
		line-height: 154rpx;
		color: #ffffff;
	}

	.images-item image {
		width: 154rpx;
		height: 154rpx;
		line-height: 0;
	}


	/* 文字部分 */

	.remind-text {
		font-size: 30rpx;
		font-weight: 400;
		color: #4A4A4A;
		line-height: 42rpx;
		margin-top: 20rpx;
	}

	.remind-time {
		font-size: 24rpx;
		font-weight: 400;
		color: #4A4A4A;
		line-height: 33rpx;
		margin-top: 24rpx;
	}

	.remind-time text {
		color: #489A19;
	}


	/* 用户列表。。。。。。。。。。。。。。。。 */

	.user-list {
		width: 700rpx;
		margin: 30rpx 0 0 25rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #2C2C2C;
		line-height: 42rpx;
		box-sizing: border-box;
		padding: 30rpx 25rpx;
	}

	.user-line2 {
		color: #4A4A4A;
		margin-top: 20rpx;
	}

	.user-line2 text {
		padding-right: 25rpx;
	}


	/* 分享开始 */

	.my-share {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}

	.show-content {
		width: 750rpx;
		height: 266rpx;
		background-color: #ffffff;
		color: #595959;
		font-size: 28rpx;
		text-align: center;
		line-height: 40rpx;
		display: flex;
		align-items: center;
		position: absolute;
		bottom: 0;
		left: 0;
		animation: open 0.3s;
	}

	.share-item {
		width: 50%;
	}

	.share-item .icon {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		background-color: #4CB202;
		color: #ffffff;
		display: inline-block;
		line-height: 120rpx;
		font-size: 60rpx;
		padding-left: 4rpx;
	}

	.share-close {
		/* float: right;
    align-self: flex-start;*/
		margin: 20rpx 20rpx 0 0;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1000;
	}

	@keyframes open {
		0% {
			transform: translateY(100%);
		}

		100% {
			transform: translateY(0);
		}
	}

	.click {
		opacity: 0.8;
		/* transition: all 0.1s; */
		transform: scale(0.99);
	}

	button {
		background-color: #fff;
	}

	button::after {
		border: 0rpx solid rgba(0, 0, 0, .2);
	}
</style>
