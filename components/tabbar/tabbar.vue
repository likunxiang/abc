<template>
	<!-- 底部导航栏底部导航栏底部导航栏底部导航栏底部导航栏底部导航栏 -->
	<view>
		<view style="height:88rpx;" v-if="show_discount && showFooter.status == 1"></view>
		<view class="mytabbar" :style="{'height':(jianrong=='device_iphone_x'?'175rpx':'110rpx')}" v-if="navs.length > 0">
			<view class="discounts-bottom flex align-center justify-between" :style="{'bottom':(jianrong=='device_iphone_x'?'175rpx':'110rpx')}"
			 v-if="show_discount && showFooter.status == 1">
				<view class="flex align-center">
					<view class="discounts-pic-box flex-x-center flex-y-center">
						<image class="discounts-pic" :src="logo_gift" mode="aspectFit"></image>
					</view>
					<view class="discounts-text-italic">待领取奖励</view>
					<view class="fs-36" style="color: #FFF0CE;">x{{showFooter.data.count}}</view>
				</view>
				<view class="flex align-center">
					<view class="fs-24 color-fff">剩余时间：{{discount_end_time}}</view>
					<navigator :url="'/member/mchMean/mchMean?id=' + showFooter.data.min_exptime_arr.id" class="discounts-btn fs-24 color-fff">去领取</navigator>
				</view>
			</view>
			<view class="fixed" @touchmove.stop.prevent="clear" :style="{'height':(jianrong=='device_iphone_x'?'175rpx':'110rpx')}">
				<view class="content" :style="{'height':(jianrong=='device_iphone_x'?'175rpx':'110rpx')}">
					<view class="navlist">
						<view class="navitem" v-for="(item, index) in navs" :key="index" @tap="navto(item.new_url)">
							<image :src="item.active ? item.active_icon : item.icon" mode="aspectFit"></image>
							<text :style="'color: ' + (item.active ? '#F23005' : '#616161') + ';'" class="">{{ item.text }}</text>
						</view>
					</view>

					<!-- <view @tap="navto('/pages/liveRoom/liveRoom')" class="live iconfont icon-zhibo"></view> -->
					<view @tap="navto('/member/shop-v/shop-v')" class="live iconfont icon-zhibo"></view>
					<view class="ccccc" :style="{'height':(jianrong=='device_iphone_x'?'60rpx':'0')}"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tabbar',
		data() {
			return {

				navs: [],
				jianrong: '',
				sh: '',
				sm: '',
				ss: '',
				discount_end_time: '00:00:00',
				show_time: false,
				timer: 0,
				logo_gift: uni.getStorageSync('_img').logo_gift
			};
		},
		props: {
			show_discount: {
				type: Boolean,
				default: false
			}
		},
		mounted() {},
		computed: {
			showFooter() {
				return this.$store.state.check_mch_wait_sub
			}
		},
		methods: {
			//判断是哪个页面
			initIndex() {
				//console.log(this.route)
				let page = getCurrentPages();
				let self = page[page.length - 1];

				let route = '/' + self.route;

				//#ifdef MP-WEIXIN
				route = '/' + self.__route__;
				//#endif

				this.navs.some((item, index) => {
					if (item.url == route) {
						item.active = true;
						return true;
					}
					return false;
				});
			},
			navto(url) {
				clearInterval(this.timer)
				//console.log(url);redirectTo
				uni.reLaunch({
					url: url
				});
			},
			updataNavs() {
				//更新navs
				this.getApp().request({
					url: this.getApp().api.default.navbar,
					success: res => {
						//console.log(res);
						if (res.code == 0) {
							uni.setStorageSync('navs', res.data.navs);
							let page = getCurrentPages();
							let self = page[page.length - 1];

							let route = '/' + self.route;

							//#ifdef MP-WEIXIN
							route = '/' + self.__route__;
							//#endif
							res.data.navs.some((item, index) => {
								if (item.url == route) {
									item.active = true;
									return true;
								}
								return false;
							});
							this.navs = res.data.navs;
							// console.log(999999999999)
						}
					}
				});
			},
			clear() {

			},
			// 优惠券倒计时
			discountTime() {
				// console.log(this.showFooter);
				if (this.showFooter.data) {
					if (this.showFooter.data.min_exptime_arr) {
						var end_time = this.showFooter.data.min_exptime_arr.exptime
					} else {
						return
					}
				} else {
					return
				}
				console.log(end_time);
				let now_time = parseInt(new Date().getTime() / 1000);
				let now_date = end_time - now_time
				if (now_date > 0) {
					let sh, sm, ss;
					sh = Math.floor(now_date / 60 / 60);
					sm = Math.floor(now_date / 60 % 60);
					ss = Math.floor(now_date % 60);


					if (sh < 10) {
						sh = '0' + sh;
					}

					if (sm < 10) {
						sm = '0' + sm;
					}
					if (ss < 10) {
						ss = '0' + ss
					}

					if (sh >= '00' & sm >= '00' && ss >= '00') {
						this.sh = sh
						this.sm = sm
						this.ss = ss
						this.show_time = true
					}
					this.discount_end_time = sh + ":" + sm + ":" + ss
				}
			}
		},
		created() {
			//console.log('兼容',uni.getStorageSync('jianrong'))
			this.jianrong = uni.getStorageSync('jianrong');
			let navs = uni.getStorageSync('navs');
			if (typeof navs == 'object') {
				this.navs = navs;
				this.initIndex();
			}
			this.initIndex();
			//更新navs
			this.updataNavs();
			if (this.show_discount) {
				this.timer = setInterval(this.discountTime, 1000);
			}

		}
	};
</script>

<style lang="scss">
	.mytabbar {
		width: 750rpx;
		height: 110rpx;

		.discounts-bottom {
			width: 750rpx;
			padding: 0rpx 24rpx;
			line-height: 88rpx;
			background: linear-gradient(-90deg, #FE4001, #EB0301);
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 99;
		}
		.discounts-pic-box {
			width: 66rpx;
			height: 66rpx;
			background: #FFF0CE;
			border-radius: 50%;
			margin-right: 21rpx;
		}
		.discounts-pic {
			width: 58rpx;
			height: 62rpx;
		}
		.discounts-btn {
			width: 132rpx;
			height: 56rpx;
			line-height: 56rpx;
			text-align: center;
			background: linear-gradient(1deg, #FF8F8F, #FF7C00, #FFCA4F);
			box-shadow: 0rpx 9rpx 13rpx 0rpx rgba(210, 0, 30, 0.58), 0rpx 3rpx 3rpx 0px rgba(255, 255, 255, 0.9) inset;
			border-radius: 28rpx;
			text-shadow: 0rpx 2rpx 2rpx #EB7B0F;
			margin-left: 27rpx;
		}

		.discounts-text-italic {
			margin-right: 20rpx;
			font-size: 32rpx;
			font-family: HuXiaoBo-NanShen;
			font-weight: 600;
			font-style: italic;
			color: #FFF0CE;
		}

		.fixed {
			width: 750rpx;
			height: 110rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			background-color: #ffffff;
			box-sizing: border-box;
			border-top: 1rpx solid #F5F5F5;
			z-index: 99;
			box-shadow: 0rpx -9rpx 18rpx 0rpx rgba(222, 222, 222, 0.3);

			.content {
				position: relative;
				width: 750rpx;
				height: 110rpx;

				.live {
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					z-index: 100;
					width: 110rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					height: 110rpx;
					// background: linear-gradient(0deg, #ff9802, #ffc901);
					background: linear-gradient(90deg, #FE4001, #EB0301);
					border: 12rpx solid #ffffff;
					border-radius: 55rpx;
					line-height: 110rpx;
					text-align: center;
					color: #ffffff;
					top: -16rpx;
					box-sizing: border-box;
					box-shadow: 0px -4rpx 18rpx 0px rgba(222, 222, 222, 0.5);
					font-size: 34rpx;
				}

				.navlist {
					overflow: hidden;
					display: flex;
					align-items: center;

					.navitem {
						//background-color: red;
						//width:25%;
						flex: 1;
						height: 97rpx;
						display: flex;
						flex-flow: column nowrap;
						justify-content: center;
						align-items: center;

						&:nth-of-type(2) {
							margin-right: 70rpx;
						}

						&:nth-of-type(3) {
							margin-left: 70rpx;
						}

						image {
							width: 45rpx;
							height: 45rpx;
							//background-color: blue;
						}

						text {
							font-size: 22rpx;
							color: #616161;
							//background-color: yellow;
							height: 22rpx;
						}

						text.active {
							color: #F23005;
						}
					}
				}
			}
		}
	}
</style>
