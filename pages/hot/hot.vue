<template>
	<view style="background-color: #FFFFFF;">
		<common></common>
		<custom mode="2" :title="title" fixed="fixed" background="#FFFFFF" backColor="#333333" titleColor="#333333"></custom>

		
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
				title: '',
				type: 'jingdong',
				cats: '', ///////////////
				goods: [],
				page: 1,
				filters: require('../../utils/filters.js'),
				show: false,
				jingdong: {
					'collage': this.getApp().api.taoke.tk_goods, //现实抢购
					'goodShop': this.getApp().api.taoke.tk_goods, //品牌有券
					'nineSift': this.getApp().api.taoke.tk_goods, //9.9包邮
					'jdMarket': this.getApp().api.taoke.tk_goods, //京东超市
					'pank': this.getApp().api.taoke.tk_tops, //实时榜单
				},
				role: uni.getStorageSync('role'),
			}
		},
		components: {
			goodsAll
		},
		onLoad(e) {
			uni.hideShareMenu();
			// console.log('e', e);
			this.getApp().page.onLoad(this, e);
			setTimeout(() => {
				this.show = true
			}, 2000)
			if (e.title)
				this.title = e.title;
			else this.title = '推荐';
			if (e.type)
				this.type = e.type;
			if (e.cats)
				this.cats = e.cats;

			this.get_goods();

		},
		methods: {
			get_goods() {
				uni.showLoading({
					title: '请求商品列表中',
					mask: false
				});
				let data = {
					type: this.type == 'taobao' ? 12 : 22,
					page: this.page,
					pagesize: 10,
					eliteId: this.cats, //关键
				};
				let api = this.jingdong[this.cats];
				if (!api)
					return;
				this.getApp().request({
					data: data,
					url: api,
					success: (res) => {
						// console.log('goods',res.data.result.data);
						// console.log('goods', res.data.result.data);
						let data = [];
						if (res.data && res.data.good_list instanceof Array) {
							data = res.data.good_list;
						}
						if (res.data && res.data instanceof Array) {
							data = res.data;
						}
						if (res.data && res.data.result && res.data.result.data && res.data.result.data instanceof Array) {
							let arr = res.data.result.data.map(val => {
								val.desc = val.circle_content;
								val.commission = '';
								return val;
							})
							data = arr;
						}
						if (res.code == 0) {
							this.goods = data || [];
						}
					},
					complete: res => {
						uni.hideLoading();
					}
				});
			},
			toPage(url) {
				uni.navigateTo({
					url: url
				})
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
				page: this.page,
				type: this.type == 'taobao' ? 12 : 22,
				pagesize: 10,
				eliteId: this.cats, //关键
			};
			let api = this.jingdong[this.cats];
			if (!api)
				return;
			this.getApp().core.pading(this, api,
				data, (res, index) => {
					uni.hideLoading();
					if (res.code == 0) {
						// let data = res.data.data || [];
						let data = [];
						if (res.data && res.data.good_list instanceof Array) {
							data = res.data.good_list;
						}
						if (res.data && res.data instanceof Array) {
							data = res.data;
						}
						if (res.data && res.data.result && res.data.result.data && res.data.result.data instanceof Array) {
							let arr = res.data.result.data.map(val => {
								val.desc = val.circle_content;
								val.commission = '';
								return val;
							})
							data = arr;
						}
						// console.log(data);
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
				title = res.target.dataset.title;
				id = res.target.dataset.id;
				img = res.target.dataset.img;
				return {
					title: decodeURI(title),
					path: '/pages/goodsTK/goodsTK?type=' + (this.type == 'taobao' ? 'taobao' : 'jingdong') + '&id=' + id + '&mch_id=' +
						(uni.getStorageSync('_mchInfo').id || ''),
					imageUrl: img,
				}
			}

			return {
				path:'/pages/hot/hot?' + 'mch_id=' + (uni.getStorageSync('_mchInfo').id || '')
			}
		}
	}
</script>

<style lang="scss">
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
			color: #FF5500;
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
