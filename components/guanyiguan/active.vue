<template>
	<view class="main">
		<!-- 品牌名字 -->
		<view class="pr" style="padding: 25rpx 16rpx;">
			<!-- 有店主福利时，显示 -->
			<!-- <image class="welfare" v-if="item.coupon_count>0" :src="logo_mch_welfare" mode="aspectFit"></image> -->
			<navigator :url="'/pages/activity/activity?aid=' + (item.out_id || item.id)" class="flex ns-justify-content-space-between align-center"
			 hover-class="none">
				<view class="flex align-center" style="width: 65%;">
					<image class="flex-grow-0" lazy-load="true" style="width: 100rpx;height: 100rpx;border-radius: 20rpx;border: 2rpx solid #F4F4F4;"
					 mode="aspectFit" :src="item.activity_banner || item.banner"></image>
					<view class="ml-30 ns-text-limit" style="width: 260rpx;">
						<view class="fs-30 color-333333 ns-text-limit">{{item.activity_name || item.name}}</view>
						<view class="fs-24 color-999999 ns-text-limit mt-10" v-if="item.activity_data.goods_sum || item.goods_sum">共{{item.activity_data.goods_sum || item.goods_sum}}款，全场¥<text class="color-FF0200">{{item.activity_data.min_price || item.min_price}}</text>起</view>
					</view>
				</view>
				<view class>
					<view class="flex justify-end " style>
						<navigator :url="'/member/topic/topic?ht_id=' + item.ht_id + '&id=' + item.id" class="material-icon align-center flex-x-center mr-20"
						 v-if="item.ht_id > 0" @tap.stop="stop">
							<text class="fs-24">好物说</text>
						</navigator>
						<view class="mr-16" v-if="item.coupon_count>0">
							<moveBox :picture="logo_gift"></moveBox>
						</view>
						<view class="flex align-center" style="width: 100rpx;height: 56rpx;background: #F23005;border-radius: 28rpx;text-align:center;font-size:24rpx;color:#fff;line-height:60rpx;justify-content: center;">
							<view style="margin-right: -6rpx;">进入</view>
							<view class="iconfont icon-jinru color-fff text-center fs-36" style="color: #fff;margin-right: -12rpx;margin-top: 2rpx;"></view>
						</view>
					</view>
				</view>

			</navigator>
		</view>
		<!-- 品牌商品 -->
		<view class="flex " style="padding: 0rpx 16rpx 20rpx; ">
			<scroll-view scroll-x="true">
				<view class="flex">
					<navigator v-for="(goods, index) in goodsList" :key="index" :url="'/pages/goods/goods?id=' + goods.good_id"
					 style="width: 216rpx;margin-right: 11rpx;" :data-id="goods.good_id">
						<view style="position: relative;width: 216rpx;height: 216rpx;">
							<image lazy-load="true" mode="aspectFill" :src="goods.first_cover_pic" style="background: #ccc;width: 216rpx;height: 216rpx;position: relative;border-radius: 20rpx;"></image>
							<view class="sell-up " v-if="goods.goods_num==0">
								<view>已抢光</view>
								<view class="line"></view>
								<view style="font-size: 17rpx;">sold out</view>
							</view>
						</view>
						<view class="text-more-1 fs-24 color-333333 mt-16">{{goods.name}}</view>
						<view class="clear miaosha_price  flex align-center" style="font-size:26rpx;margin-top: 8rpx;">
							<!-- <view class="qiang-tips">抢</view> -->
							<view class="fs-20 color-FF0200 ns-text-bold">￥<text class="fs-28">{{filters.priceStr(goods.price)[0]}}.</text><text>{{filters.priceStr(goods.price)[1]}}</text></view>
						</view>
						
					</navigator>

				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	import moveBox from '@/components/common/moveBox.vue'
	export default {
		data() {
			return {
				filters: require('../../utils/filters.js'),
				logo_mch_welfare: uni.getStorageSync('_img').logo_mch_welfare,
				logo_gift: uni.getStorageSync('_img').logo_gift
			}
		},
		props: {
			item: {
				type: Object,
				default: function() {
					return {}
				}
			},
			goodsList: {
				type: Array,
				default: function() {
					return {}
				}
			}
		},
		components: {
			moveBox
		},
		methods: {

		}
	}
</script>

<style scoped>
	.text-more-1 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.welfare {
		position: absolute;
		left: -15rpx;
		top: -13rpx;
		width: 123rpx;
		height: 123rpx;
		z-index: 1;
	}
	.material-icon {
		height: 56rpx;
		border: 1rpx solid #F23005;
		border-radius: 28rpx;
		line-height: 54rpx;
		font-size: 24rpx;
		color: #F23005;
		padding: 0 16rpx;
	}
	.sell-up {
		width: 113rpx;
		height: 113rpx;
		border-radius: 50%;
		background: rgba(38, 38, 38, 0.45);
		position: absolute;
		left: 44rpx;
		top: 43rpx;
		padding: 24rpx 0;
		text-align: center;
		font-size: 22rpx;
		color: #fff;
	}
	.line {
		width: 67rpx;
		height: 2rpx;
		background: #fff;
		margin: 4rpx auto;
	}
</style>
