<template>
	<view>
		<custom lineColor="#dcdcdc" borderColor="rgba(220,220,220,0.6)" btnMode="2" backColor="#000000" houseBk="true" mode="2"
		 fixed="fixed" title="视频购物" titleColor="#2C2C2C" background="#FFFFFF"></custom>
		 
		<view class="plr-24 pt-20 bg-white">
			<image src="" mode="aspectFit" style="width: 702rpx;background: #007AFF;height: 160rpx;border-radius: 10rpx;"></image>
		</view>

		<!-- tab栏位 -->
		<scroll-view scroll-x="true" style="width: 100%;background-color: #FFFFFF;"  :scroll-left="scroll_left" :scroll-with-animation="true">
			<view v-if="navs.length>0" class="tabs fs-30" style=" white-space: nowrap;padding-left: 24rpx;padding-bottom: 0rpx;"
			 :style="{'top': customBar + 'px'}">
				<view class="tablist" style="width: auto;white-space: nowrap;height: 77rpx;font-size: 30rpx;">
					<view class="tabitem" @tap.stop="choose_cat(index,item.cid)" :class="{'active':index==nav_index}" v-for="(item,index) in navs"
					 :key="index" style="display: inline-block;margin-right: 25rpx;line-height: 77rpx;">
						{{item.cname}}
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- tab栏位 -->
		
		
		
		
		
		
		
		<!-- 内容为空 -->
		<view v-if="is_null" class="" style="text-align: center;margin-top: 32rpx;">
			<text class="iconfont icon-qinpuLOGO" style="color: #DFDFDF;margin-top: 30rpx;font-size: 100rpx;"></text>
			<view class="" style="font-size: 30rpx;color: #DFDFDF;margin-top: 0rpx;margin-bottom: 150rpx;">
				买之前 问亲铺 · 亲导购 全网省
			</view>
		</view>
		<!-- 内容为空 -->
		
		<view class="flex flex-x-b flex-wrap pl-24 pr-24">
			<view class="mt-24 pr" v-for="(item,index) in goods" :key="index" style="width: 340rpx;height: 487rpx;border-radius: 8rpx;background-color: rgba(255, 255, 255, 1);overflow: hidden;">
				<!-- 月销 -->
				<view class="color-fff fs-24" style="line-height: 45rpx;border-radius: 8rpx;background-color: rgba(112,113,115,0.64);position: absolute;padding:0 7rpx;top:20rpx;left: 20rpx;z-index: 3;">
					月销 2.5万
				</view>
				
				<!-- 图片 -->
				<image src="" mode="aspectFill" style="position: absolute;left: 0;top: 0;z-index: 2;width: 340rpx;height: 487rpx;"></image>
				
				<view class="flex flex-x-center flex-y-center" style="width: 70rpx;height: 70rpx;border-radius: 50%;background-color: rgba(112,113,115,0.64);position: absolute;left: 135rpx;top:209rpx;z-index: 2;">
					<view class="iconfont icon-bofang2 color-fff fs-34" style="width: 32rpx;"></view>
				</view>
				
				<view class="color-fff fs-28" style="position: absolute;bottom: 0;left: 0;width: 100%;height: 100rpx;z-index: 2;background-color: rgba(112,113,115,0.64);">
					<view class="flex text-hidden flex-y-center" style="height: 50rpx;">
						<image src="" mode="" style="" style="width: 25rpx;height: 25rpx;margin-left: 14rpx;margin-right: 12rpx;background-color: red;"></image>
						<text class="flex-1 text-hidden">春季新款体恤复古法撒旦港…</text>
					</view>
					<view class="flex flex-x-b flex-y-center" style="height: 40rpx;">
						<view class="flex flex-y-end" style="color: #FFFFFF;">
							<text style="font-size: 18rpx;margin-left: 14rpx;">¥</text>
							<text style="line-height: 28rpx;line-height: 30rpx;">{{filters.priceStr(xs(item.price,2))[0]}}.</text>
							<text style="font-size: 18rpx;">{{filters.priceStr(xs(item.price,2))[1]}}</text>
						</view>
						<text class="quan1" v-if="item.discount_price!=''&&item.discount_price!=0">券<text class="quan_num">{{item.discount_price || '0'}}元</text></text>
					</view>
				</view>
				
			</view>
		</view>
		
		
		<!-- 底部 -->
		<view v-if="false" hover-class="click" class="flex flex-y-center fs-30" style="width: 590rpx;height: 80rpx;position: fixed;bottom: 30rpx;left: 80rpx;border-radius: 40rpx;background-color: #272727;color: #FFFFFF;z-index: 99;">
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

	</view>

</template>

<script>
	export default {
		data() {
			return {
				filters: require('../../utils/filters.js'),
				customBar: getApp().globalData.customBar,
				navs: [],
				nav_index: 0,
				cids: '',
				show_top:false,
				is_null:false,
				goods:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},],
			};
		},
		onLoad(e) {
			this.getApp().page.onLoad(this, e);

			this.get_goods();
			this.get_navs();
		},
		computed:{
			scroll_left() {
				if (this.nav_index <= 2)
					return 0;
				return uni.upx2px(100) * (this.nav_index - 2) + uni.upx2px(56);
			}
		},
		methods: {
			choose_cat(index, id) {
				this.nav_index = index;
				this.cids = id || '';
				this.page = 1;
				this.is_null = false;

				// this.get_goods();
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
			//获取商品
			get_goods() {
				uni.showLoading({
					title: '请求商品列表中',
					mask: false
				});
				let data = {
					cids: this.cid || "",
					page: this.page,
					type: 22,
					page_size:10
				};
				this.getApp().request({
					data: data,
					// url: this.keyword.trim() ? this.getApp().api.taoke.tk_seach : this.getApp().api.taoke.tk_goods,
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
		onShareAppMessage() {
			return {
				title: this.share_title || '',
				path: this.getPath() + '?mch_id=' + (uni.getStorageSync('_mchInfo').id || ''),
				imageUrl: this.share_image || '',
			}
		}
	}
</script>

<style lang="scss">
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
		color: #EB0401;
	}

	.tablist .active::after {
		content: "";
		position: absolute;
		background-color: #EB0401;
		width: 70rpx;
		height: 10rpx;
		// background: linear-gradient(90deg, #FE4001, #EB0301);
		border-radius: 5rpx;
		bottom: 1rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.quan1 {
		border-radius: 8rpx;
		line-height: 40rpx;
		padding: 0 8rpx;
		background: linear-gradient(135deg, #F76436 0%, #F49E3A 100%);
		margin-right: 10rpx;
		position: relative;
		font-size: 24rpx;
		color: #FFFFFF;
		.quan_num {
			padding-left: 20rpx;
		}
		
		&::before {
			content: "";
			position: absolute;
			width: 0.5px;
			height: 29rpx;
			left: 39rpx;
			top: 50%;
			transform: translate(0, -50%);
			background-color: #FFFFFF;
			z-index: 2;
			opacity: 0.5;
		}
	}
</style>
