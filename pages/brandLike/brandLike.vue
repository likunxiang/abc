<template>
	<view>
		<!--pages/brandLike/brandLike.wxml-->
		<common></common>
		<view class="page pr">
			<view class="header p-24 flex align-center justify-between">
				<view class="fs-30 ns-text-bold color-333333">我关注的品牌</view>
				<view class="cu-btn round color-fff" :data-type="2" style="background: #8714EE;border-radius: 30rpx;font-size: 24rpx;"
				 @tap="openChoose" v-if="brandList.length > 0">添加品牌</view>
			</view>
			<block v-if="brandList.length <= 0">
				<view class="plr-24">
					<image :src="brandEmpty" mode="aspectFill" style="width: 702rpx;height: 1330rpx;border-radius: 30rpx;"></image>
				</view>
			</block>
			<block v-else>
				<view class="plr-24">
					<view class="public-box" style="padding-top: 0rpx;padding-bottom: 0rpx;">
						<view v-for="(item, index) in brandList" :key="index" class=" flex justify-between align-center" style="padding-top: 52rpx;padding-bottom: 52rpx;">
							<view class="fs-30 color-333333 flex-grow-1 ns-text-limit">{{item.brand_name}}</view>
							<view class="flex align-center flex-grow-0">
								<view class="fs-24" style="color: #8714EE;margin-right: 40rpx;margin-left: 20rpx;width:50rpx"><text :data-id="item.brand_id"
									 @tap="recoverSwitch" v-if="item.is_show">显示</text></view>
								<view class="flex align-center" style="margin-right: 51rpx;">
									<view class="fs-24 color-999999">提醒</view>
									<view :class="'iconfont ' + (item.is_remind == 1?'icon-xuanzhong':'icon-weixuanzhong') + ' fs-40'" style="color: #8714EE;margin-left: 13rpx;"
									 @tap="changeRemind" :data-index="index" :data-id="item.id"></view>
								</view>
								<view class="iconfont icon-shanchu2 fs-40" style="color: #B9B9B9;" @tap="delBrand" :data-index="index" :data-id="item.id"></view>
							</view>
						</view>
					</view>
				</view>
			</block>

			<!-- 选择 -->
			<select1 v-if="isShow" :checkArr="checkArr" :arrData="chooseBrandList" :isShow="isShow" :selectType="type"
			 @getBrandList="getBrandList" title="品牌名称" inputText="请输入品牌名称" @quxiao="quxiao" @binddata="bindData" @search="searchData"
			 @getmore="getMore"></select1>
			 
			 <view class="footer" v-if="brandList.length <= 0">
				 <view class="footer-btn fs-30" @tap="openChoose">添加品牌</view>
			 </view>
		</view>
	</view>
</template>

<script>
	import select1 from "@/components/select/select.vue"
	export default {
		data() {
			return {
				isShow: false,
				page: 1,
				showGetLogin: false,
				user_info_show: false,
				brandEmpty: "",
				keyword: "",
				brandList: [],
				stopLoadMore: false,
				chooseBrandList: [],
				checkArr: [],
				type: 0
			};
		},

		components: {
			select1
		},


		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.getApp().page.onLoad(this, options);
			var token = uni.getStorageSync('ACCESS_TOKEN');

			if (!token) {
				this.setData({
					showGetLogin: true,
					user_info_show: true
				});
				this.$store.commit('vuexSet', {
					name: 'show_loginTpl',
					value: true
				})
				return;
			}

			this.getBrandList();
			this.setData({
				brandEmpty: uni.getStorageSync('_img').guan_zhu_brand
			});
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			// 搜索
			searchData(e) {
				if (e.detail) {
					this.setData({
						keyword: e.detail.keyword,
						page: 1
					});
				}

				this.getChooseBrandList();
			},

			delBrand(e) {
				var index = e.currentTarget.dataset.index;
				var id = e.currentTarget.dataset.id;
				var brandList = this.brandList;
				uni.showModal({
					content: '删除后，活动开始将无法提醒确定删除吗？',
					success: res => {
						if (res.confirm) {
							brandList.splice(index, 1);
							uni.showLoading({
								title: '删除中...'
							});
							this.getApp().request({
								url: this.getApp().api.default.del_brand,
								method: 'POST',
								data: {
									id: id
								},
								success: res => {
									if (res.code == 0) {
										this.setData({
											brandList: brandList
										});
									}
								},
								complete: res => {
									uni.hideLoading();
								}
							});
						}
					}
				});
			},

			getMore() {
				var self = this;
				var url = this.getApp().api.default.get_brand_list;
				var page = self.page;
				var data = {
					keyword: this.keyword || ''
				};
				this.getApp().core.pading(self, url, data, function(res) {
					if (res.data.length == 0) {
						self.setData({
							stopLoadMore: true
						});
						return;
					}

					var newBrandList = res.data;
					var nowBrandList = self.chooseBrandList.concat(newBrandList);
					self.setData({
						chooseBrandList: nowBrandList
					});
				});
			},

			getBrandList() {
				this.getApp().request({
					url: this.getApp().api.default.get_brand_show,
					data: {
						page: 1
					},
					success: res => {
						if (res.code == 0) {
							this.setData({
								brandList: res.data
							});
						}
					}
				});
			},

			getChooseBrandList() {
				this.getApp().request({
					url: this.getApp().api.default.get_brand_list,
					data: {
						keyword: this.keyword || '',
						page: 1
					},
					success: res => {
						if (res.code == 0) {
							this.setData({
								chooseBrandList: res.data
							});
						}
					}
				});
			},

			// 是否提醒
			changeRemind(e) {
				var index = e.currentTarget.dataset.index;
				var id = e.currentTarget.dataset.id;
				var brandList = this.brandList;
				var is_remind = 0;

				if (brandList[index].is_remind == 1) {
					is_remind = 0;
				} else {
					is_remind = 1;
				}

				this.setData({
					['brandList[' + index + '].is_remind']: is_remind
				});
				this.getApp().request({
					url: this.getApp().api.default.updata_brand,
					method: 'POST',
					data: {
						id: id,
						is_remind: is_remind
					},
					success: res => {
						if (res.code == 0) {} else {
							uni.showModal({
								content: res.msg,
								showCancel: false
							});
						}
					}
				});
			},

			// 组件传值出来
			bindData(e) {
				if (e.detail) {
					this.setData({
						checkArr: e.detail.checkArr || []
					});
				}

				this.addBrand();
			},

			addBrand() {
				this.getApp().request({
					url: this.getApp().api.default.add_brand,
					method: 'POST',
					data: {
						brand_ids: this.checkArr || [],
						user_ids: this.userId || '',
						brand_name: this.keyword || ''
					},
					success: res => {
						if (res.code == 0) {
							this.getBrandList();
						}
					}
				});
			},

			//打开选择器
			openChoose(e) {
				var token = this.getApp().core.getStorageSync('ACCESS_TOKEN');

				if (!token) {
					this.setData({
						showGetLogin: true,
						user_info_show: true
					});
					this.$store.commit('vuexSet', {
						name: 'show_loginTpl',
						value: true
					})
					return;
				}
				//////添加品牌新入口开始
				// uni.navigateTo({
				// 	url:'/pages/brandIndex/brandIndex'
				// })
				// return ;
				//////添加品牌新入口结束

				var type = e.currentTarget.dataset.type;

				if (type == 1) {
					var url = this.getApp().api.maijia.add_client_list;
				} else {
					var url = this.getApp().api.maijia.add_brand_list;
				}

				this.setData({
					isShow: true,
					type: Number(type),
					keyword: '',
					page: 1
				});
				this.getChooseBrandList();
			},

			//取消选择
			quxiao(e) {
				this.setData({
					isShow: false
				});
			},
			//取消隐藏
			recoverSwitch(e) {
				var brand_id = e.currentTarget.dataset.id;
				this.getApp().request({
					url: this.getApp().api.default.open_brand_activity,
					method: 'POST',
					data: {
						brand_id: brand_id
					},
					success: res => {
						if (res.code == 0) {
							uni.showToast({
								title: '操作成功',
								icon: 'none'
							});
							this.getBrandList();
						}
					}
				}); //TODO
			}
		}
	};
</script>
<style>
	@import "./brandLike.css";
</style>
