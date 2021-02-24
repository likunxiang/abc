<template>
	<view class="refund-refund">
		<common></common>
		<view>
			<view style="height: 80rpx;overflow: hidden;overflow: hidden;">
				<view class="remind-top">
					<view :class="'pr box ' + (0 == currentIndex ? 'act' : '')" @tap="titleClick" data-idx="0">
						<view>处理中</view>
						<view v-if="0 == currentIndex" class="under-line"></view>
					</view>
					<view :class="'pr box ' + (1 == currentIndex ? 'act' : '')" @tap="titleClick" data-idx="1">
						<view>已处理</view>
						<view v-if="1 == currentIndex" class="under-line"></view>
					</view>
				</view>
			</view>
			<view v-if="order_list.length>0" class="refund-content fs-20 color-595959">
				<navigator v-for="(order, index) in order_list" :key="index" :url="status==4?'/pages/order-refund-detail/order-refund-detail?id='+order.order_refund_id:'/pages/order-detail/order-detail?id='+order.order_id" class="refund-order mb-20">
					<view class="refund-order-header flex ns-justify-content-space-between ns-align-items-flex-center">
						<view class="fs-24 color-999999">
							<text>服务单号：</text>
							<text>{{order.order_refund_no}}</text>
						</view>
						<!-- 退款 -->
						<!-- TODO -->
						<view class=" flex ns-align-items-flex-center" v-if="order.refund_type==3">
							<text class="iconfont icon-fukuan1 color-F49E3A fs-36"></text>
							<text class="fs-24 color-333333 ml-10">退款</text>
						</view>
						<!-- 退货 -->
						<view class=" flex ns-align-items-flex-center" v-if="order.refund_type==1">
							<text class="iconfont icon-tuihuozi color-F49E3A fs-36"></text>
							<text class="fs-24 color-333333 ml-10">退货</text>
						</view>
					</view>
					<view class="refund-order-main flex">
						<view class="refund-order-pic">
							<image style="width: 100%;height: 100%;border-radius: 14rpx;" mode="aspectFit" :src="order.goods_list[0].goods_first_pic"></image>
						</view>
						<view class="refund-order-msg ml-20">
							<view class="flex justify-between">
								<view style="width: 300rpx;">
									<view class="fs-30 color-333333 ns-text-limit2">{{order.goods_list[0].goods_name}}</view>
									<view v-for="(attr, index2) in order.goods_list[0].attr_list" :key="index2" class="attr fs-24 color-999999 flex">
										<view>
											<text>{{attr.attr_group_name}}：</text>
											<text>{{attr.attr_name}}</text>
										</view>
										<!-- <view class="ml-20">
											<text>尺码：</text>
											<text>L</text>
										</view> -->
									</view>
								</view>
								<view class="ns-text-right">
									<view class="price fs-20 color-333333 text-bold">¥ <text class="fs-30">{{filters.priceStr(order.goods_list[0].price)[0]}}.</text><text>{{filters.priceStr(order.goods_list[0].price)[1]}}</text></view>
									<view style="font-size: 24rpx;color: #999999;margin-top: 5rpx;">x {{order.goods_list[0].num}}</view>
								</view>
							</view>
							<view class="refund-order-num fs-24 color-999999 flex mt-20">
								<view>
									<text>申请数量：</text>
									<text class="color-333333">{{order.goods_list[0].num}}</text>
								</view>
								<view class="ml-30">
									<text>退款金额：</text>
									<text class="color-333333 fs-20">¥ <text class="fs-26">{{filters.priceStr(order.refund_price)[0]}}.</text><text>{{filters.priceStr(order.refund_price)[1]}}</text></text>
								</view>
							</view>
						</view>
		
					</view>
					<view class="refund-order-footer">
						<navigator @tap.stop :url="status==4?'/pages/refund-progress/refund-progress?id='+order.order_refund_id:'/pages/order-detail/order-detail?id='+order.order_id">
							<view class="flex ns-justify-content-space-between ns-align-items-flex-center plr-24" style="height: 88rpx;">
								<view :class="'flex fs-24 ' + (order.refund_step == 1?'color-FF0200':'color-333333')">
									<view class="ns-text-bold ">{{order.status_text}}</view>
									<view class="color-999999" style="flex:1;margin-left: 20rpx;">{{order.refuse_desc}}</view>
								</view>
								<!-- <block wx:if="{{order.is_delete==1}}">
									<view class="flex fs-24 color-333333 ">
										<view class="ns-text-bold" >已取消</view>
										<view class="color-999999" style="flex:1;margin-left: 20rpx;">买家取消了售后申请</view>
									</view>
								</block>
								<block wx:else>
									<block wx:if="{{order.refund_type==1}}">
										<view class="flex fs-26 color-333333 color-C10000" wx:if="{{order.refund_status==3}}">
											<view class="ns-text-bold " >已被拒绝</view>
											<view class="ns-text-limit color-999999" style="flex:1;margin-left: 20rpx;">{{order.refuse_desc}}</view>
										</view>
										<view class="flex fs-24 color-333333 " wx:elif="{{order.is_agree==1 && order.is_user_send==1 && order.refund_status==1}}">
											<view class="ns-text-bold" >退款成功</view>
											<view class="color-999999" style="flex:1;margin-left: 20rpx;">已退款至你的微信钱包</view>
										</view>
										<view class="flex fs-24 color-333333 " wx:elif="{{order.is_agree==1 && order.is_user_send==1}}">
											<view class="ns-text-bold" >等待审核</view>
											<view class="color-999999" style="flex:1;margin-left: 20rpx;">您的商品已寄回，待售后审核</view>
										</view>
										<view class="flex fs-24 color-333333 " wx:elif="{{order.is_agree==1 && order.is_user_send==0}}">
											<view class="ns-text-bold" >寄回商品</view>
											<view class="color-999999" style="flex:1;margin-left: 20rpx;">审核订单已通过，请于5日内寄回商品</view>
										</view>
										<view class="flex fs-24 color-333333 " wx:else>
											<view class="ns-text-bold" >等待审核</view>
											<view class="color-999999" style="flex:1;margin-left: 20rpx;">您的申请已提交成功，待售后审核</view>
										</view>
									</block>
									<block wx:else>
										<view class="flex fs-24 color-333333 color-C10000" wx:if="{{order.refund_status==3}}">
											<view class="ns-text-bold " >已被拒绝</view>
											<view class="ns-text-limit color-999999" style="flex:1;margin-left: 20rpx;">{{order.refuse_desc}}</view>
										</view>
										<view class="flex fs-24 color-333333 " wx:elif="{{order.is_agree==1 && order.refund_status==1}}">
											<view class="ns-text-bold" >退款成功</view>
											<view class="color-999999" style="flex:1;margin-left: 20rpx;">已退款至你的微信钱包</view>
										</view>
										<view class="flex fs-24 color-333333 " wx:else>
											<view class="ns-text-bold" >等待审核</view>
											<view class="color-999999" style="flex:1;margin-left: 20rpx;">您的申请已提交成功，待售后审核</view>
										</view>
									</block> -->
									<!-- <view class="flex fs-24 color-333333 " wx:if="{{order.is_agree==1 && order.is_user_send==1 && order.refund_status!=1}}">
										<view class="ns-text-bold" >等待审核</view>
										<view style="flex:1;margin-left: 20rpx;">您的申请已提交成功，待售后审核</view>
									</view>
									<view class="flex fs-24 color-333333 " wx:if="{{order.is_agree==0&&order.refund_status==0}}">
										<view class="ns-text-bold" >等待审核</view>
										<view style="flex:1;margin-left: 20rpx;">您的申请已提交成功，待售后审核</view>
									</view>
									
									<view class="flex fs-24 color-333333 " wx:if="{{order.is_agree==1 && order.refund_type==1&& order.is_user_send==0 }}">
										<view class="ns-text-bold" >寄回商品</view>
										<view style="flex:1;margin-left: 20rpx;">审核订单已发货，请于5日内寄回商品</view>
									</view>
									<view class="flex fs-24 color-333333 " wx:if="{{order.is_agree==1 && order.refund_type==3 && order.refund_status!=3}}">
										<view class="ns-text-bold" >退款成功</view>
										<view style="flex:1;margin-left: 20rpx;">已退款至你的微信钱包</view>
									</view>
									<view class="flex fs-24 color-333333 color-C10000" wx:if="{{order.refund_status==3 }}">
										<view class="ns-text-bold " >已被拒绝</view>
										<view class="ns-text-limit" style="flex:1;margin-left: 20rpx;">{{order.refuse_desc}}</view>
									</view> -->
								<!-- </block> -->
								<view>
									<text class="iconfont icon-jinru" style="color: #ccc;"></text>
								</view>
							</view>
						</navigator>
					</view>
				</navigator>
			</view>
			<!-- <view wx:for="{{order_list}}" wx:for-item="order" wx:key="id" wx:for-index="index" class="iist-item fs-20 color-333333">
				<navigator url="{{status==4?'/pages/order-refund-detail/order-refund-detail?id='+order.order_refund_id:'/pages/order-detail/order-detail?id='+order.order_id}}"
				 style="padding-right: 30rpx;">
					<view class="flex time ns-justify-content-space-between">
						<view>{{order.addtime}}</view>
						<view class="flex">
							<view>{{(order.is_pay==0?'待付款':(order.is_send==0?'待发货':(order.is_confirm==0?'待收货':'交易完成')))}}</view> -->
							<!-- 删除订单功能 -->
							<!-- <view class="ml-20" wx:if="{{order.is_confirm==1}}">
											<text class="iconfont icon-shanchu"></text>
										</view> -->
						<!-- </view>
		
		
					</view>
					<view wx:if="{{order.goods_list.length>1}}" class="pic-list">
						<scroll-view scroll-x="true" style="width: 100%; white-space: nowrap;">
							<image wx:for="{{order.goods_list}}" wx:for-item="goods" wx:key="id" src="{{goods.goods_pic[0]}}"></image>
		
						</scroll-view>
					</view>
					<view wx:else class="pic-list ns-flex">
						<view>
							<image src="{{order.goods_list[0].goods_pic[0]}}"></image>
						</view>
						<view class="ns-padding-left-sm">
							<view class="flex ns-justify-content-space-between">
								<view class='fs-24 color-333333 ns-text-limit2' style="width: 396rpx;">{{order.goods_list[0].goods_name}}</view>
								<view class="ns-text-right">
									<view class="fs-24 color-333333">¥ {{order.goods_list[0].price}}</view>
									<view class="fs-20" style="color: #929292;">x {{order.goods_list[0].num}}</view>
								</view>
							</view>
							<view class='ns-text-xs ns-text-gray ns-flex'>
								<view class='ns-padding-right-xs' wx:for="{{order.goods_list[0].attr_list}}" wx:for-item="attr" wx:key="id">{{attr.attr_group_name}}：{{attr.attr_name}}</view>
							</view>
						</view>
					</view>
					<view class="time flex ns-justify-content-space-between">
						<view>
							<view>订单编号：{{order.order_no}}</view>
		
						</view>
						<view class="flex">
							<view>共 {{order.goods_list.length}} 件商品</view>
							<view class="ml-10">合计 ¥ {{order.pay_price?order.pay_price:order.refund_price}}</view>
						</view>
					</view>
				</navigator>
				<block wx:if="{{status==4}}">
					<view class="ns-text-right ns-lh-80 ns-bdt-default ns-padding-right-sm" wx:if="{{order.refund_status==0}}">
						<block wx:if="{{order.refund_type==1}}">
							<block wx:if="{{order.is_agree==0}}">等待处理</block>
							<block wx:else>
								<block wx:if="{{order.is_user_send==0}}">待买家发货</block>
								<block wx:else>等卖家待处理</block>
							</block>
						</block>
						<block wx:else>等卖家待处理</block>
					</view>
					<view class="ns-text-right ns-lh-80 ns-bdt-default ns-padding-right-sm" style="color: #36ba75" wx:if="{{order.refund_status==1}}">已同意并退款</view>
					<view class="ns-text-right ns-lh-80 ns-bdt-default ns-padding-right-sm" style="color: #36ba75" wx:if="{{order.refund_status==2}}">已同意换货</view>
					<block wx:if="{{order.refund_status==3}}">
						<view class="ns-text-right ns-lh-80 ns-bdt-default ns-padding-right-sm" style="color: #c10000" wx:if="{{order.refund_type==1}}">已拒绝退货退款</view>
						<view class="ns-text-right ns-lh-80 ns-bdt-default ns-padding-right-sm" style="color: #c10000" wx:if="{{order.refund_type==2}}">已拒绝换货</view>
					</block>
				</block>
				<block wx:else>
					<view class='ns-flex ns-justify-content-end btn'>
						<block wx:if="{{order.is_send==0}}">
							<text style="line-height:80rpx;" wx:if="{{order.apply_delete==1}}">退款申请中</text>
							<view wx:else bindtap="orderRevoke" data-id="{{order.order_id}}">{{order.is_pay ? "退款" : "取消订单"}}</view>
		
						</block>
		
						<block wx:if="{{order.is_send==1&&order.is_confirm==0}}">
							<view wx:if='{{order.express}}'>
								<navigator url="/pages/express-detail/express-detail?id={{order.order_id}}">查看物流
								</navigator>
							</view>
							<view class='go' bindtap="orderConfirm" data-id="{{order.order_id}}">确认收货</view>
						</block>
		
		
						<block wx:if="{{order.refund==1}}">
							<view>
								<navigator open-type='redirect' url="/pages/order/order?order_id={{order.order_id}}&status=4">售后详情
								</navigator>
							</view>
						</block>
					</view>
				</block>
			</view> -->
			<view v-if="order_list.length==0" class="no-data-tip">暂无相关订单</view>
		
		
		</view>
	</view>
</template>

<script>

export default {
  data() {
    return {
      currentIndex: 0,
      status: 4,
      page: 1,
      order_list: "",
      orderAll: "",
      count: "",
      show_no_data_tip: "",
	  filters:require('../../utils/filters.js'),
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      //拿到当前索引并动态改变
      currentIndex: options.idx || 0
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderRefund();
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
    this.getOrderRefund();
    this.setData({
      page: 1
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this; // if (is_loading || is_no_more)
    // 	return;
    // is_loading = true;

    var page = self.page;

    if (self.order_list.length < self.count) {
      ++page;
      self.setData({
        page: page
      });
    } else {
      return;
    }

   uni.showLoading({
      title: '加载中...'
    });
    this.getApp().request({
      url: this.getApp().api.order.after_sale,
      data: {
        after_sale_status: self.currentIndex,
        status: 4,
        page: page
      },
      success: function (res) {
        uni.hideLoading();

        if (res.code == 0) {
          var order_list = self.order_list.concat(res.data.list);
          self.setData({
            order_list: order_list
          }); // if (res.data.list.length == 0) {
          // 	is_no_more = true;
          // }
        }
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {
  // },
  onPullDownRefresh() {
    this.getOrderRefund();
  },

  methods: {
    getOrderRefund: function () {
      var self = this;
     uni.showLoading({
        title: '加载中...'
      });
      this.getApp().request({
        url: this.getApp().api.order.after_sale,
        data: {
          after_sale_status: self.currentIndex,
          status: 4
        },
        success: function (res) {
          uni.hideLoading();

          if (res.code == 0) {
            self.setData({
              order_list: res.data.list,
              orderAll: res.data,
              // pay_type_list: res.data.pay_type_list
              count: res.data.row_count
            });
          }

          self.setData({
            show_no_data_tip: self.order_list.length == 0
          });
        },
        complete: function () {
          uni.stopPullDownRefresh();
        }
      });
    },
    //用户点击tab时调用
    titleClick: function (e) {
      var self = this;
      let currentPageIndex = this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      });

      if (self.currentIndex == 0) {
        uni.showLoading({
          title: '加载中...'
        });
        this.getApp().request({
          url: this.getApp().api.order.after_sale,
          data: {
            after_sale_status: 0,
            status: 4
          },
          success: function (res) {
            uni.hideLoading();

            if (res.code == 0) {
              self.setData({
                order_list: res.data.list,
                orderAll: res.data,
                // pay_type_list: res.data.pay_type_list
                count: res.data.row_count
              });
            }

            self.setData({
              show_no_data_tip: self.order_list.length == 0
            });
          },
          complete: function () {
           uni.hideLoading();
          }
        });
      }

      if (self.currentIndex == 1) {
        uni.showLoading({
          title: '加载中...'
        });
        self.getApp().request({
          url: self.getApp().api.order.after_sale,
          data: {
            after_sale_status: 1,
            status: 4
          },
          success: function (res) {
            uni.hideLoading();

            if (res.code == 0) {
              self.setData({
                order_list: res.data.list,
                orderAll: res.data,
                // pay_type_list: res.data.pay_type_list
                count: res.data.row_count
              });
            }

            self.setData({
              show_no_data_tip: self.order_list.length == 0
            });
          },
          complete: function () {}
        });
      }
    },
    link: function () {
      uni.navigateTo({
        url: '../activity-detail/activity-detail?id=1' // 页面 A

      });
    }
  }
};
</script>
<style>
/* pages/remind/remind.wxss */
page{background: rgba(207,207,207,0.33);height: 100%;}
.refund-refund{
	position: relative;
}
.remind-top{
	text-align: center;background-color: #fff;position:fixed;left: 0;top: 0;width: 750rpx;z-index: 99;
	/* #ifdef H5 */
	margin-top:80rpx ;
	/* #endif */
}
.remind-top .box{display: inline-block;width: 135rpx;padding: 20rpx 0;font-size: 30rpx;color: #999999;text-align: center;margin-left: 76rpx;margin-right:76rpx; }
.remind-top .act{color: #333333;font-weight: 600;}
.under-line {
	position: absolute;
	bottom: 0rpx;
	left: 50%;
	margin-left: -22rpx;
	width: 44rpx;
	height: 8rpx;
	background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
	border-radius: 4rpx;
}
/* 订单列表 */
.iist-item{background-color: #fff;margin-top: 20rpx;position: relative}
.time{font-size: 20rpx;padding: 0 0rpx 0 40rpx;height: 68rpx;line-height: 68rpx;
color: #595959;}
.time view{float: right;}
.wait{color: #E05D21 }
.over{color: #489A19 }
.pic-list{height: 160rpx;padding-left: 40rpx;}
.pic-list image{width: 160rpx;height: 160rpx;margin-right: 15rpx}
.pic-left{float: left;}
.pic-right{float: left;margin-left: 15rpx;width: 511rpx}
.pic-title{font-size: 24rpx;
color: #595959;padding-bottom: 10rpx}
.pic-des{font-size: 20rpx;
color: #D6D6D6;}
.btn{padding-right:30rpx;width: 100%;background-color: #fff;height: 80rpx;font-size: 20rpx;
color: #595959;border-top: 1rpx solid #D6D6D6;}
.btn view{float: right;margin: 20rpx 0 20rpx 20rpx;width: 105rpx;height: 40rpx;line-height: 38rpx;text-align: center;border: 1rpx solid #D6D6D6;
border-radius: 10rpx;}
.go{border: 1rpx solid #C10000!important;color:#C10000 }
.del{width: 28rpx;height: 28rpx;vertical-align: middle}
.finish{position: absolute;top: 0;right: 85rpx;width: 72rpx;height: 58rpx}
.order-list .order-item{
    background: #fff;
    padding:32rpx 24rpx;
    margin-bottom: 20rpx;
    border-bottom: 1rpx solid #e3e3e3;
}
.order-list .order-info{
    font-size: 9pt;
    color: #888;
}
.ns-lh-80 {
  line-height: 80rpx;
}

/* 大鲲 */
.refund-content {
	padding: 16rpx 24rpx 0;
	
}
	.refund-order {
	padding:24rpx 24rpx 48rpx;
	border-radius: 20rpx;
	background: #fff;
}
.refund-order-header {
	padding-bottom: 35rpx;
}
.refund-order-pic {
	width: 200rpx;
	height: 200rpx;
	border-radius: 14rpx;
}
.refund-order-msg {
	flex: 1;
}
.refund-order-footer {
	margin-top: 32rpx;
	background:rgba(244,244,244,1);
  border-radius:14px;
}
</style>