<template>
	<view>
		<common></common>
		<custom fixed="fixed" :title="role == 'shoper'?'推荐清单':'帮你选好货'" mode="2" titleColor="#2C2C2C" btnMode="2" background="#fff"
		 borderColor="rgba(0, 0, 0, 0.08);" backColor="#000000"></custom>

		<view class="nav-box flex align-center justify-between">
			<view class="ns-text-bold color-2C2C2C fs-30">挑选了 {{count}} 件好货</view>
			<view class="empty-btn" @click="emptyRecommend" v-if="role == 'shoper' && is_my">全部清空</view>
		</view>

		<view class="bg-white">
			<view v-if="recommendList.length <= 0" class="flex-y-center flex-x-center" style="height: 100%;">
				<view class="text-center fs-28" style="color: #DBDBDB;">
					<view class="iconfont icon-kongbaiye1" style="font-size: 400rpx;"></view>
					<view style="line-height: 53rpx;">
						<view>选择喜欢的商品、活动</view>
						<view>添加到收藏</view>
						<view>好货、好价不错过</view>
					</view>
				</view>
			</view>
			<view class="goods_box" v-else>
				<view class="goods_all mt-20 pl-24 pr-24 fs-28 flex align-center" v-for="(item,index) in recommendList" :key="index"
				 @tap="to_detail('/pages/goods/goods?id=' + item.id)">
					<!-- 选中按钮 -->
					<view :class="'iconfont mr-30 fs-40 ' + (true?'icon-xuanzhong':'icon-weixuanzhong color-8D8D8D')" v-if="is_edit"></view>


					<view class="left">
						<!-- 图片 -->
						<image :src="item.first_cover_pic" class="banner" mode="aspectFit"></image>
					</view>
					<view class="right pl-20 flex-1 flex flex-y flex-x-b" style="height: 220rpx;">
						<!-- 商品名 -->
						<view class="name">
							{{item.name || ''}}
							<!-- 小图标 -->
							<image :src="item.type_logo" class="icon_type" mode=""></image>
						</view>

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
						<view></view>
						<view class="flex flex-x-b flex-y-end line4" v-if="is_my">
							<view class="flex-1 fs-24 color-8D8D8D">
								{{!item.show_status?item.show_msg:''}}
							</view>
							<view @tap.stop="cancelRecommend(item.id)" class="fs-24" style="color:#EB0401;text-decoration: underline;">
								删除
							</view>
							<button style="margin-left: 30rpx;" class="share" @tap.stop="" open-type="share" data-type="goods" :data-title="item.name"
							 :data-id="item.id" :data-img="item.first_cover_pic">分享</button>
						</view>
						<view class="flex flex-x-b flex-y-end line4" v-else>
							<view class="flex-1 fs-24 color-8D8D8D">
								{{!item.show_status?item.show_msg:''}}
							</view>

							<button class="share" @tap.stop="" open-type="share" data-type="goods" :data-title="item.name" :data-id="item.id"
							 :data-img="item.first_cover_pic">分享</button>
							<view class="fs-24" style="color:#EB0401;text-decoration: underline;margin-left: 30rpx;">
								查看
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<pageFooter v-if="recommendList.length > 0"></pageFooter>

		<!-- 底部 -->
		<view hover-class="click" class="flex flex-y-center fs-30 pr" style="width: 590rpx;height: 80rpx;position: fixed;bottom: 30rpx;left: 80rpx;border-radius: 40rpx;background-color: #272727;color: #FFFFFF;z-index: 99;">
			<!-- 没有商品的时候 -->
			<view class="empty-list" v-if="recommendList.length <= 0" @click="stopTransmit "></view>

			<view @tap.stop="get_share_img" class="flex flex-x-center align-center pr line-xian" style="width: 50%;">
				<text class="iconfont icon-fenghuangxiangmutubiao_tupian" style="margin-right: 20rpx;"></text><text>下载海报</text>
			</view>
			<view class="flex flex-x-center align-center" style="width: 50%;">
				<button open-type="share" class="share-clear" style="color: #FFFFFF;"><text class="iconfont icon--fenxiang1"
					 style="margin-right: 20rpx;"></text><text>分享清单</text></button>
			</view>
		</view>

		<!-- 分享海报 -->
		<share2 ref="share2" :loadingSrc="__wxapp_img.system.loading2.url"></share2>
	</view>
</template>

<script>
	import custom from '@/components/custom/custom.vue'
	import share2 from '../../components/share2/share2.vue';
	import pageFooter from '@/components/common/footer.vue'
	export default {
		data() {
			return {
				recommendList: [],
				filters: require('../../utils/filters.js'),
				role: uni.getStorageSync('role'),
				page: 1,
				stopLoadMore: false,
				sid: '', // 清单创造者的sid
				count: 0,
				parent_id: '',
				user_id: uni.getStorageSync('USER_INFO').id,
				is_my: false,  // 是否我自己的清单
			};
		},
		components: {
			share2,
			custom,
			pageFooter
		},
		onLoad(options) {
			this.getApp().page.onLoad(this, options);
			if (options.sid) {
				this.getApp().page.getServerShareInfo(options, () => {
					this.getRecommendList()
				});
				
			} else {
				this.getRecommendList()
			}
			
		},
		methods: {
			to_detail(url) {
				this.toPage(url)
			},
			getRecommendList() {
				if (this.login())
					return;
				this.getApp().request({
					url: this.getApp().api.default.recom_list,
					data: {
						parent_id: this.parent_id || '',
					},
					success: (res) => {
						if (res.code == 0) {
							this.recommendList = res.data.list;
							this.count = res.data.row_count
							this.sid = res.data.sid
							this.is_my = res.data.is_my
							var imgUrl = []
							for (let i in res.data.list) {
								if (i < 4) {
									imgUrl.push(res.data.list[i].first_cover_pic)
								} else {
									break
								}
							}
							this.imgUrl = imgUrl
							this.getShareImg()
							console.log(this.imgUrl);
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
			getShareImg() {
				let recommendList = this.recommendList[0]
				var self = this
				self.getApp().request({
					url: self.getApp().api.default.shareCard,
					method: 'POST',
					data: {
						pics: self.imgUrl.toString() || '',
						price: recommendList.price || '',
						id: recommendList.id || '',
						type: '112',
						goods_name: recommendList.name || '',
					},
					success: function(res) {
						if (res.code == 0) {
							uni.hideLoading()
							self.setData({
								sharePic: res.data.pic_url,
								shareTitle: res.data.goods_name
							})
						}
						if (res.code == 1) {
							uni.hideLoading()
							uni.showToast({
								title: '卡片图片获取失败，请稍后再试',
								duration: 2500,
								icon: 'none'
							})
						}
					},
					fail: function() {
						uni.hideLoading()
						uni.showToast({
							title: '网络错误，请稍后再试',
							duration: 2500,
							icon: 'none',
						})
					}
				})
			},
			cancelRecommend(id) {
				uni.showModal({
					title: '确定删除？',
					success:(res) => {
						if(res.confirm) {
							this.getApp().request({
								url: this.getApp().api.default.del_recom,
								data: {
									goods_id: id || ''
								},
								success: (res) => {
									if (res.code == 0) {
										this.getRecommendList()
									} else if (res.code == 1) {
										this.showToast(res.msg);
									}
								}
							})
						}
					}
				})
			},
			emptyRecommend() {
				uni.showModal({
					content: '确定要删除 清单里的全部商品吗？',
					success: (res) => {
						if (res.confirm) {
							this.cancelRecommend()
							console.log('清空');
						}
					}
				})
			},
			stopTransmit() {
				this.showToast('别伤害顾客，清单为空哦～')
			},
			get_share_img(type) {
				//////////////////////////////打开分享弹窗
				this.$refs.share2.open(() => {
					this.getApp().request({
						url: this.getApp().api.default.recom_share_qrcode,
						data: {
							goods_pic: this.imgUrl.toString(),
							sid: this.sid
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
		},
		onShareAppMessage(res) {

			let title = '';
			let img = '';
			let id = '';
			let page = '';
			if (res.from === 'button') { // 来自页面内分享按钮

				let type = res.target.dataset.type

				if (type == 'goods') {
					title = res.target.dataset.title;
					id = res.target.dataset.id;
					img = res.target.dataset.img;
					page = '/pages/goods/goods?id=' + id + '&mch_id=' + (uni.getStorageSync('_mchInfo').id || '')
					return {
						title: decodeURI(title),
						path: page,
						imageUrl: img,
						mch_id: uni.getStorageSync('_mchInfo').id || ''
					}
				}
				else {
					return {
						title: this.shareTitle,
						path: this.getPath() + '?mch_id=' + (uni.getStorageSync('_mchInfo').id || '') + '&user_id=' + (uni.getStorageSync(
							'USER_INFO').id || '') + '&sid=' + this.sid,
						imageUrl: this.sharePic,
					}
				}

			}


		},
		onReachBottom: function() {
			var self = this

			var page = self.page
			var data = {
				parent_id: this.parent_id || '',
			}
			var url = this.getApp().api.default.recom_list
			this.getApp().core.pading(self, url, data, (res) => {
				//console.log('首页上拉',res)
				if (res.data.list.length == 0) {
					self.setData({
						stopLoadMore: true,
					})
					return
				}
				//var newActList = res.data.data
				var newList = res.data.list
				var nowList = self.recommendList.concat(newList)
				self.setData({
					recommendList: nowList,
				})
			})
		},
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.nav-box {
		width: 100%;
		background: #F4F4F4;
		box-shadow: 0px 2rpx 2rpx 0px rgba(228, 228, 228, 0.5);
		padding: 0rpx 24rpx;
		height: 87rpx;

		.empty-btn {
			width: 150rpx;
			height: 54rpx;
			line-height: 50rpx;
			text-align: center;
			font-size: 28rpx;
			color: #EB0401;
			background: #FFFFFF;
			border-radius: 30rpx;
			border: 2rpx solid #EB0401;
		}
	}

	.goods_box {
		padding-bottom: 20rpx;
		overflow: hidden;

		.left {
			width: 250rpx;
			height: 250rpx;
			overflow: hidden;

			image {
				width: 250rpx;
				height: 250rpx;
				border-radius: 8rpx;
				background-color: rgba(0, 0, 0, 0.1);
				font-size: 0;
				line-height: 0;
			}
		}

		.right {
			position: relative;
			padding-bottom: 0rpx;

			.name {
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
				word-wrap: break-word;
				word-break: break-all;
			}

			.icon_type {
				position: absolute;
				top: 5rpx;
				left: 0;
				// background-color: rgba(0, 0, 0, 0.05);
				width: 30rpx;
				height: 30rpx;
				z-index: 1;
				border-radius: 4rpx;
			}

			.line1 {
				font-size: 24rpx;
				color: #8D8D8D;
				width: 400rpx;

				.pingfen {
					padding: 0 5rpx;
					border-radius: 4rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					line-height: 30rpx;
					background: linear-gradient(146deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
				}

				.rr {
					background: linear-gradient(135deg, #3023AE 0%, #C86DD7 100%);
					-webkit-background-clip: text;
					color: transparent;
					-webkit-text-fill-color: transparent;
					text-fill-color: transparent;

				}

				.ziying {
					padding: 0 5rpx;
					border-radius: 4rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					line-height: 30rpx;
					background: linear-gradient(146deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
				}

				.guoji {
					padding: 0 5rpx;
					border-radius: 4rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					line-height: 30rpx;
					background: linear-gradient(135deg, #3023AE 0%, #C86DD7 100%);
				}

				.haodian {
					padding: 0 5rpx;
					border-radius: 4rpx;
					color: #8F7DDF;
					font-size: 20rpx;
					line-height: 28rpx;
					border: 1rpx solid #8F7DDF;
				}

				.zigong {
					padding: 0 5rpx;
					border-radius: 4rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					line-height: 30rpx;
					background: linear-gradient(146deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
				}
			}

			.line2 {
				color: #EB0401;
				font-size: 24rpx;
				font-weight: bold;

				.min {
					font-size: 18rpx;
					transform: translateY(-6rpx);
				}
			}

			.line3 {
				font-size: 24rpx;
				color: #8D8D8D;

				.min {
					font-size: 18rpx;
					transform: translateY(-3rpx);
				}
			}

			.line4 {
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

				.zhuan {
					border-radius: 8rpx;
					line-height: 40rpx;
					padding: 0 8rpx;
					background: linear-gradient(127deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
					margin-right: 10rpx;
					position: relative;
					font-size: 24rpx;
					color: #FFFFFF;

					.zhuan_num {
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

				button {
					margin: 0;
					padding: 0;
					line-height: 30rpx;
					color: #EB0401;
					font-size: 24rpx;
					text-decoration: underline;
					background-color: rgba(0, 0, 0, 0);
				}
			}
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

	.empty-list {
		position: absolute;
		left: 0rpx;
		right: 0rpx;
		top: 0rpx;
		bottom: 0rpx;
		z-index: 1;
	}
</style>
