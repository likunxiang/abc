<template>
	<view class="user-user">
		<common></common>

		<!-- user内容开始 -->
		<view class="page1 pr">
			<view class="nav pr" :style="'background: url(' + bg + ') no-repeat;background-size: 100% 100%;'">
				<!-- 头部内容 -->
				<view class="con flex justify-between align-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
					<view></view>
					<view class="fs-36">我的</view>
					<view></view>
				</view>
				<view class="user-msg-box">
					<view class="flex align-center justify-between">
						<view class="flex align-center">
							<image style="width: 117rpx;height: 117rpx;border-radius: 50%;" mode="aspectFill" :src="user_info.avatar_url"></image>
							<view class="ml-24">
								<view class="fs-36">{{ filters.substring(user_info.nickname || '',8)}}</view>
								<view class="close-shop-tip" v-if="user_info.is_mch == 1 && user_info.is_new == 1" @click="openCloseTips">距离自动关店剩：{{user_info.close_time}}天</view>
								<view class="fs-24 color-fff" v-else-if="mch.review_time">{{mch.review_time}}</view>
								<!-- @tap="myLogin" -->
								<button class="logout fs-20" open-type="getUserInfo" @getuserinfo="getUserInfo" v-if="user_info.name == ''">立即登录</button>
							</view>
						</view>
						<view class="flex align-center text-center">
							<!-- <view>
								<view class="iconfont icon-tixing1 color-fff fs-40"></view>
								<view class="fs-28 color-fff">消息</view>
							</view> -->
							<view style="margin-left: 50rpx;">
								<navigator url="/member/serviceCenter/serviceCenter" style="background:transparent;border:0;padding:0;margin:0;width:100%;line-height: 1.25;">
									<view class="iconfont icon-kefu1 color-fff fs-40"></view>
									<view class="fs-28 color-fff">客服</view>
								</navigator>

							</view>

						</view>
					</view>
					<view class="vip-card flex justify-between align-center" :style="'background: url(' + vipCardBg + ') no-repeat;background-size: 100% 100%;'">
						<view>
							<text :class="'iconfont fs-30 mr-16 ' + (role == 'shoper'?'icon-cf-c14':'icon-huiyuanzengsong')" style="color: #F5DBAA;"></text>
							<text class="fs-28 ns-text-bold" style="color: #F0D0A5;" v-if="vipCardStatus == '102'">邀请开店，获取更高收益</text>
							<text class="fs-28 ns-text-bold" style="color: #F0D0A5;" v-else-if="role == 'shoper'">邀请开店，获取更高收益</text>
							<text class="fs-28 ns-text-bold" style="color: #F0D0A5;" v-else-if="vipLevel >= 2">自用省钱，分享赚钱</text>
							<text class="fs-28 ns-text-bold" style="color: #F0D0A5;" v-else-if="vipLevel <= 1">没有特权，不惠生活</text>
						</view>
						<button class="vip-card-btn fs-24 ns-text-bold" style="margin: 0;padding-left: 0;padding-right: 0;" open-type="share"
						 data-type="tomch" v-if="vipCardStatus == '102'">邀请开店</button>
						<button class="vip-card-btn fs-24 ns-text-bold" style="margin: 0;padding-left: 0;padding-right: 0;" v-else-if="role == 'shoper'"
						 open-type="share" data-type="tomch">邀请开店</button>
						<view class="vip-card-btn fs-24 ns-text-bold" style="color: #EF321D" v-else-if="vipLevel >= 2 && open_shop_review_status == 0">正在审核</view>
						<view class="vip-card-btn fs-24 ns-text-bold" v-else-if="vipLevel >= 2" @tap="toMch">成为店主</view>
						<navigator class="vip-card-btn fs-24 ns-text-bold" url="/member/vipFirst/vipFirst?type=1" v-else-if="vipLevel <= 1">成为会员</navigator>
					</view>
				</view>
			</view>
			<!-- 领取会员卡遮罩 -->
			<vipModel :is_show_model="is_show_model" :card_bg="card_bg" @closeVipModel="closeVipModel"></vipModel>
			<!-- 邀请店主 -->
			<view class="get-card-modal flex-x-center flex-y-center ns-column" v-if="to_mch_show && tomch_invite_bg">
				<view class="get-card-modal-main_mch pr" :style="'background: url(' + tomch_invite_bg + ') no-repeat;background-size: 100% 100%;'">
					<button class="get-card-modal-btn_mch" open-type="share" data-type="tomch">立即邀请</button>
				</view>
				<view class="iconfont icon-guanbi color-999999" style="font-size: 60rpx;margin-top: 40rpx;" @tap="closeToMch"></view>
			</view>
			<!-- 关店提示弹窗 -->
			<view class="get-card-modal flex-x-center flex-y-center ns-column" v-if="close_shop_tips" @tap.stop="closeCloseTips">
				<view class="get-card-modal-main-close pr ns-column flex-x-center text-center" @tap.stop="">
					<view>
						<view class="get-card-modal-main-close-header" >温馨提示</view>
						<view class="get-card-modal-main-close-body">
							<view class="fs-30 color-595959" style="line-height: 42rpx;">
								<rich-text :nodes="user_info.close_desc"></rich-text>
							</view>
							<view class="get-card-modal-btn-close" @tap.stop="closeCloseTips">知道了</view>
						</view>
						
					</view>
				</view>
			</view>



			<view class=" after-navber pr">
				<view :class="'page ' +__page_classes" :style="false ? 'padding-top: 10rpx;' : 'padding-top: 30rpx'">
					<!-- 未登录的遮罩层 -->
					<view class="no-login-zhezhao" @tap="noLoginTips" v-if="!token"></view>
					<!-- 新手指引 -->
					<!-- 	<view style="width: 100%;height: 192rpx;" v-if="true">
						<image src="../../static/pic-new-guidelines.png" style="width: 100%;height: 192rpx;" mode="widthFix"></image>
					</view> -->
					<!-- 新手指引 -->
					<!-- 我的津贴，我的会员 -->
					<view class="flex justify-between mb-20" v-if="vipLevel >= 2">
						<navigator url="/member/allowance/allowance" class="tab-bar">
							<view class="flex align-center justify-between">
								<view class="fs-30 color-2C2C2C ns-text-bold">我的津贴</view>
								<navigator url="/tool/sendReward/sendReward" class="flex align-center tab-bar-icon" @click.stop="stop" v-if="role == 'shoper'">
									<view class="color-fff fs-24">发红包</view>
									<view class="iconfont icon-youjiantou-tianchong ml-8 color-fff fs-28"></view>
								</navigator>
							</view>
							<view class="mt-20 color-2C2C2C ns-text-bold flex">
								<view>
									<text class="fs-40">{{filters.priceStr(subsidy)[0]}}.</text>
									<text class="fs-24">{{filters.priceStr(subsidy)[1]}}</text>
								</view>
							</view>
						</navigator>
						<navigator url="/pages/vipList/vipList" class="tab-bar">
							<view class="flex align-center justify-between">
								<view class="fs-30 color-2C2C2C ns-text-bold">我的会员</view>
								<navigator url="/member/sendCard/sendCard" class="flex align-center tab-bar-icon" @click.stop="stop">
									<view class="color-fff fs-24">送亲卡</view>
									<view class="iconfont icon-youjiantou-tianchong ml-8 color-fff fs-28"></view>
								</navigator>
							</view>
							<view class="mt-20 color-2C2C2C ns-text-bold flex">
								<view class="fs-40">{{user_info.member_count}}</view>
							</view>
						</navigator>
					</view>
					<!-- 我的津贴，我的会员 end -->
					<view class="order-block">
						<navigator hover-class="none" class="my-order" url="/pages/order/order?status=-1">
							我的订单
						</navigator>
						<view class="flex-row">
							<view class="flex-grow-1">
								<navigator hover-class="none" class="nav-item" url="/pages/order/order?status=-1">
									<view class="item iconfont icon-gouwu fs-60 color-595959"></view>
									<view class="fs-28 mt-10">全部</view>
								</navigator>
							</view>
							<view class="flex-grow-1">
								<navigator hover-class="none" class="nav-item" :url="'/pages/order/order?status=0&status_0=' + order_count.status_0">
									<view class="item iconfont icon-daifukuan1 fs-60 color-595959"></view>
									<view class="fs-28 mt-10">待付款</view>
									<view class="num-icon" v-if="order_count.status_0 && order_count.status_0 > 0">
										<text>{{ order_count.status_0 }}</text>
									</view>
								</navigator>
							</view>
							<view class="flex-grow-1">
								<navigator hover-class="none" class="nav-item" url="/pages/order/order?status=1">
									<view class="item iconfont icon-daifahuo1 fs-60 color-595959"></view>
									<view class="fs-28 mt-10">待发货</view>
									<view class="num-icon" v-if="order_count.status_1 && order_count.status_1 > 0">
										<text>{{ order_count.status_1 }}</text>
									</view>
								</navigator>
							</view>
							<view class="flex-grow-1">
								<navigator hover-class="none" class="nav-item" url="/pages/order/order?status=2">
									<view class="item iconfont icon-daishouhuo fs-60 color-595959"></view>
									<view class="fs-28 mt-10">待收货</view>
									<view class="num-icon" v-if="order_count.status_2 && order_count.status_2 > 0">
										<text>{{ order_count.status_2 }}</text>
									</view>
								</navigator>
							</view>
							<view class="flex-grow-1">
								<navigator hover-class="none" class="nav-item" url="/pages/refund/refund?status=4">
									<view class="item iconfont icon-tuikuan2 fs-60 color-595959"></view>
									<view class="fs-28 mt-10">售后</view>
									<view class="num-icon" v-if="order_count.status_4 && order_count.status_4 > 0">
										<text>{{ order_count.status_4 }}</text>
									</view>
								</navigator>
							</view>
						</view>
					</view>
					<view class="order-block">
						<view class="my-tool"> 我的服务</view>
						<view class="flex ns-wrap">
							<view class="tool-box pr" @click="toSpeedUp"  v-if="role=='shoper'">
								<view class="tool-icon iconfont icon-liebiao2"></view>
								<view>跟上</view>
								<view class="new-label" v-if="show_mch_gs.num > 0"></view>
							</view>
							<view @tap="toSeller" v-if="role=='shoper'" class="tool-box">
								<view class="tool-icon iconfont icon-fenlei"></view>
								<view>进入后台</view>
							</view>
							<navigator hover-class="none" url="/tool/mchAddressBook/mchAddressBook" class="tool-box" v-if="role == 'shoper'">
								<view class="tool-icon iconfont icon-shouji"></view>
								<view>通讯录</view>
							</navigator>
							<navigator hover-class="none" url="/member/publicityMaterial/publicityMaterial" class="tool-box" v-if="role == 'shoper'">
								<view class="tool-icon iconfont icon-liebiao"></view>
								<view>发圈素材</view>
							</navigator>
							<view class="tool-box" @tap="toQinBook" v-if="role=='shoper'">
								<view class="tool-icon iconfont icon-bijiben"></view>
								<view>小亲本</view>
							</view>
							<!-- <navigator hover-class="none" url="/pages/liveRoom/liveRoom" class="tool-box" v-if="role == 'shoper'">
								<view class="tool-icon iconfont icon-shouji"></view>
								<view>亲小课</view>
							</navigator> -->
							
						</view>
						<view class="flex ns-wrap">
							<navigator hover-class="none" :url="'/pages/pt/order/order?group_order_no_pay_num=' + group_order_no_pay_num"
							 class="tool-box">
								<view class="tool-icon iconfont icon-liwu1"></view>
								<view>活动单</view>
							</navigator>
							<navigator hover-class="none" url="/pages/address/address" class="tool-box">
								<view class="tool-icon iconfont icon-dingwei1"></view>
								<view>地址</view>
							</navigator>
							<view class="tool-box" @tap="toSetting">
								<view class="tool-icon iconfont icon-shezhi1"></view>
								<view>设置</view>
							</view>
							<navigator class="tool-box" hover-class="none" url="/member/waitEarnings/waitEarnings" v-if="user_info.closeMchOrder == 1">
								<view class="tool-icon iconfont icon-zhangdan"></view>
								<view>未到账</view>
							</navigator>
							<!-- <navigator class="tool-box" hover-class="none" :url="privateUrl">
								<view class="tool-icon iconfont icon-liebiao"></view>
								<view>店主自营</view>
							</navigator> -->
							
						</view>
					</view>


				</view>
			</view>
			<!-- <include src="/components/footer/footer" /> -->
		</view>
		<!-- user内容结束 -->
		<!-- 上传微信开始 -->
		<uploadwx @guidelinesEntrance="guidelinesEntrance"></uploadwx>
		<!-- 上传微信结束 -->
		<!-- 引导组件 -->
		<guidance v-if="new_mch" @closeGuidance="closeGuidance"></guidance>
		<!-- 引导组件 end -->
		<!-- 开店成功开始 -->
		<!-- 底部导航栏开始 -->
		<tabbar></tabbar>
		<!-- 底部导航栏结束 -->
	</view>
</template>

<script>
	import downLoadwx from '../../components/downLoadwx/downLoadwx.vue';
	import vipModel from '@/components/popWindows/vipModel.vue';
	import guidance from '@/components/user/guidance.vue' // 引导组件
	export default {
		data() {
			return {
				contact_tel: '',
				couponNum: 0,
				mch_id: 0,
				user_id: 0,
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				x: uni.getSystemInfoSync().windowWidth,
				y: uni.getSystemInfoSync().windowHeight,
				shopShow: false,
				icon_wait_pay: '',
				icon_wait_send: '',
				icon_car: '',
				icon_refund: '',
				nickName: '',
				avatarUrl: '',
				type: 0,
				userId: '',
				mchId: '',
				storeId: '',
				codeImg: '',
				to_mch_show: false,
				share_modal_active: '',
				no_scroll: false,
				showGetLogin: false,
				privateUrl: '',
				is_show_model: false,
				card_bg: '',
				dailySpecial: '',
				vipCardStatus: '', // 102 == 大亲
				vipCardTime: '',
				vipLevel: '',
				bg: '',
				tomch_self_bg: '',
				store: '',
				group_order_no_pay_num: '',
				applyStatus: '',
				is_close: '',
				open_step: '',
				subsidy: '',
				vipCardBg: '',
				can_shopkeeper: '',
				parent_id: '',
				store_id: '',
				store_group_id: '',
				sid: '',
				shareImg: '',
				user_info: {
					avatar_url: '',
					name: ''
				},
				order_count: {
					status_0: ''
				},
				role: '',
				can_open: '',
				openImg: '',
				is_show_kf: false,
				tomch_invite_bg: uni.getStorageSync('_img').invite_open_mch,
				is_guidelines: false, // 新手指引是否显示
				pic_guidelines: '', // 新手指引入口图片地址
				token: uni.getStorageSync('ACCESS_TOKEN') || '',
				filters: require('../../utils/filters.js'),
				close_shop_tips: false,  // 关店提示
				show_mch_gs: {}, // 跟上相关
				new_mch: false, // 是否需要跳出引导
			};
		},
		components: {
			uploadwx: downLoadwx,
			vipModel: vipModel,
			guidance: guidance
		},
		onLoad(options) {
			// getApp().globalData.aaa.show();

			//未登录显示登陆弹窗
			this.login();

			var self = this;

			
			uni.hideShareMenu();
			

		


			this.getApp().page.onLoad(this, options);
			// setTimeout(() => {
			// 	if (uni.getStorageSync('_img')) {
			// 		var navImg = uni.getStorageSync('_img') || {};
			// 		this.setData({
			// 			icon_wait_pay: navImg.icon_wait_pay,
			// 			icon_wait_send: navImg.icon_wait_send,
			// 			icon_car: navImg.icon_car,
			// 			icon_refund: navImg.icon_refund
			// 		});
			// 	}

			// }, 1500)
			
			this.setData({
				role: uni.getStorageSync('role')
			});
			// 引导
			if (options.new_mch) {
				console.log(options.new_mch);
				this.new_mch = true
			}
			// this.getDailySpecial();
			let USER_INFO = uni.getStorageSync('USER_INFO') || {};
			//console.log('USER_INFO',USER_INFO)[不支持类型消息]
			this.setData({
				nickName: USER_INFO.nickname,
				avatarUrl: USER_INFO.avatar_url,
				type: 1,
				//我的页面进入
				userId: USER_INFO.id,
				mchId: typeof uni.getStorageSync('_mchInfo') == 'object' ? uni.getStorageSync('_mchInfo').id : '',
				storeId: typeof uni.getStorageSync('STORE') == 'object' ? uni.getStorageSync('STORE').id : ''
			});
			this.getShareData();
			this.getShareImg();

			//获取用户手机号弹窗
			this.getPhoneState();
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function(options) {
			//this.getApp().page.onReady(this);
		},
		onShow: function(options) {
			this.getApp().page.onShow(this);
			var self = this;
			this.checkApply();
			this.loadData();
		},
		onShareAppMessage: function(options) {
			//console.log('user-onShareAppMessage-options', options);
			var type = options.target.dataset.type;
			var mch_id = uni.getStorageSync('_mchInfo').id;
			var user_id = uni.getStorageSync('USER_INFO').id;
			var nickname = uni.getStorageSync('USER_INFO').nickname;
			var img = this.getApp().core.getStorageSync('_img').open_member;

			if (type == 'tomch') {
				var title = nickname + '邀请您一起开店，快来赚钱吧';
				img = uni.getStorageSync('_img').invite_open_mch_black;
				return {
					title: title,
					path: '/pages/storeInvite/storeInvite?sid=' + this.sid + '&type=1' + '&mch_id=' + mch_id + '&user_id=' + user_id,
					imageUrl: img
				};
			} else {
				this.shareVip();
				var title = nickname + '邀请您来开通会员~';
				return {
					title: title,
					path: '/member/vipFirst/vipFirst?sid=' + this.sid + '&type=1' + '&mch_id=' + mch_id + '&user_id=' + user_id,
					imageUrl: img
				};
			}
		},
		methods: {
			// 关闭引导
			closeGuidance() {
				this.new_mch = false
			},
			// 打开关店提示
			openCloseTips() {
				this.close_shop_tips = true
			},
			closeCloseTips() {
				this.close_shop_tips = false
			},
			openKf() {
				this.setData({
					is_show_kf: true
				})
			},
			closeKf() {
				this.setData({
					is_show_kf: false
				})
			},
			//判断是否登录
			toMyTop() {
				uni.navigateTo({
					url: '/member/myTop/myTop'
				});
			},

			showToMch: function() {
				this.setData({
					to_mch_show: true,
				});
			},
			closeToMch: function() {
				this.setData({
					to_mch_show: false
				});
			},
			showShareModal: function() {
				var self = this;
				self.setData({
					share_modal_active: 'active',
					no_scroll: true
				});
			},
			shareModalClose: function() {
				var self = this;
				self.setData({
					share_modal_active: '',
					no_scroll: false
				});
			},
			// login: function(options) {
			// 	getApp().page.onLoad(this, options);
			// },
			noLoginTips: function() {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
			},
			myLogin: function() {
				uni.getUserInfo({
					success: function(res) {}
				});
				this.setData({
					showGetLogin: false
				});
				this.$store.commit('vuexSet', {
					name: 'show_loginTpl',
					value: true
				})
			},

			toMch() {
				var status = this.vipCardStatus;

				if (this.vipLevel < 2) {
					uni.showModal({
						content: '您还不是永久会员，需先成为永久会员才能成为店主',
						confirmText: '成为会员',
						success: res => {
							if (res.confirm) {
								if (status == 6 || status == 7) {
									uni.navigateTo({
										url: '/member/vipFirst/vipFirst?type=1'
									});
								} else {
									uni.navigateTo({
										url: '/member/vipFirst/vipFirst'
									});
								}
							}
						}
					});
				} else {
					uni.navigateTo({
						url: '/pages/storeInvite/storeInvite'
					});

				}
			},
			// 跳转至新手指引
			toGuidelinesEntrance() {
				uni.navigateTo({
					url: '/member/guidelines1/guidelines1'
				});
			},
			stop() {
				return
			},
			checkApply() {
				// 0 已上传实名信息并处在试用期或已付费--正常使用
				// 1 店铺被封了--不给进,显示msg的信息
				// 2 还未开通--跳到开通页面
				// 3 过了试用期--跳支付页面
				// 4 还未上传身份信息--跳上传身份信息页面
				this.getApp().request({
					url: this.getApp().api.selfSupport.check_apply,
					data: {
						userId: uni.getStorageSync('USER_INFO').id
					},
					success: res => {
						if (res.code == 0) {
							this.setData({
								privateUrl: '/private/home/home?type=2'
							});
						}

						if (res.code == 1) {
							this.setData({
								privateUrl: '/private/privateService/privateService?type=2'
							});
						}

						if (res.code == 2) {
							this.setData({
								privateUrl: '/private/privateService/privateService?type=2'
							});
						}

						if (res.code == 4) {
							this.setData({
								privateUrl: '/private/submitMaterial/submitMaterial'
							});
						}
					}
				});
			},

			// 邀请会员
			showModal() {
				this.setData({
					is_show_model: true,
					card_bg: uni.getStorageSync('_img').b1
				});
				this.getShareImg();
			},
			toMchPage() {
				this.closeKf()
				wx.navigateTo({
					url: '/member/homePage/homePage'
				})
			},

			closeVipModel() {
				this.setData({
					is_show_model: false
				});
			},

			// getAut:function () {
			// 	wx.getSetting({
			// 	  success (res) {
			// 	    console.log(res.authSetting)
			// 	    // res.authSetting = {
			// 	    //   "scope.userInfo": true,
			// 	    //   "scope.userLocation": true
			// 	    // }
			// 	  }
			// 	})
			// },
			// 跳转到卖家端
			toSeller: function() {
				uni.navigateToMiniProgram({
					// appId: 'wx5e79a4f1d637b9bf',
					appId: 'wxfd13fd712d32b3cb',
					path: '/pages/index/index',
					extraData: {
						// 传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
						mch_id: uni.getStorageSync('_mchInfo').id,
						token: uni.getStorageSync(this.getApp().const.ACCESS_TOKEN)
					},
					envVersion: 'trial',

					// 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效
					success(res) {
						// 打开成功
					},

					fail: function(res) {}
				});
			},
			// 上传微信
			toSellerUploadWX: function() {
				uni.navigateToMiniProgram({
					appId: 'wxfd13fd712d32b3cb',
					path: '/pages/bangdingWeChat/bangdingWeChat',
					extraData: {
						// 传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
						mch_id: uni.getStorageSync('_mchInfo').id,
						token: uni.getStorageSync(this.getApp().const.ACCESS_TOKEN)
					},
					envVersion: 'trial',

					// 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效
					success(res) {
						// 打开成功
					},

					fail: function(res) {}
				});
			},
			// 跳到小亲+跟上
			toSpeedUp() {
				uni.navigateToMiniProgram({
					appId: 'wxfd13fd712d32b3cb',
					path: '/tool/speedUp/speedUp',
					extraData: {
						// 传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
						mch_id: uni.getStorageSync('_mchInfo').id,
						token: uni.getStorageSync(this.getApp().const.ACCESS_TOKEN)
					},
					envVersion: 'trial',
				
					// 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效
					success(res) {
						// 打开成功
					},
				
					fail: function(res) {}
				});
			},
			toSendVip() {
				uni.navigateTo({
					url: '/member/sendCard/sendCard'
				})
			},
			getDailySpecial: function() {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.banner_list,

					success(res) {
						if (res.code == 0) {
							self.setData({
								dailySpecial: res.data
							});
						}
					}
				});
			},

			getVipCardStatus() {
				this.getApp().request({
					url: this.getApp().api.default.vip_card_status,
					success: res => {
						if (res.code == 0) {
							var bgUrl = this.bg;
							var bg = '';
							bg = bgUrl.a;

							this.setData({
								vipCardStatus: res.data.status,
								vipCardTime: res.data.msg,
								vipLevel: res.data.level,
								bg: bg,
								tomch_self_bg: uni.getStorageSync('_img').tomch_self_bg
							});
						}
					}
				});
			},

			// 跳转到设置页
			toSetting: function() {
				var self = this;
				uni.navigateTo({
					url: '/pages/setting/setting'
				});
			},
			loadData: function(options) {
				var self = this;
				self.setData({
					store: uni.getStorageSync(this.getApp().const.STORE) || {}
				});
				this.getApp().request({
					url: this.getApp().api.user.index,
					success: function(res) {
						if (res.code == 0) {

							if (res.data.tmp_id) {
								uni.setStorageSync('refundId', res.data.tmp_id.refund_tpl || '');
								uni.setStorageSync('sendId', res.data.tmp_id.send_tpl || '');
							}

							var buy_mch = res.data.user_info.buy_mch;

							if (buy_mch.open_member == 1 && buy_mch.user_jur == 1) {
								var can_shopkeeper = 1;
							} else {
								var can_shopkeeper = 0;
							}

							self.setData({
								group_order_no_pay_num: res.data.group_order_no_pay_num,
								applyStatus: res.data.mch.review_status,
								// 申请开店审核状态
								is_close: res.data.mch.is_close,
								// 店铺是否被关闭
								open_step: res.data.user_info.open_step,
								subsidy: res.data.user_info.subsidy || '0.00',
								// 津贴数量
								bg: res.data.banner_img,
								// a会员背景;b会员卡背景;c非会员背景
								vipCardBg: res.data.banner_img.b,

								can_shopkeeper: can_shopkeeper, // 是否可以购买小亲
								open_shop_tips: res.data.user_info.tips, // 是提不提示弹窗  0弹，1不弹
								open_shop_review_status: res.data.user_info.review_status, // 0 是审核中 1是审核通过 2是审核失败
								open_shop_review_result: res.data.user_info.review_result, // review_result 是弹窗内容
							});
							self.setData(res.data);
							self.getVipCardStatus();
							uni.setStorageSync(self.getApp().const.PAGES_USER_USER, res.data);
							// uni.setStorageSync(self.getApp().const.SHARE_SETTING, res.data.share_setting);
							uni.setStorageSync(self.getApp().const.USER_INFO, res.data.user_info);
						}
					}

				}); // 现金券数量
				// getApp().request({
				//   url: getApp().api.coupon.index,
				//   data: {
				//     status: 0,
				//   },
				//   success: function (res) {
				//     if (res.code == 0) {
				//       self.setData({
				//         couponNum: res.data.list.length,
				//       });
				//     }
				//   },
				// });
			},

			kf() {
				uni.getStorage({
					key: 'USER_INFO',

					success(user) {
						uni.getStorage({
							key: '_mchInfo',

							success(mch) {
								uni.navigateTo({
									url: '/pages/web/web?user_id=' + user.data.id + '&mch_id=' + mch.data.id
								});
							}
						});
					}
				});
			},

			callTel: function(e) {
				var tel = e.currentTarget.dataset.tel;
				uni.makePhoneCall({
					phoneNumber: tel //仅为示例，并非真实的电话号码
				});
			},
			verify: function(e) {
				uni.scanCode({
					onlyFromCamera: false,
					success: function(res) {
						uni.navigateTo({
							url: '/' + res.path
						});
					},
					fail: function(e) {
						uni.showToast({
							title: '失败'
						});
					}
				});
			},
			member: function() {
				uni.navigateTo({
					url: '/pages/member/member'
				});
			},
			clearCache: function() {
				uni.showActionSheet({
					itemList: ['清除缓存'],

					success(res) {
						if (res.tapIndex === 0) {
							uni.showLoading({
								title: '清除中...'
							});
							setTimeout(function() {
								uni.hideLoading();
							}, 1000);
						}
					}
				});
			},
			// 申请开店

			// 分享会员
			getShareData() {
				this.getApp().request({
					url: this.getApp().api.default.share_data,
					data: {
						userId: uni.getStorageSync('USER_INFO').id
					},
					success: res => {
						if (res.code == 0) {
							this.setData({
								parent_id: res.data.parent_id,
								store_id: res.data.store_id,
								store_group_id: res.data.store_group_id,
								sid: res.data.id
							});
						} 
					}
				});
			},

			getShareImg() {
				this.getApp().request({
					url: this.getApp().api.default.vip_share_img,
					success: res => {
						if (res.code == 0) {
							this.setData({
								shareImg: res.data.vipImg
							});
						}
					}
				});
			},

			shareVip() {
				this.getApp().request({
					url: this.getApp().api.default.share_vip,
					data: {
						userId: uni.getStorageSync('USER_INFO').id
					},
					success: res => {}
				});
			},
			openToast() {},
			//打开小亲本
			toQinBook() {

				uni.navigateTo({
					url: '/user/qinBook/qinBook'
				});
			},
			//是否获取用户手机号
			getPhoneState() {
				this.getApp().request({
					url: this.getApp().api.default.upload_info,
					data: {},
					success: (res) => {
						if (res.code == 0) {
							if (res.check_mch_tel == 1) {
								this.$store.commit('vuexSet', {
									name: 'show_phoneTpl',
									value: true
								})
							}
						}
					}
				})
			}

		}
	};
</script>

<style>

	/* user.wxss */
	page {
		background-color: #f4f4f4;
	}

	.user-user {
		min-height: 100%;
	}
	
	.close-shop-tip {
		padding: 8rpx 20rpx;
		font-size: 24rpx;
		color: #fff;
		background: #489A19;
		border-radius: 25rpx;
		margin-top: 4rpx;
	}
	
	.get-card-modal {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.7);
		z-index: 10000;
	}

	.get-card-modal-main {
		width: 441rpx;
		height: 550rpx;
		padding: 48rpx;
		background: #0081ff;
	}

	.get-card-modal-main_mch {
		width: 750rpx;
		height: 782rpx;
		padding: 48rpx;
		background: #0081ff;
	}

	/* 客服 */
	.get-card-modal-main-kf {
		width: 566rpx;
		padding: 39rpx 0rpx 47rpx;
		background: #fff;

		border-radius: 14rpx;
	}

	.get-card-modal-btn-kf {
		width: 226rpx;
		height: 88rpx;
		line-height: 88rpx;
		color: #FFFFFF;
		background: linear-gradient(-90deg, #FF374F, #FF6F05);
		border-radius: 12rpx;
		font-size: 36rpx;
	}

	.get-card-modal-text {
		font-size: 38rpx;
		color: #b86a24;
		margin-top: 48rpx;
	}
	
	/* 关店 */
	.get-card-modal-main-close {
		width: 531rpx;
		background: #fff;
		border-radius: 18rpx;
		overflow: hidden;
	}
	.get-card-modal-main-close-header {
		width: 100%;
		height: 120rpx;
		line-height: 120rpx;
		font-size: 40rpx;
		color: #fff;
		font-weight: bold;
		text-align: center;
		background: linear-gradient(270deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
	}
	.get-card-modal-main-close-body {
		padding: 50rpx 40rpx 40rpx;
	}
	.get-card-modal-btn-close {
		width: 400rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 30rpx;
		color: #fff;
		background: linear-gradient(270deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
		border-radius: 34rpx;
		margin: 94rpx auto 0;
	}

	.get-card-modal-btn {
		position: absolute;
		bottom: 47rpx;
		left: 50%;
		margin-left: -145rpx;
		width: 289rpx;
		height: 68rpx;
		background: linear-gradient(90deg, rgba(219, 197, 161, 1), rgba(211, 179, 128, 1));
		border-radius: 34rpx;
		text-align: center;
		line-height: 68rpx;
		font-size: 27rpx;
		color: #222222;
	}

	.get-card-modal-btn_mch {
		position: absolute;
		bottom: 64rpx;
		left: 50%;
		margin-left: -145rpx;
		width: 276rpx;
		height: 88rpx;
		background: linear-gradient(180deg, #ffe27b 0%, #e0a34c 100%);
		border-radius: 40rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #ffffff;
	}

	.shareShop {
		width: 508rpx;
		height: 616rpx;
		background: #fff;
		margin: 0 auto;
		border-radius: 13rpx 13rpx 0 0;
		transform: translateY(-100rpx);
	}

	.shopHead {
		height: 246rpx;
		background: #1a4c4b;
		padding: 20rpx 0;
		color: #fff;
		text-align: center;
		font-size: 12px;
		border-radius: 13rpx 13rpx 0 0;
	}

	.shopHead image {
		width: 111rpx;
		height: 111rpx;
		border: 10rpx solid #f5f5f5;
		border-radius: 50%;
		display: block;
		margin: 0 auto;
	}

	.shopHead .font_blod {
		font-weight: 600;
		margin-top: 20rpx;
	}

	.shopBottom {
		text-align: center;
		font-size: 14px;
		color: #595959;
		letter-spacing: 0;
		height: 76rpx;
		background: #fff;
		border-radius: 0 0 13rpx 13rpx;
		position: relative;
		overflow: hidden;
	}

	.appcode-img {
		width: 250rpx;
		height: 250rpx;
		display: block;
		margin: 0 auto;
		transform: translateY(60rpx);
	}

	.nav {
		width: 100%;
		color: #fff;
	}

	.con {
		width: 100%;
		top: 0;
		left: 0;
		display: flex;
		padding: 0 24rpx;
	}

	.title {
		position: absolute;
		width: 100%;
		left: 0rpx;
		bottom: 0rpx;
		background: #fff;
		border-radius: 30rpx 30rpx 0 0;
		padding: 23rpx 0 19rpx;
	}

	.backBtn {
		font-size: 36rpx;
		display: flex;
		align-items: center;
		height: 100%;
		justify-content: center;
		max-width: 100%;
		color: #ffffff;
		opacity: 0.5;
	}

	.user-msg-box {
		padding: 0 25rpx;
		padding-bottom: 192rpx;
	}

	.vip-card {
		position: absolute;
		bottom: 70rpx;
		left: 24rpx;
		right: 24rpx;
		width: 702rpx;
		height: 80rpx;
		padding: 24rpx 20rpx;
		border-radius: 40rpx 40rpx 0 0;
		margin-top: 42rpx;
	}

	.vip-card-btn {
		width: 130rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		background: #FFD98A;
		border-radius: 10rpx;
		color: #595959;
	}

	.logout {
		min-width: 114rpx;
		height: 42rpx;
		line-height: 38rpx;
		text-align: center;
		border: 2rpx solid rgba(255, 255, 255, 0.2);
		border-radius: 20rpx;
		margin-top: 22rpx;
		color: rgba(255, 255, 255, 0.8);
	}

	.allowance-btn {
		width: 122rpx;
		height: 48rpx;
		line-height: 44rpx;
		text-align: center;
		border: 2rpx solid rgba(255, 255, 255, 0.8);
		border-radius: 23rpx;
	}

	.after-navber {
		background: #f4f4f4;
		margin-top: -70rpx;
		overflow: hidden;
		padding: 0rpx 24rpx 0;
	}

	.user-info {
		/* height: 348rpx; */
		color: #000;
		background-color: #fff;
		position: relative;
		padding-top: 60rpx;
	}

	.border-bottom-20 {
		border-bottom: 20rpx solid rgba(207, 207, 207, 0.33);
	}

	.user-info view {
		z-index: 1;
	}

	.daily-special {
		padding: 20rpx 30rpx;
		background: #fff;
		margin-top: -18rpx;
	}

	.tomch-self {
		padding: 32rpx 24rpx;
		width: 750rpx;
	}

	.tomch-content {
		width: 702rpx;
		height: 110rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.tomch-content-guidelines {
		width: 702rpx;
		height: 195rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.user-info .avatar {
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
		margin: 0 45rpx 0 50rpx;
	}

	.user-info .user-name {
		font-weight: bold;
		font-size: 32rpx;
		color: #2c2c2c;
	}

	.order-block {
		background: #fff;
		border-bottom: 32rpx solid #f4f4f4;
		border-radius: 8rpx;
		overflow: hidden;
	}

	.my-order,
	.my-tool {
		position: relative;
		font-size: 30rpx;
		color: #333333;
		font-weight: bold;
		display: block;
		background-color: #fff;
		padding: 30rpx 20rpx 0rpx;
	}



	.order-block .nav-item {
		text-align: center;
		display: block;
		font-size: 24rpx;
		color: #333333;
		padding: 24rpx 0;
		position: relative;
	}

	.order-block .nav-item .num-icon {
		position: absolute;
		top: 16rpx;
		left: 50%;
		margin-left: 12rpx;
		display: inline-block;
		background: #c10000;
		color: #fff;
		border-radius: 999rpx;
		font-size: 20rpx;
		height: 30rpx;
		line-height: 30rpx;
		white-space: nowrap;
		min-width: 30rpx;
		text-align: center;
	}

	.item {
		position: relative;
	}

	.order-block .nav-item image {
		width: 64rpx;
		height: 58rpx;
		margin-bottom: 15rpx;
	}

	.option-list {
		margin-bottom: 20rpx;
	}

	.option-item {
		background: #fff;
		padding: 0 24rpx;
		display: block;
		position: relative;
	}

	.option-item .option-content {
		border-bottom: 1rpx solid #eee;
		height: 110rpx;
	}

	.option-item .option-icon {
		width: 50rpx;
		height: 50rpx;
		margin-right: 24rpx;
	}

	.option-item .option-jisntou {
		width: 12rpx;
		height: 22rpx;
	}

	button.option-item {
		font-size: inherit;
		color: inherit;
		font-family: inherit;
		border: none;
		background: #fff;
	}

	.user-level {
		margin-top: 16rpx;
		position: relative;
	}

	.user-level image {
		width: 44rpx;
		height: 44rpx;
		margin-right: 10rpx;
		margin-left: -4rpx;
	}

	.level-name {
		height: 36rpx;
		border-radius: 18rpx;
		font-size: 8pt;
		color: #fff;
		background-color: #3c3642;
		padding: 0 16rpx 0 0;
	}

	.integral-bg,
	.integral {
		height: 100rpx;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.integral-bg {
		background-color: #888;
		opacity: 0.1;
	}

	.integral {
		padding: 0 27rpx;
		color: #353535;
		font-size: 12pt;
	}

	.integral text {
		margin-left: 20rpx;
	}

	.integral image {
		width: 52rpx;
		height: 54rpx;
		margin-right: 20rpx;
	}

	.userinfo-name,
	.userinfo-addr {
		position: relative;
	}

	.userinfo-addr:after {
		content: '';
		display: block;
		position: absolute;
		top: 96rpx;
		border-top: 1rpx solid #9e9e9e;
		border-right: 1rpx solid #9e9e9e;
		transform: rotate(45deg);
		right: 30rpx;
		width: 20rpx;
		height: 20rpx;
	}

	.integral-num {
		margin-left: 20rpx;
	}

	.user-integral-arrow image {
		width: 16rpx;
		height: 26rpx;
	}

	.user-integral-go {
		font-size: 11pt;
		color: #666;
		margin-right: 20rpx;
	}

	.shadow-btn {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		background-color: rgba(0, 0, 0, 0);
		border: 0;
		border-radius: 0;
	}

	button::after {
		-webkit-transform: scale(0);
		transform: scale(0);
	}

	.num-1 {
		color: #ffbb43;
		font-size: 13pt;
		margin-bottom: 16rpx;
	}

	.num-2 {
		color: #666;
		align-items: center;
		line-height: 1;
	}


	.option-item.style {
		width: 25%;
		padding: 24rpx;
		font-size: 9pt;
	}

	.option-item.style .option-icon {
		margin: 0;
		margin-bottom: 12rpx;
	}

	.user-info-1 {
		margin-top: 50rpx;
		background-color: #fff;
		border-radius: 10rpx;
		height: 200rpx;
		width: 700rpx;
		color: #666;
		box-shadow: 0px 0px 12rpx 1rpx #ddd;
	}

	.list button {
		text-align: left;
		border-radius: 0;
		position: absolute;
		width: 100%;
		left: 0;
		top: 0;
		line-height: 88rpx;
		background: #fff;

		/* border-bottom: 1rpx solid #D6D6D6; */
		font-size: 24rpx;
		color: #2c2c2c;
		font-weight: bold;
	}

	.myPt {
		background: #f2e0d7;
		margin-top: 30rpx;
		padding: 16rpx 30rpx;
		color: #595959;
		font-size: 12px;
		margin-bottom: 20rpx;
	}

	.myPt .ptText {
		margin-top: 4rpx;
	}

	.myPt image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.myPt span {
		color: #c10000;
	}

	.myPt .toPt {
		padding: 8rpx 18rpx;
		background: #c10000;
		font-size: 10px;
		color: #fff;
		text-align: center;
		border-radius: 4rpx;
		display: inline-block;
	}

	.no-login-zhezhao {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		top: 210rpx;
		background: #ccc;
		z-index: 999;
		opacity: 0;
	}

	.tool-box {
		width: 20%;
		text-align: center;
		display: block;
		font-size: 28rpx;
		color: #595959;
		padding: 24rpx 0;
	}

	.tool-icon {
		color: #595959;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		line-height: 80rpx;
		margin: auto;
		margin-bottom: 15rpx;
		font-size: 60rpx;
		position: relative;
	}

	.tool-active::after {
		content: '';
		width: 18rpx;
		height: 18rpx;
		background: #ff5e5d;
		border-radius: 50%;
		position: absolute;
		right: -2rpx;
		top: -2rpx;
		z-index: 9;
	}

	.semoll {
		width: 68rpx;
		height: 68rpx;
		line-height: 68rpx;
		font-size: 36rpx;

	}

	.icon-new-box {
		position: absolute;
		right: 30rpx;
		top: 8rpx;
		color: #FF0B1D;
	}

	.tab-bar {
		width: 340rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(236, 236, 236, 0.5);
		border-radius: 8rpx;
		padding: 27rpx 20rpx 22rpx 40rpx;
	}

	.tab-bar-icon {
		padding: 8rpx 16rpx;
		background: linear-gradient(270deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
		box-shadow: 0px 2rpx 2rpx 0px rgba(170, 170, 170, 0.5);
		border-radius: 24rpx;
	}
	.new-label {
		position: absolute;
		right: 32rpx;
		top: 28rpx;
		width: 20rpx;
		height: 20rpx;
		background: #EB0401;
		border-radius: 50%;
	}
</style>
