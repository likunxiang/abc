<template>
	<view>
		<!-- <view v-if="status==0" class="get-card-modal flex-x-center flex-y-center ns-column">
			<view class="get-card-modal-main pr" :style="'background: url(' + bg_red_bag + ') no-repeat;background-size: 100% 100%;'">
				<view class="pa fs-30 text-center color-fff" style="top: 370rpx;left:0rpx;width: 100%;line-height: 46rpx;">
					<view class="">恭喜你，获得店主福利</view>
					<view class="fs-30">快打开看看吧</view>
				</view>
				<view class="get-card-modal-btn" @tap="openRed">打开红包</view>
			</view>
		</view> -->
		<!-- 店主帮忙开了红包 -->
		<!-- <view v-if="status==2" class="get-card-modal flex-x-center flex-y-center ns-column">
			<view class="get-card-modal-main pr" :style="'background: url(' + bg_red_bag + ') no-repeat;background-size: 100% 100%;'">
				<view class="pa" style="top: 350rpx;left:220rpx;">
					<view class="congratulation">恭喜您，店主帮你开启了</view>
					<view class="flex-x-center">
						<view class="jtmoney">{{dataInfo.subsidy}}</view>
						<view class="fs-36 color-fff" style="margin-top: 40rpx;margin-left: 10rpx;">元</view>
					</view>
					<view class="commonstyle flex">
						<view class="fs-24">已存入津贴，可下单时抵扣</view>
					</view>
				</view>
				<view class="fs-24 text-center color-fff red-bag-tips">注：奖励津贴需要商品过了售后期才可使用</view>
				<view class="get-card-modal-btn" @click="closeModelAndJump">查看津贴</view>
			</view>
			<view class="iconfont icon-guanbi color-999999" style="font-size: 60rpx;margin-top: 49rpx;" @click="closeModel"></view>
		</view> -->
		<!-- 自己开了，待店主开 -->
		<view v-if="status==0" class="get-card-modal flex-x-center flex-y-center ns-column">
			<view class="get-card-modal-main pr" :style="'background: url(' + bg_red_bag + ') no-repeat;background-size: 100% 100%;'">
				<view class="pa" style="top: 350rpx;left:0rpx;width: 100%;">
					<view class="flex-x-center">
						<view class="jtmoney">{{dataInfo.subsidy}}</view>
						<view class="fs-36 color-fff" style="margin-top: 40rpx;margin-left: 10rpx;">元</view>
					</view>
				</view>
				<view class="fs-24 text-center color-fff red-bag-tips">将福利链接转发给店主，邀请店主帮忙开启</view>
				<view class="get-card-modal-btn" @click="toMchMean">领取</view>
			</view>
			<view class="iconfont icon-guanbi color-999999" style="font-size: 60rpx;margin-top: 49rpx;" @click="closeModel"></view>
		</view>
		<!-- 店主直接开 -->
		<view v-if="status==1" class="get-card-modal flex-x-center flex-y-center ns-column">
			<view class="get-card-modal-main pr" :style="'background: url(' + bg_red_bag + ') no-repeat;background-size: 100% 100%;'">
				<view class="pa" style="top: 330rpx;left:0rpx;width: 100%;">
					<view class="flex-x-center">
						<view class="jtmoney">{{dataInfo.subsidy}}</view>
						<view class="fs-36 color-fff" style="margin-top: 40rpx;margin-left: 10rpx;">元</view>
					</view>
					<view class="commonstyle flex-x-center" style="margin-top: 16rpx;">
						<view class="fs-24">已存入津贴，可下单时抵扣</view>
						<!-- <view class="iconfont icon-jinru"></view> -->
					</view>
				</view>
				<view class="fs-24 text-center color-fff red-bag-tips" style="top: 500rpx;">
					<view>奖励规则：奖励津贴需要商品过了售后期</view>
					<view>才可使用，当商品发生售后时，奖励将被退回</view>
				</view>
				<view class="get-card-modal-btn" @click="closeModelAndJump">查看津贴</view>
			</view>
			<view class="iconfont icon-guanbi color-999999" style="font-size: 60rpx;margin-top: 49rpx;" @click="closeModel"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				open: false,
				bg_red_bag: uni.getStorageSync('_img').bg_red_bag
			}
		},
		props: {
			status: {
				type: String,
				default: '-1'
			},
			dataInfo: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		methods: {
			closeModel() {
				this.$emit('closeModel')
			},
			closeModelAndJump() {
				this.$emit('closeModel')
				uni.navigateTo({
					url: '/member/allowance/allowance'
				})
			},
			openRed() {
				this.open = true
			},
			toMchMean() {
				this.$emit('closeModel')
				uni.navigateTo({
					url: '/member/mchMean/mchMean?id=' + this.dataInfo.rel_id + '&subsidy=' + this.dataInfo.subsidy
				})
			}
		}
	}
</script>

<style scoped>
	.get-card-modal {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, .7);
		z-index: 10000;
	}

	.get-card-modal-main {
		width: 750rpx;
		height: 728rpx;
	}

	.get-card-modal-text {
		font-size: 38rpx;
		color: #B86A24;
		margin-top: 48rpx;
	}

	.get-card-modal-btn {
		position: absolute;
		bottom: 71rpx;
		left: 50%;
		margin-left: -165rpx;
		width: 332rpx;
		height: 72rpx;
		background: linear-gradient(0deg, #FFC600, #FFF945);
		border-radius: 34rpx;
		box-shadow: 0px 8rpx 0px 0px rgba(255, 148, 8, 0.8);
		text-align: center;
		line-height: 68rpx;
		font-weight: 600;
		font-size: 36rpx;
		color: #FF2120;
	}

	.detail-btn {
		width: 450rpx;
		height: 90rpx;
		background: linear-gradient(-90deg, #FF5200, #FF880C);
		border-radius: 45rpx;
		line-height: 90rpx;
		margin: 0 auto;
	}

	.congratulation {
		font-size: 30rpx;
		font-weight: 600;
		color: #FFFFFF;
	}

	.jtmoney {
		font-size: 80rpx;
		color: #FFFFFF;
		margin-left: 20rpx;
		font-weight: bold;
	}

	.red-bag-tips {
		position: absolute;
		top: 540rpx;
		width: 100%;
		left: 0;
	}

	.commonstyle {
		color: #FFF53E;
	}
</style>
