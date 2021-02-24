<template>
	<view class="page">
		<common></common>
		<view class="header bg-white">
			<view class="big-nav-box">
				<view class="big-nav flex">
					<view v-for="(item, index) in bigNavList" :key="index" :class="'flex1 big-nav-main ' + (bigNavIns==index?'big-nav-main-active':'')" @tap="changeBigNav" :data-index="index">{{item}}</view>
				</view>
			</view>
			<block v-if="bigNavIns==0">
				<view class="nav-box flex fs-30 color-999999 justify-between">
					<view v-for="(item, index) in kanNavList" :key="index" :class="' ptb-24 ' + (kanNavIns==index?'color-333333 ns-text-bold pr':'')" @tap="changeKanNav" :data-index="index">
						<view>{{item}}</view>
						<view v-if="kanNavIns==index" class="under-line"></view>
					</view>
				</view>
			</block>
			<block v-else>
				<view class="nav-box flex fs-30 color-999999 justify-between">
					<view v-for="(item, index) in pinNavList" :key="index" :class="' ptb-24 ' + (pinNavIns==index?'color-333333 ns-text-bold pr':'')" @tap="changePinNav" :data-index="index">
						<view>{{item.name}}</view>
						<view v-if="pinNavIns==index" class="under-line"></view>
					</view>
				</view>
			</block>
		</view>
		<scroll-view scroll-y="true" style="height: calc(100vh - 198rpx);">
			<view class="p-24">
				<view v-for="(item, index) in order_list" :key="index" class="public-box mb-24" :url="'/pages/order-detail/order-detail?order_id=' + item.order_id" @tap="status==4?'goToRefundDetail':''" :data-refund_id="item.order_refund_id">
					<view class="flex-row order-item-top flex-y-center mb-30" v-if="status!=4">
						<view class="flex-grow-1 order-status fs-24" style="color: #FF401A;">
							{{item.status_name}}
							<block v-if="item.is_group==1 && item.status==1">，还差{{item.surplusGruopNum}}人成团</block>
						</view>
						<view class="flex-grow-1 order-time fs-24" style="color: #FF401A;" v-if="(item.is_group==1 && item.status==1) || (item.status==1&&item.is_show_time)">
							剩余{{item.limit_time.days}}天{{item.limit_time.hours}} ：{{item.limit_time.mins}}：{{item.limit_time.secs}}
						</view>
					</view>
					<navigator v-for="(good, index2) in item.goods_list" :key="index2" :url="'/pages/order-detail/order-detail?order_id=' + item.order_id" class="flex mb-30">
						<view class="flex-grow-0 goods-image">
							<image style="width: 100%;height: 100%;border-radius: 14rpx;" :src="good.goods_pic"></image>
						</view>
						<view class="flex-grow-1 flex justify-between">
							<view style="width: 300rpx;">
								<view class="good-name ns-text-limit2 fs-30 color-333333">{{good.goods_name}}</view>
								<view class=" flex-row fs-24 color-999999 mt-16">
									<block v-for="(attr, index) in good.attr_list" :key="index">
										{{attr.attr_group_name}}:{{attr.attr_name}}
									</block>
								</view>
							</view>
	
							<view class="ns-text-right">
								<view class="color-FF0200 fs-24">￥{{good.price}}</view>
								<view class="fs-24 color-999999 mt-24">×{{good.num}}</view>
								<!-- <view class="fs-24 color-F49E3A" wx:if="{{good.status_name}}">{{good.status_name}}</view> -->
							</view>
						</view>
					</navigator>
					<view class="flex justify-between">
						<view></view>
						<view class="fs-24" v-if="status != 4">合计：
							<text class="fs-20">¥ <text class="fs-26">{{filters.priceStr(item.total_price)[0]}}.</text><text>{{filters.priceStr(item.total_price)[1]}}</text></text>
						</view>
					</view>
					<view class="mt-30">
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
							<view class="flex-row flex-y-center justify-end">
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
								<view class="flex-gorw-0 red-btn fs-24" v-if="(item.status==1||item.status==2||item.status==3)&&item.is_group==1" :data-id="item.order_id" @tap="goToGroup">
									拼团详情
								</view>
								<!--  拼团中 end  -->
								<!-- <navigator class="order-option-btn frame-btn fs-24" url="/pages/pt/order-comment/order-comment?id={{item.order_id}}" wx:if="{{item.is_send==1&&item.is_confirm==1&&item.is_comment==0}}">评价
				                </navigator> -->
							</view>
						</block>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>




<script>

export default {
  data() {
    return {
		filters:require('../../utils/filters.js'),
      bigNavList: ['拼团订单', '砍价订单'],
      bigNavIns: 0,
      kanNavList: ['全部订单', '砍价中', '砍价成功'],
      kanNavIns: 0,
      pinNavList: [{
        status: -1,
        name: '全部拼团'
      }, {
        status: 0,
        name: '待付款'
      }, {
        status: 1,
        name: '拼团中'
      }, {
        status: 2,
        name: '拼团成功'
      }],
      pinNavIns: 0,
      status: -1,
      order_list: "",
      row_count: "",
      show_no_data_tip: "",
      hide: 0,
      qrcode: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadOrderList();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    changeBigNav(e) {
      var index = e.currentTarget.dataset.index;
      this.setData({
        bigNavIns: index
      });
    },

    changeKanNav(e) {
      var index = e.currentTarget.dataset.index;
      this.setData({
        kanNavIns: index
      });
    },

    changePinNav(e) {
      var index = e.currentTarget.dataset.index;
      var status = this.pinNavList[index].status;
      this.setData({
        pinNavIns: index,
        status: status
      });
      this.loadOrderList();
    },

    loadOrderList: function () {
      var self = this;
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

          if (self.status == 4) {
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
            self.getApp().request({
              url: self.getApp().api.group.order.revoke,
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
.big-nav-box {
	padding: 26rpx 151rpx;
}
.big-nav {
	background:rgba(244,244,244,1);
	border-radius:14rpx;
	padding: 2rpx;
}
.big-nav-main {
	height:58rpx;
	line-height: 58rpx;
	text-align: center;
	border:2rpx solid rgba(244,244,244,1);
	border-radius:14rpx;
	font-size: 30rpx;
	color: #999999;
}
.big-nav-main-active {
	background:rgba(255,255,255,1);
	font-size: 30rpx;
	color: #333333;
	font-weight: bold;
}
.nav-box {
	padding: 0 24rpx;
	background: #fff;
}
.under-line {
	position: absolute;
	bottom: 0rpx;
	left: 50%;
	margin-left: -22rpx;
	width:44rpx;
	height:8rpx;
	background:linear-gradient(-90deg,rgba(255,152,2,1),rgba(255,201,1,1));
	border-radius:4rpx;
}
.goods-image {
	width: 200rpx;
	height: 200rpx;
	border-radius: 14rpx;
	margin-right: 19rpx;
}
.order-list-btn {
	width:131rpx;
	height:51rpx;
	line-height: 49rpx;
	text-align: center;
	border:1rpx solid rgba(153,153,153,.5);
	border-radius:23rpx;
	font-size: 24rpx;
	color: #333;
}
.red-btn {
	width:130rpx;
	height:50rpx;
	line-height: 50rpx;
	line-height: 50rpx;
	text-align: center;
	color: #fff;
	background:linear-gradient(-90deg,rgba(255,152,2,1),rgba(255,201,1,1));
	border-radius:25rpx;
}
</style>