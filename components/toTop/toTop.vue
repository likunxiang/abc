<template>
	<!-- 回到头部按钮开始 -->
	<view class="to-top-btn ns-text-center color-fff" v-if="is_top" @tap.stop="toTop">
		<!-- 静止 -->
		<view v-if="scrollStop">
			<view class="iconfont icon-shangshuangjiantou fs-30"></view>
			<view class="fs-20">顶部</view>
		</view>
		<!-- 滑动 -->
		<view v-else>
			<view class="fs-26">{{page}}</view>
			<view class="to-top-line"></view>
			<view class="fs-20" style="opacity: 0.6;">{{totalPage}}</view>
		</view>
	</view>
	
	<!-- 回到头部按钮结束 -->
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			is_top: {
				type: Boolean,
				default: false
			},
			page: {
				type: String,
				default: '1'
			},
			totalPage: {
				type: String,
				default: '1'
			},
			scrollStop: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			//回到最上面
			toTop() {
				uni.pageScrollTo({
					scrollTop: 0
				})
			},
		}
	}
</script>

<style>
	.to-top-btn {
		position: fixed;
		bottom: 200rpx;
		right: 24rpx;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		background: rgba(37, 37, 37, 0.64);
		z-index: 10;
		padding: 6rpx 0;
	
	}
	.to-top-line {
		width: 33rpx;
		height: 2rpx;
		background: #fff;
		margin: auto;
	}
</style>
