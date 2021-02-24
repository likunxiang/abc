module.exports = ()=>{
	//console.log(getCurrentPages())
	// this.a = 0;
	let page = getCurrentPages();
	
	let self = page[page.length-1];
	//#ifdef MP-WEIXIN || APP-PLUS
		self = page[page.length-1].$vm;
	//#endif
	// console.log('store',self.$store.state)
	self.setData({
		title:'724o3423490238'
	})
	//self.title = '00000000000000000'
	// console.log('test.js里的this指向',self.title)
	//console.log('test.jsroute',self.route)
	//this.aiqing();
}