<template>
	<view class="welfare">
		<common></common>
		<!-- 福利奖励页面 -->
		<custom mode="2" background="#F23005" fixed="fixed" title="福利奖励" titleColor="#FFFFFF">
		</custom>
		<!-- <view class="plr-24 mt-10">
			<view class="welfare-img">
				<image :src="pic_welfare" mode="aspectFit" class="" style="width:702rpx;height: 400rpx;"></image>
			</view>
		</view> -->
		<view class="top-top" :style="'background:url(' + pic_welfare + ') no-repeat;background-size: 100% 100%;'">
			<view class="flex align-center" v-if="red_bag_list">
				<view class="pic-box mr-20">
					<image :src="red_bag_list.avatar_url" mode="aspectFill" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="btn1">
					<view class="btn-text">
						{{red_bag_list.nickname}}：开启了{{total_num}}元津贴
					</view>
				</view>
			</view>
		</view>

		<view class="content ml-24 pr" style="width: 702rpx;">
			<view style="line-height: 46rpx;">
				<text style="color: #EF2E06;font-size: 28rpx;font-weight: bold;">浏览商场里带有</text>
				<image :src="logo_gift" style="width: 57rpx;height: 48rpx;display: inline-block;margin-bottom: -10rpx;" mode="aspectFill"></image>
				<text style="color: #EF2E06;font-size: 28rpx;font-weight: bold;">会场的商品，达到一定金额 将获得大额红包奖励</text>
			</view>
			<image :src="discount_demo" mode="aspectFill" style="width: 600rpx;height: 412rpx;margin-top: 58rpx;"></image>
			<!-- 右下角的钱开始 -->
			<image :src="money" mode="aspectFill" style="width: 200rpx;height: 180rpx;position: absolute;bottom: -40rpx;right: -40rpx;"></image>
			<!-- 右下角的钱结束 -->
		</view>
		<view class="welfare-footer" v-if="jump_id > 0">
			<navigator :url="'/pages/activity/activity?aid=' + jump_id" open-type="redirect" class="btn " hover-start-time="10" hover-class="click_hover">
				参与活动Go <text class="iconfont icon-jinru"></text><text class="iconfont icon-jinru"></text><text class="iconfont icon-jinru"></text>
			</navigator>
		</view>
		<view class="welfare-footer" v-else>
			<navigator url="/pages/guanyiguan/guanyiguan" open-type="redirect" class="btn " hover-start-time="10" hover-class="click_hover">
				参与活动Go <text class="iconfont icon-jinru"></text><text class="iconfont icon-jinru"></text><text class="iconfont icon-jinru"></text>
			</navigator>
		</view>

	</view>
</template>

<script>
	import custom from '@/components/custom/custom.vue'
	export default {
		data() {
			return {
				red_bag_list: [],
				total_num: '',
				total_people: '',
				stopLoadMore: false,
				page: 1,
				pic_welfare: uni.getStorageSync('_img').new_sub,
				money: uni.getStorageSync('_img').new_coin,
				margin_top: '-0rpx',
				index: 0,
				discount_demo: uni.getStorageSync('_img').demo,
				logo_gift: uni.getStorageSync('_img').logo_gift,
				jump: '0',
				jump_id: '0'
			};
		},
		components: {
			custom
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
			// this.getApp().page.onLoad(this, options);
			this.red_id = options.id
			this.getRedBagLog()
			// if (options.sid) {
			// 	this.getApp().core.setStorageSync('s_id', options.sid);
			// 	this.getApp().page.getServerShareInfo(options, function() {});
			// }
		},
		onReachBottom() {
			// var self = this
			// var url = self.getApp().api.coupon.red_bag_log;
			// var data = {
			// 	userId: uni.getStorageSync('USER_INFO').id,
			// 	id: this.red_id
			// };
			// self.getApp().core.pading(self, url, data, function(res, index) {
			// 	if (res.data.list.length == 0) {
			// 		self.setData({
			// 			stopLoadMore: true,
			// 		});
			// 		return;
			// 	}
			// 	var newList = res.data.list
			// 	var nowList = self.red_bag_list
			// 	self.red_bag_list = nowList.concat(newList)
			// });
		},
		methods: {
			//滑动，
			scroll_auto() {
				setTimeout(() => {
					if (this.index < this.red_bag_list.length - 5) {

						this.index++;
						this.margin_top = '-' + 126 * this.index + 'rpx';
						this.scroll_auto();
						if (this.index == this.red_bag_list.length - 5 && this.stopLoadMore == false) {
							this.last_page();
						}
					} else {
						this.index = 0;
						this.margin_top = '0rpx';
						this.scroll_auto();
					}
				}, 2000)
			},
			getRedBagLog() {
				this.getApp().request({
					url: this.getApp().api.coupon.new_red_bag_log,
					data: {
						userId: uni.getStorageSync('USER_INFO').id,
						id: this.red_id
					},
					success: (res) => {
						if (res.code == 0) {
							this.red_bag_list = res.data.user
							this.total_num = res.data.subsidy || '0.00'
							this.jump = res.data.jump
							this.jump_id = res.data.jump_id
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		color: #FFFFFF;
	}

	.top-top {
		width: 750rpx;
		height: 381rpx;
		padding: 20rpx 28rpx;
	}

	.pic-box {
		width: 108rpx;
		height: 108rpx;
		border-radius: 50%;
		background: #FFD05F;
		border: 8rpx solid #FFD05F;
		overflow: hidden;
		margin-left: 20rpx;
	}

	.welfare {
		min-height: 100%;
		width: 100%;
		overflow: hidden;
		position: relative;
		background-color: #F23005;
		padding-bottom: 120rpx;

		.welfare-img {
			width: 702rpx;
			height: 400rpx;
			border-radius: 20rpx;
			background: linear-gradient(41deg, #F65124, #F76F45);
			box-shadow: -4rpx 2rpx 57rpx 0px rgba(218, 36, 13, 0.84);
			overflow: hidden;
		}

		// overflow: hidden;
		// display: flex;
		// flex-flow: column nowrap;
		.btn1 {
			width: 500rpx;
			height: 86rpx;
			background: linear-gradient(0deg, #FFD05F, #FF921A);
			// box-shadow: 0rpx 6rpx 9rpx 0rpx rgba(216, 0, 1, 0.83);
			border-radius: 43rpx;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			position: relative;

			.btn-text {
				width: 483rpx;
				text-align: center;
				height: 66rpx;
				background: #F02E05;
				border-radius: 33rpx;
				line-height: 66rpx;
				font-size: 30rpx;
				font-weight: 500;
				color: #FFDD8C;
				box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0, 0, 0, 0.3) inset;
				overflow: hidden;
			}
		}

		.content {
			width: 702rpx;
			// background: linear-gradient(-135deg, #FFC17B, #FE8700);
			// box-shadow: -4rpx 2rpx 57rpx 0rpx rgba(218, 36, 13, 0.84);
			border-radius: 43rpx 43rpx 30rpx 30rpx;
			margin-bottom: 54rpx;
			margin-top: -80rpx;
			background: linear-gradient(0deg, #FFC17B, #F4AD5C);
			// background-color: blue;
			box-shadow: -4px 2px 57px 0px rgba(218, 36, 13, 0.84);
			padding: 58rpx 50rpx 86rpx;

		}

		.welfare-footer {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			height: 184rpx;

			// background-color: #ED1C03;
			.btn {
				width: 702rpx;
				font-size: 30rpx;
				color: #FFFFFF;
				margin-left: 24rpx;
				text-align: center;
				margin-top: 60rpx;
				line-height: 88rpx;
				box-shadow: 0rpx 10rpx 24rpx 0rpx rgba(196, 63, 36, 0.51), 0rpx 0rpx 30rpx 10rpx rgba(252, 255, 255, 1) inset;
				border-radius: 44rpx;

				// display: flex;
				// align-items: center;
				// justify-content: center;
				text {
					font-size: 40rpx;
					color: #FFFFFF;
					display: inline-block;
					margin-right: -20rpx;
					transform: translateY(4rpx);
				}
			}
		}
	}

	.click_hover {
		animation: click 0.4s;
	}

	@keyframes click {
		from {
			transform: scale(0.98);
		}

		to {
			transform: scale(1);
		}
	}
</style>
