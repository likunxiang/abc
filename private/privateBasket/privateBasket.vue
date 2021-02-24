<template>
<!--pages//private/privateBasket/privateBasket.wxml-->
<view class="page" v-if="cartList">
	<view class="tips flex-y-center" :style="'width:' + x + 'px;height:' + y + 'px'" catchtouchmove="true" v-if="is_tips">
		<view class="tips-content fs-28 color-2C2C2C">
			<view class>
				<view class="flex-x-center ns-text-bold">安全提示</view>
				<view class style="padding: 36rpx 35rpx 37rpx;"><rich-text :nodes="safeTips"></rich-text></view>
				<view class="flex ns-align-items-flex-center mb-20 flex-x-center" @tap.stop="agreeInvite">
					<view :class="'iconfont ' + (isAgreeInvite?'icon-xuanzhong color-252E3E fs-40':'icon-weixuanzhong fs-40')"></view>
				
					<view class="ml-20">我已阅读，不再提示</view>
				</view>
			</view>
			<view class="line"></view>
			<view class="invite-btn flex">
				<view class="flex1 ns-text-center" style="border-right: 2rpx solid #D6D6D6;" @tap.stop="closeTips">我再想想</view>
				<view class="flex1 ns-text-center" @tap.stop="agreeJoin">确定支付</view>
			</view>
		</view>
	</view>
	<view class="body">
		<view class="express-way flex ns-align-items-flex-center justify-between mb-20">
			<view class="fs-28 color-2C2C2C ns-text-bold">配送方式</view>
			<view class="flex">
				<view class="flex" style="margin-right: 40rpx;" v-for="(item, index) in way" :key="index" @tap="changeWay" :data-index="index" :data-text="item">
					<view :class="'iconfont ' + (index==wayIns?'icon-xuanzhong color-252E3E fs-40':'icon-weixuanzhong fs-40')"></view>
					<view class="fs-26 ml-10">{{item}}</view>
				</view>
			</view>
		</view>

		<block v-if="wayText">
			<view class="pick-up-address bg-white mb-20">
				<view class="express-way fs-28 color-2C2C2C ns-text-bold border-bottom">收货地址</view>
				<navigator url="/pages/address-picker/address-picker" class="p-20">
					<block v-if="!addressObj">点击此处选择地址</block>
					<block v-else>
						<view class="flex justify-between ns-align-items-flex-center color-2C2C2C fs-28">
							<view class="flex">
								<view class="fs-30 ns-text-bold">{{addressObj.name}}</view>
								<view class="ml-20">{{addressObj.mobile}}</view>
							</view>
							<view class="iconfont icon-jinru color-D6D6D6 fs-40"></view>
						</view>
						<view class="mt-10">{{addressObj.province + addressObj.city + addressObj.district + addressObj.detail}}</view>
					</block>
				</navigator>
			</view>
		</block>
		<block v-else>
			<view class="pick-up-address bg-white mb-20">
				<view class="express-way fs-28 color-2C2C2C ns-text-bold border-bottom">自提地址</view>
				<navigator class="p-20" url="/private/pickUp/pickUp">
					<block v-if="!pickUpObj">点击此处选择自提点</block>
					<block v-else>
						<view class="flex justify-between ns-align-items-flex-center color-2C2C2C fs-28">
							<view class="flex">
								<view class="fs-30 ns-text-bold">{{pickUpObj.name}}</view>
								<view class="ml-20">{{pickUpObj.mobile}}</view>
							</view>
							<view class="iconfont icon-jinru color-D6D6D6 fs-40"></view>
						</view>
						<view class="mt-10">{{pickUpObj.district.province.name + pickUpObj.district.district.name + pickUpObj.district.city.name + pickUpObj.detail}}</view>
					</block>

				</navigator>
			</view>
		</block>

		<view class="goods-list p-20 bg-white mb-20">
			<view class="goods flex align-center mb-20" v-for="(item, index) in cartList" :key="index">
				<view style="width: 200rpx;height: 200rpx;margin-right: 27rpx;">
					<image style="width: 200rpx;height: 200rpx;" mode="aspectFill" :src="item.first_cover_pic"></image>
				</view>
				<view class="flex1">
					<view class="fs-24 color-595959" style="height: 90rpx;">{{item.goods_name}}</view>
					<view class="flex justify-between align-center">
						<view class="fs-24 color-FF9100 mr-10">¥ {{item.goods_price}}</view>

						<view class="fs-20 color-9B9B9B">x {{item.cart_num}}</view>
					</view>
				</view>
			</view>
			<view class="flex justify-between border-bottom pb-20">
				<view>商品总额</view>
				<view>¥ {{total_price}}</view>
			</view>
			<view class="pt-20 flex ns-row-reverse">
				<view>共 {{total_num}} 件商品 合计 ¥ {{total_price}}</view>
			</view>
		</view>
		<view class="goods-list bg-white mb-20 fs-28" v-if="!wayText">
			<view class="p-20 flex align-center justify-between border-bottom">
				<text>你的名字</text>
				<input class="ns-text-right" type="text" :value="zt_name" @blur="bindName" placeholder="请输入取货人的名字"></input>
			</view>
			<view class="p-20 flex align-center justify-between">
				<text>联系方式</text>
				<input class="ns-text-right" type="number" :value="zt_mobile" maxlength="11" @blur="bindTel" placeholder="请输入取货人的电话"></input>
			</view>
		</view>
	</view>
	
	
	<view class="footer flex">
		<view class="flex1 fs-28" style="line-height: 100rpx;padding-left: 30rpx;">
			<text class="color-595959">合计：</text>
			<text class="color-FF9100">¥ {{total_price}}</text>
		</view>
		<view class="cu-btn pay-btn bg-FF9100" @tap="preSubmit">微信支付</view>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      x: this.getApp().core.getSystemInfoSync().windowWidth,
      y: this.getApp().core.getSystemInfoSync().windowHeight,
      is_tips: false,
      isAgreeInvite: false,
      way: [],
      wayIns: 0,
      cartList: "",
      wayText: "",
      zt_name: "",
      zt_mobile: "",
      total_price: "",
      total_num: "",
      addressObj: "",
      address_id: "",
      pickUpObj: "",
      safeTips: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAdAndSetting();

    if (options.type == 1) {
      this.getCartList();
    } else {
      var cartList = [];
      cartList[0] = {};
      cartList[0].goods_name = options.goods_name;
      cartList[0].goods_id = options.goods_id;
      cartList[0].cart_num = options.num;
      cartList[0].first_cover_pic = options.goods_pic;
      cartList[0].goods_price = options.goods_price;
      cartList[0].is_sel = 1;
      this.setData({
        cartList: cartList
      });
      this.totalPrice();
    }

    this.getLastZT();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.wayText) {
      this.getDefaultAddress();
    } else {
      this.getPickUpAddress();
    }
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
    openTips() {
      this.setData({
        is_tips: true
      });
    },

    closeTips() {
      this.setData({
        is_tips: false
      });
    },

    changeWay(e) {
      var index = e.currentTarget.dataset.index;
      var text = e.currentTarget.dataset.text;
      var wayText = '';

      if (text == '配送') {
        wayText = true;
        this.getDefaultAddress();
      } else {
        wayText = false;
        this.getPickUpAddress();
      }

      this.setData({
        wayIns: index,
        wayText: wayText
      });
    },

    bindName(e) {
      this.setData({
        zt_name: e.detail.value
      });
    },

    bindTel(e) {
      this.setData({
        zt_mobile: e.detail.value
      });
    },

    getCartList() {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_cart,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          is_sel: 1
        },

        success(res) {
          if (res.code == 0) {
            self.setData({
              cartList: res.data
            });
            self.totalPrice();
          }
        }

      });
    },

    totalPrice() {
      var self = this;
      var cartList = self.cartList;
      var total_num = 0;
      var total_price = 0;

      for (var i in cartList) {
        if (cartList[i].is_sel == 1) {
          total_price += cartList[i].cart_num * cartList[i].goods_price;
          total_num += parseInt(cartList[i].cart_num);
        }
      }

      self.setData({
        total_price: total_price,
        total_num: total_num
      });
    },

    getDefaultAddress() {
      var address_id = '';
      var id = this.getApp().core.getStorageSync(this.getApp().const.PICKER_ADDRESS).id;

      if (id) {
        address_id = id;
      }

      this.getApp().request({
        url: this.getApp().api.selfSupport.get_default_address,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          address_id: address_id
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              addressObj: res.data,
              address_id: res.data.id
            });
          } else {// wx.showModal({
            // 	title: res.msg,
            // 	showCancel: false,
            // })
          }
        }
      });
    },

    getPickUpAddress() {
      var self = this;
      var pickId = this.getApp().core.getStorageSync('PICK_ID');
      var id = '';

      if (pickId) {
        id = pickId;
      }

      this.getApp().core.showLoading({
        title: "正在加载",
        mask: true
      });
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_address_data,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          id: id
        },
        success: (res) => {
          this.getApp().core.hideLoading();

          if (res.code == 0) {
            self.setData({
              pickUpObj: res.data,
              address_id: res.data.address_id
            });
          }
        }
      });
    },

    getLastZT() {
      this.getApp().request({
        url: this.getApp().api.selfSupport.last_zt,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              zt_name: res.data.name,
              zt_mobile: res.data.mobile
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

    getTipsMsg() {
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_zy_article,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          type: 2
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              safeTips: res.data.content
            });
          }

          if (res.code == 1) {
            wx.showModal({
              title: res.msg,
              showCancel: false,
              success: res => {
                if (res.confirm) {
                  wx.navigateBack();
                }
              }
            });
          }
        }
      });
    },

    getAdAndSetting() {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_my_shop,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },

        success(res) {
          if (res.code == 0) {
            var expressSet = res.data.expressSet;
            var way = [];
            var wayText;

            for (var i in expressSet) {
              if (expressSet[i].indexOf('2') > -1) {
                way.push('配送');
                wayText = true;
                self.getDefaultAddress();
              }

              if (expressSet[i].indexOf('1') > -1) {
                way.push('自提');
              }
            }

            self.setData({
              way: way,
              wayText: wayText
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

    agreeInvite: function () {
      var self = this;
      self.setData({
        isAgreeInvite: !self.isAgreeInvite
      });
    },

    agreeJoin() {
      if (this.isAgreeInvite) {
        this.getApp().core.setStorageSync('_isPay', 'true');
      }

      this.submitNewOrder();
    },

    preSubmit() {
      if (this.getApp().core.getStorageSync('_isPay')) {
        this.submitNewOrder();
      } else {
        this.openTips();
      }

      if (!this.safeTips) {
        this.getTipsMsg();
      }
    },

    submitNewOrder() {
      var wayText = this.wayText;
      var express_set = '';

      if (wayText) {
        express_set = '2';
      } else {
        express_set = '1';
      }

      var data_list = this.cartList;

      for (var i in data_list) {
        data_list[i].num = data_list[i].cart_num;
      }

      this.getApp().request({
        url: this.getApp().api.selfSupport.add_order,
        method: 'POST',
        data: {
          express_set: express_set,
          address_id: this.address_id,
          zt_name: this.zt_name || '',
          zt_mobile: this.zt_mobile || '',
          data_list: JSON.stringify(data_list)
        },
        success: res => {
          if (res.code == 0) {
            this.payOrder(res.data.id);
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }
      });
    },

    payOrder(id) {
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
              complete: (e) => {
                if (e.errMsg == "requestPayment:fail" || e.errMsg == "requestPayment:fail cancel") {
                  //支付失败转到待支付订单列表
                  this.getApp().core.showModal({
                    title: "提示",
                    content: "订单尚未支付",
                    showCancel: false,
                    confirmText: "确认",
                    success: (res) => {
                      if (res.confirm) {
                        this.getApp().core.redirectTo({
                          url: "/private/privateOrder/privateOrder"
                        });
                      }
                    }
                  });
                  return;
                }

                this.getApp().core.redirectTo({
                  url: "/private/privateOrder/privateOrder"
                });
              }
            });
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false,
              success: res => {
                this.getApp().core.redirectTo({
                  url: "/private/privateOrder/privateOrder"
                });
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
@import "./privateBasket.css";
</style>