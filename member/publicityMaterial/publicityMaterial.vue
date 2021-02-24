<template>
	<view class="page pr">
		<view class="tab-bar flex justify-between text-center align-center">
			<view :class="'flex1 ' + (ins==index?'tab-active':'')" :data-index="index" v-for="(item,index) in tabList" :key="index" @click="changeTab">{{item.name}}</view>
		</view>
		<view class="act-list">
			<view v-for="(item, id) in materialInfo" :key="id">
				<view class="act-main" style="margin-bottom: 1rpx;">
					<view class="mr-24 flex align-center">
						<image style="width: 90rpx;height: 90rpx;border-radius: 50%;border: 1rpx solid #BEBEBE;" mode="aspectFit" :src="item.logo"></image>
						<view class="ml-20">
							<view class="fs-30 color-333333 ns-text-bold">{{item.title}}</view>
							<view class="fs-26 color-999999 ns-text-bold mt-10">{{item.tj_time_str}}</view>
						</view>
					</view>

					<view class="flex1">

						<view class="mt-20 fs-26 color-333333" style="line-height: 40rpx;">
							<rich-text :nodes="item.content"></rich-text>
						</view>
						<block v-if="item.img_type == 2">
							<view class="mt-20">
								<image @tap="previewPicMore" :data-pics="item.cover_pic" :data-pic="pic" :data-type="item.type" :style="'width: 226rpx;height: 226rpx;margin-bottom: 12rpx;' + (index==2||index==5||index==8?'':'margin-right: 12rpx;') + (item.cover_pic.length==4?'margin-right: 12rpx;':'')"
								 v-for="(pic, index) in item.cover_pic" :key="index" :src="pic" ></image>
							</view>
						</block>
						<block v-else>
							<view class="mt-20">
								<image @tap="previewPic" :data-pics="item.cover_pic" :data-pic="pic" :data-type="item.type" :style="'width: 225rpx;height: 400rpx;margin-bottom: 12rpx;' + (index==2||index==5||index==8?'':'margin-right: 12rpx;') + (item.cover_pic.length==4?'margin-right: 12rpx;':'')"
								 v-for="(pic, index) in item.cover_pic" :key="index" :src="pic"></image>
							</view>
							<view style="color: #FF401A;"> #点击图片获取您的专属海报# </view>
						</block>
						<view class="mt-24 flex justify-end">
							<view class="act-btn text-center color-fff mr-24" @tap="saveMaterial" :data-pic="item.cover_pic" v-if="item.cover_pic.length>0">
								<text class="iconfont icon-xiazai1 fs-24" style="margin-right: 8rpx;"></text>
								<text class="fs-24">下载素材</text>
							</view>
							<view class="act-btn text-center color-fff" @tap="copyText" :data-text="item.content" v-if="item.content">
								<text class="iconfont icon-fuzhi1 fs-24" style="margin-right: 6rpx;"></text>
								<text class="fs-24">复制文字</text>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				materialInfo: [],
				page: 1,
				stopLoadMore: false,
				tabList: ['宣传海报','早安打卡','推荐','早安打卡'],
				ins: 0,
				type: ''
			}
		},
		onLoad() {
			this.getTabList()
		},
		onReachBottom() {
			var self = this

			var page = self.page
			var index = page
			var data = {
				type: this.type || ''
			}
			var url = this.getApp().api.default.marke_mate_list
			this.getApp().core.pading(self, url, data, (res, index) => {
				if (res.data.list.length == 0) {
					self.setData({
						stopLoadMore: true,
						is_no_more: true
					})
					return
				}
				//var newActList = res.data.data
				var newActList = res.data.list
				var nowActList = self.materialInfo.concat(newActList)
				self.setData({
					materialInfo: nowActList,
				})
			})
		},
		methods: {
			changeTab(e) {
				console.log(e.currentTarget.dataset.index);
				var index = e.currentTarget.dataset.index
				this.ins = index
				this.type = this.tabList[index].id
				this.page = 1
				this.getMaterialList()
			},
			getTabList() {
				this.getApp().request({
					url: this.getApp().api.default.marke_mate_type_list,
					data: {
					},
					success: (res) => {
						if (res.code == 0) {
							this.tabList = res.data
							this.type = res.data[0].id
						}
					},
					complete: () => {
						this.getMaterialList()
					}
				})
			},
			getMaterialList() {
				uni.showLoading({
					title: '加载中'
				})
				this.getApp().request({
					url: this.getApp().api.default.marke_mate_list,
					data: {
						type: this.type || ''
					},
					success: (res) => {
						if (res.code == 0) {
							this.materialInfo = res.data.list
						}
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			previewPic(e) {
				var picList = e.currentTarget.dataset.pics
				var pic = e.currentTarget.dataset.pic
				var type = e.currentTarget.dataset.type
				this.getDownPic(picList.toString(),type)
			},
			previewPicMore(e) {
				var picList = e.currentTarget.dataset.pics
				var pic = e.currentTarget.dataset.pic
				uni.previewImage({
					urls: picList,
					current: pic
				})
			},
			getDownPic(img,type) {
				uni.showLoading({
					mask: true,
					title: '加载图片中'
				})
				this.getApp().request({
					url: this.getApp().api.default.marke_mate_down_img,
					data: {
						userId: uni.getStorageSync('USER_INFO').id,
						cover_pic: img,
						type: type
					},
					success: (res) => {
						uni.hideLoading()
						if (res.code == 0) {
							uni.previewImage({
								urls: [res.data.pic_url],
								current: res.data.pic_url
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					},
					fail: () => {
						uni.hideLoading()
					},
					complete: () => {
						// uni.hideLoading()
					}
				})
			},
			// 复制文字
			copyText: function(e) {
				var text = e.currentTarget.dataset.text;
				text = text.replace(/<(p|div)[^>]*>/gi, '\n').replace(/<br\/?>/gi, '\n').replace(/<[^>/]+>/g, '').replace(
					/(\n)?<\/([^>]+)>/g, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/<\/?(img)[^>]*>/gi, '').replace(
					/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"").replace(
					/<\/?.+?>/g, "")


				// while (text.indexOf('<p>') > -1) {
				// 	text = text.replace('<p>', '');
				// 	text = text.replace('</p>', '\n');
				// }

				// while (text.indexOf('<br/>') > -1) {
				// 	text = text.replace('<br/>', '\n');
				// }

				// while (text.indexOf('&npsb') > -1) {
				// 	text = text.replace('&npsb', ' ');
				// }

				// while (text.indexOf('<em>') > -1) {
				// 	text = text.replace('<em>', '');
				// 	text = text.replace('</em>', '');
				// }

				// while (text.indexOf('<strong>') > -1) {
				// 	text = text.replace('<strong>', '');
				// 	text = text.replace('</strong>', '');
				// }

				// while (text.indexOf('<span ') > -1) {
				// 	text = text.replace(/<[^>]*>/i, '');
				// 	text = text.replace('</span>', '');
				// }

				// while (text.indexOf('&nbsp;') > -1) {
				// 	text = text.replace('&nbsp;', ' ')
				// }

				uni.setClipboardData({
					data: text ? text.trim() : '',

					success(res) {
						uni.getClipboardData({
							success(res) {}

						});
					}

				});
			},

			// 保存素材
			saveMaterial(e) {

				uni.showLoading({
					title: "正在保存至相册",
					mask: true,
				});
				var picList = e.currentTarget.dataset.pic;
				var picLength = picList.length
				for (var i in picList) {
					this.downloadFile({
						url: picList[i],

						success(res) {
							if (res.statusCode === 200) {
								// 保存内容为图片
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function(res) {
										uni.showToast({
											title: '保存成功！',
										});

									},

									fail(res) {
										uni.showToast({
											title: '保存失败！',
											image: '/static/images/icon-close.png'
										});
									},
									complete(res) {
										if (i == picLength - 1) {
											uni.hideLoading();
										}
									}
								});
							}
						}

					});
				}

			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}
	.act-main {
		background: #fff;
		padding: 24rpx;

		.act-btn {
			width: 170rpx;
			height: 60rpx;
			line-height: 60rpx;
			background: #696969;
			border-radius: 30rpx;
		}
	}
	.tab-bar {
		width: 702rpx;
		height: 62rpx;
		background: #F4F4F4;
		border-left: 4rpx solid #F4F4F4;
		border-right: 4rpx solid #F4F4F4;
		border-radius: 14rpx;
		margin: 0 auto 16rpx;
		color: #999999;
		.tab-active {
			width: 227rpx;
			height: 56rpx;
			line-height: 56rpx;
			background: #FFFFFF;
			border-radius: 14rpx;
			color: #333;
			font-weight: bold;
		}
	}
</style>
