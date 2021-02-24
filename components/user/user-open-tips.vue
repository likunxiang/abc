<template>
	<view v-if="open_shop_tips == 0">
		<view class="get-card-modal flex-x-center flex-y-center ns-column" v-if="show == true" @tap="closeOpenShop">
			<view v-if="status==2 && result == 1" class="open-shop-success pr" :style="'background: url(' + open_mch_tc + ') no-repeat;background-size: 100% 100%;'">
				<!-- 	<view class="fs-36 color-333333 text-center ns-text-bold">{{title}}</view>
				<view style="margin-top: 59rpx;" class="fs-30 color-666666 text-center">{{msg}}</view> -->
				<view class="success-text">
					<view>恭喜你成为亲铺大家庭的成员</view>
					<view>在你成长的每一步</view>
					<view>亲铺赋能团队都会和你一起</view>
					<view>陪伴你创业成长</view>
				</view>
				<!-- <navigator url="/member/openingStrategy/openingStrategy" class="success-btn fs-30 color-333333" @tap.stop="closeToastMch">查看开店攻略</navigator> -->
				<!-- <navigator url="/pages/article-detail/article-detail?id=81" class="success-btn-success fs-30 color-333333" @tap.stop="closeToastMch">点击，开始做生意</navigator> -->
				<navigator url="/pages/user/user?new_mch=true" class="success-btn-success fs-30 color-333333" @tap.stop="closeToastMch">点击，开始做生意</navigator>
			</view>
			<view v-if="status==2 && result == 0" class="open-shop-fail">
				<view class="color-333333 text-center ns-text-bold" style="font-size: 44rpx;">{{title}}</view>
				<view style="margin-top: 43rpx;" class="fs-30 color-666666 text-center">很遗憾，您的开店申请没有通过</view>
				<view style="margin-top: 30rpx;" class="fs-30 color-666666 text-center plr-24">{{msg}}</view>
				<view class="flex justify-between" style="margin-top: 77rpx;">
					<view class="success-btn fs-32" @tap.stop="closeToastMch">确定</view>
					<view class="success-btn-full fs-32" @tap.stop="toOpenShop">重新提交</view>
				</view>
			</view>
			<view v-if="status==0" class="open-shop-fail" :style="'width: 580rpx;height: 720rpx;background: url(' + up_daqin + ') no-repeat;background-size: 100% 100%;'">
				<!-- <view class="color-333333 text-center ns-text-bold" style="font-size: 44rpx;">{{title}}</view>
				<view style="margin-top: 30rpx;" class="fs-30 color-666666 text-center plr-24">{{msg}}</view> -->
				<navigator url="/member/bigStrategy/bigStrategy" class="success-btn-full fs-32" style="width: 100%;margin-top: 544rpx;"
				 @tap.stop="closeToastMch">大亲攻略</navigator>
			</view>
			<view v-if="status==1" class="open-shop-fail" :style="'width: 580rpx;height: 610rpx;background: url(' + down_daqin + ') no-repeat;background-size: 100% 100%;'">
				<!-- <view class="color-333333 text-center ns-text-bold" style="font-size: 44rpx;">{{title}}</view>
				<view style="margin-top: 30rpx;" class="fs-30 color-666666 text-center plr-24">{{msg}}</view> -->
				<view class="success-btn-full fs-32" style="width: 100%;margin-top: 440rpx;" @tap.stop="toMyTeam">查看亲团</view>
			</view>
			<view v-if="status==3" class="open-shop-fail">
				<view class="color-333333 text-center ns-text-bold" style="font-size: 44rpx;">{{title}}</view>
				<view style="margin-top: 30rpx;" class="fs-30 color-666666 text-center plr-24">{{msg}}</view>
				<navigator url="/member/closeNotice/closeNotice" class="success-btn-full fs-32" style="width: 100%;margin-top: 77rpx;"
				 @tap.stop="closeToastMch">关店须知</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				open_shop_tips: 1,
				status: '',
				msg: '',
				title: '',
				result: '',
				log_id: '',
				open_mch_tc: uni.getStorageSync('_img').open_mch_tc,
				up_daqin: uni.getStorageSync('_img').up_daqin,
				down_daqin: uni.getStorageSync('_img').down_daqin
			}
		},
		props: {
			// tips: {
			// 	type: String,
			// 	default: '0',
			// },
			// status: {
			// 	type: String,
			// 	default: '2'
			// },
			// msg: {
			// 	type: String,
			// 	default: '你没有上传图片'
			// }
		},
		mounted() {
			// 获取开店状态
			this.openMchStatus();
		},
		methods: {
			closeOpenShop() {
				this.show = false
			},
			closeToastMch: function() {
				this.show = false
				this.getApp().request({
					url: this.getApp().api.user.updata_log_tips,
					data: {
						log_id: this.log_id
					},
					success: (res) => {}
				})
			},
			toMyTeam() {
				this.closeToastMch()
				uni.navigateToMiniProgram({
					appId: 'wxfd13fd712d32b3cb',
					path: '/pages/myTeam/myTeam',
					extraData: {
						// 传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
						mch_id: uni.getStorageSync('_mchInfo').id,
						token: uni.getStorageSync(this.getApp().const.ACCESS_TOKEN)
					},
					envVersion: 'trial',

					// 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效
					success(res) {
						// 打开成功
					},

					fail: function(res) {}
				});
			},
			toOpenShop() {
				uni.navigateTo({
					url: '/member/openshop/openshop'
				})
			},
			openMchStatus() {
				this.getApp().request({
					url: this.getApp().api.user.open_mch_status,
					data: {

					},
					success: (res) => {
						if (res.code == 0) {
							this.setData({
								open_shop_tips: res.data.tip, // 是提不提示弹窗  0弹，1不弹
								status: res.data.type, //0 升级 1 降级 2 开店 3 关店
								msg: res.data.desc, // review_result 是弹窗内容
								log_id: res.data.id, // 用于关闭弹窗
								title: res.data.title,
								result: res.data.result, // 开店状态  0失败  1成功
							})
						} else {
							// uni.showModal({
							// 	title: '申请开店',
							// 	content: res.msg,
							// })
						}
					},
				})
			},

		}
	}
</script>

<style>
	.open-shop-success {
		width: 631rpx;
		height: 647rpx;
	}

	.open-shop-fail {
		width: 580rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 52rpx 42rpx 30rpx;
	}

	.success-btn {
		width: 234rpx;
		height: 88rpx;
		line-height: 86rpx;
		text-align: center;
		border-radius: 44rpx;
		color: #FF401A;
		border: 1rpx solid #FF401A;
	}

	.success-btn-full {
		width: 234rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		border-radius: 44rpx;
		color: #fff;
		background: #FF401A;
		box-shadow: 0rpx 5rpx 12rpx 0rpx rgba(255, 69, 32, 0.55);
	}

	.success-btn-success {
		position: absolute;
		bottom: 30rpx;
		left: 90rpx;
		width: 450rpx;
		height: 79rpx;
		color: #fff;
		line-height: 79rpx;
		text-align: center;
	}

	.success-text {
		position: absolute;
		bottom: 116rpx;
		width: 100%;
		font-size: 24rpx;
		color: #333333;
		text-align: center;
		line-height: 36rpx;
	}
</style>
