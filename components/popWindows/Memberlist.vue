<template>
	<view v-if="max_key == 49">
		<!-- 气球 -->
		<vipListLay v-if="status==1 && type==6" :lay_pic="lay_pic" page_type="index" :msg="red_bag_info.msg"></vipListLay>
		<!-- 店主直接赠送亲卡 -->
		<view class="get-card-modal flex-x-center flex-y-center" v-else-if="status==1 && type==7">
			<!-- TODO -->
			<view class="get-card-modal-send pr">
				<view class="get-card-modal-send-title">获得一张永久会员卡</view>
				<view class="get-card-modal-send-text" style="margin-top: 46rpx;">
					
					<view >谢谢您关注我的店铺，送你一张亲卡使用亲卡购买商品更便宜</view>
					<view style="margin-top: 29rpx;">复制下方微信号，加一下我为好友，让我为您提供更多专属服务</view>
					<view class="text-right" style="margin-top: 36rpx;">店铺：{{mch_name}}</view>
				</view>
				<view class="get-card-modal-send-info flex align-center">
					<image :src="avatar_url" mode="" style="width: 60rpx;height: 60rpx;border-radius: 50%;background: #CCCCCC;"></image>
					<view class="wx-box flex justify-between fs-24 align-center">
						<view>
							<text class="color-999999">微信号：</text>
							<text class="color-333333">{{wechat_name}}</text>
						</view>
						<view class="color-FF401A" @click="copyText" :data-text="wechat_name">复制</view>
					</view>
				</view>
				<view class="get-card-modal-send-btn-full" @click="closeModel">复制完成，添加好友</view>
				<!-- <view class="get-card-modal-send-btn" @click="closeModel">残忍拒绝</view> -->
			</view>
		</view>
		<!-- 店主帮忙开了红包 -->
		<view v-else-if="status == 1" class="get-card-modal flex-x-center flex-y-center ns-column">
			<view class="get-card-modal-main pr" :style="'background: url(' + bg_red_bag + ') no-repeat;background-size: 100% 100%;'">
				<view class="main">
					<view class="congratulation">{{red_bag_info.msg}}</view>
					<view class="flex-x-center">
						<view class="jtmoney">{{red_bag_info.subsidy}}</view>
						<view class="fs-36 color-fff" style="margin-top: 40rpx;margin-left: 10rpx;">元</view>
					</view>
					<!-- <view class="commonstyle flex">
						<view class="fs-24">已存入津贴，可下单时抵扣</view>
					</view> -->
				</view>
				<view class="fs-24 text-center color-fff red-bag-tips">已存入津贴点击查看详情～</view>
				<view class="get-card-modal-btn" @click="closeModelAndJump">查看津贴</view>
			</view>
			<view class="iconfont icon-guanbi color-999999" style="font-size: 60rpx;margin-top: 49rpx;" @click="closeModel"></view>
		</view>
	</view>
</template>

<script>
	import vipListLay from "@/components/vipList/vipListLay.vue"
	export default {
		props: {
			is_show_model: Boolean,
			card_bg: String
		},
		data() {
			return {
				red_bag_info: {},
				status: '0',
				bg_red_bag: uni.getStorageSync('_img').bg_red_bag,
				type: '0',   // type == 6时显示那个球
				lay_pic: '',
				wechat_name: '',
				avatar_url: '',
				mch_name: ''
			}
		},
		mounted() {
			this.checkTips()
		},
		components: {
			vipListLay
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
			},
			//检测恭喜你或者是太可惜的提示
			checkTips() {
				// 	if (uni.setStorageSync('member_tips')) {
				// 		return
				// 	}

				this.getApp().request({
					url: this.getApp().api.LockPowder.check_tips,
					data: {
						userId: uni.getStorageSync('USER_INFO').id,
					},
					success: (res) => {
						if (res.code == 0) {
							////////  vuex赋值

							this.$store.commit('vuexSet', {
								name: 'check_mch_wait_sub',
								value: res.check_mch_wait_sub
							})
							if (res.sub_msg.status == 1) {
								this.$store.commit('add_key', 49);
							}
							

							if (res.sub_msg.status == 1 && res.sub_msg.data.type != 6) {
								this.status = res.sub_msg.status
								this.red_bag_info = res.sub_msg.data
							}
							if (res.sub_msg.status == 1 && res.sub_msg.data.type == 6) {
								this.status = res.sub_msg.status
								this.type = res.sub_msg.data.type
								this.lay_pic = res.gift_bag
								this.red_bag_info = res.sub_msg.data
							}
							if (res.sub_msg.status == 1 && res.sub_msg.data.type == 7) {
								// TODO
								this.status = res.sub_msg.status
								this.type = res.sub_msg.data.type
								this.wechat_name = res.sub_msg.data.mch.wechat_name
								this.avatar_url = res.sub_msg.data.user.avatar_url
								this.mch_name = res.sub_msg.data.mch.name
							}

						}
					}

				})
			},
			closeModel() {
				this.status = 0
				this.$store.commit('remove_key', 49);
			},
			closeModelAndJump() {
				this.status = 0
				this.$store.commit('remove_key', 49);
				uni.navigateTo({
					url: '/member/allowance/allowance'
				})
			},
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
