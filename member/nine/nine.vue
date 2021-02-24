<template>
	<view>
		<common></common>
		<!-- 背景图开始 -->
		<view :style="'position: absolute;left: 0;top: 0;width: 750rpx;height: calc( '+ customBar + 'px' + ' + 120rpx); z-index: -1;background:#FB5C63 url('+init_img.yhzq+') bottom left / 100% auto  no-repeat;'">
		</view>
		<!-- 背景图结束 -->

		<custom lineColor="#dcdcdc" borderColor="rgba(220,220,220,0.6)" btnMode="2" backColor="#000000" houseBk="true" mode="2"
		 fixed="fixed" title="9.9专区" titleColor="#FFFFFF"></custom>

		<view class="hot_tab" v-if="navs.length>0">
			<text v-for="(item,index) in navs" :key="index" :class="{'active':type == item.sign}" @tap="choose_nav(item.sign)"
			 class="hot_item">{{item.name}}</text>
		</view>



		<!-- <view style="height: 130rpx;"></view> -->
		<!-- 商品列表开始 一行展示-->
		<view class="goods_box flex flex-wrap flex-x-b pl-24 pr-24">
			<view class="goods_all mt-20 fs-28 flex flex1" v-for="(item,index) in goods" :key="index" @tap.stop="less(toPage, type == 'qinpu' ? '/pages/goods/goods' + '?id=' + item.goods_id : '/pages/goodsTK/goodsTK' + '?id=' + item.goods_id + '&type=' + type)"
			 hover-class="click1">
				<view class="left">
					<!-- 图片 -->
					<image :src="item.goods_img" class="banner" mode="aspectFit"></image>
				</view>
				<view class="right pl-20 flex-1 flex flex-y flex-x-b">
					<view>
						<!-- 商品名 -->
						<view class="name">
							{{item.goods_name || ''}}
							<!-- 小图标 -->
							<image :src="item.logo" class="icon_type" mode=""></image>
						</view>
						<!-- 描述 TODO -->
						<!-- 时间 TODO -->
					</view>


					<view>
						<!-- 券后价 -->
						<view class="flex flex-x-b flex-y-end mb-10">
							<view class="flex flex-y-end" style="color: #EB0401;">
								<!-- <text style="font-size: 20rpx;line-height: 20rpx;">¥</text><text style="font-size: 24rpx;line-height: 24rpx;">{{filters.priceStr(xs(item.price,2))[0] || '0'}}</text><text class="min" style="line-height: 18rpx;">.{{filters.priceStr(xs(item.price,2))[1] || '0'}}</text>  <text style="font-size: 20rpx;color: #8D8D8D;margin-left: 14rpx;">¥ 45.</text><text style="font-size: 20rpx;color: #8D8D8D;">00</text> -->
						
								<view style="font-size: 20rpx;margin-right: 6rpx;">¥</view>
								<view style="font-size: 34rpx;transform: translateY(1rpx);font-weight: bold;">{{filters.priceStr(xs(item.final_price,2))[0] || '0'}}</view>
								<view class="min" style="font-size: 20rpx;line-height: 22rpx;font-weight: bold;">.{{filters.priceStr(xs(item.final_price,2))[1] || '0'}}</view>
								<view style="font-size: 20rpx;color: #8D8D8D;margin-left: 14rpx;line-height: 24rpx;">¥
									{{filters.priceStr(xs(item.goods_price,2))[0] || '0'}}</view>
								<view style="font-size: 20rpx;color: #8D8D8D;line-height: 22rpx;">.{{filters.priceStr(xs(item.goods_price,2))[1] || '0'}}</view>
						
						
							</view>
							<view class="fs-24" style="color: #8D8D8D;" v-show="type != 'qinpu'">
								月销{{type=='jingdong'? (item.month_sales || '0') : (item.monthSales || '0')}}
							</view>
						</view>
						<!-- 2.5 -->
						<block v-if="type == 'qinpu'">
							<view class="flex justify-between">
								<view class="flex line4">
									<view class="flex">
										<text v-if="item.discount_price" class="quan1">券<text class="quan_num">{{item.discount_price || '0'}}元</text></text>
										<text v-else>{{' '}}</text>
										<text class="zhuan" v-if="role_ == 'shoper' && commission_show">赚<text class="zhuan_num">{{xs(item.commission,2) || ''}}</text></text>
									</view>
									<!-- <button v-if="(app=='qinpu'&&type == 1) || (app=='lianmeng'&&type!=1)" class="share" @tap.stop="mycopy(item.desc?item.desc:item.name)"
									 open-type="share" :data-title="item.desc?item.desc:item.name" :data-id="item.id" :data-img="item.first_cover_pic">一键转发</button> -->
								</view>
								<view class="flex">
									<view class="mr-20" style="color:#EB0401;text-decoration: underline;" @tap.stop="openCart" :data-id="item.goods_id"
									 :data-index="index">加入购物车</view>
									<button open-type="share" class="share" style="margin-left: 0rpx;margin-right: 0rpx;color:#EB0401;text-decoration: underline;"
									 :data-title="item.desc?item.desc:item.goods_name" :data-url="'pages/goods/goods?id='+item.goods_id" :data-img="item.goods_img"
									 :data-sharetype="'qinpu'" @tap.stop="mycopy(item.share_font)">分享</button>
								</view>
							</view>
						</block>
						<block v-else>
							<view class="flex justify-between">
								<view class="flex line4">
									<view class="flex">
										<text v-if="item.discount_price" class="quan1">券<text class="quan_num">{{item.discount_price || '0'}}元</text></text>
										<text v-else>{{' '}}</text>
										<text class="zhuan" v-if="role_ == 'shoper' && commission_show">赚<text class="zhuan_num">{{xs(item.commission,2) || ''}}</text></text>
									</view>
									<!-- <button v-if="(app=='qinpu'&&type == 1) || (app=='lianmeng'&&type!=1)" class="share" @tap.stop="mycopy(item.desc?item.desc:item.name)"
									 open-type="share" :data-title="item.desc?item.desc:item.name" :data-id="item.id" :data-img="item.first_cover_pic">一键转发</button> -->
								</view>
								<!-- <text v-if="role_ == 'shoper' && commission_show">赚 ￥ {{xs(item.commission,2)}}</text> -->
								<button :data-title="item.desc?item.desc:item.goods_name" :data-url="type=='qinpu'?'/pages/goods/goods?id='+ item.goods_id : 'pages/goodsTK/goodsTK?id='+item.goods_id+'&type='+type"
								 :data-img="item.goods_img" :data-sharetype="'qinpu'" @tap.stop="mycopy(item.share_font)" open-type="share"
								 class="share-clear flex" style="font-size: 24rpx;color: #ED0A01;text-decoration: underline;">一键转发</button>
							</view>
						</block>
						<!-- 2.5 end -->
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
				type: 'qinpu',
				goods: [],
				filters: require('../../utils/filters.js'),
				is_null: false,
				page: 1,
				show_top: false,
				share_title: '',
				share_image: '',
				navs: [],

			}
		},
		onLoad(e) {
			this.getApp().page.onLoad(this, e);
			///获取tab栏
			this.get_navs();
			// this.get_goods();
		},
		components: {
			share2
		},
		methods: {
			//获取tab栏位
			get_navs() {
				this.getApp().request({
					url: this.getApp().api.taoke.nine_navs,
					data: {},
					success: res => {
						if (res.code == 0) {
							if (res.data) {
								this.navs = res.data;
								this.type == res.data[0].sign || '京东';
								this.get_goods();
							}
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
							type: 109,
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
							type: 22,
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
				console.log(type)
				this.page = 1;
				this.is_null = false;
				this.goods = [];

				this.get_goods();
			},
			get_goods() {
				//请求
				uni.showLoading({
					title: '请求商品列表中',
					mask: false
				});
				let type_lai = this.type || 'qinpu';
				switch (type_lai) {
					case 'qinpu':
						type_lai = 41;
						break;
					case 'jingdong':
						type_lai = 22;
						break;
					case 'taobao':
						type_lai = 12;
						break;
				}


				let data = {
					type: type_lai,
					page: this.page,
					origin: 4
				};
				let type_now = this.type;
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
							if (type_now != this.type) return;
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
			},
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
		onReachBottom() {
			this.get_goods();
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				if (res.target.dataset.sharetype == 'qinpu') {
					console.log(res)
					return {
						title: res.target.dataset.title || '',
						path: res.target.dataset.url + '&mch_id=' + (uni.getStorageSync('_mchInfo').id || ''),
						imageUrl: res.target.dataset.img || '',
					}
				}

			}
			console.log(this.getPath() + '?mch_id=' + (uni.getStorageSync('_mchInfo').id || ''))
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
		background-color: #fff;
	}

	.hot_tab {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		padding: 0 50rpx;
		justify-content: space-around;
		align-items: center;
		margin-top: 150rpx;
	}

	.hot_item {
		flex: 1;
		margin-left: 27rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 8rpx;
		font-size: 30rpx;
		font-weight: bold;
		background-color: #F3F3F3;
		color: #595959;

		&:first-of-type {
			margin-left: 0;
		}
	}

	.active {
		background-color: #EB0401;
		color: #FFFFFF;
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
			height: 487rpx;
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
			background-color: #e8e8e8;
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
			background: linear-gradient(270deg, #FD3D01 0%, #F93101 28%, #EB0301 100%);
			padding: 0 20rpx 8rpx 20rpx;
			color: #FFFFFF;
			font-weight: bold;

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
		}
	}

	.ranking_one {
		width: 200rpx;
		// overflow-x: hidden;
		border-radius: 8rpx;
		background-color: #FFFFFF;
		padding: 10rpx;
		position: relative;

		image {
			width: 100%;
			height: 180rpx;
			overflow: hidden;
			background-color: rgba(0, 0, 0, 0.1);

		}

		.name {
			margin-top: 24rpx;
		}

		.ranking_price {
			display: flex;
			flex-flow: row nowrap;
			align-items: flex-end;
			color: #EB0401;

			.t1 {
				font-size: 20rpx;
				// height: 31rpx;

			}

			.t2 {
				font-size: 24rpx;
				margin-left: 4rpx;
				transform: translateY(0.5px);

			}

			.t3 {
				font-size: 20rpx;
			}

			.t4 {
				font-size: 20rpx;
				margin-left: 4rpx;
			}
		}

		.po_notice {
			position: absolute;
			width: 180rpx;
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			color: #FFFFFF;
			border-radius: 20rpx;
			box-shadow: 0px 2px 4px 0px rgba(230, 143, 143, 0.5);
			font-size: 20rpx;
			top: 170rpx;
			background: linear-gradient(324deg, #FAD961 0%, #F76B1C 100%);
			left: 50%;
			transform: translateX(-50%);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			padding-left: 10rpx;
		}

		.top_img {
			width: 48rpx;
			height: 60rpx;
			position: absolute;
			z-index: 8;
			left: 18rpx;
			top: -10rpx;
			background-color: rgba(0, 0, 0, 0);
		}
	}

	.tow {
		width: 220rpx;

		image {
			width: 200rpx;
			height: 200rpx;
		}

		.name {
			margin-top: 35rpx;
		}

		.po_notice {
			top: 200rpx;
		}
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

	.goods_box .right button {
		margin: 0;
		padding: 0;
		line-height: 1.7;
		color: #EB0401;
		font-size: 24rpx;
		text-decoration: underline;
		background-color: transparent;
	}
</style>
