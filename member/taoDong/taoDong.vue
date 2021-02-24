<template>
	<view>
		<custom mode="2" fixed="fixed" :title="title" background="#FFFFFF" backColor="#333333" titleColor="#333333"></custom>

		<!-- 分享图片 -->
		<view class="pl-24" style="background-color: #FFFFFF;" v-if="share_img">
			<button open-type="share" class="share_clear">
				<image :src="category_img" mode="aspectFit" style="width: 702rpx;height: 130rpx;margin-top: 16rpx;border-radius: 20rpx;"></image>
			</button>
		</view>

		<!-- tab栏位 -->
		<view class="flex flex-x-a flex-y-center fs-36 color-333333" style="height: 110rpx;background-color: #FFFFFF;padding:0 50rpx ;">
			<text @tap="choose_nav('taobao')" :class="{'active':type=='taobao'}">淘宝</text>
			<text @tap="choose_nav('jingdong')" :class="{'active':type=='jingdong'}">京东</text>
		</view>


		<goods-all :list="goods" :type="type" background="#f4f4f4"></goods-all>
		<view class="footer-text" v-if="is_null && show" style="text-align: center;line-height: 60rpx;color: #999999;font-size: 30rpx;">
			已经浏览完了，去看看别的
		</view>
	</view>
</template>

<script>
	import goodsAll from '@/components/goodsAll.vue';
	export default {
		data() {
			return {
				title: '', //标题
				type: 'taobao', ///或者jingdong
				goods: [],
				page: 1,
				show: false,
				is_null: false,
				share_img: '', //顶部图片
				category: 'xsqg',
			}
		},
		components: {
			goodsAll
		},
		computed: {
			category_img() {
				return this.init_img[this.category]
			}
		},
		methods: {
			choose_nav(x) {
				this.page = 1;
				this.goods = [];
				this.type = x;
				this.is_null = false;


				this.get_goods();
			},
			get_goods() {
				//请求
				uni.showLoading({
					title: '请求商品列表中',
					mask: false
				});


				let data = {
					type: 22,
					page: this.page
				};
				this.getApp().request({
					data: data,
					url: this.getApp().api.taoke.tk_goods,
					success: (res) => {
						let data = [];
						if (res.data && res.data.good_list instanceof Array) {
							data = res.data.good_list;
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
		onLoad(e) {
			this.getApp().page.onLoad(this, e);
			setTimeout(() => {
				this.show = true
			}, 1000)


			this.title = e.title || '精选';
			this.category = e.category || 'xsqg';


			this.get_goods();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F4F4F4;
	}

	.active {
		font-weight: bold;
		color: #F23005;
		position: relative;
	}

	.active::after {
		content: "";
		position: absolute;
		left: 50%;
		bottom: -14rpx;
		transform: translateX(-50%);
		width: 40rpx;
		height: 4rpx;
		border-radius: 2rpx;
		background-color: #F23005;
	}
</style>
