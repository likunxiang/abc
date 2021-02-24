<template>
<!--pages//private/privateCart/privateCart.wxml-->

<view class="page flex ns-column">
	
	<view class="flex1">
		<block v-if="cartList.length<=0">
			<view class="empty">
				<view class="no-data-icon flex-y-center flex-x-center">
					<image src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/cart-bg.jpg"></image>
				</view>
				<view>购物车空空的</view>
			</view>
		</block>
		<block v-else>
			<scroll-view scroll-y="true" style="height:calc(100vh - 100rpx);">
				<view class="goods flex align-center" v-for="(item, index) in cartList" :key="index">
					<view :class="'iconfont ' + (item.is_sel==1?'icon-xuanzhong color-252E3E':'icon-weixuanzhong') + ' fs-40'" :data-index="index" :data-id="item.cart_id" :data-price="item.min_price" @tap="chooseCart"></view>
					<view style="width: 200rpx;height: 200rpx;margin-right: 27rpx;margin-left: 20rpx;">
						<image style="width: 200rpx;height: 200rpx;" mode="aspectFill" :src="item.first_cover_pic"></image>
					</view>
					<view class="flex1">
						<view class="fs-24 color-595959" style="height: 90rpx;">{{item.goods_name}}</view>
						
						<block v-if="item.goods_num>0">
							<view class="flex justify-between align-center">
								<view class="flex align-center">
									<view class="fs-24 color-FF9100 mr-10">¥ {{item.goods_price}}</view>
								</view>
								<view class="flex align-center justify-between" style="height: 35rpx;background-color: #F2F2F2;">
									<block v-if="filters.parseInt(item.cart_num) > 0">
										<view class="numbox flex-x-center flex-y-center" @tap.stop="reduceNum" :data-index="index" :data-id="item.goods_id" :data-price="item.goods_price">
											<view class="iconfont icon-jianshao fs-20"></view>
										</view>
									</block>
									<block v-else>
										<view class="numbox flex-x-center flex-y-center numbox-no">
											<view class="iconfont icon-jianshao fs-20"></view>
										</view>
									</block>
									<view class="flex-x-center flex-y-center" style="width: 50rpx;text-align: center;">
										<input style="width: 46rpx;text-align: center;" type="number" :value="item.cart_num" @blur="changeCartNum" :data-index="index" :data-id="item.goods_id" :data-price="item.goods_price"></input>
									</view>
									<block v-if="filters.parseInt(item.cart_num)>=item.goods_num">
										<view class="numbox flex-x-center flex-y-center numbox-no" @tap.stop>
											<view class="iconfont icon-tianjia fs-20"></view>
										</view>
									</block>
									<block v-else>
										<view class="numbox flex-x-center flex-y-center" @tap.stop="addNum" :data-index="index" :data-id="item.goods_id" :data-price="item.goods_price">
											<view class="iconfont icon-tianjia fs-20"></view>
										</view>
									</block>
								</view>
								
							</view>
						</block>
						<block v-else>
							<view class="flex justify-between align-center fs-24 color-FF9100">抱歉，这款商品库存不足</view>
						</block>
					</view>
				</view>
			</scroll-view>
		</block>
		
	</view>
	<view class="footer flex align-center">
		<view class="flex align-center" style="padding-left: 30rpx;" @tap="chooseAll">
			<view :class="'iconfont ' + (is_all?'icon-xuanzhong color-252E3E':'icon-weixuanzhong') + ' fs-40 mr-10'"></view>
			<view>全选</view>
		</view>
		
		<view class="flex1 fs-28" style="padding-left: 30rpx;">
			<text class="color-595959">合计：</text>
			<text class="color-FF9100">¥ {{total_price}}</text>
		</view>
		<block v-if="total_price == 0">
			<view class="cu-btn pay-btn bg-9B9B9B">下一步</view>
		</block>
		<block v-else>
			<view class="cu-btn pay-btn bg-FF9100" @tap="toBasket">下一步</view>
		</block>
	</view>
</view>
</template>


<script>

export default {
  data() {
    return {
      is_all: false,
      cartList: "",
      total_price: "",
	  filters: require('../../utils/filters.js'),
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
    this.getCartList();
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
    this.getCartList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    getCartList() {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_cart,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },

        success(res) {
          if (res.code == 0) {
            self.setData({
              cartList: res.data
            });
            self.totalPrice();
            self.isAll();
          }
        },

        complete: res => {
          this.getApp().core.hideLoading();
          this.getApp().core.stopPullDownRefresh();
        }
      });
    },

    changeCartNum(e) {
      var self = this;
      var cartsNum = e.detail.value;
      var index = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var price = e.currentTarget.dataset.price;
      var goodsNum = self.cartList[index].goods_num;

      if (parseInt(cartsNum) < 0) {
        wx.showToast({
          title: '商品数量不得小于0',
          icon: 'none'
        });
        return false;
      }

      if (parseInt(cartsNum) > parseInt(goodsNum)) {
        wx.showToast({
          title: '库存不足',
          icon: 'none'
        });
        self.setData({
          ['cartList[' + index + '].cart_num']: goodsNum
        });
      } else {
        self.setData({
          ['cartList[' + index + '].cart_num']: cartsNum
        });
      }

      self.totalPrice();
      self.editCartNum(id, self.cartsNum, price);
    },

    isAll() {
      var self = this;
      var cartList = self.cartList;
      var sel_count = 0;

      for (var i in cartList) {
        if (cartList[i].is_sel == 1) {
          sel_count++;
        }
      }

      if (sel_count == cartList.length) {
        self.setData({
          is_all: true
        });
      } else {
        self.setData({
          is_all: false
        });
      }
    },

    chooseAll() {
      var self = this;
      var cartList = self.cartList;
      var is_all = self.is_all;
      var idArr = '';
      var is_sel;

      if (is_all) {
        is_sel = 2;

        for (var i in cartList) {
          cartList[i].is_sel = 2;

          if (i < cartList.length - 1) {
            idArr += cartList[i].cart_id + ',';
          } else {
            idArr += cartList[i].cart_id;
          }
        }
      } else {
        is_sel = 1;

        for (var i in cartList) {
          cartList[i].is_sel = 1;

          if (i < cartList.length - 1) {
            idArr += cartList[i].cart_id + ',';
          } else {
            idArr += cartList[i].cart_id;
          }
        }
      }

      self.setData({
        cartList: cartList,
        is_all: !is_all
      });
      this.getApp().request({
        url: this.getApp().api.selfSupport.edit_cart_is_sel,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          id: idArr,
          is_sel: is_sel
        },

        success(res) {
          if (res.code == 0) {} else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }

      });
      self.totalPrice();
    },

    chooseCart(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var is_sel = self.cartList[index].is_sel;

      if (is_sel == 1) {
        is_sel = 2;
      } else {
        is_sel = 1;
      }

      self.setData({
        ['cartList[' + index + '].is_sel']: is_sel
      });
      self.isAll();
      self.totalPrice();
      this.getApp().request({
        url: this.getApp().api.selfSupport.edit_cart_is_sel,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          id: id,
          is_sel: is_sel
        },

        success(res) {
          if (res.code == 0) {} else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }

      });
    },

    // 加
    addNum(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var price = e.currentTarget.dataset.price;
      var cartsNum = self.cartList[index].cart_num;
      cartsNum = +cartsNum + 1;
      self.setData({
        ['cartList[' + index + '].cart_num']: cartsNum
      });
      self.totalPrice();
      self.editCartNum(id, cartsNum, price);
    },

    reduceNum(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var price = e.currentTarget.dataset.price;
      var cartsNum = self.cartList[index].cart_num;
      cartsNum = +cartsNum - 1;
      self.setData({
        ['cartList[' + index + '].cart_num']: cartsNum
      });
      self.totalPrice();
      self.editCartNum(id, cartsNum, price);
    },

    editCartNum(id, num, price) {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.edit_cart,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          num: num,
          goods_id: id,
          price: price
        },

        success(res) {
          if (res.code == 0) {} else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }

      });
    },

    totalPrice() {
      var self = this;
      var cartList = self.cartList;
      var total_price = 0;

      for (var i in cartList) {
        if (cartList[i].is_sel == 1) {
          total_price += cartList[i].cart_num * cartList[i].goods_price;
        }
      }

      self.setData({
        total_price: total_price
      });
    },

    //
    toBasket() {
      wx.navigateTo({
        url: '/private/privateBasket/privateBasket?type=1'
      });
    }

  }
};
</script>
<style>
@import "./privateCart.css";
</style>