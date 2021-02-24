module.exports = {
	currentPage: null,

	/**
	 * 注意！注意！！注意！！！
	 * 由于组件的通用，部分变量名称需统一，在各自引用的xxx.js文件需定义，并给对应变量赋相应的值
	 * 以下变量必须定义并赋值
	 * 
	 * pageType     标识从哪个模块引用的
	 * goods         商品信息
	 * goods.attr_pic    规格相应图片
	 * goods.cover_pic   没有规格图片展示商品默认图片
	 * goods.price      商品价格
	 * goods.num        商品库存
	 * attr_group_list  商品规格、包含规格组、规格
	 * 持续补充...
	 */
	init: function(self) {
		var _this = this;

		_this.currentPage = self;

		if (typeof self.previewImage === 'undefined') {
			self.previewImage = function(e) {
				_this.previewImage(e);
			};
		}

		if (typeof self.showAttrPicker === 'undefined') {
			self.showAttrPicker = function(e) {
				_this.showAttrPicker(e);
			};
		}

		if (typeof self.hideAttrPicker === 'undefined') {
			self.hideAttrPicker = function(e) {
				_this.hideAttrPicker(e);
			};
		}

		if (typeof self.storeAttrClick === 'undefined') {
			self.storeAttrClick = function(e) {
				_this.storeAttrClick(e);
			};
		}

		if (typeof self.numberAdd === 'undefined') {
			self.numberAdd = function(e) {
				_this.numberAdd(e);
			};
		}

		if (typeof self.numberSub === 'undefined') {
			self.numberSub = function(e) {
				_this.numberSub(e);
			};
		}

		if (typeof self.numberBlur === 'undefined') {
			self.numberBlur = function(e) {
				_this.numberBlur(e);
			};
		}

		if (typeof self.selectDefaultAttr === 'undefined') {
			self.selectDefaultAttr = function(e) {
				_this.selectDefaultAttr(e);
			};
		}

		if (typeof self.stop === 'undefined') {
			self.stop = function(e) {
				_this.stop(e);
			};
		}

		if (typeof self.showModal === 'undefined') {
			self.showModal = function(e) {
				_this.showModal(e);
			};
		}

		if (typeof self.closeModal === 'undefined') {
			self.closeModal = function(e) {
				_this.closeModal(e);
			};
		}

		if (typeof self.checkFirstOrder === 'undefined') {
			self.checkFirstOrder = function(e) {
				_this.checkFirstOrder(e);
			};
		}
	},

	checkFirstOrder() {
		var self = this.currentPage;
		self.setData({
			first_order_img: uni.getStorageSync('_img').bg_popup
		});

		if (uni.getStorageSync('is_show_modal')) {
			return;
		}

		self.getApp().request({
			url: self.getApp().api.default.check_first_order,
			data: {
				userId: uni.getStorageSync('USER_INFO').id
			},
			success: function(res) {
				if (res.code == 0) {
					uni.setStorageSync('is_show_modal', '0'); // 首单优惠

					if (uni.getStorageSync('is_show_modal') == '0') {
						self.setData({
							is_show_first: true
						});
					} else {
						self.setData({
							is_show_first: false
						});
					}
				} else {}
			}
		});
	},

	showModal() {
		var self = this.currentPage;
		self.setData({
			is_show_modal: true
		});
	},

	closeModal() {
		var self = this.currentPage;
		self.setData({
			is_show_first: false
		});
		uni.setStorageSync('is_show_modal', '1');
	},

	previewImage: function(e) {
		// TODO 商城的路径不是这个
		var urls = e.currentTarget.dataset.url;
		// uni.previewImage({
		// 	urls: [urls]
		// });
		let self = this.currentPage;
		let arr = [];
		let data = self.goods_attr || [];
		data.forEach(val=>{
			if(val.pic){
				arr.push(val.pic);
			}
		})
		uni.previewImage({
			current:urls,
			urls: arr.length>0?arr:[urls]
		});
	},
	stop: function() {
		var self = this.currentPage;
	},

	/**
	 * 隐藏规格选择框
	 */
	hideAttrPicker: function() {
		var self = this.currentPage;
		self.setData({
			show_attr_picker: false
		});
	},

	/**
	 * 显示规格选择框
	 */
	showAttrPicker: function() {
		var self = this.currentPage;
		self.setData({
			show_attr_picker: true
		});
	},


	storeAttrClick: function(e) {

		if (e.target.dataset.type == 0)
			return 0;

		var self = this.currentPage;
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
			self.setData({
				attr_group_list: JSON.parse(JSON.stringify(attr_group_list))
			});
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
							self.setData({
								form: {
									number: 1
								}
							});
						} else {
							self.setData({
								['form.number']: goodsNum
							});
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

					self.setData({
						goods: goods
					});
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

		self.setData({
			attr_group_list: attr_group_list
		});
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
					self.setData({
						goods: goods,
						miaosha_data: res.data.miaosha
					});
				}
			}
		});
	},

	/**
	 * TODO 积分商城规格选择,需要合并优化
	 */
	integralMallAttrClick: function(checkAttrList) {
		var self = this.currentPage;
		var goods = self.goods;
		var inattr = goods.attr;
		var inattr_id = [];
		var price = 0;
		var integral = 0;

		for (var x in inattr) {
			if (JSON.stringify(inattr[x].attr_list) == JSON.stringify(checkAttrList)) {
				if (parseFloat(inattr[x].price) > 0) {
					price = inattr[x].price;
				} else {
					price = goods.price;
				}

				if (parseInt(inattr[x].integral) > 0) {
					integral = inattr[x].integral;
				} else {
					integral = goods.integral;
				}

				goods.attr_pic = inattr[x].pic; // goods.num = inattr[x].num;

				self.setData({
					attr_integral: integral,
					attr_num: inattr[x].num,
					attr_price: price,
					status: 'attr' // goods: goods

				});
			}
		}
	},

	/**
	 * 商品数量减少
	 */
	numberSub: function() {
		var self = this.currentPage;
		var num = self.form.number;
		if (num <= 1) return true;
		num--;
		self.setData({
			form: {
				number: num
			}
		});
	},

	/**
	 * 商品数量添加
	 */
	numberAdd: function() {
		var self = this.currentPage;
		var num = self.form.number;
		var pageType = self.pageType;
		num++; // TODO 商城商品详情没有以下判断

		if (num > self.goods.one_buy_limit && self.goods.one_buy_limit != 0) {
			uni.showModal({
				title: '提示',
				content: '数量超过最大限购数',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}

		if (pageType === 'PINTUAN' && num > self.goods.buy_limit && self.goods.buy_limit != 0) {
			uni.showModal({
				title: '提示',
				content: '数量超过最大限购数',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}

		if (pageType === 'MIAOSHA') {
			if (num > self.goods.buy_max && self.goods.buy_max != 0) {
				uni.showModal({
					title: '提示',
					content: '数量超过最大限购数',
					showCancel: false,
					success: function(res) {}
				});
				return true;
			}
		}

		if (num > self.goods.num) {
			uni.showToast({
				title: '库存不足',
				icon: 'none'
			});
			num = self.goods.num;
		}

		self.setData({
			form: {
				number: num
			}
		});
	},

	/**
	 * 手动输入商品数量
	 */
	numberBlur: function(e) {
		var self = this.currentPage;
		var num = e.detail.value;
		var pageType = self.pageType;
		num = parseInt(num);

		if (isNaN(num)) {
			num = 1;
		}

		if (num <= 0) {
			num = 1;
		} // TODO 商城商品详情没有以下判断   


		if (num > self.goods.one_buy_limit && self.goods.one_buy_limit != 0) {
			uni.showModal({
				title: '提示',
				content: '数量超过最大限购数',
				showCancel: false,
				success: function(res) {}
			});
			num = self.goods.one_buy_limit;
		}

		if (pageType === 'PINTUAN' && num > self.goods.buy_limit && self.goods.buy_limit != 0) {
			uni.showModal({
				title: '提示',
				content: '数量超过最大限购数',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}

		if (pageType === 'MIAOSHA') {
			if (num > self.goods.buy_max && self.goods.buy_max != 0) {
				uni.showToast({
					title: "一单限购" + self.goods.buy_max,
					image: "/static/images/icon-warning.png"
				});
				return true;
			}
		}

		if (num > self.goods.num) {
			uni.showToast({
				title: '库存不足',
				icon: 'none'
			});
			num = self.goods.num;
		}

		self.setData({
			form: {
				number: num
			}
		});
	},

	/**
	 * 无规格、默认选中
	 */
	selectDefaultAttr: function(data) {
		var self = this.currentPage;
		var goods_attr = data.attr;
		var attr_group_list = data.attr_group_list; //、、获取默认选中的索引 ['属性1','属性2',...]

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

		let goods = self.goods;

		////////获取首次选择的商品下标
		let default_index = 0;
		default_index = this.get_index(attr_group_list, goods_attr);
		////////获取首次选择的商品下标
		goods.attr_pic = goods_attr[default_index].pic;
		goods.num = goods_attr[default_index].num;

		if (self.form.number && self.form.number > goods.num) {
			self.setData({
				form: {
					number: goods.num
				}
			});

			if (goods.num == 0) {
				self.setData({
					form: {
						number: 1
					}
				});
			}
		}

		if (goods_attr[default_index].m_price) {
			goods.m_price = goods_attr[default_index].m_price;
		}

		goods.c1 = goods_attr[default_index].c1;
		goods.c19 = goods_attr[default_index].c19;
		goods.sku = goods_attr[default_index].sku;
		if (self.pageType || self.pageType != 'normal') {
			goods.attr_list = goods_attr[default_index].attr_list;
		}

		goods.original_price = goods_attr[default_index].va;

		if (self.pageType == 'normal' && goods_attr[default_index].m_price) {
			goods.price = goods_attr[default_index].m_price;
		} else {
			goods.price = goods_attr[default_index].price;
		}

		self.setData({
			goods: goods,
			attr_group_list: self.attr_group_list
		});
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
	//获取默认商品的下标
	get_index:function(attr_group_list, goods_attr) {
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
	}

};
