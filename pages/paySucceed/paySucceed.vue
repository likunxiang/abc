<template>
	<view class="page">
		<view class="header">
			<!-- 标题栏-->
			<view class="con flex justify-between align-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
				<view class="backBtn" @tap="goBack" style="position: fixed;">
					<text class="iconfont icon-zuojiantoubeifen"></text>
				</view>
				<view></view>
				<view></view>
			</view>
			<view class="flex-x-center align-center color-fff">
				<view class="iconfont icon-xuanzhong" style="font-size: 60rpx;"></view>
				<view style="font-size: 40rpx;font-weight: bold;margin-left: 9rpx;">支付成功</view>
			</view>
			<view class="pay-succeed-btn-box flex justify-between color-fff fs-30">
				<navigator url="/pages/guanyiguan/guanyiguan" class="pay-succeed-btn">逛一逛</navigator>
				<navigator url="/pages/order/order?status=1" class="pay-succeed-btn">查看订单</navigator>
			</view>
		</view>
		<view class="main">
			<view class="like-title">- 你可能喜欢 -</view>
			<view class="goods-list clear">
				<navigator v-for="(item, index) in like_list" :key="index" :url="'../goods/goods?id=' + item.id" hover-class="navigator-hover">
					<view class="list-box">
						<image :src="item.cover_pic"></image>
						<view class="list-msg">
							<view class="box-des fs-24 ns-text-limit2">{{item.name}}</view>
							<view class="box-price flex justify-between align-center">
								<view>
									<text class="fs-30 color-FF0200 ns-text-bold">¥ {{item.price}}</text>
									<text class="ns-text-through fs-24 color-999999 ml-16">¥ {{item.original_price}}</text>
								</view>
							</view>
						</view>
					</view>
				</navigator>
			</view>
		</view>
		<to-top :is_top="is_top"></to-top>
		<!-- 红包弹窗 -->
		<redPacket v-show="redStatus<2" :status="redStatus" @closeModel="closeRedModel" :dataInfo="redData"></redPacket>
	</view>
</template>

<script>
	import toTop from '@/components/toTop/toTop.vue'
	import redPacket from '@/components/popWindows/redPacket.vue';
	export default {
		data() {
			return {
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				like_list: [],
				page: 1,
				is_top: false,
				red_id: '',
				redStatus: '-1',
				redData: {}
			}
		},
		components: {
			toTop,
			redPacket
		},
		onLoad(options) {
			console.log(options);
			this.red_id = options.oid
			this.getLikeList()
			this.receiveRed()
		},
		onPageScroll(e) {
			var self = this
			if (e.scrollTop > 200) {
				this.is_top = true;
			} else {
				this.is_top = false;
			}
		},
		onReachBottom() {
			var self = this
			var url = self.getApp().api.default.walk_goods_rec;
			var data = {
				position: 2
			};
			self.getApp().core.pading(self, url, data, function(res, index) {
				if (res.data.list.length == 0) {
					self.setData({
						stopLoadMore: true,
						is_no_more: true
					});
					return;
				}
				var newList = res.data.list
				var nowList = self.like_list
				self.like_list = nowList.concat(newList)
			});
		},
		methods: {
			// 关闭红包
			closeRedModel() {
				this.redStatus = 2;
				console.log(this.redStatus);
			},
			goBack() {
				uni.navigateBack({
					delta: 1,
					fail: res => {
						uni.redirectTo({
							url: '/pages/index/index'
						});
					}
				});
			},
			getLikeList() {
				this.getApp().request({
					url: this.getApp().api.default.walk_goods_rec,
					data: {
						position: 2
					},
					success: (res) => {
						if (res.code == 0) {
							this.like_list = res.data.list
						}
					}
				});
			},
			receiveRed() {
				this.getApp().request({
					url: this.getApp().api.coupon.receive_red_bag,
					data: {
						userId: uni.getStorageSync('USER_INFO').id,
						rel_id: this.red_id,
					},
					success: (res) => {
						console.log(res);
						if(res.code == 0) {
							this.redData = res.data.data
							this.redStatus = res.data.status  //未传accept 情况下是查看，返回 0用户查看待开红包查看成功 1店主查看自己的红包成功 2无法查看 领取情况下，返回 status 10领取成功 11无法领取
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.header {
		width: 750rpx;
		background: linear-gradient(90deg, #FEBA07, #FF9900);
		padding-bottom: 98rpx;
	}

	.con {
		width: 100%;
		top: 0;
		left: 0;
		display: flex;
		padding: 0 24rpx;
	}


	.backBtn {
		font-size: 36rpx;
		display: flex;
		align-items: center;
		height: 100%;
		justify-content: center;
		max-width: 100%;
		color: #FFFFFF;
	}

	.pay-succeed-btn-box {
		padding: 0rpx 123rpx;
		margin-top: 49rpx;
	}

	.pay-succeed-btn {
		width: 222rpx;
		height: 72rpx;
		line-height: 68rpx;
		text-align: center;
		border: 2rpx solid rgba(255, 255, 255, .6);
		border-radius: 35rpx;
	}

	.main {
		margin-top: -48rpx;
		background: #F4F4F4;
		border-radius: 30rpx 30rpx 0px 0px;

		.like-title {
			text-align: center;
			padding: 30rpx 0;
			color: #2C2C2C;
			font-weight: bold;
		}

		.goods-list {
			margin: 0 12rpx;
			padding-bottom: 20rpx;
		}

		.list-box {
			width: 340rpx;
			float: left;
			margin-left: 18rpx;
			margin-bottom: 21rpx;
			background: #fff;
			border-radius: 20rpx;
			overflow: hidden;
		}

		.list-box image {
			width: 340rpx;
			height: 340rpx;
		}

		.list-msg {
			padding: 20rpx 14rpx 29rpx;

			.box-des {
				height: 68rpx;
				margin-top: 13rpx;
			}
		}
	}
</style>
