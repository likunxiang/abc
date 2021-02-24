<template>
<!--member/allowanceSource/allowanceSource.wxml-->
<view class="page">
	<view class="header">
		<view class="img-box flex-x-center">
			<image class="img-box" mode="aspectFit" :src="avatar_url"></image>
		</view>
		<view class="fs-30 flex-x-center color-333333 ns-text-bold mt-32">{{desc}}</view>
		<view class="fs-30 flex-x-center color-333333 ns-text-bold" style="font-size: 60rpx;margin-top: 20rpx;">{{coinType == 1?'+':'-'}}{{sub}}</view>
	</view>
	<view class="main">
		<view class="main-list flex align-center" v-if="type == 12">
			<view class="main-list-title fs-30 color-999999">充值时间</view>
			<view class="main-list-main fs-30 color-333333 ns-text-limit">{{addtime}}</view>
		</view>
		<view class="main-list flex align-center" v-if="type == 1 || type == 4">
			<view class="main-list-title fs-30 color-999999">开通好友</view>
			<view class="main-list-main fs-30 color-333333 ns-text-limit">{{name}}</view>
		</view>
		<view class="main-list flex align-center" v-if="type == 11">
			<view class="main-list-title fs-30 color-999999">赠送好友</view>
			<view class="main-list-main fs-30 color-333333 ns-text-limit">{{name}}</view>
		</view>
		<view class="main-list flex align-center" v-if="type == 6">
			<view class="main-list-title fs-30 color-999999">领取好友</view>
			<view class="main-list-main fs-30 color-333333 ns-text-limit">{{name}}</view>
		</view>
		<view class="main-list flex align-center" v-if="type == 1 || type == 4">
			<view class="main-list-title fs-30 color-999999">开通时间</view>
			<view class="main-list-main fs-30 color-333333">{{addtime}}</view>
		</view>
		<view class="main-list flex align-center" v-if="type == 6 || type == 11">
			<view class="main-list-title fs-30 color-999999">领取时间</view>
			<view class="main-list-main fs-30 color-333333">{{addtime}}</view>
		</view>
		<view class="main-list flex align-center" v-if="type == 8">
			<view class="main-list-title fs-30 color-999999">赠送时间</view>
			<view class="main-list-main fs-30 color-333333">{{addtime}}</view>
		</view>
		<view class="main-list flex align-center" v-if="type == 3">
			<view class="main-list-title fs-30 color-999999">服务编号</view>
			<view class="main-list-main fs-30 color-333333">{{order_no}}</view>
		</view>
		<view class="main-list flex align-center" v-if="type == 5 || type == 2 || type == 7">
			<view class="main-list-title fs-30 color-999999">订单编号</view>
			<view class="main-list-main fs-30 color-333333">{{order_no}}</view>
		</view>
		<view class="main-list flex align-center" v-if="type == 5 || type == 2 || type == 3 || type == 7">
			<view class="main-list-title fs-30 color-999999">商品名称</view>
			<view class="main-list-main fs-30 color-333333 ns-text-limit">{{name.length>1?name[0] + '等':name[0]}}</view>
		</view>
		<!-- 售后详情 -->
		<view class="main-list flex align-center" v-if="type == 3">
			<view class="main-list-title fs-30 color-999999"></view>
			<navigator :url="'/pages/order-refund-detail/order-refund-detail?id=' + jump" class="main-list-main fs-30 color-333333 flex align-center" style="color: #15A3FF;">
				<text>查看售后详情</text>
				<text class="iconfont icon-jinru fs-40"></text>
			</navigator>
		</view>
		<!-- 订单详情 -->
		<view class="main-list flex align-center" v-if="type == 5 || type == 2 || type == 7">
			<view class="main-list-title fs-30 color-999999"></view>
			<navigator :url="'/pages/order-detail/order-detail?order_id=' + jump" class="main-list-main fs-30 color-333333 flex align-center" style="color: #15A3FF;">
				<text>查看订单详情</text>
				<text class="iconfont icon-jinru fs-40"></text>
			</navigator>
		</view>
		<view class="main-list flex align-center" v-if="type == 5">
			<view class="main-list-title fs-30 color-999999">申请日期</view>
			<view class="main-list-main fs-30 color-333333">{{addtime}}</view>
		</view>
		<view class="main-list flex align-center" v-if="type == 2 || type == 7 || type == 9">
			<view class="main-list-title fs-30 color-999999">创建日期</view>
			<view class="main-list-main fs-30 color-333333">{{addtime}}</view>
		</view>
		<view class="main-list flex align-center" v-if="type == 5 || type == 3 || type == 10">
			<view class="main-list-title fs-30 color-999999">退回日期</view>
			<view class="main-list-main fs-30 color-333333">{{backtime}}</view>
		</view>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      id: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    this.getData();
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
    getData() {
      this.getApp().request({
        url: this.getApp().api.default.get_sub_info,
        data: {
          sub_log_id: this.id
        },
        success: res => {
          if (res.code == 0) {
            this.setData(res.data);
          }
        }
      });
    }

  }
};
</script>
<style>
@import "./allowanceSource.css";
</style>