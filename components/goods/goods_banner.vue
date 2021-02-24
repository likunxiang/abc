<template>
	<view class="good-good-banners pr">
		<view class="banner-icon-box">
			<view class="banner-icon text-center mb-20" @click="getGoodsQrcode">
				<view class="iconfont icon-xiazai1"></view>
				<view class="fs-20 text-center">海报</view>
			</view>
			<block v-if="role_ == 'shoper' && app!='lianmeng' && page_url=='goods'">
				<view class="banner-icon text-center mb-20" :style="goods.is_user_recom?'background: #C10000':''" @click="changeRecommend">
					<view :class="'iconfont ' + (goods.is_user_recom?'icon-quchu':'icon-tianjia2') "></view>
					<view class="fs-20 text-center">{{goods.is_user_recom?'删去':'添加'}}</view>
				</view>
				<navigator url="/tool/recommendList/recommendList" class="banner-icon text-center" >
					<view class="iconfont icon-tuijian1"></view>
					<view class="fs-20">清单</view>
				</navigator>
			</block>
		</view>
		<custom mode="2" :background="background_title" :title="title_title" btnMode="2" houseBk="#fff" fixed='fixed' height="0"
		 titleColor="#2C2C2C" borderColor="rgba(0, 0, 0, 0.08)" backColor="#000000" lineColor="#dcdcdc"></custom>

		<swiper class="goods-image-swiper pr" :autoplay="autoplay" interval="3000" duration="300" circular="true" @change="hide"
		 indicator-color="rgba(159,159,159,0.3)" indicator-active-color="rgba(159,159,159,1)">
			<block v-for="(item, index) in goods.cover_pic" :key="index">
				<swiper-item>
					<image @tap="onGoodsImageClick" :data-index="index" class="goods-image" :src="item" mode="aspectFill"></image>
					<block v-if="goods.video_url">
						<image :class="'play ' + img_hide" :src="__wxapp_img.store.video_play.url" :data-url="goods.video_url" @tap="play"></image>
					</block>
					<view class="pa banner-num color-fff fs-24">{{index+1}}/{{goods.cover_pic.length}}</view>
				</swiper-item>

			</block>
		</swiper>

	</view>
</template>

<script>
	import custom from "@/components/custom/custom.vue"
	export default {
		name: 'goodsbanner',
		data() {
			return {
				customBar: getApp().globalData.customBar,
				statusBar: getApp().globalData.statusBar,
				__user_info: {},
				autoplay: true,
				app: getApp().globalData.app,
			}
		},
		components: {
			custom
		},
		props: {
			goods: {
				type: Object,
				default: () => {
					return {}
				}
			},
			myBack: {
				type: Boolean,
				default: false
			},
			background_title: {
				type: String,
				default: ''
			},
			title_title: {
				type: String,
				default: ''
			},
			page_url: {
				type: String,
				default: 'goods'
			}
		},
		created() {

		},
		watch: {

		},
		methods: {
			changeRecommend() {
				this.goods.is_user_recom?this.cancelRecommend():this.addRecommend()
			},
			addRecommend() {
				if (this.login())
					return;
				this.getApp().request({
					url: this.getApp().api.default.add_recom,
					data: {
						goods_id: this.goods.id
					},
					success: (res) => {
						if (res.code == 0) {
							this.PAGE().goods.is_user_recom = true;
						} else if (res.code == 1) {
							this.showToast(res.msg);
							if (res.msg == '请先登录') {
								this.timeOut(() => {
									uni.setStorageSync('ACCESS_TOKEN', '');
									this.$store.commit('vuexSet', {
										name: 'show_loginTpl',
										value: true
									}); //未登录
								}, 400)
							}
						}
					}
				})
			},
			cancelRecommend() {
				this.getApp().request({
					url: this.getApp().api.default.del_recom,
					data: {
						goods_id: this.goods.id
					},
					success: (res) => {
						if (res.code == 0) {
							this.PAGE().goods.is_user_recom = false;
						} else if (res.code == 1) {
							this.showToast(res.msg);
						}
					}
				})
			},
			getGoodsQrcode() {
				this.$emit('getGoodsQrcode')
			},
			goBack() {
				// uni.navigateBack({
				// 	delta:1
				// })
				if (this.myBack == true) {
					this.$emit('myback');
					return;
				}
				this.uniBack();

			},
			onGoodsImageClick: function(e) {
				var urls = [];
				var index = e.currentTarget.dataset.index;
				// for (var i in this.goods.pic_list) {
				//     urls.push(this.goods.pic_list[i]);
				// }
				if (this.goods.cover_pic.length <= 0)
					return;
				uni.previewImage({
					urls: this.goods.cover_pic, // 需要预览的图片http链接列表
					current: index,
				});
			},
			// 大图显示/隐藏
			hide: function(e) {
				if (e.detail.current == 0) {
					this.img_hide = ""

				} else {
					this.img_hide = "hide"
				}
			},

			/**
			 * 视频播放
			 */
			play: function(e) {
				var self = this.currentPage;
				var url = e.target.dataset.url; //获取视频链接
				this.url = url;
				this.hide = '';
				this.show = true;
				var videoContext = uni.createVideoContext('video');
				videoContext.play();
			},

			/**
			 * 关闭视频
			 */
			close: function(e) {

				if (e.target.id == 'video') {
					return true;
				}
				this.hide = 'hide';
				this.show = false;
				var videoContext = uni.createVideoContext('video');
				videoContext.pause();
			},
		}
	}
</script>

<style>
	.con {
		width: 100%;
		z-index: 10;
		padding: 0 24rpx;
	}

	.live-box {
		position: absolute;
		top: -710rpx;
		right: 24rpx;
		width: 108rpx;
		background: linear-gradient(0deg, #F51D39, #FE3876);
		border-radius: 30rpx;
		padding: 14rpx 12rpx;
	}

	.live-icon-box {
		width: 70rpx;
		height: 70rpx;
		background: #FFFFFF;
		border-radius: 50%;
		text-align: center;
		line-height: 70rpx;
		color: #F51D39;
		font-size: 40rpx;
		margin: auto;
	}

	.live-btn {
		width: 84rpx;
		height: 36rpx;
		background: #FFFFFF;
		box-shadow: 0px 8rpx 16rpx 0px rgba(211, 0, 32, 0.66);
		border-radius: 18rpx;
		text-align: center;
		line-height: 36rpx;
		color: #F72449;
		font-size: 20rpx;
		font-weight: 600;
		margin-top: 14rpx;
	}

	.nav-icon-box {
		background: rgba(0, 0, 0, .3);
		border-radius: 50%;
		height: 100%;
		align-items: center;
		display: flex;
		justify-content: center;

	}

	.backBtn {
		font-size: 36rpx;
		height: 100%;
		color: #FFFFFF;

	}

	.time-title {
		width: 200rpx;
		height: 58rpx;

		border-radius: 29rpx;
		text-align: center;
	}

	.time-title-green {
		background: linear-gradient(-90deg, #00C584, #1DC064);
	}

	.time-title-red {
		background: linear-gradient(-90deg, #FF3750, #FF7006);
	}

	.goods-image-swiper {
		height: 750rpx;
		position: relative;
	}

	.goods-image-swiper image {
		height: 750rpx;
	}

	.goods-image {
		width: 100%;
		height: 100%;
	}

	.share_commission {
		height: 80rpx;
		width: 220rpx;
		position: absolute;
		right: 0;
		bottom: 80rpx;
		border-top-left-radius: 40rpx;
		border-bottom-left-radius: 40rpx;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.share_commission .img {
		width: 44rpx;
		height: 44rpx;
		margin-right: 14rpx;
		margin-left: 20rpx;
	}

	.share_commission .text_box {
		font-size: 7pt;
		color: #fff;
	}

	.share_commission .text2 {
		font-weight: bold;
	}

	.goods-image-swiper .play {
		width: 150rpx;
		height: 150rpx;
		position: absolute;
		top: 275rpx;
		left: 300rpx;
	}

	.banner-num {
		bottom: 24rpx;
		left: 24rpx;
		padding: 0 10rpx;
		height: 40rpx;
		background: rgba(37, 37, 37, 0.64);
		border-radius: 8rpx;
		line-height: 40rpx;
	}

	.banner-icon-box {
		position: absolute;
		bottom: 20rpx;
		right: 24rpx;
		width: 80rpx;
		z-index: 2;
	}

	.banner-icon {
		width: 80rpx;
		height: 80rpx;
		background: rgba(37, 37, 37, 0.64);
		border-radius: 50%;
		padding-top: 13rpx;
		color: #fff;
	}
</style>
