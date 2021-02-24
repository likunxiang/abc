<template>
	<view class="main">
		<!-- 店主直接赠送亲卡 -->
		<view class="get-card-modal flex-x-center flex-y-center" v-if="show && max_key == 50">
			<!-- TODO -->
			<view class="get-card-modal-send pr">
				<view class="get-card-modal-send-title">获赠亲卡</view>
				<view class="mch-info flex align-center">
					<image class="flex-grow-0" :src="parent.avatar_url" mode="aspectFill" style="width: 56rpx;height: 56rpx;border-radius: 50%;margin-right: 9rpx;"></image>
					<view class="flex-grow-1 ns-text-limit">{{mch.name}}</view>
				</view>
				<view class="get-card-modal-send-text" style="margin-top: 21rpx;">
					<view >谢谢你来光顾我的店铺，送你一张永久亲卡，使用亲卡购买更优惠~</view>
				</view>
				<view class="flex justify-between">
					<view class="get-card-modal-send-btn" @click="closeModel">残忍拒绝</view>
					<view class="get-card-modal-send-btn-full" @click="receiveCard">立即领取</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				card: {},
				mch: {},
				parent: {},
				show: true
			}
		},
		props: {
			
		},
		mounted() {
			this.checkTips()
		},
		methods: {
			checkTips() {
			
				this.getApp().request({
					url: this.getApp().api.default.tips_send_mem_card,
					data: {},
					success: (res) => {
						if (res.code == 0) {
							this.show = true
							this.$store.commit('add_key', 50);
							this.card = res.data.card
							this.parent = res.data.parent
							this.mch = res.data.mch
						} else {
							// this.showToast(res.msg)
							this.show = false
						}
					}
			
				})
			},
			receiveCard() {
				
				this.getApp().request({
					url: this.getApp().api.default.accept_send_mem_card,
					data: {
						card_id: this.card.id,
						parent_id: this.parent.id
					},
					success: (res) => {
						if (res.code == 0) {
							this.show = false
							this.$store.commit('remove_key', 50);
							uni.navigateTo({
								url: "/member/giveCardreSesult/giveCardreSesult?id=" + this.parent.id
							})
						} else {
							this.showToast(res.msg)
						}
					}
							
				})
			},
			closeModel() {
				this.show = false
				this.$store.commit('remove_key', 50);
				this.getApp().request({
					url: this.getApp().api.default.member_refused_accept,
					data: {
						card_id: this.card.id
					},
					success: (res) => {
						if (res.code == 0) {
							this.checkTips()
						} else {
							this.showToast(res.msg)
						}
					}
							
				})
				
			}
		}
	}
</script>

<style scoped>
	.mch-info {
		margin-top: 32rpx;
		height: 56rpx;
		border-radius: 28rpx;
		overflow: hidden;
	}
	.get-card-modal {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, .7);
		z-index: 10000;
	}
	.get-card-modal-send {
		width: 580rpx;
		padding: 52rpx 40rpx 30rpx;
		background: #fff;
		border-radius: 20rpx;
	}
	.get-card-modal-send-title {
		color: #333333;
		font-size: 44rpx;
		font-weight: bold;
		text-align: center;
	}
	.get-card-modal-send-text {
		font-size: 30rpx;
		color: #333333;
		line-height: 46rpx;
	}
	.get-card-modal-send-info {
		margin-top: 38rpx;
	}
	.wx-box {
		width: 408rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin-left: 17rpx;
		background: #F4F4F4;
		border-radius: 30rpx;
		padding: 0 24rpx;
	}
	.get-card-modal-send-btn-full {
		width: 234rpx;
		height: 88rpx;
		line-height: 88rpx;
		background: #FF401A;
		box-shadow: 0px 7rpx 16rpx 0px rgba(255, 69, 32, 0.55);
		border-radius: 44rpx;
		font-size: 32rpx;
		color: #ffffff;
		text-align: center;
		margin-top: 30rpx;
	}
	.get-card-modal-send-btn {
		width: 234rpx;
		height: 88rpx;
		line-height: 86rpx;
		border: 1rpx solid #FF401A;
		border-radius: 44rpx;
		font-size: 32rpx;
		color: #FF401A;
		text-align: center;
		margin-top: 30rpx;
	}
</style>
