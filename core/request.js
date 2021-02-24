/***
 * http请求
 * @param args
 */
let core = require('./core.js')
let envInfo = require('../siteinfo.js')
let login = require('./login.js')
let api = require('./api.js')

module.exports = function(object) {
	let page = getCurrentPages();
	let self = page[page.length - 1]
	//#ifdef MP-WEIXIN || APP-PLUS
	self = page[page.length - 1].$vm;
	//#endif
	let route = self.route;
	//#ifdef MP-WEIXIN 
	route = self.__route__;
	//#endif
	//#ifdef APP-PLUS
	route = page[page.length - 1].route;
	//#endif
	this.const = require('./const.js');

	if (!object.data) {
		object.data = {};
	}
	if (!object.header) {
		object.header = {
			'content-type': 'application/x-www-form-urlencoded'
		};
	}

	// let core = this.core;
	let access_token = uni.getStorageSync(this.const.ACCESS_TOKEN);
	//'P-40EkEwnsA4eh31E8xI3FeHo2x8c8m2';
	//e_X3xs-MLeP9zApCoi8PHHN8fdIuV_Uc

	let formIdList = uni.getStorageSync(this.const.FORM_ID_LIST);
	if (access_token) {
		object.header['access-token'] = access_token;
		object.data.access_token = access_token;
	}
	object.data.store_gid = envInfo.store_gid || 1;

	var mchInfo = uni.getStorageSync('_mchInfo');
	if (mchInfo) {
		object.data.mch_id = mchInfo.id || '';
		object.header['mch-id'] = object.data.mch_id || '';
	}

	if (uni.getStorageSync('promoter')) {
		object.data.promoter = uni.getStorageSync('promoter').id || ''
	} else {
		object.data.promoter = ''
	}
	object.header['store-id'] = envInfo.store_id || '';
	object.data._platform = 'wx';
	object.header.promoter = object.data.promoter;
	object.header.version = envInfo.version || '';
	object.header['store-gid'] = envInfo.store_gid || 1;

	if (!getApp().globalData.is_login) {
		getApp().globalData.is_login = true;

		login({});
	}

	var app = this;

	// 保存form_id
	if (formIdList && formIdList.length >= 1 && getApp().globalData.is_form_id_request) {
		getApp().globalData.is_form_id_request = false;
		self.getApp().request({
			url: self.getApp().api.default.form_id,
			method: 'POST',
			data: {
				formIdList: JSON.stringify(formIdList)
			},
			success: function(res) {
				uni.removeStorageSync(self.getApp().const.FORM_ID_LIST)
			},
			complete: function() {
				getApp().globalData.is_form_id_request = true;
			}
		})
	}
	////h5配置代理
	//#ifdef H5

	//object.url =  object.url.replace(api._api_root,'/api8/')
	//object.data = {}
	//object.header['content-type'] = 'multipart/form-data'
	//#endif


	///h5配置代理
	uni.request({
		url: object.url,
		header: object.header,
		data: object.data,
		method: object.method || "GET",
		dataType: object.dataType || "json",
		success: function(res) {
			//console.log('request.js-res',res)

			if (res.data && res.data.code == -1) {
				uni.hideLoading();
				//待处理
				//self.getApp().page.setUserInfoShow();
				if (route != 'private/submitMaterial/submitMaterial') {
					uni.setStorageSync('ACCESS_TOKEN', '');
				}
				///未登录而且需要有弹窗
				if (route == 'pages/index/index' || route == 'pages/guanyiguan/guanyiguan' || route ==
					'pages/goods/goods' || route == 'pages/groupGoods/groupGoods' || route == 'pages/pt/details/details' ||
					route == 'pages/miaosha/details/details' || route == 'pages/cart/cart' || route == 'pages/newSearch/newSearch' ||
					route == 'private/submitMaterial/submitMaterial') {} else {

					self.$store.commit('vuexSet', {
						name: 'show_loginTpl',
						value: true
					}); //未登录
				}
				///未登录而且需要有弹窗
				getApp().globalData.is_login = false;
			} else if (res.data.code == -2) {
				uni.redirectTo({
					url: '/pages2/store-disabled/store-disabled',
				})
			} else {

				if (object.success)
					object.success(res.data);
			}
		},
		fail: function(res) {
			if (object && object.noHandlerFail) {
				if (typeof object.fail === 'function' && res.data) {
					object.fail(res.data);
				}
				return;
			}
			uni.showToast({
				title: '暂时失联，请确保网络连接正确后重新进入',
				icon:'none',
				duration:2000
			});
			if (object.fail)
				object.fail(res);
		},
		complete: function(res) {
			if (res.statusCode != 200) {
				if (res.data && res.data.code && res.data.code == 500) {
					var sort_msg = res.data.data.message;
					core.showModal({
						title: '系统错误',
						content: sort_msg + ";\r\n请将错误内容复制发送给我们，以便进行问题追踪。",
						cancelText: '关闭',
						confirmText: '复制',
						success: function(e) {
							if (e.confirm) {
								core.setClipboardData({
									data: JSON.stringify({
										data: res.data.data,
										object: object,
									}),
								});
							}
						},
					});
				}
			}
			if (object.complete)
				object.complete(res);
		}
	});
};
