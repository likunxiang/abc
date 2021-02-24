
	let hj = uni;
	var originUploadFile = hj.uploadFile;
	let envInfo = require('../siteinfo.js');
	hj.upFile = function(args) {
		args.header = {
			'mch-id': uni.getStorageSync('_mchInfo').id,
			'access-token': uni.getStorageSync('ACCESS_TOKEN'),
			'store-id': envInfo.store_id
		}
		originUploadFile(args);
	};
	hj.pading = function(self, url, data, callback) {
		
		if (self.$data.stopLoadMore == true) {
			return
		}
		var page = self.$data.page || 1
		var index = page
			++page
		self.setData({
			page: page
		})
		data.page = page
		self.getApp().request({
			url: url,
			data: data,
			success: function(res) {
				//console.log('cart-res',res)
				if (res.code == 0) {
					callback(res, index)
				}

			},
			complete: function() {
				uni.stopPullDownRefresh();
				uni.hideLoading();
			}
		});

	}

module.exports = hj;
