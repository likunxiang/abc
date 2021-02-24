<template>
	<view class="goods-header">
		<view class="flex justify-between mb-20">
			<view class="flex align-end">
				<view class="fs-30 color-EB0401 ns-text-bold pr">
					￥
					<text class="ns-text-bold" style="font-size: 60rpx;">{{filters.priceStr(goods.m_price?goods.m_price:goods.price)[0]}}.</text>
					<text class="ns-text-bold">{{filters.priceStr(goods.m_price?goods.m_price:goods.price)[1]}}</text>
					<view class="goods-price-label">{{goods.m_price?'会员':'活动'}}</view>
				</view>
				<view class="fs-24 color-8D8D8D " style="margin-left: 47rpx;">
					<view class="" style="margin-bottom: 6rpx;">
						<text>￥</text>
						<text class="">{{goods.price}}</text>
					</view>
					<view class="ns-text-through mb-10">
						<text>￥</text>
						<text class=" ">{{goods.original_price}}</text>
					</view>
				</view>
			</view>
			<block v-if="goods.start_buy == -1 || lestNum <= 0">
			</block>
			<block v-else>
				<view class="" v-if="goods.show_txt">
					<view class="time-hint flex align-center" style="background: linear-gradient(270deg, #429321 0%, #B4EC51 100%);"
					 v-if="goods.start_buy==0">
						<view class="text-center color-fff time-title">
							<view>开始</view>
							<view>时间</view>
						</view>
						<view class="color-fff fs-24 ns-text-bold text-center">{{goods.show_txt}}</view>
					</view>
					<view class="time-hint flex align-center" style="background: linear-gradient(315deg, #EB0301 0%, #F93101 43%, #F16F46 100%);"
					 v-if="goods.start_buy==1">
						<view class="text-center color-fff time-title">
							<view>结束</view>
							<view>时间</view>
						</view>
						<view class="color-fff fs-24 ns-text-bold text-center" style="padding-left: 14rpx;padding-right: 14rpx;">{{goods.show_txt}}</view>
					</view>
				</view>
				<view v-else>
					<view class="time-hint flex align-center" style="background: linear-gradient(315deg, #EB0301 0%, #F93101 43%, #F16F46 100%);">
						<view class="iconfont icon-redu fs-40 mr-16 color-fff" style="padding-left: 23rpx;"></view>
						<view class="color-fff fs-30 text-center" style="margin-top: -4rpx;padding-right: 24rpx;">热卖中</view>
					</view>
				</view>
			</block>

		</view>
		<view class="flex">
			<view class="flex-grow-1 ns-text-limit3 pr">
				<view class="goods-header-icon">
					<view class="iconfont icon-qinpuLOGO"></view>
				</view>
				<view class="goods-header-name" :data-text="goods.name" @longtap="copy">{{goods.name}}</view>
			</view>
			<view class="favorite flex-grow-0" @tap.stop="less(keep_goods)" hover-class="click1">
				<view :class="'iconfont text-center fs-40 ' + (like?'icon-shixinwujiaoxing color-EB0401':'icon-kongxinwujiaoxing')"></view>
				<view class="fs-24 color-2C2C2C text-center">{{like?'已':''}}收藏</view>
			</view>
		</view>
		<view class="goods-header-desc fs-24 color-8D8D8D mt-10" style="padding-right: 14rpx;" v-if="goods.desc">
			{{goods.desc}}
		</view>
		<view class="flex align-center justify-between mt-15">
			<view class="flex flex-grow-1">
				<view class="goods-header-label" :style="'margin-right: 14rpx;background: linear-gradient' + (index == 0?'(146deg, #EB0301 0%, #F93101 72%, #FD3D01 100%)':(index == 1?'(64deg, #1C9BF7 0%, #61FAD2 100%)':'(233deg, #FAD961 0%, #F76B1C 100%)'))"
				 v-for="(item,index) in goods.tags" :key="index" v-if="item">{{item}}</view>
				<!-- <view class="goods-header-label" style="background: linear-gradient(64deg, #1C9BF7 0%, #61FAD2 100%);margin-left: 14rpx;">包邮</view>
				<view class="goods-header-label" style="background: linear-gradient(233deg, #FAD961 0%, #F76B1C 100%);margin-left: 14rpx;">运费险</view> -->
			</view>
			<view class="fs-24 color-8D8D8D flex-grow-0 pr-24">{{goods.tag_desc}}</view>
		</view>
		<view hover-class="none" url="/member/vipFirst/vipFirst?type=1" v-if="!goods.is_normal_member && goods.m_price" class="vip-card mt-30 flex justify-between align-center"
		 :style="'background: url(' + goods.banberImg.c + ') no-repeat;background-size: 702rpx 80rpx;'">
			<view class="fs-30 ns-text-bold" style="color: #F0D0A5;">成为会员，享受会员价格</view>
			<navigator hover-class="none" url="/member/vipFirst/vipFirst?type=1" class="vip-card-btn text-center">9.9元成为会员</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				filters: require('../../utils/filters.js'),
				like: false,
			}
		},
		props: {
			goods: {
				type: Object,
				default: () => {
					return {}
				}
			},
			lestNum: {
				type: String,
				default: '1'
			}
		},
		mounted() {
			this.getApp().request({
				url: this.getApp().api.taoke.find_goods,
				data: {
					goods_id: this.goods.id,
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
			// 复制标题
			copy: function(e) {
				var text = e.currentTarget.dataset.text
				uni.setClipboardData({
					data: text,
					success(res) {
						uni.getClipboardData({
							success(res) {

							}
						})
					}
				})
			},
			//收藏
			keep_goods() {
				if (this.login())
					return;
				this.getApp().request({
					url: this.getApp().api.taoke.keep_goods,
					method: "POST",
					data: {
						status: this.like == true ? 0 : 1,
						origin: 1,
						goods_id: this.goods.id,
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
	.goods-header {
		background: #fff;
		padding-top: 20rpx;
		padding-left: 24rpx;
		padding-bottom: 6rpx;
	}

	.goods-header-name {
		font-size: 30rpx;
		color: #2C2C2C;
		font-weight: bold;
		text-indent: 50rpx;
	}

	.goods-header-icon {
		position: absolute;
		left: 0rpx;
		top: 0rpx;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background: #C10000;
		color: #fff;
		text-align: center;
		line-height: 40rpx;
	}

	.goods-price-label {
		position: absolute;
		right: -20rpx;
		top: 0rpx;
		padding: 0rpx 8rpx;
		height: 30rpx;
		line-height: 30rpx;
		background: linear-gradient(135deg, #3023AE 0%, #C86DD7 100%);
		border-radius: 8rpx;
		font-size: 20rpx;
		font-weight: 400;
		color: #fff;
	}

	.favorite {
		margin-left: 25rpx;
		padding: 0 0rpx 0 15rpx;
		border-left: 1rpx solid #D8D8D8;
		height: 80rpx;
		width: 100rpx;
		white-space: nowrap;
		margin-right: 24rpx;
	}

	.goods-header-label {
		padding: 0 10rpx;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #fff;
		border-radius: 4rpx;
	}

	.time-hint {
		padding: 10rpx 0rpx;
		text-align: center;
		font-size: 24rpx;
		border-radius: 40rpx 0rpx 0rpx 40rpx;
	}

	.time-title {
		padding-left: 23rpx;
		padding-right: 13rpx;
		border-right: 1rpx solid #fff;
		font-size: 24rpx;
		color: #fff;
	}
</style>
