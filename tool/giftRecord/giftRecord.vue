<template>
	<view>
		<custom fixed="fixed" mode="2" background="#FFFFFF" backColor="#333333" titleColor="#333333" title="赠送记录"></custom>

		<!-- 头像 -->
		<view class="flex flex-x-center">
			<image :src="user.avatar_url || ''" mode="aspectFit" style="background-color: rgba(200,200,200,0.1);width: 120rpx;height: 120rpx;border-radius: 60rpx;margin-top: 70rpx;position: relative;z-index: 9;"></image>
		</view>

		<!-- 姓名 -->
		<view class="color-333333 fs-30" style="font-weight: 500;margin-top: 32rpx;text-align: center;">
			{{user.nickname || ''}}
		</view>

		<view class="flex" style="font-size: 50rpx; color: #333333;text-align: center;margin-top: 50rpx;margin-bottom: 40rpx;">
			<view style="width: 50%;">
				<view class="tett-ovfl">
					{{this.xs(data.use_num_sum,-1)}}个
				</view>
				<view class="color-999999 mt-20 fs-30">
					累计红包个数
				</view>
			</view>
			<view style="width: 50%;">
				<view class="tett-ovfl" style="color: #FF0200;">
					¥ {{this.xs(data.use_subsidy_sum,2)}}
				</view>
				<view class="color-999999 mt-20 fs-30">
					累计红包金额
				</view>
			</view>
		</view>


		<!-- 列表 -->
		<view class="pl-24 pr-24" style="margin-top: 80rpx;">
			<view class="list-zeng flex flex-x-b flex-y-center  fs-30 color-333333" v-for="(item,index) in list.list" :key="index">
				<view class="">
					<view>{{item.nickname || ''}}</view>
					<view class="fs-24 color-999999" style="margin-top: 20rpx;">{{item.addtime_str || ''}}</view>
				</view>
				<view>
					{{xs(item.subsidy_sum,2)}}元
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {}, //头像和昵称
				list: {}, //流水
				data: {}, //红包的其他数据
			}
		},
		onLoad() {
			this.get_log();
		},
		methods: {
			get_log() {
				uni.showLoading({
					mask: true
				})
				this.getApp().request({
					data: {
						id: this.id
					},
					url: this.getApp().api.jintie.log,
					success: (res) => {
						if (res.code == 0) {
							this.setData({
								user: res.data.user || {},
								list: res.data.list || {},
								data: res.data.data || {},
							});
							this.list.list = this.list.list || [];
						}
					},
					complete: _ => {
						uni.hideLoading();
						this.show = true;
					}
				});
			}
		},

	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.list-zeng {
		height: 134rpx;
		border-bottom: 1rpx solid rgba(244, 244, 244, 0.7);

		&:nth-of-type(1) {
			border-top: 1rpx solid rgba(244, 244, 244, 0.7);
		}
	}

	.tett-ovfl {
		white-space: nowrap;
		overflow: hidden;
	}
</style>
