<template>
	<view class="main">
		<!-- 同类推荐 -->
		<view class="bg-white p-24" v-if="sameGoods">
			<view class="flex-x-center pr" style="margin-bottom: 38rpx;">
				<view class=" fs-30 color-333333 ns-text-bold">同类推荐</view>
				<view class="under-line"></view>
			</view>
			<view class="" style="height: 650rpx;">
				<swiper circular="true" duration="500" style="height: 650rpx;">
					<swiper-item class="flex ns-wrap" style="height: 650rpx;">
						<view :class="'same fs-24 ' + ((index+1)%3==0?'':'mr-15')" v-for="(goods,index) in sameList" :key="index" @tap="goGoods" :data-id="goods.id">
							<image class="same-img" :src="goods.first_cover_pic"></image>
							<view class=" pt-20 ns-text-limit  fs-24 color-333333">
								{{goods.name}}
							</view>
							<view class="ns-flex ns-justify-content-space-between align-center">
								<view class="fs-20 color-FF0200 ns-text-bold">￥<text class="fs-26">{{filters.priceStr(goods.price)[0]}}.</text><text>{{filters.priceStr(goods.price)[1]}}</text></view>
								<!-- <view class="add-cart-icon"></view> -->
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sameGoods:[],
				sameList:[]
			}
		},
		props: {
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.under-line {
		position: absolute;
		bottom: -7rpx;
		left: 50%;
		margin-left: -30rpx;
		width:60rpx;
		height:8rpx;
		background:linear-gradient(-90deg,rgba(255,152,2,1),rgba(255,201,1,1));
		border-radius:4rpx;
	}
	.same {
		width: 224rpx;
	}
	.same-img {
		width: 224rpx;
		height: 224rpx;
		border-radius: 20rpx;
	}
</style>
