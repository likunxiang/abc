// var app = page[page.length-1].getApp();

function setOnShowScene(scene) {
	let page = getCurrentPages();
	let self = page[page.length - 1]
	//#ifdef MP-WEIXIN  || APP-PLUS
	self = page[page.length - 1].$vm
	//#endif
	if (!self.$store.state.onShowData)
		self.$store.state.onShowData = {};
	self.$store.state.onShowData['scene'] = scene;
}

var pay = {
	init: function(page) {
		let self = page; //页面对象
		var _this = this;
		var api = self.getApp().api;




		// 可能成为上级的用户ID
		var parentUserId = uni.getStorageSync(self.getApp().const.PARENT_ID);
		if (!parentUserId) {
			parentUserId = 0;
		}

		//订单列表的订单支付
		self.orderPay = function(e) {

			var index = e.currentTarget.dataset.index;
			var order_list = self.order_list;
			var order = order_list[index];
			var pay_type_list = new Array();
			if (typeof self.pay_type_list !== 'undefined') {
				pay_type_list = self.pay_type_list;
			} else if (typeof order.pay_type_list !== 'undefined') {
				pay_type_list = order.pay_type_list;
			} else if (order.pack_list) {
				if (typeof order.pack_list[0].pay_type_list !== 'undefined') {
					pay_type_list = order.pack_list[0].pay_type_list;
				} else {
					var pp = {};
					pp['payment'] = 0
					pay_type_list.push(pp);
				}
			} else if (order.goods_list) {
				if (typeof order.goods_list[0].pay_type_list !== 'undefined') {
					pay_type_list = order.goods_list[0].pay_type_list;
				} else {
					var pp = {};
					pp['payment'] = 0
					pay_type_list.push(pp);
				}
			} else {
				var pp = {};
				pp['payment'] = 0
				pay_type_list.push(pp);
			}


			var pages = getCurrentPages();
			var new_page = pages[pages.length - 1];
			//兼容小程序 
			//#ifdef MP-WEIXIN || APP-PLUS

			new_page = pages[pages.length - 1].$vm
			//#endif
			var route = new_page.route;

			//#ifdef MP-WEIXIN
			route = new_page.__route__;
			//#endif
			//console.log('core/order-pay.js-route',route);
			var paramData = {}
			let url = null;
			if (route.indexOf('pt') != -1) {
				url = api.group.pay_data;
				paramData.order_id = order.order_id;
			} else if (route.indexOf('miaosha') != -1) {
				url = api.miaosha.pay_data;
				paramData.order_id = order.order_id;
			} else if (route.indexOf('book') != -1) {
				url = api.book.order_pay;
				paramData.id = order.id;
			} else {
				url = api.order.pay_data;
				paramData.order_id = order.order_id
				var order_id = order.order_id
			}

			paramData.parent_id = parentUserId; // TODO 从缓存中获取
			paramData.condition = 2; //首次付款
			if (pay_type_list.length == 1) {
				uni.showLoading({
					title: "正在提交",
					mask: true,
				});
				if (pay_type_list[0]['payment'] == 0) {
					WechatPay(paramData, url, route);
				}
				if (pay_type_list[0]['payment'] == 3) {
					BalancePay(paramData, url, route);
				}
			} else {
				WechatPay(paramData, url, route);
				// uni.showModal({
				//     title: '提示',
				//     content: '选择支付方式',
				//     cancelText: '余额支付',
				//     confirmText: '线上支付',
				//     success: function(res) {
				//         if (res.confirm) {
				//             uni.showLoading({
				//                 title: "正在提交",
				//                 mask: true,
				//             });
				//             WechatPay(paramData, url, route);
				//         } else if (res.cancel) {
				//             BalancePay(paramData, url, route);
				//         }
				//     }
				// })
			}

			function WechatPay(paramData, url, route) {
				paramData.pay_type = "WECHAT_PAY";
				self.getApp().request({
					url: url,
					data: paramData,
					complete: function() {
						uni.hideLoading();
					},
					success: function(res) {
						if (res.code == 0) {
							setOnShowScene('pay');
							uni.requestPayment({
								_res: res,
								timeStamp: res.data.timeStamp,
								nonceStr: res.data.nonceStr,
								package: res.data.package,
								signType: res.data.signType,
								paySign: res.data.paySign,
								success: function(e) {
									console.log('成功回调', e);
								},
								fail: function(e) {
									console.log('失败回调', e);
								},
								complete: function(e) {
									if (e.errMsg == "requestPayment:fail" || e.errMsg == "requestPayment:fail cancel") { //支付失败转到待支付订单列表
										uni.showModal({
											title: "提示",
											content: "订单尚未支付",
											showCancel: false,
											confirmText: "确认",
											success: function(res) {
												if (res.confirm) {
													uni.redirectTo({
														url: "/" + route + "?status=0",
													});
												}
											}
										});
										return;
									}
									route = "/pages/paySucceed/paySucceed";
									route = route + '?oid=' + order_id;
									uni.redirectTo({
										url: route,
									});
								},
							});
						}
						if (res.code == 1) {
							uni.showToast({
								title: res.msg,
								image: "/images/icon-warning.png",
							});
						}

					}
				});
			}

			function BalancePay(paramData, url, route) {
				paramData.pay_type = "BALANCE_PAY";
				var user_info = self.getApp().getUser();
				uni.showModal({
					title: '当前账户余额：' + user_info.money,
					content: '是否使用余额',
					success: function(e) {
						if (e.confirm) {
							uni.showLoading({
								title: "正在提交",
								mask: true,
							});
							self.getApp().request({
								url: url,
								data: paramData,
								complete: function() {
									uni.hideLoading();
								},
								success: function(res) {
									if (res.code == 0) {
										uni.redirectTo({
											url: "/" + route + "?status=1",
										});
									}
									if (res.code == 1) {
										uni.showModal({
											title: '提示',
											content: res.msg,
											showCancel: false
										})
									}
								}
							});
						}
					}
				})
			}
		};


		//订单支付
		self.order_submit = function(data, order_type) {
			var url_submit = api.order.submit;
			var url_pay_data = api.order.pay_data;
			var route = "/pages/order/order";
			if (order_type == 'pt') {
				url_submit = api.order.new_submit;
				url_pay_data = api.order.pay_data;
				route = "/pages/pt/group/details";
			} else if (order_type == 'ms') {
				url_submit = api.miaosha.submit;
				url_pay_data = api.miaosha.pay_data
				// route = "/pages/miaosha/order/order";
			} else if (order_type == 'pond') {
				url_submit = api.pond.submit;
				url_pay_data = api.order.pay_data;
				route = "/pages/order/order";
			} else if (order_type == 'scratch') {
				url_submit = api.scratch.submit;
				url_pay_data = api.order.pay_data;
				route = "/pages/order/order";
			} else if (order_type == 'lottery') {
				url_submit = api.lottery.submit;
				url_pay_data = api.order.pay_data;
				route = "/pages/order/order";
			} else if (order_type == 'step') {
				url_submit = api.step.submit;
				url_pay_data = api.order.pay_data;
				route = "/pages/order/order";
			} else if (order_type == 's') {
				console.log(order_type);
				url_submit = api.order.new_submit;
				url_pay_data = api.order.pay_data;
				route = "/pages/order/order";
			}
			// else if (order_type == 'vip') {
			// 	url_submit = api.default.vip_buy_order;
			// 	// url_pay_data = api.default.vip_pay_data;
			// }

			if (data.payment == 3) {
				var user_info = self.getApp().getUser();
				uni.showModal({
					title: '当前账户余额：' + user_info.money,
					content: '是否确定使用余额支付',
					success: function(e) {
						if (e.confirm) {
							submit_pay();
						}
					}
				})
			} else {
				submit_pay();
			}

			function submit_pay() {
				uni.showLoading({
					title: "正在提交",
					mask: true,
				});
				//console.log('提交订单提交的数据',data)
				//提交订单
				self.getApp().request({
					url: url_submit,
					method: "post",
					data: data,
					success: function(res) {
						//console.log('提交订单返回数据',res)
						if (res.code == 0) {
							self.getApp().page.bindParent({
								parent_id: parentUserId, // TODO 从缓存中获取
								condition: 1, //首次下单
							})

							if (res.data.p_price != undefined && res.data.p_price === 0) {
								if (order_type == 'step') {
									uni.showToast({
										title: "兑换成功",
									});
								} else {
									uni.showToast({
										title: "提交成功",
									});
								}

								setTimeout(function() {
									uni.redirectTo({
										url: "/pages/order/order?status=1",
									});
								}, 2000);



								return;
							}
							setTimeout(function() {
								self.setData({
									options: {},
								});
							}, 1);
							var order_id = res.data.order_id || '';
							var order_id_list = res.data.order_id_list ? JSON.stringify(res.data.order_id_list) : '';
							route = route + '?oid=' + order_id;
							console.log(route);
							var pay_type = '';
							//获取支付数据
							if (data.payment == 0) {
								self.getApp().request({
									url: url_pay_data,
									data: {
										order_id: order_id,
										order_id_list: order_id_list,
										pay_type: 'WECHAT_PAY',
										parent_user_id: parentUserId, // TODO 从缓存中获取
										condition: 2, //首次付款
									},
									success: function(res) {
										//console.log(' order_id', order_id,'order_id_list',order_id_list,'parent_user_id',parentUserId,'condition',2)

										if (res.code == 0) {
											setTimeout(function() {
												uni.hideLoading();
											}, 1000);
											setOnShowScene('pay');
											if (res.data && res.data.price == 0) {
												//lqqq
												if (typeof self.goods_card_list !== 'undefined' && self.goods_card_list.length > 0) {
													self.setData({
														show_card: true
													});
												} else {
													route = "/pages/paySucceed/paySucceed";
													route = route + '?oid=' + order_id;
													uni.redirectTo({
														url: route,
													});
												}
											} else {
												//发起支付
												uni.requestPayment({
													_res: res,
													timeStamp: res.data.timeStamp,
													nonceStr: res.data.nonceStr,
													package: res.data.package,
													signType: res.data.signType,
													paySign: res.data.paySign,
													success: function(e) {},
													fail: function(e) {},
													complete: function(e) {
														if (e.errMsg == "requestPayment:fail" || e.errMsg == "requestPayment:fail cancel") { //支付失败转到待支付订单列表
															uni.showModal({
																title: "提示",
																content: "订单尚未支付",
																showCancel: false,
																confirmText: "确认",
																success: function(res) {
																	if (res.confirm) {
																		uni.redirectTo({
																			url: route + "?status=0",
																		});
																	}
																}
															});
															return;
														}
														if (e.errMsg == "requestPayment:ok") {
															if (typeof self.$data.goods_card_list !== 'undefined' && self.$data.goods_card_list.length >
																0) {
																self.setData({
																	show_card: true
																});
															} else {
																if (order_type == 'pt') {
																	if (self.$data.type == 'ONLY_BUY') {
																		uni.redirectTo({
																			url: route + "?status=2",
																		});
																	} else {
																		uni.redirectTo({
																			url: "/pages/pt/group/details?oid=" + order_id,
																		});
																	}
																} else {
																	route = "/pages/paySucceed/paySucceed";
																	route = route + '?oid=' + order_id;
																	console.log(route);
																	uni.redirectTo({
																		url: route,
																	});
																}
															}
															return;
														}
													},
												});

											}

											var quick_list = uni.getStorageSync(self.getApp().const.QUICK_LIST)
											if (quick_list) {
												var length = quick_list.length;
												for (var i = 0; i < length; i++) {
													var goods = quick_list[i]['goods'];
													var length2 = goods.length;
													for (var a = 0; a < length2; a++) {
														goods[a]['num'] = 0;
													}
												}
												uni.setStorageSync(self.getApp().const.QUICK_LISTS, quick_list)

												var carGoods = uni.getStorageSync(self.getApp().const.CARGOODS)
												var length = carGoods.length;
												for (var i = 0; i < length; i++) {
													carGoods[i]['num'] = 0;
													carGoods[i]['goods_price'] = 0;
													self.setData({
														'carGoods': carGoods
													});
												}
												uni.setStorageSync(self.getApp().const.CARGOODS, carGoods)

												var total = uni.getStorageSync(self.getApp().const.TOTAL)
												if (total) {
													total.total_num = 0;
													total.total_price = 0;
													uni.setStorageSync(self.getApp().const.TOTAL, total)
												}

												var check_num = uni.getStorageSync(self.getApp().const.CHECK_NUM)
												check_num = 0;
												uni.setStorageSync(self.getApp().const.CHECK_NUM, check_num)

												var quick_hot_goods_lists = uni.getStorageSync(self.getApp().const.QUICK_HOT_GOODS_LISTS)
												var length = quick_hot_goods_lists.length;
												for (var i = 0; i < length; i++) {
													quick_hot_goods_lists[i]['num'] = 0;
													self.setData({
														'quick_hot_goods_lists': quick_hot_goods_lists
													});
												}
												uni.setStorageSync(self.getApp().const.QUICK_HOT_GOODS_LISTS, quick_hot_goods_lists)
											}
											return;
										}

										if (res.code == 1) {
											uni.hideLoading();
											uni.showToast({
												title: res.msg,
												icon: 'none'
											});
											return;
										}
									}
								});
							} else if (data.payment == 2) {
								pay_type = 'HUODAO_PAY';
								pay()
							} else if (data.payment == 3) {
								pay_type = 'BALANCE_PAY';
								pay()
							}

							function pay() {
								self.getApp().request({
									url: url_pay_data,
									data: {
										order_id: order_id,
										order_id_list: order_id_list,
										pay_type: pay_type,
										form_id: data.formId,
										parent_user_id: parentUserId, // TODO 从缓存中获取
										condition: 2, //首次付款
									},
									success: function(res) {
										if (res.code == 0) {
											setTimeout(function() {
												uni.hideLoading();
											}, 1000);
											if (order_type == 'pt') {
												if (self.type == 'ONLY_BUY') {
													uni.redirectTo({
														url: route + "?status=2",
													});
												} else {
													uni.redirectTo({
														url: "/pages/pt/group/details?oid=" + order_id,
													});
												}
											} else {
												if (typeof self.$data.goods_card_list !== 'undefined' && self.$data.goods_card_list.length > 0 &&
													data.payment != 2) {
													self.setData({
														show_card: true
													});
												} else {
													uni.redirectTo({
														url: route + "?status=-1",
													});
												}
											}
										} else {
											uni.hideLoading();
											uni.showModal({
												title: "提示",
												content: res.msg,
												showCancel: false,
												confirmText: "确认",
												success: function(res) {
													if (res.confirm) {
														uni.redirectTo({
															url: route + "?status=0",
														});
													}
												}
											});
											return;
										}
									}

								});
							}
						}
						if (res.code == 1) {
							uni.hideLoading();
							uni.showModal({
								title: "提示",
								content: res.msg,
								showCancel: false,
								confirmText: "确认",
								success: function(res) {
									if (res.confirm) {
										if (self.getOrderData) {
											self.getOrderData(self.edit_mch_list)
										}
									}
								}
							});
							return;
						}
					}
				});
			}
		}
	},
};
module.exports = pay;
