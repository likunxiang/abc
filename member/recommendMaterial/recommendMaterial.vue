<template>
	<view>
		<!--member/recommendMaterial/recommendMaterial.wxml-->
		<block data-src="/components/share/share.wxml">
			<view :class="'share-modal ' + share_modal_active + ' ' + __device" catchtouchmove="true" @tap="shareModalClose"
			 v-if="true">
				<view :class="'share-modal-body ' + __device" @tap.stop="stop">
					<text class="close pa iconfont icon-guanbi2" @tap="shareModalClose"></text>
					<!-- <view class="shareGet">分享赚 <span>¥ 65</span></view>
		        <view class="tips">收益仅自己可见</view> -->
					<view class="flex-row">
						<view class="flex-grow-1 flex-x-center">
							<button open-type="share" class="share-bottom" style="height:100%;">
								<text class="iconfont icon-weixin color-fff" style="font-size: 50rpx;"></text>
								<view>分享给好友</view>
							</button>
						</view>
						<view class="flex-grow-1 flex-x-center">
							<view @tap="getGoodsQrcode" class="share-bottom">
								<text class="iconfont icon-pengyouquan color-fff" style="font-size: 50rpx;"></text>
								<view>生成商品海报</view>
							</view>
						</view>
					</view>
					<!-- <view bindtap="shareModalClose" class="share-modal-close flex-y-center flex-x-center">关闭</view> -->
				</view>
			</view>

			<!-- 生成海报 -->
			<view :class="'goods-qrcode-modal ' + goods_qrcode_active + ' flex-y-center'" catchtouchmove="true" @tap="goodsQrcodeClose"
			 v-if="share_type == 'code'">
				<view class="goods-qrcode-body flex-col" @tap.stop="stop">
					<view class="flex-grow-1" style="position: relative">
						<view style="position: absolute;left: 0;top:0;width: 100%;height: 100%;">
							<view class="goods-qrcode-box">
								<view class="goods-qrcode-loading flex-x-center flex-y-center" v-if="!goods_qrcode">
									<view class="flex-x-center flex-col">
										<image style="width: 150rpx;height: 150rpx" :src="__wxapp_img.system.loading2.url"></image>
										<view style="color: #888">海报生成中</view>
									</view>
								</view>
								<image @tap="goodsQrcodeClick" mode="aspectFill" :class="'goods-qrcode ' + (goods_qrcode?'active':'')"
								 :data-src="goods_qrcode" :src="goods_qrcode"></image>
							</view>
						</view>
					</view>
					<view class="flex-grow-0 flex-col flex-x-center" style="padding-top: 50rpx;">
						<view>
							<button v-if="goods_qrcode" @tap="saveGoodsQrcode" class="share-btn">保存图片</button>
							<button v-else style="opacity: .4">保存图片</button>
						</view>
					</view>
					<view class="goods-qrcode-close" @tap="goodsQrcodeClose">
						<image :src="__wxapp_img.store.close2.url" style="width: 40rpx;height: 40rpx;display: block"></image>
					</view>
				</view>
			</view>
		</block>
		<view class="page pr">
			<view class="footer flex justify-between">
				<button class="footer-btn" @tap="getGoodsQrcode">生成{{materialInfo[0].out_type == 1? '商品':'活动'}}海报</button>
				<button class="footer-btn footer-btn-link" open-type="share">转发{{materialInfo[0].out_type == 1? '商品':'活动'}}链接</button>
			</view>
			<view class="act-list">
				<view v-for="(item, id) in materialInfo" :key="id">
					<view class="act-main mb-10" v-for="(mate, id) in item.infoCircleMat" :key="id">
						<view class="mr-24 flex align-center">
							<image style="width: 90rpx;height: 90rpx;border-radius: 50%;border: 1rpx solid #BEBEBE;" mode="aspectFit" :src="item.brand_img"></image>
							<view class="flex justify-between ml-20">
								<view class="fs-30 color-333333 ns-text-bold">{{item.brand_name}}</view>
							</view>
						</view>

						<view class="flex1">

							<view class="mt-20 fs-26 color-333333" style="line-height: 40rpx;">
								<rich-text :nodes="mate.content"></rich-text>
							</view>
							<block v-if="mate.type==1">
								<view class="mt-20">
									<image @tap="previewPic" :data-pics="mate.cover_pic" :data-pic="pic" :style="'width: 226rpx;height: 226rpx;margin-bottom: 12rpx;' + (index==2||index==5||index==8?'':'margin-right: 12rpx;') + (mate.cover_pic.length==4?'margin-right: 12rpx;':'')"
									 v-for="(pic, index) in mate.cover_pic" :key="index" :src="pic" mode="aspectFit"></image>
								</view>
							</block>
							<block v-if="mate.type==2">
								<view class="act-video mt-20 pr">
									<!-- <image class="act-video" mode="aspectFit"></image> -->
									<video class="act-video" :src="mate.sp_content"></video>
									<!-- <view class="act-video-icon iconfont icon-bofang"></view> -->
								</view>
							</block>
							<block v-if="mate.type==3">
								<view class="mt-20">
									<image @tap="previewPic" :data-pics="mate.cover_pic" :data-pic="pic" :style="'width: 226rpx;height: 226rpx;margin-bottom: 12rpx;' + (index==2||index==5||index==8?'':'margin-right: 12rpx;') + (mate.cover_pic.length==4?'margin-right: 12rpx;':'')"
									 v-for="(pic, index) in mate.cover_pic" :key="index" :src="pic" mode="aspectFit"></image>
									 <video :src="mate.sp_content" :style="'width: 226rpx;height: 226rpx;margin-bottom: 12rpx;' + (index==2||index==5||index==8?'':'margin-right: 12rpx;') + (mate.cover_pic.length==4?'margin-right: 12rpx;':'')"></video>
								</view>
							</block>
							<view class="mt-20 link-box flex" v-if="mate.goods_id>0">
								<view class="flex-grow-0">
									<image style="width: 128rpx;height: 128rpx;" mode="aspectFit" :src="mate.goods_data.first_cover_pic"></image>
								</view>
								<view class="flex-grow-1" style="margin-left: 31rpx;">
									<view class="fs-26 color-333333 ns-text-bold">{{mate.goods_data.name}}</view>
									<view class="flex justify-between align-center">
										<view class="ns-text-bold flex mt-20">
											<view class="fs-36 color-FF0200">¥ {{mate.goods_data?mate.goods_data.price : '0.00'}}</view>
											<view class="fs-26 color-999999 ml-20 ns-text-through" style="margin-top: 13rpx;">¥
												{{mate.goods_data.original_price}}</view>
										</view>
										<navigator hover-class="none" :url="'/pages/goods/goods?id=' + mate.goods_data.id" class="fs-26 mt-20" style="color: #15A3FF;">
											<text>查看详情</text>
											<text class="iconfont icon-gengduo fs-24 ml-10"></text>
										</navigator>
									</view>
								</view>
							</view>
							<!-- <block wx:if="{{item.goods_id}}">
						<view class="act-banner mt-20">
							<image class="act-banner" mode="aspectFit"></image>
						</view>
					</block> -->
							<!-- 按钮 -->
							<view class="mt-24 flex justify-end">
								<view class="act-btn text-center color-fff mr-24" @tap="saveMaterial" :data-type="mate.type" :data-pic="mate.cover_pic"
								 :data-video="mate.sp_content" v-if="mate.sp_content || mate.cover_pic.length>0">
									<text class="iconfont icon-xiazai1 fs-24" style="margin-right: 8rpx;"></text>
									<text class="fs-24">下载素材</text>
								</view>
								<view class="act-btn text-center color-fff" @tap="copyText" :data-text="mate.content" v-if="mate.content">
									<text class="iconfont icon-fuzhi1 fs-24" style="margin-right: 6rpx;"></text>
									<text class="fs-24">复制文字</text>
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	// member/recommendMaterial/recommendMaterial.js
	var shareWay = require("../../components/share/share.js");

	export default {
		data() {
			return {
				pageType: 'normal',
				share_type: 'code',
				id: "",
				materialInfo: "",
				goods_qrcode_active: "",
				share_modal_active: "",
				goods_qrcode: "",
				goodListMsg: "",
				end_date: "",
				start_data: ""
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			shareWay.init(this);
			this.setData({
				id: options.id
			});
			this.getData();
		},
		// getQrcode() {
		// 	var self = this
		// 	var list = self.data.brand.min_goods_info
		// 	var activityMsg = self.data.brand
		// 	var activity_name = activityMsg.name
		// 	var imgUrl = list.first_cover_pic
		// 	var tmpprice = list.price
		// 	// 结束时间获取
		// 	var data = {
		// 		goods_pic: imgUrl,
		// 		act_name: activity_name,
		// 		price_str: tmpprice,
		// 		activity: self.data.brand_id,
		// 		page_url: 'pages/brand/brand',
		// 		sidFsShare: 1
		// 	}
		// 	getApp().request({
		// 		url: getApp().api.default.activity_qrcode,
		// 		data: data,
		// 		success: function(res) {
		// 			if (res.code == 0) {
		// 				self.setData({
		// 					goods_qrcode: res.data.pic_url
		// 				})
		// 			}
		// 		}
		// 	})
		// },

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function(res) {
			var self = this;
			var user_info = this.getApp().core.getStorageSync(this.getApp().const.USER_INFO);
			var mch_id = uni.getStorageSync('_mchInfo').id;

			if (self.materialInfo[0].out_type == 1) {
				var goodsSharePic = self.sharePic
				var res = {
					path: "/pages/goods/goods?id=" + self.materialInfo[0].out_id + "&user_id=" + user_info.id + "&mch_id=" + mch_id,
					title: self.goods.name,
					imageUrl: goodsSharePic
				};
			} else {
				var actSharePic = uni.getStorageSync('_img').yhhd_dnlq
				var res = {
					path: "/pages/activity/activity?aid=" + self.materialInfo[0].out_id + "&user_id=" + user_info.id + "&mch_id=" +
						mch_id,
					title: self.goodListMsg.name + ' 全场¥' + self.goodListMsg.min_goods_info.price + '起',
					imageUrl: actSharePic
				};
			}

			return res;
		},
		methods: {
			getData() {
				this.getApp().request({
					url: this.getApp().api.default.get_material,
					data: {
						id: this.id
					},
					success: res => {
						if (res.code == 0) {
							this.setData({
								materialInfo: res.data
							});
							var type = res.data[0].out_type;

							if (type == 2) {
								this.loadData();
							} else {
								this.getGoods()
							}
						}
					}
				});
			},
			previewPic(e) {
				var picList = e.currentTarget.dataset.pics
				var pic = e.currentTarget.dataset.pic
				uni.previewImage({
					urls: picList,
					current: pic
				})
			},
			stop() {
				return
			},
			// 复制文字
			copyText: function(e) {
				var text = e.currentTarget.dataset.text;
				text = text.replace(/<(p|div)[^>]*>/gi, '\n').replace(/<br\/?>/gi, '\n').replace(/<[^>/]+>/g, '').replace(
					/(\n)?<\/([^>]+)>/g, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/<\/?(img)[^>]*>/gi, '').replace(
					/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"").replace(
					/<\/?.+?>/g, "")


				// text = text.replace(/<[^>]+>|&[^>]+;/g, '')
				// console.log(text);
				// while (text.indexOf('<p ') > -1) {
				// 	text = text.replace('<p ', '');
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
				// 	text = text.replace('<span ', '');
				// 	text = text.replace('</span>', '');
				// }

				// while (text.indexOf('&nbsp;') > -1) {
				// 	text = text.replace('&nbsp;', ' ')
				// }

				uni.setClipboardData({
					data: text,

					success(res) {
						uni.getClipboardData({
							success(res) {}

						});
					}

				});
			},

			// 保存素材
			saveMaterial(e) {
				var type = e.currentTarget.dataset.type;
				uni.showLoading({
					title: "正在保存至相册",
					mask: true,
				});
				if (type == 1 || type == 3) {
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
											// uni.showToast({
											// 	title: '保存成功！',
											// 	icon: 'none'
											// });

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
				}

				if (type == 2 || type == 3) {
					var video = e.currentTarget.dataset.video;
					this.downloadFile({
						url: video,
						success(res) {
							if (res.statusCode === 200) {
								// 保存内容为图片
								uni.saveVideoToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function(res) {
										uni.showToast({
											title: '保存成功！',
											icon: 'none'
										});
									},

									fail(res) {
										uni.showToast({
											title: '保存失败！',
											icon: 'none'
										});
									}

								});
							}
						},

						fail(res) {
							console.log('失败',res);
						},
						complete(res) {
						}

					});
				}
			},
			getGoods: function() {

				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.goods,
					data: {
						id: self.materialInfo[0].out_id,
						from: self.from || 1
					},
					success: function(res) {
						if (res.code == 0) {

							var goods = res.data;
							self.setData({
								goods: goods,
								goods_attr: res.data.attr,
								attr_group_list: res.data.attr_group_list,
								btn: true
							});
							self.getGoodsAttr();
							self.getSharePic()
						}

						if (res.code == 1) {
							uni.showModal({
								title: "提示",
								content: res.msg,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.navigateBack({
											delta: 1
										});
									}
								}
							});
						}
					}
				});
			},
			getGoodsAttr: function() {

				var self = this;

				this.getApp().request({
					url: this.getApp().api.default.goods_attr,
					data: {
						id: self.materialInfo[0].out_id,
						from: self.from || 1,
						address_id: self.address_id || ''
					},
					success: (res) => {
						if (res.code == 0) {

							var goods_attr = res.data.attr

							if (goods_attr[0].m_price) {
								self.goods.price = goods_attr[0].m_price;
							} else {
								self.goods.price = goods_attr[0].price;
							}
							self.goods.original_price = goods_attr[0].va;
						}
					}
				});
			},
			// 获取商品类型分享图片
			getSharePic: function() {
				var self = this;
				var goods = self.goods
				uni.showLoading({
					title: '加载中'
				})
				self.getApp().request({
					url: self.getApp().api.default.get_share_pic,
					data: {
						attr_pic: goods.first_cover_pic,
						price: goods.original_price,
						sale_price: goods.m_price ? goods.m_price : goods.price,
						id: goods.id,
						route_type: 'goods'
					},
					success: function(res) {
						if (res.code == 0) {
							uni.hideLoading()
							self.setData({
								sharePic: res.data.pic_url
							})
						}
						if (res.code == 1) {
							uni.hideLoading()
							uni.showToast({
								title: '卡片图片获取失败，请稍后再试',
								duration: 2500,
								icon: 'none'
							})
							self.setData({
								is_commission: true
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
						self.setData({
							is_commission: true
						})
					}
				})
			},

			getGoodsQrcode: function() {
				var self = this;
				self.setData({
					goods_qrcode_active: "active",
					share_modal_active: ""
				});

				if (self.goods_qrcode) {
					return true;
				}

				if (self.materialInfo[0].out_type == 1) {
					this.getQrcodeGoods();
				} else {
					this.getQrcode();
				}
			},

			getQrcodeGoods() {
				var self = this;
				var data = {
					goods_id: self.materialInfo[0].out_id,
					sidFsShare: 1
				};
				this.getApp().request({
					url: this.getApp().api.default.goods_qrcode,
					data: data,
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								goods_qrcode: res.data.pic_url
							});
						}

						if (res.code == 1) {
							self.goodsQrcodeClose();
							uni.showModal({
								title: "提示",
								content: res.msg,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {}
								}
							});
						}
					}
				});
			},

			getQrcode: function() {
				var self = this;
				var list = self.goodListMsg.min_goods_info;
				var activityMsg = self.goodListMsg;
				var activity_name = activityMsg.name;
				var imgUrl = self.actQrcode;
				var tmpprice = list.price; // 手机适配

				var rpx = self.x / 375; // 结束时间获取

				var endTime = new Date(self.end_date * 1000);
				var month = endTime.getMonth() + 1;

				if (month < 10) {
					month = '0' + month;
				}

				var d = endTime.getDate();

				if (d < 10) {
					d = '0' + d;
				}

				var h = endTime.getHours();

				if (h < 10) {
					h = '0' + h;
				}

				var m = endTime.getMinutes();

				if (m < 10) {
					m = '0' + m;
				}

				var show_end_time = month + '月' + d + '日' + '  ' + h + ':' + m + '结束';
				var data = {
					goods_pic: imgUrl,
					act_name: activity_name,
					price_str: tmpprice,
					end_date: show_end_time,
					activity: self.materialInfo[0].out_id,
					sidFsShare: 1
				};
				this.getApp().request({
					url: this.getApp().api.default.activity_qrcode,
					data: data,
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								goods_qrcode: res.data.pic_url
							});
						}
					}
				});
			},
			loadData: function(options) {
				self = this;
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.active_list,
					data: {
						aid: self.materialInfo[0].out_id
					},
					success: function(res) {
						uni.hideLoading();

						if (res.code == 0) {
							var goodList = res.data.page.goods
							var actPic = []
							for (let i in goodList) {
								if (i < 9) {
									actPic.push(goodList[i].first_cover_pic)
								} else {
									break
								}
							}
							self.setData({
								goodListMsg: res.data.activity,
								actQrcode: actPic.toString(),
								end_date: res.data.activity.end_date,
								start_data: res.data.activity.start_date
							}); // var objKeys=Object.keys(catsArr);
							// console.log(objKeys.length);
							// var arr = []
							// for (var i=0;i<objKeys.length;i++) {
							// 	arr.id = 
							// }
							// uni.setNavigationBarTitle({
							// 	title: res.data.activity.name
							// })
						}

						if (res.code == 1) {
							uni.showModal({
								content: res.msg,
								icon: 'none',
								complete: function() {
									uni.redirectTo({
										url: '/pages/index/index'
									});
								}
							});
						}
					}
				});
			}
		}
	};
</script>
<style>
	@import "./recommendMaterial.css";
</style>
