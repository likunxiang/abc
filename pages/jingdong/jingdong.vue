<template>
	<view style="background-color: #FFFFFF;">
		<common></common>
		<custom mode="2" title="全网省·京东" fixed="fixed" background="#FFFFFF" backColor="#333333" titleColor="#333333"></custom>
		<!-- 头部图片 -->
		<view v-if="false" style="width: 100%;height: 350rpx;overflow: hidden;background-color: #f8f8f8; position: relative;">
			<image :src="background" mode="scaleToFill" style="width: 100%;height: 100%;"></image>
			<view class="seach_box" style="width: 702rpx;height: 80rpx;position: absolute;margin-left: 24rpx;bottom: 86rpx;">
				<view class="flex flex-1 flex-y-center" style="height: 80rpx;border-radius: 40rpx;background-color: #FFFFFF;">
					<text class="iconfont icon-sousuo " style="color: #999999;padding-left: 23rpx;font-size: 30rpx;"></text>
					<input class="flex-1  fs-30" v-model="keyword" style="height: 80rpx;padding-left: 12rpx;padding-right: 12rpx;"
					 type="text" placeholder="请输入关键词" @confirm="seach" />
					<text @click="seach" class="flex flex-x-center flex-y-center fs-30" style="background-color:#F23005;width: 118rpx;height: 70rpx; border-radius: 35rpx;color: #FFFFFF;margin-right: 5rpx;">搜索</text>
				</view>
			</view>
		</view>
		<view class="seach_box" style="width: 702rpx;position: relative;margin-left: 24rpx;padding-top: 20rpx;">
			<view class="flex flex-1 flex-y-center" style="height: 70rpx;border-radius:35rpx;background-color: #F4F4F4;">
				<text class="iconfont icon-sousuo " style="color: #999999;padding-left: 23rpx;font-size: 30rpx;"></text>
				<input class="flex-1  fs-26" v-model="keyword" style="height: 70rpx;padding-left: 12rpx;padding-right: 12rpx;" type="text"
				 placeholder="请输入关键词" @confirm="seach" />
				<text @click="seach" class="flex flex-x-center flex-y-center fs-30" style="background-color:#F23005;width: 118rpx;height: 60rpx; border-radius: 30rpx;color: #FFFFFF;margin-right: 5rpx;">搜索</text>
			</view>
		</view>
		<!-- tab栏位 -->
		<view class="tabs" style="width: 100%; overflow-x: scroll;height: 77rpx;padding-left: 24rpx;" :style="{'top': customBar + 'px'}">
			<view class="tablist" style="width: auto;white-space: nowrap;height: 77rpx;font-size: 30rpx;">
				<view @click="change_nav(index,item.cid)" class="tabitem" :class="{'active':index==nav_index}" v-for="(item,index) in navs"
				 :key="index" style="display: inline-block;margin-right: 59rpx;line-height: 77rpx;">
					{{item.cname}}
				</view>
			</view>
		</view>
		<!-- 商品部分 -->
		

		<goods-all :list="goods" type="jingdong"></goods-all>
		<view class="footer-text" v-if="goods.length == 0 && show">
			已经浏览完了，去看看别的
		</view>
	</view>
</template>

<script>
	let utils = require('../../utils/util.js');
	import goodsAll from '@/components/goodsAll.vue';
	export default {
		data() {
			return {
				customBar: getApp().globalData.customBar,
				navs: [],
				goods: [],
				keyword: "",
				order: "", //排序
				price_start: '', //最低价
				price_end: '', //最高价
				page: 1,
				filters: require('../../utils/filters.js'),
				nav_index: 0,
				cid: '',
				show: false,
				background: '',
				role: uni.getStorageSync('role'),
			};
		},
		components: {
			goodsAll
		},
		onLoad(e) {
			this.getApp().page.onLoad(this, e);
			setTimeout(() => {
				this.show = true
			}, 2000)

			this.get_navs();

			this.get_goods();
		},
		methods: {
			toPage(url) {
				uni.navigateTo({
					url: url
				})
			},
			//获取分类
			get_navs() {
				this.getApp().request({
					data: {
						type: 22,
					},
					url: this.getApp().api.taoke.tk_navs,
					success: (res) => {
						// console.log('navs',res);
						if (res.code == 0) {
							res.data.result.data.unshift({
								cid: '',
								cname: '推荐'
							});
							this.navs = res.data.result.data || [];
						}
					}
				});
			},
			//获取商品
			get_goods() {
				uni.showLoading({
					title: '请求商品列表中',
					mask: false
				});
				let data = {
					cids: this.cid || "",
					sortName: 'finally',
					//排序字段：finally券后价；brokerage佣金比例；sale折扣力度；OrderCount30Days 30天引入订单量；inOrderComm30Days 30天支出佣金；getCouponNum领券量；comments评论数；goodComments好评数
					sort: this.order, //asc,desc升降序
					price_start: '', //最低价
					price_end: '', //最高价
					keyword: this.keyword || "",
					page: this.page,
					type: 22,
					page_size:10
				};
				this.getApp().request({
					data: data,
					url: this.keyword.trim() ? this.getApp().api.taoke.tk_seach : this.getApp().api.taoke.tk_goods,
					url:this.getApp().api.taoke.tk_goods,
					success: (res) => {
						// console.log('goods',res.data.result.data);
						if (res.code == 0) {
							this.background = (res.data && res.data.imgs && res.data.imgs.background) || '';
							this.goods = res.data.good_list || res.data || [];
							// this.goods = res.data.good_list  || [];
						}
					},
					complete: res => {
						uni.hideLoading();
					}
				});
			},
			//点击分类查询
			change_nav(index, cid) {
				uni.pageScrollTo({
					scrollTop: 0
				})
				this.nav_index = index;
				this.cid = cid;
				this.page = 1;
				this.is_no_more = false;
				this.stopLoadMore = false;
				this.keyword = "";



				this.get_goods();
			},
			//搜索
			seach() {
				if (this.login())
					return;
				this.page = 1;
				this.is_no_more = false;
				this.stopLoadMore = false;
				this.nav_index = 0;
				this.cids = '';


				this.get_goods();
			},
			login() {
				if (!uni.getStorageSync('ACCESS_TOKEN')) {
					this.$store.commit('vuexSet', {
						name: 'show_loginTpl',
						value: true
					}); //未登录
					return true;
				}
				return false;
			},
			copy(discount_link, id) {

				this.getApp().request({
					data: {
						gid: id,
						type: 22
					},
					url: this.getApp().api.taoke.tk_share,
					success: (res) => {
						// console.log('share_url',res);
						if (res.code == 0) {
							// uni.setClipboardData({
							//     data: res.data.result.link,
							//     success: function () {
							//         uni.showToast({
							//         	icon:'none',
							// 			title:"链接复制成功，快去分享吧",
							// 			duration:2500
							//         })
							//     }
							// });
							wx.navigateToMiniProgram({
								appId: 'wx91d27dbf599dff74', //app.json内容
								path: 'pages/union/proxy/proxy?spreadUrl=' + encodeURIComponent(res.data.result.link),
								extraData: {

								},
								envVersion: 'release',
								success(res) {
									// 打开成功
									console.log(res);
									console.log("打开成功")
								}
							})
						}
					}
				});


			},
			download_share: utils.throttle(function(item) {
				//下载

				item = item[0];
				this.getApp().request({
					data: {
						id: item.goods_id,
						type: 'jingdong' || '',
						goods_name: item.goods_name || '',
						price: item.final_price || '', //售价
						original_price: item.goods_price || '', //原价
						cover_pic: item.goods_img || '',
						page_url: 'pages/goodsTK/goodsTk',
					},
					url: this.getApp().api.taoke.tk_qcode,
					success: (res) => {
						console.log('eeeeeeeeeeeeee海报', res)
						if (res.code == 0) {
							if (res.data && res.data.pic_url) {
								this.downloadFile({
									url: res.data.pic_url,
									success: (res) => {
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success: (res) => {
												//console.log('saveImageToPhotosAlbum',res)
												uni.showToast({
													icon: 'none',
													title: '保存成功',
												})
											},
											fail(res) {
												//console.log(res)
												uni.showToast({
													icon: 'none',
													title: '保存失败',
												})
											}
										})
									},
									fail: (res) => {
										uni.showToast({
											icon: "none",
											title: '下载失败'
										});
									}
								});
							}
						}
					}
				});


			}),
		},
		onReachBottom() {
			uni.showLoading({
				title: '请求商品列表中',
				mask: false
			});
			let data = {
				cid: this.cid || "",
				sortName: 'finally',
				//排序字段：finally券后价；brokerage佣金比例；sale折扣力度；OrderCount30Days 30天引入订单量；inOrderComm30Days 30天支出佣金；getCouponNum领券量；comments评论数；goodComments好评数
				sort: this.order, //asc,desc升降序
				price_start: '', //最低价
				price_end: '', //最高价
				keyword: this.keyword || "",
				page: this.page,
				type: 22,
			};
			this.getApp().core.pading(this, this.getApp().api.taoke.tk_goods, data, (res, index) => {
				uni.hideLoading();
				if (res.code == 0) {
					let data = res.data.good_list || [];
					if (data.length == 0) {
						this.setData({
							stopLoadMore: true,
							is_no_more: true
						});
						return;
					} else if (data.length > 0) {
						this.goods = this.goods.concat(data);
					}
				}

			});
		},
		onShareAppMessage(res) {
			let title = '';
			let img = '';
			let id = '';
			if (res.from === 'button') { // 来自页面内分享按钮
				// console.log('分享', res)
				title = res.target.dataset.title;
				id = res.target.dataset.id;
				img = res.target.dataset.img;
				return {
					title: decodeURI(title),
					path: '/pages/goodsTK/goodsTK?type=jingdong' + '&id=' + id + '&mch_id=' + (uni.getStorageSync('_mchInfo').id || ''),
					imageUrl: img,
				}
			}
			return {
				page: '/pages/jingdong/jingdong?' + 'mch_id=' + (uni.getStorageSync('_mchInfo').id || '')
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100vh;
		background-color: #F4F4F4;
	}

	.tabs {
		background-color: #FFFFFF;
		/* 吸顶开始 */
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		position: -webkit-sticky;
		/* #endif */
		position: sticky;
		/* top: var(--window-top); */
		z-index: 99;
		top: 0;
		/* 吸顶结束 */
	}

	.tablist {
		font-weight: 500;
		color: #999999;
	}

	.tablist .active {
		position: relative;
		color: #F23005;
	}

	.tablist .active::after {
		content: "";
		position: absolute;
		background-color: #F23005;
		width: 40rpx;
		height: 4rpx;
		background: linear-gradient(90deg, #FE4001, #EB0301);
		border-radius: 2rpx;
		bottom: 1rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	///////////////////////list

	.taolist {
		width: 702rpx;
		margin-left: 24rpx;
		box-sizing: border-box;
	}

	.taolist .list-item {
		display: flex;
		flex-flow: row nowrap;
		// background-color: #fafafa;
		box-sizing: border-box;
		// padding: 16rpx;

		// border-radius: 20rpx;
		margin-top: 24rpx;

		.banner-img {
			width: 250rpx;
			height: 250rpx;
			border-radius: 8rpx;
			// background-color: #FFFFFF;
			background-color: #fafafa;
			// margin-right: 26rpx;
		}

		.right {
			margin-left: 26rpx;
			flex: 1;
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
		}
	}

	.content-top {
		position: relative;

		.line1 {

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

		}

		.line3-left {
			display: flex;
			flex-flow: row nowrap;
			flex: 1;
			align-items: flex-end;
			color: #FF0200;
			font-size: 26rpx;
			font-weight: bold;
			white-space: nowrap;
			margin-top: 10rpx;

			.t1 {
				font-size: 28rpx;
				font-weight: bold;
				// transform: translateY(-5rpx);
			}

			.t2 {
				font-size: 24rpx;
				font-weight: bold;
				// transform: translateY(-1rpx);
			}

			.t3 {
				font-size: 24rpx;
				text-decoration: line-through;
				color: #999999;
				padding-left: 19rpx;
				font-weight: normal;

			}
		}

		.tao-img {
			// width: 32rpx;
			// height: 32rpx;
			display: block;
			// background-color: red;
			display: inline-block;
			position: absolute;
			color: #F53415;
			top: 4rpx;
			left: 0;
		}

		.line2 {
			font-size: 22rpx;
			line-height: 36rpx;
			margin-top: 10rpx;



			.tie {
				display: inline-block;
				box-sizing: border-box;
				margin-left: 19rpx;
				color: #999999;
				font-size: 24rpx;
			}
		}
	}

	.quan {
		display: inline-block;
		// background-color: #FF5200;
		background: linear-gradient(90deg, #FE7B0F, #FF2800);
		color: #FFFFFF;
		padding: 0 15rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		position: relative;
		font-size: 22rpx;
		line-height: 38rpx;
		margin-top: 40rpx;
	}

	.content-bottom {
		.line3 {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: flex-end;



			.line3-right {
				// width: 94rpx;
				text-align: center;
				display: flex;
				flex-flow: column nowrap;
				justify-content: flex-end;
				align-items: center;

				.top {
					display: inline-block;
					width: 44rpx;
					height: 44rpx;
					line-height: 44rpx;
					background-color: #333333;
					color: #FFFFFF;
					font-size: 38rpx;
					border-radius: 6rpx;
				}

				.bottom {
					margin-top: 11rpx;
					font-size: 24rpx;
					color: #666666;
				}

			}
		}
	}

	.quan::before {
		content: "";
		width: 16rpx;
		// background-color: #F4F4F4;
		background-color: #FFFFFF;
		box-sizing: border-box;
		height: 16rpx;
		// border: 1rpx solid #FF5200;
		position: absolute;
		border-radius: 8rpx;
		z-index: 2;
		left: -9rpx;
		top: 11rpx;
		// border-top-color: #fff;
		// border-left-color: #fff;
		transform: rotate(-45deg);
	}

	.quan::after {
		content: "";
		width: 16rpx;
		// background-color: #F4F4F4;
		background-color: #FFFFFF;
		box-sizing: border-box;
		height: 16rpx;
		// border: 1rpx solid#FF5200;
		position: absolute;
		border-radius: 8rpx;
		z-index: 2;
		top: 11rpx;
		right: -9rpx;
		// border-top-color: #fff;
		// border-left-color: #fff;
		transform: rotate(135deg);
	}

	.footer-text {
		font-size: 24rpx;
		line-height: 120rpx;
		color: #999999;
		text-align: center;
	}




	//////////////////////list
</style>
