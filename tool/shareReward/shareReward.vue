<template>
	<view>
		<custom fixed="fixed" mode="2" background="#FFFFFF" backColor="#333333" titleColor="#333333" title="发红包"></custom>

		<!-- 内容 -->
		<view class="fs-30 color-333333" style="text-align: center;">
			<view class="iconfont icon-wancheng1" style="color: #F23005;font-size: 130rpx;margin-top: 45rpx;">

			</view>
			<view style="margin-top: 10rpx;">
				红包生成完毕
			</view>
			<view style="margin-top: 6rpx;">
				快去转发给好友吧
			</view>

			<button open-type="share" style="margin: 0;padding: 0;line-height: 0;background-color: rgb(0,0,0,0);">
				<view style="width: 400rpx;line-height: 94rpx;border-radius: 47rpx;background-color:#F23005;color: #FFFFFF;display: inline-block;margin-top: 54rpx;">
					立即转发
				</view>
			</button>
		</view>

		<view style="height: 16rpx;background-color: #F4F4F4;margin-top: 78rpx;">

		</view>

		<view class="fs-30 color-333333" style="text-align: center;">
			<view style="font-size: 36rpx;font-weight: bold;margin-top: 100rpx;">
				发红包也要发出高级感
			</view>
			<view class="color-999999 mt-10">
				(这些场合你可以试试发红包)
			</view>

			<view class="" style="display: inline-block; text-align: left;">
				<view style="margin-top: 65rpx;">
					1、发手气红包到顾客群，活跃群气氛
				</view>
				<view style="margin-top: 65rpx;">
					2、邀请顾客晒单，发个红包表心意
				</view>
				<view style="margin-top: 65rpx;">
					3、发生售后不要紧，发个红包暖一暖
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  info:{}
			}
		},
		methods: {
			
		},
		onLoad(e) {
			uni.hideShareMenu();
			let data = JSON.parse(e.data) || {
				sid: 44,
				share_msg: '',
				share_img: '',
			}
			this.info = data;
			console.log(data)
		},
		onShareAppMessage() {
			return {
				title:this.info.share_msg,
				imageUrl:this.info.share_img || '',
				path:'/tool/openReward/openReward?sid=' + this.info.sid
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
</style>
