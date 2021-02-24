<template>
	<view style="background-color: #FFFFFF;">
		<!-- 全网搜索 -->
		<common></common>
		<view style="background: linear-gradient(90deg, #FE4001, #EB0301);">
			<custom title="买之前·问亲铺" mode="2" fixed="fixed" background="linear-gradient(90deg, #FE4001, #EB0301);"></custom>
			<view class="pl-24 pr-24" style="width: 100%;margin-top: 27rpx;padding-bottom: 27rpx;">
				<view class="flex flex-1 flex-y-center" style="height: 70rpx;border-radius: 40rpx;background-color: #FFFFFF;">
					<text class="iconfont icon-sousuo " style="color: #F23005;padding-left: 23rpx;font-size: 30rpx;"></text>
					<input v-model="keyword" class="flex-1  fs-30" style="height: 70rpx;padding-left: 12rpx;padding-right: 12rpx;"
					 type="text" placeholder="请输入关键词" @confirm="seach" />
					<text class="iconfont icon-guanbi-" @tap="clear_search" style="color: #CCCCCC;font-size: 36rpx;margin: 0 10rpx;"
					 :style="{'opacity':keyword?'1':'0'}"></text>
					<text @tap="seach" class="flex flex-x-center flex-y-center fs-30" style="background-color:#F23005;width: 118rpx;height: 60rpx; border-radius: 30rpx;color: #FFFFFF;margin-right: 5rpx;">搜索</text>
				</view>
			</view>
		</view>

		<view class="tabs" style="background-color: #FFFFFF;position: relative;z-index: 3;">
			<!-- 商家 -->
			<view v-if="navs.length>0" class="tablist flex flex-y-center flex-x-b" style="width: 100%;height: 94rpx;padding-left: 130rpx;padding-right: 130rpx;border-bottom: 1rpx solid rgba(190,190,190,0.3);">
				<view class="tabitem" v-for="(item,index) in navs" :key="index" :class="{'active': index==nav_index}" @click="change_nav(index)">
					{{item.title}}
				</view>
			</view>
			<!-- 筛选 -->
			<view class="filters flex flex-y-center flex-x-b pr-24 pl-24 pr" style="width: 100%;height: 73rpx;">
				<view class="flex flex-y-center fs-26 color-333333" @tap="open_filter">
					<view class="flex" v-if="type == 1">
						<view class="choose-btn flex ns-align-items-flex-center mr-20" @tap="openSmallCat">
							<view class="ns-text-limit" style="width: 140rpx;">{{morenSmallCat}}</view>
							<view :class="'iconfont icon-xiangxia-copy fs-24 ' + (smallCatOpen?'change':'') + ' color-fff'" style="margin-left: -6rpx;"></view>
						</view>
						<view class="choose-btn flex ns-align-items-flex-center" @tap="openChoose">
							<view class="ns-text-limit" style="width: 140rpx;">{{morenBrank}}</view>
							<view :class="'iconfont icon-xiangxia-copy fs-24 ' + (chooseOpen?'change':'') + ' color-fff'" style="margin-left: -6rpx;"></view>
						</view>
					</view>
					<block v-if="type == 2"><text>综合排序</text> <text style="transition:all 0.3s;" :class="{'xuanzhuan':shaixuan}" class="iconfont icon-xiangxia-copy"></text></block>
				</view>

				<view class="flex flex-y-center flex-x-center fs-26 color-999999">
					<view v-if="type==3 || (role_=='shoper')" @tap.stop="filter_1(arr[0])" class="flex flex-y-center" style="margin-left: 50rpx;">
						{{type == 3 ? '销量':'佣金'}}
						<text v-if="arr[0]=== 0" class="iconfont icon-paixu" style="font-size: 28rpx;"></text>
						<text v-else-if="arr[0]===1" class="iconfont icon-shengxu"></text>
						<text v-else-if="arr[0]===2" class="iconfont icon-asc"></text>
					</view>
					<view @tap.stop="filter_2(arr[1])" class="flex flex-y-center" style="margin-left: 50rpx;">
						价格
						<text v-if="arr[1]=== 0" class="iconfont icon-paixu" style="font-size: 28rpx;"></text>
						<text v-else-if="arr[1]===1" class="iconfont icon-shengxu"></text>
						<text v-else-if="arr[1]===2" class="iconfont icon-asc"></text>
					</view>

				</view>

				<!-- 下拉列表开始 -->
				<view class="shaixuan" v-if="shaixuan && type == 2" @touchmove.stop.prevent="clear" @tap.stop="close_filter">
					<view @tap.stop="" class="" style="background-color: #FFFFFF;width: 100%;padding-bottom: 20rpx;border-radius: 0 0 20rpx 20rpx;">
						<!-- <block v-if="type ==3">
							<view @tap="choose_value(item.id)" :class="{'active':shaixuan_value == item.id}" v-for="(item,index) in list_taobao" :key="index"  class="filter-item" >
								{{item.name}}
							</view>
							
						</block> -->
						<block v-if="type ==2">
							<view @tap="choose_value(item.id)" :class="{'active':shaixuan_value == item.id}" v-for="(item,index) in list_jingdong"
							 :key="index" class="filter-item flex flex-y-center">
								{{item.name}}<text v-if="shaixuan_value == item.id" class="iconfont icon-gou pl-24 fs-26"></text>
							</view>
						</block>
					</view>
				</view>
				<!-- 下拉列表结束 -->
			</view>
		</view>

		<!-- 商品区域 -->

		<view class="" v-if="type == 1">
			<!-- 列表开始 -->
			<view class="taolist pr">
				<!-- 选择区 -->
				<view class="choose-option" v-if="chooseOpen" @tap="closeChoose" style="height: 100%;" catchtouchmove="true">
					<view class="bg-white">
						<scroll-view scroll-y="true" class="bg-white" style="padding: 20rpx 0rpx 0 35rpx;height:500rpx;">
							<view class="flex ns-wrap bg-white">
								<view>
									<button :class="'choose-option-content ns-text-limit ' + (chooseIns==0?'choose-active':'')" @tap.stop="chooseAll">全部品牌</button>
								</view>
								<view v-for="(value, index) in brands" :key="index">
									<button :class="'choose-option-content ns-text-limit ' + (value.id==chooseIns?'choose-active':'')" :data-num="index"
									 :data-index="value.id" :data-text="value.name" @tap.stop="chooseBrands">{{value.name}}</button>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<!-- <view class="choose-option" v-if="categoryOpen" @tap="closecategory" style="height: 100%;" catchtouchmove="true">
					<view class="flex ns-wrap bg-white" style="padding: 20rpx 0rpx 0 35rpx;">
						<view>
							<button :class="'choose-option-content ns-text-limit ' + (categoryIns==0?'choose-active':'')" @tap.stop="categoryAll">全部小类</button>
						</view>
						<view v-for="(value, index) in catsList" :key="index">
							<button :class="'choose-option-content ns-text-limit ' + (value.id==categoryIns?'choose-active':'')"
							 :data-num="index" :data-index="value.id" :data-text="value.name" @tap.stop="chooseCategory">{{value.name}}</button>
						</view>
					</view>
				</view> -->
				<view class="choose-option" v-if="smallCatOpen" @tap="closeSmallCat" style="height: 100%;" catchtouchmove="true">
					<view class="bg-white">
						<scroll-view scroll-y="true" class="bg-white" style="padding: 20rpx 0rpx 0 35rpx;height:500rpx;">
							<view class="flex ns-wrap bg-white">
								<view>
									<button :class="'choose-option-content ns-text-limit ' + (smallCatIns==0?'choose-active':'')" @tap.stop="smallCatAll">全部品类</button>
								</view>
								<view v-for="(value, index) in smallCatList" :key="index">
									<button :class="'choose-option-content ns-text-limit ' + (value.id==smallCatIns?'choose-active':'')" :data-num="index"
									 :data-index="value.id" :data-text="value.name" @tap.stop="chooseSmallCat">{{value.name}}</button>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<view class="goods_box">
				<view class="goods_all mt-20 pl-24 pr-24 fs-28 flex" v-for="(item,index) in goods" :key="index" @tap="to_detail('/pages/goods/goods?type=taobao&id=' + item.id)">
					<view class="left">
						<!-- 图片 -->
						<image :src="item.first_cover_pic" class="banner" mode="aspectFit"></image>
					</view>
					<view class="right pl-20 flex-1 flex flex-y flex-x-b">
						<!-- 商品名 -->
						<view class="name">
							{{item.name || ''}}
							<!-- 小图标 -->
							<image :src="item.logo" class="icon_type" mode=""></image>
						</view>
						<!-- 评分 所属 店名 -->
						<view class="flex flex-y-center fs-20 color-fff line1 text-hidden">

							<!-- 评分 -->
							<!-- <text class="pingfen mr-10 ">4.9分</text> -->
							<!-- RRRRRR -->
							<text class="iconfont icon-ai-r mr-10 rr " v-if="false"></text>
							<!-- 自营 -->
							<text class="ziying mr-10 " v-if="item.shop_labels && item.shop_labels.self_market">{{item.shop_labels.self_market}}</text>
							<!-- 京东国际 -->
							<text class="guoji mr-10 " v-if="item.shop_labels && item.shop_labels.jd_national">{{item.shop_labels.jd_national}}</text>
							<!-- 京东好店 -->
							<text class="haodian mr-10" v-if="item.shop_labels && item.shop_labels.jd_good_shop">{{item.shop_labels.jd_good_shop}}</text>
							<!-- 品牌自供 -->
							<text class="zigong mr-10" v-if="item.shop_labels && item.shop_labels.brand_supply">{{item.shop_labels.brand_supply}}</text>

							<text class="text-hidden" style="color: #8D8D8D;">{{item.brand_name || ''}}</text>
						</view>
						<!-- 券后价 -->
						<!-- <view class="flex flex-y-end line2">
							<text>会员价 ¥ {{filters.priceStr(xs(item.price,2))[0] || '0'}}.</text><text class="min">{{filters.priceStr(xs(item.price,2))[1] || '0'}}</text>
						</view> -->
						<!-- 原价 -->
						<!-- <view class="flex flex-x-b flex-y-center line3">
							<view class="flex flex-y-end"><text>原价 ￥ {{filters.priceStr(xs(item.original_price,2))[0] || '0'}}.</text><text
								 class="min">{{filters.priceStr(xs(item.original_price,2))[1]}}</text></view>
							<view>{{' '}}</view>
						</view> -->

						<!-- 券后价 -->
						<view class="flex flex-y-end line2" style="width: 100%;">
							<view class="flex flex-y-end text-hidden" style="color: #EB0401;">
								<text style="line-height: 28rpx;">{{'会员价'}} ¥ {{filters.priceStr(xs(item.price,2))[0]}}.</text>
								<text style="font-size: 18rpx;">{{filters.priceStr(xs(item.price,2))[1]}}</text>
							</view>
							<view class="flex flex-y-end text-hidden" style="margin-left: 24rpx;font-weight: normal;">
								<text style="color: #8D8D8D;line-height: 28rpx;">{{'原价'}} ¥ {{filters.priceStr(xs(item.original_price,2))[0]}}.</text>
								<text style="color: #8D8D8D;font-size: 18rpx;">{{filters.priceStr(xs(item.original_price,2))[1]}}</text>
							</view>
						</view>
						<!-- 原价 -->

						<!-- 券  小亲赚-->
						<view class="flex flex-x-b flex-y-end line4">
							<view class="flex">
								<text>{{' '}}</text>
								<!-- <text class="quan1">券<text class="quan_num">25元</text></text> -->
								<text class="zhuan" v-if="role_ == 'shoper'  && commission_show && item.commission">赚<text class="zhuan_num">{{xs(item.commission,2)}}</text></text>
							</view>

						</view>
						<view class="flex flex-x-b flex-y-end line4">
							<view class="flex-1">
								<view class="fs-24 color-489A19" v-if="item.activity_start_time">{{item.activity_start_time}}</view>
							</view>
							<view @tap.stop="compare(item.name)" class="fs-24" style="color:#EB0401;text-decoration: underline;">
								比价
							</view>
							<button style="margin-left: 30rpx;" v-if="(app=='qinpu'&&type == 1) || (app=='lianmeng'&&type!=1)" class="share"
							 @tap.stop="mycopy(item.desc?item.desc:item.name)" open-type="share" :data-title="item.desc?item.desc:item.name"
							 :data-id="item.id" :data-img="item.first_cover_pic">一键转发</button>
						</view>
					</view>
				</view>
			</view>
			<view class="footer-text flex flex-x-center flex-y flex-y-center" v-if="is_null" style="background-color: #F4F4F4;">
				<view class="iconfont icon-kongbaiye1" style="font-size: 400rpx;margin-top: 200rpx;color: #B0B0B0;"></view>
				<view class="fs-26" style="margin-top: 90rpx;line-height: 55rpx;color: #B0B0B0;">
					<view>不是每款商品都有品牌折扣好价</view>
					<view>没有找到你想要的商品</view>
					<view> 换个词试试看吧</view>
				</view>
			</view>
			<!-- 列表结束 -->
		</view>
		<view class="" v-else-if="type == 2 || type == 3">
			<view class="flex flex-x-b flex-y-center fs-26 color-333333 pl-24 pr-24" v-if="false">
				<text>仅展示优惠券商品</text>
				<text @click="change_quan(false)" v-if="show_quan" style="color:#999999" class="iconfont icon-kaiguankai"></text>
				<text @click="change_quan(true)" v-else style="color:#F23005" class="iconfont icon-kaiguankai1"></text>
			</view>
			<!-- 列表开始 -->

			<goods-all :list="goods" :type="type==3?'taobao':'jingdong'" :compare="true" :myclick="true" @good_detail="to_detail"
			 @compare="compare">
				<view slot="footer" class="footer-text flex flex-x-center flex-y flex-y-center" v-if="is_null" style="background-color: #F4F4F4;">
					<view class="iconfont icon-kongbaiye1" style="font-size: 400rpx;margin-top: 200rpx;color: #B0B0B0;"></view>
					<view class="fs-26" style="margin-top: 90rpx;line-height: 55rpx;color: #B0B0B0;">
						<view>不是每款商品都有隐藏优惠券</view>
						<view>没有找到你想要的商品</view>
						<view> 换个词试试看吧</view>
					</view>
					<view style="text-align: center;" v-if="app!='lianmeng' || true">
						<view @tap="less(to_qinjian)" class="fs-30 flex flex-x-center" style="background-color: #FFFFFF;display: inline-block;width: 280rpx;height: 78rpx;color: #F23005;border-radius: 40rpx;border: 1rpx solid #F23005;line-height: 80rpx;">
							<text>亲导购·全网省 </text>
							<!-- <text class="iconfont icon-sanjiaoxing1 ml-10 fs-24"></text> -->
						</view>
					</view>
				</view>
			</goods-all>
		</view>


	</view>
</template>

<script>
	let utils = require('../../utils/util.js');
	import goodsAll from '@/components/goodsAll.vue';
	export default {
		data() {
			return {
				app: 'qinpu', //亲铺
				// app:'lianmeng',//亲联盟
				type: 1, //1亲铺  2京东  3淘宝
				show_quan: false,
				nav_index: 0,
				keyword: '', //搜索关键字
				page: 1,
				goods: [], //商品列表
				next_page: true, //请求下一页
				filters: require('../../utils/filters.js'),
				is_null: false, //搜索结果为空
				img_null: '', //搜索结果为空图片
				arr: [0, 0], //筛选状态
				navs: [],
				shaixuan: false, //下拉显示变量
				shaixuan_value: '',
				list_taobao: [
					// {name:'综合排序',id:'default'},
					{
						name: '销量排序',
						id: 'total_sales_des'
					}
				],
				list_jingdong: [
					//OrderCount30Days  goodComments  sale
					{
						name: '热销排序',
						id: 'OrderCount30Days'
					},
					{
						name: '好评排序',
						id: 'goodComments'
					},
					{
						name: '折扣排序',
						id: 'sale'
					}
				],
				role: uni.getStorageSync('role'),
				morenBrank: '全部品牌',
				morenCategory: '全部小类',
				morenSmallCat: '全部品类',
				brands: [],
				catsList: [],
				smallCatList: [],
				showHotsearch: false,
				showHistor: false,
				smallCatOpen: false,
				p_cat_id: '', // 分类id
				chooseIns: '',

			};
		},
		components: {
			goodsAll
		},
		onLoad(e) {
			this.app = getApp().globalData.app || 'qinpu';
			this.getApp().page.onLoad(this, e);
			this.$store.commit('vuexSet', {
				name: 'options',
				value: e
			})
			this.get_img();
			uni.hideShareMenu()
			// if (e.type) {
			// 	this.type = e.type;
			// 	this.nav_index = e.type;
			// }
			if (e.keyword)
				this.keyword = e.keyword;
			if (this.keyword) {
				// console.log('参数有keyword，去搜索')
				this.get_nav(e.type);
				return;
			}
			//默认去获取nav
			this.get_nav(e.type);
		},
		onShow() {
			if (this.login())
				return;

		},
		methods: {
			//比价
			compare(name) {
				uni.pageScrollTo({
					scrollTop: 0
				});
				this.keyword = name;
				this.page = 0;
				this.is_null = false;
				this.next_page = true;
				this.sendEvent("搜索页比价", {
					"用户ID": uni.getStorageSync('USER_INFO').id,
					"用户昵称": uni.getStorageSync('USER_INFO').nickname,
				})
				this.seach();
				// this.mycopy(name);

			},
			change_nav(index) {
				if (this.login())
					return;
				this.nav_index = index;
				this.type = this.get_type(index);
				this.page = 1;
				this.goods = [];
				this.next_page = true;

				this.shaixuan_value = "";
				this.close_filter();
				this.seach();
			},
			//获取type的类型
			get_type(index) {
				if (this.navs.length == 0)
					return 1;
				let type = String(this.navs[index].name) || '';
				if (!type) {
					return 1;
				}
				switch (type) {
					case 'qinpu':
						return 1;
					case 'jingdong':
						return 2;
					case 'taobao':
						return 3;
				}
				return 1;
			},
			//设置type的类型
			set_type(type) { //index 是数字

				this.type = type;
				let name = type == 1 ? 'qinpu' : type == 2 ? 'jingdong' : type == 3 ? 'taobao' : '999999';
				if (this.navs.length == 0)
					return;
				let nav_index = 0;
				this.navs.forEach((val, index) => {
					if (val.name == name) {
						nav_index = index;
					}
				})
				this.nav_index = nav_index;
				if (nav_index == 0)
					this.type = 1;
			},
			change_quan(type) {
				this.show_quan = type;
			},
			seach() {
				if (this.login())
					return;
				// if (!this.keyword)
				// 	return;

				this.is_null = false;
				this.page = 1;
				this.next_page = true;
				this.sendEvent("搜索", {
					"用户ID": uni.getStorageSync('USER_INFO').id,
					"用户昵称": uni.getStorageSync('USER_INFO').nickname,
					"搜索关键字": this.keyword
				})

				if (this.login())
					return;
				switch (Number(this.type)) {
					case 1:
						this.seach_qinpu();
						break;
					case 2:
						this.seach_jingdong();
						break;
					case 3:
						this.seach_taobao();
						break;

				}

			},
			clear_search() {
				this.keyword = "";
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
			//亲铺搜索
			seach_qinpu() {
				uni.showLoading({
					title: '请求商品列表中',
					mask: false
				});
				// sort: 'c1',佣金
				// sort: 'price',价格
				// by: 'asc'
				let sort = '';
				let sortName = '';
				let p_cat_id = this.p_cat_id;
				if (this.arr[0] != this.arr[1]) {
					p_cat_id = ""
					if (this.arr[0] != 0) {
						sortName = 'c1';
						sort = this.arr[0] == 1 ? 'asc' : 'desc';
					}
					if (this.arr[1] != 0) {
						sortName = 'price';
						sort = this.arr[1] == 1 ? 'asc' : 'desc';
					}
				}

				if (p_cat_id != '') {
					sort = "";
					sortName = "";
				}
				let type_now = this.type;
				this.getApp().request({
					url: this.getApp().api.default.search_goods,
					data: {
						q: this.keyword,
						page: this.page,
						sort: sortName,
						by: sort,
						p_cat_id: p_cat_id,
						brand_id: this.brand_id || ''
					},
					success: (res) => {
						if (type_now != this.type) return;
						let data = [];
						if (res.data && res.data.goods instanceof Array) {
							data = res.data.goods || [];
						}
						if (res.code == 0) {
							var datas = res.data;
							var catsList = [],
								goodsList = [],
								smallCatList = [],
								brands = [];
							if (datas.brands.length > 0) {
								this.brands = datas.brands
							}
							if (datas.cats.length > 0) {
								this.catsList = datas.cats
							}
							if (datas.p_cats.length > 0) {
								this.smallCatList = datas.p_cats
							}
							if (this.page == 1) {
								// this.goods = data || [];
								if (data.length == 0) {
									// this.is_null = true;
								}
							} else if (this.page > 1) {
								// this.goods = this.goods.concat(data);
								if (data.length == 0) {
									// this.no_more();
								}
							}
							// this.page++;
						}
					},
					complete: () => {
						uni.hideLoading();
						// this.next_page = true;
					}
				});


				// 商品搜索，不包含分类
				this.getApp().request({
					url: this.getApp().api.default.search_goods_new,
					header:{
						['content-type']: 'application/json'
					},
					method: 'POST',
					data: {
						name: this.keyword || '',
						page: this.page || 1,
						sort: sortName,
						by: sort,
						cat_id: parseInt(p_cat_id) || 0,
						brand_id: parseInt(this.brand_id) || 0
					},
					success: (res) => {
						let data = [];
						if (res.data && res.data.goods instanceof Array) {
							data = res.data.goods || [];
						}
						if (res.code == 0) {
							// var datas = res.data;
							// var catsList = [],
							// 	goodsList = [],
							// 	smallCatList = [],
							// 	brands = [];
							// if (datas.brands.length > 0) {
							// 	this.brands = datas.brands
							// }
							// if (datas.cats.length > 0) {
							// 	this.catsList = datas.cats
							// }
							// if (datas.p_cats.length > 0) {
							// 	this.smallCatList = datas.p_cats
							// }
							if (this.page == 1) {
								this.goods = data || [];
								if (data.length == 0) {
									this.is_null = true;
								}
							} else if (this.page > 1) {
								this.goods = this.goods.concat(data);
								if (data.length == 0) {
									this.no_more();
								}
							}
							this.page++;
						}
						if (res.code == -1) {
							console.log('不走重新登录');
						}
					},
					complete: () => {
						uni.hideLoading();
						this.next_page = true;
					}
				});
			},
			// 品类选择
			openSmallCat() {
				this.setData({
					smallCatOpen: !this.smallCatOpen,
					categoryOpen: false,
					chooseOpen: false,

				})
			},
			closeSmallCat() {
				this.setData({
					smallCatOpen: !this.smallCatOpen
				})
			},
			smallCatAll() {
				var self = this
				self.setData({
					smallCatIns: 0,
					chooseIns: 0,
					categoryIns: 0,
					morenSmallCat: '全部品类',
					morenBrank: '全部品牌',
					morenCategory: '全部小类'
				})
				uni.showLoading({
					title: '加载中'
				})
				this.p_cat_id = ""
				this.seach();
				this.smallCatOpen = false;
				return;
			},
			chooseSmallCat(e) {
				console.log(e);
				var self = this
				var id = e.currentTarget.dataset.index
				var text = e.currentTarget.dataset.text

				self.setData({
					smallCatIns: id,
					morenSmallCat: text,
					chooseIns: 0,
					categoryIns: 0,
					morenBrank: '全部品牌',
					morenCategory: '全部小类',
					p_cat_id: id
				})

				this.seach();
				this.smallCatOpen = false;
				return;
			},
			// 品牌选择
			openChoose() {
				this.setData({
					chooseOpen: !this.chooseOpen,
					categoryOpen: false,
					smallCatOpen: false,
				})
			},
			closeChoose() {
				this.setData({
					chooseOpen: !this.chooseOpen
				})
			},
			chooseAll() {
				var self = this
				// uni.showLoading({
				// 	title: '加载中'
				// })
				this.morenBrank = "全部品牌"
				this.p_cat_id = this.p_cat_id || '';
				this.brand_id = '';
				this.seach();
				this.chooseOpen = false;
				return;
			},
			chooseBrands(e) {
				var self = this
				var id = e.currentTarget.dataset.index
				var text = e.currentTarget.dataset.text
				this.morenBrank = text
				// uni.showLoading({
				// 	title: '加载中'
				// })
				this.brand_id = id || '';
				this.p_cat_id = this.p_cat_id || '';
				this.chooseIns = id || ''
				this.seach();
				this.chooseOpen = false;
				return;
			},
			//京东搜索
			seach_jingdong() {
				uni.showLoading({
					title: '请求商品列表中',
					mask: false
				});
				let type_now = this.type;
				let sort = '';
				let sortName = '';
				if (this.arr[0] != this.arr[1]) {
					if (this.arr[0] != 0) {
						sortName = 'commission';
						sort = this.arr[0] == 1 ? 'asc' : 'desc';
					}
					if (this.arr[1] != 0) {
						sortName = 'price';
						sort = this.arr[1] == 1 ? 'asc' : 'desc';
					}
				} else if (this.arr[0] == 0 && this.arr[0] == this.arr[1]) {
					if (this.shaixuan_value) {
						sortName = this.shaixuan_value;
						sort = 'desc';
					}
				}
				//OrderCount30Days  goodComments  sale

				let data = {
					sortName: sortName,
					//排序字段：finally券后价；brokerage佣金比例；sale折扣力度；OrderCount30Days 30天引入订单量；inOrderComm30Days 30天支出佣金；getCouponNum领券量；comments评论数；goodComments好评数
					sort: sort, //asc,desc升降序
					price_start: '', //最低价
					price_end: '', //最高价
					keyword: this.keyword || "",
					page: this.page,
					type: 22,
				};
				this.getApp().request({
					data: data,
					// url: this.getApp().api.taoke.tk_goods,
					// url: this.keyword.trim() ? this.getApp().api.taoke.tk_seach : this.getApp().api.taoke.tk_goods,
					url: this.getApp().api.taoke.tk_seach,
					success: (res) => {
						if (type_now != this.type) return;
						// console.log('goods',res.data.result.data);
						let data = [];
						if (res.data && res.data.good_list instanceof Array) {
							data = res.data.good_list;
						} else if (res.data instanceof Array) {
							data = res.data;
						}
						if (res.code == 0) {

							if (this.page == 1) {
								this.goods = data || [];
								if (data.length == 0) {
									this.is_null = true;
								}
							} else if (this.page > 1) {
								this.goods = this.goods.concat(data);
								if (data.length == 0) {
									this.no_more();
								}
							}
							this.page++;
						}
						if (res.code == 1) {
							console.log(999)
							this.timeOut(() => {
								this.showToast(res.msg);
								if (res.msg == '请先登录') {
									uni.setStorageSync('ACCESS_TOKEN', '');
									this.login();
								}
							}, 200)
						}
					},
					complete: res => {
						uni.hideLoading();
						this.next_page = true;
					}
				});
			},
			//淘宝搜索
			seach_taobao() {
				let type_now = this.type;
				if (!this.next_page)
					return;
				this.next_page = false;
				uni.showLoading({
					title: '请求商品列表中',
					mask: false
				});
				let sort = '';
				let sortName = '';
				if (this.arr[0] != this.arr[1]) {
					if (this.arr[0] != 0) {
						sortName = 'total_sales';
						sort = this.arr[0] == 1 ? 'asc' : 'des';
					}
					if (this.arr[1] != 0) {
						sortName = 'price';
						sort = this.arr[1] == 1 ? 'asc' : 'des';
					}
					if (sortName) {
						sort = sortName + '_' + sort;
					}
				} else if (this.arr[0] == 0 && this.arr[0] == this.arr[1]) {
					if (this.shaixuan_value) {
						sort = this.shaixuan_value;
						if (sort == 'default') {
							sort = "";
						}
					}
				}
				let data = {
					type: 12,
					// sortName:'finally',
					//排序字段：finally券后价；brokerage佣金比例；sale折扣力度；OrderCount30Days 30天引入订单量；inOrderComm30Days 30天支出佣金；getCouponNum领券量；comments评论数；goodComments好评数
					// sort:this.order,//asc,desc升降序
					// price_start:'', //最低价
					// price_end:'',//最高价
					keyword: this.keyword || "",
					page: this.page,
					pagesize: 10,
					sort: sort, //排序方式，默认为0，0-综合排序，1-商品上架时间从高到低，2-销量从高到低，3-领券量从高到低，4-佣金比例从高到低，5-价格（券后价）从高到低，6-价格（券后价）从低到高
				};
				this.getApp().request({
					data: data,
					// url: this.keyword.trim() ? this.getApp().api.taoke.tk_seach : this.getApp().api.taoke.tk_goods,
					url: this.getApp().api.taoke.tk_seach,
					success: (res) => {
						if (type_now != this.type) return;
						let data = [];
						if (res.data && res.data instanceof Array) {
							data = res.data;
						}
						// if (res.data && res.data instanceof Array) {
						// 	data = res.data;
						// }
						if (res.code == 0) {

							if (this.page == 1) {
								this.goods = data || [];
								if (data.length == 0) {
									this.is_null = true;
								}
							} else if (this.page > 1) {
								this.goods = this.goods.concat(data);
								if (data.length == 0) {
									this.no_more();
								}
							}
							this.page++;

						}
						if (res.code == 1) {
							console.log(999)
							this.timeOut(() => {
								this.showToast(res.msg);
								if (res.msg == '请先登陆') {
									uni.setStorageSync('ACCESS_TOKEN', '');
									this.login();
								}
							}, 200)
						}
					},
					complete: res => {
						uni.hideLoading();
						this.next_page = true;
					}
				});
			},
			//商品详情
			to_detail(url) {
				let appid = this.get_appid();
				//亲铺
				if (this.app == 'qinpu') {
					//打开小程序
					// console.log('亲铺环境');
					if (this.type == 1) {
						uni.navigateTo({
							url: url
						})
					} else if (this.type == 2) {
						this.toPage(url);
					} else if (this.type == 3) {
						//去亲荐
						// uni.navigateToMiniProgram({
						// 	// appId: 'wx21bb579824e96e36', //app.json内容
						// 	appId: appid || 'wx92c0c6db7d6c68d7',
						// 	path: url + '&keyword=' + this.keyword + '&type_brand=' + this.type,
						// 	extraData: {
						// 		token: uni.getStorageSync('ACCESS_TOKEN'),
						// 		_mchInfo: uni.getStorageSync('_mchInfo')
						// 	},
						// 	envVersion: 'trial',
						// 	success(res) {

						// 	}
						// })
						// @tap.stop="less(toApp,'pages/goodsTK/goodsTK?id=' + item.goods_id + '&type=' + type)
						this.toApp(url);
					}
				} else {
					//去商品详情
					// console.log('亲联盟环境');
					if (this.type == 1) {
						uni.navigateToMiniProgram({
							appId: appid || 'wx6b45b7c7a0b3b9fc', //app.json内容
							path: url,
							extraData: {
								token: uni.getStorageSync('ACCESS_TOKEN'),
								_mchInfo: uni.getStorageSync('_mchInfo')
							},
							envVersion: 'trial',
							success(res) {

							}
						})
					} else if (this.type == 2 || this.type == 3) {
						uni.navigateTo({
							url: url
						})
					}
				}
			},
			//获取图片
			get_img() {
				// imgs
				this.getApp().request({
					data: {
						type: 12
					},
					url: this.getApp().api.taoke.tk_goods,
					success: (res) => {

						// console.log('res',res)
						if (res.code == 0) {

							this.img_null = (res.data && res.data.imgs && res.data.imgs.search) || '';
						}
					}

				});
			},
			no_more() {
				setTimeout(() => {
					uni.showToast({
						icon: 'none',
						title: '没有更多啦',
						duration: 2000
					})
				}, 200)
			},
			xia_qinpu: utils.throttle(function(item) {
				item = item[0];
				this.getApp().request({
					data: {
						goods_id: item.id,
						sidFsShare: 1
					},
					url: this.getApp().api.default.goods_qrcode,
					success: (res) => {
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
			download_share: utils.throttle(function(item) {
				//下载

				item = item[0];
				this.getApp().request({
					data: {
						id: item.goods_id,
						type: (this.type == 3 ? 'taobao' : 'jingdong') || '',
						goods_name: item.goods_name || '',
						price: item.final_price || '', //售价
						original_price: item.goods_price || '', //原价
						cover_pic: item.goods_img || '',
						page_url: 'pages/goodsTK/goodsTk',
					},
					url: this.getApp().api.taoke.tk_qcode,
					success: (res) => {
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
			//拥挤筛选
			filter_1(x) {
				x = Number(x);
				switch (x) {
					case 0:
						this.arr = [2, 0];
						break;
					case 1:
						this.arr = [0, 0];
						break;
					case 2:
						this.arr = [1, 0];
						break;
				}

				this.shaixuan = false;
				this.shaixuan_value = '';
				this.seach();
			},
			//价格筛选
			filter_2(x) {
				x = Number(x);
				switch (x) {
					case 0:
						this.arr = [0, 1];
						break;
					case 1:
						this.arr = [0, 2];
						break;
					case 2:
						this.arr = [0, 0];
						break;
				}

				this.shaixuan = false;
				this.shaixuan_value = '';
				this.seach();
			},
			get_nav(type) {
				this.getApp().request({
					data: {},
					url: this.getApp().api.taoke.tk_nav,
					success: (res) => {
						if (res.code == 0) {
							// console.log('nav', res);
							this.navs = res.data || [];
							// this.navs = this.navs.filter(val=>{
							// 	return val.name != 'taobao';
							// })
							if (type) {
								this.set_type(type);
							}

							//搜索
							this.seach();
						}
					}
				});
			},
			clear(e) {
				// TODO nvue 取消冒泡
				e.stopPropagation()
			},
			close_filter() {
				this.shaixuan = false;
			},
			open_filter() {
				this.shaixuan = true;
			},
			choose_value(id) {
				if (this.shaixuan_value == id) {
					this.shaixuan_value = '';
				} else {
					this.shaixuan_value = id || '';
				}
				this.close_filter();
				this.arr = [0, 0];
				this.page = 1;
				this.goods = [];
				this.next_page = true;
				this.seach();
			},
			//亲铺环境下，淘宝和京东没有搜到，就去亲荐搜
			to_qinjian() {
				uni.navigateToMiniProgram({
					// appId: 'wx21bb579824e96e36', //app.json内容
					appId: this.get_appid() || 'wx92c0c6db7d6c68d7',
					path: '/pages/seachAll/seachAll?' + 'keyword=' + this.keyword + '&type=' + this.type,
					extraData: {
						token: uni.getStorageSync('ACCESS_TOKEN'),
						_mchInfo: uni.getStorageSync('_mchInfo')
					},
					envVersion: 'trial',
					success(res) {

					}
				})
			},
			//获取要跳转的Appid
			get_appid() {
				let type = 'qinpu';
				let appid = '';
				if (this.type == 1)
					type = 'qinpu';
				if (this.type == 2) {
					type = 'jingdong';
				}
				if (this.type == 3) {
					type = 'taobao';
				}
				this.navs.some(val => {
					{
						// console.log(val.app_id,'------',type)
						if (val.name == type) {
							appid = val.app_id;
							return true;
						}
					}
				});
				console.log('appid', appid);
				return appid;
			}
		},
		onReachBottom() {
			//下一页
			switch (Number(this.type)) {
				case 1:
					this.seach_qinpu();
					break;
				case 2:
					this.seach_jingdong();
					break;
				case 3:
					this.seach_taobao();
					break;

			}
		},
		onShareAppMessage(res) {
			let title = '';
			let img = '';
			let id = '';
			let page = '';
			if (res.from === 'button') { // 来自页面内分享按钮
				this.sendEvent("搜索页一键转发", {
					"用户ID": uni.getStorageSync('USER_INFO').id,
					"用户昵称": uni.getStorageSync('USER_INFO').nickname,
				})
				// console.log('分享', res)
				title = res.target.dataset.title;
				id = res.target.dataset.id;
				img = res.target.dataset.img;
				if (this.type == 1) {
					page = '/pages/goods/goods?id=' + id + '&mch_id=' + (uni.getStorageSync('_mchInfo').id || '')
				} else {
					if (this.type == 2) {
						page = '/pages/goodsTK/goodsTK?type=jingdong' + '&id=' + id + '&mch_id=' + (uni.getStorageSync('_mchInfo').id ||
							'')
					}
					if (this.type == 3) {
						page = '/pages/goodsTK/goodsTK?type=taobao' + '&id=' + id + '&mch_id=' + (uni.getStorageSync('_mchInfo').id || '')
					}
				}
				return {
					title: title,
					path: page,
					imageUrl: img,
					mch_id: uni.getStorageSync('_mchInfo').id || ''
				}
			}
			return {

				mch_id: uni.getStorageSync('_mchInfo').id || '',
				page: '/pages/seachAll/seachAll' + 'mch_id=' + (uni.getStorageSync('_mchInfo').id || '')
			}

		}
	}
</script>

<style lang="scss">
	// 新样式


	page {
		background-color: #F4F4F4;
	}

	.tablist {
		font-size: 32rpx;
		color: #333333;
	}

	.tablist .active {
		color: #F23005;
		font-size: 36rpx;
		font-weight: bold;
	}


	/////
	.shaixuan {
		position: absolute;
		left: 0;
		top: 100%;
		height: 200vh;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.5);

		.filter-item {
			color: #666666;
			font-size: 28rpx;
			padding-left: 24rpx;
			padding-top: 20rpx;
		}

		.active {
			color: #F76436;
		}
	}

	.xuanzhuan {
		transform: rotate(180deg);
	}



	///////////////////////list

	.taolist {
		width: 100%;
		// margin-left: 24rpx;
		padding: 0 24rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
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

	.choose-btn {
		width: 180rpx;
		height: 47rpx;
		line-height: 47rpx;
		padding-left: 15rpx;
		text-align: center;
		font-size: 28rpx;
		color: #fff;
		background: #F23005;
		border-radius: 24rpx;
	}


	.choose-option {
		position: absolute;
		top: 0;
		left: 0rpx;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.35);
		/* background: #fff; */
		z-index: 999;

	}

	.choose-option-content {
		width: 200rpx;
		text-align: center;
		border: 1rpx solid #8D8D8D;
		line-height: 1 !important;
		padding: 8rpx 8rpx;
		border-radius: 25rpx;
		margin-bottom: 20rpx;
		margin-right: 39rpx;
		font-size: 28rpx;
		color: #8D8D8D;
	}

	.choose-active {
		color: #F23005;
		border: 1rpx solid #F23005;
	}

	.choose-option-content-no {
		border: 2rpx solid #D6D6D6;
		color: #8D8D8D;
	}

	.change {
		transform: rotate(-180deg);
	}



	//////////////////////list
</style>
