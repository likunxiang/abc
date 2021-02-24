<template>
	<!--全部提醒-->
	<view class="remind">

		<!-- 导航开始 -->
		<!-- <view class="heardBanner">
			<view class="con flex ns-justify-content-space-between ns-align-items-flex-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;padding-left:20rpx;padding-right:20rpx;'">
				<view class="  go-back flex1" style="font-size:30rpx;color:#FFFFFF;" @tap="returnPage">
					<text class="iconfont icon-zuojiantoubeifen"></text>
				</view>
				<view class="qTitle flex1 ns-text-center " style="font-size:37rpx;color:#ffffff;">全部提醒</view>
				<view class="flex1"></view>
			</view>
		</view>
		<view :style="'height:' + customBar + 'px;'"></view> -->
		<!-- 导航结束 -->
		<!-- 导航开始 -->
		<custom mode="2" fixed="fixed" title="全部提醒" background="#FFFFFF" backColor="#333333" titleColor="#333333"></custom>
		<!-- 导航结束 -->

		<!-- 活动列表开始 -->
		<block v-if="allRemindList.length == 0">
			<view class="flex-x-center flex-y-center" :style="'height: calc(100vh - ' + customBar + 'px);'">
				<view>
					<view class="flex-x-center">
						<image :src="msg_empty" mode="aspectFill" style="width: 266rpx;height: 182rpx;margin: auto;"></image>
					</view>
					<view class="fs-30 color-999999 mt-30">暂时还没有接收到相关提醒</view>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="active-list">
				<view class="active-item" v-for="(item, index) in allRemindList" :key="index" hover-class="click" @tap="toDetail"
				 :data-id="item.brand_id">
					<!-- 时间 -->
					<view class="line1">
						<view class="line1-left">{{item.start_date}}</view>
						<view class="line1-right">
							<text>{{item.user_like_count}}</text>个顾客感兴趣</view>
					</view>
					<!-- 商品详情 -->
					<view class="line2">
						<view class="line2-left">
							<image :src="item.banner"></image>
						</view>
						<view class="line2-right">
							<view class="line2-name">{{item.name}}</view>
							<view class="line2-price">
								<view><text class="money">￥</text><text class="ns-text-bold">{{item.price?filters.priceStr(item.price)[0]:'0'}}.<text
										 class="fs-24">{{item.price?filters.priceStr(item.price)[1]:'00'}}</text></text>起</view>
								<!-- <text class="money">￥</text>
							235.
							<text class="price">5</text> -->
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<!-- 活动列表结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				filters: require('../../utils/filters.js'),
				allRemindList: []
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.setData({
				msg_empty: this.getApp().core.getStorageSync('_img').msg
			});
			this.getAllRemind();
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			getAllRemind() {
				this.getApp().request({
					url: this.getApp().api.maijia.all_remind,
					success: res => {
						if (res.code == 0) {
							this.setData({
								allRemindList: res.data
							});
						}
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

			//详情页面
			toDetail(e) {
				uni.navigateTo({
					url: '/user/activeRemind/activeRemind?id=' + e.currentTarget.dataset.id
				});
			}

		}
	};
</script>
<style>
	/* user/remindAll/remindAll.wxss */

	page {
	    background: #fff;
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
		padding: 30rpx 25rpx;
		font-size: 30rpx;
		color: #4A4A4A;
		font-weight: 400;
	}

	.line1 {
		display: flex;
		justify-content: space-between;
	}

	.line1-right text {
		color: #489A19;
	}

	.line2 {
		display: flex;
		align-items: center;
		margin-top: 10rpx;
	}

	.line2-left image {
		width: 120rpx;
		height: 120rpx;
		/* background-color: #000; */
		line-height: 0;
		font-size: 0;
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
	}

	.line2-price .money {
		font-size: 24rpx;
	}

	.line2-price .price {
		font-size: 24rpx;
	}

	.click {
		opacity: 0.8;
		/* transition: all 0.1s; */
		transform: scale(0.99);
	}
</style>
