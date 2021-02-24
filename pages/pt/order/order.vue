<template>
	
		
		<view class="body">
			<common></common>
		    <view :class="'page ' + $data.__page_classes">
		        <view class="body after-navber">
					<!--  scroll-x="true" -->
		            <scroll-view style="width:100%" class="scroll-view-x tab-bar" scroll-with-animation="true" >
		               <view class="flex text-center">
						   <view :class="'tab-bar-item ' + (status==-1?'active':'') + ' flex1'" data-status="-1" @tap="switchNav">
						       <text>全部拼团</text>
						   </view>
						   <view :class="'tab-bar-item ' + (status==0?'active':'') + ' flex1'" data-status="0" @tap="switchNav">
						       <text>待付款</text>
						       <view v-if="group_order_no_pay_num>0" class="circle-tip">{{group_order_no_pay_num}}</view>
						   </view>
						   <view :class="'tab-bar-item ' + (status==1?'active':'') + ' flex1'" data-status="1" @tap="switchNav">
						       <text>拼团中</text>
						   </view>
						   <view :class="'tab-bar-item ' + (status==2?'active':'') + ' flex1'" data-status="2" @tap="switchNav">
						       <text>拼团成功</text>
						   </view>
						   <view :class="'tab-bar-item ' + (status==3?'active':'') + ' flex1'" data-status="3" @tap="switchNav">
						       <text>拼团失败</text>
						   </view>
						   <!-- <view class="tab-bar-item {{status==4?'active':''}}" data-status='4' bindtap='switchNav'>
						       <text>售后</text>
						   </view> -->
					   </view>
		           </scroll-view>
					
		            <view class="order-list">
		                <view v-for="(item, index) in order_list" :key="index" class="order-itme" :url="'/pages/order-detail/order-detail?order_id=' + item.order_id" @tap="status==4?'goToRefundDetail':''" :data-refund_id="item.order_refund_id">
		                    <view style="background-color:#f7f7f7;height:20rpx;"></view>
		                    <view class="flex-row order-item-top flex-y-center" v-if="status!=4">
		                        <view class="flex-grow-1 order-status ns-text-xs">
		                            {{item.status_name}}
		                            <block v-if="item.is_group==1 && item.status==1">，还差{{item.surplusGruopNum}}人成团</block>
		                        </view>
		                        <view class="flex-grow-1 order-time ns-text-xs" v-if="(item.is_group==1 && item.status==1) || (item.status==1&&item.is_show_time)">
		                            剩余{{item.limit_time.days}}天{{item.limit_time.hours}} ：{{item.limit_time.mins}}：{{item.limit_time.secs}}
		                        </view>
		                    </view>
		                    <navigator v-for="(good, index2) in item.goods_list" :key="index2" :url="'/pages/order-detail/order-detail?order_id=' + item.order_id" class="flex-row goods">
		                        <view class="flex-grow-0 goods-image">
		                            <image :src="good.goods_pic"></image>
		                        </view>
		                        <view class="flex-grow-1 flex-col">
		                            <view class="flex-grow-1">
		                                <view class="ns-text-sm ns-flex ns-justify-content-space-between">
		                                  <view class="good-name ns-text-limit2 fs-24">{{good.goods_name}}</view>
										  <view class="ns-text-right">
											  <view class="ns-text-red good-price fs-24">￥{{good.price}}</view>
											  <view class="fs-24 color-F49E3A" v-if="good.status_name">{{good.status_name}}</view>
										  </view>
		                                </view>
		                                <view class="attr-list flex-row ns-text-gray">
		                                    <block v-for="(attr, index) in good.attr_list" :key="index">
		                                        {{attr.attr_group_name}}:{{attr.attr_name}}
		                                    </block>
		                                </view>
		                            </view>
		                            <view class="flex-grow-0 flex-row order-price">
		                                <view class="flex-grow-1 num fs-24">×{{good.num}}</view>
		                            </view>
		                        </view>
		                    </navigator>
		                    <view class="flex-row order-item-total flex-y-center ns-flex ns-justify-content-space-between ns-text-xs ns-text-gray">
		                        <view>
		                          订单编号：{{item.order_no}}
		                        </view>
		                        <view class="flex-grow-1" v-if="status != 4">
		                            合计：
		                            <text>¥ {{item.total_price}}</text>
		                        </view>
		                    </view>
		                    <view class=" ns-bdt-default">
		                      <block v-if="status==4">
		                          <view class="ns-padding-sm ns-flex ns-text-xs ns-justify-content-space-between">
		                              <view v-if="item.refund_status==0">
		                                <block v-if="item.refund_type==1">
		                                    <block v-if="item.is_agree==0">等待处理</block>
		                                    <block v-else>
		                                        <block v-if="item.is_user_send==0">待买家发货</block>
		                                        <block v-else>等卖家待处理</block>
		                                    </block>
		                                </block>
		                                <block v-else>等卖家待处理</block>
		                              </view>
		                              <view class="flex-grow-1" style="text-align:left;" v-if="status==4&&item.refund_status==1">
		                                  同意已退款
		                              </view>
		                              <view class="flex-grow-1" style="text-align:left;" v-if="status==4&&item.refund_status==2">
		                                  已同意换货
		                              </view>
		                              <view class="flex-grow-1" style="text-align:left;" v-if="status==4&&item.refund_status==3">
		                                  已拒绝退换货
		                              </view>
		                              <view class="flex-grow-1 ns-text-right" v-if="status==4 && item.refund_type==1">
		                                  退货退款：
		                                  <text>¥ {{item.refund_price}}</text>
		                              </view>
		                              <view class="flex-grow-1 ns-text-right" v-if="status==4 && item.refund_type==2">
		                                  换货
		                              </view>
		                          </view> 
		                      </block>
		                      <block v-if="status!=4">
		                        <view class="play-btn flex-row flex-y-center">
		                            <text v-if="item.apply_delete==1&&status==0">取消申请中</text>
		                            <view class=" frame-btn flex-gorw-0 flex-y-center fs-24" v-if="item.apply_delete==0&&item.is_cancel==0 && item.status == 0&& item.status != 4&&item.is_send==0" @tap="goToCancel" :data-id="item.order_id">
		                                取消
		                            </view>
		                            <!-- 到店自提核销二维码 -->
		                            <!-- <view class=' red-btn flex-gorw-0 flex-y-center' wx:if='{{item.offline==2&&item.is_confirm==0&&item.status==3&&item.apply_delete==0}}' bindtap="getOfflineQrcode" data-id="{{item.order_no}}">
		                                核销码
		                            </view> -->
		                            <!--  待付款 start  -->
		                            <view class=" red-btn flex-gorw-0 flex-y-center fs-24" v-if="item.status==0&&item.is_cancel==0" @tap="orderPay" :data-id="item.order_id" :data-index="index">
		                                去支付
		                            </view>
		                            <!--  待付款 end  -->
		                            <!-- <navigator class='flex-gorw-0 frame-btn fs-24' wx:if='{{item.status==1||item.status==2||item.status==3}}' url='/pages/order-detail/order-detail?order_id={{item.order_id}}' open-type='navigate'>
		                                订单详情
		                            </navigator> -->
									<view v-if="item.express && item.is_send==1">
										<navigator class="order-list-btn" :url="'/pages/express-detail/express-detail?id=' + item.order_id">查看物流</navigator>
									</view>
									<view v-if="item.is_send==1 && item.is_confirm==0">
										<view class="order-list-btn" @tap="toConfirm" :data-id="item.order_id">确认收货</view>
									</view>
		                            <!--  拼团中 start  -->
		                            <button class="flex-gorw-0 red-btn fs-24" v-if="(item.status==1||item.status==2||item.status==3)&&item.is_group==1" :data-id="item.order_id" @tap="goToGroup">
		                                拼团详情
		                            </button>
		                            <!--  拼团中 end  -->
		                            <!-- <navigator class="order-option-btn frame-btn fs-24" url="/pages/pt/order-comment/order-comment?id={{item.order_id}}" wx:if="{{item.is_send==1&&item.is_confirm==1&&item.is_comment==0}}">评价
		                            </navigator> -->
		                        </view>
		                      </block>
		                    </view>
		                </view>
		            </view>
		            <view class="empty-order" v-if="show_no_data_tip">
		                <view style="background-color:#f7f7f7;height:20rpx;"></view>
		                <view class="empty-img flex-x-center">
		                    <image :src="__wxapp_img.pt.empty_order.url"></image>
		                </view>
		                <view class="empty-text flex-x-center fs-28">
		                    还没有相关拼团订单哦
		                </view>
		                <view class="empty-btn flex-x-center">
		                    <view class="go-to-group flex-x-center flex-y-center fs-26" @tap="goHome">
		                        去开团
		                    </view>
		                </view>
		            </view>
		
		            <view :class="'flex-row flex-y-center modal ' + (hide==1?'hide':'')" @tap="hideFun">
		                <view class="flex-y-center" style="width:100%;height:800rpx;padding:100rpx;">
		                    <view style="background-color:#fff;width:100%;height:100%;border-radius:10rpx;padding:0 50rpx;">
		                        <view class="flex-x-center" style="width:100%;height:50rpx;margin-top:50rpx;font-size:13pt;margin-bottom:20rpx">核销二维码</view>
		                        <image :src="qrcode" style="width:450rpx;height:450rpx;"></image>
		                    </view>
		                </view>
		            </view>
		        </view>
		    </view>
		</view>
		
	
</template>

<script>
// pages/pt/order/order.js
var is_no_more = false;
var is_loading = false;
var p = 2;

export default {
  data() {
    return {
      hide: 1,
      qrcode: "",
      scrollLeft: 0,
      scrollTop: 0,
      row_count: 0,
      store: "",
      group_order_no_pay_num: "",
      status: "",
      order_list: "",
      show_no_data_tip: "",
	  __page_classes:''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  //console.log(options)
    this.getApp().page.onLoad(this, options);
    this.systemInfo = uni.getSystemInfoSync();
    var store = uni.getStorageSync(this.getApp().const.STORE);
    let group_order_no_pay_num = 0;

    if (options.group_order_no_pay_num) {
      group_order_no_pay_num = group_order_no_pay_num;
    }

    this.setData({
      store: store,
      group_order_no_pay_num: group_order_no_pay_num
    });
    var self = this;
    is_no_more = false;
    is_loading = false;
    p = 2;
    self.loadOrderList(options.status || -1); //   var windowWidth = this.systemInfo.windowWidth
    //   var offsetLeft = e.currentTarget.offsetLeft
    //   var scrollLeft = this.data.scrollLeft;

    var scrollLeft = 0;

    if (options.status >= 2) {
      scrollLeft = 600;
    } else {
      scrollLeft = 0;
    }

    self.setData({
      scrollLeft: scrollLeft
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    this.getApp().page.onReady(this);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.getApp().page.onShow(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function (options) {
    this.getApp().page.onHide(this);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function (options) {
    this.getApp().page.onUnload(this);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (options) {
    uni.onPullDownRefresh(this);
  },

  /**
   * 页面触底事件
   */
  onReachBottom: function (options) {
    this.getApp().page.onReachBottom(this);
    var self = this;
    if (is_loading || is_no_more) return;
    is_loading = true;
    this.getApp().request({
      url: this.getApp().api.group.order.list,
      data: {
        status: self.status,
        page: p
      },
      success: function (res) {
        if (res.code == 0) {
          var order_list = self.order_list.concat(res.data.list);
          self.setData({
            order_list: order_list
          });

          if (res.data.list.length == 0) {
            is_no_more = true;
          }
        }

        p++;
      },
      complete: function () {
        is_loading = false;
      }
    });
  },
  methods: {
    toConfirm: function (e) {
      var self = this;
      var order_id = e.currentTarget.dataset.id;
      uni.showLoading({
        title: "正在加载",
        mask: true
      });
      this.getApp().request({
        url: this.getApp().api.group.order.confirm,
        data: {
          order_id: order_id
        },
        success: function (res) {
          if (res.code == 0) {
            uni.showModal({
              title: '提示',
              content: res.msg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  self.loadOrderList();
                }
              }
            });
          } else {
            uni.showModal({
              title: '提示',
              content: res.msg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  self.loadOrderList();
                }
              }
            });
          }

          ;
        },
        complete: function () {
          uni.hideLoading();
        }
      });
    },

    /**
     * 初次加载数据
     */
    loadOrderList: function (status) {
      if (status == undefined) status = -1;
      var self = this;
      self.setData({
        status: status
      });
      uni.showLoading({
        title: "正在加载",
        mask: true
      });
      this.getApp().request({
        url: this.getApp().api.group.order.list,
        data: {
          status: self.status
        },
        success: function (res) {
          if (res.code == 0) {
            self.setData({
              order_list: res.data.list
            });

            if (self.status == -1) {
              let row_count = 0;

              for (let i = 0; i < res.data.list.length; i++) {
                if (res.data.list[i].is_pay == 0) {
                  row_count++;
                }
              }

              self.setData({
                row_count: row_count
              });
              uni.setStorageSync('row_count', row_count);
            } else {
              self.setData({
                row_count: uni.getStorageSync('row_count')
              });
            }
          }

          self.setData({
            show_no_data_tip: res.data.list.length == 0
          });

          if (status == 4) {
            return;
          }

          self.countDown();
        },
        complete: function () {
         uni.hideLoading();
        }
      });
    },

    /**
     * 拼团倒计时
    */
    countDown: function () {
      var self = this;
      setInterval(function () {
        var order_list = self.order_list;

        for (var i in order_list) {
          var leftTime = new Date(order_list[i]['limit_time_ms'][0], order_list[i]['limit_time_ms'][1] - 1, order_list[i]['limit_time_ms'][2], order_list[i]['limit_time_ms'][3], order_list[i]['limit_time_ms'][4], order_list[i]['limit_time_ms'][5]) - new Date(); //计算剩余的毫秒数 

          var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 

          var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 

          var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟 

          var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数 

          days = self.checkTime(days);
          hours = self.checkTime(hours);
          minutes = self.checkTime(minutes);
          seconds = self.checkTime(seconds);
          order_list[i].limit_time = {
            days: days,
            hours: hours > 0 ? hours : '00',
            mins: minutes > 0 ? minutes : '00',
            secs: seconds > 0 ? seconds : '00'
          };
          self.setData({
            order_list: order_list
          });
        }
      }, 1000);
    },

    /**
    * 时间补0
    */
    checkTime: function (i) {
      //将0-9的数字前面加上0，例1变为01 
      i = i > 0 ? i : 0;

      if (i < 10) {
        i = "0" + i;
      }

      return i;
    },

    /**
    * 返回首页
    */
    goHome: function (e) {
      uni.redirectTo({
        // url: '/pages/pt/index/index'
        url: '/pages/index/index'
      });
    },

    /**
     * 去支付---已废弃，
     * 新支付接口在/commons/order-pay/order-pay.js下
     */
    orderPay_1: function (e) {
      uni.showLoading({
        title: "正在提交",
        mask: true
      });
      this.getApp().request({
        url: this.getApp().api.group.pay_data,
        data: {
          order_id: e.currentTarget.dataset.id,
          pay_type: "WECHAT_PAY"
        },
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
                          url: "/pages/pt/order/order?status=0"
                        });
                      }
                    }
                  });
                  return;
                }

               uni.redirectTo({
                  url: "/pages/pt/order/order?status=1"
                });
              }
            });
          }

          if (res.code == 1) {
           uni.showToast({
              title: res.msg,
              image: "/static/images/icon-warning.png"
            });
          }
        }
      });
    },

    /**
     * 去参团
     */
    goToGroup: function (e) {
      uni.navigateTo({
        url: '/pages/pt/group/details?oid=' + e.target.dataset.id
      });
    },

    /**
     * 到店拿货获取核销二维码
     */
    getOfflineQrcode: function (e) {
      var self = this;
      uni.showLoading({
        title: "正在加载",
        mask: true
      });
      this.getApp().request({
        url: this.getApp().api.group.order.get_qrcode,
        data: {
          order_no: e.currentTarget.dataset.id
        },
        success: function (res) {
          if (res.code == 0) {
            self.setData({
              hide: 0,
              qrcode: res.data.url
            });
          } else {
           uni.showModal({
              title: '提示',
              content: res.msg
            });
          }
        },
        complete: function () {
         uni.hideLoading();
        }
      });
    },
    hideFun: function (e) {
      this.setData({
        hide: 1
      });
    },

    /**
     * 订单取消
     */
    goToCancel: function (e) {
      var self = this;
      uni.showModal({
        title: "提示",
        content: "是否取消该订单？",
        cancelText: "否",
        confirmText: "是",
        success: function (res) {
          if (res.cancel) return true;

          if (res.confirm) {
            uni.showLoading({
              title: "操作中"
            });
            this.getApp().request({
              url: this.getApp().api.group.order.revoke,
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
                      self.loadOrderList(self.status);
                    }
                  }
                });
              }
            });
          }
        }
      });
    },

    /**
     * 顶部导航事件
     */
    switchNav: function (e) {
      var self = this;
      var status = e.currentTarget.dataset.status; // var windowWidth = this.systemInfo.windowWidth
      // var offsetLeft = e.currentTarget.offsetLeft
      // var scrollLeft = this.data.scrollLeft;
      // if (offsetLeft > windowWidth / 2) {
      //     scrollLeft = offsetLeft
      // } else {
      //     scrollLeft = 0
      // }
      // self.setData({
      //     scrollLeft: scrollLeft,
      // });

      self.loadOrderList(status); // getApp().core.redirectTo({
      //     url: '/pages/pt/order/order?status='+status,
      // })
    },

    /**
     * 前往退款详情
     */
    goToRefundDetail: function (e) {
      var self = this;
      var id = e.currentTarget.dataset.refund_id;
      uni.navigateTo({
        url: '/pages/pt/order-refund-detail/order-refund-detail?id=' + id
      });
    }
  }
};
</script>
<style>
/* pages/pt/order/order.wxss */
page {
    background-color: #ffffff;
}

.scroll-view-x{
    background-color: #fff;
    white-space: nowrap;
   position: fixed;
    top: 0;
	/* #ifdef H5 */
	margin-top:80rpx ;
	/* #endif */
}
.tab-bar{
    background: #fff;
    z-index: 1000;
    color: #666666;
}
.tab-bar ~ .order-list{
    padding-top: 80rpx;
}
.order-itme{
    border-bottom: 1rpx solid #f7f7f7;
}
.tab-bar .tab-bar-item{
    display: inline-block;
    padding:0 24rpx;
    text-align: center;
}
.tab-bar-item{
    display: inline-block;
}
.tab-bar .tab-bar-item text{
    height: 80rpx; 
    line-height: 80rpx;
    display: inline-block;
    font-size: 24rpx;
}

.active{
    color: #c10000;
    border-bottom: 2px solid #c10000;
}
/* .order-itme{
    margin-top: 20rpx;
     padding: 0 24rpx; 
} */
.goods-image image{
    width: 156rpx;
    height: 156rpx;
    margin-right: 24rpx;
}
.order-item-top{
    height: 80rpx;
    color: #c10000;
    font-size: 10pt;
    background-color: #ffffff;
    padding: 0 24rpx;
}
.order-time{
    text-align: right;
    color: #919191;
}
.order-list-btn {
	margin-left: 20rpx;
	width:136rpx;
	height:45rpx;
	background:rgba(255,255,255,1);
	border-radius:20rpx;
	text-align: center;
	line-height: 41rpx;
	font-size: 24rpx;
	color: #595959;
	border:2rpx solid rgba(214,214,214,1);
}
.goods{
    padding:0 24rpx 0rpx 24rpx;
    color: #353535;
    background-color: #ffffff;
}
.goods-name{
    font-size: 12pt;
    line-height:1;
}
.attr-list{
    margin-top: 20rpx;
    font-size:20rpx; 
    line-height: 1;
}
.order-price{
    font-size: 12pt;
}
.order-item-total{
    text-align: right;
    height: 80rpx;
    border-bottom:1rpx solid #f7f7f7; 
    padding: 0 24rpx;
    background-color: #ffffff;
}
.order-item-total text{
   
}
.play-btn{
    /* height: 80rpx; */
    text-align: right;
    /* line-height: 80rpx; */
    padding: 15rpx 24rpx; 
    background-color: #ffffff;
    justify-content:flex-end;
    
}
.red-btn{
    width: 136rpx;
    height: 45rpx;
    background-color:#F49E3A; 
    display: inline-block;
    text-align: center;
    line-height: 45rpx;
    border-radius: 20rpx;
    color: #ffffff;
    font-size: 24rpx;
    /* margin-left: 20rpx; */
    padding: 0 !important;
    margin: 0 0 0 24rpx !important;
    border: 0 !important;
}
.frame-btn{
    font-size: 24rpx;
    margin-left: 20rpx;
    width: 136rpx;
    height: 45rpx;
    display: inline-block;
    text-align: center;
    line-height: 43rpx;
    border-radius: 20rpx;
    border: 1rpx solid #D6D6D6;
    color: #595959;
}

.empty-img image{
    width: 280rpx;
    height: 280rpx;
}
.empty-img{
    margin-top:134rpx;
}
.empty-text {
    margin-top:56rpx;
    font-size: 28rpx;
    color: #666666; 
}
.empty-btn{
    margin-top: 30rpx;
}
.go-to-group{
    height: 64rpx;
    width: 220rpx;
    color: #ffffff;
    font-size: 11pt;
    background-color: #F49E3A;
    border-radius: 5rpx;
}

.hide{
  display: none;
}
.modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
.circle-tip {
  width: 24rpx;
  height: 24rpx;
  line-height: 24rpx;
  color: #fff;
  background-color: #c10000;
  border-radius: 50%;
  text-align: center;
  position: absolute;
  top: 24rpx;
  right: 12rpx;
  font-size: 8px;
}



</style>