<template>
	<view class="discounts" v-if="couponPrice">
		<view hover-class="click1" class="discounts_content flex flex-y-center color-fff" @tap="getDiscount">
			<view class="discounts_num flex flex-y flex-x-center flex-y-center" :style="{'background':'url('+init_img.back_color3+') left top / auto 100%  no-repeat'}">
				<text class="t1">{{couponPrice}}元优惠券</text>
				<text class="t2">有效期 {{couponStartTime}} 至 {{couponEndTime}}</text>
			</view>
			<view class="fs-30 flex-1 text-right">
				立即领取
			</view>
			<view class="iconfont icon-jinru" style="font-size: 42rpx;"></view>
		</view>
	</view>
</template>

<script>
	let utils = require('../../utils/util.js');
	export default {
		data() {
			return {
				filters: require('../../utils/filters.js'),
			}
		},
		props: {
			couponEndTime: '', //结束时间
			couponStartTime: '', //开始时间
			couponPrice: '', //券价
		},
		methods: {
			toSaveGain() {
				uni.navigateTo({
					url: ''
				})
			},
			getDiscount: utils.throttle(function() {
				this.$emit('lingqu');
			})
		}
	}
</script>

<style scoped lang="scss">
	.discounts {
		padding: 18rpx 24rpx 0rpx 24rpx;
		background-color: #FFFFFF;
		width: 100%;
	}

	.discounts_content {
		height: 140rpx;
		border-radius: 8rpx;
		background: linear-gradient(270deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
		padding: 10rpx 18rpx 10rpx 14rpx;


	}

	.discounts_num {
		color: #595959;
		font-size: 36rpx;
		font-weight: bold;
		width: 466rpx;
		height: 116rpx;

		// background-color: #F7E46C;
		.t2 {
			font-weight: normal;
			font-size: 28rpx;
			margin-top: 10rpx;
		}
	}
</style>
