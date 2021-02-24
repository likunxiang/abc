<template>
	<view class="page">
		<view class="header pr">
			<image :src="bg_more_material" mode="widthFix" style="width: 100%;"></image>
			<button open-type="share" class="share-btn">分享</button>
		</view>
		<!-- v1.12素材推荐 -->
		<view class="p-24">
			<view v-for="(item, id) in newActsList" :key="id">
				<!-- 一行 -->
				<view class="bg-white mb-24" style="border-radius: 20rpx;" v-if="item.out_type == 2">
					<!-- 单品牌内容 -->
					<!-- 品牌名字 -->
					<active :item='item' :goodsList="item.activity_data.goods"></active>
				</view>
				<!-- 单商品 -->
				<view v-if="item.out_type == 1">
					<view>
						<navigator :url="'/pages/goods/goods?id=' + item.out_id" class="goods-box mb-24 bg-white">
							<view class="goods-img pr">
								<!-- <image style="width: 100%;height: 100%;" mode="aspectFill" src="{{item.first_cover_pic}}"></image> -->
								<image style="width: 100%;height: 100%;" mode="aspectFill" :src="item.cover_pic"></image>
								<view class="tips" v-if="item.is_show_icon == 1">{{item.icon_label}}</view>
								<view v-if="item.goods_num==0" class="nonum-tip">已抢光</view>
							</view>
							<view class style="padding: 18rpx 26rpx 25rpx 16rpx;">
								<view>
									<view class="fs-30 color-333333 ns-text-limit2" style="line-height: 42rpx;">{{item.goods_name}}</view>
									<view class="fs-24 color-9B9B9B ns-text-limit2" style="margin-top: 6rpx;" v-if="item.content">
										<rich-text :nodes="item.content"></rich-text>
									</view>
								</view>
								<view class="flex justify-between align-center" style="margin-top: 21rpx;">
									<view class="flex align-center">
										<view class="color-FF343B ns-text-bold">
											<text class="fs-24">¥</text><text style="font-size: 48rpx;">{{filters.priceStr(item.goods_price)[0]}}.</text><text
											 class="fs-24">{{filters.priceStr(item.goods_price)[1]}}</text>
										</view>
										<view class="fs-24 color-9B9B9B ml-10 ns-text-through" style="margin-top: 15rpx;" v-if="item.goods_original_price">¥
											{{item.goods_original_price}}</view>
									</view>
									<!-- <view class="add-cart-icon fs-30 iconfont icon-gouwuche_weixuanzhong color-fff" catchtap="openCart" data-id="{{item.id}}"
													 data-index="{{index}}"></view> -->
									<view class="flex align-center">
										<view class="flex justify-end">
											<navigator :url="'/member/topic/topic?ht_id=' + item.ht_id + '&id=' + item.id" class="material-icon align-center flex-x-center"
											 v-if="item.ht_id > 0" @tap.stop="stop">
												<text class="fs-24">好物说</text>
											</navigator>
										</view>
										<view v-if="role=='shoper'">
											<button open-type="share" class="add-cart-btn color-fff flex align-center ml-30" @tap.stop="stop" v-if="item.share_content"
											 data-type="one_key_share" :data-text="item.share_content" :data-id="item.id" :data-htid="item.ht_id"
											 :data-pic="item.cover_pic">
												<view class="plr-20 fs-24">一键转发</view>
											</button>
											<button open-type="share" class="add-cart-btn color-fff flex align-center ml-30" @tap.stop="stop" v-else
											 data-type="one_key_share" :data-text="item.share_content" :data-id="item.id" :data-htid="item.ht_id"
											 :data-pic="item.cover_pic">
												<view class="plr-20 fs-24">转发</view>
											</button>
										</view>
										<view v-else>
											<navigator class="add-cart-btn color-fff flex align-center ml-30 fs-24 plr-20" :url="'/pages/goods/goods?id=' + item.out_id"
											 @tap.stop="stop">立即抢</navigator>
										</view>
									</view>
								</view>
							</view>
						</navigator>
					</view>
				</view>

				<!-- 话题开始 -->
				<view v-if="item.out_type == 3">
					<topic :item='item'></topic>
				</view>
				<!-- 话题结束 -->
			</view>
		</view>
		<pageFooter></pageFooter>

		<slideIcon :cartNum="cartNum"></slideIcon>

	</view>
</template>

<script>
	import active from '@/components/guanyiguan/active.vue'
	import topic from '@/components/index/topic.vue'
	import slideIcon from '@/components/slideIcon/slideIcon.vue'
	import pageFooter from '@/components/common/footer.vue'
	export default {
		data() {
			return {
				newActsList: [],
				filters: require('../../utils/filters.js'),
				pageName: '',
				cartNum: 0,
				bg_more_material: uni.getStorageSync('_img').bg_more_material
			}
		},
		onLoad(options) {
			this.id = options.id
			this.pageName = options.pageName
			this.getBuyActsList()
			uni.setNavigationBarTitle({
				title: options.pageName
			});
		},
		onShow() {
			this.getCartNum();
		},
		components: {
			active,
			topic,
			slideIcon,
			pageFooter
		},
		onReachBottom() {
			var self = this;
			var page = self.page;
			var data = {
				circleType: self.id
			};
			var url = self.getApp().api.default.buy_acts_list;
			this.getApp().core.pading(self, url, data, function(res) {
				if (res.data.list.length == 0) {
					self.setData({
						stopLoadMore: true
					});
					return;
				}

				var newGoodList = res.data.list;
				var nowGoodList = self.newActsList.concat(newGoodList);
				self.newActsList = nowGoodList
			});
		},
		methods: {
			getBuyActsList() {
				this.getApp().request({
					url: this.getApp().api.default.buy_acts_list,
					data: {
						circleType: this.id
					},
					success: (res) => {
						if (res.code == 0) {
							this.newActsList = res.data.list
						}
					},
				})
			},
			getCartNum: function() {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.cartCount,
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								cartNum: res.data.count
							});
						}
					}
				});
			},
		},
		onShareAppMessage(options) {
			if (options.from == 'button') {
				var type = options.target.dataset.type;
				var mch_id = uni.getStorageSync('_mchInfo').id;
				var user_id = this.getApp().core.getStorageSync('USER_INFO').id;
				if (type === 'one_key_share') {
					var share_title = options.target.dataset.text
					var mrtj_id = options.target.dataset.id
					var ht_id = options.target.dataset.htid
					var img = options.target.dataset.pic
					share_title = share_title.replace(/<(p|div)[^>]*>/gi, '\n').replace(/<br\/?>/gi, '\n').replace(/<[^>/]+>/g, '').replace(
						/(\n)?<\/([^>]+)>/g, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/<\/?(img)[^>]*>/gi, '').replace(
						/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"").replace(
						/<\/?.+?>/g, "")

					return {
						title: share_title,
						path: "/member/topic/topic?ht_id=" + ht_id + "&id=" + mrtj_id + "&user_id=" + user_id + "&mch_id=" +
							mch_id,
						imageUrl: img
					};
				} else {
					console.log(this.pageName);
					var share_title = this.pageName
					return {
						title: share_title,
						path: "/pages/homeGoods/homeGoods?id=" + this.id + "&user_id=" + user_id + "&mch_id=" +
							mch_id,
					};
				}
			} else {
				console.log(this.pageName);
				var share_title = this.pageName
				return {
					title: share_title,
					path: "/pages/homeGoods/homeGoods?id=" + this.id + "&user_id=" + user_id + "&mch_id=" +
						mch_id,
				};
			}
		}
	}
</script>

<style>
	.page {}

	.header {
		width: 750rpx;
	}

	.material-icon {
		height: 56rpx;
		line-height: 54rpx;
		padding: 0rpx 25rpx;
		border: 1rpx solid rgba(255, 64, 26, .5);
		border-radius: 28rpx;
		color: #FF401A;
	}

	.share-btn {
		position: absolute;
		right: 24rpx;
		top: 37rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		background: #FFFFFF;
		box-shadow: 0px 5rpx 10rpx 0px #F23529;
		border-radius: 20rpx;
		color: #EE001F;
		font-size: 24rpx;
	}
</style>
