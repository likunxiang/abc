<template>
	<view class="page">
		<!-- 说明弹窗 -->
		<view class="model-lay flex-x-center flex-y-center" v-if="show_model" @click="closeModel">
			<view class="model-lay-main" @click.stop="stop">
				<view class="model-lay-main-title">说明</view>
				<view class="model-lay-main-text fs-26" style="margin-top: 46rpx;">
					<jyfParser :html="warn"></jyfParser>
				</view>
				<view class="model-lay-main-btn" @click="closeModel">我知道了</view>
			</view>
		</view>
		<!-- 说明弹窗 end-->

		<custom mode="2" fixed="fixed" title="未到账收益" background="#fff" titleColor="#333333" backColor="#333333">
			<view slot='slot1'>
				<view class="iconfont icon-bangzhuzhongxin color-999999 fs-30" style="margin-top: 5rpx;margin-left: 7rpx;" @click="openModel"></view>
			</view>
		</custom>
		<view class="page-main">
			<view class="total-box">
				<view class="total-header fs-30 ns-text-bold flex align-center">
					<view class="color-333333">累计收益：</view>
					<view class="color-FF0200">¥ {{sales}}</view>
				</view>
				<view class="total-main flex justify-between">
					<view class="text-center">
						<view class="color-999999 fs-24">待入账(元)</view>
						<view class="fs-30 color-333333 ns-text-bold mt-30">{{pending}}</view>
					</view>
					<view class="text-center">
						<view class="color-999999 fs-24">已入账(元)</view>
						<view class="fs-30 color-333333 ns-text-bold mt-30">{{balance}}</view>
					</view>
				</view>
			</view>

			<view class="nav-box flex justify-between">
				<view :class="'nav-list fs-32 pr ' + (index == navIns?'color-8714EE ns-text-bold':'color-333333') " v-for="(item,index) in navList"
				 :key="index" @click="changeNav(index)">
					<view>{{item.name}}</view>
					<view class="nav-active" v-if="index == navIns"></view>
				</view>
			</view>

			<view class="mt-30 mb-10">
				<text class="fs-24 color-999999">累计收益：</text>
				<text class="color-333333">{{detail_sales}}元</text>
			</view>

			<view class="color-999999" style="margin-top: 200rpx;" v-if="loadList.length <= 0">
				<view class="iconfont icon-kong2 text-center" style="font-size: 100rpx;"></view>
				<view class="fs-30 mt-24 text-center">这栏暂时没有收益哦~</view>
			</view>
			<view v-else class="page-list">
				<view class="list-box flex justify-between align-center" v-for="(item,index) in loadList" :key="index">
					<view class="flex align-center">
						<image :src="item.avatar" mode="widthFix" style="width: 70rpx;height: 70rpx;border-radius: 50%;background: #ccc;"></image>
						<view class="" style="margin-left: 17rpx;width: 320rpx;">
							<view class="fs-24 color-333333 ns-text-bold ns-text-limit">{{item.desc}}</view>
							<view class="fs-18 color-333333" style="margin-top: 7rpx;"><text>订单编号：</text><text>{{item.order_no}}</text></view>
							<view class="mt-16 fs-18 color-999999">{{item.time}}</view>
						</view>
					</view>
					<view class="text-right">
						<view class="fs-30 color-FF0200 ns-text-bold">+{{item.commission}}</view>
						<view class="fs-20 color-333333" style="margin-top: 22rpx;">{{item.status == 1?'待入帐':(item.status == 2?'已入账':'已失效')}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import custom from '@/components/custom/custom.vue'
	import jyfParser from '@/components/jyf-parser/jyf-parser.vue'
	export default {
		data() {
			return {
				navList: [],
				navIns: 0,
				show_model: false,
				type: 1,
				pending: '0.00', // 待入账
				balance: '0.00', // 已入账
				count: '0', // 总数量
				sales: '0.00', // 累计收益--总
				detail_sales: '0.00', // 累计收益--单
				loadList: [], // 列表
				stopLoadMore: false, // 用来控制分页
				page: 1,
				warn: ''
			}
		},
		components: {
			jyfParser
		},
		onLoad() {
			this.getCloseMchOrder()
		},
		methods: {
			stop() {
				return
			},
			changeNav(index) {
				this.navIns = index
				this.stopLoadMore = false
				this.page = 1
				this.type = this.navList[index].id
				this.getCloseMchOrder()
			},
			openModel() {
				this.show_model = true
			},
			closeModel() {
				this.show_model = false
			},
			getCloseMchOrder() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.getApp().request({
					url: this.getApp().api.user.close_mch_order,
					data: {
						type: this.type,
					},
					success: (res) => {
						console.log(res);
						if (res.code == 0) {
							this.pending = res.data.pending
							this.balance = res.data.balance
							this.sales = res.data.sales
							this.detail_sales = res.data.detail_sales
							this.warn = res.data.warn
							this.loadList = res.data.list
							let mch_level = res.data.mch_level // 1不显示亲团分成  2显示亲团分成
							if (mch_level == 1) {
								this.navList = [{
										id: 1,
										name: '自营店铺'
									},
									{
										id: 2,
										name: '全网省'
									},
									{
										id: 3,
										name: '协作收益'
									}
								]
							} else {
								this.navList = [{
										id: 1,
										name: '自营店铺'
									},
									{
										id: 2,
										name: '全网省'
									},
									{
										id: 3,
										name: '协作收益'
									},
									{
										id: 4,
										name: '亲团分成'
									},
								]
							}
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					},
					complete: _ => {
						uni.hideLoading()
					}
				})
			}
		},
		onReachBottom() {
			var self = this;
			var page = self.page;
			var data = {
				type: this.type
			};
			var url = this.getApp().api.user.close_mch_order;
			this.getApp().core.pading(self, url, data, function(res) {
				if (res.data.list.length == 0) {
					self.setData({
						stopLoadMore: true
					});
					return;
				}

				var newActList = res.data.list;
				console.log(newActList);
				var nowActList = self.loadList.concat(newActList);
				self.loadList = nowActList
			});
		},
	}
</script>

<style>
	.page-main {
		padding: 24rpx;
	}

	.total-box {
		width: 100%;
		padding: 0 24rpx;
		background: #fff;
		border-radius: 30rpx;
	}

	.total-header {
		padding-top: 33rpx;
		padding-bottom: 31rpx;
		border-bottom: 1rpx solid rgba(158, 158, 158, 0.3);
	}

	.total-main {
		padding: 29rpx 98rpx 51rpx;
	}

	.nav-active {
		position: absolute;
		left: 50%;
		margin-left: -34rpx;
		width: 68rpx;
		height: 6rpx;
		background: #8714EE;
		border-radius: 3rpx;
		bottom: 0rpx;
	}

	.nav-list {
		padding: 24rpx 0rpx 21rpx;
	}

	.page-list {
		width: 100%;
		background: #fff;
		border-radius: 30rpx;
		overflow: hidden;
		padding: 0 24rpx;
	}

	.list-box {
		padding: 32rpx 0;
		border-bottom: 1rpx solid rgba(158, 158, 158, .1);
	}

	/* 弹窗 */
	.model-lay {
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		bottom: 0rpx;
		right: 0rpx;
		background: rgba(0, 0, 0, .7);
		z-index: 9;
	}

	.model-lay-main {
		width: 580rpx;
		padding: 52rpx 40rpx 30rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
	}

	.model-lay-main-title {
		font-size: 44rpx;
		color: #333333;
		text-align: center;
		font-weight: bold;
	}

	.model-lay-main-text {
		line-height: 40rpx;
	}

	.model-lay-main-btn {
		width: 500rpx;
		height: 88rpx;
		line-height: 88rpx;
		background: #FF401A;
		box-shadow: 0rpx 7rpx 16rpx 0rpx rgba(255, 69, 32, 0.55);
		border-radius: 44rpx;
		font-size: 32rpx;
		color: #fff;
		text-align: center;
		margin-top: 73rpx;
	}
</style>
