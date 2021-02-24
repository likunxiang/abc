<template>
	<view class="main">
		<image class="discounts-pic" :style="{'width':width, 'height':height}" :src="picture" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			// 图片的路径
			picture: {
				type: String,
				default: ''
			},
			// 图片的宽度
			width: {
				type: String,
				default: '70rpx'
			},
			// 图片的高度
			height: {
				type: String,
				default: '68rpx'
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.discounts-pic {
		width: 70rpx;
		height: 68rpx;
	}
	.discounts-text {
		font-size: 24rpx;
		font-family: HuXiaoBo-NanShen;
		color: #FC681A;
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
	.discounts-pic {
	  transform-origin: bottom center;
	  animation: swing 4s .3s linear infinite;
	  width: 70rpx;
	  height: 68rpx;
	}
</style>
