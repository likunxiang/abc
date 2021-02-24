<template>
	<view v-if="status == 0" class="get-card-modal flex-x-center flex-y-center ns-column">
		<view class="get-card-modal-main pr" :style="'background: url(' + lay_pic + ') no-repeat;background-size: 100% 100%;'">
			<view class="main-main" v-if="page_type == 'normal'">
				<view class="fs-44 color-fff ns-text-bold text-center">
					<view>恭喜您获得</view>
					<view>{{open_card_value}}元开业礼包</view>
				</view>
				<view class="fs-26 color-fff text-center" style="margin-top: 27rpx;">
					<view>店铺新开，送您{{open_card_num}}张亲卡</view>
					<view>赶紧送给好友，锁定您的顾客吧</view>
				</view>
			</view>
			<view class="main-main mt-30" v-if="page_type == 'index'">
				<view class="fs-36 color-fff ns-text-bold flex-x-center">
					<view class="text-center" style="width: 360rpx;">{{msg}}</view>
				</view>
			</view>
			<view class="get-card-modal-btn" @click="receive"></view>
		</view>
		<view class="iconfont icon-guanbi color-999999" style="font-size: 60rpx;margin-top: 49rpx;" @click="closeModel"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 0
			}
		},
		props: {
			open_card_value: {
				type: String,
				default: '0'
			},
			open_card_num: {
				type: String,
				default: '0'
			},
			lay_pic: {
				type: String,
				default: ''
			},
			page_type: {
				type: String,
				default: 'normal'
			},
			msg: {
				type: String,
				default: ''
			}
		},
		methods: {
			receive() {
				this.status = 1
			},
			closeModel() {
				this.status = 1
			}
		}
	}
</script>

<style scoped>
	.main-main {
		position: absolute;
		top: 383rpx;
		width: 100%;
		left: -22rpx;
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
		width: 700rpx;
		height: 770rpx;
	}
	
	.get-card-modal-text {
		font-size: 38rpx;
		color: #B86A24;
		margin-top: 48rpx;
	}
	
	.get-card-modal-btn {
		position: absolute;
		bottom: 77rpx;
		left: 50%;
		margin-left: -150rpx;
		width: 279rpx;
		height: 75rpx;
		text-align: center;
		background: transparent;
	}
	.fs-44 {
		font-size: 44rpx;
	}
</style>
