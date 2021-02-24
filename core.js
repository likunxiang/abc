import store from './store'
export default {
	init: (Vue) => {
		//混入setData
		Vue.mixin({
			methods: {
				setData: function(obj, callback) {
					let that = this;
					const handleData = (tepData, tepKey, afterKey) => {
						tepKey = tepKey.split('.');
						tepKey.forEach(item => {
							if (tepData[item] === null || tepData[item] === undefined) {
								let reg = /^[0-9]+$/;
								tepData[item] = reg.test(afterKey) ? [] : {};
								tepData = tepData[item];
							} else {
								tepData = tepData[item];
							}
						});
						return tepData;
					};
					const isFn = function(value) {
						return typeof value == 'function' || false;
					};
					Object.keys(obj).forEach(function(key) {
						let val = obj[key];
						key = key.replace(/\]/g, '').replace(/\[/g, '.');
						let front, after;
						let index_after = key.lastIndexOf('.');
						if (index_after != -1) {
							after = key.slice(index_after + 1);
							front = handleData(that, key.slice(0, index_after), after);
						} else {
							after = key;
							front = that;
						}
						if (front.$data && front.$data[after] === undefined) {
							Object.defineProperty(front, after, {
								get() {
									return front.$data[after];
								},
								set(newValue) {
									front.$data[after] = newValue;
									that.$forceUpdate();
								},
								enumerable: true,
								configurable: true
							});
							front[after] = val;
						} else {
							that.$set(front, after, val);
						}
					});
					// this.$forceUpdate();
					isFn(callback) && this.$nextTick(callback);
				}
			},
			computed: {
				role_: function() {
					let that = this;
					return that.$store.state.role_;
				},
				init_img: function() {
					let that = this;
					return that.$store.state.init_img;
				},
				mch_info_: function() {
					let that = this;
					return that.$store.state.mch_info_;
				},
				commission_show: function() {
					let that = this;
					return that.$store.state.show_commission
				},
				APP: function() {
					return envInfo.app || 'qinpu';
				},
				max_key: function() {
					let that = this;
					return that.$store.getters.get_max_key;
				}
			}
		});
		Vue.prototype.pageRoute = () => {
			// console.log('3333333333333',getCurrentPages())
			// return 
			// return 'pages/index/index'
			let page = getCurrentPages();
			var route = '';
			//#ifdef MP-WEIXIN
			route = page[page.length - 1].$vm.__route__;
			//#endif ;
			//#ifdef APP-PLUS || H5
			route = page[page.length - 1].route;
			// TODO
			//#endif
			return route
		}


		//绑定API
		let api = require('./core/api.js')

		//绑定const
		let const1 = require('./core/const.js')

		//绑定getUser
		let getUser = require('./core/getUser.js')

		//绑定setUser
		let setUser = require('./core/setUser.js')

		//绑定trigger
		let trigger = require('./core/trigger.js')

		//绑定core
		let core = require('./core/core.js')

		//绑定test
		let test = require('./core/test.js')

		// //绑定config
		let config = require('./core/config.js')

		//绑定request
		let request = require('./core/request.js')

		//绑定服务器信息
		let envInfo = require('./siteinfo.js')

		//绑定展示登录弹窗
		let login = require('./core/login.js')

		//
		// let ald = require('./utils/ald-stat.js')

		//
		let helper = require('./utils/helper.js')

		//
		let page = require('./core/page.js')

		//
		let orderPay = require('./core/order-pay.js')

		//设置初始值
		let getStoreData = function(options, self) {

			// let _url = api.default.store.replace(api._api_root,'/api8/')
			let _url = api.default.store
			// console.log("api._api_root999999999999999999999",_url)
			uni.request({
				url: _url,
				header: {
					'mch-id': getMchId(options, self)
				},
				success: function(res) {
					// console.log(res)
					if (res.data) {
						if (res.data.code == 0) {

							uni.setStorageSync(const1.STORE, res.data.data.store);
							uni.setStorageSync(const1.STORE_NAME, res.data.data.store_name);
							uni.setStorageSync(const1.SHOW_CUSTOMER_SERVICE, res.data.data.show_customer_service);
							uni.setStorageSync(const1.CONTACT_TEL, res.data.data.contact_tel);
							uni.setStorageSync(const1.SHARE_SETTING, res.data.data.share_setting);
							//app.permission_list = res.data.data.permission_list;
							uni.setStorageSync(const1.WXAPP_IMG, res.data.data.wxapp_img);
							uni.setStorageSync(const1.WX_BAR_TITLE, res.data.data.wx_bar_title);
							uni.setStorageSync(const1.ALIPAY_MP_CONFIG, res.data.data.alipay_mp_config);
							uni.setStorageSync(const1.STORE_CONFIG, res.data.data);
							setTimeout(function(e) {
								getApp().globalData.config = res.data.data;
								// if (app.configReadyCall) {
								// 	app.configReadyCall(res.data.data);
								// }
							}, 1000)
						}
					}
				},
				complete: function() {
					//page.login();
				}
			});
			uni.request({
				url: api.default.merchants,
				header: {
					version: envInfo.version || ''
				},
				success: (res) => {
					// const updateManager = uni.getUpdateManager();
					// uni.showModal({
					// 	title: '更新提示',
					// 	content: '新版本已经准备好，是否立即体验？',
					// 	success(res) {
					// 		if (res.confirm) {
					// 			// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
					// 			console.log('更新');
					// 			updateManager.applyUpdate();
					// 		}
					// 	}
					// });
					if (res.data && res.data.data && res.data.data.init_img) {

						self.$store.commit('vuexSet', {
							name: 'init_img',
							value: res.data.data.init_img || {}
						});
						self.$store.commit('vuexSet', {
							name: 'init_appid',
							value: res.data.data.init_appid || {}
						});
						uni.setStorageSync('_img', res.data.data.init_img || {});
						uni.setStorageSync('init_appid', res.data.data.init_appid || {});
					}

				}
			});
		}
		///////////////////////////////////////
		let getMchId = function(options, self) {
			var app = self;

			var current_mchid = '';
			if (options && options.mch_id) {
				current_mchid = options.mch_id;
			} else if (app.$store.state.mch_id) {
				current_mchid = app.$store.state.mch_id;
			} else if (uni.getStorageSync('_mchInfo').id) {
				current_mchid = uni.getStorageSync('_mchInfo').id;
			} else if (options && options.scene && isNaN(options.scene)) {
				//console.log(options.scene)
				var scene = decodeURIComponent(options.scene);
				if (scene) {
					scene = app.helper.scene_decode(scene);
					if (scene && scene.mch_id) {
						current_mchid = scene.mch_id
					}
				}
			}
			return current_mchid;
		};
		////////////////////////////////////////////////////////////////////////

		var _web_root = api.index.substr(0, api.index.indexOf('/index.php'));
		let webRoot = _web_root;
		let getauth = function(object) {
			//var app = this;

			uni.getSetting({
				success: (res) => {
					//console.log('success', res)
					if (typeof res.authSetting[object.author] === 'undefined') {
						uni.authorize({
							scope: object.author,
							success: (res) => {
								if (object.success) {
									object.success(res);
								}
							}
						});
					} else if (res.authSetting[object.author] == false) {
						uni.showModal({
							title: '是否打开设置页面重新授权',
							content: object.content,
							confirmText: '去设置',
							success: (e) => {
								if (e.confirm) {
									uni.openSetting({
										success: (res) => {
											if (object.success) {
												object.success(res);
											}
										},
										fail: (res) => {
											if (object.fail) {
												object.fail(res);
											}
										},
										complete: function(res) {
											if (object.complete) object.complete(res);
										}
									});
								} else {
									if (object.cancel) {
										getauth(object);
									}
								}
							}
						});
					} else {
						if (object.success) {
							object.success(res);
						}
					}
				}
			});
		};
		///////////////////////////////////////////////////////////////////////////////////////////
		Vue.prototype.getApp = () => {
			return {
				api,
				const: const1,
				getUser,
				setUser,
				trigger,
				core,
				getConfig: config,
				getStoreData,
				getauth,
				envInfo,
				login,
				test,
				request,
				helper,
				page,
				orderPay,
				// ald
			}
		}

		//返回上一页
		Vue.prototype.uniBack = () => {
			let page = getCurrentPages();
			if (page.length > 1) {
				uni.navigateBack({
					delta: 1
				});
				return;
			}
			uni.reLaunch({
				url: "/pages/index/index",
				fail() {
					uni.reLaunch({
						url: "/pages/qinUnion/qinUnion"
					})
				}
			})

		}

		//事先登录  未登录返回true 同时显示登录弹窗
		Vue.prototype.login = (type = true) => {
			if (type == false) {
				if (!uni.getStorageSync('ACCESS_TOKEN'))
					return true;
				else return false;
				return false;
			}
			let page = getCurrentPages();
			let self = page[page.length - 1];
			//#ifdef MP-WEIXIN
			self = page[page.length - 1].$vm;
			//#endif
			if (!uni.getStorageSync('ACCESS_TOKEN')) {
				self.$store.commit('vuexSet', {
					name: 'show_loginTpl',
					value: true
				}); //未登录
				return true;
			}
			return false;
		}
		Vue.prototype.downloadFile = (obj = {}) => {
			let url = obj.url || ''
			url = url.toLowerCase().trim()
			if (url.indexOf('http:') == 0) {
				url = url.replace('http:', 'https:')
			}
			obj.url = url;
			uni.downloadFile(obj)
		}

		///复制后全网搜弹窗不显示
		Vue.prototype.setClipboardData = (obj = {}) => {
			obj.complete = (rex) => {
				uni.setStorageSync('link', obj.data)
			}
			uni.setClipboardData(obj);
		}
		//////

		/////

		//公共复制方法  str：复制内容  notic：成功后提示消息 tiem：消息显示时间
		Vue.prototype.mycopy = (str = "", notice = "", time = 1500, clear = true) => {
			str = str.replace(/<(p|div)[^>]*>/gi, '\n').replace(/<br\/?>/gi, '\n').replace(/<[^>/]+>/g, '').replace(
				/(\n)?<\/([^>]+)>/g, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/<\/?(img)[^>]*>/gi, '').replace(
				/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"").replace(
				/<\/?.+?>/g, "")
			str = str.trim() || '';
			uni.setClipboardData({
				data: str,
				success: () => {
					if (notice) {
						uni.showToast({
							title: notice,
							duration: time,
							icon: 'none'
						})
					}
					if (clear) {
						uni.setStorageSync('link', str);
						console.log('复制的内容不会在本APP搜索');
					}
				}
			});
		}


		//公共节流方法
		let onoff = true;
		Vue.prototype.less = (fn, params, params2, params3, params4, params5, params6) => {
			let that = this;
			if (onoff && fn) {
				onoff = false;
				fn(params, params2, params3, params4, params5, params6)

				setTimeout(() => {
					onoff = true;
				}, 1500)
			} else {
				console.log("请稍后点击")
			}
		}

		//取小数点，不四舍五入
		Vue.prototype.xs = (value, lang) => {
			let a = parseFloat(value).toString();

			if (a == '0' || a == 'NaN') a = '0.00000000000';
			if (a.indexOf('.') == -1) a += '.';
			let index = a.indexOf('.');
			a += '00000000000';
			return a.substr(0, index + 1 + lang);
		}

		Vue.prototype.toPage = (url) => {
			uni.navigateTo({
				url: url
			})
		}

		//uni.showToast 方法重写  （弹窗内容，显示时间，icon）
		Vue.prototype.showToast = (title = "", duration = 2000, icon = "none") => {
			uni.showToast({
				title,
				icon,
				duration
			})
		}
		//延时触发函数timeOut
		Vue.prototype.timeOut = (fn, duration = 500, icon = "none") => {
			if (typeof fn == 'function') {
				setTimeout(fn, duration)
			}
		}

		Vue.prototype.getPath = (title = "", duration = 2000, icon = "none") => {
			let pages = getCurrentPages();
			let self = pages[pages.length - 1];
			//#ifdef MP-WEIXIN || APP-PLUS
			self = pages[pages.length - 1].$vm;
			return self.__route__;
			//#endif
			return self.route;
		}

		Vue.prototype.toApp = (path, appid, self = false) => {
			//本app跳转
			if (self == true) {
				uni.navigateTo({
					url: path
				});
				return;
			}
			appid = appid ? appid : (store.state.init_appid.def_qlm || 'wx92c0c6db7d6c68d7');
			// console.log(store.state.init_appid.def_qlm)
			uni.navigateToMiniProgram({
				// appId: 'wx21bb579824e96e36', 没有的话默认亲联盟
				appId: appid || 'wx92c0c6db7d6c68d7',
				path: path,
				extraData: {
					token: uni.getStorageSync('ACCESS_TOKEN') || '',
					_mchInfo: uni.getStorageSync('_mchInfo') || {}
				},
				envVersion: 'trial'
			})
		}
		
		Vue.prototype.PAGE = () => {
			let pages = getCurrentPages();
			let self = pages[pages.length - 1];
			//#ifdef MP-WEIXIN || APP-PLUS
			self = pages[pages.length - 1].$vm;
			
			//#endif
			return self;
		}
		
		Vue.prototype.sendEvent = (key='13',value={}) => {
			if (wx.aldstat && wx.aldstat.sendEvent) {
				// #ifdef MP-WEIXIN
				wx.aldstat.sendEvent(key,value)
				// #endif
			}
			
		}
	}
}
