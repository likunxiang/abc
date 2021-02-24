<template>
	<view class="liveRoom" v-show="show_page">
		<block v-if="roomList.length <= 0">
			<image style="width: 100%" mode="widthFix" :src="live_empty"></image>
		</block>
		<block v-else>
			<view class="p-24">
				<view v-for="(item, index) in roomList" :key="index">
					<view v-if="item.is_see == 0">
						<view class="room-box mb-24" @click="lockVideo" :data-msg="item.see_msg">
							<view class="img-box pr">
								<image :src="item.cover_pic" mode="aspectFill" style="width: 100%;height: 100%;"></image>
							</view>
							<view class="flex align-center justify-between p-24">
								<view class="flex align-center">
									<view :class="'iconfont icon-huo icon-box ' + (item.live_status == 103?'color-9B9B9B':'color-489A19')"></view>
									<view class="fs-28 color-333333">{{item.name}}</view>
								</view>
								<view v-if="item.is_see == 0" class="iconfont icon-suozhu fs-40 color-333333"></view>
								<!-- <view class="cu-btn fs-24 round color-fff" style="background: linear-gradient(153deg, #FAD961 0%, #F76B1C 100%);width: 140rpx;height: 45rpx;padding: 0;">{{item.status == 101?'进入直播':(item.status == 102?'暂未开始':'进入回看')}}</view> -->
							</view>
						</view>
					</view>
					<view v-else>
						<navigator :url="'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + item.live_player_id + '&custom_params=' + customParams"
						 class="room-box mb-24" v-if="item.type == 1">
							<view class="img-box">
								<image :src="item.cover_pic" mode="aspectFill" style="width: 100%;height: 100%;"></image>
							</view>
							<view class="flex align-center justify-between p-24">
								<view class="flex align-center">
									<view :class="'iconfont icon-huo icon-box ' + (item.live_status == 103?'color-9B9B9B':'color-489A19')"></view>
									<view class="fs-28 color-333333">{{item.name}}</view>
								</view>
								<view v-if="item.is_see == 0" class="iconfont icon-suozhu fs-40 color-333333"></view>
								<!-- <view class="cu-btn fs-24 round color-fff" style="background: linear-gradient(153deg, #FAD961 0%, #F76B1C 100%);width: 140rpx;height: 45rpx;padding: 0;">{{item.status == 101?'进入直播':(item.status == 102?'暂未开始':'进入回看')}}</view> -->
							</view>
						</navigator>
						<navigator :url="'/pages/video/video?src=' + item.video_url + '&title=' + (item.name || '')" class="room-box mb-24"
						 v-else-if="item.type == 2">
							<view class="img-box pr">
								<image :src="item.cover_pic" mode="aspectFill" style="width: 100%;height: 100%;"></image>
							</view>
							<view class="flex align-center justify-between p-24">
								<view class="flex align-center">
									<view :class="'iconfont icon-huo icon-box ' + (item.live_status == 103?'color-9B9B9B':'color-489A19')"></view>
									<view class="fs-28 color-333333">{{item.name}}</view>
								</view>
								<view v-if="item.is_see == 0" class="iconfont icon-suozhu fs-40 color-333333"></view>
								<!-- <view class="cu-btn fs-24 round color-fff" style="background: linear-gradient(153deg, #FAD961 0%, #F76B1C 100%);width: 140rpx;height: 45rpx;padding: 0;">{{item.status == 101?'进入直播':(item.status == 102?'暂未开始':'进入回看')}}</view> -->
							</view>
						</navigator>
						<navigator :url="'/pages/video/video?src=' + item.video_url + '&title=' + (item.name || '')" class="room-box mb-24"
						 v-else-if="item.type == 2">
							<view class="img-box pr">
								<image :src="item.cover_pic" mode="aspectFill" style="width: 100%;height: 100%;"></image>
							</view>
							<view class="flex align-center justify-between p-24">
								<view class="flex align-center">
									<view :class="'iconfont icon-huo icon-box ' + (item.live_status == 103?'color-9B9B9B':'color-489A19')"></view>
									<view class="fs-28 color-333333">{{item.name}}</view>
								</view>
								<view v-if="item.is_see == 0" class="iconfont icon-suozhu fs-40 color-333333"></view>
								<!-- <view class="cu-btn fs-24 round color-fff" style="background: linear-gradient(153deg, #FAD961 0%, #F76B1C 100%);width: 140rpx;height: 45rpx;padding: 0;">{{item.status == 101?'进入直播':(item.status == 102?'暂未开始':'进入回看')}}</view> -->
							</view>
						</navigator>
						<navigator :url="'/pages/video-tx/video-tx?src=' + item.video_url + '&title=' + (item.name || '')" class="room-box mb-24"
						 v-else-if="item.type == 3">
							<view class="img-box pr">
								<image :src="item.cover_pic" mode="aspectFill" style="width: 100%;height: 100%;"></image>
							</view>
							<view class="flex align-center justify-between p-24">
								<view class="flex align-center">
									<view :class="'iconfont icon-huo icon-box ' + (item.live_status == 103?'color-9B9B9B':'color-489A19')"></view>
									<view class="fs-28 color-333333">{{item.name}}</view>
								</view>
								<view v-if="item.is_see == 0" class="iconfont icon-suozhu fs-40 color-333333"></view>
								<!-- <view class="cu-btn fs-24 round color-fff" style="background: linear-gradient(153deg, #FAD961 0%, #F76B1C 100%);width: 140rpx;height: 45rpx;padding: 0;">{{item.status == 101?'进入直播':(item.status == 102?'暂未开始':'进入回看')}}</view> -->
							</view>
						</navigator>
					</view>

				</view>

			</view>
		</block>


		<!-- 底部导航栏开始 -->
		<tabbar></tabbar>
		<!-- 底部导航栏结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				roomList: [{
					roomid: '0',
					cover_img: 'http://imgm.test.qinpu.cloud/statics/wxapp/mch/def_header_bg.jpg',
					start_time_str: '2021-1-11',
					end_time_str: '2021-1-12',
					status: '103',
					name: '直播测试',
					is_see: 0

				}],
				live_empty: '',
				show_page: false,
				page: '', // 页，从接口获取
				stopLoadMore: false
			}
		},
		methods: {
			liveRoomList() {
				uni.showLoading({
					title: '加载中',
				})
				this.getApp().request({
					url: this.getApp().api.liveApi.liveList,
					success: (res) => {
						if (res.code == 0) {
							var mch_id = uni.getStorageSync('_mchInfo').id || '';
							var user_id = uni.getStorageSync('USER_INFO').id || '';
							let customParams = encodeURIComponent(JSON.stringify({
								mch_id: mch_id,
								user_id: user_id
							}))
							this.setData({
								roomList: res.data.list,
								customParams: customParams,
								live_empty: uni.getStorageSync('_img').live_empty,
								page: res.data.page
							})
						}
					},
					complete: (res) => {
						this.show_page = true
						uni.hideLoading()
					}
				})
			},
			lockVideo(e) {
				let msg = e.currentTarget.dataset.msg
				uni.showToast({
					title: msg,
					icon: 'none'
				})
			},
			getMore() {
				if (this.stopLoadMore) {
					return
				}
				uni.showLoading({
					title: '加载中',
				})


				this.getApp().request({
					url: this.getApp().api.liveApi.liveList,
					data: {
						page: this.page
					},
					success: (res) => {
						if (res.code == 0) {
							if (res.data.list.length == 0) {
								this.stopLoadMore = true
								return
							}
							var newActList = res.data.list
							var nowActList = this.roomList.concat(newActList)
							this.page = res.data.page
							this.roomList = nowActList
						}
					},
					complete: (res) => {
						uni.hideLoading()
					}
				})

			},
		},
		onLoad(options) {
			this.getApp().page.onLoad(this, options);
			this.liveRoomList();
			this.setData({

				live_empty: uni.getStorageSync('_img').live_empty
			})
		},
		onReachBottom() {
			this.getMore()
		},

	}
</script>

<style>
	.room-box {
		background: #FFFFFF;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.img-box {
		width: 100%;
		height: 270rpx;
		overflow: hidden;
	}

	.icon-box {
		width: 32rpx;
		height: 32rpx;
		line-height: 32rpx;
		text-align: center;
		background: linear-gradient(90deg, #FE4001, #EB0301);
		border-radius: 50%;
		margin-right: 9rpx;
		font-size: 18rpx;
		color: #fff;
		margin-top: 2rpx;
	}

	.text-box {
		position: absolute;
		bottom: 0rpx;
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 24rpx;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
