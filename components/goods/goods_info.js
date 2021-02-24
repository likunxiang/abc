module.exports = {
	currentPage: null,
	/**
	 * 注意！注意！！注意！！！
	 * 由于组件的通用，部分变量名称需统一，在各自引用的xxx.js文件需定义，并给对应变量赋相应的值
	 * 以下变量必须定义并赋值
	 * 
	 * hide 视频组件隐藏
	 * goods.service_list 商品服务列表
	 * sales_volume 销量
	 * min_price    商品价格
	 * 持续补充...
	 */
	init: function(self) {
		var _this = this;
		_this.currentPage = self;

		if (typeof self.showShareModal === 'undefined') {
			self.showShareModal = function(e) {
				_this.showShareModal(e);
			}
		}
		if (typeof self.shareModalClose === 'undefined') {
			self.shareModalClose = function(e) {
				_this.shareModalClose(e);
			}
		}
		if (typeof self.getGoodsQrcode === 'undefined') {
			self.getGoodsQrcode = function(e) {
				_this.getGoodsQrcode(e);
			}
		}
		if (typeof self.goodsQrcodeClose === 'undefined') {
			self.goodsQrcodeClose = function(e) {
				_this.goodsQrcodeClose(e);
			}
		}
		if (typeof self.saveGoodsQrcode === 'undefined') {
			self.saveGoodsQrcode = function(e) {
				_this.saveGoodsQrcode(e);
			}
		}
		if (typeof self.goodsQrcodeClick === 'undefined') {
			self.goodsQrcodeClick = function(e) {
				_this.goodsQrcodeClick(e);
			}
		}
		if (typeof self.goBrand === 'undefined') {
			self.goBrand = function(e) {
				_this.goBrand(e);
			}
		}
		if (typeof self.brandNav === 'undefined') {
			self.brandNav = function(e) {
				_this.brandNav(e);
			}
		}
		if (typeof self.goGoods === 'undefined') {
			self.goGoods = function(e) {
				_this.goGoods(e);
			}
		}
		if (typeof self.goodAdd === 'undefined') {
			self.goodAdd = function(e) {
				_this.goodAdd(e);
			}
		}
		if (typeof self.copy === 'undefined') {
			self.copy = function(e) {
				_this.copy(e);
			}
		}
		if (typeof self.copyText === 'undefined') {
			self.copyText = function(e) {
				_this.copyText(e);
			}
		}
		if (typeof self.goBack === 'undefined') {
			self.goBack = function(e) {
				_this.goBack(e);
			}
		}
		if (typeof self.getSharePic === 'undefined') {
			self.getSharePic = function(e) {
				_this.getSharePic(e);
			}
		}
		if (typeof self.downMaterial === 'undefined') {
			self.downMaterial = function(e) {
				_this.downMaterial(e);
			}
		}
		if (typeof self.showSupplier === 'undefined') {
			self.showSupplier = function(e) {
				_this.showSupplier(e);
			}
		}
		if (typeof self.closeSupplier === 'undefined') {
			self.closeSupplier = function(e) {
				_this.closeSupplier(e);
			}
		}
		if (typeof self.commisionBtn === 'undefined') {
			self.commisionBtn = function(e) {
				_this.commisionBtn(e);
			}
		}
		if (typeof self.getSameTuijian === 'undefined') {
			self.getSameTuijian = function(e) {
				_this.getSameTuijian(e);
			}
		}
		if (typeof self.getLook === 'undefined') {
			self.getLook = function(e) {
				_this.getLook(e);
			}
		}
		if (typeof self.openParameter === 'undefined') {
			self.openParameter = function(e) {
				_this.openParameter(e);
			}
		}
		if (typeof self.closeParameter === 'undefined') {
			self.closeParameter = function(e) {
				_this.closeParameter(e);
			}
		}
		if (typeof self.getJDSend === 'undefined') {
			self.getJDSend = function(e) {
				_this.getJDSend(e);
			}
		}
		if (typeof self.goToAddress === 'undefined') {
			self.goToAddress = function(e) {
				_this.goToAddress(e);
			}
		}
	},
	goToAddress: function() {
		var self = this.currentPage
		var token = uni.getStorageSync('ACCESS_TOKEN')
		if (!token) {
			self.setData({
				showGetLogin: true,
			})
			self.$store.commit('vuexSet',{name:'show_loginTpl',value:true})
			return
		}
		uni.navigateTo({
			url: '/pages/address-picker/address-picker',
		})
	},
	getJDSend() {
		var self = this.currentPage
		if (!self.goods || !self.goods.sku) {
		  return;
		}
		self.getApp().request({
			url: self.getApp().api.default.jd_send_address,
			method: 'POST',
			data: {
				userId: uni.getStorageSync('USER_INFO').id,
				// getType: self.goods.supplier_role,
				invalid_areas: JSON.stringify(self.goods.invalid_areas),
				address_id: self.address_id || '',
				sku_id: self.goods.sku,
				supplier_id: self.goods.supplier_id,
				num: self.form.number || '1'
			},
			success: (res) => {
				//console.log(res)
				if(res.promiseTips.indexOf('lang')!=-1)
				res.promiseTips = ""
				self.setData({
					jd_send: res
				})
			}
		})

	},
	openParameter: function() {
		var self = this.currentPage
		self.setData({
			isParameter: true
		})
	},
	closeParameter: function() {
		var self = this.currentPage
		self.setData({
			isParameter: false
		})
	},
	getSameTuijian() {
		var self = this.currentPage
		self.getApp().request({
			url: self.getApp().api.default.goods_same_tuijian,
			data: {
				cat_id: self.goods.cat_id,
			},
			success(res) {

				if (res.code == 0 && res.data.list.length > 0) {
					let index = 0;
					var arrOld = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
					var arr = []
					while (index < arrOld.length) {
						arr.push(arrOld.slice(index, index += 6));
					}

					self.setData({
						sameGoods: arr
					})
				}
			}
		})
	},
	getLook() {
		var self = this.currentPage
		self.getApp().request({
			url: self.getApp().api.default.all_look,
			success(res) {
				if (res.code == 0 && res.data.list.length > 0) {
					self.setData({
						allLookList: res.data.list
					})
				}
			}
		})
	},
	commisionBtn() {
		var self = this.currentPage
		self.setData({
			is_commission: !self.is_commission
		})
	},
	showSupplier() {
		var self = this.currentPage;
		self.setData({
			is_supplier: true
		})
	},
	closeSupplier() {
		var self = this.currentPage;
		self.setData({
			is_supplier: false
		})
	},
	downMaterial: function() {
		var self = this.currentPage;
		var vedio = self.goods.video_url
		var picList = self.goods.cover_pic
		if (vedio) {
			self.downloadFile({
				url: vedio,
				success(res) {
					if (res.statusCode === 200) {
						uni.saveVideoToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function(res) {
								uni.showToast({
									title: '视频保存成功！',
								})
							},
							fail(res) {
								uni.showToast({
									title: '视频保存失败！',
								})
							}
						})
					}
				}
			})
		}
		for (var i in picList) {
			self.downloadFile({
				url: picList[i],
				success(res) {
					//console.log('downloadfile',res)
					if(res.statusCode == 200) {
						//console.log('saveImageToPhotouytdghfjhsgrhfmdfsAlbum')
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function(res) {
								//console.log('saveImageToPhotosAlbum',res)
								uni.showToast({
									title: '保存成功！',
								})
							},
							fail(res) {
								//console.log(res)
								uni.showToast({
									title: '保存失败！',
								})
							}
						})
					}
				}
			})
		}
	},
	goBack() {
		var self = this.currentPage;
		uni.navigateBack({
			delta: 1,
			fail: (res) => {
				uni.redirectTo({
					url: '/pages/index/index'
				})
			}
		});
	},
	copyText: function(e) {
		var text = e.currentTarget.dataset.text
		text = text.join(',');
		uni.setClipboardData({
			data: text,
			success(res) {
				uni.getClipboardData({
					success(res) {

					}
				})
			}
		})
	},
	getSharePic: function() {
		var self = this.currentPage;
		var goods = self.goods
		uni.showLoading({
			title: '加载中'
		})
		self.getApp().request({
			url: self.getApp().api.default.shareCard,
			method: 'POST',
			data: {
				pics: goods.first_cover_pic,
				price: goods.original_price,
				sale_price: goods.m_price?goods.m_price:goods.price,
				id: goods.id,
				goods_name: goods.name,
				type: '101'
			},
			success: function(res) {
				if (res.code == 0) {
					uni.hideLoading()
					self.setData({
						sharePic: res.data.pic_url,
						shareTitle: res.data.goods_name
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
	showShareModal: function() {
		var self = this.currentPage;
		var token = uni.getStorageSync('ACCESS_TOKEN')
		if (!token) {
			self.setData({
				showGetLogin: true,
				user_info_show: true,
			})
			self.$store.commit('vuexSet',{name:'show_loginTpl',value:true})
			return
		}
		self.setData({
			share_modal_active: "active",
			is_commission: false,
			no_scroll: true,
		});
		// uni.checkSession({
		// 	success: function(res) {
		// 		self.setData({
		// 			share_modal_active: "active",
		// 			is_commission: false,
		// 			no_scroll: true,
		// 		});
		// 		self.getSharePic();
		// 	},
		// 	fail: function(res) {
		// 		console.log(res, '登录过期了')
		// 		console.log(self.showGetLogin);
		// 		uni.showModal({
		// 			title: '提示',
		// 			content: '你的登录信息过期了，请重新登录',
		// 			success: function (res) {
		// 				console.log(res);
		// 				if(res.confirm) {
		// 					self.setData({
		// 						showGetLogin: true
		// 					})
		// 				}
		// 			}
		// 		})
		// 	}
		// })
		self.getSharePic();
	},
	shareModalClose: function() {
		var self = this.currentPage;
		self.setData({
			share_modal_active: "",
			no_scroll: false,
			is_commission: true,
		});
	},
	// 复制标题
	copy: function(e) {
		var text = e.currentTarget.dataset.text
		uni.setClipboardData({
			data: text,
			success(res) {
				uni.getClipboardData({
					success(res) {

					}
				})
			}
		})
	},
	// 商品上架
	goodAdd: function() {

		var self = this.currentPage;
		var goods_id = self.goods.id
		var good_type = ''
		var active2 = self.active2

		if (active2 == '0') {
			good_type = 'miaosha'
		} else if (active2 == '1') {
			good_type = 'pintuan'
		} else if (active2 == '2') {
			good_type = 'tuijian'
		} else {
			return false;
		}

		uni.showModal({
			title: '提示',
			content: '是否推荐该商品',
			success: function(res) {
				if (res.confirm) {

					self.getApp().request({
						url: self.getApp().api.maijia.good_add,
						method: 'POST',
						data: {
							goods_id: goods_id,
							type: good_type
						},
						success: function(res) {
							if (res.code == 0) {
								// self.loadData('initData');

								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 2000
								})
							};
							if (res.code == 1) {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 2000
								})
							}
						}
					});
				}
			}
		})

	},
	getGoodsQrcode: function() {
		var self = this.currentPage;
		self.setData({
			goods_qrcode_active: "active",
			share_modal_active: "",
		});
		// if (self.goods_qrcode) {
		// 	return true;
		// }
		var httpUrl = '';
		var pageType = self.pageType;
		var data = {
			goods_id: self.id,
			sidFsShare: 1
		}
		if (pageType === 'PINTUAN') {
			httpUrl = self.getApp().api.group.goods_qrcode;
		} else if (pageType === 'BOOK') {
			httpUrl = self.getApp().api.book.goods_qrcode;
		} else if (pageType === 'STORE' || pageType === 'PROUPGOODS') {
			httpUrl = self.getApp().api.default.goods_qrcode;
			if (pageType === 'PROUPGOODS') {
				data.groupGoods = 1
			}
		} else if (pageType === 'MIAOSHA') {
			httpUrl = self.getApp().api.miaosha.goods_qrcode;
		} else {
			uni.showModal({
				title: '提示',
				content: 'pageType未定义或组件js未进行判断',
			});
			return;
		}
		self.getApp().request({
			url: httpUrl,
			data: data,
			success: function(res) {
				if (res.code == 0) {
					self.setData({
						goods_qrcode: res.data.pic_url,
					});
				}
				if (res.code == 1) {
					self.goodsQrcodeClose();
					uni.showModal({
						title: "提示",
						content: res.msg,
						showCancel: false,
						success: function(res) {
							if (res.confirm) {

							}
						}
					});
				}
			},
		});
	},
	goodsQrcodeClose: function() {
		var self = this.currentPage;
		self.setData({
			goods_qrcode_active: "",
			no_scroll: false,
		});
	},

	saveGoodsQrcode: function() {
		var self = this.currentPage;
		if (!uni.saveImageToPhotosAlbum) {
			// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
			uni.showModal({
				title: '提示',
				content: '当前版本过低，无法使用该功能，请升级到最新版本后重试。',
				showCancel: false,
			});
			return;
		}

		uni.showLoading({
			title: "正在保存图片",
			mask: false,
		});
		self.downloadFile({
			url: self.goods_qrcode,
			success: function(e) {
				uni.showLoading({
					title: "正在保存图片",
					mask: false,
				});
				uni.saveImageToPhotosAlbum({
					filePath: e.tempFilePath,
					success: function() {
						uni.showModal({
							title: '提示',
							content: '商品海报保存成功',
							showCancel: false,
						});
					},
					fail: function(e) {
						uni.showModal({
							title: '图片保存失败',
							content: e.errMsg,
							showCancel: false,
						});
					},
					complete: function(e) {
						uni.hideLoading();
					}
				});
			},
			fail: function(e) {
				uni.showModal({
					title: '图片下载失败',
					content: e.errMsg + ";" + self.goods_qrcode,
					showCancel: false,
				});
			},
			complete: function(e) {
				uni.hideLoading();
			}
		});

	},

	goodsQrcodeClick: function(e) {
		var src = e.currentTarget.dataset.src;
		uni.previewImage({
			urls: [src],
		});
	},
	goBrand: function(e) {
		uni.navigateTo({
			url: "/pages/brand/brand?brand_id=" + e.currentTarget.dataset.brandid
		})
	},
	goGoods: function(e) {
		var val = e.currentTarget.dataset.id;
		uni.navigateTo({
			url: "/pages/goods/goods?id=" + val
		})
	},
	brandNav: function(e) {
		var val = e.currentTarget.dataset.index;
		var self = this.currentPage;
		if (val == self.brandIndex) {
			return false;
		} else {
			self.setData({
				brandIndex: val,
			});
		}
	}
}
