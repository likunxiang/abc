<template>
	<view class="get-card-modal flex-x-center flex-y-center ns-column" v-if="is_show_first">
		<view class="get-card-modal-main-first pr flex-y-center" :style="'background: url(' + first_order_img + ') no-repeat center;background-size: 750rpx 772rpx;'">
			<view class="text-center" style="width: 750rpx; height: 772rpx;">
				<view class=" get-card-modal-text-first" style="margin-top: 275rpx;">
					<view>送你一次</view>
					<view>首单享会员机会</view>
				</view>
				<view class="small-tips-first text-center">首次下单可以享受会员价</view>
				<view class="btn-text-first text-center" @tap="closeModal">确定</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				is_show_first: false
			}
		},
		props: {

		},
		mounted() {
			this.checkFirstOrder()
		},
		methods: {
			checkFirstOrder() {
				var self = this;
				self.setData({
					first_order_img: uni.getStorageSync('_img').bg_popup
				});

				if (uni.getStorageSync('is_show_modal')) {
					return;
				}

				self.getApp().request({
					url: self.getApp().api.default.check_first_order,
					data: {
						userId: uni.getStorageSync('USER_INFO').id
					},
					success: function(res) {
						if (res.code == 0) {
							uni.setStorageSync('is_show_modal', '0'); // 首单优惠

							if (uni.getStorageSync('is_show_modal') == '0') {
								self.setData({
									is_show_first: true
								});
							} else {
								self.setData({
									is_show_first: false
								});
							}
						} else {}
					}
				});
			},

			showModal() {
				var self = this;
				self.setData({
					is_show_modal: true
				});
			},

			closeModal() {
				var self = this;
				self.setData({
					is_show_first: false
				});
				uni.setStorageSync('is_show_modal', '1');
			},
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

	.get-card-modal-first {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, .7);
		z-index: 10000;
	}

	.get-card-modal-main-first {
		width: 750rpx;
		height: 1334rpx;
	}
</style>
