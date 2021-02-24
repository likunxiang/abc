<template>
	<view class="page">
		<view class="con flex justify-between align-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
			<view class="backBtn" @tap="returnPage">
				<text class="iconfont icon-zuojiantoubeifen"></text>
			</view>
			<view class="fs-36 color-fff">津贴奖励</view>
			<view></view>
		</view>
		<view class="pr context" :style="'top:'+ customBar +'px'">
			<image class="mch-mean-bg" :src="bg_mch_mean" mode="widthFix" ></image>
			<view class="subsidy flex-x-center align-center">
				<view style="font-size: 120rpx;">{{subsidy?subsidy:'0'}}</view>
				<view style="font-size: 60rpx;margin-bottom: -28rpx;margin-left: 10rpx;">元</view>
			</view>
			<view class="share-button-box">
				<view class="share-button-text">感谢您对店铺的支持，送您{{subsidy?subsidy:'0'}}元津贴奖励请添加店主好友领取吧～</view>
				<button open-type="share" class="share-button fs-30 color-fff">已添加店主好友，直接转发</button>
			</view>
			
			<view class="show-wx flex">
				<image class="mch-pic" :src="avatar_url" mode="aspectFit"></image>
				<view class="wx-box flex justify-between align-center">
					<view class="fs-24 color-000000">
						<text>微信号：</text>
						<text>{{wechat_name}}</text>
					</view>
					<view class="fs-24" style="color: #FF2B49;" @tap="copyText" :data-text="wechat_name">复制</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				wechat_name:'',
				subsidy: '',
				avatar_url: '',
				bg_mch_mean: uni.getStorageSync('_img').bg_mch_mean,
				pic_mch_mean: uni.getStorageSync('_img').pic_open_award,
				red_id: '',
				mchID: '',
				ipx: uni.getStorageSync('jianrong') || '',
			}
		},
		onLoad(options) {
			this.red_id = options.id
			if (options.mchID) {
				this.mchID = options.mchID
			}
			this.getSuperiorInfo()
			this.receiveRed()
		},
		methods: {
			getSuperiorInfo() {
			  this.getApp().request({
			    url: this.getApp().api.default.get_superior_info,
			    data: {
			      userId: this.getApp().core.getStorageSync('USER_INFO').id,
				  coupon_sub_id: this.mchID || ''
			    },
			    success: res => {
			      if (res.code == 0) {
			        this.setData(res.data);
			      } else {
			        uni.showModal({
			          title: res.msg,
			          showCancel: false
			        });
			      }
			    }
			  });
			},
			receiveRed() {
				this.getApp().request({
					url: this.getApp().api.coupon.receive_red_bag,
					data: {
						userId: uni.getStorageSync('USER_INFO').id,
						id: this.red_id,
					},
					success: (res) => {
						if(res.code == 0) {
							this.redData = res.data.data
							this.subsidy = res.data.data.subsidy
							this.redStatus = res.data.status  //未传accept 情况下是查看，返回 0用户查看待开红包查看成功 1店主查看自己的红包成功 2无法查看 领取情况下，返回 status 10领取成功 11无法领取
						}
					}
				})
			},
			returnPage() {
			  uni.navigateBack({
			    delta: 1,
			    fail: res => {
			      uni.redirectTo({
			        url: '/pages/index/index'
			      });
			    }
			  });
			},
			copyText: function(e) {
				var text = e.currentTarget.dataset.text;
				uni.setClipboardData({
					data: text,

					success(res) {
						uni.getClipboardData({
							success(res) {
							}

						});
					}

				});
			},
		},
		onShareAppMessage() {
			// TODO
			var username = this.getApp().core.getStorageSync('USER_INFO').nickname;
			var nickname = this.getApp().core.getStorageSync('_mchInfo').name;
			let title = nickname+' 动动你的小手指帮我开启下单奖励吧～'
			let img = this.pic_mch_mean
			let mch_id = uni.getStorageSync('_mchInfo').id;
			let user_id = this.getApp().core.getStorageSync('USER_INFO').id;
			var path = '/member/openAward/openAward?mch_id=' + mch_id + '&user_id=' + user_id + '&id=' + this.red_id
			return {
				title: title,
				path: '/member/openAward/openAward?mch_id=' + mch_id + '&user_id=' + user_id + '&id=' + this.red_id + '&username=' + username,
				imageUrl: img
			};
		}
	}
</script>

<style>
	.page {
		height: 100%;
		width: 100%;
		background: #F23005;
	}
	.context {
		width: 100%;
	}
	.mch-mean-bg {
		position: absolute;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
	}

	.con {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 1;
		display: flex;
		padding: 0 24rpx;
		background: #F23005;
	}


	.backBtn {
		font-size: 36rpx;
		display: flex;
		align-items: center;
		height: 100%;
		justify-content: center;
		max-width: 100%;
		color: #FFFFFF;
	}
	.subsidy {
		position: absolute;
		width: 404rpx;
		height: 240rpx;
		top: 16rpx;
		left: 231rpx;
		color: #fff;
		font-weight: 500;
	}
	.show-wx {
		position: absolute;
		top: 786rpx;
		left: 48rpx;
		right: 48rpx;
	}

	.mch-pic {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}

	.wx-box {
		margin-left: 16rpx;
		padding: 0 20rpx 0 31rpx;
		width: 577rpx;
		height: 60rpx;
		background: #FFE9EC;
		border-radius: 30rpx;
	}
	.share-button-box {
		position: absolute;
		top: 305rpx;
		left: 45rpx;
		right: 45rpx;
	}
	.share-button {
		width: 660rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		border-radius: 45rpx;
		text-shadow: 0px 2rpx 2rpx #EB7B0F;
		font-weight: bold;
		background: linear-gradient(1deg, #FF8F8F, #FF7C00, #FFCA4F);
		box-shadow: 3rpx 8rpx 13rpx 0rpx rgba(210, 0, 30, 0.89), 0rpx 3rpx 9rpx 0rpx rgba(255, 255, 255, 0.9);
	}
	.share-button-text {
		width: 420rpx;
		margin: 0 auto 32rpx;
		font-size: 24rpx;
		text-align: center;
		color: #fff;
	}
</style>
