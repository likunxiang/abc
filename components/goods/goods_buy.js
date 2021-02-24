import util from '../../utils/util.js'
module.exports = {
	currentPage: null,
	/**
	 * 注意！注意！！注意！！！
	 * 由于组件的通用，部分变量名称需统一，在各自引用的xxx.js文件需定义，并给对应变量赋相应的值
	 * 以下变量必须定义并赋值
	 * 
	 * 持续补充...
	 */
	init: function(self) {
		var _this = this;
		_this.currentPage = self;

		if (typeof self.favoriteAdd === 'undefined') {
			self.favoriteAdd = function(e) {
				_this.favoriteAdd(e);
			}
		}
		if (typeof self.favoriteRemove === 'undefined') {
			self.favoriteRemove = function(e) {
				_this.favoriteRemove(e);
			}
		}
		if (typeof self.kfMessage === 'undefined') {
			self.kfMessage = function(e) {
				_this.kfMessage(e);
			}
		}
		if (typeof self.callPhone === 'undefined') {
			self.callPhone = function(e) {
				_this.callPhone(e);
			}
		}

		if (typeof self.addCart === 'undefined') {
			self.addCart = function(e) {
				_this.addCart(e);
			}
		}

		if (typeof self.buyNow === 'undefined') {
			self.buyNow = function(e) {
				_this.buyNow(e);
			}
		}

		if (typeof self.goHome === 'undefined') {
			self.goHome = function(e) {
				_this.goHome(e);
			}
		}
		if (typeof self.goCar === 'undefined') {
			self.goCar = function(e) {
				_this.goCar(e);
			}
		}
		if (typeof self.doNothing === 'undefined') {
			self.doNothing = function(e) {
				_this.doNothing(e);
			}
		}
		if (typeof self.kf === 'undefined') {
			self.kf = function(e) {
				_this.kf(e);
			}
		}
		if (typeof self.goService === 'undefined') {
			self.goService = function(e) {
				_this.goService(e);
			}
		}
		if (typeof self.showAgain === 'undefined') {
			self.showAgain = function(e) {
				_this.showAgain(e);
			}
		}
		if (typeof self.goodsOnLoad === 'undefined') {
			self.goodsOnLoad = function(e) {
				_this.goodsOnLoad(e);
			}
		}
	},
	goodsOnLoad() {
		var self = this.currentPage;
		if (uni.getStorageSync('service_tips')) {
			self.setData({
				is_show_again: false
			})
		} else {
			self.setData({
				is_show_again: true
			})
			setTimeout(function() {
				self.setData({
					is_show_again: false
				})
			}, 5000)
		}
	},
	// 不再提示
	showAgain() {
		var self = this.currentPage;
		self.setData({
			is_show_again: false
		})
		uni.setStorageSync('service_tips', true)
	},
	//收藏
	favoriteAdd: function() {
		var self = this.currentPage;
		self.getApp().request({
			url: self.getApp().api.user.favorite_add,
			method: "post",
			data: {
				goods_id: self.goods.id,
			},
			success: function(res) {
				if (res.code == 0) {
					var goods = self.goods;
					goods.is_favorite = 1;
					self.setData({
						goods: goods,
					});
				}
			}
		});
	},
	kf() {
		var self = this.currentPage;
		uni.getStorage({
			key: 'USER_INFO',
			success(user) {
				uni.getStorage({
					key: '_mchInfo',
					success(mch) {
						uni.navigateTo({
							url: '/pages/web/web?type=2&user_id=' + user.data.id + '&mch_id=' + mch.data.id + '&gs_id=' + self.goods
								.id,
						})
					},
				})
			},
			fail() {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
			}
		})
	},
	//取消收藏
	favoriteRemove: function() {
		var self = this.currentPage;
		self.getApp().request({
			url: self.getApp().api.user.favorite_remove,
			method: "post",
			data: {
				goods_id: self.goods.id,
			},
			success: function(res) {
				if (res.code == 0) {
					var goods = self.goods;
					goods.is_favorite = 0;
					self.setData({
						goods: goods,
					});
				}
			}
		});
	},

	//客服
	kfMessage: function() {
		let store = uni.getStorageSync(this.getApp().const.STORE);
		if (!store.show_customer_service) {
			uni.showToast({
				title: "未启用客服功能",
			});
		}

	},

	// 拨打电话
	callPhone: function(e) {
		uni.makePhoneCall({
			phoneNumber: e.target.dataset.info
		})
	},

	//加入购物车
	addCart: util.throttle(function() {
		var self = this.currentPage;
		var token = uni.getStorageSync('ACCESS_TOKEN')
		if (!token) {
			self.setData({
				showGetLogin: true
			})
			self.$store.commit('vuexSet', {
				name: 'show_loginTpl',
				value: true
			})
			return
		}
		
		
		if(Object.keys(self.attr_group_list).length==0){
			self.getGoodsAttr()
		}
		if (self.btn) {

			if (self.pageType == "PROUPGOODS") {
				this.submit('ADD_CART_PROUPGOODS');
			} else {
				this.submit('ADD_CART');
			}
		}
	}, 1000),
	buyNow: util.throttle(function() {
		var self = this.currentPage;
		var token = uni.getStorageSync('ACCESS_TOKEN')
		if (!token) {
			self.setData({
				showGetLogin: true
			})
			self.$store.commit('vuexSet', {
				name: 'show_loginTpl',
				value: true
			})
			return
		}
		if (self.btn) {
			this.submit('BUY_NOW');
		}
	}, 1000),
	// 立即购买

	doNothing: function() {

	},
	submit: function(type) {
		var self = this.currentPage;

		if (!self.show_attr_picker) {
			self.setData({
				show_attr_picker: true,
			});
			return true;
		}
		
		///选择全部规格后才允许下单,加入购物车
		if (!this.check_all()) {
			return;
		}
		// console.log('全选了')
		//选择全部规格后才允许下单，加入购物车

		if (self.miaosha_data && self.miaosha_data.rest_num > 0 && self.form.number > self.miaosha_data
			.rest_num) {
			uni.showToast({
				title: "商品库存不足，请选择其它规格或数量",
				icon: 'none'
			});
			return true;
		}

		if (self.form.number > self.goods.num) {
			uni.showToast({
				title: "商品库存不足，请选择其它规格或数量",
				icon: 'none'
			});
			return true;
		}
		// var attr_group_list = self.attr_group_list;
		// var checked_attr_list = [];
		// for (var i in attr_group_list) {
		//     var attr = false;
		//     for (var j in attr_group_list[i].attr_list) {
		//         if (attr_group_list[i].attr_list[j].checked) {
		//             attr = {
		//                 attr_id: attr_group_list[i].attr_list[j].attr_id,
		//                 attr_name: attr_group_list[i].attr_list[j].attr_name,
		//             };
		//             break;
		//         }
		//     }
		//     if (!attr) {
		//         uni.showToast({
		//             title: "请选择" + attr_group_list[i].attr_group_name,
		//             image: "/images/icon-warning.png",
		//         });
		//         return true;
		//     } else {
		//         checked_attr_list.push({
		//             attr_group_id: attr_group_list[i].attr_group_id,
		//             attr_group_name: attr_group_list[i].attr_group_name,
		//             attr_id: attr.attr_id,
		//             attr_name: attr.attr_name,
		//         });
		//     }
		// }
		if (type == 'ADD_CART') { //加入购物车
			uni.showLoading({
				title: "正在提交",
				mask: true,
			});
			self.getApp().request({
				url: self.getApp().api.cart.add_cart,
				method: "POST",
				data: {
					goods_id: self.id,
					sku: self.goods.sku,
					num: self.form.number,
					from: self.from || 1
				},
				success: function(res) {
					uni.hideLoading();
					uni.showToast({
						title: res.msg,
						duration: 1500,
						icon: 'none'
					});
					self.setData({
						show_attr_picker: false,
					});
					self.sendEvent("加入购物车", {
						"商品名称": self.goods.name,
						"商品ID": self.goods.id,
					})

				}
			});
		}
		if (type == 'ADD_CART_PROUPGOODS') { //加入购物车
			uni.showLoading({
				title: "正在提交",
				mask: true,
			});
			self.getApp().request({
				url: self.getApp().api.cart.add_cart,
				method: "POST",
				data: {
					goods_id: self.id,
					sku: self.goods.sku,
					num: self.form.number,
					from: 4,
				},
				success: function(res) {
					uni.hideLoading();
					uni.showToast({
						title: res.msg,
						duration: 1500,
						icon: 'none'
					});
					self.setData({
						show_attr_picker: false,
					});
					self.sendEvent("加入购物车", {
						"商品名称": self.goods.name,
						"商品ID": self.goods.id,
					})

				}
			});
		}
		if (type == 'BUY_NOW') { //立即购买
			self.setData({
				show_attr_picker: false,
			});
			var goods_list = [];
			goods_list.push({
				goods_id: self.id,
				num: self.form.number,
				sku: self.goods.sku,
				from: self.from || 1
			});
			var goods = self.goods;
			var mch_id = 0;
			if (goods.mch != null) {
				mch_id = goods.mch.id
			}
			var mch_list = [];
			mch_list.push({
				mch_id: mch_id,
				goods_list: goods_list
			});
			uni.navigateTo({
				url: "/pages/new-order-submit/new-order-submit?mch_list=" + JSON.stringify(mch_list),
			});
		}
	},

	// 返回首页
	goHome: function(e) {
		var self = this.currentPage;
		var pageType = self.pageType;
		// if (pageType === 'PINTUAN') {
		//     var url = '/pages/pt/index/index';
		// } else if (pageType === 'BOOK') {
		//     var url = '/pages/book/index/index';
		// } else {
		var url = '/pages/index/index';
		// }

		uni.redirectTo({
			url: url
		})
	},
	goCar: function() {
		uni.navigateTo({
			url: '/pages/cart/cart',
		})
	},
	goService() {
		uni.navigateTo({
			url: '/member/homePage/homePage',
		})
	},
	// buynow: function (e) {
	//     var self = this.currentPage;
	//     var carGoods = self.carGoods;
	//     var goodsModel = self.goodsModel;
	//     self.setData({
	//         goodsModel: false
	//     });
	//     var length = carGoods.length;
	//     var cart_list = [];
	//     var cart_list_goods = [];
	//     for (var a = 0; a < length; a++) {
	//         if (carGoods[a].num != 0) {
	//             cart_list_goods = {
	//                 goods_id: carGoods[a].goods_id,
	//                 num: carGoods[a].num,
	//                 attr: carGoods[a].attr
	//             }
	//             cart_list.push(cart_list_goods)
	//         }
	//     }
	//     var mch_list = [];
	//     mch_list.push({
	//         mch_id: 0,
	//         goods_list: cart_list
	//     });
	//     uni.navigateTo({
	//         url: '/pages/new-order-submit/new-order-submit?mch_list=' + JSON.stringify(mch_list),
	//     });
	// },
	check_all: function() { //选择全部规格返回true，漏选返回false
		let self = this.currentPage;
		let attr_group_list = self.attr_group_list;
		let index = 0;
		let checkAll = true;
		for (let key in attr_group_list) {
			let name = attr_group_list[key].attr_group_name; //规格分类
			let checked = false;
			attr_group_list[key].attr_list.forEach((val, ind) => {
				if (val.checked) {
					checked = true;
				}
			}); //有无选择
			if (checked == false) {
				uni.showToast({
					title: '请选择' + name,
					icon:'none',
					duration:2000
				})
				checkAll = false;
				return false;
			}
		}
		return checkAll;
	}
}
