<template>
	<view class="main">
		<view class="attr-picker" v-if="show_attr_picker" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + ' ' + (pageType == 'addMenu'?'bottom: 90rpx':'') + ' ' + (jianrong=='device_iphone_x'?'bottom: 175rpx':'')"
		 catchtouchmove="preventTouchMove" @tap="hideAttrPicker">
			<scroll-view class="content-box" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + ' ' + (pageType == 'addMenu'?'bottom: 90rpx':'') + ' ' + (jianrong=='device_iphone_x'?'bottom: 175rpx':'')"
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
						<block v-if="pageType === 'PINTUAN'">
							<!-- <view style="font-size: 40rpx;" class="flex color-FF0200">
							<view class="">¥ <text style="font-size: 60rpx;">{{filters.priceStr(goods.price)[0]}}.</text><text>{{filters.priceStr(goods.price)[1]}}</text></view>
						</view> -->
							<view class="fs-36 color-FF0100 ns-text-bold mt-20">{{goods.price}}</view>
						</block>
						<block v-else>
							<view style class="flex ns-align-items-flex-center mt-20">
								<view class="fs-36 color-FF0100 ns-text-bold">¥ {{goods.price}}</view>
								<view class="flex align-center" v-if="goods.m_price">
									<view class="iconfont icon-ziyuan101 fs-20 vip-icon" style="color: #F5DBAA;"></view>
									<view class="fs-36 color-333333 ns-text-bold">¥ {{goods.m_price}}</view>
								</view>
							</view>
						</block>
						<!-- <view class="fs-24 color-333333">已选：红色 ，L码：一件</view> -->
						<!-- <view style="font-size:9pt">
						库存{{goods.num}}
					</view> -->
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
									<!--删除了 bindtap="groupCheck" -->
									<text :class="'attr-item ' + (group_checked?'':'active')">{{goods.group_num}}人团</text>
									<!-- <text class="attr-item {{item.checked?'active':''}}" wx:if="{{attr_group_num.attr_list.length>0}}" wx:for="{{attr_group_num.attr_list}}" wx:key="{{item.id}}" data-id="{{item.id}}" bindtap="attrNumClick">{{item.group_num}}人团
		                        </text> -->
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
										<view :class="'flex-grow-0 number-btn number-sub iconfont icon-jian ' + (form.number<=1?'disabled':'')" style="margin-top: -6rpx;"
										 @tap="numberSub"></view>
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
						<block v-if="false">
							<view class="fs-28 color-333333 ns-text-bold">保障服务</view>
							<view style="margin-top: 24rpx;">
								<view class="flex align-center">
									<view></view>
									<view class="fs-24 color-333333">全面保障</view>
								</view>
								<view class="flex justify-between mb-20" style="padding-left: 33rpx;padding-top: 22rpx;">
									<view class="flex">
										<view class="iconfont icon-weixuanzhong color-FF0200 fs-30"></view>
										<view class="fs-24 ml-10">
											<view class="color-333333">次年电池换新</view>
											<view class="color-999999 mt-10">容量续航问题免费换原厂电池</view>
										</view>
									</view>
									<view class="fs-24 color-FF0200">¥9.90</view>
								</view>
								<view class="flex justify-between" style="padding-left: 33rpx;padding-top: 22rpx;">
									<view class="flex">
										<view class="iconfont icon-xuanzhong color-FF0200 fs-30"></view>
										<view class="fs-24 ml-10">
											<view class="color-333333">次年电池换新</view>
											<view class="color-999999 mt-10">容量续航问题免费换原厂电池</view>
										</view>
									</view>
									<view class="fs-24 color-FF0200">¥9.90</view>
								</view>
							</view>
							<view style="margin-top: 24rpx;">
								<view class="flex align-center">
									<view></view>
									<view class="fs-24 color-333333">全面保障</view>
								</view>
								<view class="flex justify-between mb-20" style="padding-left: 33rpx;padding-top: 22rpx;">
									<view class="flex">
										<view class="iconfont icon-weixuanzhong color-FF0200 fs-30"></view>
										<view class="fs-24 ml-10">
											<view class="color-333333">次年电池换新</view>
											<view class="color-999999 mt-10">容量续航问题免费换原厂电池</view>
										</view>
									</view>
									<view class="fs-24 color-FF0200">¥9.90</view>
								</view>
								<view class="flex justify-between" style="padding-left: 33rpx;padding-top: 22rpx;">
									<view class="flex">
										<view class="iconfont icon-weixuanzhong color-FF0200 fs-30"></view>
										<view class="fs-24 ml-10">
											<view class="color-333333">次年电池换新</view>
											<view class="color-999999 mt-10">容量续航问题免费换原厂电池</view>
										</view>
									</view>
									<view class="fs-24 color-FF0200">¥9.90</view>
								</view>
							</view>
						</block>
						<view class="flex flex-x-center" v-if="pageType == 'cart'">
							<navigator :url="'/pages/goods/goods?id=' + goods_id + '&from=' + from" class="edit-standard-btn mr-20">查看详情</navigator>
							<view class="edit-standard-btn edit-standard-btn-yellow" @tap="saveEditStandard">确认</view>
						</view>
						<view class="flex flex-x-center" v-if="pageType == 'private'">
							<view class="edit-standard-btn" @tap="saveEditStandard">确认</view>
						</view>
						<view class="flex flex-x-center" v-if="pageType == 'group' || !pageType || pageType == 'normal' || pageType == 'addMenu'">
							<view class="edit-standard-btn edit-standard-btn-yellow" @tap="addCart">确认</view>
						</view>
					</view>
				</scroll-view>

			</scroll-view>
		</view>
		<!-- 产品参数 -->
		<view class="attr-picker " :style="__device=='device_iphone_x'?'bottom: 175rpx':''" v-if="isParameter" catchtouchmove="preventTouchMove"
		 @tap="closeParameter">
			<view @tap.stop="stop" class="content-box" :style="'padding:32rpx 24rpx 0;border-radius:30rpx 30rpx 0px 0px;' + (__device=='device_iphone_x'?'bottom: 175rpx':'')">
				<view class="flex-x-center fs-38 color-333333 mb-30">产品参数</view>
				<scroll-view scroll-y="true" style="max-height: 500rpx;">
					<view v-for="(item, index) in goods.param_json" :key="index" class="parameter-list flex fs-30">
						<view class="color-999999" style="width: 246rpx;">{{item.name}}</view>
						<view class="color-333333">{{item.value}}</view>
					</view>
				</scroll-view>
				<view class="save-btn" @tap="closeParameter">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				role: uni.getStorageSync('role'),
				filters: require('../../utils/filters.js'),
				jianrong: uni.getStorageSync('jianrong')
			}
		},
		props: {
			pageType: {
				type: String,
				default: 'STORE'
			},
			goods: {
				type: Object,
				default: () => {
					return {}
				}
			},
			goods_attr: {
				type: Array,
				default: () => {
					return {}
				}
			},
			attr_group_list: {
				type: Object,
				default: () => {
					return {}
				}
			},
			form: {
				type: Object,
				default: () => {
					return {}
				}
			},
			show_attr_picker: {
				type: Boolean,
				default: false
			}

		},
		computed: {
			is_commission() {
				return this.$store.state.show_commission
			}
		},
		mounted() {
			this.selectDefaultAttr()
		},
		methods: {
			stop() {
				return
			},
			previewImage: function(e) {
				// TODO 商城的路径不是这个
				var urls = e.currentTarget.dataset.url;
				// uni.previewImage({
				// 	urls: [urls]
				// });
				let arr = [];
				let data = this.goods_attr || [];
				data.forEach(val => {
					if (val.pic) {
						arr.push(val.pic);
					}
				})
				uni.previewImage({
					current: urls,
					urls: arr.length > 0 ? arr : [urls]
				});
			},
			/**
			 * 隐藏规格选择框
			 */
			hideAttrPicker: function() {
				this.$emit('hideAttrPicker');
			},
			/**
			 * 无规格、默认选中
			 */
			selectDefaultAttr: function() {
				var goods_attr = this.goods_attr;
				var attr_group_list = this.attr_group_list; //、、获取默认选中的索引 ['属性1','属性2',...]

				let defaultarr = this.getDefaule(goods_attr);

				for (var i in attr_group_list) {
					for (var j in attr_group_list[i].attr_list) {
						// if(j == 0){
						// 	attr_group_list[i].attr_list[j]['checked'] = true;
						// }
						if (defaultarr.indexOf(attr_group_list[i].attr_list[j].attr_name) != -1) {
							attr_group_list[i].attr_list[j]['checked'] = true;
						}
					}
				}

				attr_group_list = this.isHave(attr_group_list, goods_attr); ///////////////

				let goods = this.goods;

				////////获取首次选择的商品下标
				let default_index = 0;
				default_index = this.get_index(attr_group_list, goods_attr);
				////////获取首次选择的商品下标
				goods.attr_pic = goods_attr[default_index].pic;
				goods.num = goods_attr[default_index].num;

				if (this.form.number && this.form.number > goods.num) {
					this.PAGE().form.number = goods.num

					if (goods.num == 0) {
						this.PAGE().form.number = 1
					}
				}

				if (goods_attr[default_index].m_price) {
					goods.m_price = goods_attr[default_index].m_price;
				}

				goods.c1 = goods_attr[default_index].c1;
				goods.c19 = goods_attr[default_index].c19;
				goods.sku = goods_attr[default_index].sku;
				if (this.pageType || this.pageType != 'normal') {
					goods.attr_list = goods_attr[default_index].attr_list;
				}

				goods.original_price = goods_attr[default_index].va;

				if (this.pageType == 'normal' && goods_attr[default_index].m_price) {
					goods.price = goods_attr[default_index].m_price;
				} else {
					goods.price = goods_attr[default_index].price;
				}

				this.PAGE().goods = goods
				this.PAGE().attr_group_list = attr_group_list
				this.PAGE().getJDSend()
			},
			storeAttrClick: function(e) {

				if (e.target.dataset.type == 0)
					return 0;

				var self = this;
				var pageType = self.pageType;

				var _this = this;

				var groupindex = e.target.dataset.groupindex;
				var childindex = e.target.dataset.childindex;
				var attr_group_list = self.attr_group_list;

				if (self.form.number) {
					var goodsNum = self.form.number;
				}


				for (var i in attr_group_list) {
					if (i != groupindex) continue;

					for (var j in attr_group_list[i].attr_list) {
						if (j == childindex) {
							attr_group_list[i].attr_list[j].checked = !attr_group_list[i].attr_list[j].checked;
						} else {
							attr_group_list[i].attr_list[j].checked = false;
						}
					} ////////

					//console.log('----')
					var goods_attr = self.goods_attr;
					this.isHave(attr_group_list, goods_attr); ////
					//console.log(attr_group_list)
					self.PAGE().attr_group_list = JSON.parse(JSON.stringify(attr_group_list))
					var checked_attr_list = [];

					for (var i in attr_group_list) {
						var attr = false;

						for (var j in attr_group_list[i].attr_list) {
							if (attr_group_list[i].attr_list[j].checked) {
								attr = {
									attr_name: attr_group_list[i].attr_list[j].attr_name
								};
								break;
							}
						}

						checked_attr_list.push({
							attr_group_name: attr_group_list[i].attr_group_name,
							attr_name: attr.attr_name
						});
					}

					var attrTemp = self.goods_attr;
					let length = checked_attr_list.length;

					for (var i in attrTemp) {
						var tempnum = 0;

						for (var j in checked_attr_list) {
							if (checked_attr_list[j].attr_name != attrTemp[i].attr_list[j].attr_name) {
								break;
							} else {
								tempnum++;
							}
						}

						if (tempnum == length) {
							let goods = self.goods;

							if (self.goods_attr[i].pic) {
								goods.attr_pic = self.goods_attr[i].pic;
							}

							goods.num = self.goods_attr[i].num;

							if (goodsNum && goodsNum > goods.num) {
								goodsNum = goods.num;

								if (goods.num == 0) {
									self.PAGE().from.number = 1
								} else {
									self.PAGE().from.number = goodsNum
								}
							}

							if (self.goods_attr[i].m_price) {
								goods.m_price = self.goods_attr[i].m_price;
							}

							goods.attr_list = self.goods_attr[i].attr_list;
							goods.c1 = self.goods_attr[i].c1;
							goods.c19 = self.goods_attr[i].c19;
							goods.sku = self.goods_attr[i].sku;
							goods.original_price = self.goods_attr[i].va;
							goods.param_json = self.goods_attr[i].param_json;

							if (self.goods.num == 0) {
								uni.showToast({
									title: '库存不足',
									icon: 'none'
								});
								return;
							}

							if (self.pageType == 'normal' && self.goods_attr[i].m_price) {
								goods.price = self.goods_attr[i].m_price;
							} else {
								goods.price = self.goods_attr[i].price;
							}

							if (self.goods.attr && self.goods.attr.length != 0) {
								goods.name = self.goods.attr[goods.sku];
							}

							self.PAGE().goods = goods
						}
					}
				}
			},
			attrClick: function(e) {
				var self = this;
				var attr_group_id = e.target.dataset.groupId;
				var attr_id = e.target.dataset.id;
				var attr_group_list = self.attr_group_list;

				for (var i in attr_group_list) {
					if (attr_group_list[i].attr_group_id != attr_group_id) continue;

					for (var j in attr_group_list[i].attr_list) {
						if (attr_group_list[i].attr_list[j].attr_id == attr_id) {
							attr_group_list[i].attr_list[j].checked = true;
						} else {
							attr_group_list[i].attr_list[j].checked = false;
						}
					}
				}
				self.PAGE().attr_group_list = attr_group_list
				var check_attr_list = [];
				var check_all = true;

				for (var i in attr_group_list) {
					var group_checked = false;

					for (var j in attr_group_list[i].attr_list) {
						if (attr_group_list[i].attr_list[j].checked) {
							check_attr_list.push(attr_group_list[i].attr_list[j].attr_id);
							group_checked = true;
							break;
						}
					}

					if (!group_checked) {
						check_all = false;
						break;
					}
				}

				if (!check_all) return;
				uni.showLoading({
					title: "正在加载",
					mask: true
				});
				self.getApp().request({
					url: self.getApp().api.default.goods_attr_info,
					data: {
						goods_id: self.id,
						attr_list: JSON.stringify(check_attr_list),
						type: 'ms'
					},
					success: function(res) {
						uni.hideLoading();

						if (res.code == 0) {
							var goods = self.goods;
							goods.price = res.data.price;
							goods.num = res.data.num;
							goods.attr_pic = res.data.pic;

							self.PAGE().goods = goods
							self.PAGE().miaosha_data = res.data.miaosha
						}
					}
				});
			},
			//获取初始值选中属性数组
			getDefaule(attr) {
				let arr = [];
				let defaultIndex = 0;
				attr.some((item, index) => {
					if (item.num > 0) {
						defaultIndex = index;
						return true;
					}

					return false;
				});
				arr = attr[defaultIndex].attr_list.map((item, index) => {
					return item.attr_name;
				});
				return arr;
			},
			//修改属性列表，添加是否存在
			isHave(attr_group_list, goods_attr) {
				//console.log('3333',attr_group_list)
				let selectarr = []; //['大小1'，'颜色一',...]

				for (let i in attr_group_list) {
					//遍历所有子属性 获取当前选择属性集合 ['大小1'，'颜色一',...]
					let checkIndex = 'lqq';

					for (let j in attr_group_list[i].attr_list) {
						if (attr_group_list[i].attr_list[j].checked == true) {
							checkIndex = attr_group_list[i].attr_list[j].attr_name;
						}
					}

					selectarr.push(checkIndex);
				}

				let have = false;
				let ii = 0; //要替换的属性索引

				for (let i in attr_group_list) {
					for (let j in attr_group_list[i].attr_list) {
						let arr = selectarr.concat();
						arr[ii] = attr_group_list[i].attr_list[j].attr_name;
						attr_group_list[i].attr_list[j]['isHave'] = false;

						if (this.panduan(arr, goods_attr)) {
							//判断是否存在该组合商品
							attr_group_list[i].attr_list[j]['isHave'] = true;
						}
					}

					ii++;
				}
				//this.currentPage.attr_group_list = attr_group_list;
				return attr_group_list;
			},
			//判断商品是否纯在
			panduan(selectarr, goods_attr) {
				let nullNum = 0;
				selectarr.map((item, index) => {
					if (item == 'lqq') {
						nullNum++;
					}
				}); //console.log('3',goods_attr)

				let have = false;
				goods_attr.forEach((item, index) => {
					let num = item.num || 0;
					let length = 0;
					item.attr_list.forEach((item1, index1) => {
						if (selectarr.indexOf(item1.attr_name) != -1 && num > 0) ++length;
					});

					if (length >= selectarr.length - nullNum) {
						have = true;
					}
				});
				return have;
			},
			//获取默认商品的下标
			get_index: function(attr_group_list, goods_attr) {
				//console.log('eeee', goods_attr)
				let index1 = 0;
				let arr = [];
				for (let i in attr_group_list) {
					attr_group_list[i].attr_list.forEach((val, ind) => {
						//console.log('dfdsfsdf',val.attr_name)
						if (val.checked) {
							arr.push(val.attr_name);
						}
					})
				}

				//console.log('已选属性集合', arr);
				let aaa = goods_attr.forEach((val, inc) => {
					//console.log('22222222222', val);
					let index_all = 0;
					val.attr_list.forEach((value) => {
						if (arr.indexOf(value.attr_name) != -1) {
							index_all++
						}
					})
					//console.log('ff',index_all)
					if (index_all == arr.length) {
						//console.log('000000000000000000000```',inc)
						index1 = inc;
					}
				})
				//console.log('index', index1)
				return index1;
			},
			/**
			 * 商品数量减少
			 */
			numberSub: function() {
				var num = this.form.number;
				if (num <= 1) return true;
				num--;
				this.PAGE().form.number = num
			},

			/**
			 * 商品数量添加
			 */
			numberAdd: function() {
				var num = this.form.number;
				var pageType = this.pageType;
				num++; // TODO 商城商品详情没有以下判断

				if (num > this.goods.one_buy_limit && this.goods.one_buy_limit != 0) {
					uni.showModal({
						title: '提示',
						content: '数量超过最大限购数',
						showCancel: false,
						success: function(res) {}
					});
					return;
				}

				if (pageType === 'PINTUAN' && num > this.goods.buy_limit && this.goods.buy_limit != 0) {
					uni.showModal({
						title: '提示',
						content: '数量超过最大限购数',
						showCancel: false,
						success: function(res) {}
					});
					return;
				}

				if (pageType === 'MIAOSHA') {
					if (num > this.goods.buy_max && this.goods.buy_max != 0) {
						uni.showModal({
							title: '提示',
							content: '数量超过最大限购数',
							showCancel: false,
							success: function(res) {}
						});
						return true;
					}
				}

				if (num > this.goods.num) {
					uni.showToast({
						title: '库存不足',
						icon: 'none'
					});
					num = this.goods.num;
				}

				this.PAGE().form.number = num
			},

			/**
			 * 手动输入商品数量
			 */
			numberBlur: function(e) {
				var num = e.detail.value;
				var pageType = this.pageType;
				num = parseInt(num);

				if (isNaN(num)) {
					num = 1;
				}

				if (num <= 0) {
					num = 1;
				} // TODO 商城商品详情没有以下判断   


				if (num > this.goods.one_buy_limit && this.goods.one_buy_limit != 0) {
					uni.showModal({
						title: '提示',
						content: '数量超过最大限购数',
						showCancel: false,
						success: function(res) {}
					});
					num = this.goods.one_buy_limit;
				}

				if (pageType === 'PINTUAN' && num > this.goods.buy_limit && this.goods.buy_limit != 0) {
					uni.showModal({
						title: '提示',
						content: '数量超过最大限购数',
						showCancel: false,
						success: function(res) {}
					});
					return;
				}

				if (pageType === 'MIAOSHA') {
					if (num > this.goods.buy_max && this.goods.buy_max != 0) {
						uni.showToast({
							title: "一单限购" + this.goods.buy_max,
							image: "/static/images/icon-warning.png"
						});
						return true;
					}
				}

				if (num > this.goods.num) {
					uni.showToast({
						title: '库存不足',
						icon: 'none'
					});
					num = this.goods.num;
				}

				this.PAGE().form.number = num
			},
		}
	}
</script>

<style scoped>
	.attr-picker {
		position: fixed;
		bottom: 110rpx;
		left: 0;
		z-index: 10000;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
	}

	.attr-picker .content-box {
		width: 100%;
		background: #fff;
		position: fixed;
		bottom: 110rpx;
		border-radius: 30rpx 30rpx 0 0;
	}

	.attr-picker .goods-pic-box {
		position: relative;
		width: 150rpx;
	}

	.attr-picker .goods-pic-box image {
		width: 150rpx;
		height: 150rpx;
		border-radius: 20rpx;
		background: #fff;
	}

	.attr-picker .attr_num_0 {
		color: #CDCDCD !important;
		background: #F1F1F1 !important;
		border: 2rpx solid #DADADA !important;
	}

	.vip-icon {
		width: 34rpx;
		height: 34rpx;
		border-radius: 50%;
		background: #000000;
		margin-left: 29rpx;
		margin-right: 12rpx;
		line-height: 34rpx;
		text-align: center;
	}

	.commission-box-cart {
		padding: 30rpx 24rpx;
		background: #F3F3F3;
	}

	.attr-picker .attr-group {
		margin-bottom: 6rpx;
	}

	.attr-picker .attr-group-name {
		margin-bottom: 20rpx;
	}

	.attr-picker .attr-item {
		display: inline-block;
		margin: 0 25rpx 17rpx 0;
		background: #F7F4F8;
		padding: 0rpx 12rpx;
		height: 65rpx;
		text-align: center;
		line-height: 61rpx;
		font-size: 24rpx;
		color: #333333;
		border-radius: 8rpx;
		border: 2rpx solid #F7F4F8;
	}

	.attr-picker .attr-item.active {
		color: #FF401A;
		background: #FFF7F6;
		border: 2rpx solid #FF401A;
	}

	.attr-picker .number-input-box {}

	input {
		min-height: 1rem;
	}

	.attr-picker .number-input-box .number-input {
		height: 38rpx !important;
		border: none;
		text-align: center;
		line-height: 38rpx;
		width: 50rpx;
		background: #eee;
		margin: 0 4rpx !important;
	}

	.attr-picker .number-input-box .number-btn {
		width: 44rpx;
		height: 44rpx;
		font-size: 44rpx;
		line-height: 44rpx
	}

	.attr-picker .number-input-box .number-btn.disabled {

		color: #aaa;
	}

	.edit-standard-btn {
		width: 339rpx;
		height: 70rpx;
		color: #fff;
		font-size: 24rpx;
		line-height: 68rpx;
		text-align: center;
		border: 1rpx solid rgba(97, 97, 97, .4);
		font-size: 26rpx;
		color: #333333;
		border-radius: 35rpx;
	}

	.edit-standard-btn-yellow {
		background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
		border: none;
		line-height: 70rpx;
		color: #fff;
	}

	.edit-standard-btn-opc {
		background: #FACD9D;
	}

	.parameter-list {
		padding: 20rpx 11rpx;
		border-bottom: 1rpx solid #F4F4F4;
	}
</style>
