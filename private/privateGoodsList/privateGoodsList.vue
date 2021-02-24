<template>
<!--pages//private/privateGoodsList/privateGoodsList.wxml-->
<view class="page">
	<view class="header bg-white">
		<view class="ptb-20 plr-25 flex align-center">
			<view class="search-box flex ns-align-items-flex-center plr-25">
				<view class="iconfont icon-sousuo fs-30 color-AAAAAA"></view>
				<input class="ml-20 mr-20 fs-26" style="width: 90%;" type="text" :value="seachValue" placeholder="搜索商品名称" placeholder-class="fs-26 color-AAAAAA" @blur="search"></input>
				<view v-if="is_search" class="iconfont icon-guanbi- fs-30" @tap="clearSearch"></view>
			</view>
			<navigator hover-class="none" url="/private/privateAddGoods/privateAddGoods" class="sou-btn bg-FF9100 fs-28 color-fff border-radius-8">添加</navigator>
		</view>
		<view class="tab-box flex ns-justify-content-space-between bg-white">
			<view :class="'tab ' + (tabIns==index?'tab-active ns-text-bold':'')" v-for="(item, index) in tabList" :key="index" :data-index="index" @tap="changeTab">{{item}}</view>
		</view>
	</view>
	<view class="body">
		<block v-if="goodsList.length == 0">
			<view class="flex-x-center flex-y-center">
				<view>
					<view class="iconfont icon-kong ns-text-center" style="font-size: 150rpx;"></view>
					<view style="font-size: 24rpx;color: #B0B0B0;text-align: center;margin-top: 31rpx;line-height: 53rpx;">
						<view>暂无相关商品～</view>
						<navigator url="/private/privateAddGoods/privateAddGoods" style="text-decoration: underline;">点这里添加</navigator>
					</view>
				</view>
			</view>
		</block>
		<block v-else>
			<navigator hover-class="none" :url="'/private/privateGoods/privateGoods?id=' + item.id" class="goods flex ns-align-items-flex-center mb-20 bg-white pr" v-for="(item, index) in goodsList" :key="index">
				<view style="width: 200rpx;height: 200rpx;">
					<image style="width: 200rpx;height: 200rpx;" mode="aspectFill" :src="item.first_cover_pic"></image>
				</view>
				<view style="padding: 8rpx 20rpx 18rpx;width: 100%;">
					<view class="fs-30 ns-text-limit2">{{item.name}}</view>
					<view :class="'flex fs-24 mt-10 ' + (tabIns==1?'color-9B9B9B':'color-489A19')">
						<view class style="width: 234rpx;">销量：{{item.order_num}}件</view>
						<view>库存：{{item.num}}件</view>
					</view>
					<view class="flex ns-align-items-flex-center justify-between mt-24">
						<view class="flex ns-align-items-flex-center">
							<view :class="'fs-28 ns-text-bold mr-10 ' + (tabIns==1?'color-4A4A4A':'color-FF9100')">¥ {{item.min_price}}</view>
							<!-- <view class="color-9B9B9B fs-20 ns-text-through">¥ {{item.max_price}}</view> -->
						</view>
						<view class="iconfont icon-iconfont fs-40" style="color: #000000;" @tap.stop="openEdit" :data-index="index"></view>
					</view>
				</view>
				
				<view class="edit flex-y-center justify-between" v-if="is_edit==index" @tap.stop="closeEdit">
					<navigator hover-class="none" :url="'/private/privateAddGoods/privateAddGoods?id=' + item.id" class="edit-ball fs-24 color-4A4A4A text-center">
						<view class="iconfont icon-icon6 fs-50"></view>
						<view class="mt-5">编辑</view>
					</navigator>
					<view v-if="tabIns==1" class="edit-ball fs-24 color-4A4A4A text-center" @tap.stop="editGoodsStatus" data-type="up" :data-id="item.id">
						<view class="iconfont icon-off fs-50"></view>
						<view class="mt-5">上架</view>
					</view>
					<view v-else class="edit-ball fs-24 color-4A4A4A text-center" @tap.stop="editGoodsStatus" data-type="down" :data-id="item.id">
						<view class="iconfont icon-xiajia fs-50"></view>
						<view class="mt-5">下架</view>
					</view>
					<view class="edit-ball fs-24 color-4A4A4A text-center" @tap.stop="delGoods" :data-id="item.id">
						<view class="iconfont icon-shanchu1 fs-50"></view>
						<view class="mt-5">删除</view>
					</view>
				</view>
			</navigator>
		</block>
		
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      tabList: ['已上架', '未上架'],
      tabIns: 0,
      status: 1,
      is_edit: -1,
      page: 1,
      goodsList: "",
      seachValue: "",
      is_search: false,
      stopLoadMore: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getGoodsList();
    this.setData({
      page: 1,
      stopLoadMore: false
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getGoodsList();
    this.setData({
      page: 1,
      stopLoadMore: false
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this;
    var page = self.page;
    var index = page;
    var data = {
      userId: this.getApp().core.getStorageSync('USER_INFO').id,
      status: self.status,
      order_sum_show: true
    };
    var url = this.getApp().api.selfSupport.get_goods_list;
    this.getApp().core.pading(self, url, data, function (res) {
      if (res.data.list.length == 0) {
        self.setData({
          stopLoadMore: true
        });
        return;
      }

      var newGoodList = res.data.list;
      var nowGoodList = self.goodsList.concat(newGoodList);
      self.setData({
        goodsList: nowGoodList
      });
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    getGoodsList() {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_goods_list,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          status: self.status,
          order_sum_show: true,
          name: self.seachValue || ''
        },

        success(res) {
          if (res.code == 0) {
            self.setData({
              goodsList: res.data.list,
              is_edit: -1
            });
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        },

        complete: res => {
          wx.hideLoading();
          wx.stopPullDownRefresh();
        }
      });
    },

    search(e) {
      this.setData({
        seachValue: e.detail.value,
        is_search: true,
        page: 1
      });
      this.getGoodsList();
    },

    clearSearch() {
      this.setData({
        seachValue: '',
        is_search: false,
        page: 1
      });
      this.getGoodsList();
    },

    changeTab: function (e) {
      var self = this;
      var index = e.currentTarget.dataset.index;

      if (index == 0) {
        self.setData({
          tabIns: index,
          status: 1,
          is_edit: -1
        });
      } else {
        self.setData({
          tabIns: index,
          status: 0,
          is_edit: -1
        });
      }

      this.getGoodsList();
    },

    openEdit(e) {
      var index = e.currentTarget.dataset.index;
      this.setData({
        is_edit: index
      });
    },

    closeEdit() {
      this.setData({
        is_edit: -1
      });
    },

    editGoodsStatus(e) {
      var self = this;
      var type = e.currentTarget.dataset.type;
      var id = e.currentTarget.dataset.id;
      var status = '';

      if (type == 'up') {
        status = 1;
      } else {
        status = 0;
      }

      this.getApp().request({
        url: this.getApp().api.selfSupport.edit_goods_status,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          status: status,
          id: id
        },

        success(res) {
          if (res.code == 0) {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            });
            self.getGoodsList();
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }

      });
    },

    delGoods(e) {
      var self = this;
      var id = e.currentTarget.dataset.id;
      wx.showModal({
        title: '确定删除这个商品？',
        success: res => {
          if (res.confirm) {
            this.getApp().request({
              url: this.getApp().api.selfSupport.del_goods,
              data: {
                userId: this.getApp().core.getStorageSync('USER_INFO').id,
                id: id
              },

              success(res) {
                if (res.code == 0) {
                  wx.showToast({
                    title: res.msg,
                    icon: 'none'
                  });
                  self.getGoodsList();
                } else {
                  wx.showModal({
                    title: res.msg,
                    showCancel: false
                  });
                }
              }

            });
          }
        }
      });
    }

  }
};
</script>
<style>
@import "./privateGoodsList.css";
</style>