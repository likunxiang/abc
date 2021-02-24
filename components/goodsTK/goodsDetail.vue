<template>
	<view class="main">
		<view class="goods-brand flex">
			<view class="goods-brand-logo-box">
				<image class="goods-brand-logo" src="" mode=""></image>
			</view>
			<view class="ml-24 flex1">
				<view class="flex justify-between align-center">
					<view class="fs-34 color-333333 ns-text-bold">拉面说</view>
					<navigator class="brand-btn" url="/pages/taoList/taoList">全部店铺优惠</navigator>
				</view>
				<view class="mt-10 flex">
					<view class="fs-24 color-999999 mr-10" v-for="(item,index) in evaluateList" :key="index">{{item}}</view>
				</view>
			</view>
		</view>
		<view class="goods-detail">
			<view v-if="is_show_detail">
				<image style="width: 100%;background: #00C584;" src="" mode="scaleToFill"></image>
			</view>
			<goods-detail v-else></goods-detail>
			<view class="fs-24 color-999999 flex-x-center align-center show-switch" @tap="showMoreDetail"><view :class="'iconfont icon-shangshuangjiantou fs-24 ' + (is_show_detail?'show-more-icon-up':'show-more-icon-down') "></view><view>点击{{showText}}更多详情</view></view>
		</view>
	</view>
</template>

<script>
	import goodsDetail from '@/components/goodspic/goodspic.vue'
	export default {
		data() {
			return {
				evaluateList: ['宝贝服务4.8', '卖家服务4.8', '物流服务4.9'],
				is_show_detail: true,
				showText: '展开'
			}
		},
		props: {

		},
		components: {
			goodsDetail
		},
		methods: {
			showMoreDetail() {
				this.is_show_detail = !this.is_show_detail
				this.showText = this.is_show_detail?'展开':'收起'
			},
		}
	}
</script>

<style scoped lang="scss">
	.main {
		background: #fff;

		.goods-brand {
			padding: 24rpx;
			padding-bottom: 30rpx;

			.brand-btn {
				width: 192rpx;
				height: 52rpx;
				line-height: 48rpx;
				text-align: center;
				color: #FF401A;
				font-size: 24rpx;
				border: 2rpx solid #FF401A;
				border-radius: 25rpx;
			}

			.goods-brand-logo-box {
				width: 100rpx;
				height: 100rpx;
				border-radius: 12rpx;
				border: 1rpx solid #D9D9D9;
				overflow: hidden;

				.goods-brand-logo {
					width: 100rpx;
					height: 100rpx;
					background: #007AFF;
				}
			}
		}

		.goods-detail {
			.show-switch {
				padding: 24rpx 0 14rpx;
				.show-more-icon-down {
					transition:transform 500ms;
					transform: rotate(0deg);
				}
				.show-more-icon-up {
					transition:transform 500ms;
					transform: rotate(180deg);
				}
			}
		}

	}
</style>
