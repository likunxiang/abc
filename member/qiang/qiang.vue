<template>
	<view>
		<common></common>
		<!-- 背景图开始 -->
		<view class="" :style="'position: absolute;left: 0;top: 0;width: 750rpx;height: calc( '+ customBar + 'px' + ' + 170rpx); z-index: -1;background:#FF0050 url('+init_img.yhzq+') top left / 100% auto  no-repeat;'">
		</view>
		<!-- 背景图结束 -->

		<custom lineColor="#dcdcdc" borderColor="rgba(220,220,220,0.6)" btnMode="2" backColor="#000000" houseBk="true" mode="2"
		 fixed="fixed" title="限时抢购" titleColor="#FFE2BB"></custom>

		<view class="fs-30" style="text-align: center;color: #FFD7A1;margin-top: 30rpx;overflow: hidden;">
			<view style="font-weight: bold;">每天准点开抢 抢到就是赚到</view>
			<view class="flex flex-x-a flex-y-center fs-24" style="color: #FFE2BB;margin-top: 36rpx;margin-bottom: 30rpx;padding:0 40rpx">
				<view class="flex align-center">
					<text class="iconfont icon-rengongjixiao mr-10"></text><text>多层人工严选</text>
				</view>
				<view class="flex align-center">
					<text class="iconfont icon-pinpaiyingxiangli mr-10"></text><text>独家超值特惠</text>
				</view>
				<view class="flex align-center">
					<text class="iconfont icon-shijian mr-10"></text><text>每天整点更新</text>
				</view>
			</view>
		</view>

		<!-- <view class="hot_tab">
			<text :class="{'active':type == 'now'}" @tap="choose_nav('now')" class="hot_item">当前热抢</text>
			<text :class="{'active':type == 'future'}" @tap="choose_nav('future')" class="hot_item">即将开始</text>
		</view> -->
		<scroll-view scroll-x="true" style="width: 702rpx;margin-left: 24rpx;margin-top: 16rpx;background-color: #FFFFFF;border-radius: 20rpx;"
		 :scroll-left="scroll_left" :scroll-with-animation="true">
			<view style="white-space: nowrap;height: 100rpx;" class="flex">
				<view class="time_item flex flex-y flex-y-center flex-x-center" :class="{'active22':nav_index==index}" v-for="(val,index) in time_arr"
				 :key="index" @tap="choose_time(index)">
					<text class="name1">{{val.name}}</text>
					<text class="name2">{{get_state(val.name)}}</text>
				</view>
			</view>
		</scroll-view>

		<!-- 倒计时开始 -->
		<block v-if="false">
			<view v-if="type == 'now'" class="mt-20 ml-24 flex flex-x-center flex-y-center fs-24" style="width: 702rpx;height: 80rpx;border-radius: 8rpx;background-color: #FBCECD;font-weight: bold;">
				<view>距离本场结束:</view>
				<view class="dot">12</view>
				<view>时</view>
				<view class="dot">11</view>
				<view>分</view>
				<view class="dot">50</view>
				<view>秒</view>
			</view>
			<view v-else class="mt-20 ml-24 flex flex-x-center flex-y-center fs-24" style="width: 702rpx;height: 80rpx;border-radius: 8rpx;background-color: #FBCECD;font-weight: bold;">
				<view>距离本场开始:</view>
				<view class="dot1">12</view>
				<view>时</view>
				<view class="dot1">11</view>
				<view>分</view>
				<view class="dot1">50</view>
				<view>秒</view>
			</view>
		</block>
		<!-- 倒计时结束 -->


		<!-- 商品列表开始 -->
		<view class="goods_box" style="margin-top: 0rpx;">
			<view class="goods_all mt-20 pl-24 pr-24 fs-28 flex" v-for="(item,index) in goods" :key="index" @tap.stop="less(toPage,'/pages/goodsTK/goodsTK?id=' + item.goods_id + '&type=taobao')"
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
					<!-- 评分 所属 店名 -->
					<view class="fs-24" style="font-weight: bold;color: #EB0401;">
						{{item.limit_buy_special_text ? (item.limit_buy_special_text[0] ? item.limit_buy_special_text [0] : ' ') : " "}}
					</view>
					<!-- 券后价 -->
					<view class="flex flex-y-end flex-x-b" style="color: #EB0401;font-weight: bold;">
						<!-- <text style="font-size: 20rpx;line-height: 20rpx;">¥</text><text style="font-size: 24rpx;line-height: 24rpx;">{{filters.priceStr(xs(item.price,2))[0] || '0'}}</text><text class="min" style="line-height: 18rpx;">.{{filters.priceStr(xs(item.price,2))[1] || '0'}}</text>  <text style="font-size: 20rpx;color: #8D8D8D;margin-left: 14rpx;">¥ 45.</text><text style="font-size: 20rpx;color: #8D8D8D;">00</text> -->
						<view class="flex  flex-y-end">
							<view style="font-size: 22rpx;margin-right: 6rpx;">¥</view>
							<view style="font-size: 26rpx;transform: translateY(1rpx);">{{filters.priceStr(xs(item.final_price,2))[0] || '0'}}</view>
							<view class="min" style="font-size: 20rpx;">.{{filters.priceStr(xs(item.final_price,2))[1] || '0'}}</view>
							<view style="font-size: 22rpx;color: #8D8D8D;margin-left: 14rpx;">¥
								{{filters.priceStr(xs(item.goods_price,2))[0] || '0'}}.</view>
							<view style="font-size: 20rpx;color: #8D8D8D;">{{filters.priceStr(xs(item.goods_price,2))[1] || '0'}}</view>
						</view>
						<view style="color:#8D8D8D;font-size: 24rpx;font-weight: normal;">
							月销{{item.monthSales || '0'}}
						</view>
					</view>

					<!-- 券  小亲赚-->
					<view class="flex flex-x-b flex-y-end line4">
						<view class="flex">
							<text class="quan1" v-if="item.discount_price">券<text class="quan_num">{{item.discount_price || '0'}}元</text></text>
							<text class="zhuan" v-if="role_ == 'shoper' && commission_show">赚<text class="zhuan_num">{{xs(item.commission,2) || ''}}</text></text>
						</view>
						<!-- <button @tap.stop="mycopy(item.share_font)" v-if="app=='lianmeng'" open-type="share" class="share" :data-title="item.desc?item.desc:item.goods_name"
						 :data-id="item.goods_id" :data-img="item.goods_img" :data-type="showType">一键转发</button> -->
						<!-- <text style="color: #EB0401;font-size: 24rpx;text-decoration: underline;">立即查看</text> -->
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
				type: 'now',
				goods: [],
				filters: require('../../utils/filters.js'),
				is_null: false,
				page: 1,
				show_top: false,
				share_title: '',
				share_image: '',
				time_arr: [{
						name: '10:00'
					},
					{
						name: '11:00'
					},
					{
						name: '12:00'
					},
					{
						name: '12:00'
					},
					{
						name: '17:00'
					},
					{
						name: '18:00'
					},
					{
						name: '19:00'
					},
					{
						name: '20:00'
					},
					{
						name: '21:00'
					},
					{
						name: '22:00'
					},
				],
				nav_index: -1, //正在进行的活动
			}
		},
		components: {
			share2
		},
		computed: {
			scroll_left() {
				if (this.nav_index <= 2)
					return 0;
				return uni.upx2px(184) * (this.nav_index - 2) + uni.upx2px(56);
			}
		},
		onLoad(e) {
			this.getApp().page.onLoad(this, e);

			this.get_goods();

			this.set_index();
		},
		methods: {
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
				console.log(minPrice, imgArr, name);
				if (type == 1) {
					////////////////////获取分享海报和标题
					if (this.get_one == true)
						return;
					this.get_one = true;
					this.getApp().request({
						url: this.getApp().api.taoke.tk_image,
						method: "POST",
						data: {
							type: 107,
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
							type: 20,
							id: id,
							price_str: minPrice,
							// goods_pic: price,
							act_name: name,
							goods_pic: imgArr.join(',')
						},
						success: res => {
							console.log('get1111111111', res)
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

				this.get_goods();
			},
			get_goods() {
				//请求
				uni.showLoading({
					title: '请求商品列表中',
					mask: false
				});


				let data = {
					type: 12,
					page: this.page,
					origin: 1,
				};
				this.getApp().request({
					data: data,
					url: this.getApp().api.taoke.tk_special,
					success: (res) => {
						let data = [];
						if (res.data && ((res.data.nowGoods instanceof Array && this.type == 'now') || (res.data.futureGoods instanceof Array &&
								this.type == 'future'))) {
							data = this.type == 'now' ? (res.data.nowGoods || []) : (res.data.futureGoods || []);
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
			},
			//获取当前时间
			get_state(time) {
				time = time.split(':')[0] || 0;
				let h = (new Date()).getHours();
				return time == h ? '抢购中' : (time > h ? '即将开始' : '已开抢')
			},
			set_index() {
				let nav__index = 0;
				let h = (new Date()).getHours();
				this.time_arr.forEach((val, index) => {
					if (val.name.split(':')[0] <= h) {
						nav__index = index;
					}

				})
				this.nav_index = nav__index || -1;

			},
			choose_time(x) {
				this.page = 1;
				this.goods = [];
				this.nav_index = x;
				this.is_null = false;
			},
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
		background-color: #FFFFFF;
		// background-color: #000;
	}

	.hot_tab {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		padding: 0 50rpx;
		justify-content: space-around;
		align-items: center;
		margin-top: 30rpx;
	}

	.hot_item {
		width: 280rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 8rpx;
		font-size: 30rpx;
		font-weight: bold;
		background-color: #F3F3F3;
		color: #595959;
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

	.dot {
		width: 40rpx;
		height: 40rpx;
		border-radius: 20rpx;
		background-color: #000000;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		color: #FFFFFF;
		margin: 0 10rpx;
	}

	.dot1 {
		width: 40rpx;
		height: 40rpx;
		border-radius: 20rpx;
		background-color: #489A19;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		color: #FFFFFF;
		margin: 0 10rpx;
	}


	.time_item {
		padding-right: 40rpx;
		font-weight: bold;

		.name1 {
			font-size: 40rpx;
			color: #333333;
		}

		.name2 {
			line-height: 36rpx;
			padding: 0 24rpx;
			border-radius: 18rpx;
			font-size: 24rpx;
			color: #666666;
			margin-top: 4rpx;
		}



	}

	.active22 {
		.name1 {

			color: #EB0401;
		}

		.name2 {

			color: #FFFFFF;
			background-color: #EB0401;
		}
	}

	.active22::after {
		content: "";
		position: absolute;
		left: 50%;
		bottom: -14rpx;
		transform: translateX(-50%);
		width: 40rpx;
		height: 4rpx;
		border-radius: 2rpx;
		background-color: #EB0401;
	}
</style>
