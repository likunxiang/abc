<template>
	<view class="page">
		<common></common>
		<view class="con flex justify-between align-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
			<view class="backBtn" @tap="returnPage">
				<text class="iconfont icon-zuojiantoubeifen"></text>
			</view>
			<view class="fs-36 color-fff">开启奖励</view>
			<view></view>
		</view>
		<view :style="'height:' + customBar + 'px'"></view>
		<view class="letter pr">
			<image :src="bg_letter" mode="aspectFill"></image>
			
			<view v-if="redType==0">
				<view class="award-num">成功开启{{subsidy}}元津贴奖励</view>
				<view class="award-text">津贴奖励已成功发放给好友</view>
			</view>
			<view v-else-if="redType==1">
				<view class="award-num">您已经帮他拆过了</view>
				<view class="award-text">津贴奖励已成功发放给好友</view>
			</view>
			<view v-else>
				<view class="award-num">红包失效了，下次早点吧</view>
				<view class="award-text">津贴奖励已成功发放给好友</view>
			</view>
		</view>
		<view class="fs-24 color-fff text-center">快去分享到群，通知其它好友来参加活动吧</view>
		<view class="plr-24">
			<button open-type="share" class="discounts-btn">立即分享到群</button>
		</view>
		<view class="plr-24">
			<view class="award-main pr">
				<!-- 图标 -->
				<image class="award-logo1" :src="logo_award_2" mode="aspectFill"></image>
				<image class="award-logo2" :src="logo_award_1" mode="aspectFill"></image>
				<view class="color-000000 flex-x-center align-center">
					<text class="iconfont icon-sanjiaoxing1 fs-20" style="transform: rotate(-180deg);"></text>
					<text class="ml-24 mr-24 ns-text-bold fs-30">友情提示</text>
					<text class="iconfont icon-sanjiaoxing1 fs-20"></text>
				</view>
				<view class="mt-20 fs-24 color-333333">1.点击上方“立即分享到群”通知更多好友来参与活动</view>
				<view class="mt-20 fs-24 color-333333">2.请记得将以下开过红包的朋友拉进群里，增加群人数，提高你的销售业绩</view>
				<view class="award-total-people">
					<text>今天累计帮</text>
					<text class="fs-40 ml-10 mr-10">{{total_people}}</text>
					<text>个好友开启津贴奖励</text>
				</view>
				<view class="award-total-num">
					（累计开启{{total_num}}元津贴）
				</view>
				<!-- 列表 -->
				<view class="award-list">
					<view class="award-list-main flex align-center" v-for="(item,index) in red_bag_list" :key="item.id">
						<view :class="'award-list-main-img ' + (index<red_bag_list.length?'mb-20':'')" >
							<image class="award-list-main-img" :src="item.avatar_url" mode="aspectFill"></image>
						</view>
						<view class="fs-24 color-333333 ml-16">{{item.nickname}}：开启了{{item.subsidy}}元津贴</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				bg_letter: uni.getStorageSync('_img').bg_letter,
				logo_award_1: uni.getStorageSync('_img').logo_award_1,
				logo_award_2: uni.getStorageSync('_img').logo_award_2,
				pic_open_award: uni.getStorageSync('_img').pic_mch_mean,
				red_bag_list: [],
				total_num: '',
				total_people: '',
				stopLoadMore: false,
				page: 1,
				sid: '',
				red_id: '',
				redType: '',
				subsidy: '',
				username: ''
			}
		},
		onLoad(options) {
			var self = this;
			var token = this.getApp().core.getStorageSync('ACCESS_TOKEN');
			
			if (!token) {
				self.setData({
					showGetLogin: true,
					user_info_show: true
				});
				this.$store.commit('vuexSet', {
					name: 'show_loginTpl',
					value: true
				})
			}
			this.red_id = options.id
			this.username = options.username
			this.receiveRed()
			this.receiveRedLog()
		},
		onReachBottom() {
			var self = this
			var url = self.getApp().api.coupon.red_bag_log;
			var data = {
				open_user: 1,
				userId: uni.getStorageSync('USER_INFO').id,
				id: this.red_id
			};
			self.getApp().core.pading(self, url, data, function(res, index) {
				if (res.data.list.length == 0) {
					self.setData({
						stopLoadMore: true,
					});
					return;
				}
				var newList = res.data.list
				var nowList = self.red_bag_list
				self.red_bag_list = nowList.concat(newList)
			});
		},
		methods: {
			getRedBagLog() {
				this.getApp().request({
					url: this.getApp().api.coupon.red_bag_log,
					data: {
						open_user: 1,
						userId: uni.getStorageSync('USER_INFO').id,
						id: this.red_id
					},
					success: (res) => {
						if(res.code == 0) {
							this.red_bag_list = res.data.list
							this.total_num = res.data.all_subsidy || '0.00'
							this.total_people = res.data.all_user
						}
					}
				})
			},
			receiveRed() {
				uni.showLoading({
					mask:true,
					title: '正在开启红包'
				})
				this.getApp().request({
					url: this.getApp().api.coupon.receive_red_bag,
					data: {
						userId: uni.getStorageSync('USER_INFO').id,
						id: this.red_id,
						accept: 1
					},
					success: (res) => {
						if(res.code == 0) {
							this.rel_id = res.data.data.rel_id
							this.subsidy = res.data.data.subsidy
							this.redType = res.data.type==0?'0':res.data.type  //红包 0可拆 1已拆 2已经失效
							if (this.redType == 3) {
								uni.showModal({
									title: '红包需店主开启',
									showCancel: false,
									success: (res) => {
										if(res.confirm) {
											uni.redirectTo({
												url: '/pages/index/index'
											})
										}
									}
								})
							}
						}
					},
					complete: (res) => {
						this.getRedBagLog()
						uni.hideLoading()
					}
				})
			},
			receiveRedLog() {
				this.getApp().request({
					url: this.getApp().api.coupon.receive_red_bag_log,
					data: {
						userId: uni.getStorageSync('USER_INFO').id,
						rel_id: this.red_id
					},
					success: (res) => {
						if(res.code == 0) {
							this.sid = res.data.id
						}
					}
				})
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
		},
		onShareAppMessage() {
			var nickname = this.username;
			let title = '恭喜' + nickname + '抽中了大额津贴，快来领取您的奖励'
			let img = this.pic_open_award
			let mch_id = uni.getStorageSync('_mchInfo').id;
			let user_id = this.getApp().core.getStorageSync('USER_INFO').id;
			return {
				title: title,
				path: '/pages/welfare/welfare?id=' + this.red_id + '&mch_id=' + mch_id + '&user_id=' + user_id,
				imageUrl: img
			};
		}
	}
</script>

<style lang="scss">
	.page {
		min-height: 100%;
		background: #D82A18;
		padding-bottom: 24rpx;
		.con {
			position: fixed;
			width: 100%;
			top: 0;
			left: 0;
			z-index: 1;
			display: flex;
			padding: 0 24rpx;
			background: #D82A18;
			.backBtn {
				font-size: 36rpx;
				display: flex;
				align-items: center;
				height: 100%;
				justify-content: center;
				max-width: 100%;
				color: #FFFFFF;
			}
		}

		.letter {
			margin-left: 19rpx;
			width: 722rpx;
			height: 367rpx;

			image {
				width: 722rpx;
				height: 367rpx;
			}

			.award-num {
				position: absolute;
				top: 83rpx;
				left: 0rpx;
				width: 100%;
				font-size: 40rpx;
				color: #D92B2B;
				font-weight: bold;
				text-align: center;
			}

			.award-text {
				position: absolute;
				top: 171rpx;
				left: 0rpx;
				width: 100%;
				font-size: 24rpx;
				color: #D92B2B;
				text-align: center;
			}
		}

		.discounts-btn {
			width: 702rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			background: linear-gradient(90deg, #F6DBB5, #F0C383, #EBB261);
			box-shadow: 0rpx 6rpx 6rpx 0rpx #FFF3D1 inset,0rpx 12rpx 24rpx 0rpx rgba(172, 21, 12, 0.6);
			border-radius: 44rpx;
			font-size: 30rpx;
			color: #D82A18;
			margin-top: 24rpx;
			text-shadow: 0px 1rpx 1rpx #BB4033;
			margin-bottom: 80rpx;
		}
		.award-main {
			width: 702rpx;
			background: #FFFFFF;
			border-radius: 30rpx;
			padding: 40rpx 77rpx;
			box-shadow: 0rpx 0rpx 24rpx 0rpx rgba(172, 21, 12, 0.6) inset;
			.award-logo1 {
				position: absolute;
				left: 3rpx;
				top: 9rpx;
				width: 85rpx;
				height: 90rpx;
			}
			.award-logo2 {
				position: absolute;
				width: 115rpx;
				height: 103rpx;
				right: -54rpx;
				top: 307rpx;
			}
			.award-total-people {
				text-align: center;
				margin-top: 35rpx;
				font-size: 30rpx;
				color: #D82A18;
				font-weight: bold;
			}
			.award-total-num {
				font-size: 24rpx;
				color: #D82A18;
				margin-top: 29rpx;
				text-align: center;
			}
			.award-list {
				width: 100%;
				margin-top: 17rpx;
				.award-list-main {
					margin-bottom: 20rpx;
					.award-list-main-img {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>
