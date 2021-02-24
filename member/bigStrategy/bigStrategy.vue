<template>
	<view class="page">
		<custom mode="2" background="#E1122C" fixed="fixed" title="大亲攻略" titleColor="#FFFFFF">
		</custom>
		<view class="plr-24">
			<view class="main">
				<view class="main-main pr">
					<view class="open-title">
						<image class="open-title-img" :src="bg_btn_opening" mode="aspectFill"></image>
						<view>大亲指引</view>
					</view>
					<view class="text-E1122C">{{big_mch_text.one}}</view>
					<view class="pic-box">
						<image style="height: 100%;width: 100%;" :src="pic_qin_relation" mode="aspectFill"></image>
					</view>
					<view class="text-E1122C" style="margin-top: 47rpx;">{{big_mch_text.two}}</view>
					<view class="show-wx flex">
						<image class="mch-pic" :src="tutor.url" mode="aspectFill"></image>
						<view class="wx-box flex justify-between align-center">
							<view class="fs-24 color-000000">
								<text>微信号：</text>
								<text>{{tutor.tel}}</text>
							</view>
							<view class="fs-24" style="color: #FF2B49;" @tap="copyText" :data-text="tutor.tel">复制</view>
						</view>
					</view>
					<view class="text-E1122C" style="margin-top: 92rpx;">{{big_mch_text.three}}</view>
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
				big_mch_text: {},
				tutor: {},
				pic_qin_relation: uni.getStorageSync('_img').pic_qin_relation,
				bg_btn_opening: uni.getStorageSync('_img').bg_btn_opening
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
							this.big_mch_text = res.data.big_mch
							this.tutor = res.data.tutor
						} else {
							uni.showModal({
								title: res.msg,
								showCancel: false
							});
						}
					}
				});
			},
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
		margin-top: 47rpx;
	}

	.main-main {
		width: 681rpx;
		background: #FFFFFF;
		border-radius: 30px;
		padding: 105rpx 32rpx 122rpx;
		box-shadow: 0rpx 0rpx 20rpx 10rpx #FEE1B2 inset;
	}

	.open-title {
		position: absolute;
		top: -60rpx;
		left: 50%;
		margin-left: -254rpx;
		width: 508rpx;
		height: 124rpx;
		font-size: 48rpx;
		color: #fff;
		font-weight: bold;
		text-align: center;
		line-height: 110rpx;
		z-index: 1;
	}
	.pic-box {
		width: 566rpx;
		height: 258rpx;
		margin: 24rpx auto 80rpx;
	}

	.open-title-img {
		position: absolute;
		top: 0rpx;
		left: 0rpx;
		width: 508rpx;
		height: 124rpx;
		z-index: -1;
	}

	.text-E1122C {
		color: #E1122C;
		font-size: 24rpx;
		font-weight: bold;
	}

	.show-wx {
		margin-top: 30rpx;
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
		background: #FEDFB2;
		border-radius: 30rpx;
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
</style>
