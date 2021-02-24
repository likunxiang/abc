<template>
	<view>
		<!-- <view class="get-card-modal flex-x-center flex-y-center ns-column" v-if="is_show_model && card_bg">
			<view class="get-card-modal-main pr" :style="'background: url(' + card_bg + ') no-repeat;background-size: 100% 100%;'">
				<view class="color-fff flex-x-center" style="font-size: 45rpx;">赚取津贴</view>
				<view class="time-top-text fs-24 color-fff" style="margin-top: 75rpx;">
					<view>邀请好友成为会员，让好友享受到亲卡的会员价</view>
					<view style="margin-top: 49rpx;">好友成功办理会员之后，您将有机会获得津贴奖励</view>
				</view>
				<button class="get-card-modal-btn" open-type="share" data-type="share_vip" @tap="closeModalVip">立即分享</button>
			</view>
			<view class="iconfont icon-guanbi color-999999" style="font-size: 60rpx;margin-top: 70rpx;" @tap="closeModalVip"></view>
		</view> -->
		<view class="get-card-modal flex-x-center flex-y-center ns-column" v-if="is_show_model">
			<view class="get-card-modal-main-member pr">
				<view class="color-333333 flex-x-center ns-text-bold" style="font-size: 44rpx;">赚取津贴</view>
				<view class="time-top-text fs-30 color-333333" style="margin-top: 46rpx;">
					<view>1.邀请好友成为会员，让好友享受到亲卡的会员价</view>
					<view style="margin-top: 62rpx;">2.好友成功办理会员之后，您将有机会获得10元津贴</view>
				</view>
				<button class="get-card-modal-btn-member" open-type="share" data-type="share_vip" @tap="closeModalVip">立即分享</button>
			</view>
			<view class="iconfont icon-guanbi color-999999" style="font-size: 60rpx;margin-top: 70rpx;" @tap="closeModalVip"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {is_show_model:Boolean,card_bg:String},
		data() {
			return {
				
			}
		},
		methods: {
			closeModalVip() {
			   this.$emit('closeVipModel');
			},
		}
	}
</script>

<style>
	.get-card-modal {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0,0,0,.7);
		z-index: 10000;
	}
	.get-card-modal-main-member {
		width: 580rpx;
		padding: 52rpx 40rpx 30rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
	}
	.get-card-modal-text {
		font-size: 38rpx;
		color: #B86A24;
		margin-top: 48rpx;
	}
	.get-card-modal-btn-member {
		width: 500rpx;
		height: 88rpx;
		background: #FF401A;
		box-shadow: 0px 7px 16px 0px rgba(255, 69, 32, 0.55);
		border-radius: 44rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 32rpx;
		color: #fff;
		margin-top: 72rpx;
	}
</style>
