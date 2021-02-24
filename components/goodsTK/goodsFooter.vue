<template>
	<view :class="'bar-bottom1 ' + __device">
		<view class="flex-row bar-bottom bg-white">
			<view class="flex-grow-0 flex-row">

				<view class=" flex-y-center bar-bottom-btn" @tap='goHome' v-if="app == 'lianmeng'">
					<view>
						<view class="goods-header-icon">
							<view class="iconfont icon-qinpuLOGO"></view>
						</view>
						<view class="color-333333 fs-20" style="color: #EB0401;">亲铺</view>
					</view>

				</view>

				<view class=" flex-y-center bar-bottom-btn" @tap="less(to_index)">
					<view>
						<text class="iconfont icon-shouye color-616161" style="font-size: 36rpx !important;"></text>
						<view class="color-333333 fs-20">返回首页</view>
					</view>
				</view>

				<view class=" flex-y-center bar-bottom-btn" @tap="less(goCar)" v-if="app == 'qinpu'">
					<view>
						<text class="iconfont icon-gouwuche color-616161" style="font-size: 36rpx !important;"></text>
						<view class="color-333333 fs-20">购物车</view>
					</view>
				</view>


				<block v-if="login(false) == false">
					<view class=" flex-y-center bar-bottom-btn">
						<view>
							<button open-type="share" class="share-clear" style="line-height: 0;">
								<text class="iconfont icon-fenxiang1 color-616161" style="font-size: 34rpx !important;line-height: 34rpx;height: 36rpx;"></text>
								<view class="color-333333 fs-20" style="line-height: 22rpx;margin-top: 4rpx;">分享</view>
							</button>
						</view>
					</view>
				</block>
				<block v-else>
					<view @tap.stop="less(login)" class="flex-y-center bar-bottom-btn flex-y flex-x-center">
						<text class="iconfont icon-fenxiang1 color-616161" style="font-size: 34rpx !important;"></text>
						<view class="color-333333 fs-20">分享</view>
					</view>
				</block>

			</view>
			
			<view hover-class="click1" class="flex-1 flex flex-x-center flex-y-center color-fff mr-24" style="height: 80rpx;border-radius: 8rpx;background: #EB0401;align-self: center;"
			 @tap="copyGoodsLink">
				<text class="fs-30">去下单</text>
				<text v-if="couponPrice" class="ml-16 fs-20">（领券省 ¥ {{couponPrice||''}}）</text>
			</view>
		</view>
	</view>
</template>

<script>
	let utils = require('../../utils/util.js');
	export default {
		data() {
			return {
				app: getApp().globalData.app,
			}
		},
		props: {
			commission: {
				type: [String, Boolean],
				default: '0'
			},
			couponPrice: {
				type: [String, Boolean],
				default: '0'
			},
			type: {
				type: [String, Boolean],
				default: 'taobao'
			}
		},
		methods: {
			// 返回首页
			goHome: function(e) {
				uni.navigateToMiniProgram({
					appId: 'wx6b45b7c7a0b3b9fc', //app.json内容
					path: '/pages/index/index',
					extraData: {
						token: uni.getStorageSync('ACCESS_TOKEN'),
						_mchInfo: uni.getStorageSync('_mchInfo')
					},
					envVersion: 'trial',
					success(res) {

					}
				})
			},
			goCar: function() {
				uni.navigateTo({
					url: '/pages/cart/cart',
				})
			},
			goService() {
				uni.navigateTo({
					url: '/member/homePage/homePage',
				})
			},
			copyGoodsLink: utils.throttle(function() {
				this.$emit('copyGoodsLink');
			}),
			to_index() {
				uni.reLaunch({
					url: '/pages/qinUnion/qinUnion',
					fail: res => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.bar-bottom1 {
		background: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 98;
		width: 100%;
		box-shadow: 0 0 3rpx rgba(0, 0, 0, 0.2);
	}

	.bar-bottom {
		height: 110rpx;
		width: 100%;
	}

	.bar-bottom-btn {
		border: none;
		background: #fff;
		font-size: 0;
		line-height: normal;
		padding: 0;
		margin: 0;
		box-shadow: none;
		border-radius: 0;
		position: inherit;
		/* border-left: 1rpx solid #e3e3e3; */
		width: 110rpx;
	}

	.bar-bottom-btn:after {
		display: none;
	}

	.bar-bottom-btn:first-child {
		border-left: none;
	}

	.bar-bottom-btn.button-hover {
		background: rgba(255, 255, 255, 0.85);
	}

	.bar-bottom-btn view {
		text-align: center;
		width: 100%;
	}

	.bar-bottom-btn image {
		width: 56rpx;
		height: 56rpx;
		margin-bottom: 0rpx;
	}

	.bar-bottom-btn text {
		font-size: 8pt;
		color: #888;
		display: block;
	}

	.bar-bottom .add-cart {
		width: 180rpx;
		height: 72rpx;
		background: linear-gradient(-90deg, rgba(255, 55, 80, 1), rgba(255, 112, 6, 1));
		border-radius: 36rpx;
		color: #fff;
	}

	.bar-bottom .buy-now {
		width: 180rpx;
		height: 72rpx;
		background: linear-gradient(-90deg, rgba(255, 197, 0, 1), rgba(255, 153, 2, 1));
		border-radius: 36rpx;
		color: #fff;
	}

	.share-btn {
		width: 180rpx;
		text-align: center;
		height: 78rpx;
		/* background: linear-gradient(-90deg, #FF3750, #FF7006); */
		background: linear-gradient(-90deg, #FF660A, #FF9806);
		border-radius: 38rpx;
		padding: 10rpx 0;
		line-height: 1.35;
		margin-right: 20rpx;
	}

	.buy-btn {
		width: 180rpx;
		text-align: center;
		height: 78rpx;
		/* background: linear-gradient(-90deg, #FFC500, #FF9902); */
		background: linear-gradient(90deg, #FE4001, #EB0301);
		border-radius: 38rpx;
		padding: 10rpx 0;
	}

	.goods-header-icon {
		display: inline-block;
		width: 40rpx !important;
		height: 40rpx;
		border-radius: 50%;
		background: #C10000;
		color: #fff;
		text-align: center !important;
		line-height: 40rpx;
	}
</style>
