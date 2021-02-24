<template>
	<view class="page">
		<block v-if="true">
			<view class="main-list" v-for="(item,index) in 5" :key="index">
				<view class="fs-30 color-2C2C2C ns-text-bold ns-text-limit">锁定你的顾客资产，20张亲卡这样送</view>

				<view class="ns-text-limit2 fs-28 color-8D8D8D" style="margin-top: 12rpx;">店铺拥有稳定的顾客，是持续稳定经营的关键，不断发展会员，锁定属于自己的顾客资产。</view>

				<view class="flex justify-between mt-20">
					<view class="check-guide">查看指引</view>
					<view class="main-list-btn flex justify-between">
						<view class="fs-24 color-fff">视频讲解</view>
						<view class="iconfont icon-youjiantou-tianchong color-fff fs-24 ml-20"></view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	page {
		background: #F4F4F4;
	}

	.page {
		padding: 30rpx 24rpx;
	}

	.main-list {
		padding: 24rpx;
		padding-bottom: 30rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin-bottom: 20rpx;
	}

	.main-list-btn {
		padding: 0rpx 24rpx;
		height: 48rpx;
		line-height: 48rpx;
		background: linear-gradient(270deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
		box-shadow: 0px 2px 2px 0px rgba(170, 170, 170, 0.5);
		border-radius: 24rpx;
	}
	.check-guide {
		padding: 0 22rpx;
		height: 48rpx;
		line-height: 44rpx;
		text-align: center;
		background: #FFFFFF;
		box-shadow: 0px 2px 2px 0px rgba(170, 170, 170, 0.5);
		border-radius: 5px;
		color: #EB0401;
		font-size: 24rpx;
		border: 2rpx solid #EB0401;
	}
</style>
