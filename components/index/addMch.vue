<template>
	<view class="get-card-modal flex-x-center flex-y-center" v-if="is_show_add_mch && vipLevel < 2 && is_show_add_mch_page">
		<view class="get-card-modal-send pr">
			<view class="get-card-modal-send-title">欢迎来到{{mch.name}}：</view>
			<view class="get-card-modal-send-text" style="margin-top: 38rpx;">

				<view>希望您在我的店铺购物愉快，点击复制下方微信号，添加我的微信，免费赠送您一张会员卡</view>
			</view>
			<view class="get-card-modal-send-info flex align-center">
				<image :src="mch.user.avatar_url" mode="" style="width: 60rpx;height: 60rpx;border-radius: 50%;background: #CCCCCC;"></image>
				<view class="wx-box flex justify-between fs-24 align-center">
					<view>
						<text class="color-999999">微信号：</text>
						<text class="color-333333">{{mch.wechat_name}}</text>
					</view>
				</view>
			</view>
			<view class="get-card-modal-send-btn-full" @click="copyText" :data-text="mch.wechat_name">点击复制微信号</view>
			<view class="get-card-modal-send-btn" @click="closeModel">已添加店主微信</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				vipLevel: '',
				mch: {},
			}
		},
		props: {},
		computed: {
			is_show_add_mch() {
				return this.$store.state.is_show_add_mch
			},
			is_show_add_mch_page() {
				return this.$store.state.is_show_add_mch_page
			},
		},
		mounted() {
			this.getVipCardStatus()
		},
		methods: {
			copyText: function(e) {
				var text = e.currentTarget.dataset.text;
				uni.setClipboardData({
					data: text,

					success(res) {
						uni.getClipboardData({
							success(res) {}

						});
					}

				});
				this.changeShowAddMch()
			},
			changeShowAddMch() {
				this.$store.commit('vuexSet', {
					name: 'is_show_add_mch_page',
					value: false
				})
			},
			// 获取状态
			getVipCardStatus() {
				this.mch = uni.getStorageSync('_mchInfo');
				this.getApp().request({
					url: this.getApp().api.default.vip_card_status,
					success: res => {
						//console.log(res)
						if (res.code == 0) {
							this.vipLevel = res.data.level;
							if(this.vipLevel >= 2) {
								this.$store.commit('vuexSet', {
									name: 'is_show_add_mch_page',
									value: false
								})
							}
						}
					}
				});
			},
			closeModel() {
				this.$store.commit('vuexSet', {
					name: 'is_show_add_mch',
					value: !this.is_show_add_mch
				})
			}
		}
	}
</script>

<style>
	.main {
		position: absolute;
		top: 350rpx;
		width: 100%;
		left: 0rpx;
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

	.get-card-modal-main {
		width: 750rpx;
		height: 728rpx;
	}

	.get-card-modal-send {
		width: 580rpx;
		padding: 52rpx 40rpx 30rpx;
		background: #fff;
		border-radius: 20rpx;
	}

	.get-card-modal-send-title {
		color: #666666;
		font-size: 30rpx;
	}

	.get-card-modal-send-text {
		font-size: 30rpx;
		color: #333333;
		line-height: 46rpx;
		font-weight: 500;
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
		width: 500rpx;
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
		width: 500rpx;
		height: 88rpx;
		line-height: 86rpx;
		border: 1rpx solid #FF401A;
		border-radius: 44rpx;
		font-size: 32rpx;
		color: #FF401A;
		text-align: center;
		margin-top: 30rpx;
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
		text-align: center;
	}

	.jtmoney {
		font-size: 80rpx;
		color: #FFFFFF;
		margin-left: 20rpx;
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
