<template>
	<view class="lgoin_toast">
		<block v-if="is_show_1">
			<view class="new-modal">
				<view class="new-modal-content">
					<view class="new-modal-header" style="padding:30rpx 0;line-height:60rpx;border-bottom: 1rpx solid #eee;">需要您授权登录</view>
					<view class="new-modal-body" style="min-height:0;margin-bottom:0;max-height:none">
						<view style="padding:32rpx 0 0 0;text-align: center">
							<view>为了提供更好的服务</view>
							<view>请在稍后的提示框中点击“立即登录”</view>
						</view>
						<view style="text-align:center;padding-top:60rpx;padding-bottom:60rpx;">
							<image src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/login.jpg" style="width:300rpx;height:275rpx;"></image>
						</view>
						<view class="flex-x-center">
							<view>
								<!-- #ifdef MP-WEIXIN -->
								<button style="border:1px solid #04be01;width:500rpx;height:80rpx;line-height:80rpx;border-radius:80rpx;color:#04be01;margin-bottom:40rpx;"
								 class="btn new-modal-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">立即登录</button>
								<!-- #endif -->

								<!-- #ifdef APP-PLUS  -->
								<button style="border:1px solid #04be01;width:500rpx;height:80rpx;line-height:80rpx;border-radius:80rpx;color:#04be01;margin-bottom:40rpx;"
								 class="btn new-modal-btn" @tap="AppLogin">立即登录</button>
								<!-- #endif -->

								<!-- #ifdef H5 || MP-ALIPAY -->
								<button style="border:1px solid #04be01;width:500rpx;height:80rpx;line-height:80rpx;border-radius:80rpx;color:#04be01;margin-bottom:40rpx;"
								 class="btn new-modal-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">立即登录</button>
								<!-- #endif -->
							</view>
						</view>
						<view class="flex-x-center">
							<view>
								<button style="border:1px solid #ccc;width:500rpx;height:80rpx;line-height:80rpx;border-radius:80rpx;color:#ccc;margin-bottom:40rpx;"
								 @tap="cancleLogin" class="btn new-modal-btn">取消</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="is_show_2">
			<view class="new-modal" @tap.stop="closePhone">
				<view class="new-modal-content" @tap.stop="stop">
					<view class="new-modal-header" style="padding:30rpx 0;line-height:60rpx;font-size:11pt;border-bottom: 1rpx solid #eee;">授权获取手机号</view>
					<view class="new-modal-body" style="min-height:0;margin-bottom:0;">
						<view style="padding:32rpx 0 40rpx 0;text-align: center">
							<!-- #ifdef MP-WEIXIN -->
							<image src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/login.jpg" style="width: 88rpx;height: 88rpx;"></image>
							<!-- #endif -->

							<!-- #ifndef MP-WEIXIN -->
							<image src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/login.jpg" style="width: 88rpx;height: 88rpx;"></image>
							<!-- #endif -->

						</view>
						<view style="padding:0 41rpx;">
							<view class="flex-x-center" style="margin-bottom:40rpx;">申请获取您微信绑定的手机号</view>
						</view>
						<view class="flex-x-center">
							<view>
								<button style="background-color:#04be01;width:500rpx;height:80rpx;border-radius:80rpx;color:#fff;margin-bottom:40rpx;"
								 open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="btn new-modal-btn" hover-class="none">确认</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				show__login: false
			}
		},
		computed: {
			is_show_1() {
				return this.$store.state.show_loginTpl
			},
			is_show_2(){
				return !this.$store.state.show_loginTpl&&this.$store.state.show_phoneTpl
			}
		},
		methods: {
			//取消登陆
			cancleLogin() {

				let page = getCurrentPages();
				let self = page[page.length - 1];
				//#ifdef MP-WEIXIN || APP-PLUS
				self = page[page.length - 1].$vm;
				//#endif

				//self.$store.commit('vuexSet','show_loginTpl',false);
				self.$store.commit('vuexSet', {
					name: 'show_loginTpl',
					value: false
				});

			},
			//服务器登陆
			unionLogin: function(data) {
				let page = getCurrentPages();
				let self = page[page.length - 1];

				//#ifdef MP-WEIXIN || APP-PLUS
				self = page[page.length - 1].$vm;
				//#endif
				let route = self.route;
				//#ifdef MP-WEIXIN

				route = self.__route__;
				//#endif

				uni.showLoading({
					title: "正在登录",
					mask: true,
				});
				let api_login = self.getApp().api.passport.login;
				if(getApp().globalData.app =='lianmeng'){
					api_login  = self.getApp().api.taoke.tk_login;
				}
				self.getApp().request({
					url: api_login,
					method: 'POST',
					data: data,
					success: (res) => {
						//console.log('后台登陆返回数据',res)
						if (res.code == 0) {
							self.setData({
								__user_info: res.data
							});
							self.getApp().setUser(res.data);
							uni.setStorageSync(self.getApp().const.ACCESS_TOKEN, res.data.access_token);
							self.getApp().trigger.run(self.getApp().trigger.events.login);
							this.setMchInfo(true); /////////////

							var store = uni.getStorageSync(self.getApp().const.STORE);
							if (res.data.binding || (!store.option || !store.option.phone_auth) || (store.option.phone_auth && store.option
									.phone_auth == 0)) {
								uni.redirectTo({
									url: '/' + route + '?' + self.getApp().helper.objectToUrlParams(this.$store.state.options),
								});
							} else {
								if (typeof uni === 'undefined') {
									uni.redirectTo({
										url: '/' + route + '?' + self.getApp().helper.objectToUrlParams(this.$store.state.options),
									});
								}
								this.setPhone(); //////////////
							}
							///登陆流程结束,关闭登录组件
							this.$store.commit('vuexSet', {
								name: 'show_loginTpl',
								value: false
							})

						} else {
							getApp().globalData.login_complete = false;
							uni.showModal({
								title: '提示',
								content: res.msg || '登录失败',
								showCancel: false,
							});
							
							//亲联盟专属
							if(getApp().globalData.app =='lianmeng'){
								if(res.code == 2){
									//登录失败去亲铺页面
									let app_id = res.data.app_id;
									let path = res.data.path || '/pages/index/index';
									if(app_id=="")
									return ;
									uni.navigateToMiniProgram({
										appId: app_id, //app.json内容
										path: path,
										extraData: {
											token: uni.getStorageSync('ACCESS_TOKEN'),
											_mchInfo: uni.getStorageSync('_mchInfo')
										},
										envVersion: 'trial'
									})
								}
							}
							//亲联盟专属
						}
					},
					fail: function(res) {
						uni.showModal({
							title: '提示',
							content: '出错了，请联系管理员',
							showCancel: false,
						});
					},
					complete: function() {
						uni.hideLoading();
					}
				});
			},
			//小程序wx.login登陆获取code 
			getUserInfo(res) {
				//console.log('getuserinfo-res',res)
				if (res.detail.errMsg != 'getUserInfo:ok') {
					return;
				}
				uni.login({
					success: (login_res) => {
						var code = login_res.code;
						//console.log('login-res',login_res)
						this.unionLogin({
							code: code,
							user_info: res.detail.rawData,
							encrypted_data: res.detail.encryptedData,
							iv: res.detail.iv,
							signature: res.detail.signature
						});
					},
					fail: (res) => {},
				});
			},
			//设置店铺信息
			setMchInfo($reloadCache) {
				$reloadCache = $reloadCache || false;

				let page = getCurrentPages();
				let self = page[page.length - 1];
				//#ifdef MP-WEIXIN || APP-PLUS
				self = page[page.length - 1].$vm;
				//#endif
				var route = self.route;
				//#ifndef MP-WEIXIN
				route = self.__route__;
				//#endif
				if (route == 'pages/index/index' || route == 'pages/user/user') { // 特定页面要重新获取店铺信息（会存在各种从不同店铺切换的情况，所以要重新获取）
					$reloadCache = true;
				}
				var _this = this;
				let mch_id = typeof this.$store.state.options == 'object' ? this.$store.state.options.mch_id || '' : '';
				// 没有传的时候也要继续，为了当前用户是店主身份的时候的处理
				// if (!mch_id || mch_id == '' || mch_id == 'undefined') {
				//     return false;
				// }
				// 每次重新获取，避免到不了其他店铺
				var cacheMch = uni.getStorageSync('_mchInfo');
				if (!$reloadCache && cacheMch && cacheMch.id == mch_id && cacheMch.user_id) { // 已经存在当前店铺信息的
					return false;
				}

				uni.setStorageSync('_mchInfo', {
					id: mch_id
				});
				self.getApp().request({
					url: self.getApp().api.default.merchants,
					success: (res) => {
						if (res.code == 0) {
							if (res.data.show_msg && res.data.show_msg != '') {
								uni.showToast({
									title: res.data.show_msg
								});
							}
							if (res.data.mch) {
								uni.setStorageSync('_mchInfo', res.data.mch);
								uni.setStorageSync('_img', res.data.init_img);
								uni.setStorageSync('role', res.data.role || 'user');
								//getApp().mch_id = res.data.mch.id;
								//self.$store.commit('vuexSet','mch_id',res.data.mch.id)
								self.$store.commit('vuexSet', {
									name: 'mch_id',
									value: res.data.mch.id
								})
								self && self.setData({
									'role': res.data.role || 'user'
								});
							} else {
								uni.setStorageSync('_mchInfo', {
									id: mch_id
								});
								//getApp().mch_id = mch_id
								//self.$store.commit('vuexSet','mch_id',mch_id)
								this.$store.commit('vuexSet', {
									name: 'mch_id',
									value: mch_id
								})
								uni.setStorageSync('role', 'user');
							}
						} else {
							uni.setStorageSync('_mchInfo', {
								id: mch_id
							});
							//getApp().mch_id = mch_id
							//self.$store.commit('vuexSet','mch_id',mch_id)
							self.$store.commit('vuexSet', {
								name: 'mch_id',
								value: mch_id
							})
							uni.setStorageSync('role', 'user');
						}
						self.getApp().trigger.run(self.getApp().trigger.events.set_mch);
					}
				});
			},
			//获取电话号码
			setPhone() {

			},
			//App登录
			AppLogin() {
				// uni.getProvider({
				// 	service:"payment",
				// 	success: (res) => {
				// 		console.log('授权信息',res)


				// 	}
				// })
				// return ;
				// 091bOZkl2cgvM54TrSkl2w58pC2bOZkC
				uni.login({
					provider: 'weixin',
					scopes: "auth_user",
					success: (loginRes) => {
						//console.log(loginRes.authResult);
						// 获取用户信息
						uni.getUserInfo({
							// provider: 'weixin',
							success: (infoRes) => {
								//console.log('app_getUserinfo',infoRes)
								this.unionLogin({
									code: infoRes.openid,
									user_info: {},
									encrypted_data: {},
									iv: "sdfsdfdsf",
									signature: "dsfadsfdsf"
								});

							}
						});
					}
				});


			},
			stop() {},
			closePhone() {
				this.$store.commit('vuexSet', {
					name: 'show_phoneTpl',
					value: false
				})
			},
			//微信获取手机号码回调
			getPhoneNumber(e) {
				//#ifdef MP-WEIXIN
				console.log(e)
				var self = this;
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '未授权',
					})
				} else {
					uni.showLoading({
						title: '授权中',
					});
					var ivObj = e.detail.iv
					var telObj = e.detail.encryptedData
					var codeObj = "";
					var that = this;
					//console.log(e.detail)
					//关闭弹窗
					this.$store.commit('vuexSet',{
						name:'show_phoneTpl',
						value:false
					})
					//执行Login
					wx.login({
						success: res => {
							self.getApp().request({
								url: self.getApp().api.default.get_Tel, //接口请求地址
								method: 'POST',
								data: {
									// appid: " ", //小程序appid，登录微信后台查看
									// secret: " ", //小程序secret，登录微信后台可查看
									code: res.code,
									encrypted_data: telObj,
									iv: ivObj
								},
								//成功返回数据
								success: function(res) {
									if (res.code == 0) {
										uni.showModal({
											title: res.msg,
											showCancel: false,
											success: (res) => {
												self.setData({
													show_get_tel: false,
													showToast: false
												});
												wx.navigateToMiniProgram({
													appId: 'wxfd13fd712d32b3cb',
													path: '/pages/bangdingWeChat/bangdingWeChat',
													extraData: { // 传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
														mch_id: uni.getStorageSync('_mchInfo').id,
														token: uni.getStorageSync(self.getApp().const.ACCESS_TOKEN)
													},
													envVersion: 'trial', // 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效
													success(res) {
														// 打开成功
														
													},
													fail: function(res) {
							
													}
												})
											}
										})
									} else {
										uni.showModal({
											title: res.msg,
											showCancel: false,
										})
									}
							
								}
							})
						},
						complete: function(res) {
							uni.hideLoading();
						}
					})
				}
				// #endif
			},
		},
		created() {
			//console.log('options',this.$store.state)
		}
	}
</script>

<style>
	#_toast {
		position: fixed;
		top: 20%;
		left: 0;
		width: 100%;
		height: 0;
		background: #ff0;
		z-index: 10000;
		padding: 0 120rpx;
		text-align: center;
	}

	#_toast_title {
		font-size: 11pt;
		display: inline-block;
		background: rgba(0, 0, 0, 0.85);
		color: #fff;
		margin: 0 auto;
		padding: 16rpx 32rpx;
		border-radius: 16rpx;
		max-height: 60vh;
		overflow-y: auto;
		overflow-x: hidden;
		text-align: left;
		transition: 150ms;
		word-break: break-all;
		box-shadow: 0 0 25rpx 5rpx rgba(0, 0, 0, 0.5);
	}

	#_toast_title.hide {
		opacity: 0;
		visibility: hidden;
	}

	#_loading {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 9000;
	}

	#_loading image {
		width: 200rpx;
		height: 200rpx;
	}
</style>
