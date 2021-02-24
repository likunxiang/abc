<template>
	<view>
		<common></common>
		<!-- 背景图开始 -->
		<view class="" :style="'position: absolute;left: 0;top: 0;width: 750rpx;height: calc( '+ customBar + 'px' + ' + 368rpx); border-radius:0 0 375rpx 375rpx/0 0 40rpx 40rpx;z-index: -1;background:#FFFFFF url('+init_img.ssbd+') top left / 100% auto  no-repeat;'">
		</view>
		<!-- 背景图结束 -->
		<custom lineColor="#dcdcdc" borderColor="rgba(220,220,220,0.6)" btnMode="2" backColor="#000000" houseBk="true" mode="2"
		 fixed="fixed" title="实时榜单"></custom>


		<view class="hot_tab">
			<text :class="{'active':type == 'qinpu'}" @tap="choose_nav('qinpu')" class="hot_item">品牌折扣馆</text>
			<text :class="{'active':type == 'jingdong'}" @tap="choose_nav('jingdong')" class="hot_item">京东实时榜</text>
			<text :class="{'active':type == 'taobao'}" @tap="choose_nav('taobao')" class="hot_item">淘宝实时榜</text>
		</view>

		<view class="ml-24 flex flex-x-b flex-y-end" style="background-color: #FDEFE6;margin-top: 26rpx;padding: 24rpx 21rpx 27rpx 21rpx;border-radius: 8rpx;width: 702rpx;height: 370rpx;box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(156, 156, 156, 0.5);">
			<view v-if="top_list[1]" class="ranking_one" @tap.stop="less(toPage,'/pages/goodsTK/goodsTK?id=' + top_list[1].goods_id + '&type=' + type)"
			 hover-class="click1">
				<image :src="top_list[1] ? top_list[1].goods_img : ''" mode=""></image>
				<view class="text-hidden name" style="color: #595959;font-size: 20rpx;">
					{{top_list[1] ? top_list[1].goods_name : ''}}
				</view>
				<view class="ranking_price text-hidden">
					<text class="t1">¥</text>
					<text class="t2">{{filters.priceStr(xs(top_list[1] ? top_list[1].final_price : '0',2))[0]}}.</text>
					<text class="t3">{{filters.priceStr(xs(top_list[1] ? top_list[1].final_price : '0',2))[1]}}</text>
					<text class="t4" v-show="type == 'jingdong'">券后</text>
				</view>
				<view class="po_notice">
					{{top_list[1] ? top_list[1].hot_special_text : ''}}
				</view>
				<image :src="init_img.top2" class="top_img" mode=""></image>
			</view>
			<view v-if="top_list[0]" class="ranking_one tow" @tap.stop="less(toPage,'/pages/goodsTK/goodsTK?id=' + top_list[0].goods_id + '&type=' + type)"
			 hover-class="click1">
				<image :src="top_list[0] ? top_list[0].goods_img : ''" mode=""></image>
				<view class="text-hidden name" style="color: #595959;font-size: 20rpx;">
					{{top_list[0] ? top_list[0].goods_name : ''}}
				</view>
				<view class="ranking_price text-hidden">
					<text class="t1">¥</text>
					<text class="t2">{{filters.priceStr(xs(top_list[0] ? top_list[0].final_price : '0',2))[0]}}.</text>
					<text class="t3">{{filters.priceStr(xs(top_list[0] ? top_list[0].final_price : '0',2))[1]}}</text>
					<text class="t4" v-show="type == 'jingdong'">券后</text>
				</view>
				<view class="po_notice">
					{{top_list[0] ? top_list[0].hot_special_text : ''}}
				</view>
				<image :src="init_img.top1" class="top_img" mode=""></image>
			</view>
			<view v-if="top_list[2]" class="ranking_one" @tap.stop="less(toPage,'/pages/goodsTK/goodsTK?id=' + top_list[2].goods_id + '&type=' + type)"
			 hover-class="click1">
				<image :src="top_list[2] ? top_list[2].goods_img : ''" mode=""></image>
				<view class="text-hidden name" style="color: #595959;font-size: 20rpx;">
					{{top_list[2] ? top_list[2].goods_name : ''}}
				</view>
				<view class="ranking_price text-hidden">
					<text class="t1">¥</text>
					<text class="t2">{{filters.priceStr(xs(top_list[2] ? top_list[2].final_price : '0',2))[0]}}.</text>
					<text class="t3">{{filters.priceStr(xs(top_list[2] ? top_list[2].final_price : '0',2))[1]}}</text>
					<text class="t4" v-show="type == 'jingdong'">券后</text>
				</view>
				<view class="po_notice">
					{{top_list[2] ? top_list[2].hot_special_text : ''}}
				</view>
				<image :src="init_img.top3" class="top_img" mode=""></image>
			</view>
		</view>


		<!-- 商品列表开始 -->
		<view class="goods_box" style="margin-top: 8rpx;">
			<view class="goods_all mt-20 pl-24 pr-24 fs-28 flex" v-for="(item,index) in goods" :key="index" @tap="less(toPage,'/pages/goodsTK/goodsTK?id=' + item.goods_id + '&type=' + type)"
			 hover-class="click1">
				<view class="left">
					<!-- 图片 -->
					<image :src="item.goods_img" class="banner" mode="aspectFit"></image>
				</view>
				<view class="right pl-20 flex-1 flex flex-y flex-x-b">
					<!-- 商品名 -->
					<view class="name">
						{{item.goods_name || ''}}
						<!-- 小图标 -->
						<image :src="item.logo" class="icon_type" mode=""></image>
					</view>


					<!-- 券后价 -->
					<view class="flex flex-x-b flex-y-end">
						<view class="flex flex-y-end" style="color: #EB0401;font-weight: bold;">
							<!-- <text style="font-size: 20rpx;line-height: 20rpx;">¥</text><text style="font-size: 24rpx;line-height: 24rpx;">{{filters.priceStr(xs(item.price,2))[0] || '0'}}</text><text class="min" style="line-height: 18rpx;">.{{filters.priceStr(xs(item.price,2))[1] || '0'}}</text>  <text style="font-size: 20rpx;color: #8D8D8D;margin-left: 14rpx;">¥ 45.</text><text style="font-size: 20rpx;color: #8D8D8D;">00</text> -->
						
							<view style="font-size: 22rpx;margin-right: 6rpx;">¥</view>
							<view style="font-size: 26rpx;transform: translateY(1rpx);">{{filters.priceStr(xs(item.final_price,2))[0] || '0'}}</view>
							<view class="min" style="font-size: 20rpx;line-height: 22rpx;">.{{filters.priceStr(xs(item.final_price,2))[1] || '0'}}</view>
							<view style="font-size: 22rpx;color: #8D8D8D;margin-left: 14rpx;line-height: 24rpx;">¥
								{{filters.priceStr(xs(item.goods_price,2))[0] || '0'}}</view>
							<view style="font-size: 20rpx;color: #8D8D8D;line-height: 22rpx;">.{{filters.priceStr(xs(item.goods_price,2))[1] || '0'}}</view>
						
						
						</view>
						<view class="fs-24" style="color: #8D8D8D;" v-show="type != 'qinpu'">
							月销{{type=='jingdong'? (item.month_sales || '0') : (item.monthSales || '0')}}
						</view>
					</view>
					<!-- 券  小亲赚-->
					<view class="flex flex-x-b flex-y-end line4">
						<view class="flex">
							<text v-if="item.discount_price" class="quan1">券<text class="quan_num">{{item.discount_price || '0'}}元</text></text>
							<text v-else>{{' '}}</text>
							<text class="zhuan" v-if="role_ == 'shoper' && commission_show">赚<text class="zhuan_num">{{xs(item.commission,2) || ''}}</text></text>
						</view>
						<!-- <button v-if="(app=='qinpu'&&type == 1) || (app=='lianmeng'&&type!=1)" class="share" @tap.stop="mycopy(item.desc?item.desc:item.name)"
						 open-type="share" :data-title="item.desc?item.desc:item.name" :data-id="item.id" :data-img="item.first_cover_pic">一键转发</button> -->
						<view></view>
					</view>
					<!-- 2.5 -->
					<block v-if="type == 'qinpu'">
						<view class="flex justify-end">
							<view class="qinpu-btn mr-20" @tap.stop="openCart" :data-id="item.goods_id" :data-index="index">加入购物车</view>
							<button open-type="share" class="qinpu-btn" style="margin-left: 0rpx;margin-right: 0rpx;" :data-title="item.desc?item.desc:item.goods_name" :data-url="'pages/goods/goods?id='+item.goods_id"
							 :data-img="item.goods_img" :data-sharetype="'qinpu'" @tap.stop="mycopy(item.share_font)">分享</button>
						</view>
					</block>
					<block v-else>
						<!-- 新增开始 -->
						<view class="pr flex flex-x-b flex-y-center" style="height: 60rpx;border-radius: 8rpx 30rpx 30rpx 8rpx;background-color: #FDEFE6;overflow: hidden;z-index: 0;">
							<text class="text-hidden" style="width: 280rpx;padding-left: 15rpx;font-size: 24rpx;color: #A43210;position: relative;box-sizing: 2;">{{item.hot_special_text || ''}}</text>
							<button @tap.stop="" v-if="app == 'lianmeng' || true" open-type="share" class="share-clear" :data-title="item.desc?item.desc:item.goods_name" :data-url="'pages/goodsTK/goodsTK?type=jingdong&id='+item.goods_id"
							 :data-img="item.goods_img" :data-sharetype="'qinpu'" @tap.stop="mycopy(item.share_font)"><text style="color: #FFFFFF;font-size: 24rpx;padding-right: 24rpx;position: relative;box-sizing: 2;">一键转发</text></button>
							<text v-else style="color: #FFFFFF;font-size: 24rpx;padding-right: 24rpx;position: relative;box-sizing: 2;">点击查看</text>
							<view class="" style="position: absolute;right: -60rpx;top: 0;width: 200rpx;height: 60rpx;background: linear-gradient(270deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);box-shadow: -2rpx 0rpx 2rpx 0rpx rgba(125, 125, 125, 0.5);z-index: -1;transform:skewX(-15deg);">
						
							</view>
						</view>
						<!-- 新增结束 -->
					</block>
					<!-- 2.5 end -->
					

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
		
		<cart :goods="goodsInfo" v-if="attr_end" :show_attr_picker="show_attr_picker" :goods_attr="goods_attr" :form="form"
		 :attr_group_list="attr_group_list" @hideAttrPicker="hideAttrPicker" pageType="STORE"></cart>
	</view>
</template>

<script>
	import share2 from '../../components/share2/share2.vue';
	import cart from '../../components/cart/cart.vue';
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
				top_list: [],
				show_top: false,
				share_title: '',
				share_image: '',
				show_attr_picker: false,  // 加入购物车
				form: {
					number: 1
				},
				goodsInfo: {},
				goods_attr: {},
				attr_group_list: {},
				attr_end: false, // 规格加载状态
			}
		},
		components: {
			share2,
			cart
		},
		onLoad(e) {
			this.getApp().page.onLoad(this, e);

			this.get_goods();
		},
		methods: {
			// 购物车相关
			openCart(e) {
				var id = e.currentTarget.dataset.id;
				var index = e.currentTarget.dataset.index;
				var goodsInfo = this.goods[index];
				this.setData({
					show_attr_picker: true,
					goodsInfo: goodsInfo,
					['form.number']: 1
				});
				this.getGoodsAttr(id);
			},
			
			getGoodsAttr: function(id) {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.goods_attr,
					data: {
						id: id,
						from: self.goodsInfo.from ? self.goodsInfo.from : '1'
					},
					success: function(res) {
						if (res.code == 0) {
							if (res.data.attr[0].num == 0) {
								for (var i in res.data.attr) {
									if (res.data.attr[i].num > 0) {
										res.data.attr[0].total_num = true;
										break;
									}
								}
							}
			
							self.setData({
								goods_attr: res.data.attr,
								attr_group_list: res.data.attr_group_list,
								attr_end: true
							});
						}
					}
				});
			},
			get_share_img(type) {
				//获取前四个商品图片，前十个商品最低价，原价，商品名
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
							type: 108,
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
							type: 21,
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
				this.goods = [];
				// this.goods = [];
				this.get_goods();
			},
			// 请求商品列表
			get_goods() {
				//请求
				// TODO
				uni.showLoading({
					title: '请求商品列表中',
					mask: false
				});


				let data = {
					type: this.type == 'taobao' ? 12 : 22,
					page: this.page,
					origin: 3
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
								this.top_list[0] = data[0] || data[0];
								this.top_list[1] = data[1] || data[0];
								this.top_list[2] = data[2] || data[0];
								let arr = [];
								data.forEach((val, index) => {
									if (index > 2) {
										arr.push(val);
									}
								})
								this.goods = arr || [];
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
		},
		onPageScroll(e) {
			if (e.scrollTop) {
				if (e.scrollTop > 400) {
					this.show_top = true;
				} else {
					this.show_top = false;
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
		// background-color: #000000;
	}

	.hot_tab {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		padding: 0 48rpx;
		justify-content: space-around;
		align-items: center;
		margin-top: 30rpx;
	}

	.hot_item {
		width: 200rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 8rpx;
		font-size: 30rpx;
		font-weight: bold;
		background-color: rgba(255, 255, 255, 0.3);
		color: #FFFFFF;
	}
	.qinpu-btn {
		height: 50rpx;
		line-height: 46rpx;
		padding: 0 14rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 2rpx 0px rgba(210, 29, 29, 0.5);
		border-radius: 10rpx;
		border: 2rpx solid #EB0401;
		font-size: 24rpx;
		color: #EB0401;
	}
	.active {
		background-color: #FFFFFF;
		color: #472EB4;
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
</style>
