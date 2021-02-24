<template>
	<!--pages/newSearch/newSearch.wxml-->
	<view class="page pr">

		<common></common>

		<view class="bottom-box flex justify-end">
			<view class="mr-30" @tap.stop="get_share_img">
				<view class="icon-round">
					<view class="iconfont icon-xiazai1 fs-40 color-EB0401"></view>
				</view>
				<view class="fs-24 color-EB0401 text-center" >海报</view>
			</view>
			<button open-type="share" style="background:transparent;border:0;padding:0;margin:0;line-height: 1.25;">
				<view class="icon-round">
					<view class="iconfont icon-fenxiang2 fs-40 color-EB0401"></view>
				</view>
				<view class="fs-24 color-EB0401 text-center">分享</view>
			</button>
		</view>
		<view class="flex-y-center flex-x-center">
			<view class="logo-box ">
				<view class="iconfont icon-qinpuLOGO color-fff" style="font-size: 48rpx;"></view>
			</view>
			<view class="color-EB0401 ns-text-bold" style="font-size: 50rpx;">{{bigTitle}}</view>
		</view>

		<view class="search-box flex align-center">
			<view class="flex-grow-1 flex align-center">
				<view class="iconfont icon-sousuo mr-24 flex-grow-0"></view>
				<input class="fs-30 color-595959 flex-grow-1" focus type="text" :value="seachVal" @confirm="sendSeach" @input="seachInput"
				 placeholder="输入想要的宝贝关键字" />
			</view>
			<view class="flex-grow-0 search-box-btn" @tap="sendSeach">搜索</view>
		</view>

		<view class="hot-search">
			<view class="hot-search-title">热门搜索</view>
			<view class="hot-search-main flex ns-wrap">
				<view class="hot-search-value ns-text-limit" v-for="(item, index) in hotSearchList" :key="index" :data-words="item.words" @tap="history">{{item.words}}</view>
			</view>
		</view>

		<view class="hot-search">
			<view class="hot-search-title flex align-center justify-between">
				<view>历史搜索</view>
				<view class="iconfont icon-shanchu11 color-616161 fs-30" @click="removeHistory"></view>
			</view>
			<view class="hot-search-main flex ns-wrap">
				<view class="hot-search-value ns-text-limit" v-if="index<10" v-for="(item, index) in historyList" :key="index" :data-words="item" @tap="history">{{item}}</view>
			</view>
		</view>
		
		<navigator url="/pages/guanyiguan/guanyiguan" open-type="redirect" style="position: absolute;bottom: 33rpx;left: 50%;margin-left: -30rpx;" >
				<view class="iconfont icon-jinrufasong fs-50 color-EB0401 text-center ns-text-bold"></view>
			<view class="fs-24 color-EB0401 text-center mt-10" >去商城</view>
		</navigator>

		<!-- 回到顶部 -->
		<to-top :scrollStop="scrollStop" :is_top="is_top" :page="page1" :totalPage="totalPage"></to-top>
		
		<!-- 分享海报 -->
		<share2 ref="share2" :loadingSrc="__wxapp_img.system.loading2.url"></share2>
		
	</view>
</template>

<script>
	import toTop from '../../components/toTop/toTop.vue'
	import share2 from '../../components/share2/share2.vue';
	export default {
		data() {
			return {
				y: uni.getSystemInfoSync().windowHeight,
				showSeach: true,
				seachHeight: '',
				page: 1,
				seachVal: '',
				filters: require('../../utils/filters.js'),
				list: [
					[]
				],
				role: 'user',
				scrollStop: true,
				is_top: false,
				page1: 1,
				focus: false,
				app: getApp().globalData.app,
				bigTitle: '亲导购', // 大标题
			}
		},
		components: {
			toTop,
			share2,
		},
		computed: {
			init_img() {
				return this.$store.state.init_img || {};
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
			this.getApp().page.onLoad(this, options);
			this.loadData();
			this.setData({
				role: uni.getStorageSync('role') || 'user'
			});

			var token = uni.getStorageSync('ACCESS_TOKEN')
			if (!token) {
				this.setData({
					showGetLogin: true,
				})
				this.$store.commit('vuexSet', {
					name: 'show_loginTpl',
					value: true
				})
				return
			}
		},
		methods: {
			get_share_img(type) {
				//////////////////////////////打开分享弹窗
				this.$refs.share2.open(() => {
					this.getApp().request({
						url: this.getApp().api.default.search_share_pic,
						success: res => {
							console.log('get1111111111', res)
							if (res.code == 0) {
								res.data.pic_url && this.$refs.share2.setSrc(res.data.pic_url);
							} else {
								this.showToast(res.msg)
							}
						}
					});
				});
			},
			loadData() {
				var self = this;
				if (uni.getStorageSync("History_seach")) {
					let historyList = uni.getStorageSync("History_seach")
					console.log(historyList);
					self.setData({
						showHistor: true,
						historyList: JSON.parse(uni.getStorageSync("History_seach"))
					})
				}
				// 获取热搜
				this.getApp().request({
					url: this.getApp().api.default.hot_search,
					success: (res) => {

						if (res.code == 0 && res.data.length != 0) {
							self.setData({
								showHotsearch: true,
								hotSearchList: res.data.hot,
								bigTitle: res.data.name, // 大标题
							})
						}
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			// 清空输入框
			clearVal() {
				var self = this;
				this.setData({
					seachVal: '',
					showSeach: true,
					processSeach: false,
					showRult: false,
					rultContent: false,
					showHistor: false, //历史记录
					historyList: [],
					showHotsearch: false, //热搜
					hotSearchList: [],
					page: 1,
				}, () => {
					self.loadData();

				})
			},
			// 点击历史搜索
			history(e) {
				var val = e.currentTarget.dataset.words
				this.setData({
					seachVal: val
				})
				this.sendSeach();

			},
			// 输入框改变
			seachInput(e) {
				var val = e.detail.value,
					self = this;
				self.setData({
					seachVal: val
				})
				// 防抖函数
				if (timeout) {
					clearTimeout(timeout);
				}
				var timeout = setTimeout(() => {
					// 模糊搜索
					this.getApp().request({
						url: this.getApp().api.default.like_search,
						data: {
							q: val
						},
						success: function(res) {
							if (res.code == 0) {
								var processSeach = true;
								if (res.data.length == 0) {
									processSeach = false
								}
								self.setData({
									processSeach: processSeach,
									likeList: res.data,
								})
							}
						}
					});
				}, 500)
			},
			// 清除历史记录
			removeHistory() {
				uni.removeStorageSync('History_seach');
				this.setData({
					showHistor: false,
					historyList: []
				})
			},
			closeLike() {
				this.setData({
					processSeach: false
				})
			},
			stop() {
				return
			},
			// 执行搜索
			sendSeach() {
				var self = this;
				var val = self.seachVal
				if (val && val.length > 0) {
					if (uni.getStorageSync("History_seach")) {
						var searchList = JSON.parse(uni.getStorageSync("History_seach"));
						if (searchList.indexOf(val) == -1) {
							searchList.unshift(val);
							if (searchList.length > 10) {
								searchList.splice(10,1);
							}

							uni.setStorageSync("History_seach", JSON.stringify(searchList))
						}
					} else {
						var searchList = [val];
						uni.setStorageSync("History_seach", JSON.stringify(searchList))
					}
				} else {
					uni.showModal({
						title: '请输入关键字',
						showCancel: false,
						success: (res) => {
							self.clearVal();
						}
					})
					return false;
				}
				// 如果要搜索别的平台，要传 type  1亲铺 2京东 3淘宝
				uni.navigateTo({
					url: '/pages/seachAll/seachAll?keyword=' + self.seachVal
				})
				return

			},
		},
		onShow() {
			if (uni.getStorageSync("History_seach")) {
				let historyList = uni.getStorageSync("History_seach")
				console.log(historyList);
				this.setData({
					showHistor: true,
					historyList: JSON.parse(uni.getStorageSync("History_seach"))
				})
			}
		},
		onShareAppMessage(res) {
			var user_info = this.getApp().getUser();
			var mch_info = uni.getStorageSync('_mchInfo');
			return {
				path: "/pages/newSearch/newSearch?user_id=" + user_info.id + "&mch_id=" + mch_info.id,
				title: '买之前·问亲铺，省钱省事省时间，快来看看～',
				imageUrl: uni.getStorageSync('_img').qwsp_zxyh
			};
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom() {
			var self = this
			var page = self.page
			if (self.tabIns == 0) {
				var url = this.getApp().api.default.search_goods
				var data = {
					q: self.seachVal,
					brand_id: self.brand_id || '',
					cat_id: self.cat_id || '',
					p_cat_id: self.p_cat_id || '',
					sort: self.sort || '',
					by: self.by || ''
				}
				this.getApp().core.pading(self, url, data, (res) => {
					if (res.data.goods.length == 0) {
						self.setData({
							stopLoadMore: true,
						})
						return
					}
					var newGoodList = res.data.goods
					var nowGoodList = self.goodsList.concat(newGoodList)
					self.setData({
						goodsList: nowGoodList,
					})
				})
			}
		},
	}
</script>

<style>
	page {
		background: #fff;
	}

	.page {
		width: 100%;
		height: 100vh;
		padding: 10rpx 24rpx;
	}

	.bottom-box {
		padding-right: 10rpx;
		margin-bottom: 120rpx;
	}

	.icon-round {
		width: 60rpx;
		height: 60rpx;
		text-align: center;
		line-height: 54rpx;
		background: rgba(255, 255, 255, 0.64);
		border: 4rpx solid #EB0401;
		border-radius: 50%;
		margin-bottom: 6rpx;
	}

	.logo-box {
		width: 56rpx;
		height: 56rpx;
		line-height: 56rpx;
		text-align: center;
		background: #EB0401;
		border-radius: 50%;
		margin-right: 21rpx;
	}

	.search-box {
		width: 702rpx;
		height: 80rpx;
		padding-left: 26rpx;
		padding-right: 10rpx;
		background: #FFFFFF;
		border-radius: 42rpx;
		border: 4rpx solid #EB0401;
		margin-top: 31rpx;
	}

	.search-box-btn {
		width: 152rpx;
		height: 64rpx;
		line-height: 64rpx;
		text-align: center;
		font-size: 30rpx;
		color: #fff;
		background: #EC0E0C;
		border-radius: 45px;
	}

	.hot-search {
		margin-top: 31rpx;
	}

	.hot-search-title {
		padding-left: 12rpx;
	}

	.hot-search-main {
		margin-top: 14rpx;
		
	}

	.hot-search-value {
		padding: 10rpx 20rpx;
		background: #F6F6F6;
		border-radius: 35rpx;
		margin-bottom: 14rpx;
		margin-right: 20rpx;
		font-size: 28rpx;
		color: #595959;
		max-width: 200rpx;
	}
</style>
