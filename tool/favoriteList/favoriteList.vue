<template>
	<view class="page" :style="(tabIns == 0?'background: #fff;':'background: #F4F4F4;')">
		<custom fixed="fixed" title="收藏" mode="2" titleColor="#2C2C2C" btnMode="2" background="#fff" borderColor="rgba(0, 0, 0, 0.08);"
		 backColor="#000000"></custom>
		<view class="nav-box flex">
			<view v-for="(item,index) in tabList" :key="index" class="nav-title pr" @click="changeTab(index)">
				<view :class="(tabIns == index?'ns-text-bold color-2C2C2C':'color-8D8D8D')">{{item.name}}</view>
				<view v-if="tabIns == index" class="nav-active"></view>
			</view>
		</view>
		<!-- 编辑悬浮按钮 -->
		<view :class="is_edit?'edit-btn-box-active flex align-center':'edit-btn-box'">
			<view class="flex align-center" v-if="is_edit">
				<view :class="'iconfont  fs-40 color-fff ' + (all_check?'icon-xuanzhong':'icon-weixuanzhong')" @click="allCheck"></view>
				<view class="color-fff fs-30 ns-text-bold" style="margin-left: 22rpx;white-space: nowrap;">全选</view>
				<view :class="'cancel-favorite ' + (checked_list?'color-EB0401':'color-8D8D8D')" style="margin-left: 60rpx;" @click="cancelFavorite">取消收藏</view>
			</view>
			<view class="edit-btn" @click="editFavorite">{{is_edit?'完成':'编辑'}}</view>
		</view>
		<view class="bg-white" v-show="tabIns == 0">
			<view v-if="favoriteList.length<=0" class="flex-y-center flex-x-center" style="height: 100%;">
				<view class="text-center fs-28" style="color: #DBDBDB;">
					<view class="iconfont icon-kongbaiye1" style="font-size: 400rpx;"></view>
					<view style="line-height: 53rpx;">
						<view>选择喜欢的商品、活动</view>
						<view>添加到收藏</view>
						<view>好货、好价不错过</view>
					</view>
				</view>
			</view>
			<view class="goods_box" v-else>
				<view class="goods_all mt-20 pl-24 pr-24 fs-28 flex align-center" v-for="(item,index) in favoriteList" :key="index"
				 @tap="to_detail(item.goods_origin,item.id)">
					<!-- 选中按钮 -->
					<view :class="'iconfont mr-30 fs-40 ' + (item.checked?'icon-xuanzhong':'icon-weixuanzhong color-8D8D8D')" v-if="is_edit"
					 @click.stop="chooseStatus(index)"></view>


					<view class="left">
						<!-- 图片 -->
						<image :src="item.cover_pic" class="banner" mode="aspectFit"></image>
					</view>
					<view class="right pl-20 flex-1 flex flex-y flex-x-b" style="height: 220rpx;">
						<!-- 商品名 -->
						<view class="name">
							{{item.name || ''}}
							<!-- 小图标 -->
							<image :src="item.logo" class="icon_type" mode=""></image>
						</view>

						<!-- 券后价 -->
						<view class="flex flex-y-end line2" style="width: 100%;">
							<view class="flex flex-y-end text-hidden" style="color: #EB0401;">
								<text style="line-height: 28rpx;">{{'会员价'}} ¥ {{filters.priceStr(xs(item.price,2))[0]}}.</text>
								<text style="font-size: 18rpx;">{{filters.priceStr(xs(item.price,2))[1]}}</text>
							</view>
							<view class="flex flex-y-end text-hidden" style="margin-left: 24rpx;font-weight: normal;">
								<text style="color: #8D8D8D;line-height: 28rpx;">¥ {{filters.priceStr(xs(item.original_price,2))[0]}}.</text>
								<text style="color: #8D8D8D;font-size: 18rpx;">{{filters.priceStr(xs(item.original_price,2))[1]}}</text>
							</view>
						</view>
						<!-- 原价 -->

						<!-- 券  小亲赚-->
						<view class="flex flex-x-b flex-y-end line4">
							<view class="flex">
								<text>{{' '}}</text>
								<text class="quan1" v-if="item.discount_price && item.discount_price > 0">券<text class="quan_num">25元</text></text>
								<text class="zhuan" v-if="role_ == 'shoper'  && commission_show && item.commission">赚<text class="zhuan_num">{{xs(item.commission,2)}}</text></text>
							</view>

						</view>
						<view class="flex flex-x-b flex-y-end line4">
							<view class="flex-1">
								<view class="fs-24 color-489A19" v-if="item.activity_start_time">{{item.activity_start_time}}</view>
							</view>
							<view @tap.stop="delFavoriteGoods(item.id,item.goods_origin)" class="fs-24" style="color:#EB0401;text-decoration: underline;">
								删除
							</view>
							<button @tap.stop="" style="margin-left: 30rpx;" class="share" data-type="goods" open-type="share" :data-title="item.name"
							 :data-origin="item.goods_origin" :data-id="item.id" :data-img="item.cover_pic">分享</button>
						</view>
					</view>
				</view>
			</view>
			<pageFooter v-if="favoriteList.length>0 "></pageFooter>
		</view>
		<view class="brand-list" v-show="tabIns == 1">
			<view v-if="brandList.length<=0" class="flex-y-center flex-x-center" style="height: 100%;">
				<view class="text-center fs-28" style="color: #DBDBDB;">
					<view class="iconfont icon-kongbaiye1" style="font-size: 400rpx;"></view>
					<view style="line-height: 53rpx;">
						<view>选择喜欢的商品、活动</view>
						<view>添加到收藏</view>
						<view>好货、好价不错过</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="mb-16 ns-bg-white mb-20" v-for="(brand,index) in brandList" :key="index">
					<view @tap="goBrand" :data-brandid="brand.id" class="ns-padding-sm ns-flex ns-justify-content-space-between">
						<view class="ns-flex flex-grow-1">
							<view class="flex-grow-0">
								<image style="width:100rpx;height:100rpx;border-radius: 12rpx;box-shadow: 0rpx 8rpx 10rpx #F4F4F4;" :src="brand.img"
								 mode="aspectFit"></image>
							</view>
							<view class="flex-grow-1" style="margin-left: 24rpx;">
								<view class="flex align-center justify-between">
									<view class="fs-30 color-2C2C2C ns-text-bold">{{brand.name}}</view>
									<view class="flex">
										<button @tap.stop="" data-type="brand" open-type="share" class="nav-to-more mr-30" :data-id="brand.id">分享</button>
										<view class="nav-to-more">更多</view>
									</view>
								</view>
								<view class="ns-text-smblack ns-text-xs ns-margin-top-sm ns-text-limit fs-24 color-8D8D8D" style="margin-top: 10rpx;">{{brand.desc}}</view>
							</view>
						</view>

					</view>
					<view style="padding: 0 24rpx;padding-bottom: 20rpx;" v-if="brand.goods.length > 0">
						<view class="flex">
							<view v-for="(goods, gIndex) in brand.goods" :key="gIndex" class="order fs-24" :style="(gIndex<2?'margin-right: 21rpx;':'margin-right: 0rpx;')"
							 @tap="goGoods" :data-id="goods.id" v-if="gIndex<3">
								<image class="order-img" :src="goods.cover_pic"></image>
								<view class=" pt-20 ns-text-limit  fs-28 color-595959">
									{{goods.name}}
								</view>
								<view class="ns-flex ns-justify-content-space-between align-center">
									<view class="fs-24 color-EB0401 ns-text-bold">￥<text class="fs-40">{{filters.priceStr(goods.price)[0]}}.</text><text>{{filters.priceStr(goods.price)[1]}}</text></view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<pageFooter v-if="brandList.length>0 "></pageFooter>
			</view>

		</view>
	</view>
</template>

<script>
	import custom from '@/components/custom/custom.vue'
	import pageFooter from '@/components/common/footer.vue'
	export default {
		data() {
			return {
				tabList: [{
					id: 0,
					name: '商品'
				}, {
					id: 1,
					name: '品牌'
				}, ],
				tabIns: 0,
				favoriteList: [],
				brandList: [],
				filters: require('../../utils/filters.js'),
				is_edit: false,
				checked_list: false, // 取消按钮控制
				all_check: false,
				stopLoadMore: false,
				page: 1
			}
		},
		components: {
			custom,
			pageFooter
		},
		onLoad() {
			uni.hideShareMenu()
			this.getFavoriteList()
		},
		methods: {
			goBrand: function(e) {
				uni.navigateTo({
					url: "/pages/brand/brand?brand_id=" + e.currentTarget.dataset.brandid
				})
			},
			goGoods: function(e) {
				uni.navigateTo({
					url: "/pages/goods/goods?id=" + e.currentTarget.dataset.id
				})
			},
			to_detail(type, id) {
				let app = getApp().globalData.app
				let url = ''
				if (type == 1) {
					url = '/pages/goods/goods?id=' + id
					this.toPage(url)
					return
				}
				let org = type == 2 ? 'taobao' : 'jingdong'
				url = '/pages/goodsTK/goodsTK?type=' + org + '&id=' + id
				this.toPage(url)

			},
			// 单个选中或取消
			chooseStatus(index) {
				// let favoriteList = this.favoriteList
				console.log(this.favoriteList[index].checked);
				this.favoriteList[index].checked = !this.favoriteList[index].checked
				this.favoriteList = this.favoriteList.concat()
				this.checkCancelBtn()
				let true_length = 0
				for (let i in this.favoriteList) {
					if (this.favoriteList[i].checked == true) {
						true_length++
						if (true_length == this.favoriteList.length) {
							this.all_check = true
						}
					} else {
						this.all_check = false
					}
				}

			},
			allCheck() {
				this.all_check = !this.all_check
				if (this.all_check) {
					for (let i in this.favoriteList) {
						this.favoriteList[i].checked = true

					}
				} else {
					for (let i in this.favoriteList) {
						this.favoriteList[i].checked = false

					}
				}
				console.log(this.favoriteList);
				this.checkCancelBtn()
				// this.favoriteList = this.favoriteList.concat()
			},
			checkCancelBtn() {
				let false_length = 0
				for (let i in this.favoriteList) {
					if (this.favoriteList[i].checked == true) {
						this.checked_list = true
						return
					} else {
						if (this.favoriteList[i].checked == false) {
							false_length++
							if (false_length == this.favoriteList.length) {
								this.checked_list = false
							} else {
								this.checked_list = true
							}
						}
					}
				}
			},
			changeTab(index) {
				this.tabIns = index
				this.is_edit = false
				this.page = 1
				this.stopLoadMore = false
				if (this.tabIns == 0) {
					this.getFavoriteList()
				} else {
					this.getBrandList()
				}
			},
			editFavorite() {
				if (this.tabIns == 1) {
					uni.navigateTo({
						url: '/pages/brandLike/brandLike'
					})
				} else {
					this.is_edit = !this.is_edit
				}
			},
			cancelFavorite() {
				if (this.checked_list) {
					let goods_ids = []
					for (let i in this.favoriteList) {
						if (this.favoriteList[i].checked == true) {
							goods_ids.push(this.favoriteList[i].id)
						}
					}
					console.log(goods_ids);
					this.batchDelete(goods_ids.toString())
					this.checked_list = false
				} else {
					this.showToast('未选中')
				}
			},
			getBrandList() {
				this.getApp().request({
					url: this.getApp().api.default.collect_brand_list,
					data: {},
					success: res => {
						if (res.code == 0) {
							this.brandList = res.data;
						} else {
							this.showToast(res.msg);
						}
					}
				})
			},
			getFavoriteList() {
				this.getApp().request({
					url: this.getApp().api.default.goods_collect_list,
					data: {},
					success: res => {
						if (res.code == 0) {
							for (let i in res.data) {
								res.data[i].checked = false
							}
							this.favoriteList = res.data;
						} else {
							this.showToast(res.msg);
						}
					}
				})
			},
			delFavoriteGoods(id, origin) {
				uni.showModal({
					title: '确定删除？',
					success:(res) => {
						if(res.confirm) {
							this.getApp().request({
								url: this.getApp().api.taoke.keep_goods,
								method: "POST",
								data: {
									status: 0,
									origin: origin,
									goods_id: id,
								},
								success: res => {
									if (res.code == 0) {
										this.getFavoriteList()
									} else if (res.code == 1) {
										this.showToast(res.msg);
									}
								}
							})
						}
					}
				})
				
			},
			batchDelete(ids) {
				uni.showModal({
					title: '确定删除？',
					success:(res) => {
						if(res.confirm) {
							this.getApp().request({
								url: this.getApp().api.default.collect_batch_delete,
								method: "POST",
								data: {
									status: 0,
									goods_ids: ids,
								},
								success: res => {
									if (res.code == 0) {
										this.getFavoriteList()
									} else if (res.code == 1) {
										this.showToast(res.msg);
									}
								}
							})
						}
					}
				})
			}
		},
		onShareAppMessage(res) {
			let title = '';
			let img = '';
			let id = '';
			let page = '';
			let origin = '';
			if (res.from === 'button') { // 来自页面内分享按钮

				let type = res.target.dataset.type

				if (type == 'goods') {
					origin = res.target.dataset.origin;
					title = res.target.dataset.title;
					id = res.target.dataset.id;
					img = res.target.dataset.img;
					if (origin == 1) {
						page = '/pages/goods/goods?id=' + id + '&mch_id=' + (uni.getStorageSync('_mchInfo').id || '')
					} else {
						if (origin == 2) {
							page = '/pages/goodsTK/goodsTK?type=taobao' + '&id=' + id + '&mch_id=' + (uni.getStorageSync('_mchInfo').id ||
								'')
						}
						if (origin == 3) {
							page = '/pages/goodsTK/goodsTK?type=jingdong' + '&id=' + id + '&mch_id=' + (uni.getStorageSync('_mchInfo').id ||
								'')
						}
					}
					return {
						title: decodeURI(title),
						path: page,
						imageUrl: img,
						mch_id: uni.getStorageSync('_mchInfo').id || ''
					}
				}
				if (type == 'brand') {
					id = res.target.dataset.id;
					title = '这个品牌我收藏好久了～分享给你，快打开看看吧';
					page = "/pages/brand/brand?brand_id=" + id + '&mch_id=' + (uni.getStorageSync('_mchInfo').id || '')
					return {
						title: title,
						path: page,
						imageUrl: uni.getStorageSync('_img').schw,
						mch_id: uni.getStorageSync('_mchInfo').id || ''
					}
				}
				// console.log('分享', res)

			}
		},
		onReachBottom: function() {
			var self = this

			var page = self.page
			var index = page
			var data = {}
			if (this.tabIns == 0) {
				var url = this.getApp().api.default.goods_collect_list
				this.getApp().core.pading(self, url, data, (res) => {
					//console.log('首页上拉',res)
					if (res.data.length == 0) {
						self.setData({
							stopLoadMore: true,
						})
						return
					}
					//var newActList = res.data.data
					var newList = res.data
					var nowList = self.favoriteList.concat(newList)
					self.setData({
						favoriteList: nowList,
					})
				})
			} else {
				var url = this.getApp().api.default.collect_brand_list
				this.getApp().core.pading(self, url, data, (res) => {
					if (res.data.length == 0) {
						self.setData({
							stopLoadMore: true,
						})
						return
					}
					var newList = res.data
					var nowList = self.brandList.concat(newList)
					self.setData({
						brandList: nowList,
					})
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.page {
		min-height: 100%;
	}

	.edit-btn-box {
		position: fixed;
		bottom: 70rpx;
		left: 34rpx;
		width: 90rpx;
		height: 90rpx;
		border-radius: 45rpx;
		transition: width 1s;
		z-index: 1;
		background: transparent;
		overflow: hidden;
	}

	.edit-btn-box-active {
		position: fixed;
		bottom: 70rpx;
		left: 34rpx;
		background: #EB0401;
		width: 90rpx;
		height: 90rpx;
		border-radius: 45rpx;
		width: 498rpx;
		transition: width 1s;
		padding-left: 30rpx;
		z-index: 1;
		overflow: hidden;

		.cancel-favorite {
			width: 150rpx;
			text-align: center;
			height: 54rpx;
			line-height: 54rpx;
			font-size: 28rpx;
			background: #FFFFFF;
			border-radius: 30rpx;
		}
	}

	.edit-btn {

		position: absolute;
		bottom: 0rpx;
		right: 0rpx;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		background: #272727;
		line-height: 90rpx;
		text-align: center;
		font-size: 30rpx;
		color: #fff;
	}

	.nav-box {
		width: 100%;
		background: #F4F4F4;
		box-shadow: 0px 2rpx 2rpx 0px rgba(228, 228, 228, 0.5);

		.nav-title {
			padding: 18rpx 0;
			flex: 1;
			text-align: center;
			font-size: 36rpx;

			.nav-active {
				position: absolute;
				left: 50%;
				margin-left: -35rpx;
				bottom: 0rpx;
				width: 70rpx;
				height: 10rpx;
				background: #EB0401;
				border-radius: 6rpx;
			}
		}
	}

	.goods_box {
		padding-bottom: 20rpx;
		overflow: hidden;

		.left {
			width: 250rpx;
			height: 250rpx;
			overflow: hidden;

			image {
				width: 250rpx;
				height: 250rpx;
				border-radius: 8rpx;
				background-color: rgba(0, 0, 0, 0.1);
				font-size: 0;
				line-height: 0;
			}
		}

		.right {
			position: relative;
			padding-bottom: 0rpx;

			.name {
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
				line-height: 40rpx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
				word-break: break-word;
				position: relative;
				text-indent: 40rpx;
				min-height: 80rpx;
				word-wrap: break-word;
				word-break: break-all;
			}

			.icon_type {
				position: absolute;
				top: 5rpx;
				left: 0;
				// background-color: rgba(0, 0, 0, 0.05);
				width: 30rpx;
				height: 30rpx;
				z-index: 1;
				border-radius: 4rpx;
			}

			.line1 {
				font-size: 24rpx;
				color: #8D8D8D;
				width: 400rpx;

				.pingfen {
					padding: 0 5rpx;
					border-radius: 4rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					line-height: 30rpx;
					background: linear-gradient(146deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
				}

				.rr {
					background: linear-gradient(135deg, #3023AE 0%, #C86DD7 100%);
					-webkit-background-clip: text;
					color: transparent;
					-webkit-text-fill-color: transparent;
					text-fill-color: transparent;

				}

				.ziying {
					padding: 0 5rpx;
					border-radius: 4rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					line-height: 30rpx;
					background: linear-gradient(146deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
				}

				.guoji {
					padding: 0 5rpx;
					border-radius: 4rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					line-height: 30rpx;
					background: linear-gradient(135deg, #3023AE 0%, #C86DD7 100%);
				}

				.haodian {
					padding: 0 5rpx;
					border-radius: 4rpx;
					color: #8F7DDF;
					font-size: 20rpx;
					line-height: 28rpx;
					border: 1rpx solid #8F7DDF;
				}

				.zigong {
					padding: 0 5rpx;
					border-radius: 4rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					line-height: 30rpx;
					background: linear-gradient(146deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
				}
			}

			.line2 {
				color: #EB0401;
				font-size: 24rpx;
				font-weight: bold;

				.min {
					font-size: 18rpx;
					transform: translateY(-6rpx);
				}
			}

			.line3 {
				font-size: 24rpx;
				color: #8D8D8D;

				.min {
					font-size: 18rpx;
					transform: translateY(-3rpx);
				}
			}

			.line4 {
				.quan1 {
					border-radius: 8rpx;
					line-height: 40rpx;
					padding: 0 8rpx;
					background: linear-gradient(135deg, #F76436 0%, #F49E3A 100%);
					margin-right: 10rpx;
					position: relative;
					font-size: 24rpx;
					color: #FFFFFF;

					.quan_num {
						padding-left: 20rpx;
					}

					&::before {
						content: "";
						position: absolute;
						width: 0.5px;
						height: 29rpx;
						left: 39rpx;
						top: 50%;
						transform: translate(0, -50%);
						background-color: #FFFFFF;
						z-index: 2;
						opacity: 0.5;
					}
				}

				.zhuan {
					border-radius: 8rpx;
					line-height: 40rpx;
					padding: 0 8rpx;
					background: linear-gradient(127deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
					margin-right: 10rpx;
					position: relative;
					font-size: 24rpx;
					color: #FFFFFF;

					.zhuan_num {
						padding-left: 20rpx;
					}

					&::before {
						content: "";
						position: absolute;
						width: 0.5px;
						height: 29rpx;
						left: 39rpx;
						top: 50%;
						transform: translate(0, -50%);
						background-color: #FFFFFF;
						z-index: 2;
						opacity: 0.5;
					}
				}

				button {
					margin: 0;
					padding: 0;
					line-height: 30rpx;
					color: #EB0401;
					font-size: 24rpx;
					text-decoration: underline;
					background-color: rgba(0, 0, 0, 0);
				}
			}
		}
	}

	.brand-list {
		background: #F4F4F4;

		.nav-to-more {
			width: 100rpx;
			height: 54rpx;
			text-align: center;
			line-height: 54rpx;
			color: #fff;
			font-size: 30rpx;
			font-weight: 500;
			background: #EB0401;
			border-radius: 30rpx;
			padding-left: 0rpx;
			padding-right: 0rpx;
		}

		.order {
			width: 220rpx;
			margin-right: 21rpx;
		}

		.order-img {
			display: inline-block;
			width: 220rpx;
			height: 220rpx;
		}
	}
</style>
