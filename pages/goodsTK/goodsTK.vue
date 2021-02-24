<template>
	<view>
		<common></common>
		<goodsbanner :background_title="background_title" :title_title="title_title" :myBack="back" @myback="myback" :goods="goods_all"
		 @getGoodsQrcode="xiazai" page_url="goodsTK"></goodsbanner>
		<view v-if="show">
			<!-- 价格开始 -->
			<goods-name :shop_labels="shop_labels" :goods_id="id" :haoping="haoping" :desc="desc" :shopName="shopName" @xiazai="xiazai"
			 :title="title" :originalPrice="originalPrice" :actualPrice="actualPrice" @showModel="showShareModal" :type1="type"></goods-name>
			<!-- 优惠信息 -->
			<goods-discounts @lingqu="lingqu" :couponPrice="couponPrice" :couponEndTime="couponEndTime" :couponStartTime="couponStartTime"></goods-discounts>
			<goods-shoper ref="shoper"></goods-shoper>
			<!-- 推荐理由开始 -->
			<!-- 佣金 -->
			<view class="flex-row flex-y-center select_attrs mt-20 pl-24 pr-24" style="background-color: #FFFFFF;height: 102rpx;">

				<view class="flex-grow-1 flex-row flex-y-center">
					<block v-if="commission_show && commission && role_=='shoper'">
						<view style="color:#2c2c2c;" class="fs-30 ns-text-bold">佣金</view>
						<view class="attrs flex align-center">
							<view class="text-center flex align-center">
								<view class="ml-24"><text @tap="less(toPage,'/pages/article-detail/article-detail?id=85')" class="iconfont icon-bangzhuzhongxin"></text><text
									 @tap="less(toPage,'/pages/article-detail/article-detail?id=85')" style="color:#F23005;margin-left: 15rpx;">预估</text>销售佣金</view>
								<view class="fs-30 color-EB0401 ns-text-bold">￥{{commission}}</view>
							</view>
						</view>
					</block>
					<block v-else>
						<text style="color:#2c2c2c;" class="fs-30 ns-text-bold ">服务</text>
						<text class="attrs ml-24">
							<text style="margin-right:10rpx">买之前 问亲铺 · 亲导购 全网省</text>
						</text>
					</block>
				</view>
				<view class="flex-grow-0" v-if="role_=='shoper'">
					<text :class="'iconfont ' + (commission_show?'icon-yanjing':'icon-yanjing1') + ' fs-36 color-8D8D8D'" @tap="commisionBtn"></text>
				</view>
			</view>


			<!-- 商品区域开始 -->
			<view class="goods_c mt-20" style="background-color: #FFFFFF;padding: 24rpx 24rpx 6rpx 24rpx;" v-if="shopName">
				<view class="flex pr">
					<image :src="shopLogo || (type=='jingdong'?init_img.jing_dong:'') || init_img.default_tx" style="font-size: 0;width: 100rpx;height: 100rpx;background-color: #EEEEEE;border-radius: 12rpx;"
					 mode="aspectFill"></image>
					<view class="flex-1 pl-24">
						<view style="color: #333333;font-size: 36rpx;">
							{{shopName}}
						</view>
						<view class="fs-24 color-333333" style="padding-top:20rpx;">
							<text style="margin-right: 22rpx;">宝贝服务{{dsrScore}}</text><text style="margin-right: 22rpx;">卖家服务{{serviceScore}}</text><text
							 style="margin-right: 22rpx;">物流服务{{shipScore}}</text>
						</view>
					</view>
					<!-- 查看更多 -->
					<view v-if="show_more_quan" @tap="less(toPage,'/member/more_quan/more_quan?id=' + shop_id + '&type='+type)" class=""
					 hover-class="click1" style="width: 150rpx;height: 54rpx;line-height: 54rpx;color: #EB0401;font-size: 28rpx;border-radius:29rpx;border: 2rpx solid #EB0401;position: absolute;top:0;right: 0;z-index: 2;text-align: center;align-items: center;">
						更多券
					</view>
				</view>
			</view>


			<!-- 商品区域结束 -->

			<!-- 推荐理由结束 -->
			<!-- 列表开始 -->
			<view style="background-color: #FFFFFF;overflow: hidden;" v-if="type == 'taobao'">
				<goods-all showType="1" :list="goods_other"></goods-all>
			</view>
			<!-- 列表结束 -->
			<!-- 列表开始 -->
			<view style="background-color: #FFFFFF;overflow: hidden;" v-else>
				<goods-all showType="1" :list="goods_other" type="jingdong"></goods-all>
			</view>
			<!-- 列表结束 -->
			<view style="height: 24rpx;">

			</view>
			<!-- 商品详情 -->
			<!-- <block v-if="goods_detail.length>0">
			<image :lazy-load="true" @tap="see_img(item,goods_detail)" v-for="(item,index) in goods_detail" :key="index" :src="item"
			 mode="widthFix" style="font-size: 0 !important;width: 100%;height: auto;line-height: 0 !important;display: block;margin-top: -1rpx;"></image>
		</block> -->
			<goodsDetail :material="material" :tkGoods="goods_detail"></goodsDetail>

		</view>
		<!-- 商品详情 -->
		<!-- <block v-if="goods_detail.length>0">
			<image :lazy-load="true" @tap="see_img(item,goods_detail)" v-for="(item,index) in goods_detail" :key="index" :src="item"
			 mode="widthFix" style="font-size: 0 !important;width: 100%;height: auto;line-height: 0 !important;display: block;margin-top: -1rpx;"></image>
		</block> -->

		<!-- 广告宣传开始 -->
		<view v-if="false" style="background-color: #FFFFFF;text-align: center; color: #D8D8D8;overflow: hidden;">
			<view style="opacity: 0.5;">
				<view style="background-color: #D8D8D8; color: #FFFFFF;border-radius: 36rpx;width: 72rpx;height: 72rpx;margin: 60rpx auto 0 auto;"
				 class="flex flex-x-center flex-y-center">
					<text class="iconfont icon-qinpuLOGO" style="font-size: 72rpx;"></text>
				</view>
				<view style="margin-top: 15rpx;padding-bottom: 30rpx;width: 100%;font-size: 24rpx;">
					买之前 问亲铺 省钱 省事 省时间
				</view>
			</view>
		</view>
		<!-- 广告宣传结束 -->


		<goods-footer :type="type" :couponPrice="couponPrice" :commission="commission" @copyGoodsLink="copyGoodsLink"></goods-footer>





		<!-- 淘宝复制成功弹窗 -->
		<uni-popup type="center" ref="showtaobao" :maskClick="false">
			<view class="" style="width: 580rpx;background-color: #FFFFFF;border-radius: 20rpx;text-align: center;
			padding: 80rpx 40rpx 40rpx 40rpx;">
				<view class="fs-30 color-333333">
					优惠券已复制
					<view>打开淘宝APP领券下单</view>
				</view>
				<view class="align-center" style="text-align: center;margin-top: 30rpx;">
					<text v-if="check_false" @click="awary_show" class="iconfont icon-xuanzhong" style="padding-right: 10rpx;width: 30rpx;"></text>
					<text v-else class="" @click="awary_show" style="margin-right: 10rpx;display: inline-block;border-radius: 50rpx;width:30rpx;height: 30rpx;border:1rpx solid #999999;transform: translateY(3rpx);"></text>
					知道了，不再提醒
				</view>
				<view @click="close_taobao" class="" style="width: 500rpx;height: 88rpx;background: #FF401A;box-shadow: 0rpx 7rpx 16rpx 0px rgba(255, 69, 32, 0.55);border-radius: 44rpx;color:#FFFFFF ;margin-top: 38rpx;line-height: 88rpx;">
					知道了
				</view>
				<view class="fs-30 color-333333" style="margin-top: 47rpx;">
					<text style="color: #FF401A;text-decoration: underline;" @tap.stop="toPage1('/pages/video/video?id=409')">不会操作？查看攻略</text>
				</view>
				<!-- <view v-if="role_ == 'shoper'" class="fs-30 color-333333" style="margin-top: 36rpx;color: #FF401A;" @tap="see_detail">
					我想签约亲联盟赚佣金
				</view> -->
			</view>
		</uni-popup>
		<!-- 淘宝复制成功弹窗 -->







		<view class="" style="height: 110rpx;">

		</view>
		<!-- 分享组件 -->
		<share2 ref="share"></share2>
		<!-- 分享组件 -->


		<!-- 签约入口二开始 -->
		<view v-if="role_ == 'shoper' && !signup && max_key == 99" style="width: 750rpx;height: 100vh;background-color: rgba(0,0,0,0.5);position: fixed;z-index: 9999;left: 0;top:0;"
		 @touchmove.stop.prevent="">
			<view style="position: fixed;left: 50%;top:50%;transform: translate(-50%,-50%);width: 530rpx;height: 743rpx;">
				<view class="flex flex-y flex-y-center" style="width: 530rpx;height: 633rpx;background-color: #FFFFFF;border-radius: 18rpx;overflow: hidden;">
					<view class="" style="width: 530rpx;height: 150rpx;background: linear-gradient(225deg, #F76436 0%, #F49E3A 100%);font-size: 40rpx;color: #FFFFFF;line-height: 150rpx;text-align: center;">
						签约提示
					</view>
					<view class="flex-1" style="padding: 30rpx 40rpx 0 40rpx;width: 100%;font-size: 30rpx;color: #595959;line-height: 56rpx;">
						<view>邀你一起，体验全网省全新功能：</view>
						<view>1、海量大额隐藏券</view>
						<view>2、品类齐全，买之前，先找券</view>
						<view>3、领券还能赚佣金</view>
						<view>4、好货多分享，收益不封顶</view>
						<view>立即签约，坐享收益</view>
					</view>
					<view @tap="less(to_qianyue)" class="color-fff" style="margin-bottom: 50rpx;font-size: 30rpx;width: 400rpx;height: 70rpx;line-height: 70rpx;text-align: center;border-radius: 35rpx;background: linear-gradient(225deg, #F76436 0%, #F49E3A 100%);">
						立即签约
					</view>
				</view>
				<view style="text-align: center;margin-top: 50rpx;">
					<text @tap="close_qianyue" class="iconfont icon-guanbi color-fff" style="font-size: 60rpx;text-align: center;"></text>
				</view>
			</view>
		</view>
		<!-- 签约入口二结束 -->


		<!-- 回到顶部 -->
		<view v-if="show_top" @tap.stop="to_top" hover-class="click" class="flex flex-y flex-x-center flex-y-center" style="position: fixed;right: 24rpx;bottom: 150rpx;background-color: rgba(0,0,0,0.5);width: 80rpx;height: 80rpx;border-radius: 40rpx;z-index: 9;">
			<text class="iconfont icon-shangshuangjiantou color-fff" style="height: 32rpx;"></text>
			<text class="fs-20 color-fff">顶部</text>
		</view>
	</view>
</template>

<script>
	let utils = require('../../utils/util.js');
	import goodsbanner from '@/components/goods/goods_banner.vue';
	import goodsName from '@/components/goodsTK/goodsTKName.vue';
	import goodsDiscounts from '@/components/goodsTK/goodsDiscounts.vue';
	import goodsDetail from '@/components/goods/goods_detail.vue';
	import goodsFooter from '@/components/goodsTK/goodsFooter.vue';
	import share from '@/components/share/share.vue';
	import goodsAll from '@/components/goodsAll.vue';
	import goodsShoper from '@/components/goods/goods_shoper.vue';
	let envInfo = require('../../siteinfo.js');
	import share2 from '../../components/share2/share2.vue';
	export default {
		data() {
			return {
				title_title: '',
				background_title: '',
				show_top: false,
				//分享的图片
				share_img: '',
				show: false,
				sharePic: '',
				type: 'taobao', //'jingdong'
				id: '',
				goods: [],
				goods_all: {},
				shopLogo: '',
				shopName: '',
				title: '',
				couponEndTime: '', //结束时间
				couponStartTime: '', //开始时间
				couponPrice: '', //券价
				originalPrice: '', //原价
				actualPrice: '', //券后价
				desc: '', //文案
				dsrScore: '', //宝贝服务
				serviceScore: '', //买家服务
				shipScore: '', //物流服务
				commission: '', //小亲赚
				goods_detail: [], //商品详情图
				haoping: '', //好评
				shop_id: '', //店铺iD
				filters: require('../../utils/filters.js'),
				material: [], //推荐素材

				//弹窗变量
				show_copy: true,
				query: {}, //页面传低的参数
				back: false,
				goods_other: [], //其他商品
				role: '', //用户身份
				check_false: false, //不显示弹窗
				signup: true, //授权弹窗
				shop_labels: {},
				show_more_quan: false, //显示更多券

			}
		},
		components: {
			goodsbanner,
			goodsName,
			goodsDiscounts,
			goodsDetail,
			goodsFooter,
			share,
			goodsAll,
			goodsShoper,
			share2
		},
		computed: {
			init_img() {
				return this.$store.state.init_img;
			}
		},
		onLoad(e) {
			console.log(e)
			this.$store.commit('vuexSet', {
				name: 'key_arr',
				value: []
			})
			this.getApp().page.onLoad(this, e);
			// console.log('e', e)
			if (e.type) {
				this.type = e.type;
			}
			if (e.id) {
				this.id = e.id;
				if (this.type == 'taobao') {
					this.get_goods_detail_taobao();
				} else if (this.type == 'jingdong') {
					this.get_goods_detail_jingdong();
				}
				//#ifdef MP-WEIXIN
				if (wx.aldstat && wx.aldstat.sendEvent) {
					wx.aldstat.sendEvent("打开商品详情页", {
						"id": this.id,
						"type": this.type || '',
						"time": Date.now()

					})
				}
				//#endif
			}

			if (e.keyword) {
				this.back = true;
			}
			this.query = e;

			if (e.sid) {
				///tk_share_data
				this.get_data_sid(e.sid)
			}

			//检测有没有签约
			this.timeOut(() => {
				if (this.role_ == 'shoper')
					this.is_success();
			}, 500)
		},
		onShow() {
			//获取用户身份
			this.get_role();
		},
		methods: {
			to_qianyue() {
				this.toPage('/pages/related/related');
				this.signup = true;
			},
			//获取淘宝商品详情
			get_goods_detail_taobao() {

				this.getApp().request({
					data: {
						gid: this.id,
						type: 12
					},
					url: this.getApp().api.taoke.tk_goods_detail,
					success: (res) => {
						// console.log('detail_taobao', res);
						if (res.code == 0) {
							if (res.data) {
								this.show = true;
								this.shopLogo = res.data.shop_logo || ''; //店铺logo
								this.shopName = res.data.shop_name || ''; //店铺名称
								this.title = res.data.goods_name || ''; //标题 
								this.couponEndTime = res.data.get_end_time || ''; //结束时间
								this.couponStartTime = res.data.get_start_time || ''; //开始时间
								this.couponPrice = res.data.discount_price || ''; //券价
								this.originalPrice = res.data.goods_price || ''; //原价
								this.actualPrice = res.data.final_price || ''; //券后价
								this.desc = res.data.desc || ''; //文案
								this.dsrScore = res.data.goods_score || '4.0'; //宝贝服务
								this.serviceScore = res.data.seller_score || '4.0'; //买家服务
								this.shipScore = res.data.deliver_score || '4.0'; //物流服务
								this.commission = res.data.commission || '0';
								this.haoping = res.data.monthSales || '0';
								this.goods_detail = res.data.detail_imgs || [];
								let imgs = res.data.banners || [];
								// this.shop_labels = res.data.shop_labels || {};
								this.shop_labels = {};
								this.goods_all = {
									cover_pic: imgs
								};
								if (this.title == '' && this.shopName == '') {
									this.show = false;
									setTimeout(() => {
										this.showToast('没有找到优惠券信息', 4000);
									}, 300)
								}
								//获取同店铺商品信息brandId
								this.shop_id = res.data.brand_id || '';
								this.get_taobao_other(res.data.brand_id);
							}
						}
					},
					complete: _ => {

					}
				});
			},
			//获取淘宝商品详情
			get_goods_detail_jingdong() {
				this.get_goods_other(this.id);
			},
			//获取京东当前商品的商品详情
			get_goods_other(id) {
				if (id == '')
					return;
				let data = {

					gid: this.id,
					type: 22
				};
				this.getApp().request({
					data: data,
					url: this.getApp().api.taoke.tk_goods_detail,
					success: (res) => {
						// console.log('goods888888888888888888888888', res);
						if (res.code == 0) {
							// this.goods_other = res.data.good_list || [];
							if (res.data) {
								this.show = true;
								this.shopLogo = res.data.shop_logo || ''; //店铺logo
								this.shopName = res.data.shop_name || ''; //店铺名称
								this.title = res.data.goods_name || ''; //标题
								this.couponEndTime = res.data.get_end_time || ''; //结束时间
								this.couponStartTime = res.data.get_start_time || ''; //开始时间
								this.couponPrice = res.data.discount_price || ''; //券价
								this.originalPrice = res.data.goods_price || ''; //原价
								this.actualPrice = res.data.final_price || ''; //券后价
								this.desc = res.data.desc || res.data.goods_name || ''; //文案
								this.dsrScore = res.data.goods_score || '4.0'; //宝贝服务
								this.serviceScore = res.data.seller_score || '4.0'; //买家服务
								this.shipScore = res.data.deliver_score || '4.0'; //物流服务
								this.commission = res.data.commission || '0';
								this.goods_detail = res.data.detail_imgs || [];
								// this.shop_labels = res.data.shop_labels || {};
								this.shop_labels = {};
								this.haoping = res.data.month_sales || '';
								let imgs = res.data.banners || [];

								this.goods_all = {
									cover_pic: imgs
								};
								if (this.title == '' && this.shopName == '') {
									this.show = false;
									setTimeout(() => {
										this.showToast('没有找到优惠券信息', 4000);
									}, 300)
								}
								this.shop_id = res.data.shop_id || '';
								this.get_jingdong_other(res.data.shop_id);





							}
						}
					},
					complete: res => {

					}
				});
			},
			//获取京东同店铺下的商品
			get_jingdong_other(shopid) {
				if (shopid == '')
					return;
				let data = {

					type: 22,
					shop_id: shopid, //店铺ID
				};
				this.getApp().request({
					data: data,
					url: this.getApp().api.taoke.tk_goods,
					success: (res) => {
						// console.log('goods_jingdong_list', res);
						if (res.code == 0) {
							// this.goods_other = res.data.good_list || [];
							if (res.data && res.data.good_list) {
								////赋值操作
								// this.goods_other = res.data.good_list;
								let arr = res.data.good_list || [];
								this.goods_other = arr.filter((val, index) => {
									return val.goods_id != this.id;
								}) || [];
								this.goods_other = this.goods_other.filter((val, index) => {
									if (index == 3)
										this.show_more_quan = true;
									return index < 3;
								});

							}

							//商品素材
							let arr2 = res.data.good_list || [];
							let arr3 = arr2.filter((val, index) => {
								return val.goods_id == this.id;
							}) || [];
							if (arr3.length == 0)
								return;
							let material = [];
							if (arr3[0].goods_name) {
								material.push({
									type: 'text',
									content: arr3[0].goods_name
								})
							}
							if (arr3[0].goods_img) {
								material.push({
									type: 'image',
									content: arr3[0].goods_img
								})
							}
							if (arr3[0].share_font) {
								material.push({
									type: 'text',
									content: arr3[0].share_font
								})
							}
							if (arr3[0].videoInfo) {
								if (arr3[0].videoInfo.isArray()) {
									arr3[0].videoInfo.forEach(val => {
										material.push({
											type: 'video',
											content: val
										})
									})
								}

							}
							if (arr3[0].circle_content) {
								material.push({
									type: 'text',
									content: arr3[0].circle_content
								})
							}
							if (arr3[0].link_content) {
								material.push({
									type: 'text',
									content: arr3[0].link_content
								})
							}
							this.material = material || [];
							// console.log('3333333333', this.material);
							////

						}
					},
					complete: res => {

					}
				});
			},
			//获取淘宝同一个品牌的商品
			get_taobao_other(brancid) {
				if (brancid == '')
					return;
				let data = {
					type: 12,
					brand_id: brancid, //店铺ID
				};
				this.getApp().request({
					data: data,
					url: this.getApp().api.taoke.tk_goods,
					success: (res) => {
						// console.log('goodstaobao_list',res.data.good_list);
						if (res.code == 0) {
							// this.goods_other = res.data.good_list || [];
							if (res.data && res.data.good_list) {
								let arr = res.data.good_list || [];
								this.goods_other = arr.filter((val, index) => {
									return val.goods_id != this.id;
								}) || [];
								this.goods_other = this.goods_other.filter((val, index) => {
									if (index == 3)
										this.show_more_quan = true;
									return index < 3;
								});
							}
						}
					},
					complete: res => {

					}
				});
			},
			//领取
			lingqu() {
				////////淘宝
				if (this.type == 'taobao') {
					this.getApp().request({
						data: {
							gid: this.id,
							type: 12
						},
						url: this.getApp().api.taoke.tk_share,
						success: (res) => {
							if (res.code == 0) {

								if (this.role_ != 'shoper') {
									//不是店主显示添加店主微信弹窗
									this.$refs.shoper.show_wechat();
									console.log('展示店主微信弹窗');
									return;
								}

								if (res.data.data && res.data.data.tpwd) {
									let url_root = envInfo.resBaseUrl + 'h5/coupon.html'
									this.toPage('/pages/webView/webView?url=' + url_root + '&mch_id=' + (uni.getStorageSync(
											'_mchInfo').id || '') + '&token=' + (uni.getStorageSync('ACCESS_TOKEN') || '') + '&id=' + this.id +
										'&version=' + (envInfo.version || ''));
									return;
									this.toPage('/pages/taobao_quan/taobao_quan?link=' + res.data.data.tpwd + '&image=' + (this.goods_all.cover_pic[
										0] || ''));
									return;
									//复制成功后显示弹窗应道顾客去淘宝下单
									this.setClipboardData({
										data: res.data.data.tpwd,
										success: () => {
											uni.showToast({
												title: '',
												duration: 10,
												icon: 'none'
											})
											if (!uni.getStorageSync('no_show_quan')) {
												this.$refs.showtaobao.open();
											} else {
												this.timeOut(() => {
													this.showToast('优惠券已复制，打开淘宝APP领券下单', 3000)
												}, 200)
											}

										}
									});
								}


								if (res.data.code == 10027 || res.data.code == 10011) {
									uni.showToast({
										icon: 'none',
										title: res.data.msg || '该宝贝已下架'
									});
									console.log(2)
								}
								if (res.data.code == 400) {
									this.showToast(res.data.msg, 2000);
								}
							}
							if (res.code == 1) {
								this.showToast('获取优惠券失败', 2000);
								console.log(3);
							}

						}
					});
				}

				/////

				///京东；/////////////////////////////////////
				if (this.type == 'jingdong') {
					this.getApp().request({
						data: {
							gid: this.id,
							type: 22
						},
						url: this.getApp().api.taoke.tk_share,
						success: (res) => {
							if (res.code == 0) {
								uni.navigateToMiniProgram({
									appId: 'wx91d27dbf599dff74', //app.json内容
									path: 'pages/union/proxy/proxy?spreadUrl=' + encodeURIComponent(res.data.result.link),
									extraData: {
										foo: 'bar'
									},
									envVersion: 'release',
									success(res) {
										// 打开成功
										// console.log(res);
										// console.log("打开成功")
									}
								})
							}
							if (res.code == 1) {
								this.showToast('获取优惠券失败', 2000);
							}
						}
					});
				}


				///京东
			},
			close_taobao() {
				this.$refs.showtaobao.close();
				if (this.check_false == true) {
					uni.setStorageSync('no_show_quan', '33333333');
				}
			},
			//下载
			xiazai() {
				// uni.showToast({
				// 	title: '下载',
				// 	icon: 'none'
				// });
				uni.showLoading();
				this.getApp().request({

					data: {
						id: this.id,
						type: this.type,
						goods_name: this.title || '',
						price: this.actualPrice || '', //售价
						original_price: this.originalPrice || '', //原价
						cover_pic: this.goods_all.cover_pic[0] || '',
						page_url: 'pages/a/a',
					},
					url: this.getApp().api.taoke.tk_qcode,
					success: (res) => {
						if (res.code == 0) {
							if (res.data && res.data.pic_url) {
								this.share_img = res.data.pic_url;
								this.$refs.share.open();
								this.$refs.share.setSrc(res.data.pic_url);
							}
						}
					},
					complete: res => {
						uni.hideLoading();
					}
				});


			},
			toPage1(url) {
				uni.navigateTo({
					url: url
				})
			},
			copy() {
				uni.setClipboardData({
					data: this.desc,
					success: () => {
						uni.showToast({
							icon: 'none',
							title: "推荐理由复制成功，快去分享吧",
							duration: 2500
						});
						uni.setStorageSync('link', this.desc);
					}
				});
			},
			//格式化
			copyGoodsLink() {
				this.lingqu();
			},
			dateFormat(fmt, date) {
				if (date) {
					if (this.type == 'taobao') {
						date = date.split('-')
						let y = date[0];
						let m = date[1];
						let d = date[2].split(' ')[0];
						date = new Date(y, m, d);
					} else {
						date = new Date(date);
					}
				} else {
					date = new Date(Date.now());
				}
				let ret;
				let opt = {
					"Y+": date.getFullYear().toString(), // 年
					"m+": (date.getMonth() + 1).toString(), // 月
					"d+": date.getDate().toString(), // 日
					"H+": date.getHours().toString(), // 时
					"M+": date.getMinutes().toString(), // 分
					"S+": date.getSeconds().toString() // 秒
					// 有其他格式化字符需求可以继续添加，必须转化成字符串
				};
				for (let k in opt) {
					ret = new RegExp("(" + k + ")").exec(fmt);
					if (ret) {
						fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
					};
				};

				return fmt
			},
			//扫描二维码进入，先获取 id 和 type  再 请求数据
			get_data_sid(sid) {
				if (sid == '')
					return;
				this.getApp().request({
					data: {
						sid: sid
					},
					url: this.getApp().api.taoke.tk_share_data,
					success: (res) => {
						if (res.code == 0) {
							if (res.data && res.data.sign) {
								let type = res.data.sign.type || '';
								let id = res.data.sign.id || '';
								if (type && id) {
									this.type = type;
									this.id = id;
									if (type == 'taobao') {
										this.get_goods_detail_taobao();
										return;
									} else this.get_goods_detail_jingdong();
									//#ifdef MP-WEIXIN
									if (wx.aldstat && wx.aldstat.sendEvent) {
										wx.aldstat.sendEvent("打开商品详情页", {
											"id": this.id,
											"type": this.type || '',
											"time": Date.now()

										})
									}
									//#endif
								}
							}
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
						type: this.type,
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
				return;
				uni.downloadFile({
					url: src, //仅为示例，并非真实的资源
					success: (res) => {
						//      uni.showToast({
						//      	icon:"none",
						// title:'下载成功'
						//      });
						this.$refs.share.close();
					},
					fail: (res) => {
						uni.showToast({
							icon: "none",
							title: '下载失败'
						});
					}
				});
			}),
			//不再显示淘宝弹窗了
			awary_show() {
				console.log(33)
				this.check_false = !this.check_false;
			},
			//检测是不是签约成功
			is_success() {
				if (getApp().globalData.app == 'qinpu') {
					return;
				}
				// if(this.login())
				// return ;
				this.getApp().request({
					url: this.getApp().api.taoke.tk_check,
					data: {
						mch_id: uni.getStorageSync("_mchInfo").id || '',
					},
					success: (res) => {
						uni.hideLoading();
						if (res.code == 0) {
							this.signup = true;
						} else {
							if (res.code == 1) {

								if (this.role_ == 'shoper') {
									this.signup = false;
									this.$store.commit('add_key', 99);
								}
							}
						}
					},
					complete: () => {

					}
				});
			},
			close_qianyue() {
				this.signup = true;
				this.$store.commit('remove_key', 99);

			},
			////////////////////////////////////////////////////////////////////////////
			//返回搜索页面
			myback() {
				if (this.query.keyword) {
					uni.reLaunch({
						url: '/pages/seachAll/seachAll?keyword=' + this.query.keyword + '&type=' + (this.query.type_brand ? this.query.type_brand :
							'1')
					})
					return;
				}
				this.uniBack();
			},
			//判断是否为店主
			get_role() {
				this.role = uni.getStorageSync('role');
			},
			//查看攻略
			see_detail() {
				uni.navigateTo({
					url: '/pages/related/related'
				})
			},
			see_img(src, all) {
				uni.previewImage({
					count: src || 0,
					urls: all || src
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
			commisionBtn() {
				console.log(this.$store.state.show_commission);
				this.$store.commit('vuexSet', {
					name: 'show_commission',
					value: !this.$store.state.show_commission
				})
				console.log(this.$store.state.show_commission);
			},
		},
		onPageScroll(e) {
			let scrollTop = e.scrollTop
			if (scrollTop >= 400) {
				this.background_title = "#F4F4F4"
				this.title_title = "商品详情"
				this.show_top = true
			} else {
				this.background_title = ''
				this.title_title = ""
				this.show_top = false
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				// console.log(res.target)
				let title = res.target.dataset.title;
				let id = res.target.dataset.id;
				let img = res.target.dataset.img;
				if (res.target.dataset.type == 1) {
					return {
						imageUrl: this.goods_all.cover_pic[0] || '',
						title: title,
						path: '/pages/goodsTK/goodsTK?type=' + this.type + '&id=' + id + '&mch_id=' + (uni.getStorageSync('_mchInfo').id ||
							''),
					}
				}
				if (res.target.dataset.type == 9) {
					return {
						imageUrl: this.share_img,
						title: this.title,
						path: '/pages/goodsTK/goodsTK?type=' + this.type + '&id=' + this.id + '&mch_id=' + (uni.getStorageSync('_mchInfo')
							.id ||
							''),
					}
				}
			}
			return {
				imageUrl: this.goods_all.cover_pic[0] || '',
				title: this.title,
				path: '/pages/goodsTK/goodsTK?type=' + this.type + '&id=' + this.id + '&mch_id=' + (uni.getStorageSync('_mchInfo').id ||
					''),
			}
		}
	}
</script>

<style lang="scss">
	@import './goodsTK.css';

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
