<template>
	<view class="">
		<view class="qinUnion" v-if="false">
			<common></common>
			<!-- 店铺名和店铺头像开始 -->
			<view class="shop_box flex flex-y-center text-hidden pl-24" style="position: absolute;left: 0;" :style="{'height': (customBar - statusBar)+'px','top':statusBar + 'px'}">
				<image v-if="mch_info_.logo || mch_info_.user.avatar_url" :src="mch_info_.logo || mch_info_.user.avatar_url" mode="aspectFit"
				 style="width: 34rpx;height: 34rpx;border-radius: 19rpx;border-radius: 50%;border: 2rpx solid #FFFFFF;"></image>
				<text v-if=" mch_info_ && mch_info_.name" class="text-hidden" style="padding-left: 10rpx;font-size: 24rpx;color: #FFFFFF;max-width: 200rpx;">{{mch_info_.name || ''}}</text>
			</view>
			<!-- 店铺名和店铺头像结束 -->
			<!-- <common></common> -->
			<view style="width: 100%;background-color: #F23005;padding-bottom: 200rpx;">
				<custom :hiddenBtn="true" title="亲导购·全网省" titleColor="#FFFFFF" mode="2"></custom>
		
				<view class="flex  flex-y-center color-fff fs-24 pl-24 pr-24 pt-24" style="">
					<text><text style="font-weight: bold;">1</text> 打开</text>
					<image v-if="img.tb_big" :src="img.tb_small" style="width: 38rpx;height: 38rpx;font-size: 0;line-height: 0;transform: translateY(-2rpx);"
					 mode="scaleToFill"></image>
					<image v-if="img.jd_big" :src="img.jd_small" style="width: 38rpx;height: 38rpx;font-size: 0;line-height: 0;transform: translateY(-2rpx);"
					 mode="scaleToFill"></image>
					<!-- <text class="iconfont icon-tao" style="font-size: 30rpx;color:#FFFFFF;margin-left:12rpx;display: inline-block;"></text>
					<text class="iconfont icon-jingdong" style="font-size: 30rpx;color:#FFFFFF;margin-left:12rpx;display: inline-block;"></text> -->
					<text class="iconfont icon-jinru"></text>
					<text><text style="font-weight: bold;">2</text> 复制商品链接</text>
					<text class="iconfont icon-jinru"></text>
					<text><text style="font-weight: bold;">3</text> 打开亲铺</text>
					<view  @tap="toPage('/pages/video/video?id=66')" class="flex flex-y-center flex-x-center color-fff" style="width: 152rpx;height:40rpx;border-radius: 20rpx;border: 1rpx solid #FFFFFF;margin-left: 20rpx;">
						<text class="fs-24">省钱教程</text>
						<text class="iconfont icon-bofang1" style="font-size: 22rpx;padding-left: 8rpx;"></text>
					</view>
				</view>
				<!-- 搜索开始 -->
				<view class="flex flex-y-center pl-24 pr-24 mt-24 fs-24">
					<image :src="img.qws" style="width: 140rpx;height: 56rpx;" mode=""></image>
					<view class="flex flex-1 flex-y-center" style="height: 56rpx;margin-left: 24rpx;border-radius: 28rpx;background-color: #FFFFFF;">
						<text class="iconfont icon-sousuo " style="color: #F23005;padding-left: 12rpx;font-size: 28rpx;"></text>
						<input @click="toPage('/pages/newSearch/newSearch')" disabled="true" class="flex-1  fs-24" style="height: 56rpx;padding-left: 12rpx;padding-right: 12rpx;"
						 type="text" placeholder="请输入关键词" />
						<text class="flex flex-x-center flex-y-center fs-24" style="background-color:#F23005;width: 100rpx;height: 50rpx; border-radius: 25rpx;color: #FFFFFF;margin-right: 5rpx;">搜索</text>
					</view>
				</view>
				<!-- 搜索结束 -->
			</view>
		
			<view class="" style="width: 100%; border-radius: 30rpx 30rpx 0px 0px;margin-top: -176rpx;position: relative;z-index: 6;background-color: #F4F4F4;padding:0;overflow: hidden;">
				<!-- 图片选项卡开始 -->
				<view class="flex flex-y-center flex-x-a" style="padding: 0 16rpx;margin-top: 20rpx;">
					<view v-if="img.qp_logo" class="flex-y flex-x-center flex-y-center" @tap="to_qinpu">
						<image :src="img.qp_logo" style="width:100rpx;height: 100rpx;border-radius: 50rpx; transform: scale(1.1);"></image>
						<text style="margin-top: 27rpx;color: #111111; font-size: 24rpx;">亲铺</text>
					</view>
					<view v-if="img.tb_big" class="flex-y flex-x-center flex-y-center" @click="toPage('/pages/taobao/taobao')">
						<image :src="img.tb_big" style="width:100rpx;height: 100rpx;border-radius: 50rpx;transform: scale(1.1);"></image>
						<text style="margin-top: 27rpx;color: #111111; font-size: 24rpx;">淘宝</text>
					</view>
					<view v-if="img.jd_big" class="flex-y flex-x-center flex-y-center" @click="toPage('/pages/jingdong/jingdong')">
						<image :src="img.jd_big" style="width:100rpx;height: 100rpx;border-radius: 50rpx;transform: scale(1.1);"></image>
						<text style="margin-top: 27rpx;color: #111111; font-size: 24rpx;">京东</text>
					</view>
					<view v-if="img.tip" class="flex-y flex-x-center flex-y-center" @tap="to_article">
						<image :src="img.tip" style="width:100rpx;height: 100rpx;border-radius: 50rpx;transform: scale(1.1);"></image>
						<text style="margin-top: 27rpx;color: #111111; font-size: 24rpx;">攻略</text>
					</view>
				</view>
				<view class="flex flex-x-b pl-24 pr-24" style="width: 100%;margin-top: 30rpx;">
					<image @tap="toPage('/pages/hot/hot?type=jingdong&cats=collage&title=限时抢购')" :src="img.limit_buy" mode="aspectFit"
					 style="width: 343rpx;height: 230rpx; border-radius: 16rpx;"></image>
					<image @tap="toPage('/pages/hot/hot?type=jingdong&cats=goodShop&title=品牌有券')" :src="img.brand_coupon" mode="aspectFit"
					 style="width: 343rpx;height: 230rpx; border-radius: 16rpx;"></image>
		
				</view>
				<view class="flex flex-x-b pl-24 pr-24" style="width: 100%;margin-top: 16rpx;">
					<image @tap="toPage('/pages/hot/hot?type=jingdong&cats=nineSift&title=9.9包邮')" :src="img['9_9free']" mode="aspectFit"
					 style="width: 224rpx;height: 200rpx; border-radius: 16rpx;"></image>
					<image @tap="toPage('/pages/hot/hot?type=jingdong&cats=jdMarket&title=京东超市')" :src="img.jd_market" mode="aspectFit"
					 style="width: 224rpx;height: 200rpx; border-radius: 16rpx;"></image>
					<image @tap="toPage('/pages/hot/hot?type=jingdong&cats=pank&title=实时榜单')" :src="img.top" mode="aspectFit" style="width: 224rpx;height: 200rpx; border-radius: 16rpx;"></image>
				</view>
				<!-- 图片选项卡结束 -->
			</view>
		
			<!-- 列表开始 -->
			<view class=" mb-24">
				<view class="list" v-if="false">
					<view class="list-item" v-for="(item,index) in goods" :key="index" @tap="toPage('/pages/goodsTK/goodsTK?type=taobao&id=' + item.goods_id)">
						<image :src="item.goods_img" class="banner-img" mode="aspectFit"></image>
						<view class="right">
							<view class="content-top">
								<!-- <image class="tao-img" src="" mode="aspectFit"></image> -->
								<text class="iconfont icon-tao tao-img"></text>
								<view class="line1">
									{{item.goods_name}}
								</view>
								<view class="flex align-center">
									<view class="line3-left">
										券后￥<text class="t1">{{filters.priceStr(String(item.final_price))[0] || '0'}}.</text><text class="t2">{{filters.priceStr(String(item.final_price))[1] || '00'}}</text>
										<text class="t3" style="text-decoration: none;">￥{{item.goods_price}}</text>
									</view>
								</view>
								<view style="margin-top: 0rpx;color: #FF0200;height: 40rpx;">
									<view class="flex flex-x-b">
										<view class="flex flex-y-end">
											<block v-if="item.commission && role_ == 'shoper'"><text class="fs-24">销售佣金 </text> <text class="fs-24" style="padding-left: 10rpx;">¥{{item.commission}}</text></block>
										</view>
										<view class="flex flex-y-end flex-1 ml-24 flex-x-end" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size: 24rpx;">
											<text style="color: #999999;">{{item.comment_content?item.comment_content : (item.monthSales?('月销量'+item.monthSales):'')}}</text>
										</view>
									</view>
								</view>
		
								<view class="flex flex-x-b flex-y-end">
									<view class="quan">
										{{item.discount_price}}元券
									</view>
									<view class="flex-1 flex flex-x-end">
										<button @tap.stop="mycopy(item.share_font)" open-type="share" :data-title="item.desc?item.desc:item.goods_name"
										 :data-id="item.goods_id" :data-img="item.goods_img" style="font-size: 24rpx;color:#F23005;padding: 0; padding-left: 38rpx;text-decoration: underline;
			display: inline;line-height: normal;margin: 0;background-color: #F4F4F4;">一键转发</button>
										<text style="font-size: 24rpx;color:#F23005; padding-left: 38rpx;text-decoration: underline;" @tap.stop="less(download_share,item)">下载海报</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<goods-all background="#F4F4F4" :list="goods"></goods-all>
				<view class="footer-text" v-if="goods.length == 0 && show">
					已经浏览完了，去看看别的
				</view>
			</view>
			<!-- 列表结束 -->
		
			<!-- 签约入口开始 -->
			<view v-if="role_ == 'shoper' && !signup" class="" style="width: 100%;height: 88rpx;">
				<view class="flex flex-x-b flex-y-center pl-24 pr-24" style="height: 88rpx;background-color: #FFFFFF;position: fixed;bottom: 0;left: 0;z-index: 9;width: 100%;">
					<text class="fs-30" style="color: #F23005;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">签约[亲导购·全网省]开启多一笔收益</text>
					<text @tap="less(toPage,'/pages/related/related')" class="fs-24 color-fff flex flex-x-center flex-y-center ml-10"
					 style="width: 140rpx;height: 54rpx;background-color: #F23005;border-radius: 27rpx;">立即签约</text>
				</view>
			</view>
			<!-- 签约入口结束 -->
		</view>
		
		<view class="woaini">
			 <txv-video class="myvideo" vid="z3225qji9io" playerid="" autoplay style="width: 100%;height: 100vh;"></txv-video>
		</view>
		
	</view>
</template>

<script>
	import goodsAll from '@/components/goodsAll.vue';
	export default {
		data() {
			return {
				navs: [],
				goods: [],
				keyword: "",
				order: "", //排序
				price_start: '', //最低价
				price_end: '', //最高价
				page: 1,
				filters: require('../../utils/filters.js'),
				nav_index: 0,
				cids: '',
				show: false,
				background: '', //背景图
				img: {},
				role: uni.getStorageSync('role'),
				signup: true, //签约是否成功 true 成功
				customBar: getApp().globalData.customBar,
				statusBar: getApp().globalData.statusBar,
				customHeight: (getApp().globalData.custom.bottom - getApp().globalData.custom.top) || 0,
				mch: {
					user: {
						avatar_url: ''
					},
					name: '',
					logo: '',
					desc: ''
				},
			}
		},
		components: {
			goodsAll
		},
		onShow() {
			return ;
			this.is_success();

		},
		methods: {
			to_article() {
				uni.navigateTo({
					url: '/pages/article-detail/article-detail?id=78'
				})
			},
			toPage(url) {
				uni.navigateTo({
					url: url
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
			//获取分类
			get_navs() {
				this.getApp().request({
					data: {
						type: 12
					},
					url: this.getApp().api.taoke.tk_navs,
					success: (res) => {
						// console.log('navs', res);
						if (res.code == 0 && res.data.data) {
							res.data.data.unshift({
								cid: '',
								cname: '推荐'
							});
							this.navs = res.data.data || [];
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
					cids: this.cids || "",
					// sortName:'finally',
					//排序字段：finally券后价；brokerage佣金比例；sale折扣力度；OrderCount30Days 30天引入订单量；inOrderComm30Days 30天支出佣金；getCouponNum领券量；comments评论数；goodComments好评数
					// sort:this.order,//asc,desc升降序
					// price_start:'', //最低价
					// price_end:'',//最高价
					keyword: this.keyword || "",
					page: this.page,
					sort: '0', //排序方式，默认为0，0-综合排序，1-商品上架时间从高到低，2-销量从高到低，3-领券量从高到低，4-佣金比例从高到低，5-价格（券后价）从高到低，6-价格（券后价）从低到高
					type: 12
				};
				this.getApp().request({
					data: data,
					url: this.keyword.trim() ? this.getApp().api.taoke.tk_seach : this.getApp().api.taoke.tk_goods,
					success: (res) => {
						// console.log('goods',res.data.result.data);
						// console.log('goods', res.data.data);
						let data = [];
						if (res.data && res.data.good_list instanceof Array) {
							data = res.data.good_list;
						}
						if (res.data && res.data instanceof Array) {
							data = res.data;
						}
						if (res.code == 0) {
							// this.background = res.data.imgs.background ||'';
							this.goods = data || [];
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
				this.cids = cid;
				this.page = 1;
				this.is_no_more = false;
				this.stopLoadMore = false;
				this.keyword = "";



				this.get_goods();
			},
			//搜索
			seach() {
				this.page = 1;
				this.is_no_more = false;
				this.stopLoadMore = false;



				this.get_goods();
			},
			copy(discount_link, id) {
				// uni.setClipboardData({
				//     data: discount_link,
				//     success: function () {
				//         uni.showToast({
				//         	icon:'none',
				// 			title:"链接复制成功，快去分享吧",
				// 			duration:2500
				//         })
				//     }
				// });
				this.getApp().request({
					data: {
						gid: id,
						type: 12,
					},
					url: this.getApp().api.taoke.tk_share,
					success: (res) => {
						// console.log('share_url',res);
						if (res.code == 0) {
							uni.setClipboardData({
								data: res.data.data.tpwd,
								success: function() {
									uni.showToast({
										icon: 'none',
										title: "链接复制成功，快去分享吧",
										duration: 2500
									})
								}
							});
						}
					}
				});
			},
			download_share(item) {
				//下载


				this.getApp().request({
					data: {
						id: item.goods_id,
						type: 'taobao' || '',
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
			},
			//检测是不是签约成功
			is_success() {
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

								this.signup = false;
							}
						}
					},
					complete: () => {

					}
				});
			},
		},
		onLoad(e) {
			return ;
			console.log('e', e)
			// setTimeout(()=>{
			// 	uni.showToast({
			// 		icon:'none',
			// 		title:JSON.stringify(uni.getStorageSync('_mchInfo') || {}),
			// 		duration:5000
			// 	});
			// 	console.log(JSON.stringify(uni.getStorageSync('_mchInfo')))
			// },4000)
			this.getApp().page.onLoad(this, e);
			setTimeout(() => {
				this.show = true
			}, 2000)

			// this.get_navs();

			this.get_goods();

			this.get_img();
		},
		onReachBottom() {
			uni.showLoading({
				title: '请求商品列表中',
				mask: false
			});
			let data = {
				cids: this.cids || "",
				// sortName: 'finally',
				//排序字段：finally券后价；brokerage佣金比例；sale折扣力度；OrderCount30Days 30天引入订单量；inOrderComm30Days 30天支出佣金；getCouponNum领券量；comments评论数；goodComments好评数
				// sort: this.order, //asc,desc升降序
				// price_start: '', //最低价
				// price_end: '', //最高价
				keyword: this.keyword || "",
				page: this.page,
				sort: '0',
				type: 12,
			};
			this.getApp().core.pading(this, (this.keyword.trim() ? this.getApp().api.taoke.tk_seach : this.getApp().api.taoke.tk_goods),
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
				// console.log('分享', res)
				title = res.target.dataset.title;
				id = res.target.dataset.id;
				img = res.target.dataset.img;
				return {
					title: decodeURI(title),
					path: '/pages/goodsTK/goodsTK?type=taobao' + '&id=' + id + '&mch_id=' + (uni.getStorageSync('_mchInfo').id || ''),
					imageUrl: img,
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
		background-color: #F4F4F4;
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
		// background-color: #FFFFFF;
		box-sizing: border-box;
		// padding: 16rpx;

		// border-radius: 20rpx;
		margin-top: 24rpx;

		.banner-img {
			width: 250rpx;
			height: 250rpx;
			border-radius: 8rpx;
			background-color: #FFFFFF;
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
		background-color: #F4F4F4;
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
		background-color: #F4F4F4;
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
	
	
	.goods-video{
		background-color:blue;
		width: 700rpx;
		height: 700rpx;
	}
	
	.myvideo{
		width: 100%;
		height: 100vh;
		background-color: red;
	}
	page{
		background-color: #000000;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		padding-bottom: 100rpx;
		height: 100vh;
		overflow: hidden;
	}
	
	.woaini{
		background-color: red;
		width: 750rpx;
	}
</style>
