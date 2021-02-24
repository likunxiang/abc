

/***
 * 商城的配置
 * 例如：商城信息、存在服务器的图片
 */

module.exports = function (callback) {
    let api = require('./api.js');
    
	let cont1 = require('./const.js')
	let page = getCurrentPages();
	let self = page[page.length-1];
	//#ifdef MP-WEIXIN || APP-PLUS
		self = page[page.length-1].$vm;
	//#endif
	//console.log('self',self)
	//var app = self.getApp();
    if (callback && typeof callback === 'function') {
        var config = uni.getStorageSync(cont1.STORE_CONFIG);
        if (config) {
            callback(config);
        }
        if (getApp().globalData.config) {
            config = getApp().globalData.config;
        } else {
            self.getApp().trigger.add(self.getApp().trigger.events.callConfig, 'call', function (config) {
                callback(config)
            });
            if (self.getApp().configReadyCall && typeof self.getApp().configReadyCall == 'function'){

            } else {
                self.getApp().configReadyCall = function (config) {
                    self.getApp().trigger.run(self.getApp().trigger.events.callConfig, function () {

                    }, config);
                }
            }
        }
    }
};