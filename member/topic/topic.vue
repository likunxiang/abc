<template>
	<view class="page">
		<common></common>
		<!-- 固定按钮 -->
		<view class="scroll-main-btn" v-if="scroll_btn" :style="{'height':(jianrong=='device_iphone_x'?'163rpx':'98rpx')}">
			<view class="scroll-main-btn-main flex align-center justify-between">
				<navigator url="/pages/index/index" class="text-center">
					<view class="iconfont icon-zhuye fs-40 color-999999"></view>
					<view class="fs-24 color-333333">返回首页</view>
				</navigator>
				<navigator :url="'/member/topicMoreGoods/topicMoreGoods?id=' + correlation_goods_id" class="color-F23005 text-center"
				 v-if="correlation_goods_id">
					<view class="iconfont icon-shouyegouwudaidianjiapp fs-40"></view>
					<view class="fs-24">相关商品</view>
				</navigator>
				<navigator url="/pages/cart/cart" class="text-center">
					<view class="iconfont icon-gwc fs-40 color-999999"></view>
					<view class="fs-24 color-333333">购物车</view>
				</navigator>
				<button open-type="share" class="page-button text-center" v-if="share_title && token" data-type="page_share">
					<view class="iconfont icon-zhuanfa fs-40 color-999999"></view>
					<view class="fs-24 color-333333">一键转发</view>
				</button>
				<view class="page-button text-center" v-else-if="share_title" @click="needLogin">
					<view class="iconfont icon-zhuanfa fs-40 color-999999"></view>
					<view class="fs-24 color-333333">一键转发</view>
				</view>

				<view class="text-center" @click="joinFavorite">
					<view :class="'iconfont icon-love fs-40 ' + (is_favorite?'color-F23005':'color-999999')"></view>
					<view class="fs-24 color-333333">喜欢</view>
				</view>
			</view>
		</view>
		<!-- 固定按钮 -->
		<view class="main bg-white">
			<view class="fs-40 color-333333 ns-text-bold pr" style="margin-bottom: 98rpx;">
				<view class="title-label"></view>
				<view style="text-indent: 45rpx">{{topic_title}}</view>
			</view>

			<view v-for="(item,index) in topic_detail" :key="index">
				<view class="fs-28 color-333333" style="margin-top: 47rpx;line-height: 56rpx;text-align:justify" v-if="item.type == 1">
					<jyf-parser :html="item.content" selectable="true"></jyf-parser>
				</view>
				<!-- 视频 -->
				<video class="video-box" :src="item.content" controls v-if="item.type == 3"></video>
				<!-- <view class="fs-30 color-333333" style="margin-top: 41rpx;">那是李白七岁时，父亲要给儿子起个正式的名字。李白的父母亲酷爱读书。</view> -->
				<view class="goods-content " v-if="item.type == 4 && item.show_type == 1">
					<navigator class="flex mb-24" style="background: #fff;width: 100%;" :url="'/pages/goods/goods?id=' + goods.id" v-for="(goods,goodsIndex) in item.content"
					 :key="goodsIndex">
						<image :src="goods.first_cover_pic" mode="aspectFill" class="goods-content-img flex-grow-0"></image>
						<view class="goods-msg flex-grow-1 flex ns-column justify-between">
							<view class="fs-28 color-333333 ns-text-limit2 ns-text-bold" style="line-height: 42rpx;">{{goods.name}}</view>
							<view class="flex align-end">
								<view class="fs-28 color-FF0200 ns-text-bold">
									<text>￥</text><text class="fs-38">{{filters.priceStr(goods.price)[0]}}</text>.<text class="fs-28">{{filters.priceStr(goods.price)[1]}}</text>
								</view>
								<view style="margin-left: 19rpx;">
									<text class="ns-text-through fs-24 color-999999"> ¥{{goods.original_price}}</text>
								</view>
							</view>
							<view class="flex justify-end">
								<button open-type="share" @tap.stop="stop" data-type='share' :data-pic="goods.first_cover_pic" :data-name="goods.name"
								 :data-id="goods.id" class="transmit">转发</button>
								<view class="add-cart" @tap.stop="openCart" :data-id="goods.id" :data-index="goodsIndex" :data-goodList="item.content">加入购物车</view>
							</view>
						</view>
					</navigator>
				</view>
				<!-- <view class="fs-30 color-333333" style="margin-top: 37rpx;line-height: 50rpx;">
					那是李白七岁时，父亲要给儿子起个正式的名字。李白的父母亲酷爱读书，他们要培养儿子做个高雅脱俗的人。父亲平时喜欢教孩子看书作诗。
				</view> -->

				<view class="img-box" v-if="item.type == 2">
					<image @tap="see_img(pic)" :src="pic" mode="widthFix" style="width: 100%;border-radius: 10rpx;" v-for="(pic,picIndex) in item.content"
					 :key="picIndex"></image>
				</view>

				<!-- <view class="margin-top-40 fs-30 color-333333">
					那是李白七岁时，父亲要给儿子起个正式的名字。
				</view> -->

				<view class="goods-two flex justify-between ns-wrap margin-top-40" v-if="item.type == 4 && item.show_type == 2">
					<navigator v-for="(goods, index) in item.content" :key="index" :url="'/pages/goods/goods?id=' + goods.id" class="goods mb-20 bg-white">
						<view style="width: 333rpx;height: 340rpx;position: relative;">
							<image style="width: 333rpx;height: 340rpx;background: #ccc;border-radius: 20rpx 20rpx 0 0;" mode="aspectFill"
							 :src="goods.first_cover_pic"></image>
						</view>

						<view class="goods-two-msg">
							<view class="fs-28 color-333333 ns-text-limit">
								{{goods.name}}
							</view>
							<view class="fs-28 flex justify-between align-center" style="margin-top: 12rpx;">
								<view class="flex align-center">
									<view class="fs-28 color-FF0200 ns-text-bold">¥ {{goods.price}}
									</view>
									<view class="color-999999 fs-22 ns-text-through ml-16">¥ {{goods.original_price}}</view>
								</view>
								<view class="add-cart-icon fs-26 iconfont color-fff icon-gouwuche_weixuanzhong" style="width: 40rpx;height: 40rpx;line-height: 40rpx;background: #F23005;"
								 @tap.stop="openCart" :data-id="goods.id" :data-index="index" :data-goodList="item.content"></view>

							</view>
						</view>
					</navigator>
				</view>

				<!-- <view class="margin-top-40 fs-30 color-333333">
					最后这边可以有文字，或者没有也可以……
				</view> -->
			</view>


		</view>
		<!-- 按钮 -->
		<view class="main-btn flex align-center justify-between">
			<view class="scroll-main-btn-main flex align-center justify-between">
				<navigator url="/pages/index/index" class="text-center">
					<view class="iconfont icon-zhuye fs-40 color-999999"></view>
					<view class="fs-24 color-333333">返回首页</view>
				</navigator>
				<navigator :url="'/member/topicMoreGoods/topicMoreGoods?id=' + correlation_goods_id" class="color-F23005 text-center"
				 v-if="correlation_goods_id">
					<view class="iconfont icon-shouyegouwudaidianjiapp fs-40"></view>
					<view class="fs-24">相关商品</view>
				</navigator>
				<navigator url="/pages/cart/cart" class="text-center">
					<view class="iconfont icon-gwc fs-40 color-999999"></view>
					<view class="fs-24 color-333333">购物车</view>
				</navigator>
				<button open-type="share" class="page-button text-center" v-if="share_title && token" data-type="page_share">
					<view class="iconfont icon-zhuanfa fs-40 color-999999"></view>
					<view class="fs-24 color-333333">一键转发</view>
				</button>
				<view class="page-button text-center" v-else-if="share_title" @click="needLogin">
					<view class="iconfont icon-zhuanfa fs-40 color-999999"></view>
					<view class="fs-24 color-333333">一键转发</view>
				</view>

				<view class="text-center" @click="joinFavorite">
					<view :class="'iconfont icon-love fs-40 ' + (is_favorite?'color-F23005':'color-999999')"></view>
					<view class="fs-24 color-333333">喜欢</view>
				</view>
			</view>
		</view>

		<!-- 其他推荐 -->
		<view class="plr-24 margin-top-40" v-if="more_topic.length > 0">
			<view class="flex align-center justify-between mb-24">
				<view class="flex align-center">
					<view class="tab-tips"></view>
					<view class="tab-title">话题推荐</view>
				</view>
			</view>
			<topic :item="item" :show_title="true" v-for="(item,index) in more_topic" :key="index" @needLogin="needLogin"></topic>
		</view>

		<!-- 多规格开始 -->
		<block data-src="/components/goods/specifications_model.wxml">
			<view class="attr-picker" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + ' ' + (pageType == 'addMenu'?'bottom: 90rpx':'') + ' ' + (__device=='device_iphone_x'?'bottom: 175rpx':'')"
			 v-if="show_attr_picker" catchtouchmove="preventTouchMove" @tap="hideAttrPicker">
				<scroll-view class="content-box" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + ' ' + (pageType == 'addMenu'?'bottom: 90rpx':'') + ' ' + (__device=='device_iphone_x'?'bottom: 175rpx':'')"
				 @tap.stop="stop">
					<view class="flex-row" style="padding: 24rpx">
						<view class="flex-grow-0">
							<view class="goods-pic-box">
								<block v-if="goods.attr_pic">
									<image @tap="previewImage" :data-url="goods.attr_pic" mode="aspectFill" :src="goods.attr_pic"></image>
								</block>
								<block v-else>
									<image @tap="previewImage" :data-url="goods.first_cover_pic" mode="aspectFill" :src="goods.first_cover_pic"></image>
								</block>
							</view>
						</view>
						<view class="flex-grow-1" style="padding: 0 24rpx">
							<view class="fs-30 color-333333 ns-text-limit2">{{goods.name}}</view>
							<view style class="flex ns-align-items-flex-center mt-20">
								<view class="fs-36 color-FF0100 ns-text-bold">¥ {{goods.price}}</view>
								<view class="flex align-center" v-if="goods.m_price">
									<view class="iconfont icon-ziyuan101 fs-20 vip-icon" style="color: #F5DBAA;"></view>
									<view class="fs-36 color-333333 ns-text-bold">¥ {{goods.m_price}}</view>
								</view>
							</view>
						</view>
						<view class="flex-grow-0">
							<view @tap="hideAttrPicker" class="flex-x-center flex-y-center">
								<view style="width: 30rpx;height: 30rpx;font-size: 30rpx;" class="iconfont icon-guanbi2"></view>
							</view>
						</view>
					</view>
					<view class v-if="role=='shoper' && is_commission">
						<view class="commission-box-cart flex align-end">
							<view class="fs-24 color-333333 flex align-end" v-if="goods.c1">
								<view style="margin-bottom: 4rpx;margin-right: 4rpx;">销售佣金</view>
								<view class="fs-30 color-FF0000 ns-text-bold">¥ {{goods.c1}}</view>
							</view>
							<!-- <view class="fs-24 color-333333 flex align-end" style="margin-left: 57rpx;" v-if="goods.c19">
								<view style="margin-bottom: 4rpx;margin-right: 4rpx;">大亲(赚)</view>
								<view class="fs-30 color-FF0000 ns-text-bold">¥ {{goods.c19}}</view>
							</view> -->
						</view>
					</view>
					<scroll-view scroll-y="true" style="max-height: 650rpx;">
						<view style="padding: 24rpx 28rpx">
							<view>
								<view class="attr-group" v-if="groupNum && !oid">
									<view class="attr-group-name">{{attr_group_num.attr_group_name}}</view>
									<view class="attr-list">
										<text :class="'attr-item ' + (group_checked?'':'active')">{{goods.group_num}}人团</text>
									</view>
								</view>
								<view v-for="(attr_group, groupindex) in attr_group_list" :key="groupindex" class="attr-group" v-if="attr_group.attr_list.length>0">
									<view class="attr-group-name fs-28 color-333333 ns-text-bold">{{attr_group.attr_group_name}}</view>
									<view class="attr-list">
										<text v-for="(item, childindex) in attr_group.attr_list" :key="childindex" :class="'attr-item ' + (item.checked?'active':'') + ' ' + (item.isHave ?'':'attr_num_0')"
										 :data-groupindex="groupindex" :data-childindex="childindex" :data-type="item.isHave?1:0" @tap="storeAttrClick">{{item.attr_name}}</text>
									</view>
								</view>
							</view>
							<view style="height: 0;border-bottom: 1rpx solid #F4F4F4;margin-bottom: 23rpx"></view>
							<!-- 积分商品详情隐藏购买数量 -->
							<block v-if="pageType !== 'INTEGRAL' && pageType!== 'BOOK'">
								<view style="padding-bottom: 40rpx">
									<view class="flex-row flex-y-center mb-20">
										<view class="flex-grow-1 flex">
											<view class="fs-28 color-333333 ns-text-bold">数量</view>
											<view class v-if="goods.buy_max?filters.parseInt(goods.buy_max)!=0:(goods.buy_limit?filters.parseInt(goods.buy_limit)!=0:false)">（限购{{goods.buy_max?goods.buy_max:goods.buy_limit}}件）</view>
										</view>
										<view class="flex-grow-0">

											<view class="flex number-input-box ns-align-items-flex-center">
												<!-- <view style='margin-right:0.01rem;' class="flex-grow-0 flex-x-center flex-y-center number-btn number-sub {{form.number<=1?'disabled':''}}" bindtap="numberSub">-
							                </view> -->
												<view :class="'flex-grow-0 number-btn number-sub iconfont icon-jian ' + (form.number<=1?'disabled':'')"
												 style="margin-top: -6rpx;" @tap="numberSub"></view>
												<view class>
													<input style="padding:0;" class="flex-grow-1 number-input" :value="form.number" type="number" step="1" min="1"
													 @blur="numberBlur"></input>
												</view>
												<view :class="'flex-grow-0 number-btn number-add iconfont icon-jia ' + (form.number>=goods.goods_num?'':'disabled')"
												 style="margin-top: 0rpx;" @tap="numberAdd"></view>
												<!-- <view class="flex-grow-0 flex-x-center flex-y-center number-btn number-add" bindtap="numberAdd">+
							                </view> -->
											</view>
										</view>
									</view>
								</view>
							</block>
							<view class="flex flex-x-center" v-if="pageType == 'group' || !pageType || pageType == 'normal' || pageType == 'addMenu'">
								<view class="edit-standard-btn edit-standard-btn-yellow" @tap="addCart">确认</view>
							</view>
						</view>
					</scroll-view>

				</scroll-view>
			</view>
		</block>
		<!-- 多规格结束 -->
	</view>
</template>

<script>
	import jyfParser from '../../components/jyf-parser/jyf-parser.vue'
	import topic from '@/components/index/topic.vue'
	var gSpecificationsModel = require("../../components/goods/specifications_model.js"); //商城多规格选择
	export default {
		data() {
			return {
				filters: require('../../utils/filters.js'),
				topicList: [],
				mainHegiht: '0', // 主要内容的高度
				mainBtnHegiht: '0', // 按钮高度
				y: uni.getSystemInfoSync().windowHeight,
				scroll_btn: true,
				ht_id: '',
				mrtj_id: '',
				topic_title: '',
				topic_detail: [],
				more_topic: [],
				is_favorite: false,
				correlation_goods_id: '',
				is_get_height: false,
				share_title: '',
				show_attr_picker: false,
				pageType: 'normal',
				form: {
					number: 1
				},
				token: this.getApp().core.getStorageSync('ACCESS_TOKEN') || '',
				jianrong: uni.getStorageSync('jianrong'),
				img_all: [], //所有图片
				mrtj_good_info: {}
			}
		},
		components: {
			topic,
			jyfParser
		},
		onLoad(options) {
			console.log(options);
			this.getApp().page.onLoad(this, options);
			this.ht_id = options.ht_id
			this.mrtj_id = options.id
			this.loadData()
		},
		onShow() {
			gSpecificationsModel.init(this);
		},
		onPageScroll(e) {
			if (this.is_get_height) {

			} else {
				this.getHeight()
			}
			let height = this.mainHegiht + this.mainBtnHegiht - this.y
			// console.log('height', height);
			// console.log(e.scrollTop);
			if (e.scrollTop >= height && this.is_get_height) {
				this.scroll_btn = false
			} else {
				this.scroll_btn = true
			}
		},
		methods: {
			needLogin() {
				console.log(333);
				this.$store.commit('vuexSet', {
					name: 'show_loginTpl',
					value: true
				})
			},
			joinFavorite() {
				this.getApp().request({
					url: this.getApp().api.default.topic_favorite,
					data: {
						id: this.ht_id,
						status: this.is_favorite ? '2' : '1'
					},
					success: (res) => {
						console.log(res);
						if (res.code == 0) {
							this.is_favorite = !this.is_favorite
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					},
				})
			},
			getHeight() {
				this.is_get_height = true
				let mainHeight = uni.createSelectorQuery().select(".main");
				let mainBtnHeight = uni.createSelectorQuery().select(".main-btn");

				mainHeight.fields({
					size: true,
				}, data => {
					console.log("得到节点信息" + JSON.stringify(data));
					console.log("节点的宽为" + data.height);
					this.mainHegiht = data.height
				}).exec();
				mainBtnHeight.fields({
					size: true,
				}, data => {
					console.log("得到节点信息" + JSON.stringify(data));
					console.log("节点的宽为" + data.height);
					this.mainBtnHegiht = data.height
				}).exec();
			},
			loadData() {
				this.getApp().request({
					url: this.getApp().api.default.topic_detail,
					data: {
						ht_id: this.ht_id,
						mrtj_id: this.mrtj_id
					},
					success: (res) => {
						console.log(res);
						if (res.code == 0) {
							this.topic_title = res.data.arr.name
							this.topic_detail = res.data.info
							this.more_topic = res.data.more_ht_data
							this.is_favorite = res.data.collection == 1 ? true : false
							this.correlation_goods_id = res.data.goods_ids || ''
							this.share_title = res.data.mrtj_share_content
							this.mrtj_good_info = res.data.mrtj_good_info
							let arr = [];
							res.data.info.forEach(val => {
								if (val.type == 2) {
									val.content.forEach(val2 => {
										if (val2)
											arr.push(val2);
									})
								}
							})
							this.img_all = arr;
						}
					}
				})
			},
			// 购物车相关
			openCart(e) {
				var id = e.currentTarget.dataset.id;
				var index = e.currentTarget.dataset.index;
				console.log(e.currentTarget.dataset);
				var goods = e.currentTarget.dataset.goodlist[index];
				this.setData({
					show_attr_picker: true,
					goods: goods,
					['form.number']: 1
				});
				this.getGoodsAttr(id);
				gSpecificationsModel.init(this);
			},

			getGoodsAttr: function(id) {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.goods_attr,
					data: {
						id: id,
						from: self.goods.from ? self.goods.from : '1'
					},
					success: function(res) {
						if (res.code == 0) {
							if (res.data.attr[0].num == 0) {
								for (var i in res.data.attr) {
									if (res.data.attr[i].num > 0) {
										res.data.attr[0].total_num = true;
										break;
									}
								}
							}

							self.setData({
								goods_attr: res.data.attr,
								attr_group_list: res.data.attr_group_list
							});

							if (res.data.attr != null && res.data.attr_group_list != null) {
								self.selectDefaultAttr(res.data);
							}
						}
					}
				});
			},
			//加入购物车
			addCart: function() {
				var self = this;
				var token = uni.getStorageSync('ACCESS_TOKEN');

				if (!token) {
					self.setData({
						showGetLogin: true
					});
					this.$store.commit('vuexSet', {
						name: 'show_loginTpl',
						value: true
					})
					return
				}

				this.submit('ADD_CART');
			},
			submit: function(type) {
				var self = this;

				if (self.form.number > self.goods.num) {
					uni.showToast({
						title: "商品库存不足，请选择其它规格或数量",
						icon: 'none'
					});
					return true;
				}

				if (type == 'ADD_CART') {
					//加入购物车
					uni.showLoading({
						title: "正在提交",
						mask: true
					});
					this.getApp().request({
						url: this.getApp().api.cart.add_cart,
						method: "POST",
						data: {
							goods_id: self.goods.id,
							sku: self.goods.sku,
							num: self.form.number,
							from: self.goods.from ? self.goods.from : '1'
						},
						success: function(res) {
							uni.hideLoading();
							uni.showToast({
								title: res.msg,
								duration: 1500,
								icon: 'none'
							});
							self.setData({
								show_attr_picker: false
							});
							self.sendEvent("加入购物车", {
								"商品名称": self.goods.name,
								"商品ID": self.goods.id,
							})
						}
					});
				}
			},
			//预览图片
			see_img(src) {
				console.log(src)
				uni.previewImage({
					current: src,
					urls: this.img_all || src
				})
			}

		},
		onShareAppMessage: function(options) {
			if (options.from == 'button') {
				var type = options.target.dataset.type;
				if (type == 'one_key_share') {
					var mch_id = uni.getStorageSync('_mchInfo').id;
					var user_id = this.getApp().core.getStorageSync('USER_INFO').id;
					var share_title = options.target.dataset.text || '' // 复制内容
					var name = options.target.dataset.name // 标题
					var mrtj_id = options.target.dataset.id
					var ht_id = options.target.dataset.htid
					share_title = share_title.replace(/<(p|div)[^>]*>/gi, '\n').replace(/<br\/?>/gi, '\n').replace(/<[^>/]+>/g, '').replace(
						/(\n)?<\/([^>]+)>/g, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/<\/?(img)[^>]*>/gi, '').replace(
						/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"").replace(
						/<\/?.+?>/g, "")
					if (share_title) {
						this.setClipboardData({
							data: share_title ? share_title.trim() : '',
							success(res) {
								uni.getClipboardData({
									success(res) {

									}
								})
							}
						})
					}

					var img = options.target.dataset.pic
					return {
						title: name,
						path: "/member/topic/topic?ht_id=" + ht_id + "&id=" + mrtj_id + "&user_id=" + user_id + "&mch_id=" +
							mch_id,
						imageUrl: img
					};
				} else if (type == 'share') {
					var mch_id = uni.getStorageSync('_mchInfo').id;
					var user_id = this.getApp().core.getStorageSync('USER_INFO').id;
					var share_title = options.target.dataset.name
					var id = options.target.dataset.id
					var img = options.target.dataset.pic
					return {
						title: share_title,
						path: "/pages/goods/goods?id=" + id + "&user_id=" + user_id + "&mch_id=" +
							mch_id,
						imageUrl: img
					};
				} else if (type == 'page_share') {
					var mch_id = uni.getStorageSync('_mchInfo').id;
					var user_id = this.getApp().core.getStorageSync('USER_INFO').id;
					var share_title = this.share_title || '' // 复制内容
					var name = this.topic_title || ''
					if (this.mrtj_good_info.share_card_name.length > 0) {
						name = this.mrtj_good_info.share_card_name
					}
					share_title = share_title.replace(/<(p|div)[^>]*>/gi, '\n').replace(/<br\/?>/gi, '\n').replace(/<[^>/]+>/g, '').replace(
						/(\n)?<\/([^>]+)>/g, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/<\/?(img)[^>]*>/gi, '').replace(
						/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"").replace(
						/<\/?.+?>/g, "")
					// console.log('shr',share_title)
					if (share_title) {
						this.setClipboardData({
							data: share_title ? share_title.trim() : '',
							success(res) {
								uni.getClipboardData({
									success(res) {

									}
								})
							}
						})
					}
					return {
						path: "/member/topic/topic?ht_id=" + this.ht_id + "&id=" + this.mrtj_id + "&user_id=" + user_id + "&mch_id=" +
							mch_id,
						title: name,
					};
				}
			} else {
				var user_info = this.getApp().getUser();
				var mch_info = uni.getStorageSync('_mchInfo');
				var name = this.topic_title || ''
				if (this.mrtj_good_info.share_card_name.length > 0) {
					name = this.mrtj_good_info.share_card_name
				}
				name = name.replace(/<(p|div)[^>]*>/gi, '\n').replace(/<br\/?>/gi, '\n').replace(/<[^>/]+>/g, '').replace(
					/(\n)?<\/([^>]+)>/g, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/<\/?(img)[^>]*>/gi, '').replace(
					/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"").replace(
					/<\/?.+?>/g, "")
				return {
					path: "/member/topic/topic?ht_id=" + this.ht_id + "&id=" + this.mrtj_id + "&user_id=" + user_info.id + "&mch_id=" +
						mch_info.id,
					title: name,
				};
			}


		},
		// 分享到朋友圈
		onShareTimeline(e) {
			var user_info = this.getApp().getUser();
			var mch_info = uni.getStorageSync('_mchInfo');
			return {
				path: "/member/topic/topic?ht_id=" + this.ht_id + "&id=" + this.mrtj_id + "&user_id=" + user_info.id + "&mch_id=" +
					mch_info.id,
				title: '话题分享到朋友圈',
			};
		}
	}
</script>

<style>
	@import url("~@/components/goods/specifications_model.css");

	.margin-top-40 {
		margin-top: 40rpx;
	}

	page {
		background: #F4F4F4;
	}

	.page {
		min-height: 100%;

	}

	.scroll-main-btn {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		background: #FFFFFF;
		z-index: 1;
	}

	.scroll-main-btn-main {
		width: 750rpx;
		height: 98rpx;
		padding: 0 24rpx;
	}

	.main {
		padding: 39rpx 36rpx 51rpx;
		padding-bottom: 98rpx;
	}

	.video-box {
		width: 702rpx;
		height: 400rpx;
		border-radius: 10rpx;
		margin-top: 54rpx;
	}

	.goods-content {
		border-radius: 10rpx;
		margin-top: 54rpx;
		box-shadow: 0rpx 0rpx 10rpx 6rpx rgba(190, 190, 190, .3);
	}

	.goods-content-img {
		width: 250rpx;
		height: 250rpx;
		border-radius: 8rpx 0px 0px 8rpx;
	}

	.goods-msg {
		padding: 20rpx 24rpx;
	}

	.transmit {
		width: 123rpx;
		height: 53rpx;
		border: 1rpx solid #F23005;
		line-height: 51rpx;
		text-align: center;
		border-radius: 26rpx;
		color: #F23005;
		font-size: 24rpx;
		background-color: #fff;
		margin-left: 0;
		margin-right: 0rpx;
	}

	.add-cart {
		width: 168rpx;
		height: 52rpx;
		background: #F23005;
		box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(242, 48, 5, 0.36);
		border-radius: 26rpx;
		line-height: 52rpx;
		text-align: center;
		border-radius: 26rpx;
		color: #fff;
		font-size: 24rpx;
		margin-left: 20rpx;
	}

	.img-box {
		width: 100%;
		margin-top: 54rpx;
	}

	.goods-two {}

	.goods {
		width: 333rpx;
		background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0rpx 0rpx 10rpx 6rpx rgba(190, 190, 190, .4);
	}

	.goods-two-msg {
		padding: 20rpx 16rpx;
	}

	.main-btn {
		width: 750rpx;
		height: 98rpx;
		background: #FFFFFF;
		border-top: 1px solid rgba(190, 190, 190, .3)
	}

	.page-button {
		line-height: 1.15;
		padding: 0;
		background-color: transparent;
		margin-left: 0;
		margin-right: 0;
	}

	.title-label {
		position: absolute;
		left: 0rpx;
		top: 14rpx;
		width: 28rpx;
		height: 28rpx;
		border: 8rpx solid #F23005;
		border-radius: 50%;
	}
</style>
