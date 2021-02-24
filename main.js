import Vue from 'vue'
import App from './App'
import core from './core.js'
import store from './store'
import tabbar from './components/tabbar/tabbar.vue'
import common from './components/common/common.vue'
import custom from './components/custom/custom.vue'
Vue.prototype.$store = store 


Vue.prototype._toast=''
Vue.prototype.__user_info= {}
Vue.prototype.__page_classes = ''
Vue.prototype.__wxapp_img = {
	store:{
		member_price:{
			url:''
		},
		close2:{
			url:''
		},
		system:{
			loading2:{
				url:''
			}
		},
		jia:{
			url:''
		},
		jian:{
			url:''
		}
	}
}
Vue.prototype.__device = ''

core.init(Vue)

Vue.component('tabbar',tabbar)
Vue.component('common',common)
Vue.component('custom',custom)


Vue.config.productionTip = false

App.mpType = 'app'



const app = new Vue({
    ...App
})
app.$mount()
