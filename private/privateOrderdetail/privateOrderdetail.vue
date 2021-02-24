<template>
<!--pages/order-detail/order-detail.wxml-->
<view class="page">
    <block data-src="/components/common/common"><view class="common">
    <block data-src="/components/_toast/_toast"><view id="_toast" v-if="_toast">
    <view id="_toast_title" :class="_toast.hide?'hide':''">
        <text>{{_toast.title}}</text>
    </view>
</view>
<view id="_loading" class="flex-row flex-x-center flex-y-center" v-if="_loading">
    <view :class="_loading ? 'hide' : ''">
        <image :src="__wxapp_img.system.loading2.url"></image>
    </view>
</view>
<block v-if="user_info_show&&showGetLogin">
    <view class="new-modal">
        <view class="new-modal-content">
            <view class="new-modal-header" style="padding:30rpx 0;line-height:60rpx;border-bottom: 1rpx solid #eee;">需要您授权登录</view>
            <view class="new-modal-body" style="min-height:0;margin-bottom:0;max-height:none">
                <view style="padding:32rpx 0 0 0;text-align: center">
                    <view>为了提供更好的服务</view>
                    <view>请在稍后的提示框中点击“立即登录”</view>
                </view>
                <view style="text-align:center;padding-top:60rpx;padding-bottom:60rpx;" v-if="__platform == 'wx'">
                    <image src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/login.jpg" style="width:300rpx;height:275rpx;"></image>
                </view>
                <view class="flex-x-center">
                    <view>
                        <button style="border:1px solid #04be01;width:500rpx;height:80rpx;line-height:80rpx;border-radius:80rpx;color:#04be01;margin-bottom:40rpx;" @tap="myLogin" class="btn new-modal-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">立即登录</button>
                    </view>
                </view>
                <view class="flex-x-center">
                    <view>
                        <button style="border:1px solid #ccc;width:500rpx;height:80rpx;line-height:80rpx;border-radius:80rpx;color:#ccc;margin-bottom:40rpx;" @tap="cancleLogin" class="btn new-modal-btn">取消</button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</block>
<block v-if="user_bind_show">
    <view class="new-modal" v-if="!__user_info.binding && store.option.phone_auth == 1">
        <view class="new-modal-content">
            <view class="new-modal-header" style="padding:30rpx 0;line-height:60rpx;font-size:11pt;border-bottom: 1rpx solid #eee;">授权获取手机号</view>
            <view class="new-modal-body" style="min-height:0;margin-bottom:0;">
                <view style="padding:32rpx 0 40rpx 0;text-align: center">
                    <image v-if="__platform == 'wx'" src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/login.jpg" style="width: 88rpx;height: 88rpx;"></image>
                    <image v-else src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/login.jpg" style="width: 88rpx;height: 88rpx;"></image>
                </view>
                <view style="padding:0 41rpx;">
                    <view class="flex-x-center" style="margin-bottom:40rpx;">申请获取您微信绑定的手机号</view>
                </view>
                <view class="flex-x-center">
                    <view>
                        <button style="background-color:#04be01;width:500rpx;height:80rpx;border-radius:80rpx;color:#fff;margin-bottom:40rpx;" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="btn new-modal-btn" hover-class="none">确认</button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</block></block>
    <include src="./get-coupon"></include>
    <include src="./navbar"></include>
</view></block>
    <block data-src="/components/header/header"><view class="header">
    <view v-if="__platform=='wx'&&store.is_official_account==1&&__is_offical_account">
        <official-account @error="relevanceError" @load="relevanceSuccess"></official-account>
    </view>
</view></block>
    <view v-if="true" class="body after-navber">
        <view style="overflow-x: hidden">
            <!-- <view class="status-bar">
                <view class="flex ns-align-items-flex-center">
					<image style="width: 30rpx;height: 30rpx; margin-right: 20rpx;" mode="widthFix" src="image/icon-dfk.png"></image>
					<view>{{order.status}}</view>
				</view>
				<view class="fs-22 mt-20" >{{order.status_msg}}</view>
            </view> -->

           <!-- <navigator url="express-detail/express-detail?id={{order.order_id}}&order_type={{order.order_type}}" class="block flex-row" wx:if="{{order.express_no && order.is_send==1}}">
                <view class="flex-grow-1">
                    <view class="mb-10">快递公司：{{order.express}}</view>
                    <view class="">快递单号：{{order.express_no}}</view>
                </view>
                <view class="flex-grow-0 flex-y-center">
                    <image src="{{__wxapp_img.store.jiantou_r.url}}" style="width: 12rpx;height: 22rpx"></image>
                </view>

                <view class="block-row flex-row" wx:if="{{false}}">
                    <view class="flex-grow-1">快递单号：{{order.express_no}}</view>
                    <view class="flex-grow-0">
                        <text class="copy-text-btn" bindtap="copyText" data-text="{{order.express_no}}">复制</text>
                    </view>
                </view>
            </navigator> -->
            <view class="block bg-252E3E pr">
                <view class="flex-row block-row fs-24">
                    <view class="fs-24 color-fff ns-text-bold">
                       <!-- {{order.is_offline == 0 ? "联系人：" : "收货人："}} -->{{order.addressData.name}}</view>
                    <view class="ml-30 color-fff">{{order.addressData.mobile}}</view>
                </view>
                <view v-if="order.addressData" class="color-fff fs-30">{{order.addressData.province + order.addressData.city + order.addressData.district + order.addressData.detail}}</view>
				<view class="type-tab">
					<view class="type fs-28 color-fff">{{order.express_set==2?'配送':'自提'}}</view>
					<view class="fs-24 color-fff text-center" style="margin-top: 16rpx;">{{order.addressData.time}}</view>
				</view>
            </view>
            <!-- <block wx:if="{{order.is_offline == 1}}">
                <view class="block flex-row">
                    <view class='flex-grow-1'>
                        <view class="flex-grow-1">门店名称：{{order.shop.name}}</view>
                        <view class="flex-grow-1">联系电话：{{order.shop.mobile}}</view>
                        <view class="flex-grow-1">门店地址：{{order.shop.address}}</view>
                    </view>
                    <view class='flex-grow-0 flex-y-center' wx:if='{{order.shop.longitude}}'>
                        <text class='copy-text-btn' bindtap='location'>导航</text>
                    </view>
                </view>
            </block> -->

            
            <view class="ns-text-sm ns-text-bold ns-bg-white ns-padding-horizontal-sm ns-padding-top-sm">
				<view class="flex ns-justify-content-space-between ns-align-items-flex-center">
					<view class="fs-24 color-2C2C2C ns-text-bold">商品清单</view>
				</view>
			</view>
			
            <view style="margin-bottom:0" class="block">
                <view v-for="(item, index) in order.mchMyOrderDetail" :key="index" class="flex-row goods-item">
                    <view class="flex-grow-0">
                        <navigator :url="'/private/privateGoods/privateGoods?id=' + item.goods_id" style="font-size: 0">
                            <image mode="aspectFill" style="width: 156rpx;height: 156rpx" :src="item.pic"></image>
                        </navigator>
                    </view>
                    <view class="flex flex1" style="padding-left: 20rpx">
						<view class="flex1">
							<view class="fs-24" style="margin-bottom: 10rpx">
							    <navigator :url="'/private/privateGoods/privateGoods?id=' + item.goods_id">{{item.name}}</navigator>
							</view>
							<!-- <view class="flex-grow-1">
							    <view style="font-size: 20rpx;color: #888;margin-right: 20rpx;display: inline-block" wx:for="{{item.attr}}" wx:for-item="attr" wx:key="id">
							        {{attr.attr_group_name}}：{{attr.attr_name}}
							    </view>
							</view> -->
						</view>
						<view style="width: 136rpx;">
							<view style="text-align: right">
								<view class="fs-24 color-595959">￥ {{item.price}}</view>
							    <view class="fs-20" style="color:#929292">×{{item.num}}</view>
							    
							</view>
							<view v-if="item.order_refund_enable==1">
							    <navigator v-if="item.status==1" class="refund-btn ns-text-center" :url="'order-refund/order-refund?id=' + item.order_detail_id + '&status=3'">申请退款</navigator>
								<navigator v-if="item.status==2" class="refund-btn" :url="'order-refund/order-refund?id=' + item.order_detail_id + '&status=1'">申请售后</navigator>
								<navigator v-if="item.status==3" class="refund-btn" :url="'order-refund/order-refund?id=' + item.order_detail_id + '&status=4'">申请退货</navigator>
							    
							</view>
							<navigator v-if="item.status==4" class="refund-btn" :url="'order-refund-detail/order-refund-detail?id=' + item.order_refund_id">售后详情</navigator>
						</view>
                    </view>
                </view>
            </view>
            <view class="block">
                <view class="flex-row block-row fs-24">
                    <view class="flex-grow-1">商品总价</view>
                    <view class="flex-grow-0" v-if="order">￥{{order.pay_price}}</view>
                    <view class="flex-grow-0" v-else>￥0.00</view>
                </view>
                <!-- <view class="flex-row block-row">
                    <view class="flex-grow-1">商品数量</view>
                    <view class="flex-grow-0">×{{order.num}}</view>
                </view> -->
                <view class="flex-row block-row fs-24" v-if="order.user_coupon_id">
                    <view class="flex-grow-1">优惠券优惠</view>
                    <view class="flex-grow-0">-￥{{order.coupon_sub_price}}</view>
                </view>
                <!-- <view class="flex-row block-row" wx:if='{{order.integral && order.integral.forehead > 0}}'>
                    <view class="flex-grow-1">积分抵扣</view>
                    <view class="flex-grow-0">-￥{{order.integral.forehead}}</view>
                </view> -->
                <!-- <view class="flex-row block-row" wx:if='{{order.discount<10 && order.discount}}'>
                    <view class="flex-grow-1">会员折扣</view>
                    <view class="flex-grow-0">{{order.discount}}折</view>
                </view> -->
                <view class="flex-row block-row fs-24" v-if="order.before_update">
                    <view class="flex-grow-1">{{order.before_update}}</view>
                    <view class="flex-grow-0">￥{{order.money}}</view>
                </view>
                <view class="flex-row block-row fs-24" v-if="order.colonel">
                    <view class="flex-grow-1">团长优惠</view>
                    <view class="flex-grow-0">￥{{order.colonel}}</view>
                </view>
                <view v-if="order.content">
                    <view>买家留言</view>
                    <view style="width:100%;overflow:auto;word-wrap:break-word;">{{order.content}}</view>
                </view>
                <view v-if="order.words">
                    <view>商家留言</view>
                    <view class="fs-sm" style="width:100%;overflow:auto;word-wrap:break-word;">{{order.words}}</view>
                </view>
                <view class="ns-flex ns-justify-content-end block-footer fs-24">
                  <view>共{{order.goodsNum}}件商品</view>
                  <view class="ns-margin-left-sm">合计：<text style="color: #c10000">￥{{order.pay_price}}</text>
                  </view>
                </view>
            </view>
			
			<view class="block fs-24 color-595959 mb-20">
				<view class="mb-10 color-2C2C2C ns-text-bold">订单信息</view>
				<view class="flex ns-justify-content-space-between mb-10">
					<view>支付方式</view>
					<view v-if="order.pay_type==0">未支付</view>
					<view v-if="order.pay_type==1">微信支付</view>
				</view>
			    <view class="mb-10 flex ns-justify-content-space-between">
			        <view class="flex ns-justify-content-space-between ns-align-items-flex-center">
						<view class>订单编号</view>
						<view class="ml-20 fs-24 color-F49E3A" @tap="copyText" :data-text="order.order_no">复制</view>
						
					</view>
					<view>{{order.order_no}}</view>
					
			    </view>
			    <view class="flex ns-justify-content-space-between">
					<view>下单时间</view>
					<view>{{order.addtime}}</view>
				</view>
			    <!-- <view class='pay-type'>{{order.pay_type_text}}</view> -->
			</view>
			
			<view class="bg-white fs-24 color-595959" v-if="order.express_set==1">
				<view class="p-20 flex align-center justify-between border-bottom">
					<text>提货人</text>
					<text class="ns-text-right">{{order.ztAddressData.name}}</text>
				</view>
				<view class="p-20 flex align-center justify-between">
					<text>联系方式</text>
					<text class="ns-text-right">{{order.ztAddressData.mobile}}</text>
				</view>
            </view>

            
        </view>
    </view>
	
    <block data-src="/components/footer/footer"><view class="footer">
</view></block>
</view>
</template>

<script>

export default {
  data() {
    return {
      isPageShow: false,
      order: null,
      getGoodsTotalPrice: function () {
        return this.order.total_price;
      },
      order_id: 0
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    this.getApp().core.showLoading({
      title: "正在加载"
    });
    self.setData({
      order_id: options.order_id
    });
    this.getApp().request({
      url: this.getApp().api.selfSupport.get_order_data,
      data: {
        userId: this.getApp().core.getStorageSync('USER_INFO').id,
        id: options.order_id
      },
      success:(res) => {
        var address = uni.getStorageSync(this.getApp().const.PICKER_ADDRESS);
        var res_data = res.data;

        if (res.code == 0) {
          if (res_data.address == '') {
            res_data.address = address.address;
            res_data.name = address.name;
            res_data.mobile = address.mobile;
          }

          self.setData({
            order: res_data,
            isPageShow: true
          });
        }
      },
      complete: function () {
        uni.hideLoading();
      }
    });
  },
  methods: {
    copyText: function (e) {
      var self = this;
      var text = e.currentTarget.dataset.text;
      uni.setClipboardData({
        data: text,
        success: function () {
          uni.showToast({
            title: "已复制"
          });
        }
      });
    },
    location: function () {
      var self = this;
      var shop = self.order.shop;
      uni.openLocation({
        latitude: parseFloat(shop.latitude),
        longitude: parseFloat(shop.longitude),
        address: shop.address,
        name: shop.name
      });
    },
    orderRevoke: function (e) {
      var self = this;
      uni.showModal({
        title: "提示",
        content: "是否退款该订单？",
        cancelText: "否",
        confirmText: "是",
        success: (res) => {
          if (res.cancel) return true;

          if (res.confirm) {
            uni.showLoading({
              title: "操作中"
            });
            this.getApp().request({
              url: this.getApp().api.order.revoke,
              data: {
                order_id: e.currentTarget.dataset.id
              },
              success: function (res) {
                uni.hideLoading();
                uni.showModal({
                  title: "提示",
                  content: res.msg,
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      self.onLoad({
                        id: self.order.order_id
                      });
                    }
                  }
                });
              }
            });
          }
        }
      });
    },
    orderPay: function (e) {
		var self = this
      var order_id = e.currentTarget.dataset.id;
      var paramData = {};
      var url = api.order.pay_data;
      paramData.order_id = order_id;
      var route = "pages/order/order";
      uni.showLoading({
        title: "正在提交",
        mask: true
      });
      WechatPay(paramData, url, route);

      function WechatPay(paramData, url, route) {
        paramData.pay_type = "WECHAT_PAY";
        self.getApp().request({
          url: url,
          data: paramData,
          complete: function () {
            uni.hideLoading();
          },
          success: function (res) {
            if (res.code == 0) {
              uni.requestPayment({
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
                            url: "/" + route + "?status=0"
                          });
                        }
                      }
                    });
                    return;
                  }

                  uni.redirectTo({
                    url: "/" + route + "?status=1"
                  });
                }
              });
            }

            if (res.code == 1) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              });
            }
          }
        });
      }
    },
    orderConfirm: function (e) {
      var self = this;
      uni.showModal({
        title: "提示",
        content: "是否确认已收到货？",
        cancelText: "否",
        confirmText: "是",
        success: (res) => {
          if (res.cancel) return true;

          if (res.confirm) {
            uni.showLoading({
              title: "操作中"
            });
            this.getApp().request({
              url: this.getApp().api.order.confirm,
              data: {
                order_id: e.currentTarget.dataset.id
              },
              success: function (res) {
                uni.hideLoading();
                uni.showToast({
                  title: res.msg
                });

                if (res.code == 0) {
                  self.loadOrderList(3);
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
@import "./privateOrderdetail.css";
</style>