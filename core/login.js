module.exports = function(args) {
	// var app = this;
	// let currentPage = app.page.currentPage;
	// let currentPageOptions = app.page.currentPageOptions;
	// if (currentPage && currentPage.route === 'pages/index/index') {
	// 	if (app.platform === 'my') {
	// 		return;
	// 	}
	// }

	// app.page.setPhone();
	if (typeof my === 'undefined') {
		let page = getCurrentPages();
		let self = page[page.length-1]
		//#ifdef MP-WEIXIN || APP-PLUS
			self = page[page.length-1].$vm;
		//#endif
	    self.setData({
	        user_bind_show: true
	    });
	}
	
	
	// app.trigger.run(app.trigger.events.login);

};
