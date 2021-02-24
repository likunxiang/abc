<template>
	<view>
		<custom mode="2" title="签约提示" fixed="fixed" background="#FFFFFF" backColor="#333333" titleColor="#333333"></custom>
		<view class="pl-24 pr-24 fs-30" style="line-height: 42rpx;">
			<view class="color-333333">
				根据淘宝的要求，需要完成授权才能获得返佣收益，请按照以下步骤完成账号关联：
			</view>
			<view class="color-666666" style="margin-top: 10rpx;">
				1、点击复制链接
			</view>
			<view class="color-666666">
				2、打开淘宝APP，在搜索框中粘贴链接，点击搜索，点击“授权”即可
			</view>
			<view class="color-666666">
				3、如果没有登录或者没有淘宝账户的，可以先登录或申请账户后再粘贴链接进行授权
			</view>
		</view>
		
		<view class="content1" style="text-align: center;">
			<!-- <view class="color-333333">
				不会操作? <text style="color: #FF401A;text-decoration: underline;margin-left: 10rpx;">联系客服</text>
			</view> -->
			<view @tap="less(get_link)" class="" style="margin-top: 30rpx;width: 502rpx;height: 70rpx;background: #FF401A;background: linear-gradient(225deg, #F76436 0%, #F49E3A 100%);border-radius: 35rpx;line-height: 70rpx;color: #FFFFFF;display: inline-block;">
				复制链接，去淘宝授权
			</view>
			<view @tap="less(is_success,3,4)" style="margin-top: 30rpx;width: 502rpx;height: 70rpx;border-radius: 35rpx;line-height: 70rpx;color: #FF9100;display: inline-block;border:1rpx solid #FF9100">
				我已授权，查看是否签约成功
			</view>
		</view>
		<image :src="init_img.tb_auth" mode="widthFix" style="width: 100%;height: auto;margin-top: 40rpx;"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			//赋值链接
			get_link() {
				// if(this.login())
				// return
				uni.showLoading({
					title: '获取授权链接中',
					mask: false
				});


				this.getApp().request({
					url: this.getApp().api.taoke.tk_auth,
					data: {
						type: 11,
						mch_id: uni.getStorageSync("_mchInfo").id || '',
					},
					success: (res) => {
						// console.log(res);
						uni.setClipboardData({
							data: res.data.url,
							success: () => {
								uni.showToast({
									icon: 'none',
									title: "复制成功，赶快去淘宝搜索框粘贴搜索吧!",
									duration: 3000
								});
								uni.setStorageSync('link', res.data.url);
							}
						});
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			//查看是否关联成功
			is_success(x,y) {
				if(this.login())
				return ;
				uni.showLoading({
					title: '请求链接中',
					mask: false
				});

				this.getApp().request({
					url: this.getApp().api.taoke.tk_check,
					data: {
						mch_id: uni.getStorageSync("_mchInfo").id || '',
					},
					success: (res) => {
						uni.hideLoading();
						if (res.code == 0) {
							uni.showToast({
								icon:'success',
								title: "签约成功",
								duration: 3000
							});
							setTimeout(() => {
								this.uniBack();
							}, 1000)
						} else {
							if (res.code == 1) {
								uni.showToast({
									icon: 'none',
									title: '签约失败',
									duration: 3000
								});
							}
						}
					},
					complete: () => {
				
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100vh;
		background-color: #FFFFFF;
	}

	.toBottom {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
	}
</style>
