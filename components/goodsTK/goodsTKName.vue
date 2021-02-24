<template>
	<view class="pr">
		<view class="goods-price-box flex align-end">
			<view class="fs-30 color-FF0200 ns-text-bold pr">￥<text style="font-size: 60rpx;">{{filters.priceStr(xs(actualPrice,2))[0] || '0'}}.</text><text>{{filters.priceStr(xs(actualPrice,2))[1] || '0'}}</text>
				<text class="quan_after">券后</text>
			</view>
			<view class="ns-text-through fs-30 color-999999 ml-30" style="opacity: 0.6;margin-bottom: 8rpx;text-decoration: none;margin-left: 40rpx;color: #595959;">
				<text>{{type1 == 'taobao' ? '原' : '京东'}}价￥</text>
				<text class="ns-text-bold">{{xs(originalPrice,2)|| '0.00'}}</text>
			</view>
			<!-- <view class="fs-24 flex-1 flex flex-y-center flex-x-end" style="padding-bottom: 10rpx;color: #F23005;">
				<text @click="xiazai" class="iconfont icon-xiazai1"></text><text @click="xiazai">下载</text>
			</view> -->
			<view class="fs-24 flex-1 flex flex-y-center flex-x-end" style="padding-bottom: 10rpx;color: #8D8D8D">
				月销{{haoping || '0'}}
			</view>
		</view>
		<!-- <view class="goods-title-box">
			<view class="ns-text-limit2 fs-30 color-333333 ns-text-bold text-left" style="width: 100%;">
				<text v-if="type1 == 'taobao'" class="iconfont icon-tao  tao-icon"></text>
				<text v-else class="iconfont icon-jingdong1  tao-icon"></text>{{title}}</view>
		</view> -->
		<view class="flex pl-24" style="background-color: #FFFFFF;">
			<view class="flex-grow-1 ns-text-limit3 pr" style="padding-right: 24rpx;">
				<!-- <text  class="iconfont icon-tao  tao-icon myicon"></text> -->
				<image v-if="type1 == 'taobao'" :src="init_img.qinpu_m" class="tao-icon myicon" mode="" style="width: 40rpx;height: 40rpx;display: inline-block;"></image>
				<text v-else class="iconfont icon-jingdong1  tao-icon myicon"></text>
				<view class="goods-header-name" @longtap="mycopy(title)">{{title}}</view>
			</view>
			<view v-if="app=='qinpu'" class="favorite flex-grow-0" @tap.stop="less(keep_goods)" hover-class="click1">
				<view :class="'iconfont text-center fs-40 ' + (like?'icon-shixinwujiaoxing color-EB0401':'icon-kongxinwujiaoxing')"></view>
				<view class="fs-24 color-2C2C2C text-center">{{like?'已':''}}收藏</view>
			</view>
		</view>
		<!-- 轮播图上的按钮 -->
		<view @tap="showShareModal" class='pa share_btn_img' v-show="false">
			<text class="iconfont icon-show_fenxiang" style="font-size: 30rpx;"></text>
		</view>

		<!-- 卖点 -->
		<view class="text-hidden" style="line-height: 40rpx;color:#8D8D8D;font-size: 24rpx;padding:0 24rpx;background-color: #FFFFFF;padding-bottom: 8rpx;">
			{{desc || ''}}
		</view>
		<!-- 品牌标签 -->
		<view class="flex flex-y-center  fs-20 color-fff text-hidden pl-24 pr-24" style="background-color: #FFFFFF;">
			<!-- 自营 -->
			<text class="ziying mr-10 " v-if="shop_labels && shop_labels.self_market">{{shop_labels.self_market}}</text>
			<!-- 京东国际 -->
			<text class="guoji mr-10 " v-if="shop_labels && shop_labels.jd_national">{{shop_labels.jd_national}}</text>
			<!-- 京东好店 -->
			<text class="haodian mr-10" v-if="shop_labels && shop_labels.jd_good_shop">{{shop_labels.jd_good_shop}}</text>
			<text class="text-hidden flex-1" style="color: #8D8D8D;text-align: right;">{{shopName || ''}}</text>
		</view>
	</view>
</template>

<script>
	let utils = require('../../utils/util.js');
	export default {
		name: 'goodsName',
		props: {
			goods: {
				type: Object,
				default: () => {
					return {}
				}
			},
			shop_labels: {
				type: Object,
				default: () => {
					return {}
				}
			},
			type1: {
				type: String,
				default: 'taobao'
			},
			title: '',
			originalPrice: '',
			actualPrice: '',
			desc: '',
			haoping: '',
			shopName: '',
			goods_id: '',
		},
		data() {
			return {
				filters: require('../../utils/filters.js'),
				share_modal_active: "",
				like: false,
				app:getApp().globalData.app,
			}
		},
		mounted() {
			this.getApp().request({
				url: this.getApp().api.taoke.find_goods,
				data: {
					goods_id: this.goods_id,
				},
				success: res => {
					if (res.code == 0) {
						if (res.data.status == 1) {
							this.like = true;
						}
					}
				}
			})
		},
		methods: {
			showShareModal() {
				console.log(222);
				this.$emit('showModel')
			},
			xiazai: utils.throttle(function() {

				this.$emit('xiazai');

			}),
			//收藏
			keep_goods() {
				if (this.login())
					return;
				this.getApp().request({
					url: this.getApp().api.taoke.keep_goods,
					method: "POST",
					data: {
						status: this.like == true ? 0 : 1,
						origin: this.type1 == 'taobao' ? 2 : 3,
						goods_id: this.goods_id,
					},
					success: res => {
						if (res.code == 0) {
							this.like = !this.like;
						} else if (res.code == 1) {
							this.showToast(res.msg);
							if (res.msg == '请先登录') {
								this.timeOut(() => {
									uni.setStorageSync('ACCESS_TOKEN', '');
									this.$store.commit('vuexSet', {
										name: 'show_loginTpl',
										value: true
									}); //未登录
								}, 400)
							}
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.goods-price-box {
		padding: 24rpx 32rpx 10rpx 32rpx;
		background: #fff;
	}

	.goods-title-box {
		padding: 0 24rpx 27rpx;
		background: #fff;
	}

	.tao-icon {
		color: #FF5200;
		font-weight: 400;
		font-size: 36rpx;
		display: inline-block;
		margin-right: 8rpx;
	}

	.share_btn_img {
		top: -300rpx;
		right: 30rpx;
		width: 57rpx;
		height: 57rpx;
		background: rgba(0, 0, 0, 0.3);
		text-align: center;
		line-height: 57rpx;
		color: #fff;
		z-index: 999;
		border-radius: 50%;
	}

	.goods-header-name {
		font-size: 30rpx;
		color: #2C2C2C;
		font-weight: bold;
		text-indent: 50rpx;
	}

	.favorite {
		padding: 0 0rpx 0 15rpx;
		border-left: 1rpx solid #D8D8D8;
		height: 80rpx;
		width: 100rpx;
		white-space: nowrap;
		margin-right: 24rpx;
	}

	.myicon {
		position: absolute;
		left: 0;
		top: 0;
	}

	.quan_after {
		position: absolute;
		width: 56rpx;
		height: 30rpx;
		line-height: 30rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 20rpx;
		border-radius: 8rpx;
		background: linear-gradient(270deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
		top: 0rpx;
		right: -20rpx;
		z-index: 3;

	}

	.ziying {
		padding: 0 5rpx;
		border-radius: 4rpx;
		color: #FFFFFF;
		font-size: 20rpx;
		line-height: 30rpx;
		background: linear-gradient(146deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
	}

	.guoji {
		padding: 0 5rpx;
		border-radius: 4rpx;
		color: #FFFFFF;
		font-size: 20rpx;
		line-height: 30rpx;
		background: linear-gradient(135deg, #3023AE 0%, #C86DD7 100%);
	}

	.haodian {
		padding: 0 5rpx;
		border-radius: 4rpx;
		color: #8F7DDF;
		font-size: 20rpx;
		line-height: 28rpx;
		border: 1rpx solid #8F7DDF;
	}
</style>
