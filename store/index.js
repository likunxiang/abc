import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		query: {}, //页面查询参数

		onShowData: {}, //不晓得干嘛的

		mch_id: '', // 店铺id

		promoter_id: '', //邀请人id

		show_loginTpl: false, //显示登陆模板

		show_phoneTpl: false, //显示获取用户号码模板

		options: {}, // page.onLoad(options)  option参数
		user_id: '',
		check_mch_wait_sub: {}, // 用于显示首页底部栏
		check_mch_open_sub: {}, // 用于控制红包显示
		show_commission: true, // 用于控制是否显示佣金

		link: '', //促发检测粘贴板的动作
		init_img: uni.getStorageSync('_img') || {}, //所有静态图片
		role_: uni.getStorageSync('role') || "", //用户身份
		mch_info_: uni.getStorageSync('_mchInfo') || {
			user: {}
		},
		show_search: false,
		show_str: '',
		init_appid: uni.getStorageSync('init_appid') || {},//AppId
		key_arr:[],//多弹窗数组key
		recharge_tips: true,   // 临时充值提示开关
		is_choose_mch: false,  // 控制是否需要跳出店铺选择
		is_show_add_mch: true,  // 控制是否需要跳出添加店主弹窗
		is_show_add_mch_page: false, // 控制是否需要跳出添加店主弹窗2
	},
	mutations: {
		//赋值
		vuexSet(state, data) {
			state[data.name] = data.value;
		},
		add_key(state, key) {
			state.key_arr.push(key);
			state.key_arr = Array.from(new Set(state.key_arr))
		},
		remove_key(state, key) {
			let index = state.key_arr.indexOf(key);
			if(index > -1){
				state.key_arr.splice(index,1)
			}
			
		},
	},
	getters:{
		get_max_key(state){
			if(state.key_arr.length == 0 || state.show_search || state.show_loginTpl)
			return -1;
			return Math.max(...state.key_arr);
		}
	}
	
})
export default store
