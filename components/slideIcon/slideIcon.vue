<template>
	<view>
		<!-- <navigator url="/pages/index/index" class="tohome-btn text-center align-center">
			<view class="iconfont icon-shouye1 color-fff fs-40"></view>
		</navigator> -->
		<navigator url="/pages/cart/cart" class="tohome-btn text-center ns-column align-center pr">
			<view class="iconfont icon-gwc color-333333 fs-40"></view>
			<view class="cart-num color-fff fs-18">{{cartNum}}</view>
		</navigator>
		<!-- <navigator v-if="showPic" :url="'/member/recommendMaterial/recommendMaterial?id=' + showPic" class="tohome-btn tohome-btn-material text-center ns-column align-center pr"
		 style="bottom: 188rpx">
			<view class="iconfont icon-fatusucaiku color-fff fs-50"></view>
		</navigator> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 这里是一些组件内部数据
				someData: {}
			};
		},

		components: {},
		props: {
			// 这里定义了innerText属性，属性值可以在组件使用时指定
			cartNum: {
				type: Number,
				default: 0
			},
			showPic: {
				type: String,
				default: ''
			}
		},
		methods: {
			// 这里是一个自定义方法
			customMethod: function() {}
		}
	};
</script>
<style>
	.tohome-btn {
		position: fixed;
		right: 24rpx;
		bottom: 44rpx;
		width: 88rpx;
		height: 88rpx;
		background: #FFFFFF;
		box-shadow: 0px 3rpx 8rpx 0px rgba(181, 181, 181, 0.39);
		border-radius: 50%;
		line-height: 88rpx;
	}

	.tohome-btn-material {
		background: #16A4FF;
		border: 4rpx solid #FFFFFF;
	}

	.cart-num {
		position: absolute;
		top: 22rpx;
		right: 14rpx;
		width: 24rpx;
		height: 24rpx;
		line-height: 20rpx;
		background: #FF0200;
		border: 2rpx solid #fff;
		border-radius: 50%;
	}
</style>
