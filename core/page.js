let helper = require("../utils/helper.js")
module.exports = {
	currentPage: null,
	currentPageOptions: {},
	current_mchid: '',
	//加入底部导航的页面
	navbarPages: [
		'pages/index/index',
		'pages/cart/cart',
		'pages/user/user',
		'pages/list/list',
		'pages/video/video-list',
		'pages/miaosha/miaosha',
		'pages/integral-mall/index/index',
		'pages/integral-mall/register/index',
		'pages/article-detail/article-detail',
		'pages/article-list/article-list',
		'pages/order/order',
		'pages/guanyiguan/guanyiguan',
	],
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(self, options) {
		
		//保存options 到 vuex 
		let oooptions = options || {}
		// self.$store.commit('vuexSet','options',oooptions)
		self.$store.commit('vuexSet', {
			name: 'options',
			value: oooptions
		})
		// var app = getApp();
		let showGetLogin = true;
		let route = self.route;
		//#ifdef MP-WEIXIN
		route = self.__route__;
		//#endif
		if (route == 'pages/index/index' || route == 'pages/guanyiguan/guanyiguan' || route ==
			'pages/goods/goods' || route == 'pages/groupGoods/groupGoods' || route == 'pages/pt/details/details' ||
			route == 'pages/miaosha/details/details' || route == 'pages/cart/cart' || route == 'pages/newSearch/newSearch' &&
			!options.mch_id) {
			showGetLogin = false
		} else {
			showGetLogin = true;
			// if(!uni.getStorageSync('ACCESS_TOKEN'))
			// self.$store.commit('vuexSet',{name:'show_loginTpl',value:true})
		}
		self.setData({
			resBaseUrl: self.getApp().envInfo.resBaseUrl,
			showGetLogin: showGetLogin
		})
		this.currentPage = self;
		this.currentPageOptions = options;
		var _this = this;
		if (options.mch_id) {
			_this.current_mchid = options.mch_id
		} else if (options.scene) {
			// console.log('打印options.scene')
			//console.log(options.scene)
			if (isNaN(options.scene)) {
				var scene = decodeURIComponent(options.scene);
				// console.log('11111111111111',scene);
				if (scene) {
					scene = helper.scene_decode(scene);
					//console.log(scene);
					if (scene && scene.sid) {
						uni.setStorageSync('s_id', scene.sid)
						// console.log('sid:' + uni.getStorageSync('s_id'));
						this.getParentId()
					}
					if (scene && scene.mch_id) {
						_this.current_mchid = scene.mch_id
					} else if (self.$store.state.mch_id) {
						_this.current_mchid = self.$store.state.mch_id
					} else if (uni.getStorageSync('_mchInfo').id) {
						_this.current_mchid = uni.getStorageSync('_mchInfo').id
					} else {
						_this.current_mchid = self.$store.state.mch_id
					}
				} else if (_this.$store.state.mch_id) {
					_this.current_mchid = self.$store.state.mch_id
				} else if (uni.getStorageSync('_mchInfo').id) {
					_this.current_mchid = uni.getStorageSync('_mchInfo').id
				} else {
					_this.current_mchid = self.$store.state.mch_id
				}
			} else if (self.$store.state.mch_id) {
				_this.current_mchid = self.$store.state.mch_id
			} else if (uni.getStorageSync('_mchInfo').id) {
				_this.current_mchid = uni.getStorageSync('_mchInfo').id
			} else {
				_this.current_mchid = self.$store.state.mch_id
			}
		} else if (self.$store.state.mch_id) {
			_this.current_mchid = self.$store.state.mch_id
		} else if (uni.getStorageSync('_mchInfo').id) {
			_this.current_mchid = uni.getStorageSync('_mchInfo').id
		} else {
			_this.current_mchid = self.$store.state.mch_id
		}
		//console.log('mch_id',_this.current_mchid )
		// 进店选择
		let old_mch_id = uni.getStorageSync('_mchInfo').id || ''
		let new_mch_id = _this.current_mchid || ''
		// 如果有，存起来待用
		if (new_mch_id != old_mch_id) {
			uni.setStorageSync('new_mch_id',new_mch_id)
		}
		if (old_mch_id && old_mch_id != new_mch_id) {
			self.$store.commit('vuexSet', {
				name: 'is_choose_mch',
				value: true
			})
			return
		} else {
			self.$store.commit('vuexSet', {
				name: 'is_choose_mch',
				value: false
			})
		}
		
		// 邀请人id
		if (options.user_id) {
			if (options.user_id != getApp().globalData.promoter_id) {
				uni.setStorageSync('promoter', {
					id: options.user_id
				});
				getApp().globalData.promoter_id = options.user_id
			}
		} else if (options.scene) {
			if (isNaN(options.scene)) {
				var scene = decodeURIComponent(options.scene);
				if (scene) {
					scene = helper.scene_decode(scene);
					if (scene && scene.user_id) {
						if (scene.user_id != getApp().globalData.promoter_id) {
							uni.setStorageSync('promoter', {
								id: scene.user_id
							});
							getApp().globalData.promoter_id = scene.user_id
						}
					}
				}
			}
		}

		this.setMchInfo();

		//console.log('获取到了推荐人id')
		//console.log(getApp().promoter_id)

		this.setUserInfo();
		this.setWxappImg();
		this.setStore();
		this.setParentId(options);
		// this.getNavigationBarColor();
		// this.setDeviceInfo();
		// this.setPageClasses();
		// this.setPageNavbar();
		// this.setBarTitle();
		// if (getApp().core.getStorageSync('s_id')) {
		// 	this.getParentId()
		// }

		if (typeof self.onSelfLoad === 'function') {
			self.onSelfLoad(options);
		}
		_this._setFormIdSubmit()
		if (typeof my !== 'undefined' && route != 'pages2/login/login' && options) {
			if (!self.options)
				self['options'] = options;
			uni.setStorageSync('last_page_options', options);
		};

		if (route == 'lottery/goods/goods' && options) {
			if (options.user_id) {
				var user_id = options.user_id;
				var lottery_id = options.id;

			} else if (options.scene) {
				if (isNaN(options.scene)) {
					let scene = decodeURIComponent(options.scene);
					if (scene) {
						scene = helper.scene_decode(scene);
						if (scene && scene.uid) {
							var user_id = scene.uid;
							var lottery_id = scene.gid;
						}
					}
				}
			};
			self.getApp().request({
				data: {
					user_id: user_id,
					lottery_id: lottery_id
				},
				url: self.getApp().api.lottery.clerk,
				success: function(res) {
					if (res.code == 0) {

					}
				}
			});
		}
		self.navigatorClick = function(e) {
			_this.navigatorClick(e, self);
		};
		// 设置平台标识lqq
		self.setData({
			__platform: '',
			_navigation_bar_color: self.getApp().core.getStorageSync(self.getApp().const.NAVIGATION_BAR_COLOR), //底部导航颜色
		});
		if (typeof self.showToast === 'undefined') {
			self.showToast = function(e) {
				_this.showToast(e);
			};
		}
		self.getApp().shareSendCoupon = function(self) {
			_this.shareSendCoupon(self);
		}
		if (typeof self.setTimeList === 'undefined') {
			self.setTimeList = function(e) {
				return _this.setTimeList(e);
			}
		}
		if (typeof self.showLoading === 'undefined') {
			self.showLoading = function(e) {
				_this.showLoading(e);
			}
		}
		if (typeof self.hideLoading === 'undefined') {
			self.hideLoading = function(e) {
				_this.hideLoading(e);
			}
		}
		if (typeof self.modalConfirm === 'undefined') {
			self.modalConfirm = function(e) {
				_this.modalConfirm(e);
			}
		}
		if (typeof self.modalClose === 'undefined') {
			self.modalClose = function(e) {
				_this.modalClose(e);
			}
		}
		if (typeof self.modalShow === 'undefined') {
			self.modalShow = function(e) {
				_this.modalShow(e);
			}
		}
		if (typeof self.myLogin === 'undefined') {
			self.myLogin = function() {
				_this.myLogin();
			}
		}
		if (typeof self.getUserInfo === 'undefined') {
			self.getUserInfo = function(res) {
				_this.getUserInfo(res);
			}
		}
		if (typeof self.getPhoneNumber === 'undefined') {
			self.getPhoneNumber = function(e) {
				_this.getPhoneNumber(e);
			}
		}
		if (typeof self.bindParent === 'undefined') {
			self.bindParent = function(e) {
				_this.bindParent(e);
			}
		}
		if (typeof self.closeCouponBox === 'undefined') {
			self.closeCouponBox = function(e) {
				_this.closeCouponBox(e);
			}
		}

		if (typeof self.relevanceSuccess === 'undefined') {
			self.relevanceSuccess = function(e) {
				_this.relevanceSuccess(e);
			}
		}

		if (typeof self.relevanceError === 'undefined') {
			self.relevanceError = function(e) {
				_this.relevanceError(e);
			}
		}
		if (typeof self.cancleLogin === 'undefined') {
			self.cancleLogin = function(e) {
				_this.cancleLogin(e);
			}
		}
		if (typeof self.getParentId === 'undefined') {
			self.getParentId = function(e) {
				_this.getParentId(e);
			}
		}
		if (typeof self.getStoreData === 'undefined') {
			self.getStoreData = function(e) {
				_this.getStoreData(e);
			}
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function(self) {
		this.currentPage = self;
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function(self) {
		this.currentPage = self;
		self.getApp().orderPay.init(self, getApp());
		// var quickNavigation = require('../components/quick-navigation/quick-navigation.js');
		// quickNavigation.init(this.currentPage);
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function(self) {
		this.currentPage = self;
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function(self) {
		this.currentPage = self;
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function(self) {
		this.currentPage = self;
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function(self) {
		this.currentPage = self;
	},
	//设置初始值
	getStoreData: function(self, options) {
		var _this = self.getApp()
		var _self = self
		let _url = _this.api.default.store
		// console.log("api._api_root999999999999999999999",_url)
		self.getApp().request({
			url: _url,
			success: (res) => {
				// console.log(res)
				if (res.data) {
					if (res.code == 0) {

						uni.setStorageSync(_this.const.STORE, res.data.store);
						uni.setStorageSync(_this.const.STORE_NAME, res.data.store_name);
						uni.setStorageSync(_this.const.SHOW_CUSTOMER_SERVICE, res.data.show_customer_service);
						uni.setStorageSync(_this.const.CONTACT_TEL, res.data.contact_tel);
						uni.setStorageSync(_this.const.SHARE_SETTING, res.data.share_setting);
						//app.permission_list = res.data.data.permission_list;
						uni.setStorageSync(_this.const.WXAPP_IMG, res.data.wxapp_img);
						uni.setStorageSync(_this.const.WX_BAR_TITLE, res.data.wx_bar_title);
						uni.setStorageSync(_this.const.ALIPAY_MP_CONFIG, res.data.alipay_mp_config);
						uni.setStorageSync(_this.const.STORE_CONFIG, res.data);
						var store = uni.getStorageSync(_this.const.STORE);
						if (store && store.name) {
							_self.setData({
								bar_title: store.name
							});
							uni.setNavigationBarTitle({
								title: store.name,
							});
						}
					}
				}
			},
			complete: function() {
				//page.login();
			}
		});
	},
	// 9.2 获取分享信息
	getParentId() {
		var self = this.currentPage;
		self.getApp().request({
			url: self.getApp().api.default.get_share_info,
			data: {
				sid: uni.getStorageSync('s_id')
			},
			success: (res) => {
				if (res.code == 0) {
					if (res.data.user_id) {
						uni.setStorageSync('parent_id', res.data.user_id)
						//getApp().mch_id = res.data.mch_id;
						self.$store.commit('vuexSet', {
							name: 'mch_id',
							value: res.data.mch_id
						})

						if (res.data.mch_id != uni.getStorageSync('_mchInfo').id) {
							this.current_mchid = res.data.mch_id;
							this.setMchInfo();
						}
					}
					if (res.data.rel_id) {
						uni.setStorageSync('rel_id', res.data.rel_id)
						// self.setData({
						// 	scene_id: res.data.rel_id
						// })
						// console.log(self.data.scene_id);
					}
				} else {
					wx.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			}
		})
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function(self) {
		this.currentPage = self;
		let _this = this;
		setTimeout(function() {
			// 原转发赠送优惠券功能
			// getApp().shareSendCoupon(self);
			// 记录用户转发次数
			var role = uni.getStorageSync('role')
			// 帮手分享
			if (role == 'seller') {
				_this.recordShare(self);
			}
		}, 1000);
	},
	onShareQp: function(self, paramStr, title, img) {
		let route = self.route;
		//#ifdef MP-WEIXIN
		route = self.__route__;
		//#endif
		var user_info = self.getApp().getUser();
		var mch_info = uni.getStorageSync('_mchInfo');
		var path = route + "?user_id=" + user_info.id + "&mch_id=" + (mch_info.id || '');
		if (paramStr) {
			path += "&" + paramStr;
		}
		var res = {
			path: path,
			title: title || mch_info.name
		};
		if (img) {
			res.imageUrl = img;
		}
		return res;
	},

	formSubmit_collect: function(e) {
		let formId = e.detail.formId;

	},

	setUserInfo: function() {
		var self = this.currentPage;
		//console.log('page390.self',self);

		var userInfo = self.getApp().getUser();
		if (userInfo) {

			self.setData({
				__user_info: userInfo,
			});
		}
	},

	setWxappImg: function(e) {
		var self = this.currentPage;

		self.getApp().getConfig(function(config) {
			self.setData({
				__wxapp_img: config.wxapp_img,
				store: config.store,
			});
		});
	},

	setStore: function(e) {
		return 0;
		var self = this.currentPage;

		self.getApp().getConfig(function(config) {
			if (config.store) {
				self.setData({
					store: config.store,
					__is_comment: config.store ? config.store.is_comment : 1, //全局评价开关
					__is_sales: config.store ? config.store.is_sales : 1, //全局销量开关
					__is_member_price: config.store ? config.store.is_member_price : 1, //全局会员价开关
					__is_share_price: config.store ? config.store.is_share_price : 1, //全局分销价开关
					__alipay_mp_config: config.alipay_mp_config
				});
			}
		});
	},
	// 清楚缓存的店铺信息
	cleanMchInfo: function() {
		uni.setStorageSync('_mchInfo', '');
	},
	setMchInfo: function($reloadCache) {
		var _this = this;
		$reloadCache = $reloadCache || false;
		var route = _this.currentPage.pageRoute();
		if (route == 'pages/index/index' || route == 'pages/user/user' || route == 'pages/qinUnion/qinUnion') { // 特定页面要重新获取店铺信息（会存在各种从不同店铺切换的情况，所以要重新获取）
			$reloadCache = true;
		}

		let mch_id = this.current_mchid; // 注意在具体页面调的时候要先调page.onload方法，里面有赋值current_mchid
		// 没有传的时候也要继续，为了当前用户是店主身份的时候的处理
		// if (!mch_id || mch_id == '' || mch_id == 'undefined') {
		//     return false;
		// }
		// 每次重新获取，避免到不了其他店铺
		var cacheMch = uni.getStorageSync('_mchInfo');
		if (!$reloadCache && cacheMch && cacheMch.id == mch_id && cacheMch.user_id && (uni.getStorageSync('role') != '')) { // 已经存在当前店铺信息的
			return false;
		}

		uni.setStorageSync('_mchInfo', {
			id: mch_id
		});
		this.currentPage.getApp().request({
			url: this.currentPage.getApp().api.default.merchants,
			success: (res) => {
				if (res.code == 0) {
					// console.log('mch_info',res.data.mch)
					if (res.data.show_msg && res.data.show_msg != '') {
						uni.showToast({
							title: res.data.show_msg
						});
					}
					if (res.data.mch) {
						uni.setStorageSync('_mchInfo', res.data.mch);
						_this.currentPage.$store.commit('vuexSet', {
							name: 'mch_info_',
							value: res.data.mch || {
								user: {}
							}
						});
						//lqq
						//console.log('asfsdf',res.data.mch)
						uni.setStorageSync('_img', res.data.init_img);
						uni.setStorageSync('role', res.data.role || 'user');
						_this.currentPage.$store.commit('vuexSet', {
							name: 'role_',
							value: res.data.role || 'user'
						});
						//getApp().mch_id = res.data.mch.id;
						_this.currentPage.$store.commit('vuexSet', {
							name: 'mch_id',
							value: res.data.mch.id
						});
						_this.currentPage.$store.commit('vuexSet', {
							name: 'init_img',
							value: res.data.init_img || {}
						});
						//_this.currentPage.$store.commit('vuexSet','mch_id',res.data.mch.id)
						_this.currentPage && _this.currentPage.setData({
							'role': res.data.role || 'user'
						});
					} else {
						uni.setStorageSync('_mchInfo', {
							id: mch_id
						});
						//getApp().mch_id = mch_id
						//_this.currentPage.$store.commit('vuexSet','mch_id',mch_id)
						_this.currentPage.$store.commit('vuexSet', {
							name: 'mch_id',
							value: mch_id
						})
						uni.setStorageSync('role', 'user');
						_this.currentPage.$store.commit('vuexSet', {
							name: 'role_',
							value: 'user'
						});
					}
				} else {
					uni.setStorageSync('_mchInfo', {
						id: mch_id
					});
					//getApp().mch_id = mch_id
					//_this.currentPage.$store.commit('vuexSet','mch_id',mch_id)
					_this.currentPage.$store.commit('vuexSet', {
						name: 'mch_id',
						value: mch_id
					})
					uni.setStorageSync('role', 'user');
					_this.currentPage.$store.commit('vuexSet', {
						name: 'role_',
						value: 'user'
					});
				}
				_this.currentPage.getApp().trigger.run(_this.currentPage.getApp().trigger.events.set_mch);
			}
		});
	},
	viewStore: function() {
		this.currentPage.getApp().request({
			url: this.currentPage.getApp().api.default.jindian,
			data: {
				mch_id: this.currentPage.$store.state.mch_id,
				user_id: this.currentPage.$store.state.promoter_id
			},
			success: function(resb) {

			}
		});
	},
	setParentId: function(options) {
		var self = this.currentPage;
		var _this = this;
		let route = self.route;
		//#ifdef MP-WEIXIN
		route = self.__route__;
		//#endif
		if (route == '/pages/index/index') {
			_this.setOfficalAccount();
		}
		if (options) {
			var parent_id = 0;
			if (options.user_id) {
				parent_id = options.user_id;
			} else if (options.scene) {
				if (isNaN(options.scene)) {
					var scene = decodeURIComponent(options.scene);
					if (scene) {
						scene = helper.scene_decode(scene);
						if (scene && scene.uid) {
							parent_id = scene.uid;
						}
					}
				} else {
					if (route.indexOf('clerk') == -1) {
						parent_id = options.scene;
					}
				}
				_this.setOfficalAccount();
			} else if (self.$store.state.query !== null) {
				var query = this.currentPage.$store.state.query || {};
				//console.log('setParentId-query',query)
				parent_id = query.uid || '';
			}
			if (parent_id) {
				uni.setStorageSync(self.getApp().const.PARENT_ID, parent_id);
				self.getApp().trigger.remove(self.getApp().trigger.events.login, 'TRY_TO_BIND_PARENT');
				self.getApp().trigger.add(self.getApp().trigger.events.login, 'TRY_TO_BIND_PARENT', function() {
					self.bindParent({
						parent_id: parent_id,
						condition: 0
					})
				});
			}
		}
	},

	showToast: function(e) {
		var self = this.currentPage;
		var duration = e.duration || 2500;
		var title = e.title || '';
		var success = e.success || null;
		var fail = e.fail || null;
		var complete = e.complete || null;
		if (self._toast_timer) {
			clearTimeout(self._toast_timer);
		}
		self.setData({
			_toast: {
				title: title,
			},
		});
		self._toast_timer = setTimeout(function() {
			var _toast = self._toast;
			_toast.hide = true;
			self.setData({
				_toast: _toast,
			});
			if (typeof complete == 'function') {
				complete();
			}
		}, duration);
	},

	setDeviceInfo: function() {
		var self = this.currentPage;

		let route = self.route;
		//#ifdef MP-WEIXIN
		route = self.__route__;
		//#endif
		//做适配的页面
		let routeArr = ['pages/index/index', 'pages/guanyiguan/guanyiguan', 'pages/cart/cart', 'page/goods/goods',
			'pages/pt/detail/detail', 'pages/miaosha/detail/detail'
		];
		//iphonex=>iPhone X(GSM+CDMA)<iPhone10,3>
		var device_list = [{
				id: 'device_iphone_5',
				model: 'iPhone 5',
			},
			{
				id: 'device_iphone_x',
				model: 'iPhone X',
			},
			{
				id: 'device_iphone_x',
				model: 'iPhone 11',
			}
		];
		//设置设备信息
		var device_info = uni.getSystemInfoSync();
		if (device_info.model) {
			if (device_info.model.indexOf('iPhone X') >= 0) {
				device_info.model = 'iPhone X';
			}
			if (device_info.model.indexOf('iPhone 11') >= 0) {
				device_info.model = 'iPhone 11';
			}
			for (var i in device_list) {
				if (device_list[i].model == device_info.model) {
					if (routeArr.indexOf(route) != -1) {
						self.setData({
							__device: device_list[i].id,
						});
					}

				}
			}
		}
	},

	setPageNavbar: function() {
		var _this = this;
		var self = this.currentPage;
		// console.log('self')
		let route = self.route;
		//#ifdef MP-WEIXIN
		route = self.__route__;
		//#endif
		var navbar = uni.getStorageSync('_navbar');
		if (route == 'pages/index/index' || route == 'pages/cart/cart' || route ==
			'pages/guanyiguan/guanyiguan' || route == 'pages/user/user') {
			if (navbar) {
				setNavbar(navbar);

			}

		} else {
			return
		}
		// if (navbar ) {
		// 	setNavbar(navbar);

		// }
		var in_array = false;
		for (var i in _this.navbarPages) {
			if (route == _this.navbarPages[i]) {
				in_array = true;
				break;
			}
		}
		if (!in_array) {
			return;
		}

		self.getApp().request({
			url: self.getApp().api.default.navbar,
			success: (res) => {
				//console.log(res)
				if (res.code == 0) {
					setNavbar(res.data);
					uni.setStorageSync('_navbar', res.data);
					_this.setPageClasses();
				}
			}
		});

		function setNavbar(navbar) {
			let route = self.route;
			//#ifdef MP-WEIXIN
			route = self.__route__;
			//#endif
			var in_navs = false;
			for (var i in navbar.navs) {
				var url = navbar.navs[i].url;
				// var route = route || (self.__route__ || null);
				if (navbar.navs[i].params) {
					url = navbar.navs[i].new_url;
					for (var key in self.options) {
						if (route.indexOf('?') == -1) {
							route += '?';
						} else {
							route += '&';
						}
						route += key + '=' + self.options[key];
					}
				}
				if (url === "/" + route) {
					navbar.navs[i].active = true;
					in_navs = true;
				} else {
					navbar.navs[i].active = false;
				}
			}
			if (!in_navs)
				return;
			self.setData({
				_navbar: navbar
			});
		}

	},

	setPageClasses: function() {
		var self = this.currentPage;
		var device = self.__device || '';
		//console.log('000')
		var classes = device;
		if (self.$data._navbar && self.$data._navbar.navs && self.$data._navbar.navs.length > 0) {
			classes += ' show_navbar';
		}
		if (classes) {
			self.setData({
				__page_classes: classes,
			});
		}
	},

	showLoading: function(e) {
		var self = this.currentPage;
		self.setData({
			_loading: true
		});
	},

	hideLoading: function(e) {
		var self = this.currentPage;
		self.setData({
			_loading: false
		});
	},

	setTimeList: function(reset_time) {
		// 补零
		function fillZero(time) {
			if (time <= 0) {
				time = 0;
			}
			return time < 10 ? '0' + time : time;
		}

		var _s = '00';
		var _m = '00';
		var _h = '00';
		var _d = 0;
		if (reset_time >= 86400) {
			_d = parseInt(reset_time / 86400);
			reset_time = reset_time % 86400;
		}
		if (reset_time < 86400) {
			_h = parseInt(reset_time / 3600);
			reset_time = reset_time % 3600;
		}
		if (reset_time < 3600) {
			_m = parseInt(reset_time / 60);
			reset_time = reset_time % 60;
		}

		if (reset_time < 60) {
			_s = reset_time;
		}
		return {
			d: _d,
			h: fillZero(_h),
			m: fillZero(_m),
			s: fillZero(_s)
		}
	},

	setBarTitle: function(e) {
		var route = this.currentPage.route;
		var list = uni.getStorageSync(this.currentPage.getApp().const.WX_BAR_TITLE);
		for (var i in list) {
			if (list[i].url === route) {
				uni.setNavigationBarTitle({
					title: list[i].title,
				})
			}
		}
	},

	getNavigationBarColor: function() {
		var app = this.currentPage.getApp();
		var _this = this;
		var navigation_bar_color = uni.getStorageSync(app.const.NAVIGATION_BAR_COLOR);
		if (navigation_bar_color) {
			uni.setNavigationBarColor(navigation_bar_color);
			return
		}
		app.request({
			url: app.api.default.navigation_bar_color,
			success: (res) => {
				if (res.code == 0) {
					app.core.setStorageSync(app.const.NAVIGATION_BAR_COLOR, res.data);
					_this.setNavigationBarColor();
					//实现不了
					// if (app.navigateBarColorCall && typeof app.navigateBarColorCall == 'function') {
					//     app.navigateBarColorCall(res);
					// }
				}
			}
		});
	},

	setNavigationBarColor: function() {
		let self = this.currentPage;
		var navigation_bar_color = uni.getStorageSync(self.getApp().const.NAVIGATION_BAR_COLOR);
		if (navigation_bar_color) {
			uni.setNavigationBarColor(navigation_bar_color);
		}
		//实现不了
		// getApp().navigateBarColorCall = function(res) {
		//     getApp().core.setNavigationBarColor(res.data);
		// }
	},

	navigatorClick: function(e, self) {
		var open_type = e.currentTarget.dataset.open_type;
		if (open_type == 'redirect') {
			return true;
		}
		if (open_type == 'wxapp') {
			return;
		}
		if (open_type == 'tel') {
			var contact_tel = e.currentTarget.dataset.tel;
			self.getApp().core.makePhoneCall({
				phoneNumber: contact_tel
			})
		}
		return false;

		function parseQueryString(url) {
			var reg_url = /^[^\?]+\?([\w\W]+)$/,
				reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
				arr_url = reg_url.exec(url),
				ret = {};
			if (arr_url && arr_url[1]) {
				var str_para = arr_url[1],
					result;
				while ((result = reg_para.exec(str_para)) != null) {
					ret[result[1]] = result[2];
				}
			}
			return ret;
		}
	},
	// 记录分享次数
	recordShare: function(self) {
		//console.log('调用记录')
		var app = getApp();
		app.request({
			url: app.api.default.record_share,
			success: function(res) {
				if (res.code == 0) {
					//console.log('成功')
				}
			}
		});
	},
	/**
	 * 分享送优惠券
	 */
	shareSendCoupon: function(self) {

		var app = self.getApp();
		uni.showLoading({
			mask: true,
		});
		if (!self.hideGetCoupon) {
			self.hideGetCoupon = function(e) {
				var url = e.currentTarget.dataset.url || false;
				self.setData({
					get_coupon_list: null,
				});
				if (url) {
					uni.navigateTo({
						url: url,
					});
				}
			};
		}
		app.request({
			url: app.api.coupon.share_send,
			success: function(res) {
				if (res.code == 0) {
					self.setData({
						get_coupon_list: res.data.list
					});
				}
			},
			complete: function() {
				app.core.hideLoading();
			}
		});
	},

	/**
	 * 绑定上下级关系
	 */
	bindParent: function(object) {
		var app = this.currentPage.getApp();
		let self = this.currentPage;
		if (object.parent_id == "undefined" || object.parent_id == 0)
			return;
		var user_info = self.getApp().getUser();
		var share_setting = uni.getStorageSync(self.getApp().const.SHARE_SETTING);
		if (share_setting.level > 0) {
			var parent_id = object.parent_id;
			if (parent_id != 0) {
				self.getApp().request({
					url: app.api.share.bind_parent,
					data: {
						parent_id: object.parent_id,
						condition: object.condition
					},
					success: function(res) {
						if (res.code == 0) {
							user_info.parent = res.data
							app.setUser(user_info);
						}
					}
				});
			}
		}
	},

	_setFormIdSubmit: function(e) {
		let self = this.currentPage;
		if (self._formIdSubmit) {
			return;
		}
		self._formIdSubmit = function(e) {
			let dataset = e.currentTarget.dataset;
			let form_id = e.detail.formId;
			let bind = dataset.bind || null;
			let type = dataset.type || null;
			let url = dataset.url || null;

			// 保存formId
			{
				let form_id_list = uni.getStorageSync(self.getApp().const.FORM_ID_LIST);
				if (!form_id_list || !form_id_list.length) {
					form_id_list = [];
				}

				var oldFormId = [];
				for (var wf in form_id_list) {
					oldFormId.push(form_id_list[wf]['form_id']);
				}

				//重复的formId不添加
				if ('the formId is a mock one' !== form_id && !helper.inArray(form_id, oldFormId)) {
					form_id_list.push({
						time: helper.time(),
						form_id: form_id,
					});

					uni.setStorageSync(self.getApp().const.FORM_ID_LIST, form_id_list);
				}
			}

			// 调用自定义事件function
			if (self[bind] && typeof self[bind] === 'function') {
				self[bind](e);
			}

			// 页面跳转
			switch (type) {
				case 'navigate':
					if (url)
						uni.navigateTo({
							url: url,
						});
					break;
				case 'redirect':
					if (url)
						uni.redirectTo({
							url: url,
						});
					break;
				case 'switchTab':
					if (url)
						uni.switchTab({
							url: url,
						});
					break;
				case 'reLaunch':
					if (url)
						uni.reLaunch({
							url: url,
						});
					break;
				case 'navigateBack':
					if (url)
						uni.navigateBack({
							url: url,
						});
					break;
				default:
					break;
			}
		};

	},

	modalClose: function(e) {
		var self = this.currentPage;
		self.setData({
			modal_show: false
		});

	},

	modalConfirm: function(e) {
		var self = this.currentPage;
		self.setData({
			modal_show: false
		});

	},

	modalShow: function(e) {
		var self = this.currentPage;
		self.setData({
			modal_show: true
		});

	},


	getUserInfo: function(res) {
		var _this = this;
		if (res.detail.errMsg != 'getUserInfo:ok') {
			return;
		}
		uni.login({
			success: (login_res) => {
				var code = login_res.code;
				_this.unionLogin({
					code: code,
					user_info: res.detail.rawData,
					encrypted_data: res.detail.encryptedData,
					iv: res.detail.iv,
					signature: res.detail.signature
				});
			},
			fail: function(res) {},
		});

	},

	//支付宝小程序登录
	myLogin: function() {
		//console.log('支付宝登录，此方法是core/page.js-myLogin');
		//var _this = this;
		// if (getApp().platform !== 'my')
		//     return;

		// if (getApp().globalData.login_complete) {
		//     return;
		// }
		// getApp().globalData.login_complete = true;
		// my.getAuthCode({
		//     scopes: 'auth_user',
		//     success: function(res) {
		//         _this.unionLogin({
		//             code: res.authCode
		//         });
		//     },
		//     fail: function(res) {
		//         getApp().login_complete = false;
		//         getApp().core.redirectTo({
		//             url: '/pages/index/index'
		//         });
		//     }
		// });
	},

	unionLogin: function(data) {
		//console.log('page.js login');
		var self = this.currentPage;
		var _this = this;
		uni.showLoading({
			title: "正在登录",
			mask: true,
		});
		self.getApp().request({
			url: self.getApp().api.passport.login,
			method: 'POST',
			data: data,
			success: function(res) {
				if (res.code == 0) {
					self.setData({
						__user_info: res.data
					});
					self.getApp().setUser(res.data);
					uni.setStorageSync(self.getApp().const.ACCESS_TOKEN, res.data.access_token);
					self.getApp().trigger.run(self.getApp().trigger.events.login);
					_this.setMchInfo(true);

					var store = uni.getStorageSync(self.getApp().const.STORE);
					if (res.data.binding || (!store.option || !store.option.phone_auth) || (store.option.phone_auth && store.option
							.phone_auth == 0)) {
						_this.loadRoute();
					} else {
						if (typeof uni === 'undefined') {
							_this.loadRoute();
						}
						_this.setPhone();
					}
					_this.setUserInfoShowFalse();
				} else {
					getApp().globalData.login_complete = false;
					uni.showModal({
						title: '提示',
						content: res.msg,
						showCancel: false,
					});
				}
			},
			complete: function() {
				uni.hideLoading();
			}
		});
	},


	getPhoneNumber: function(e) {
		var self = this.currentPage;
		var _this = this;
		if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
			uni.showModal({
				title: '提示',
				showCancel: false,
				content: '未授权',
			})
		} else {
			uni.showLoading({
				title: '授权中',
			});
			uni.login({
				success: function(res) {
					if (res.code) {
						var code = res.code;
						self.getApp().request({
							url: self.getApp().api.user.user_binding,
							method: 'POST',
							data: {
								iv: e.detail.iv,
								encryptedData: e.detail.encryptedData,
								code: code,
							},
							success: function(res) {
								if (res.code == 0) {
									var user_info = self.data.__user_info;
									user_info.binding = res.data.dataObj;

									self.getApp().setUser(user_info);

									self.setData({
										PhoneNumber: res.data.dataObj,
										__user_info: user_info,
										binding: true,
										binding_num: res.data.dataObj
									});
									_this.loadRoute();
								} else {
									uni.showToast({
										title: '授权失败,请重试'
									});
								}
							},
							complete: function(res) {
								uni.hideLoading();
							}
						});
					} else {
						uni.showToast({
							title: '获取用户登录态失败！' + res.errMsg,
						});
					}
				},
			});
		}
	},
	setUserInfoShow: function() {
		var self = this.currentPage;
		if (getApp().platform == 'wx') {
			self.setData({
				user_info_show: true
			});
		} else {
			this.myLogin();
		}
	},
	cancleLogin: function() {
		var _this = this;
		_this.setUserInfoShowFalse();
	},
	setPhone: function() {
		var self = this.currentPage;
		if (typeof my === 'undefined') {
			self.setData({
				user_bind_show: true
			});
		}
	},
	setUserInfoShowFalse: function() {
		var self = this.currentPage;
		self.setData({
			user_info_show: false,
			showGetLogin: false
		});
	},

	closeCouponBox: function(e) {
		var self = this.currentPage;
		self.setData({
			get_coupon_list: ""
		});
	},

	// 关联公众号组件加载成功
	relevanceSuccess: function(e) {

	},

	// 关联公众号组件加载失败
	relevanceError: function(e) {

	},

	setOfficalAccount: function(e) {
		var self = this.currentPage;
		self.setData({
			__is_offical_account: true
		});
	},
	loadRoute: function() {
		//var self = this.currentPage;
		var _this = this;
		let page = getCurrentPages();
		let self = page[page.length - 1];
		//#ifdef MP-WEIXIN || APP-PLUS
		self = page[page.length - 1].$vm;
		//#endif
		var route = self.route;
		//#ifdef MP-WEIXIN
		route = self.__route__;
		//#endif


		uni.redirectTo({
			url: '/' + route + '?' + helper.objectToUrlParams(self.options),
		});
		// if (self.route == 'pages/index/index') {} else {
		//     getApp().core.redirectTo({
		//         url: '/' + self.route + '?' + getApp().helper.objectToUrlParams(self.options),
		//     });
		// }
		_this.setUserInfoShowFalse();
	},
	// 根据sid从服务端获取 分享信息
	getServerShareInfo: function(options, callback) {
		var self = this.currentPage;
		self.getApp().core.request({
			url: self.getApp().api.default.get_share_info,
			data: {
				sid: options.sid
			},
			success: function(res) {
				res = res.data;
				if (res.code == 0) {
					options.mch_id = res.data.mch_id
					options.abc = {
						parent_id: res.data.user_id,
						store_id: res.data.store_id,
						store_group_id: res.data.store_group_id,
						mch_id: res.data.mch_id
					};
					self.setData({
						parent_id: res.data.user_id,
						store_id: res.data.store_id,
						store_group_id: res.data.store_group_id,
					})
					// console.log('parent_id', res.data.user_id);
					callback(options);
				} else {
					wx.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			}
		})
	}
};
