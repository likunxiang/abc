<template>
	
		<view class="body after-navber">
			<common></common>
		    <view :class="'page ' + __page_classes">
		        <view class="body after-navber">
		
		            <view class="flex-row flex-x-center">
		                <image class="disabled_img" :src="__wxapp_img.store.disabled.url"></image>
		            </view>
		
		            <view class="flex-row flex-x-center title">
		                <text>该小程序已被禁用</text>
		            </view>
		
		            <view class="flex-row flex-x-center content">
		                <text>请联系管理员</text>
		            </view>
		
		        </view>
		    </view>
		</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.disabled_img {
  width: 380rpx;
  height: 380rpx;
  margin-top: 200rpx;
}

.title {
  margin-top: 56rpx;
  font-size: 13pt;
  color: #5292ed;
}

.content {
  margin-top: 24rpx;
  font-size: 9pt;
  color: #999999;
}
</style>
