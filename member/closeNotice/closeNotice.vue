<template>
	<view class="page">
		<custom mode="2" background="#E1122C" fixed="fixed" title="关店须知" titleColor="#FFFFFF">
		</custom>
		<view class="plr-24">
			<view class="main" style="height: calc(100vh - 340rpx);">
				<view class="main-main pr">
					<view class="text-E1122C ns-text-bold">{{close_mch_text.title.one}}</view>
					<view style="margin-top: 37rpx;line-height: 60rpx;">
						<view class="text-E1122C">{{close_mch_text.one}}</view>
						<view class="text-E1122C">{{close_mch_text.two}}</view>
					</view>
					
					<view class="text-E1122C ns-text-bold" style="margin-top: 95rpx;">{{close_mch_text.title.two}}</view>
					<view style="margin-top: 34rpx;line-height: 60rpx;">
						<view class="text-E1122C">{{close_mch_text.three}}</view>
						<view class="text-E1122C">{{close_mch_text.four}}</view>
						<view class="text-E1122C">{{close_mch_text.five}}</view>
						<view class="text-E1122C">{{close_mch_text.six}}</view>
						<view class="text-E1122C">{{close_mch_text.seven}}</view>
					</view>
					
					<navigator url="/member/openshop/openshop" class="open-shop-btn">
						<text>申请开店</text>
						<text class="iconfont icon-sanjiaoxing1 fs-24 ml-10"></text>
					</navigator>
				</view>
			</view>
		</view>
		<navigator open-type="navigateBack" class="footer">我知道了</navigator>
	</view>
</template>

<script>
	import custom from '@/components/custom/custom.vue'
	export default {
		data() {
			return {
				close_mch_text: {}
			}
		},
		components: {
			custom
		},
		onLoad() {
			this.getText()
		},
		methods: {
			getText() {
				this.getApp().request({
					url: this.getApp().api.user.mch_desc_text,
					data: {
					},
					success: res => {
						if (res.code == 0) {
							this.close_mch_text = res.data.close_mch
						} else {
							uni.showModal({
								title: res.msg,
								showCancel: false
							});
						}
					}
				});
			},
		}
	}
</script>

<style>
	.page {
		min-height: 100%;
		background: #E1122C;
	}

	.main {
		width: 100%;
		padding: 12rpx 10rpx 28rpx 10rpx;
		background: #FEE1B2;
		border-radius: 30rpx;
		margin-top: 24rpx;
	}

	.main-main {
		width: 681rpx;
		height: 100%;
		background: #FFFFFF;
		border-radius: 30px;
		padding: 56rpx 32rpx 37rpx;
		box-shadow: 0rpx 0rpx 10rpx 5rpx #FEE1B2 inset;
	}

	.text-E1122C {
		color: #E1122C;
		font-size: 28rpx;
	}

	.footer {
		position: absolute;
		bottom: 33rpx;
		left: 24rpx;
		width: 702rpx;
		height: 90rpx;
		line-height: 90rpx;
		color: #fff;
		font-size: 30rpx;
		text-align: center;
		background: #F95433;
		border-radius: 45rpx;
	}
	.open-shop-btn {
		position: absolute;
		bottom: 59rpx;
		left: 190rpx;
		width: 302rpx;
		height: 90rpx;
		line-height: 86rpx;
		border: 2rpx solid #F95433;
		border-radius: 44rpx;
		text-align: center;
		font-size: 30rpx;
		color: #F95433;
	}
</style>
