<template>
	<view class="main">
		<custom mode="1" fixed="fixed" background="#fff" backColor="#333" titleColor="#333">
			<view slot='slot1'>
				<view class="search-box flex align-center">
					<view class="iconfont icon-sousuo flex-grow-0" style="color: #616161;opacity: 0.4;margin-right: 14rpx;"></view>
					<input class="fs-24 color-999999 flex-grow-1" type="text" :value="searchValue" placeholder="外套" />
				</view>
			</view>
		</custom>
		<view class="guang-nav-list flex ns-justify-content-space-between" :style="'padding:0rpx 0rpx 0 24rpx;top:' + top + 'px'">
			<view style="width: 66%;">
				<!-- :scroll-into-view="toview" -->
				<view class="flex align-center">
					<view style="margin-right:10rpx" :class="'pr nav-tab ns-flex-shrink-no ' + (chooseIns==0?'color-333333':'')">
						<view class="color-333333" @tap.stop="showChange1">全部品类
							<text :class="'iconfont icon-xiangxia-copy  ' + (showChangeMore?'change':'')" style="display:inline-block;transition:all 0.3s;"></text>
						</view>
					</view>
					<scroll-view class="check-scroll" style="width:400rpx;" scroll-x>
						<view v-for="(value, index) in catsArr" :key="index" :class="'more-list  ' + (value.checked?'more-active':'')"
						 @tap="changeNav" v-if="value.checked" :data-num="index" :data-index="value.id" :data-text="value.catsName" style="float:none;"
						 enable-flex="true">{{value.catsName}}
							<text class="iconfont icon-guanbi2 fs-20"></text>
						</view>
					</scroll-view>

				</view>
			</view>
			<view class="flex align-center">
				<view class="flex ml-20 align-center color-333333" @tap="commissionSort" v-if="role == 'shoper'">
					<view>佣金</view>
					<view class="ml-10 fs-40 color-D6D6D6">
						<text v-if="commissionDefault" class="iconfont icon-paixu"></text>
						<text v-else :class="'iconfont color-F49E3A ' + (commissionUp?'icon-asc':'icon-shengxu')"></text>
					</view>
				</view>
				<view class="flex ml-20 align-center color-333333" @tap="priceSort">
					<view>价格</view>
					<view class="ml-10 fs-40 color-D6D6D6">
						<text v-if="priceDefault" class="iconfont icon-paixu"></text>
						<text v-else :class="'iconfont color-F49E3A ' + (priceUp?'icon-asc':'icon-shengxu')"></text>
					</view>
				</view>
			</view>

		</view>
		<!-- 占位 -->
		<view style="height: 88rpx;background: #000000;"></view>
		<!-- 多选....................................................... -->
		<view class="more1" v-if="showChangeMore" @tap.stop="closeChange" catchtouchmove="preventTouchMove"
		 @touchmove.stop.prevent="stop">
			<view class="more-content" :style="'margin-top:'+margin_top">
				<!--  more-active -->
				<view v-for="(value, index) in catsArr" :key="index" :class="'more-list ' + (value.checked?'more-active':'')"
				 @tap.stop="changeNav" :data-num="index" :data-index="value.id" :data-text="value.catsName">{{value.catsName}}
				</view>

			</view>
		</view>
		<!-- 商品区 -->
		<view class="goods-list flex ns-wrap ns-justify-content-space-between pr">
			<navigator v-for="(item, index) in goodList" :key="index" :url="'/pages/goods/goods?id=' + item.id" class="goods mb-20 bg-white">
				<view class="yyyy">
					<view style="width: 340rpx;height: 340rpx;position: relative;">
						<image style="width: 340rpx;height: 340rpx;background: #ccc;border-radius: 20rpx;" mode="aspectFill" :src="item.first_cover_pic"></image>
						<view v-if="item.goods_num==0" class="nonum-tip">
							已抢光
						</view>
					</view>

					<view class="goods-msg">
						<view class="goods-msg-title">{{item.name}}</view>
						<view class="fs-28 flex justify-between align-center">
							<view class="flex align-center">
								<view class="fs-28 color-FF0200 ns-text-bold">￥
									<text class="fs-36">{{filters.priceStr(item.price)[0]}}.</text>
									<text>{{filters.priceStr(item.price)[1]}}</text>
								</view>
								<!-- <view class="color-8D8D8D ns-text-through ml-16">¥ {{item.original_price}}</view> -->
							</view>
							<view class="add-cart-icon fs-26 iconfont color-fff icon-gouwuche_weixuanzhong" style="width: 40rpx;height: 40rpx;line-height: 40rpx;"
							 @tap.stop="openCart" :data-id="item.id" :data-index="index"></view>

						</view>
					</view>
				</view>
			</navigator>
			<view class="mt-24 p-24" v-if="list.length > 0">
				<view class="flex-x-center pr">
					<view>更多活动</view>
					<view class="under-line"></view>
				</view>
				<view v-for="(acitivity, index) in list" :key="index">
					<view v-for="(item, index2) in acitivity" :key="index2" class="bg-white mb-20" style="border-radius: 20rpx;" v-if="item.banner!=null">
						<!-- 单品牌内容 -->
						<!-- 品牌名字 -->
						<view style="padding: 25rpx 24rpx;">
							<navigator :url="'/pages/activity/activity?aid=' + item.id" class="flex ns-justify-content-space-between"
							 hover-class="none">
								<view class="flex" style="width: 85%;">
									<image lazy-load="true" style="width: 100rpx;height: 100rpx;border-radius: 20rpx;box-shadow: 0rpx 3rpx 10rpx #888888;"
									 mode="aspectFit" :src="item.banner"></image>
									<view class="ml-30 flex1">
										<view class="fs-36 color-333333">{{item.name}}</view>
										<view class="fs-24 color-999999 ns-text-limit flex mt-10" style="width: 400rpx;">
											<view v-for="(value, index) in item.cats" :key="index" class="flex mr-10 align-center">
												<view>{{value}}</view>
												<view class="ml-10" style="border-right: 1rpx solid #999999;height: 25rpx;"></view>
											</view>
										</view>
									</view>
								</view>
								<view class="flex ">
									<view style="margin-right: 12rpx;color:#999999;font-size:18rpx">更多
										<text class="iconfont icon-jinru color-fff ml-10" style="border-radius: 50%;background:linear-gradient(-90deg,rgba(255,152,2,1),rgba(255,201,1,1));;width: 20rpx;height: 20rpx;font-size: 20rpx;text-align: center;"></text>
									</view>

								</view>
							</navigator>

						</view>
						<!-- 品牌商品 -->
						<view class="flex " style="padding: 0rpx 24rpx 20rpx; ">
							<scroll-view scroll-x="true">
								<view class="flex">
									<navigator v-for="(item, index) in item.goods" :key="index" :url="'/pages/goods/goods?id=' + item.id" style="width: 200rpx;margin-right: 16rpx;"
									 :data-id="item.goods_id">
										<view style="position: relative;width: 180rpx;height: 180rpx;">
											<image lazy-load="true" mode="aspectFill" src style="background: #ccc;width: 180rpx;height: 180rpx;position: relative;border-radius: 20rpx;"></image>
											<view class="sell-up " v-if="item.num==0">
												<view>已抢光</view>
												<view class="line"></view>
												<view style="font-size: 17rpx;">sold out</view>
											</view>
										</view>
										<view class="text-more-1 fs-24 color-333333 mt-15">{{item.name}}</view>
										<view class="miaosha_price m-10 flex align-center" style="font-size:20rpx;">
											<view class=" color-FF0200 ns-text-bold">￥
												<text class="fs-26">{{filters.priceStr(item.price)[0]}}.</text>
												<text>{{filters.priceStr(item.price)[1]}}</text>
											</view>
										</view>

									</navigator>

								</view>
							</scroll-view>

						</view>
					</view>
				</view>
			</view>
			<view class="flex-x-center color-8D8D8D ns-padding-bottom-sm" style="width:100%;text-align: center;" v-if="is_no_more">没有更多啦~</view>
			<!-- </scroll-view> -->
		</view>
	</view>
</template>

<script>
	import custom from '@/components/custom/custom.vue'
	export default {
		data() {
			return {
				priceDefault: true,
				commissionDefault: true, // 佣金排序
				commissionUp: true, // 佣金
				priceUp: true,
				showChangeMore: false,
				cat_id: '',
				filters: require('../../utils/filters.js'),
				role: uni.getStorageSync('role')
			}
		},
		props: {
			activity_id: {
				type: Number,
				default: 0
			},
			goodList: {
				type: Array,
				default: function() {
					return {}
				}
			},
			top: {
				type: String,
				default: ''
			},
			margin_top: {
				type: String,
				default: ''
			},
			catsArr: {
				type: Array,
				default: function() {
					return {}
				}
			},

		},
		components: {
			custom
		},
		methods: {
			//多选关闭
			showChange1: function() {
				this.setData({
					showChangeMore: !this.showChangeMore
				});

			},
			changeNav(e) {
				this.$emit('changeNav', e)
			},
			closeChange: function() {
				this.setData({
					showChangeMore: false,
				});
			},
			// 佣金
			commissionSort: function() {
				//多选关闭
				this.setData({
					showChangeMore: false,
				});
				let self = this;
				var up = self.commissionUp;
				self.setData({
					priceDefault: true,
					commissionDefault: false,
					commissionUp: !up
				});
				this.$emit('commissionSort')
			},
			// 价格排序
			priceSort: function() {
				//多选关闭
				this.setData({
					showChangeMore: false,
				});
				let self = this;
				var up = self.priceUp;
				self.setData({
					priceDefault: false,
					commissionDefault: true,
					priceUp: !up
				});
				this.$emit('priceSort')
			},
		}
	}
</script>

<style scoped>
	.search-box {
		width: 465rpx;
		height: 60rpx;
		background: #F4F4F4;
		border-radius: 30rpx;
		padding: 0rpx 24rpx;
	}

	.guang-nav-list {
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		overflow: hidden;
		color: #999;
		background: #fff;
		font-size: 30rpx;
		z-index: 9;
	}

	.nav-tab {
		padding: 25rpx 0rpx;
		font-size: 30rpx;
		margin-right: 47rpx;
	}

	.change {
		transform: rotate(180deg);

	}

	.check-scroll {
		white-space: nowrap;
		height: 80rpx;
		padding-top: 15rpx;
	}

	.check-scroll>view {
		margin-bottom: 0;
		display: inline-block;
		white-space: nowrap;
	}

	.more1 {
		width: 750rpx;
		height: 180vh;
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		overflow: hidden;
	}
</style>
