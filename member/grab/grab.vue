<template>
	<view>
		<custom mode="2" fixed="fixed" title="限时抢购" background="#FFFFFF" backColor="#333333" titleColor="#333333"></custom>

		<!-- 分享图片 -->
		<view class="pl-24" style="background-color: #FFFFFF;" v-if="share_img">
			<button open-type="share" class="share_clear">
				<image :src="category_img" mode="aspectFit" style="width: 702rpx;height: 130rpx;margin-top: 16rpx;border-radius: 20rpx;"></image>
			</button>
		</view>

		<scroll-view scroll-x="true" style="width: 702rpx;margin-left: 24rpx;margin-top: 16rpx;background-color: #FFFFFF;border-radius: 20rpx;"
		 :scroll-left="scroll_left" :scroll-with-animation="true">
			<view style="white-space: nowrap;height: 123rpx;" class="flex pl-24">
				<view class="time_item flex flex-y flex-y-center flex-x-center" :class="{'active':nav_index==index}" v-for="(val,index) in time_arr"
				 :key="index" @tap="choose_time(index)">
					<text class="name1">{{val.name}}</text>
					<text class="name2">{{get_state(val.name)}}</text>
				</view>
			</view>
		</scroll-view>


		<!-- <goods-all :list="goods" :type="type" background="#f4f4f4"></goods-all> -->
		<view class=" ml-24 flex flex-wrap flex-x-b" style="margin-top: 18rpx;width: 702rpx;">
			<view v-for="(item,index) in 5" :key="index" class="" style="width: 340rpx;height: 490rpx;border-radius: 20rpx;overflow: hidden;margin-bottom: 24rpx;background-color: #FFFFFF;">
				<image src="" mode="" style="width: 340rpx;height: 340rpx;background-color: rgba(0,0,0,0.1);"></image>
				<!-- 商品名称介绍 -->
				<view class="goods_name1 pl-24 pr-24">多功能家用老人沙发榻的多fs沙发多用功能哈哈sdaf fsdLK kl父级拉附</view>
				<view class="goods_price1 flex flex-y-end">
					<view class="left">
						<text>￥</text><text class="t2">104.</text><text class="t3">00</text>
					</view>
					<view class="right flex flex-y-end">
						<text class="zhuan">赚</text><text>￥</text><text class="t2">17.</text><text class="t3">80</text>
					</view>
				</view>
			</view>
		</view>
		<view class="footer-text" v-if="is_null && show" style="text-align: center;line-height: 60rpx;color: #999999;font-size: 30rpx;">
			已经浏览完了，去看看别的
		</view>
	</view>
</template>

<script>
	import goodsAll from '@/components/goodsAll.vue';
	import share2 from '../../components/share2/share2.vue';
	export default {
		data() {
			return {
				title: '', //标题
				goods: [],
				page: 1,
				show: false,
				is_null: false,
				share_img: '', //顶部图片
				category: 'xsqg',
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
			goodsAll
		},
		computed: {
			category_img() {
				return this.init_img[this.category]
			},
			scroll_left() {
				if (this.nav_index <= 2)
					return 0;
				return uni.upx2px(160) * (this.nav_index - 2) + uni.upx2px(56);
			}
		},
		methods: {
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


			this.get_goods();

			this.set_index();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F4F4F4;
	}

	.time_item {
		padding-right: 40rpx;

		.name1 {
			font-size: 36rpx;
			color: #333333;
		}

		.name2 {
			line-height: 32rpx;
			padding: 0 12rpx;
			border-radius: 16rpx;
			font-size: 24rpx;
			color: #666666;
			margin-top: 4rpx;
		}
		
		
		.active {
			.name1 {
		
				color: #F23005;
			}
		
			.name2 {
		
				color: #FFFFFF;
				background-color: #F23005;
			}
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
	}

	

	.goods_name1 {
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
		min-height: 80rpx;
		word-wrap: break-word;
		word-break: break-all;
		margin-top: 10rpx;
	}
	.goods_price1{
		color: #F23005;
		font-size: 24rpx;
		margin-top: 10rpx;
		font-weight: bold;
		.left{
			padding-left: 24rpx;
			
			.t1{
				font-size: 20rpx;
			}
			.t3{
				font-size: 20rpx;
			}
		}
		.right{
			padding-left: 30rpx;
			.zhuan{
				// display: inline-block;
				width: 30rpx;
				height: 30rpx;
				border-radius: 50%;
				text-align: center;
				line-height: 30rpx;
				color: #FFFFFF;
				margin-right: 5rpx;
				background-color: #F23005;
				font-weight: normal;
				font-size: 18rpx;
			}
			.t3{
				font-size: 20rpx;
			}
		}
	}
</style>
