<template>
	<!--小亲本-->
	<view class="qinbook">
		<!-- 导航开始 -->
		<custom mode="2" fixed="fixed" title="小亲本" background="#FFFFFF" backColor="#333333" titleColor="#333333"></custom>
		<!-- 导航结束 -->

		<!-- 数据面板开始 -->
		<view v-if="dataList.length>0 || dataList2.length>0" class="data-panel panel-xian ml-24 mt-24 color-333333 flex "
		 style="border-radius:30rpx;background-color: #FFFFFF;height: 200rpx;width: 702rpx;">
			<view class="panel-1 ">
				<view class="top">
					<text style="font-weight: bold;color: #333333;font-size: 60rpx;line-height: 50rpx;">{{indexInfo.total_brand_attention || '0'}}</text><text
					 style="font-size: 24rpx;color: #333333;padding-left: 8rpx;">(个)</text>
				</view>
				<view class="bottom">
					总品牌关注数
				</view>
			</view>
			<view class="panel-1 ">
				<view class="top">
					<text style="font-weight: bold;color: #333333;font-size: 60rpx;line-height: 50rpx;">{{indexInfo.total_user_attention || '0'}}</text><text
					 style="font-size: 24rpx;color: #333333;padding-left: 8rpx;">(人)</text>
				</view>
				<view class="bottom">
					总关注人数
				</view>
			</view>
		</view>
		<!-- 数据面板结束 -->

		<!-- 搜索框开始 -->
		<view class="qinInput" v-if="dataList.length>0 || dataList2.length >0">
			<view class="select-seach"  >
				<view class="iconfont icon-sousuo icon"></view>
				<input  placeholder="搜索顾客昵称、品牌名称" v-model="seachtext" @input="seach_change" @blur="seach_change"></input>
				<view @tap="clear_seach" v-show="seachtext" class="iconfont icon-guanbi-" style="font-size: 32rpx;color: #616161;margin-right: 0rpx;margin-left: 20rpx;">

				</view>
			</view>
		</view>
		<!-- 搜索框结束 -->

		<!-- 页面功能提示开始 -->
		<view class="notice-title">
			<text>【特别提醒】</text>
			{{indexInfo.warning_label ?indexInfo.warning_label:  ""}}
		</view>
		<!-- 页面功能提示结束 -->

		<!-- 显示顾客和品牌开始 -->
		<view class="myuser flex-x-center">
			<block v-if="dataList.length == 0 && dataList2.length ==0">
				<image style="width: 690rpx;height: 669rpx;margin-top: 120rpx;" :src="indexInfo.img2" mode="aspectFill"></image>
			</block>
			<!-- <block v-else>
			<view v-if="showState" class="yonghu">
				<view v-for="(item, index) in dataList" :key="index" class="yonghu-item" @tap="toUser" hover-class="click" :data-id="item.user_id">
					<text class="yonghu-icon iconfont icon-yonghu "></text>
					<text class="yonghu-name ns-text-limit">{{item.user_name}}</text>
					<view class="yonghu-num">关注{{' '+ item.user_brand_sum +' '}}个品牌
						<text class="iconfont icon-jinru"></text>
					</view>
				</view>
			</view>
			<view v-if="!showState" class="yonghu">
				<view v-for="(item, index) in dataList" :key="index" class="yonghu-item" @tap="toPinpaiLike" hover-class="click" :data-id="item.brand_id" :data-name="item.brand_name">
					<text class="yonghu-icon iconfont icon-pinpai " style="color:#489A19;"></text>
					<text class="yonghu-name ns-text-limit">{{item.brand_name}}</text>
					<view class="yonghu-num">{{item.user_brand_sum + ' '}}个顾客关注
						<text class="iconfont icon-zengjia"></text>
					</view>
				</view>
			</view>
		</block> -->
			<block v-else>
				<view style="margin-bottom:320rpx;">
					<view class="brand-tab" :style="{'top':customBar+ 'px'}">
						<view :class="{'active':showState == true}" @click="changeShow(true)">品牌关注</view>
						<view :class="{'active':!showState}" @click="changeShow(false)">顾客关注</view>
					</view>


					<!-- 显示品牌开始 -->
					<view class="brand-pinpai" v-if="showState==true">
						<view class="brand-box-all" v-for="(item,index) in dataList2" :key="index">
							<block v-if="Number(item.user_brand_sum) > 0 && item.have != false">
								<view class="brand-list" @tap="toDetail(item.brand_id,item.start_date,item.icon)">
									<view class="left">
										<view class="line1">
											<text class="iconfont icon-pinpai1" style="margin-right: 15rpx;font-size: 30rpx;"></text>
											<text class="aaa"  style="flex:1;white-space: nowrap;text-overflow: ellipsis; font-size: 30rpx;color: #8714EE;">{{item.brand_name}}</text>
											<text class="smoll" style="text-align: right;">{{item.user_brand_sum || 0}}位顾客关注</text>
										</view>
										<view class="line2" v-show="item.icon">
											结束时间：{{item.end_date}}
										</view>
									</view>
									<view class="right" :class="{'acitve':item.show == true}" @tap.stop="show_more(item,item.brand_id)">
										<text class="iconfont icon-xiangxia"></text>
									</view>

									<!-- 左上角显示new图片开始 -->
									<image v-if="item.icon" :src="item.icon" mode="" style="width: 88rpx;height: 88rpx; position: absolute;top: -10rpx;left: -18rpx; z-index: 9;"></image>
									<!-- 左上角显示new图片结束 -->
								</view>
								<!-- 显示内容开始 -->
								<view class="show-content" v-show="item.show == true">
									<view class="show-list" v-for="(item2,index2) in item.show_list" :key="index2">
										<text class="iconfont icon-ren1" style="margin-left: 36rpx;"></text>
										<text style="margin-left: 20rpx;flex:1;">{{item2.user_name}}</text>
										<text class="iconfont icon-shanchu2" style="padding-left: 20rpx;padding-right: 27rpx;margin-right: 20rpx;color:#333333;"
										 @tap="delete_user(item.show_list,item2,index2,index)"></text>
									</view>
								</view>
								<!-- 显示内容结束 -->
							</block>
						</view>

						<!-- 没有用户信息开始 -->
						<view class="is_null" style="text-align: center;" v-if="dataList2.length == 0 || show2">
							<!-- <view class="iconfont icon-kong1" style="font-size: 150rpx;margin-top: 80rpx;color: #999999;">

							</view> -->
							<image :src="indexInfo.img" mode="" style="margin-top: 80rpx;width: 150rpx;height: 150rpx; display: inline-block;"></image>
							<view style="text-align: center;line-height: 100rpx;font-size: 30rpx; color: #999999;">
								暂无数据
							</view>
						</view>
						<!-- 没有用户信息结束 -->

					</view>

					<!-- 显示品牌结束 -->
					<!-- 显示用户开始 -->
					<view class="brand-pinpai" v-else>
						<view class="brand-box-all" v-for="(item,index) in dataList">
							<block v-if="Number(item.user_brand_sum) > 0 && item.have != false">
								<view class="brand-list">
									<view class="left">
										<view class="line1">
											<text class="iconfont icon-ren1" style="margin-right: 15rpx;font-size: 30rpx;"></text>
											<text class="aaa"  style="flex:1;white-space: nowrap;text-overflow: ellipsis; font-size: 30rpx;color: #8714EE;">{{item.user_name}}</text> <text class="smoll">关注{{item.user_brand_sum || 0}}个品牌</text>
										</view>
										<!-- <view class="line2">
											活动时间：2020-11-20 ～ 2020-11-30
										</view> -->
									</view>
									<view class="right" :class="{'acitve':item.show == true}" @tap="show_more(item,item.user_id)">
										<text class="iconfont icon-xiangxia" style="text-align: right;"></text>
									</view>
								</view>
								<!-- 显示内容开始 -->
								<view class="show-content" v-show="item.show == true">
									<view class="show-list" v-for="(item2,index2) in item.show_list">
										<text class="iconfont icon-pinpai1" style="margin-left: 36rpx;"></text>
										<text style="margin-left: 20rpx;flex:1;">{{item2.brand_name}}</text>
										<text class="iconfont icon-shanchu2" style="padding-left: 20rpx;padding-right: 27rpx;margin-right: 20rpx;color:#333333;"
										 @tap="delete_brand(item.show_list,item2,index2,index)"></text>
									</view>
								</view>
							</block>

							<!-- 显示内容结束 -->
						</view>

						<!-- 没有用户信息开始 -->
						<view class="is_null" style="text-align: center;" v-if="dataList.length == 0 || show1">
							<!-- <view class="iconfont icon-kong1" style="font-size: 150rpx;margin-top: 80rpx;color: #999999;">

							</view> -->
							<image :src="indexInfo.img" mode="" style="margin-top: 80rpx;width: 150rpx;height: 150rpx; display: inline-block;"></image>
							<view style="text-align: center;line-height: 100rpx;font-size: 30rpx; color: #999999;">
								暂无数据
							</view>
						</view>
						<!-- 没有用户信息结束 -->

					</view>
					<!-- 显示用户结束 -->
				</view>

			</block>
		</view>
		<!-- 显示顾客和品牌结束 -->

		<!-- 右下角图标信息提示开始 -->
		<view class="new-notice">
			<view class="new-item" @tap.stop="toActiveAll" hover-class="click">
				<text :class="'iconfont icon-tixing2 ' + (indexInfo.is_remind == 1?'active':'')"></text>
			</view>
			<view class="new-item" @tap.stop="toAddLike" hover-class="click">
				<text class="iconfont icon-tianjia"></text>
			</view>
		</view>
		<!-- 右下角图标信息提示结束 -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				showState: true, //true显示用户，false显示品牌
				indexInfo: {},
				dataList: [],
				dataList2: [],
				seachtext: '', //搜索框
				null_image:'',
			};
		},
		computed:{
			show1(){
				let arr = [];
				this.dataList.forEach(val=>{
					if(val.have!=""){
						if(val.have == true){
							arr.push(true);
						} else{
							arr.push(false)
						}
					}
				})
				// console.log(arr);
				if(arr.includes(true)){
					return false;
				}
				if(arr.length == 0){
					return true;
				}
				if(!arr.includes(true) && arr.length>0){
					return false;
				}
				return true;
		
			},
			show2(){
				let arr = [];
				this.dataList2.forEach(val=>{
					if(val.have!=""){
						if(val.have == true){
							arr.push(true);
						}else{
							arr.push(false)
						}
					}
				})
				// console.log(arr);
				if(arr.includes(true)){
					return false;
				}
				if(arr.length == 0){
					return true;
				}
				if(!arr.includes(true) && arr.length>0){
					return false;
				}
				return true;
			},
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.qinBookIndex();
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.qinBookIndex();
			this.getData('user');
			this.getData('brand');
		},



		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			//去到活动详情页
			toDetail(id,time,icon){
				// if(time!=""&&id!=""){
					if(icon){
					uni.navigateTo({
						url: '/user/activeRemind/activeRemind?id=' + id
					});
				}
				
			},
			returnPage() {
				uni.navigateBack({
					delta: 1,
					fail: res => {
						uni.redirectTo({
							url: '/pages/index/index'
						});
					}
				});
			},

			qinBookIndex() {
				//获取用户和品牌总数
				this.getApp().request({
					url: this.getApp().api.maijia.mch_note_index,
					success: res => {
						// console.log('mch_note_index', res)
						if (res.code == 0) {
							this.setData({
								indexInfo: res.data
							});
						} else {}
					}
				});
			},
 
			getData(type) {
				this.getApp().request({
					url: this.getApp().api.maijia.user_brand_list,
					data: {
						// type: this.showState ? 'user' : 'brand',
						type: type
					},
					success: res => {
						// console.log(type, type, res)
						if (res.code == 0) {
							if (type == 'user') {
								this.dataList = res.data;
							} else {
								this.dataList2 = res.data;
							}

						} else {}
					}
				});
			},

			//搜索
			toSeach() {
				uni.navigateTo({
					url: '/user/qinSeach/qinSeach'
				});
			},

			//切换显示用户和品牌
			changeShow(state) {

				this.showState = state;

				// this.getData(state? 'brand' : 'user');
			},

			//去用户信息页
			toUser(e) {
				//#ifdef MP-WEIXIN
				wx.navigateToMiniProgram({
					appId: 'wxfd13fd712d32b3cb',
					path: '/user/user/user?user_id=' + e.currentTarget.dataset.id,
					extraData: {
						// 传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
						mch_id: uni.getStorageSync('_mchInfo').id,
						token: uni.getStorageSync(this.getApp().const.ACCESS_TOKEN)
					},
					envVersion: 'trial',

					// 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效
					success(res) { // 打开成功
					},

					fail: function(res) {}
				});
				//#endif
			},

			//去品牌偏好页
			toPinpaiLike(e) {
				uni.navigateTo({
					url: '/user/pinpaiLike/pinpaiLike?brand_id=' + e.currentTarget.dataset.id + '&brand_name=' + e.currentTarget.dataset
						.name
				});
			},

			//去全部活动页面
			toActiveAll() {
				uni.navigateTo({
					url: '/user/remindAll/remindAll'
				});
			},

			//去添加页面
			toAddLike() {
				uni.navigateTo({
					url: '/user/addPinpai/addPinpai'
				});
			},
			//下拉展示更多
			show_more(item, id) {
				if (item.show == true) {
					item.show = false;
					this.dataList2 = this.dataList2.concat();
					this.dataList = this.dataList.concat();
				} else {
					item.show = true;
					if (!item.show_list) {
						if (this.showState == false) {
							///////////////////////////////////////////////
							this.getApp().request({
								url: this.getApp().api.maijia.user_brand_attention,
								data: {
									// type: this.showState ? 'user' : 'brand',
									user_id: id
								},
								success: res => {
									if (res.code == 0) {
										item.show_list = res.data || [];
										this.dataList2 = this.dataList2.concat();
									}
								}
							});
							////////////////////////////////
						} else {
							/////////////////
							this.getApp().request({
								url: this.getApp().api.maijia.user_brand_attention,
								data: {
									brand_id: id
								},
								success: res => {
									if (res.code == 0) {
										item.show_list = res.data || [];
										this.dataList = this.dataList.concat();
									}
								}
							});
							///////////////

						}
					}
					this.dataList2 = this.dataList2.concat();
					this.dataList = this.dataList.concat();
				}
			},
			//删除品牌
			delete_brand(arr, item, index, fu_index) {
				// console.log(arr,item, index)
				uni.showModal({
					content: '活动开始将无法提醒，确认删除吗',
					success: res => {
						if (res.confirm) {
							this.getApp().request({
								url: this.getApp().api.maijia.del_brand,
								method: 'POST',
								data: {
									id: item.id
								},
								success: res => {
									if (res.code == 0) {
										this.qinBookIndex();
										arr.splice(index, 1);
										this.dataList[fu_index].user_brand_sum = Number(this.dataList[fu_index].user_brand_sum) - 1;
										this.dataList = this.dataList.concat();
										uni.showToast({
											title: '删除成功！',
											icon: 'none'
										})
									}
									if (res.code == 1) {
										uni.showToast({
											title: res.msg,
											icon: 'none'
										})
									}
								}
							});
						}
					}
				});
			},
			//删除用户
			delete_user(arr, item, index, fu_index) {
				// console.log(arr,item, index)
				uni.showModal({
					content: '活动开始将无法提醒，确认删除吗',
					success: res => {
						if (res.confirm) {
							this.getApp().request({
								url: this.getApp().api.maijia.del_brand,
								method: 'POST',
								data: {
									id: item.id
								},
								success: res => {
									if (res.code == 0) {
										this.qinBookIndex();
										arr.splice(index, 1);
										this.dataList2[fu_index].user_brand_sum = Number(this.dataList2[fu_index].user_brand_sum) - 1;
										this.dataList = this.dataList.concat();
										uni.showToast({
											title: '删除成功！',
											icon: 'none'
										})
									}
									if (res.code == 1) {
										uni.showToast({
											title: res.msg,
											icon: 'none'
										})
									}
								}
							});
						}
					}
				});
			},
			//搜索过滤
			seach_change(e){
				// console.log(e.detail.value);
				let p = String(e.detail.value) || '';
				if(p == ''){
					console.log('p',p)
					this.clear_seach();
					return ;
				}
				//   brand_name
				this.dataList.forEach((val,index)=>{
					if(String(val.user_name).indexOf(p)!=-1){
						val.have = true;
					} else {
						val.have = false;
					}
				})
				this.dataList2.forEach((val,index)=>{
					if(String(val.brand_name).indexOf(p)!=-1){
						val.have = true;
					} else {
						val.have = false;
					}
				});
				
				
				this.dataList2 = this.dataList2.concat();
				this.dataList = this.dataList.concat();
			},
			//清除 
			clear_seach(){
				this.seachtext = "";
				this.dataList.forEach((val,index)=>{
						val.have = true;
				})
				this.dataList2.forEach((val,index)=>{
					val.have = true;
				});
				
				
				this.dataList2 = this.dataList2.concat();
				this.dataList = this.dataList.concat();
			},
		}
	};
</script>
<style>
	/* user/qinBook/qinBook.wxss */

	page {
		background: #f7f7f7;
	}

	.heardBanner {
		width: 750rpx;
		background: linear-gradient(134deg, rgba(48, 35, 174, 1) 0%, rgba(200, 109, 215, 1) 100%);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9;
	}


	/* 搜索框开始 ****************************/


	/* input框 ******************************/

	.qinInput {
		display: flex;
		flex-flow: row nowrap;
		width: 720rpx;
		margin: 30rpx 0 0 25rpx;
		height: 80rpx;
	}

	.input-right {
		width: 90rpx;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		color: #7944E4;
		font-size: 50rpx;
		/* background-color: red; ***********************/
	}

	.icon-bottom1 {
		font-size: 20rpx;
		font-weight: 400;
		line-height: 28rpx;
	}

	.select-seach {
		width: 702rpx;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 40rpx;
		background-color: #ffffff;
		padding: 0 25rpx;
		color: #4d4d4d;
		font-size: 30rpx;
		display: flex;
		align-items: center;
	}

	.select-seach>view {
		margin-right: 14rpx;
		font-size: 24rpx;
		color: #616161;
	}

	.select-seach input {
		flex: 1;
		font-size: 24rpx
	}


	/* 特别提醒 *************************/

	.notice-title {
		width: 700rpx;
		font-size: 24rpx;
		font-weight: 300;
		color: #595959;
		line-height: 33rpx;
		margin: 5rpx 0 0 25rpx;
	}

	.notice-title text {
		/* color: #7944E4; */
		color: #000000;
		font-weight: bold;
	}


	/* 页面教程 ***************************/

	.teach {
		width: 650rpx;
		margin: 96rpx 0 0 50rpx;
	}

	.teach-title {
		margin-top: 37rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #4A4A4A;
		line-height: 42rpx;
	}

	.teach-image1 {
		margin-top: 37rpx;
		width: 650rpx;
		height: 384rpx;
		background-color: rgba(0, 0, 0, 0.3);
	}


	/* 右下角提示************************************* */

	.new-notice {
		position: fixed;
		right: 26rpx;
		bottom: 105rpx;
		width: 80rpx;
		z-index: 9;
	}

	.new-item {
		width: 80rpx;
		height: 80rpx;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 40rpx;
		text-align: center;
		position: relative;
		color: #ffffff;
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.new-item text {
		font-size: 40rpx;
	}

	.new-notice .active::after {
		position: absolute;
		content: "";
		width: 15rpx;
		height: 15rpx;
		background: linear-gradient(139deg, #FAD961 0%, #F76B1C 100%);
		border-radius: 50%;
		top: 25rpx;
		right: 25rpx;
	}


	/* 用户和品牌列表 */

	.yonghu {
		margin-top: 10rpx;
		margin-bottom: 20rpx;
		width: 100%;
	}

	.yonghu-item {
		width: 700rpx;
		margin: 20rpx 0 0 25rpx;
		border-radius: 8rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		line-height: 103rpx;
		font-size: 30rpx;
		font-weight: 400;
		padding: 0 25rpx 0 35rpx;
		color: #4A4A4A;
	}

	.yonghu-icon {
		color: #F76436;
		margin-right: 30rpx;
	}

	.yonghu-name {
		display: inline-block;
		width: 320rpx;
	}

	.yonghu-num {
		line-height: 103rpx;
		flex: 1;
		color: #9B9B9B;
		text-align: right;
	}

	.click {
		opacity: 0.8;
		/* transition: all 0.1s; */
		transform: scale(0.99);
	}

	/* 亲本样式大改 开始*/
	.data-panel {
		align-items: center;
		flex-flow: row nowrap;
	}

	.panel-1 {
		width: 50%;

	}

	.panel-1 .top {
		display: flex;
		flex-flow: row nowrap;
		align-items: flex-end;
		justify-content: center;
		/* background-color: red; */
	}

	.panel-1 .bottom {
		text-align: center;
		color: #666666;
		font-size: 30rpx;
		margin-top: 18rpx;
	}

	.panel-xian {
		position: relative;
	}

	.panel-xian::after {
		content: "";
		position: absolute;
		right: 350rpx;
		top: 70rpx;
		width: 2rpx;
		height: 60rpx;
		background-color: rgba(190,190,190,0.3);
	}

	.brand-tab {

		width: 750rpx;
		height: 80rpx;
		background-color: #F7F7F7;
		/* background-color:red; */
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		box-sizing: border-box;
		padding: 0 50rpx;
		/* 吸顶开始 */
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		position: -webkit-sticky;
		/* #endif */
		position: sticky;
		/* top: var(--window-top); */
		z-index: 99;

		/* 吸顶结束 */

	}

	.brand-tab view {

		height: 80rpx;
		width: 50%;
		text-align: center;
		color: #333333;
		font-size: 30rpx;
		line-height: 80rpx;

	}

	.brand-tab .active {
		position: relative;
		color: #8714EE;
	}

	.brand-tab .active::after {
		content: "";
		position: absolute;
		width: 60rpx;
		height: 6rpx;
		border-radius: 3rpx;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%);
		z-index: 9;
		background-color: #8714EE;
	}

	/* 亲本样式大改 结束*/
	.brand-box-all {
		border-radius: 16rpx;
		background-color: #FFFFFF;
		/* overflow: hidden; */
		width: 702rpx;
		margin-top: 24rpx;
		margin-left: 24rpx;
	}

	.brand-list {
		min-height: 126rpx;
		width: 702rpx;
		/* margin-left: 24rpx; */
		display: flex;
		flex-flow: row nowrap;
		/* background-color: #FFFFFF; */
		/* border-radius: 16rpx; */
		align-items: center;
		position: relative;

	}

	.brand-list .left {
		flex: 1;
		margin-left: 30rpx;
	}

	.left .line1 {
		display: flex;
		flex-flow: row nowrap;
		align-items: flex-end;

	}

	.left .line1 text {
		color: #333333;
		font-size: 20rpx;
	}
	.left .line1 .aaa{
		width: 250rpx;
		display: inline-block;
		white-space: nowrap;
		text-overflow:clip;
		/* background-color: red; */
		overflow-x: hidden;
	}

	.left .line1 .smoll {
		margin-left: 30rpx;
	}

	.left .line1 .iconfont {
		color: #8714EE;
		font-size: 26rpx;
		font-weight: bold;
	}

	.left .line2 {
		margin-top: 16rpx;
		color: #999999;
		font-size: 20rpx
	}

	.brand-list .right {
		width: 60rpx;
		height: 60rpx;
		font-size: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30rpx;
		background-color: #F4F4F4;
		margin: 0 30rpx;
		transition: all 0.3s;
	}

	.brand-list .acitve {
		transform: rotate(180deg);
	}

	.show-content {
		box-sizing: border-box;
		border-top: 1rpx solid rgba(244, 244, 244, 0.5);
		padding-bottom: 10rpx;
	}

	.show-list {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		color: #666666;
		line-height: 70rpx;
		font-size: 30rpx;
	}

	.show-list text {
		line-height: 70rpx;
	}
	
</style>
