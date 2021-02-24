<template>
	<view class="qinUnion">
		<common></common>
		<!-- 店铺名和店铺头像开始 -->

		<!-- 店铺名和店铺头像结束 -->
		<custom :hiddenBtn="true" mode="2" title="亲联盟" height="0"></custom>
		<view class="pr" style="overflow: hidden;" :style="{'height': 'calc('+customBar+'px + 380rpx)','background':'linear-gradient(-90deg, #FE4001, #EB0301)'}">
			<view class="pl-24 pr-24 flex" style="width: 750rpx;overflow: hidden;padding-top: 40rpx;height: 180rpx;" :style="{'margin-top':customBar+'px'}">
				<view class="flex flex-1">
					<image v-if="mch_info_.logo || mch_info_.user.avatar_url" :src="mch_info_.logo || mch_info_.user.avatar_url" mode="aspectFit"
					 style="width:102rpx;height: 102rpx;border: 2rpx solid #FFFFFF;border-radius: 50%;"></image>
					<view class="flex-1 flex flex-y flex-x-center color-fff pl-24" style="align-self: flex-start;">
						<view class="fs-36 text-bold">
							{{mch_info_.name || ''}}
						</view>
						<view class="fs-24 mt-10 towline" style="margin-bottom: 10rpx;">
							{{'买之前·问亲铺  加好友帮你省钱'}}
						</view>
					</view>
				</view>
				<view @tap="less(toPage,'/member/homePage/homePage')" class="fs-24" style="width: 120rpx;height: 50rpx;line-height: 50rpx;border-radius: 25rpx;text-align: center;background-color: #FFFFFF;color: #F23005;margin-top: 26rpx;">
					加好友
				</view>
			</view>

			<view @tap="less(toPage,'/pages/taobao/taobao')" class="flex flex-y-center" style="width: 702rpx;height: 70rpx;border-radius: 35rpx;margin-left: 24rpx;margin-top: 10rpx;background-color:rgba(244,244,244,0.3);opacity;">
				<text class="pl-20 pr-20 iconfont icon-sousuo" style="font-size: 28rpx;color: #FFFFFF;"></text>
				<text style="height: 70rpx;flex:1;font-size: 28rpx;color: #FFFFFF;line-height: 70rpx;">请输入关键词</text>
			</view>
		</view>






		<!-- <view hover-class="click1" v-if="img.qp_logo" @tap="to_qinpu" class="ml-24 mt-24 flex flex-y-center" style="width: 702rpx;height: 200rpx;border-radius: 100rpx;background-color: #FFFFFF;">
			<image :src="img.qp_logo" mode="" style="width: 150rpx;height: 150rpx;margin-left: 24rpx;margin-right: 24rpx;border-radius: 50%;"></image>
			<view class="flex-1">
				<view class="" style="color:#111111;font-weight: bold;font-size: 36rpx;">
					亲铺
				</view>
				<view class="color-666666 fs-28 mt-10">
					品牌直供 正品保障 超低折扣
				</view>
			</view>
			<view class="flex flex-x-center flex-y-center" style="width: 50rpx;height: 50rpx;border-radius: 50%;background-color: #BEBEBE;margin-right: 37rpx;">
				<text class="iconfont icon-jinru color-fff" style="font-size: 42rpx;width: 38rpx;"></text>
			</view>
		</view>

		<view hover-class="click1" v-if="img.jd_big" @tap="toPage('/pages/jingdong/jingdong')" class="ml-24 mt-24 flex flex-y-center"
		 style="width: 702rpx;height: 200rpx;border-radius: 100rpx;background-color: #FFFFFF;">
			<image :src="img.jd_big" mode="" style="width: 150rpx;height: 150rpx;margin-left: 24rpx;margin-right: 24rpx;border-radius: 50%;"></image>
			<view class="flex-1">
				<view class="" style="color:#111111;font-weight: bold;font-size: 36rpx;">
					京东
				</view>
				<view class="color-666666 fs-28 mt-10">
					隐藏优惠券 领券再下单
				</view>
			</view>
			<view class="flex flex-x-center flex-y-center" style="width: 50rpx;height: 50rpx;border-radius: 50%;background-color: #BEBEBE;margin-right: 37rpx;">
				<text class="iconfont icon-jinru color-fff" style="font-size: 42rpx;width: 38rpx;"></text>
			</view>
		</view>

		<view hover-class="click1" v-if="img.tb_big" @tap="toPage('/pages/taobao/taobao')" class="ml-24 mt-24 flex flex-y-center"
		 style="width: 702rpx;height: 200rpx;border-radius: 100rpx;background-color: #FFFFFF;">
			<image :src="img.tb_big" mode="" style="width: 150rpx;height: 150rpx;margin-left: 24rpx;margin-right: 24rpx;border-radius: 50%;"></image>
			<view class="flex-1">
				<view class="" style="color:#111111;font-weight: bold;font-size: 36rpx;">
					淘宝
				</view>
				<view class="color-666666 fs-28 mt-10">
					隐藏优惠券 领券再下单
				</view>
			</view>
			<view class="flex flex-x-center flex-y-center" style="width: 50rpx;height: 50rpx;border-radius: 50%;background-color: #BEBEBE;margin-right: 37rpx;">
				<text class="iconfont icon-jinru color-fff" style="font-size: 42rpx;width: 38rpx;"></text>
			</view>
		</view>

		<view hover-class="click1" v-if="img.tip" @tap="toPage('/pages/video/video?id=66')" class="ml-24 mt-24 flex flex-y-center"
		 style="width: 702rpx;height: 200rpx;border-radius: 100rpx;background-color: #FFFFFF;">
			<image :src="img.tip" mode="" style="width: 150rpx;height: 150rpx;margin-left: 24rpx;margin-right: 24rpx;border-radius: 50%;"></image>
			<view class="flex-1">
				<view class="" style="color:#111111;font-weight: bold;font-size: 36rpx;">
					领券下单攻略
				</view>
				<view class="color-666666 fs-28 mt-10">
					省钱攻略，简单三步领券下单
				</view>
			</view>
			<view class="flex flex-x-center flex-y-center" style="width: 50rpx;height: 50rpx;border-radius: 50%;background-color: #BEBEBE;margin-right: 37rpx;">
				<text class="iconfont icon-jinru color-fff" style="font-size: 42rpx;width: 38rpx;"></text>
			</view>
		</view> -->



		<!-- 商品列表开始 -->
		<view v-if="top_list.length>0" class="ml-24 flex flex-x-b flex-y-end" style="background-color: #FDEFE6;margin-top: 26rpx;padding: 24rpx 21rpx 27rpx 21rpx;border-radius: 8rpx;width: 702rpx;height: 370rpx;box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(156, 156, 156, 0.5);margin-top: -88rpx;position: relative;z-index: 9;">
			<view v-if="top_list[1]" class="ranking_one" @tap.stop="less(toPage,'/pages/goodsTK/goodsTK?id=' + top_list[1].goods_id + '&type=taobao')"
			 hover-class="click1">
				<image :src="top_list[1] ? top_list[1].goods_img : ''" mode=""></image>
				<view class="text-hidden name" style="color: #595959;font-size: 20rpx;">
					{{top_list[1] ? top_list[1].goods_name : ''}}
				</view>
				<view class="ranking_price text-hidden">
					<text class="t1">¥</text>
					<text class="t2">{{filters.priceStr(xs(top_list[1] ? top_list[1].final_price : '0',2))[0]}}.</text>
					<text class="t3">{{filters.priceStr(xs(top_list[1] ? top_list[1].final_price : '0',2))[1]}}</text>
					<text class="t4"></text>
				</view>
				<view class="po_notice">
					{{top_list[1] ? top_list[1].hot_special_text : ''}}
				</view>
				<image :src="init_img.top2" class="top_img" mode=""></image>
			</view>
			<view v-if="top_list[0]" class="ranking_one tow" @tap.stop="less(toPage,'/pages/goodsTK/goodsTK?id=' + top_list[0].goods_id + '&type=taobao')"
			 hover-class="click1">
				<image :src="top_list[0] ? top_list[0].goods_img : ''" mode=""></image>
				<view class="text-hidden name" style="color: #595959;font-size: 20rpx;">
					{{top_list[0] ? top_list[0].goods_name : ''}}
				</view>
				<view class="ranking_price text-hidden">
					<text class="t1">¥</text>
					<text class="t2">{{filters.priceStr(xs(top_list[0] ? top_list[0].final_price : '0',2))[0]}}.</text>
					<text class="t3">{{filters.priceStr(xs(top_list[0] ? top_list[0].final_price : '0',2))[1]}}</text>
					<text class="t4"></text>
				</view>
				<view class="po_notice">
					{{top_list[0] ? top_list[0].hot_special_text : ''}}
				</view>
				<image :src="init_img.top1" class="top_img" mode=""></image>
			</view>
			<view v-if="top_list[2]" class="ranking_one" @tap.stop="less(toPage,'/pages/goodsTK/goodsTK?id=' + top_list[2].goods_id + '&type=taobao')"
			 hover-class="click1">
				<image :src="top_list[2] ? top_list[2].goods_img : ''" mode=""></image>
				<view class="text-hidden name" style="color: #595959;font-size: 20rpx;">
					{{top_list[2] ? top_list[2].goods_name : ''}}
				</view>
				<view class="ranking_price text-hidden">
					<text class="t1">¥</text>
					<text class="t2">{{filters.priceStr(xs(top_list[2] ? top_list[2].final_price : '0',2))[0]}}.</text>
					<text class="t3">{{filters.priceStr(xs(top_list[2] ? top_list[2].final_price : '0',2))[1]}}</text>
					<text class="t4"></text>
				</view>
				<view class="po_notice">
					{{top_list[2] ? top_list[2].hot_special_text : ''}}
				</view>
				<image :src="init_img.top3" class="top_img" mode=""></image>
			</view>
		</view>


		<view class="goods_box" style="margin-top: 8rpx;background-color: #FFFFFF;">
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


					<!-- 券后价 -->
					<view class="flex flex-x-b flex-y-end">
						<view class="flex flex-y-end" style="color: #EB0401;font-weight: bold;">
							<!-- <text style="font-size: 20rpx;line-height: 20rpx;">¥</text><text style="font-size: 24rpx;line-height: 24rpx;">{{filters.priceStr(xs(item.price,2))[0] || '0'}}</text><text class="min" style="line-height: 18rpx;">.{{filters.priceStr(xs(item.price,2))[1] || '0'}}</text>  <text style="font-size: 20rpx;color: #8D8D8D;margin-left: 14rpx;">¥ 45.</text><text style="font-size: 20rpx;color: #8D8D8D;">00</text> -->

							<view style="font-size: 22rpx;margin-right: 6rpx;">¥</view>
							<view style="font-size: 26rpx;transform: translateY(1rpx);">{{filters.priceStr(xs(item.final_price,2))[0] || '0'}}</view>
							<view class="min" style="font-size: 20rpx;">.{{filters.priceStr(xs(item.final_price,2))[1] || '0'}}</view>
							<view style="font-size: 22rpx;color: #8D8D8D;margin-left: 14rpx;line-height: 24rpx;">¥
								{{filters.priceStr(xs(item.goods_price,2))[0] || '0'}}</view>
							<view style="font-size: 20rpx;color: #8D8D8D;">.{{filters.priceStr(xs(item.goods_price,2))[1] || '0'}}</view>


						</view>
						<view class="fs-24" style="color: #8D8D8D;">
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

					<!-- 新增开始 -->
					<view class="pr flex flex-x-b flex-y-center" style="height: 60rpx;border-radius: 8rpx 30rpx 30rpx 8rpx;background-color: #FDEFE6;overflow: hidden;z-index: 0;">
						<text class="text-hidden" style="width: 280rpx;padding-left: 15rpx;font-size: 24rpx;color: #A43210;position: relative;box-sizing: 2;">{{item.hot_special_text || ''}}</text>
						<button v-if="true" :data-sharetype="9" @tap.stop="mycopy(item.share_font||item.goods_name)" :data-image="item.goods_img"
						 :data-title="item.goods_name" :data-url="'/pages/goodsTK/goodsTK?type=taobao&id='+item.goods_id" open-type="share"
						 class="share-clear"><text style="color: #FFFFFF;font-size: 24rpx;padding-right: 24rpx;position: relative;box-sizing: 2;">一键转发</text></button>
						<text v-else style="color: #FFFFFF;font-size: 24rpx;padding-right: 24rpx;position: relative;box-sizing: 2;">点击查看</text>
						<view class="" style="position: absolute;right: -60rpx;top: 0;width: 200rpx;height: 60rpx;background: linear-gradient(270deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);box-shadow: -2rpx 0rpx 2rpx 0rpx rgba(125, 125, 125, 0.5);z-index: -1;transform:skewX(-15deg);">

						</view>
					</view>
					<!-- 新增结束 -->

				</view>
			</view>
		</view>
		<!-- 商品列表结束 -->


		<!-- 内容为空 -->
		<view v-if="is_null" class="" style="text-align: center;margin-top: 32rpx;">
			<text class="iconfont icon-qinpuLOGO" style="color: #DFDFDF;margin-top: 30rpx;font-size: 100rpx;"></text>
			<view class="" style="font-size: 30rpx;color: #DFDFDF;margin-top: 0rpx;margin-bottom: 150rpx;">
				正品保障 平台售后 每日推荐 超低折扣
			</view>
		</view>
		<!-- 内容为空 -->

		<!-- 底部 -->
		<!-- <view class="" v-if="show" style="text-align: center;margin-top: 40rpx;">
			<view class="flex flex-x-center flex-y-center" style="border-radius: 50%;display: inline-block;width: 72rpx;height: 72rpx;background-color: #E8E8E8;">
				<view class="iconfont icon-qinpuLOGO color-fff" style="font-size: 70rpx;margin-top: -4rpx;height: 72rpx;"></view>
			</view>
			<view class="fs-24 color-999999" style="margin-top: 15rpx;margin-bottom: 19rpx;color:  #E8E8E8;">
				正品保障 平台售后 每日推荐 超低折扣
			</view>
		</view> -->


		<!-- 底部导航条开始 -->
		<view style="height: 98rpx;">
			<view style="width: 750rpx;height: 98rpx;position: fixed;left: 0;bottom: 0;z-index: 99;">
				<view class="flex" style="width: 750rpx;height: 98rpx;">
					<view @tap="less(toApp,'pages/index/index','wx6b45b7c7a0b3b9fc')" hover-class="click1" class="flex flex-y flex-x-center flex-y-center" style="height: 98rpx;width: 200rpx;background-color: #FFFFFF;">
						<view class="goods-header-icon">
							<view class="iconfont icon-qinpuLOGO" style="font-size: 44rpx;"></view>
						</view>
						<view class="color-333333 fs-20">去亲铺</view>
					</view>

					<view @tap="less(toPage,'/pages/taobao/taobao')" hover-class="click1" class="flex-1 flex flex-y-center flex-x-center" style="background-color:#F23005;color: #FFFFFF;font-size: 30rpx;height: 98rpx;align-items: center;">
						更多省钱商品 <text class="iconfont icon-youjiantou-tianchong" style="margin-left: 18rpx;"></text>
					</view>
				</view>

			</view>
		</view>
		<!-- 底部导航条结束 -->

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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				signup: true, //签约是否成功 true 成功
				customBar: getApp().globalData.customBar,
				statusBar: getApp().globalData.statusBar,
				filters: require('../../utils/filters.js'),
				customHeight: (getApp().globalData.custom.bottom - getApp().globalData.custom.top) || 0,
				mch: {
					user: {
						avatar_url: ''
					},
					name: '',
					logo: '',
					desc: ''
				},
				img: {},
				show: false,
				goods: [],
				top_list: [], ///前三
				page: 1,
				is_null: false,
			}
		},
		onShow() {
			this.timeOut(()=>{
				if(this.role_ == 'shoper')
				this.is_success();
			},500)
		},
		onLoad(e) {
			this.getApp().page.onLoad(this, e);
			this.$store.commit('vuexSet', {
				name: 'key_arr',
				value: []
			})
			this.get_img();
			this.timeOut(() => {
				this.show = true
			}, 500);


			//加载榜单商品
			this.get_goods();
		},
		methods: {
			to_qianyue() {
				this.toPage('/pages/related/related');
				this.signup = true;
			},
			to_article() {
				uni.navigateTo({
					url: '/pages/article-detail/article-detail?id=78'
				})
			},
			to_qinpu() {
				uni.navigateToMiniProgram({
					appId: 'wx6b45b7c7a0b3b9fc', //app.json内容
					path: '/pages/index/index',
					extraData: {
						token: uni.getStorageSync('ACCESS_TOKEN'),
						_mchInfo: uni.getStorageSync('_mchInfo')
					},
					envVersion: 'trial',
					success(res) {

					}
				})
			},
			//获取首页图片,
			get_img() {
				this.getApp().request({
					data: {},
					url: this.getApp().api.taoke.tk_index,
					success: (res) => {
						// console.log('img', res);
						if (res.code == 0) {

							this.img = {
								'9_9free': res.data['9_9free'],
								brand: res.data.brand,
								brand_coupon: res.data.brand_coupon,
								jd_big: res.data.jd_big,
								jd_hot: res.data.jd_hot,
								jd_market: res.data.jd_market,
								jd_small: res.data.jd_small,
								limit_buy: res.data.limit_buy,
								qp_logo: res.data.qp_logo,
								qws: res.data.qws,
								tb_big: res.data.tb_big,
								tb_small: res.data.tb_small,
								tip: res.data.tip,
								top: res.data.top,
							}

						}
					}
				});
			},





			//检测是不是签约成功
			is_success() {
				// return ;
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
			get_goods() {
				//请求
				uni.showLoading({
					title: '请求商品列表中',
					mask: false
				});


				let data = {
					type: 12,
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
								// if (data.length > 0) {
								// 	this.login(false) == false && this.get_share_img(1);
								// }
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
		},
		onReachBottom() {
			this.get_goods();
		},
		onShareAppMessage(res) {
			let title = '';
			let img = '';
			let id = '';
			if (res.from === 'button') { // 来自页面内分享按钮
				// console.log('分享', res)
				
				if (res.target.dataset.sharetype == 9) {
					return {
						title: res.target.dataset.title || '',
						path: res.target.dataset.url + '&mch_id=' + (uni.getStorageSync('_mchInfo').id || ''),
						imageUrl: res.target.dataset.image || '',
					}
				}
			}
			return {
				title: '全网省',
				page: '/pages/qinUnion/qinUnion?' + 'mch_id=' + (uni.getStorageSync('_mchInfo').id || '') + '&id=99',
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100vh;
		background-color: #FFFFFF;
	}



	//亲铺图标
	.goods-header-icon {
		display: inline-block;
		width: 48rpx !important;
		height: 48rpx;
		border-radius: 50%;
		background: #F23005;
		color: #fff;
		text-align: center !important;
		line-height: 48rpx;
		font-size: 50rpx;
	}


	//榜单商品
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
