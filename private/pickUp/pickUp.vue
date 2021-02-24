<template>
<!--pages//private/pickUp/pickUp.wxml-->
<view class="page p-20">
	<view class="p-20 bg-white flex mb-20 border-radius-8" v-for="(item, index) in addressList" :key="index" @tap="pickAddress" :data-id="item.id">
		<view class="iconfont icon-dizhi fs-36"></view>
		<view class="fs-24 color-2C2C2C ml-20">
			<view class="fs-28 ns-text-bold">{{item.pick_up_name}}</view>
			<view class="flex" style="margin-top: 15rpx;">
				<view style="margin-right: 30rpx;">{{item.name}}</view>
				<view>{{item.mobile}}</view>
			</view>
			<view class="color-4A4A4A" style="margin-top: 15rpx;">{{item.province}}{{item.city}}{{item.district}}{{item.detail}}</view>
		</view>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      addressList: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    getAddressList() {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_address_list,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          is_sel: 1
        },

        success(res) {
          if (res.code == 0) {
            self.setData({
              addressList: res.data.list
            });
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }

      });
    },

    pickAddress: function (e) {
      var id = e.currentTarget.dataset.id;
      this.getApp().core.setStorageSync('PICK_ID', id);
      this.getApp().core.navigateBack();
    }
  }
};
</script>
<style>
@import "./pickUp.css";
</style>