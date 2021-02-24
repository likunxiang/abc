<template>
<view>
<!-- 购物车 -->
  <navigator url="/pages/cart/cart" hover-class="none" v-if="carShow">
    <view class="shopCar clear">
      <view class="pull-left pr">
        <text class="iconfont icon-show_goumai"></text>
        <view class="pa number" v-if="cartNum>0">{{cartNum}}</view>
      </view>
      <view class="pull-left">购物车</view>
    </view>
  </navigator>
  <!-- 购买弹窗 -->
  <view class="flex" :style="'width:' + x + 'px;height:' + y + 'px'" v-if="goodBuy" @tap="closeShop" catchtouchmove="ture">
    <view class="goodBox" @tap.stop="nulldo">
      <view class="clear goodheader pr">
        <image :src="goodsCover" class="pull-left goodImg" @tap="previewImage" :data-url="goodsCover" mode="aspectFill"></image>
        <view class="pull-left" style="width:480rpx">
          <view class="clear">
            <view class="red pull-left">￥{{goodList.price}}</view>
            <view class="pull-left oldMoney" v-if="goodList.price<goodList.original_price">￥{{goodList.original_price}}</view>
            <view class="pull-left goodnum">库存：{{goodList.num}}</view>
          </view>
          <view class="goodRule" v-if="goodList.attr_group_list&&goodList.attr_group_list.length!=0"><text v-for="(item, index) in goodList.attr_group_list" :key="index">{{item.attr_group_name}}:{{item.attr_list[active[index]].attr_name}}</text></view>
        </view>
        <image src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/close.png" @tap="closeShop" class="pull-right close"></image>
      </view>
      <view class="ruleChange">
        <!-- 规格 -->
        <view v-if="goodList.attr_group_list&&goodList.attr_group_list.length!=0">
          <view v-for="(item, index) in goodList.attr_group_list" :key="index">
            <view class="ruleTitle">{{item.attr_group_name}}</view>
            <view class="clear">
              <view v-for="(nav, idx) in item.attr_list" :key="idx" :class="'pull-left ' + (active[index]==idx?'active':'')" :data-index="idx" :data-pindex="index" @tap="changeNav" :data-attrid="nav.attr_id">{{nav.attr_name}}</view>
            </view>
          </view>
        </view>
        <view class="clear buyNumber">
          <view class="ruleTitle" style="margin-bottom:0">数量</view>
          <view class="clear pull-right buyNum">
            <image src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/reduction.png" class="pull-left" @tap="reduction"></image>
            <input class="number pull-left" type="number" maxlength="4" :value="buyNum" @blur="setNum" @confirm="setNum"></input>
            <image src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/addActive.png" class="pull-left" @tap="add"></image>
          </view>
        </view>
      </view>
      <view class="clear buyBtn">
        <view :class="(showBuy?'pull-left':'marginAuto') + ' addCard'" @tap="addCard">加入购物车</view>
        <view class="pull-left buy" @tap="toOrder" v-if="showBuy">立即购买</view>
      </view>
    </view>
  </view>
</view>
</template>

<script>

export default {
  data() {
    return {
      x: uni.getSystemInfoSync().windowWidth,
      y: uni.getSystemInfoSync().windowHeight,
      goodBuy: false,
      // 购买商品
      goodList: [],
      // 商品详情数据
      buyNum: 1,
      //购买数量
      active: [],
      //规格选中
      goodsCover: '',
     // cartNum: 0 //加入购物车数量

    };
  },

  components: {},
  props: {
    // 是否显示购物车
    carShow: {
      type: Boolean,
      default: true
    },
    // 商品id
    gid: {
      type: Number,
      optionalTypes: [String]
    },
    // 是否显示立即购买
    showBuy: {
      type: Boolean,
      default: true
    },
    // 购物车数量
    cartNum: {
      type: Number,
      default: 0
    }
  },
  methods: {
    nulldo: function () {},
    closeShop: function (e) {
      this.initData();
    },
    returnAttr: function (goodList) {
      var active = this.active,
          self = this;
      var attr_name_array = [],
          attrIndex = 0;

      for (var i = 0; i < active.length; i++) {
        var navName = goodList.attr_group_list[i].attr_list[active[i]].attr_name;
        attr_name_array.push(navName);
      }

      if (attr_name_array.length != 0) {
        var attr_name_array_sort = JSON.stringify(attr_name_array.sort());

        for (var i = 0; i < goodList.attr.length; i++) {
          var attr_name_sort = JSON.stringify(goodList.attr[i].attr_name.sort());

          if (attr_name_array_sort == attr_name_sort) {
            attrIndex = i;
            break;
          }
        }
      }

      return attrIndex;
    },
    // 颜色点击
    changeNav: function (e) {
      var val = e.target.dataset.index,
          pindex = e.target.dataset.pindex,
          active = this.active,
          self = this,
          goodsCover = this.goodsCover,
          goodList = this.goodList;

      if (val == active[pindex]) {
        return false;
      } else {
        active[pindex] = val;
        var attrIndex = self.returnAttr(goodList); // 改变商品数据

        goodsCover = goodList.attr[attrIndex].pic ? goodList.attr[attrIndex].pic : goodList.attr_pic;
        goodList.num = goodList.attr[attrIndex].num;
        goodList.price = goodList.attr[attrIndex].price;
        goodList.sku = goodList.attr[attrIndex].sku;

        if (self.buyNum > goodList.attr[attrIndex].num) {
          self.setData({
            buyNum: 1
          });
        }

        self.setData({
          active: active,
          goodsCover: goodsCover,
          goodList: goodList
        });
      }
    },
    // input直接赋值
    setNum: function (e) {
      var val = e.detail.value;

      if (val > 0 && val <= this.goodList.num) {
        this.setData({
          buyNum: val
        });
      } else {
        this.setData({
          buyNum: 1
        });
      }
    },
    // 减少
    reduction: function () {
      var num = this.buyNum;

      if (num > 1) {
        num--;
        this.setData({
          buyNum: num
        });
      }
    },
    add: function () {
      var num = this.buyNum,
          maxNum = this.goodList.num;

      if (num < maxNum) {
        num++;
        this.setData({
          buyNum: num
        });
      }
    },
    // 初始化数据
    initData: function () {
      this.setData({
        active: [],
        buyNum: 1,
        goodBuy: false,
        goodList: []
      });
    },
    // 下单
    submit: function (type) {
      var goodList = this.goodList,
          active = this.active,
          self = this;

      if (goodList.miaosha_data && goodList.miaosha_data.rest_num > 0 && self.buyNum > goodList.miaosha_data.rest_num) {
        uni.showToast({
          title: "商品库存不足，请选择其它规格或数量",
          icon: 'none'
        });
        return true;
      }

      if (self.buyNum > goodList.num) {
        uni.showToast({
          title: "商品库存不足，请选择其它规格或数量",
          icon: 'none'
        });
        return true;
      } // var attr_group_list = goodList.attr_group_list;
      // var checked_attr_list = [];
      // for (var i = 0; i < active.length; i++) {
      //   checked_attr_list.push({
      //     attr_group_id: attr_group_list[i].attr_group_id,
      //     attr_group_name: attr_group_list[i].attr_group_name,
      //     attr_id: attr_group_list[i].attr_list[active[i]].attr_id,
      //     attr_name: attr_group_list[i].attr_list[active[i]].attr_name,
      //   })
      // }


      if (type == 'ADD_CART') {
        //加入购物车
        uni.showLoading({
          title: "正在提交",
          mask: true
        });
        self.getApp().request({
          url: self.getApp().api.cart.add_cart,
          method: "POST",
          data: {
            goods_id: goodList.id,
            sku: goodList.sku,
            num: self.buyNum
          },
          success: function (res) {
            uni.hideLoading();
            uni.showToast({
              title: res.msg,
              duration: 1500
            });

            if (res.code == 0) {
              var cartNum = self.cartNum;
              cartNum += self.buyNum; // 自定义事件（满减优惠调用）

              var myEventDetail = {
                buyNum: self.buyNum
              }; // detail对象，提供给事件监听函数

              var myEventOption = {}; // 触发事件的选项

              self.$emit('buyCallback', {
                detail: myEventDetail
              }, myEventOption);
              self.setData({
                cartNum: cartNum
              }, () => {
                self.initData();
              });
            }
          }
        });
      }

      if (type == 'BUY_NOW') {
        //立即购买
        var goods_list = [];
        goods_list.push({
          goods_id: goodList.id,
          num: self.buyNum,
          sku: goodList.sku
        });
        var mch_id = 0;

        if (goodList.mch != null) {
          mch_id = goodList.mch.id;
        }

        var mch_list = [];
        mch_list.push({
          mch_id: mch_id,
          goods_list: goods_list
        });
        uni.redirectTo({
          url: "/pages/new-order-submit/new-order-submit?mch_list=" + JSON.stringify(mch_list)
        });
      }
    },
    previewImage: function (e) {
      var urls = e.currentTarget.dataset.url;
      uni.previewImage({
        urls: [urls]
      });
    },
    // 购买
    toOrder: function () {
      this.submit('BUY_NOW');
    },
    // 加入购物车
    addCard: function () {
      this.submit('ADD_CART');
    },
    // 获取商品数据
    getGoods: function () {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.default.goods,
        data: {
          id: self.gid
        },
        success: function (res) {
          if (res.code == 0) {
            var active = self.active,
                goodsCover = self.goodsCover;

            if (res.data.attr_group_list && res.data.attr_group_list.length != 0) {
              for (var i = 0; i < res.data.attr_group_list.length; i++) {
                active[i] = 0;
              }
            } // 取出规格名数组


            if (res.data.attr.length != 0) {
              for (var i = 0; i < res.data.attr.length; i++) {
                if (res.data.attr[i].attr_list.length != 0) {
                  var attr_name = [];

                  for (var j = 0; j < res.data.attr[i].attr_list.length; j++) {
                    var nav_name = res.data.attr[i].attr_list[j].attr_name;
                    attr_name.push(nav_name);
                  }

                  res.data.attr[i].attr_name = attr_name;
                }
              }
            }

            var attrIndex = self.returnAttr(res.data); // 改变商品数据

            goodsCover = res.data.attr[attrIndex].pic ? res.data.attr[attrIndex].pic : res.data.attr_pic;
            res.data.num = res.data.attr[attrIndex].num;
            res.data.price = res.data.attr[attrIndex].price;
            res.data.sku = res.data.attr[attrIndex].sku;

            if (self.buyNum > res.data.attr[attrIndex].num) {
              self.setData({
                buyNum: 1
              });
            }

            self.setData({
              goodList: res.data,
              goodBuy: true,
              active: active,
              goodsCover: goodsCover
            });
          } else {
            if (res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none',
                duration: 2000,
                mask: true
              });
            }
          }
        }
      });
    } 
  }
};
</script>
<style>
@import "./shopbuy.css";
</style>