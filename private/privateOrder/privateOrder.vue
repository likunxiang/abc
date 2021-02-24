<template>
<!--pages//private/privateOrder/privateOrder.wxml-->
<view class="page">
	<view class="tab-box flex ns-justify-content-space-between bg-white">
		<view :class="'tab ' + (tabIns==index?'tab-active ns-text-bold':'')" v-for="(item, index) in tabList" :key="index" :data-index="index" @tap="changeTab">{{item}}</view>
	</view>
	<block v-if="orderList.length>0">
		<view class="body">
			<view v-for="(order, index) in orderList" :key="index" class="order bg-white mb-20 border-radius-8">
				<view class="order-header flex justify-between align-center fs-24 border-bottom pr">
					<view class="flex">
						<view class="color-595959">{{order.addTime}}</view>
					</view>
					<view :class="'type_tips fs-24 color-fff ' + (tabIns==2?'bg-9B9B9B':'')">{{order.expressSet}}</view>
				</view>
				<navigator :url="'/private/privateOrderdetail/privateOrderdetail?order_id=' + order.id" class="border-bottom" hover-class="none">
					<view class="order-list-no-pay-body" v-for="(goods, index) in order.mchMyOrderDetail" :key="index">
						<view class="flex">
							<image style="width: 150rpx;height: 150rpx;" mode="aspectFill" :src="goods.pic"></image>
							<view class="flex1 flex ns-justify-content-space-between" style="margin-left: 18rpx;">
								<view style="width: 400rpx;">
									<view class="ns-text-limit2 fs-24 color-595959">{{goods.name}}</view>
								</view>
								<view class="ns-text-right">
									<view class="price fs-24 color-595959">¥ {{goods.price}}</view>
									<view style="font-size: 20rpx;color: #929292;margin-top: 5rpx;">x {{goods.num}}</view>
								</view>
							</view>
						</view>
					</view>
				</navigator>
				<view class="order-list-no-pay-footer flex ns-justify-content-space-between">
					<view class="fs-20 color-595959">订单编号：{{order.order_no}}</view>
					<view>
						<view class="fs-20">共 {{order.goodsNum}} 款商品  应付总额<text class>¥ {{order.pay_price}}</text></view>
					</view>
				</view>
				<view class="order-list-no-pay-btn flex justify-between">
					<view>
						<view class="color-489A19 fs-24" v-if="!order.is_cancel_show && !order.is_confirm_show && order.is_confirm==0 && order.is_cancel == 0">等待店主确定是否可以取消</view>
					</view>
					<view class="flex">
						<view class="sure-btn color-FF9100 fs-24" @tap="payOrder" v-if="order.is_pay_show" :data-id="order.id" :data-index="index">立即付款</view>
						<view class="sure-btn color-FF9100 fs-24" v-if="order.is_confirm_show" @tap="confirmOrder" :data-id="order.id" :data-index="index">确认收货</view>
						<navigator :url="'/pages/express-detail/express-detail?id=' + order.id + '&type=private'" class="sure-btn color-FF9100 fs-24" v-if="order.is_expressNo_show">查看物流</navigator>
						<view class="sure-btn color-FF9100 fs-24" v-if="order.is_cancel_show" :data-id="order.id" :data-index="index" @tap="orderRevoke">取消订单</view>
					</view>
					
					<!-- <navigator url="/private/privateEvaluate/privateEvaluate?id={{order.id}}" class="sure-btn color-FF9100 fs-24" wx:if="{{order.is_confirm == 1 && order.is_cancel == 0}}" >评价</navigator> -->
				</view>
			</view>
		</view>
	</block>
	<block v-else>
		<view class="body" style="height:calc(100vh - 88rpx);">
			<view class="body-kong flex-x-center flex-y-center">
					<view>
						<view class="iconfont icon-kong ns-text-center" style="font-size: 150rpx;"></view>
						<view style="font-size: 24rpx;color: #B0B0B0;text-align: center;margin-top: 31rpx;line-height: 53rpx;">
							<view>暂无相关订单～</view>
							<view>去逛逛吧</view>
							<navigator url="/private/home/home?type=1" style="text-decoration: underline;">返回首页</navigator>
						</view>
					</view>
			</view>
		</view>
	</block>
	<view class="call-shoper flex-x-center flex-y-center color-fff" @tap="copyText">
		<view class="iconfont icon-weixin fs-40 mr-20"></view>
		<view class="fs-24">联系店主</view>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      tabList: ['未完成', '已完成', '已取消'],
      tabIns: 0,
      status: "",
      page: 0,
      orderList: "",
      wx_mobile: "",
      stopLoadMore: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList();
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
  onPullDownRefresh: function () {
    this.getOrderList();
    this.setData({
      page: 1,
      stopLoadMore: false
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var self = this;
    var page = self.page;
    var index = page;
    var data = {
      userId: this.getApp().core.getStorageSync('USER_INFO').id,
      now_status: this.status || '1'
    };
    var url = this.getApp().api.selfSupport.get_order_list;
    this.getApp().core.pading(self, url, data, function (res) {
      if (res.data.list.length == 0) {
        self.setData({
          stopLoadMore: true
        });
        return;
      }

      var newGoodList = res.data.list;
      var nowGoodList = self.orderList.concat(newGoodList);
      self.setData({
        orderList: nowGoodList
      });
    });
  },
  methods: {
    changeTab: function (e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      self.setData({
        tabIns: index,
        status: index + 1,
        page: 1
      });
      this.getOrderList();
    },

    getOrderList() {
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_order_list_user,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          now_status: this.status || '1'
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              orderList: res.data.list,
              wx_mobile: res.data.wx_mobile
            });
          }
        },
        complete: res => {
          this.getApp().core.hideLoading();
          this.getApp().core.stopPullDownRefresh();
        }
      });
    },

    confirmOrder(e) {
      var id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      var orderList = this.orderList;
      wx.showModal({
        content: '是否确认收货？？',
        cancelText: '取消',
        confirmText: '确定',
        confirmColor: '#000000',
        success: res => {
          if (res.confirm) {
            this.getApp().request({
              url: this.getApp().api.selfSupport.confirm_order,
              data: {
                userId: this.getApp().core.getStorageSync('USER_INFO').id,
                id: id
              },
              success: res => {
                if (res.code == 0) {
                  wx.showToast({
                    title: '已成功确认收货',
                    icon: 'none'
                  });
                  this.getOrderList();
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
    },

    orderRevoke(e) {
      var id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      var orderList = this.orderList;
      var is_pay = orderList[index].is_pay;

      if (is_pay == 0) {
        wx.showModal({
          content: '确定取消订单？',
          cancelText: '我再想想',
          confirmText: '确定取消',
          confirmColor: '#000000',
          success: res => {
            if (res.confirm) {
              this.getApp().request({
                url: this.getApp().api.selfSupport.cancel_order,
                data: {
                  userId: this.getApp().core.getStorageSync('USER_INFO').id,
                  id: id
                },
                success: res => {
                  if (res.code == 0) {
                    wx.showToast({
                      title: '取消成功',
                      icon: 'none'
                    });
                    this.getOrderList();
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
      } else {
        wx.showModal({
          content: '确定取消订单？建议在取消前先和店主沟通一下',
          cancelText: '我再想想',
          confirmText: '确定取消',
          confirmColor: '#000000',
          success: res => {
            if (res.confirm) {
              this.getApp().request({
                url: this.getApp().api.selfSupport.cancel_order,
                data: {
                  userId: this.getApp().core.getStorageSync('USER_INFO').id,
                  id: id
                },
                success: res => {
                  if (res.code == 0) {
                    wx.showToast({
                      title: '取消成功，等待店主同意',
                      icon: 'none'
                    });
                    this.getOrderList();
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
    },

    copyText() {
      var text = this.wx_mobile;
      wx.makePhoneCall({
        phoneNumber: text
      });
    },

    payOrder(e) {
      var id = e.currentTarget.dataset.id;
      this.getApp().request({
        url: this.getApp().api.selfSupport.pay_data,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          pay_type: 1,
          id: id
        },
        success: res => {
          if (res.code == 0) {
            this.getApp().core.requestPayment({
              _res: res,
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType,
              paySign: res.data.paySign,
              success: function (e) {},
              fail: function (e) {},
              complete: function (e) {
                if (e.errMsg == "requestPayment:fail" || e.errMsg == "requestPayment:fail cancel") {
                  //支付失败转到待支付订单列表
                  uni.showModal({
                    title: "提示",
                    content: "订单尚未支付",
                    showCancel: false,
                    confirmText: "确认",
                    success: function (res) {
                      if (res.confirm) {
                        uni.redirectTo({
                          url: "/private/privateOrder/privateOrder"
                        });
                      }
                    }
                  });
                  return;
                }

                uni.redirectTo({
                  url: "/private/privateOrder/privateOrder"
                });
              }
            });
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false,
              success: res => {
                this.getOrderList();
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
@import "./privateOrder.css";
</style>