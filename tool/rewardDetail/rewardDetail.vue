<template>
	<view v-if="show">
		<view class="pr" style="overflow-x: hidden;">
			<custom mode="2" fixed="fixed" background="#DA3F33" title="领取红包"></custom>

			<view class="flex flex-x-center">
				<image :src="user.avatar_url || ''" mode="aspectFit" style="background-color: rgba(244,244,244,0.3);width: 120rpx;height: 120rpx;border-radius: 60rpx;margin-top: 70rpx;position: relative;z-index: 9;"></image>
			</view>
			<!-- 上面的圆角开始 -->

			<!-- 上面的圆角接受 -->
			<view class="bg-top">

			</view>
		</view>



		<!-- 红包详情开始 -->
		<view class="fs-30" style="text-align: center;overflow: hidden;padding: 0 80rpx;min-height: 180rpx;">
			<view style="color: #333333;margin-top: 30rpx;">
				{{user.nickname || ''}}的红包
			</view>
			<view style="color: #999999;margin-top: 5rpx;">
				{{data.desc || ''}}
			</view>

			<block v-if="vip == true && is_null == false && xs(list.my_sub,2) != '0.00'">

				<view class="" v-if="list.my_sub" style="color: #FF0200;font-size: 30rpx;margin-top: 20rpx;">
					恭喜你，成功抢到
				</view>
				<view style="margin-top: 2rpx;color: #FF0200;font-size: 60rpx;font-weight: bold;">
					<text class="fs-30" style="margin-right: 10rpx;">¥</text>{{this.xs(list.my_sub,2)}}
				</view>
				<!-- <view v-if="list.my_sub" style="color: #FF0200;margin-top: 10rpx;margin-bottom: 50rpx;">
					已存入我的津贴，可直接下单抵扣
				</view> -->
				<view class="" style="margin-top: 42rpx;margin-bottom: 50rpx;">
					<view @tap="to_other('/pages/guanyiguan/guanyiguan')" hover-class="click1" style="display: inline-block;width: 242rpx;height: 72rpx;border-radius: 36rpx;border: 2rpx solid #F23005;font-size: 30rpx;line-height:68rpx;color:#F23005">
						去逛一逛
					</view>
					<view @tap="to_other('/member/allowance/allowance')" hover-class="click1" style="margin-left: 60rpx;display: inline-block;width: 242rpx;height: 72rpx;border-radius: 36rpx;font-size: 30rpx;line-height:72rpx;background-color: #F23005;color: #FFFFFF;">
						查看津贴
					</view>
				</view>
			</block>

			<block v-if="is_null == true">
				<view class="fs-36 color-333333" style="text-align: center;margin-top: 326rpx;font-weight: bold;">
					手慢了，红包派完了
				</view>

				<view @tap="less(show_detail)" class="fs-30" style="text-align: center;position: fixed;width: 100%;color: #DA3F33;text-decoration: underline;bottom: 80rpx;left: 0;">
					查看领取详情
				</view>
			</block>

			<!-- 非会员开始 -->
			<view v-if="vip == false" class="fs-30 color-333333">
				<view class="" style="margin-top: 90rpx;">
					你还不是会员
				</view>
				<view class="" style="margin-top: 8rpx;">
					请先成为会员再来领取
				</view>
				<view @tap="less(get_vip)" style="width: 400rpx;height: 94rpx;line-height: 94rpx;border-radius: 47rpx;background-color: #F23005;color:#FFFFFF;display: inline-block;margin-top: 50rpx;">
					成为会员
				</view>
			</view>
			<!-- 非会员结束 -->

		</view>
		<!-- 红包详情结束 -->



		<view v-if="vip == true && is_null == false" style="height: 16rpx;background-color: #F4F4F4;">
			<!-- 灰条 -->
		</view>


		<!-- 领取详情开始 -->
		<view v-if="vip == true && is_null == false" class="" style="margin-bottom: 40rpx;">
			<view class="pl-24" style="font-size: 24rpx;color: #999999;line-height: 75rpx;">
				领取{{this.xs(data.use_num,-1)}}/{{this.xs(data.num,-1)}}个，共{{this.xs(data.use_subsidy,2)}}/{{this.xs(data.subsidy,2)}}元
			</view>

			<!-- 列表 -->
			<view class="detail-list" v-for="(item,index) in list.list" :key="index" :style="{'background-color':item.is_my == true ? '#F23005':'#FFFFFF'}">
				<image :src="item.avatar_url" class="img" mode=""></image>
				<view class="flex-1 pl-24">
					<view class="flex flex-x-b color-333333 fs-30" :style="{'color':item.is_my == true ? '#FFFFFF':'#333333'}">
						<view class="flex flex-y-center" >
							<text class="name">{{item.nickname || ''}}</text> <text v-if="item.is_my == true" style="width: 58rpx;height: 30rpx;border-radius: 6rpx;text-align: center;color: #F23005;font-size: 22rpx;line-height: 30rpx;background-color: #FFFFFF;margin-left: 20rpx;display: inline-block;">本人</text>
						</view>
						<text class="number">{{xs(item.subsidy,2)}}元</text>
					</view>
					<view class="flex flex-x-b fs-24" style="margin-top: 16rpx;">
						<text class="color-999999" :style="{'color':item.is_my == true ? '#FFFFFF':'#999999'}">{{item.addtime_str || ''}}</text>
						<text style="color: #FF0200; " :style="{'color':item.is_my == true ? '#FFFFFF':'#FF0200'}">{{item.check_max == true ? '当前最佳':""}}</text>
					</view>
				</view>

			</view>
		</view>
		<!-- 领取详情结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				vip: true, //会员展示领取详情页，非会员显示成为会员页
				is_null: false, //红包派发完了
				id: '', //红包id
				user: {}, //头像和昵称
				list: {}, //祝福语和领取列表
				data: {}, //红包的其他数据
				show: false,
				option: {},
			}
		},

		onLoad(e) {
			uni.hideShareMenu();
			this.id = e.id
			if (e.status == 5) {
				this.vip = false;
			} else if (e.status == 3 || e.status == 4) {
				this.is_null = true;
			}
			this.option = e || {};

			///获取红包详情
			this.get_detail();
		},
		methods: {
			//获取红包领取详情
			get_detail() {
				uni.showLoading({
					mask: true
				})
				this.getApp().request({
					data: {
						id: this.id
					},
					method: "POST",
					url: this.getApp().api.jintie.get_log,
					success: (res) => {
						if (res.code == 0) {
							this.setData({
								user: res.data.user || {},
								list: res.data.list || {},
								data: res.data.data || {},
							});
						}
					},
					complete: _ => {
						uni.hideLoading();
						this.show = true;
						setTimeout(() => {
							if (this.option.status == 6)
								uni.showToast({
									icon: 'none',
									title: '该红包店主不能领取哦',
									duration: 2000
								})
						}, 1000)
					}
				});
			},
			//购买会员
			get_vip() {
				uni.redirectTo({
					url: '/member/vipFirst/vipFirst'
				})
			},
			//查看领取详情
			show_detail() {
				this.vip = true;
				this.is_null = false;
			},
			//页面跳转
			to_other(url) {
				uni.reLaunch({
					url: url,
				})
			}
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 500)
			this.less(() => {
				uni.showLoading({
					mask: true
				})
				this.getApp().request({
					data: {
						id: this.id
					},
					method: "POST",
					url: this.getApp().api.jintie.get_log,
					success: (res) => {
						if (res.code == 0) {

							this.list.list = res.data.list.list || [];
							this.data = res.data.data || {};
						}
					},
					complete: _ => {
						uni.hideLoading();
					}
				});
			})
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.bg-top {
		position: absolute;
		left: 50%;
		bottom: 60rpx;
		width: 2500rpx;
		height: 2500rpx;
		border-radius: 50%;
		background-color: #DA3F33;
		border: 6rpx solid #FFCD98;
		transform: translate(-50%, 0);
		z-index: 3;
	}

	.detail-list {
		height: 134rpx;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 24rpx;
		border-bottom: 1rpx solid rgba(244, 244, 244, 0.7);

		&:nth-of-type(1) {
			border-top: 1rpx solid rgba(244, 244, 244, 0.7);
		}

		.img {
			width: 88rpx;
			height: 88rpx;
			border-radius: 44rpx;
			background-color: rgba(244, 244, 244, 0.5);
		}
	}
</style>
