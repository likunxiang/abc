<template>
	<view>
		<common></common>
		<!-- <custom lineColor="#dcdcdc" borderColor="rgba(220,220,220,0.6)" btnMode="2" backColor="#000000" houseBk="true" mode="2"
		 fixed="fixed" title="京东自营" titleColor="#FFFFFF" :background="'#FFFFFF url(' + init_img.back_color + ') top left / 100% auto  no-repeat'"></custom> -->
		<custom lineColor="#dcdcdc" borderColor="rgba(220,220,220,0.6)" btnMode="2" backColor="#000000" houseBk="true" mode="2"
		 fixed="fixed" title="京东自营" titleColor="#000000" :background="'#FFFFFF'"></custom>

		<view class="flex flex-y-center pt-20 pl-24 pr-24 color-fff" style="background-color: #FFFFFF;">
			<!-- <view :class="{'active1':type == 'jingdong'}" hover-class="click" class="flex align-center flex-x-center fs-30"
			 style="height: 70rpx;border-radius: 8rpx;background-color: #F3F3F3;width:160rpx;color:#595959;font-weight: bold;">
				<text @tap="choose_nav('jingdong')">京东超市</text>
			</view>
			<view :class="{'active1':type == 'taobao'}" hover-class="click" class="flex align-center flex-x-center  fs-30 ml-24"
			 style="height: 70rpx;border-radius: 8rpx;background-color: #F3F3F3;width:160rpx;color:#595959;font-weight: bold;">
				<text @tap="choose_nav('taobao')">天猫国际</text>
			</view> -->
			<view class="flex flex-1 flex-y-center" style="height: 70rpx;background-color: #F4F4F4;border-radius: 8rpx;">
				<text class="iconfont icon-sousuo ml-24" style="color: #4D4D4D;"></text>
				<input v-if="type == 'jingdong'" @blur="seach" placeholder="输入商品关键字" type="text" v-model="keyword" class="flex-1 pl-24 pr-24"
				 style="height: 70rpx;font-size: 30rpx;color: #333333;" />
				<input @tap.stop="less(toPage,'/pages/seachAll/seachAll?type=3&keyword='+keyword)" v-else disabled placeholder="输入商品关键字"
				 type="text" v-model="keyword" class="flex-1 pl-24 pr-24" style="height: 70rpx;font-size: 30rpx;color: #333333;" />
			</view>
		</view>

		<!-- tab栏位 -->
		<view v-if="navs.length>0" class="tabs fs-30" style="width: 100%; overflow-x: scroll;height: 97rpx;padding-left: 24rpx;padding-bottom: 20rpx;"
		 :style="{'top': customBar + 'px'}">
			<view class="tablist" style="width: auto;white-space: nowrap;height: 77rpx;font-size: 30rpx;">
				<view class="tabitem" @tap.stop="choose_cat(index,item.cid)" :class="{'active':index==nav_index}" v-for="(item,index) in navs"
				 :key="index" style="display: inline-block;margin-right: 59rpx;line-height: 77rpx;">
					{{item.cname}}
				</view>
			</view>
		</view>
		<!-- tab栏位 -->


		<!-- 商品列表开始 -->
		<view class="goods_9 flex flex-wrap flex-x-b pl-24 pr-24">
			<view class="goods_9_item" v-for="(item,index) in goods" :key="index" hover-class="click1" @tap.stop="less(toPage,'/pages/goodsTK/goodsTK?id=' + item.goods_id + '&type=' + type)">
				<image class="banner_img" :src="item.goods_img" mode="aspectFit"></image>
				<view class="pr goods_name">
					<text class="name">{{item.goods_name || ''}}</text>
					<image :src="item.logo" mode="aspectFit" class="mini_img"></image>
				</view>
				<view class="flex flex-x-b flex-y-end goods_9_price">
					<view class="left flex flex-y-end goods_9_priceall">
						<text class="t1">￥</text>
						<text class="t2">{{filters.priceStr(xs(item.final_price,2))[0] || '0'}}</text>
						<text class="t3">.{{filters.priceStr(xs(item.final_price,2))[1] || '0'}}</text>
						<view class="quan">
							券后
						</view>
					</view>
					<view class="right">
						<!-- <text v-if="role_ == 'shoper' && commission_show">赚 ￥ {{xs(item.commission,2)}}</text> -->
						<button :data-title="item.desc?item.desc:item.goods_name" :data-url="'pages/goodsTK/goodsTK?type=jingdong&id='+item.goods_id"
						 :data-img="item.goods_img" :data-sharetype="'qinpu'" @tap.stop="mycopy(item.share_font)" open-type="share" class="share-clear flex"
						 style="font-size: 24rpx;color: #ED0A01;text-decoration: underline;">一键转发</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品列表结束 -->

		<!-- 内容为空 -->
		<view v-if="is_null" class="" style="text-align: center;margin-top: 32rpx;">
			<text class="iconfont icon-qinpuLOGO" style="color: #DFDFDF;margin-top: 30rpx;font-size: 100rpx;"></text>
			<view class="" style="font-size: 30rpx;color: #DFDFDF;margin-top: 0rpx;margin-bottom: 150rpx;">
				买之前 问亲铺 · 亲导购 全网省
			</view>
		</view>
		<!-- 内容为空 -->




		<!-- 底部 -->
		<view hover-class="click" class="flex flex-y-center fs-30" style="width: 590rpx;height: 80rpx;position: fixed;bottom: 30rpx;left: 80rpx;border-radius: 40rpx;background-color: #272727;color: #FFFFFF;z-index: 99;">
			<view @tap.stop="get_share_img" class="flex flex-x-center align-center pr line-xian" style="width: 50%;">
				<text class="iconfont icon-fenghuangxiangmutubiao_tupian" style="margin-right: 20rpx;"></text><text>下载海报</text>
			</view>
			<view class="flex flex-x-center align-center" style="width: 50%;">
				<button v-if="login(false) == false" open-type="share" class="share-clear" style="color: #FFFFFF;"><text class="iconfont icon--fenxiang1"
					 style="margin-right: 20rpx;"></text><text>分享活动</text></button>
				<button v-else class="share-clear" style="color: #FFFFFF;" @tap.stop="login"><text class="iconfont icon--fenxiang1"
					 style="margin-right: 20rpx;"></text><text>分享活动</text></button>
			</view>
		</view>

		<!-- 回到顶部 -->
		<view v-if="show_top" @tap.stop="to_top" hover-class="click" class="flex flex-y flex-x-center flex-y-center" style="position: fixed;right: 24rpx;bottom: 150rpx;background-color: rgba(0,0,0,0.5);width: 80rpx;height: 80rpx;border-radius: 40rpx;z-index: 9;">
			<text class="iconfont icon-shangshuangjiantou color-fff" style="height: 32rpx;"></text>
			<text class="fs-20 color-fff">顶部</text>
		</view>


		<!-- 分享海报 -->
		<share2 ref="share2" :loadingSrc="__wxapp_img.system.loading2.url"></share2>

	</view>
</template>

<script>
	import share2 from '../../components/share2/share2.vue';
	export default {
		data() {
			return {
				app: getApp().globalData.app,
				customBar: getApp().globalData.customBar,
				type: 'jingdong',
				goods: [],
				filters: require('../../utils/filters.js'),
				is_null: false,
				page: 1,
				nav_index: 0,
				navs: [],
				show_top: false,
				cids: '',
				keyword: '',
				share_title: '',
				share_image: '',
			}
		},
		components: {
			share2
		},
		onLoad(e) {
			this.getApp().page.onLoad(this, e);

			this.get_navs();

			this.get_goods();
		},
		methods: {
			seach() {
				this.page = 1;
				this.is_null = false;
				// this.nav_index = 0;
				// this.cids = '';

				this.get_goods();
			},
			choose_cat(index, id) {
				this.nav_index = index;
				this.cids = id || '';
				this.page = 1;
				// this.keyword = '';
				this.is_null = false;

				this.get_goods();
			},
			//获取分类
			get_navs() {
				this.getApp().request({
					data: {
						type: this.type == 'taobao' ? 12 : 22,
					},
					url: this.getApp().api.taoke.tk_navs,
					success: (res) => {
						// console.log('navs', res);
						if (res.code == 0 && res.data.result && res.data.result.data) {
							res.data.result.data.unshift({
								cid: '',
								cname: '推荐'
							});
							this.navs = res.data.result.data || [];
							return
						}
						if (res.code == 0 && res.data) {
							res.data.data.unshift({
								cid: '',
								cname: '推荐'
							});
							this.navs = res.data.data || [];
						}
					}
				});
			},
			get_share_img(type) {
				if (this.goods.length == 0)
					return;
				let name = '';
				let imgArr = [];
				let price = [];
				let minPrice = [];
				let id = 1;
				this.goods.some((val, index) => {
					if (index < 4) {
						imgArr.push(val.goods_img);
					}
					minPrice.push(val.final_price);
					if (index > 9) {
						return true;
					}

				});
				let minPrice1 = Math.min(...minPrice);
				let min_index = 0;
				this.goods.some((val, index) => {
					if (val.final_price == minPrice1) {
						min_index = index;
						return true;
					}
				})
				price = this.goods[min_index].goods_price;
				name = this.goods[min_index].goods_name;
				id = this.goods[min_index].goods_id;
				minPrice = minPrice1;
				for (let i = 0; i < 4 - imgArr.length; i++) {
					imgArr.push(imgArr[0]);
				}
				/// console.log(minPrice, imgArr, name);
				if (type == 1) {
					////////////////////获取分享海报和标题
					if (this.get_one == true)
						return;
					this.get_one = true;
					this.getApp().request({
						url: this.getApp().api.taoke.tk_image,
						method: "POST",
						data: {
							type: 111,
							id: id,
							sale_price: minPrice,
							price: price,
							goods_name: name,
							pics: imgArr.join(',')
						},
						success: res => {
							if (res.code == 0) {
								if (res.data) {
									this.share_image = res.data.pic_url;
									this.share_title = res.data.goods_name;
									console.log(this.share_image, this.share_title)
								}
							} else {
								// this.showToast(res.msg)
							}
						}
					});
					return;
				}


				//////////////////////////////打开分享弹窗
				this.$refs.share2.open(() => {
					this.getApp().request({
						url: this.getApp().api.taoke.tk_share_page,
						data: {
							type: 24,
							id: id,
							price_str: minPrice,
							// goods_pic: price,
							act_name: name,
							goods_pic: imgArr.join(',')
						},
						success: res => {
							if (res.code == 0) {
								res.data.pic_url && this.$refs.share2.setSrc(res.data.pic_url);
							} else {
								this.showToast(res.msg)
							}
						}
					});
				});
			},
			choose_nav(type) {
				this.type = type;
				this.page = 1;
				this.is_null = false;
				this.cids = 0;
				this.nav_index = 0;
				this.goods = [];

				this.get_goods();
				this.get_navs();
			},
			get_goods() {
				//请求
				uni.showLoading({
					title: '请求商品列表中',
					mask: false
				});


				let data = {
					type: this.type == 'taobao' ? 12 : 22,
					page: this.page,
					origin: 5,
					keyword: this.keyword,
					cids: this.cids || '',
				};
				this.getApp().request({
					data: data,
					url: this.getApp().api.taoke.tk_special,
					success: (res) => {
						let data = [];
						if (res.data && res.data instanceof Array) {
							data = res.data;
						}
						if (res.code == 0) {

							if (data.length == 0) {
								this.is_null = true;
							}
							if (this.page == 1) {

								this.goods = data || [];
								if (data.length > 0) {
									this.login(false) == false && this.get_share_img(1);
								}
							} else if (this.page > 1) {
								this.goods = this.goods.concat(data);
								if (data.length == 0) {
									this.no_more();
								}
							}
							this.page++;
						}
					},
					complete: res => {
						uni.hideLoading();
					}
				});
			},
			no_more() {
				uni.showToast({
					icon: 'none',
					title: '没有更多啦',
					duration: 2000
				})
			},
			to_top() {
				uni.pageScrollTo({
					duration: 200,
					scrollTop: 0,
					success: () => {
						setTimeout(() => {
							this.show_top = false;
						}, 150)
					}
				})
			}
		},
		onReachBottom() {
			this.get_goods();
		},
		onPageScroll(e) {
			if (e.scrollTop) {
				if (e.scrollTop > 400) {
					this.show_top = true;
				} else {
					this.show_top = false;
				}
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				if (res.target.dataset.sharetype == 'qinpu')
					return {
						title: res.target.dataset.title || '',
						path: res.target.dataset.url + '&mch_id=' + (uni.getStorageSync('_mchInfo').id || ''),
						imageUrl: res.target.dataset.img || '',
					}
			}
			return {
				title: this.share_title || '',
				path: this.getPath() + '?mch_id=' + (uni.getStorageSync('_mchInfo').id || ''),
				imageUrl: this.share_image || '',
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F4F4F4;
		// background-color: #000;
	}

	.active1 {
		background: linear-gradient(135deg, #3023AE 0%, #C86DD7 100%);
		color: #FFFFFF !important;
	}

	.line-xian::after {
		content: "";
		position: absolute;
		right: 0;
		top: 50%;
		transform: translate(0, -50%);
		width: 1rpx;
		height: 50rpx;
		background-color: #D7D7D7;
		z-index: 2;
		opacity: 0.3;
	}

	// 商品列表
	.goods_9 {
		overflow: hidden;

		.goods_9_item {
			width: 340rpx;
			height: 497rpx;
			overflow: hidden;
			background-color: #FFFFFF;
			margin-top: 20rpx;
		}

		.banner_img {
			width: 340rpx;
			height: 340rpx;
			overflow: hidden;
			font-size: 0 !important;
			line-height: 0 !important;
			background-color: #FFFFFF;
		}

		.goods_name {
			font-size: 24rpx;
			font-weight: 400;
			color: #595959;
			line-height: 37rpx;
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
			min-height: 74rpx;
			word-wrap: break-word;
			word-break: break-all;
			padding: 0 14rpx;
		}

		.goods_9_price {
			// width: 100%;
			padding: 0 14rpx;

			.right {
				font-size: 24rpx;
				color: #8D8D8D;
			}
		}

		.mini_img {
			position: absolute;
			width: 24rpx;
			height: 24rpx;
			// background-color: red;
			left: 14rpx;
			top: 11rpx;
			z-index: 2;
		}

		.goods_9_priceall {
			height: 50rpx;
			border-radius: 8rpx;
			// background: linear-gradient(270deg, #FD3D01 0%, #F93101 28%, #EB0301 100%);
			padding: 0rpx 20rpx 8rpx 0rpx;
			color: #E90000;
			font-weight: bold;
			position: relative;
			margin-top: 10rpx;

			.t1 {
				font-size: 20rpx;
				line-height: 22rpx;
				padding-right: 4rpx;
			}

			.t2 {
				font-size: 34rpx;
				line-height: 32rpx;
			}

			.t3 {
				font-size: 20rpx;
				line-height: 20rpx;
			}

			.quan {
				position: absolute;
				right: -8rpx;
				top: -8rpx;
				z-index: 2;
				width: 50rpx;
				height: 24rpx;
				font-size: 18rpx;
				color: #FFFFFF;
				text-align: center;
				line-height: 24rpx;
				background-color: #E90000;
				border-radius: 8rpx;
				font-weight: normal;
			}
		}
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
		font-weight: bold;
		color: #999999;
	}

	.tablist .active {
		position: relative;
		color: #E90000;
	}

	.tablist .active::after {
		content: "";
		position: absolute;
		background-color: #E90000;
		width: 70rpx;
		height: 10rpx;
		// background: linear-gradient(90deg, #FE4001, #EB0301);
		border-radius: 5rpx;
		bottom: 1rpx;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
