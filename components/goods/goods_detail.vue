<template>
	<view class="goods-detail-content">
		<view class="goods-detail-nav flex" :style="'top:' + customBar + 'px'" v-if="role_ == 'shoper' && material.length>0">
			<view :class="'fs-30 ns-text-bold pr ' + (navIns == index?'color-2C2C2C':'color-8D8D8D')" style="margin-right: 48rpx;"
			 v-for="(item,index) in navList" :key="index" @click="changeNav(index)">
				<view>{{item.name}}</view>
				<view class="nav-line" v-if="navIns == index"></view>
			</view>
		</view>
		<view class="goods-detail-body">
			<view v-show="navIns == 0">
				<jyf-parser v-if="article_detail" :html="article_detail"></jyf-parser>
				<view v-if="tkGoods && tkGoods.length>0">
					<image :lazy-load="true" @tap="see_img(index,tkGoods)" v-for="(item,index) in tkGoods" :key="index" :src="item"
					 mode="widthFix" style="font-size: 0 !important;width: 100%;height: auto;line-height: 0 !important;display: block;margin-top: -1rpx;"></image>
				</view>
			</view>
			<view v-show="navIns == 1" class="goods-material">
				<view v-if="material.length > 0" class=" pr-24 pb-24">
					<view class="flex mb-30" v-for="(item,index) in material" :key="index">
						<image class="material_headimg" mode="aspectFill" style="width: 80rpx;height: 80rpx;border-radius: 50%;background-color: #FFFFFF;"
						 :src="headimg"></image>
						<view class="material_text" v-if="item.type == 'text'">
							<!-- {{item.content}} -->
							<rich-text :nodes="item.content"></rich-text>
						</view>
						<image v-else-if="item.type == 'image'" class="ml-24" :src="item.content" mode="aspectFill" style="width: 300rpx;height: 300rpx;border-radius: 8rpx;background-color: #FFFFFF;"></image>
						<video controls v-else-if="item.type == 'video'" :show-center-play-btn="true" class="ml-24" :src="item.content"
						 mode="aspectFill" style="width: 426rpx;height: 250rpx;border-radius: 8rpx;background-color: #FFFFFF;"></video>
						<view class="ml-24" style="align-self: center;">
							<view v-if="item.type != 'text'" class="flex flex-y flex-x-center flex-y-center" @click="less(savePhotoThrottle,item.content)">
								<view class="iconfont icon-xiazai11" style="width: 60rpx;height: 60rpx;background: rgba(37, 37, 37, 0.64);border-radius: 50%;font-size: 38rpx;text-align: center;line-height: 60rpx;color: #FFFFFF;">
								</view>
								<text style="font-size: 24rpx;color: #595959;line-height: 34rpx;">下载</text>
							</view>
							<view v-else class="flex flex-y flex-x-center flex-y-center" @tap="mycopy(item.content)">
								<view class="iconfont icon-copy" style="width: 60rpx;height: 60rpx;background: rgba(37, 37, 37, 0.64);border-radius: 50%;font-size: 38rpx;text-align: center;line-height: 60rpx;color: #FFFFFF;">
								</view>
								<text style="font-size: 24rpx;color: #595959;line-height: 34rpx;">复制</text>
							</view>
						</view>
					</view>
				</view>
				<view v-else class="flex-y-center flex-x-center" style="height: 100%;">
					<view class="text-center fs-28 color-8D8D8D">
						<view class="iconfont icon-kongbaiye1" style="font-size: 400rpx;"></view>
						<view style="line-height: 53rpx;">
							<view>商品小伙伴们</view>
							<view>正在快马加鞭的准备素材</view>
							<view>让你能为顾客提供更全面的服务</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 相关推荐 -->
		<view class="p-24" v-show="navIns == 0">
			<view v-if="linkGoods&&linkGoods.length>0" class="flex-x-center pr" style="margin-bottom: 38rpx;">
				<view class=" fs-30 color-333333 ns-text-bold">大家都在看</view>
				<view class="under-line"></view>
			</view>
			<view class=" flex ns-wrap justify-between">
				<view v-for="(item, index) in linkGoods" :key="index" class="fs-24 pb-20" style="width: 340rpx;" @tap="goGoods"
				 :data-id="item.id">
					<image style="width: 340rpx;height: 340rpx;border-radius: 20rpx;" :src="item.cover_pic"></image>
					<view class=" pt-20 ns-text-limit  fs-28 color-333333">
						{{item.name}}
					</view>
					<view class="ns-flex ns-justify-content-space-between align-center">
						<view class="fs-28 color-FF0200 ns-text-bold">￥<text class="fs-36">{{filters.priceStr(item.price)[0]}}.</text><text>{{filters.priceStr(item.price)[1]}}</text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList: [{
						id: 0,
						name: '商品详情'
					},
					{
						id: 1,
						name: '推荐素材'
					}
				],
				navIns: 0,
				customBar: getApp().globalData.customBar,
				role: uni.getStorageSync('role'),
				filters: require('../../utils/filters.js'),
				app: getApp().globalData.app, //app环境
				headimg: '',
			}
		},
		watch: {
			material(newValue) {
				if (this.tkGoods.length == 0 && this.material.length > 0 && this.role_ == 'shoper') {
					this.navIns = 1;
				}
			}
		},
		props: {
			//商品详情
			article_detail: {
				type: String,
				default: ''
			},
			//其他商品
			linkGoods: {
				type: Array,
				default: () => {
					return []
				}
			},
			//淘客商品详情
			tkGoods: {
				type: Array,
				default: () => {
					return []
				}
			},
			//推荐素材
			material: {
				type: Array,
				default: () => {
					return []
				}
			},
		},
		created() {
			//获取随机推荐素材头像
			this.getApp().request({
				data: {},
				url: this.getApp().api.taoke.random_headimg,
				success: (res) => {
					if (res.code == 0) {
						// console.log('rrr', res);
						this.headimg = res.data.img || '';
					}
				}

			});
		},
		methods: {
			savePhotoThrottle(e) {
				// uni.saveImageToPhotosAlbum(OBJECT)
				this.downloadFile({
					url: e, //仅为示例，并非真实的资源
					success: (res) => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: _ => {
								uni.showModal({
									content: '已保存到相册，赶紧晒一下吧~',
									showCancel: false,
									confirmText: '知道了',
									confirmColor: '#72B9C3',
									success: (res) => {
										if (res.confirm) {}
									}
								});
							}
						});
					},
					fail: res => {
						this.showToast('下载失败', 1500);
					}
				});
			},
			changeNav(index) {
				this.navIns = index
			},
			goGoods: function(e) {
				var val = e.currentTarget.dataset.id;
				uni.navigateTo({
					url: "/pages/goods/goods?id=" + val
				})
			},
			see_img(src, all) {
				console.log(src)
				uni.previewImage({
					current: src,
					urls: all
				})
			},
		}
	}
</script>

<style scoped>
	.goods-detail-content {
		background: #fff;
	}

	.goods-detail-nav {
		position: sticky;
		top: 0;
		padding: 30rpx 24rpx;
		background: #fff;
		z-index: 8;
	}

	.nav-line {
		position: absolute;
		left: 50%;
		margin-left: -45rpx;
		bottom: -17rpx;
		width: 90rpx;
		height: 10rpx;
		background: #EB0401;
		border-radius: 8rpx;
	}

	.goods-material {
		padding: 30rpx 24rpx;
		min-height: 1000rpx;
		background: #F4F4F4;
	}


	.material_text {
		width: 462rpx;
		border-radius: 8rpx;
		padding: 10rpx 24rpx;
		background-color: #FFFFFF;
		font-size: 28rpx;
		color: #595959;
		line-height: 40rpx;
		margin-left: 20rpx;
		word-wrap: break-word;
		word-break: break-all;
	}
</style>
