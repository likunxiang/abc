<template>
	<!--pages/selfHelpService/selfHelpService.wxml-->
	<view class="page p-24">
		<view class="answer public-box mb-24">
			<view class="fs-30 color-333333 pb-32 mb-32" style="border-bottom: 1rpx solid #F4F4F4;">{{question_name}}</view>
			<view class="fs-30 color-333333" style="padding-bottom: 8rpx;">
				<view v-for="(item,index) in answers_info" :key="index">
					<view v-if="item.type == 1" class="pb-20" style="line-height: 38rpx;">
						<jyfParser :html="item.content" selectable="true"></jyfParser>
					</view>
					<view v-if="item.type == 2" class="pb-20">
						<image :src="img" style="width: 100%;" mode="widthFix" v-for="(img,imgIndex) in item.content" :key="img"></image>
					</view>
					<view v-if="item.type == 3" class="pb-20">
						<video :src="video" style="width: 100%;" controls v-for="(video,videoIndex) in item.content" :key="videoIndex"></video>
					</view>
				</view>
				
				
			</view>
		</view>
		<view class="public-box mb-24" style="padding-bottom: 16rpx;">
			<view class="fs-30 color-333333 pb-32 ns-text-bold" style="border-bottom: 1rpx solid #F4F4F4;">以上是否解决了你的问题</view>
			<view class="flex justify-between" style="padding: 16rpx 56rpx 0;">
				<view :class="'page-btn fs-24 flex-x-center ' + (is_useful == 1?'color-EB0401':'color-333333')" @click="remarkOn(is_useful == 1?0:1)">
					<view class="iconfont icon-youyong mr-8"></view>
					<view>有用</view>
				</view>
				<view :class="'page-btn fs-24 flex-x-center ' + (is_useful == 2?'color-EB0401':'color-333333')" @click="remarkOn(is_useful == 2?0:2)">
					<view class="iconfont icon-meiyong mr-8"></view>
					<view>无用</view>
				</view>
			</view>
		</view>
		<view class="issue-result">
			<view class="flex justify-between" style="padding: 32rpx 0;border-bottom: 1rpx solid rgba(190, 190, 190, .3);">
				<view class="fs-30 color-333333 ns-text-bold">没有找到相关问题？</view>
				<view class="fs-30 color-999999 flex align-center">
					<button style="background:transparent;border:0;padding:0;margin:0;width:100%;line-height: 1.25;font-size: 30rpx;color: #999999;"
					 open-type="contact" :session-from="'nickName=' + nickName + '|avatarUrl=' + avatarUrl + '|type=' + type + '|userId=' + userId + '|mchId=' + mchId + '|storeId=' + storeId">
						联系客服</button>
					<text class="iconfont icon-jinru fs-30"></text>
				</view>
			</view>
			<view style="padding: 29rpx 0 27rpx;">
				<view class="fs-30 color-333333 ns-text-bold">温馨提示</view>
				<view class="fs-24 color-333333 mt-10">客服在线时间：{{kf_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import jyfParser from '../../components/jyf-parser/jyf-parser.vue'
	export default {
		data() {
			return {
				question_id: '',
				answers_info: {},
				kf_time: '',
				nickName: '',
				avatarUrl: '',
				type: '',
				userId: '',
				mchId: '',
				storeId: '',
				is_useful: 0,
				question_name: ''
			};
		},

		components: {
			jyfParser
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.question_id = options.id
			this.getAnswersDetail()
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
			getAnswersDetail() {
				this.getApp().request({
					url: this.getApp().api.answers.answers_detail,
					data: {
						id: this.question_id
					},
					success: (res) => {
						console.log(res);
						if (res.code == 0) {
							this.answers_info = res.data.info
							this.kf_time = res.data.kf_time
							this.is_useful = res.data.collection
							this.question_name = res.data.arr.name
						} else {
							this.showToast(res.msg)
						}
					}
				})
			},
			remarkOn(choose) {
				this.is_useful = choose
				this.getApp().request({
					url: this.getApp().api.answers.collection,
					data: {
						id: this.question_id,
						status: this.is_useful
					},
					success: (res) => {
						console.log(res);
						if (res.code == 0) {
						} else {
							this.showToast(res.msg)
						}
					}
				})
			}
		}
	};
</script>
<style>
	/* pages/selfHelpService/selfHelpService.wxss */
	.page-btn {
		width: 181rpx;
		height: 61rpx;
		line-height: 59rpx;
		text-align: center;
		border: 1rpx solid rgba(153, 153, 153, 1);
		border-radius: 30rpx;
	}

	.issue-result {
		padding: 0 24rpx;
		background: #fff;
		border-radius: 20rpx;
	}
</style>
