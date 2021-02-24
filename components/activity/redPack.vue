<template>
	<view v-if="show_all">
		<view class="get-card-modal flex-x-center flex-y-center ns-column" v-if="show">
			<!-- <view class="pic-guang" :style="'background: url(' + guang_mang + ') no-repeat;background-size: 100% 100%;'"></view> -->
			<view :class="{'pr':true,'get-card-modal-main':is_show_box,'close':!is_show_box}" :style="'background: url(' + treasure_box + ') no-repeat;background-size: 100% 100%;'">
				<view class="close-btn" style="font-size: 60rpx;margin-top: 49rpx;" @click="closeModel" v-if="is_show_close"></view>
			</view>
		</view>
		<view class="small-box" v-if="!show">
			<image :src="logo_gift" mode="widthFix" style="width: 100%;height: 100%;" @tap='openRedModel'></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_show_box: true,
				is_show_close: false,
				is_show_model: true,
				treasure_box: uni.getStorageSync('_img').treasure_box,
				guang_mang: uni.getStorageSync('_img').guang_mang,
				logo_gift: uni.getStorageSync('_img').logo_gift,
				show:true,
				show_all :false
			}
		},
		props: {
			active_id:{
				type:Number || String,
				default:0
			}
		},
		mounted() {
			setTimeout(() => {
				this.is_show_close = true
			},2000)
			let checkCoupon_list = uni.getStorageSync('checkCoupon_list') || [];
			this.getApp().request({
				url: this.getApp().api.coupon.check_cart,
				data: {
					aid: this.active_id
				},
				success: (res) => {
					if (res.code == 0) {
						this.couponStatus = res.data.status;
						this.$emit('setRedPackTips',this.couponStatus)
						//只展示一次
						if (res.data.status == 0 || res.data.status == 1) {
							if(checkCoupon_list.length <= 0) {
								this.show_all = true;
								this.show = true;
							} else {
								this.show_all = true;
								this.show = false;
							}
							if(!checkCoupon_list.includes(this.active_id)) {
								checkCoupon_list.push(this.active_id);
								uni.setStorageSync('checkCoupon_list', checkCoupon_list);
							}
						}
						
					}
			
				}
			})
		},
		methods: {
			closeModel() {
				this.is_show_box = false
				this.is_show_close = false
				setTimeout(() => {
					this.is_show_model = false;
					this.show = false;
				},900)
			},
			openRedModel() {
				this.is_show_box = true
				this.is_show_model = true
				this.show = true;
				setTimeout(() => {
					this.is_show_close = true
				},2000)
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

	.get-card-modal-main {
		position: fixed;
		width: 724rpx;
		height: 999rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: open-lqq 2.4s;
		z-index: 2;
	}
	.pic-guang {
		position: fixed;
		width: 750rpx;
		height: 1332rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: change-big 2.4s;
		z-index: 1;
	}
	/* 小宝箱 */
	.small-box {
		position: fixed;
		right: 20rpx;
		bottom: 120rpx;
		width: 100rpx;
		animation: swing 4s .3s linear infinite;
	}
	@keyframes swing {
	  10% {
	    transform: rotate(5deg);
	  }
	  20% {
	    transform: rotate(-5deg);
	  }
	  30% {
	    transform: rotate(5deg);
	  }
	  40% {
	    transform: rotate(-5deg);
	  }
	  50%,100% {
	    transform: rotate(0deg);
	  }
	}
	.close-btn {
		width: 500rpx;
		height: 98rpx;
		position: fixed;
		top: 85%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
	}
	
	@keyframes open-lqq {
		0% {
			transform: translate(-50%, -50%) scale(0.1);
		}

		/* 10% {
			transform: translate(-50%, -50%) scale(0.1);
		} */

		50% {
			transform: translate(-50%, -50%) scale(1);
		}

		55% {
			transform: translate(-50%, -50%) scale(0.9);
		}

		60% {
			transform: translate(-50%, -50%) scale(1);
		}

		65% {
			transform: translate(-50%, -50%) scale(0.9);
		}

		70% {
			transform: translate(-50%, -50%) scale(1);
		}

		75% {
			transform: translate(-50%, -50%) scale(1) rotate(0deg);
		}

		80% {
			transform: translate(-50%, -50%) scale(1) rotate(0deg);
		}

		85% {
			transform: translate(-50%, -50%) scale(1) rotate(0deg);
		}

		90% {
			transform: translate(-50%, -50%) scale(1) rotate(0deg);
		}

		95% {
			transform: translate(-50%, -50%) scale(1) rotate(0deg);
		}

		100% {
			transform: translate(-50%, -50%) scale(1);
		}
	}
	
	@keyframes change-big {
		0% {
			transform: translate(-50%, -50%) scale(0.1);
		}
	
		10% {
			transform: translate(-50%, -50%) scale(0.1);
		}
	
		50%,100% {
			transform: translate(-50%, -50%) scale(1);
		}
	
		
	}

	.close {
		position: fixed;
		width: 667px;
		height: 557px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: close-lqq 1s;
	}

	@keyframes close-lqq {
		0% {
			position: fixed;
			width: 300px;
			height: 300px;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		100% {
			position: fixed;
			width: 30px;
			height: 30px;
			top: 80%;
			left: 80%;
			transform: translate(0, 0);
		}
	}
</style>
