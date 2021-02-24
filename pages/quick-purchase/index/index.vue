<template>
	<view class="body after-navbar" v-if="false">
		<common></common>
	        <block data-src="/components/common/navbar"><block v-if="_navbar && _navbar.navs && _navbar.navs.length>0">
		<view :class="'navbar flex-row ' + __device + ' pr'" :style="'background:' + _navigation_bar_color.bottomBackgroundColor">
			<block v-for="(item, index) in _navbar.navs" :key="index">
				<navigator class="flex-grow-1 flex-y-center" :url="item.url" open-type="navigate" v-if="item.open_type == 'wxapp'" :app-id="item.params.appid" :path="item.params.path" :data-open_type="item.open_type" target="miniProgram">
					<view>
						<image class="navbar-icon" :src="item.active?item.active_icon:item.icon"></image>
						<!-- <text class="iconfont {{item.active?item.active_icon:item.icon}}"></text> -->
						<view class="navbar-text" :style="'color: ' + (item.active?item.active_color:item.color) + ';'">{{item.text}}
						</view>
					</view>
				</navigator>
				<navigator class="flex-grow-1 flex-y-center" :url="item.url" open-type="tel" v-else-if="item.open_type == 'tel'" @tap="navigatorClick" :data-tel="item.params.tel" :data-open_type="item.open_type">
					<view>
						<image class="navbar-icon" :src="item.active?item.active_icon:item.icon"></image>
						<view class="navbar-text" :style="'color: ' + (item.active?item.active_color:item.color) + ';'">{{item.text}}
						</view>
					</view>
				</navigator>
				<!-- <block wx:elif='{{item.open_type == "contact"}}'>
	                <view class='flex-grow-1 flex-y-center' style='width:1%;padding-top:8rpx;'>
	                    <view style='width:100%;'>
	                        <button open-type="contact" session-from="{{_user_info.nickname}}|">
	                            <image class="navbar-icon" src="{{item.active?item.active_icon:item.icon}}"></image>
	                            <view class="navbar-text" style="color: {{item.active?item.active_color:item.color}};">{{item.text}}</view>
	                        </button>
	                    </view>
	                </view>
	            </block> -->
				<navigator class="flex-grow-1 flex-y-center" :url="'/pages/web/web?url=' + item.params.web" open-type="navigate" v-else-if="item.open_type == 'web'">
					<view>
						<image class="navbar-icon" :src="item.active?item.active_icon:item.icon"></image>
						<view class="navbar-text" :style="'color: ' + (item.active?item.active_color:item.color) + ';'">{{item.text}}
						</view>
					</view>
				</navigator>
	
				<navigator hover-class="none" class="flex-y-center" :style="index==2?'margin-left: 200rpx;':''" :url="item.new_url" open-type="redirect" :data-open_type="item.open_type" v-else>
					<view>
						<image class="navbar-icon" :src="item.active?item.active_icon:item.icon" mode="aspectFit"></image>
						<!-- <text class="navbar-icon iconfont {{item.active?item.active_icon:item.icon}}"></text> -->
						<view class="navbar-text fs-22" :style="'color: ' + (item.active?'#FF9F02':'#616161') + ';'">{{item.text}}
						</view>
					</view>
				</navigator>
			</block>
	
			<navigator open-type="redirect" url="/pages/liveRoom/liveRoom" class="iconfont navbar-icon-box icon-zhibo"></navigator>
		</view>
	</block></block>
	        <block data-src="/components/shopping_cart/shopping_cart"><!-- 购物车商品列表 -->
	<view v-if="shoppingCartModel" :class="'shopping-cart-list ' + (_navbar ? 'shopping-cart-list2' : '')">
	    <view class="carHeader">
	        <view class="yixuan">已选商品</view>
	        <view class="clearAll" @tap="clearShoppingCart">
	            <image :src="__wxapp_img.store.clear.url" style="width:22rpx; height:22rpx;margin-right:10rpx; "></image>
	            <text style="font-size:27rpx;color:#BDBDBD;">清空</text>
	        </view>
	    </view>
	    <view class="hr"></view>
	    <scroll-view scroll-y="true" style="max-height: 500rpx;width:100%">
	        <block v-for="(cargood, index) in carGoods" :key="index">
	            <block v-if="cargood.attr == ''">
	                <block v-if="cargood.num > 0">
	                    <view class="carGood">
	                        <view class="goodsname" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{cargood.goods_name}}</view>
	                        <view class="goodsNumPrice">
	                            <view class="goodsTotalPrice" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">￥{{cargood.goods_price}}</view>
	                            <view class="goodsNum">
	                                <view class="carStandard" @tap="jia" :data-index="index" :data-id="cargood.goods_id">
	                                    <image :src="__wxapp_img.store.jia.url" class="carStandard"></image>
	                                </view>
	                                <view class="carStandard" id="carStandard_num">{{cargood.num}}</view>
	                                <view class="carStandard" @tap="jian" :data-index="index" :data-id="cargood.goods_id">
	                                    <image :src="__wxapp_img.store.jian.url" class="carStandard"></image>
	                                </view>
	                            </view>
	                        </view>
	                    </view>
	                </block>
	            </block>
	            <block v-else>
	                <block v-if="cargood.num > 0">
	                    <view class="carGood">
	                        <view class="goods_attr_name">
	                            <view class="cargood_name" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{cargood.goods_name}}</view>
	                            <view class="cargood_attr_name" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;float:left;">
	                                <text v-for="(item, index2) in cargood.attr" :key="index2">{{item.attr_group_name}}:{{item.attr_name}}</text>
	                            </view>
	                        </view>
	                        <view class="goodsNumPrice">
	                            <view class="goodsTotalPrice">￥{{cargood.goods_price}}</view>
	                            <view class="goodsNum">
	                                <view class="carStandard" @tap="jia" :data-index="index" :data-id="cargood.goods_id">
	                                    <image :src="__wxapp_img.store.jia.url" class="carStandard"></image>
	                                </view>
	                                <view class="carStandard" id="carStandard_num">{{cargood.num}}</view>
	                                <view class="carStandard" @tap="jian" :data-index="index" :data-id="cargood.goods_id">
	                                    <image :src="__wxapp_img.store.jian.url" class="carStandard"></image>
	                                </view>
	                            </view>
	                        </view>
	                    </view>
	                </block>
	            </block>
	        </block>
	    </scroll-view>
	</view>
	
	<view class="modal-mask" @tap="hideShoppingCart" v-if="shoppingCartModel"></view>
	
	
	<!-- 购物车 -->
	<view :id="__device" :class="'goods_car ' + (_navbar ? 'shopping_cart' : '')">
	    <block v-if="total.total_num == 0">
	        <view class="buy">
	            <view class="car_pic">
	                <image class="car_png" :src="__wxapp_img.store.car.url"></image>
	            </view>
	            <view class="weixuan">未选购商品</view>
	        </view>
	        <view class="goumai">立即购买</view>
	    </block>
	    <block v-if="total.total_num > 0">
	        <view class="buy" @tap="shoppingCartListModel">
	            <view class="car_pic">
	                <image class="car_png" :src="__wxapp_img.store.yougoods.url"></image>
	                <view class="total_num">{{total.total_num}}</view>
	            </view>
	            <view class="price">￥{{total.total_price}}</view>
	        </view>
	        <view class="pay" @tap="buynow">立即购买</view>
	    </block>
	</view></block>
	        <block data-src="/components/specifications_model/specifications_model"><view id="modal-mask" @tap="hideModal" catchtouchmove="preventTouchMove" v-if="showModal"></view>
	 <view class="modal-dialog" v-if="showModal">
	    <view @tap="close_box">
	    <image :src="__wxapp_img.store.close3.url" class="close3"></image>
	    </view>
	    <view class="modal-title" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{goods_name}}</view>
	    <scroll-view scroll-y="true" style="height: 100%;">
	        <view class="modal-content">
	        <view>
	            <view v-for="(attr_group, index) in attr_group_list" :key="index" class="attr-group" v-if="attr_group.attr_list.length>0">
	                <view class="attr-group-name">{{attr_group.attr_group_name}} :</view>
	                <view class="attr-list">
	                    <block v-for="(item, index2) in attr_group.attr_list" :key="index2">
	                    <text :class="'attr_name ' + (item.checked?'select_active':'') + ' ' + (item.is_attr_num ? 'attr_num_0' : '')" :data-group-id="attr_group.attr_group_id" :data-id="item.attr_id" @tap="attrClick">{{item.attr_name}}</text> 
	                    </block>
	                </view>
	            </view>
	        </view>     
	        </view> 
	    </scroll-view>
	    <view class="modal-footer">
	        <block v-if="check_goods_price">
	        <view class="guigeprice">￥{{check_goods_price}}</view>
	        </block>
	        <block v-else>
	        <view class="guigeprice">￥{{temporaryGood.price}}</view>  
	        </block>
	        <block v-if="check_num">
	            <view class="btn-car_num">
	                <image class="carStandard" :src="__wxapp_img.store.jian.url" @tap="guigejian"></image>
	                <input @input="goodNumChange" type="number" class="carStandard good_num" id="num" maxlength="999" :value="check_num"></input>
	                <image class="carStandard" :src="__wxapp_img.store.jia.url" @tap="onConfirm"></image>
	            </view>
	        </block>
	        <block v-else>
	            <view class="btn-car" style="background:#c10000;color:#FFFFFF;" @tap="onConfirm" data-status="confirm">加入购物车</view>
	        </block>
	    </view> 
	</view></block>
	        <view :class="'quick_purchase ' + (_navbar ? 'shopping-cart' : '' )">
	            <!-- 分类开始  -->
	            <view class="left_nav">
	                <block v-if="quick_list" :key="id">
	                    <scroll-view scroll-y="true" style="height: 100%;width:100%">
	                        <block v-if="quick_hot_goods_lists.length > 0">
	                            <view :class="'cat_name ' + (cat_checked?'cat_name_active':'')" data-tag="hot_cakes" @tap="selectMenu">
	                                <image :src="__wxapp_img.store.quick_hot.url" class="quick-hot"></image>
	                                <view style="float:left; height:30px;display:flex;align-items:center;justify-content:center;">热销</view>
	                            </view>
	                        </block>
	
	                        <block v-for="(item, index) in quick_list" :key="index">
	                            <view :class="'cat_name ' + (item.cat_checked?'cat_name_active':'')" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;" :data-id="quick_list.id" :data-tag="'aa'+index" @tap="selectMenu" :data-index="index">{{item.name}}</view>
	                        </block>
	                    </scroll-view>
	                </block>
	            </view>
	
	            <!--商品开始  -->
	            <view class="r_goods">
	                <scroll-view scroll-y="true" style="height: 100%;padding: 10rpx" :scroll-into-view="toView">
	                    <!-- 热销商品开始  -->
	                    <block v-if="quick_hot_goods_lists.length > 0">
	                        <view class="navname" id="hot_cakes">热销</view>
	                        <block v-for="(goods, index) in quick_hot_goods_lists" :key="index">
	                            <view class="goodsall">
	                                <view class="goods" :data-id="goods.id" @tap="get_goods_info">
	                                    <view class="goods_pic">
	                                        <image :src="goods.cover_pic" id="goods_pic" lazy-load="true"></image>
	                                    </view>
	                                    <view class="goods_info">
	                                        <view class="goods_name" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{goods.name}}</view>
	                                        <view v-if="__is_sales" style="font-size:24rpx;color:#666666;margin-top:14rpx;">销量 {{goods.virtual_sales}}</view>
	                                        <view style="font-size:16px;color:#c10000;margin-top:22rpx;width:63%;">￥{{goods.price}}</view>
	                                    </view>
	                                </view>
	
	                                <!-- 无规格开始 -->
	                                <block v-if="goods.use_attr == 0">
	                                    <view class="purchase">
	                                        <view id="jia" class="standard" @tap="jia" :data-id="goods.id">
	                                            <image :src="__wxapp_img.store.jia.url" class="standard" style="width:100%;"></image>
	                                        </view>
	                                        <block v-if="goods.num > 0">
	                                            <input @input="goodNumChange" type="number" class="standard good_num" id="num" :data-id="goods.id" maxlength="999" :value="goods.num"></input>
	                                            <view class="standard" id="jian" @tap="jian" :data-id="goods.id">
	                                                <image :src="__wxapp_img.store.jian.url" class="standard"></image>
	                                            </view>
	                                        </block>
	                                    </view>
	                                </block>
	                                <!-- 无规格结束 -->
	                                <!-- 规格商品开始 -->
	                                <block v-if="goods.use_attr == 1">
	                                    <view class="guigepurchase" @tap="showDialogBtn" :data-id="goods.id">选规格
	                                        <view v-if="goods.num > 0" class="guigenum">{{goods.num}}</view>
	                                    </view>
	
	                                </block>
	                                <!-- 规格商品结束 -->
	                            </view>
	                        </block>
	                        <!-- 热销商品结束  -->
	                    </block>
	                    <block v-for="(goods_list, index) in quick_list" :key="index">
	                        <view class="navname" :id="'aa'+index">{{goods_list.name}}</view>
	                        <block v-for="(goods, index2) in goods_list.goods" :key="index2">
	                            <view class="goodsall">
	                                <view class="goods" :data-id="goods.id" @tap="get_goods_info">
	                                    <view class="goods_pic">
	                                        <image :src="goods.cover_pic" id="goods_pic"></image>
	                                    </view>
	                                    <view class="goods_info">
	                                        <view class="goods_name" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{goods.name}}</view>
	                                        <view v-if="__is_sales" style="font-size:24rpx;color:#666666;margin-top:14rpx;">销量 {{goods.virtual_sales}}</view>
	                                        <view style="font-size:16px;color:#c10000;margin-top:22rpx;width:63%;">￥{{goods.price}}</view>
	                                    </view>
	                                </view>
	                                <!-- 无规格开始 -->
	                                <block v-if="goods.use_attr == 0">
	                                    <view class="purchase">
	                                        <view class="standard" id="jia" @tap="jia" :data-id="goods.id">
	                                            <image :src="__wxapp_img.store.jia.url" class="standard" lazy-load="true"></image>
	                                        </view>
	
	                                        <block v-if="goods.num > 0">
	                                            <input @input="goodNumChange" type="number" class="standard good_num" id="num" :data-id="goods.id" maxlength="999" :value="goods.num"></input>
	                                            <view class="standard" id="jian" @tap="jian" :data-id="goods.id">
	                                                <image :src="__wxapp_img.store.jian.url" class="standard"></image>
	                                            </view>
	                                        </block>
	                                    </view>
	                                </block>
	                                <!-- 无规格结束 -->
	                                <!-- 规格商品开始 -->
	                                <block v-if="goods.use_attr == 1">
	                                    <view class="guigepurchase" id="guige" @tap="showDialogBtn" :data-index="index" :data-id="goods.id" :data-cid="goods_list.id">选规格
	                                        <view v-if="goods.num > 0" class="guigenum">{{goods.num}}</view>
	                                    </view>
	                                </block>
	                                <!-- 规格商品结束 -->
	                            </view>
	                        </block>
	                    </block>
	                </scroll-view>
	            </view>
	            <!-- 商品结束 -->
	        </view>
	    </view>
</template>

<script>
var shoppingCart = require("../../../components/shopping_cart/shopping_cart.js");
var specificationsModel = require("../../../components/specifications_model/specifications_model.js");
 
export default {
  data() {
    return {
      quick_list: [],
      goods_list: [],
      carGoods: [],
      // 购物车数据
      currentGood: {},
      //当个商品信息
      checked_attr: [],
      //已选择的规格
      checkedGood: [],
      //多规格当前选择的商品
      attr_group_list: [],
      temporaryGood: {
        price: 0.00,
        // 对应规格的价格
        num: 0,
        use_attr: 1
      },
      check_goods_price: 0.00,
      showModal: false,
      checked: false,
      cat_checked: false,
      color: '',
      total: {
        total_price: 0.00,
        total_num: 0
      },
      quick_hot_goods_lists: "",
      toView: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApp().page.onLoad(this, options);
  },
  onShow: function () {
    this.getApp().page.onShow(this);
    shoppingCart.init(this);
    specificationsModel.init(this, shoppingCart);
    this.loadData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.getApp().page.onHide(this);
    shoppingCart.saveItemData(this);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.getApp().page.onUnload(this);
    shoppingCart.saveItemData(this);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    this.getApp().page.onShareAppMessage(this);
    var self = this;
    var user_info = uni.getStorageSync(this.getApp().const.USER_INFO);
    var mch_id = uni.getStorageSync('_mchInfo').id;
    return {
      path: "/pages/quick-purchase/index/index?user_id=" + user_info.id + "&mch_id=" + mch_id,
      success: function (e) {
        share_count++;
        if (share_count == 1) self.shareSendCoupon(self);
      }
    };
  },
  methods: {
    loadData: function (options) {
      var self = this;
      var item = uni.getStorageSync(this.getApp().const.ITEM);
      var total = {
        total_num: 0,
        total_price: 0.00
      };
      self.setData({
        total: item.total !== undefined ? item.total : total,
        carGoods: item.carGoods !== undefined ? item.carGoods : []
      });
      uni.showLoading({
        title: '加载中'
      });
      self.getApp().request({
        url: self.getApp().api.quick.quick,
        success: function (res) {
          uni.hideLoading();

          if (res.code == 0) {
            var list = res.data.list;
            var quick_hot_goods_lists = [];
            var quick_list = [];

            for (var i in list) {
              // 判断该分类下是否有商品
              if (list[i].goods.length > 0) {
                quick_list.push(list[i]);

                for (var i2 in list[i].goods) {
                  //将商品已选择的数量 回存
                  var carGoods = self.carGoods;

                  for (var j in carGoods) {
                    if (item.carGoods[j].goods_id === parseInt(list[i].goods[i2].id)) {
                      list[i].goods[i2].num = list[i].goods[i2].num ? list[i].goods[i2].num : 0;
                      list[i].goods[i2].num += item.carGoods[j].num;
                    }
                  } // 取出热销商品


                  if (parseInt(list[i].goods[i2].hot_cakes)) {
                    quick_hot_goods_lists.push(list[i].goods[i2]);
                  }
                }
              }
            }

            self.setData({
              quick_hot_goods_lists: quick_hot_goods_lists,
              quick_list: quick_list
            });
          }
        }
      });
    },
    // 商品详情
    get_goods_info: function (e) {
      var self = this;
      var carGoods = self.carGoods;
      var total = self.total;
      var quick_hot_goods_lists = self.quick_hot_goods_lists;
      var quick_list = self.quick_list;
      var check_num = self.check_num;
      var item = {
        "carGoods": carGoods,
        "total": total,
        "quick_hot_goods_lists": quick_hot_goods_lists,
        "check_num": check_num,
        "quick_list": quick_list
      };
      uni.setStorageSync(getApp().const.ITEM, item);
      var data = e.currentTarget.dataset;
      var goods_id = data.id;
      uni.navigateTo({
        url: '/pages/goods/goods?id=' + goods_id + '&quick=1'
      });
    },
    // 商品定位
    selectMenu: function (event) {
      var data = event.currentTarget.dataset;
      var quick_list = this.quick_list;

      if (data.tag == 'hot_cakes') {
        var cat_checked = true;
        var quick_list_length = quick_list.length;

        for (var a = 0; a < quick_list_length; a++) {
          quick_list[a]['cat_checked'] = false;
        }
      } else {
        var index = data.index;
        var quick_list_length = quick_list.length;

        for (var a = 0; a < quick_list_length; a++) {
          quick_list[a]['cat_checked'] = false;

          if (quick_list[a]['id'] == quick_list[index]['id']) {
            quick_list[a]['cat_checked'] = true;
          }
        }

        cat_checked = false;
      }

      this.setData({
        toView: data.tag,
        quick_list: quick_list,
        cat_checked: cat_checked
      });
    },

    /**
     * 隐藏模态对话框
     */
    close_box: function (e) {
      this.setData({
        showModal: false
      });
    },
    hideModal: function () {
      this.setData({
        showModal: false
      });
    }
  }
};
</script>
<style>
/* @import "../../../components/shopping_cart/shopping_cart.css"; */
/* @import "../../../components/specifications_model/specifications_model.css"; */

.quick_purchase {
    height: 100vh;
    width: 100%;
    background: #fafafa;
}

.shopping-cart {
    padding-bottom: 115rpx;
}

.left_nav {
    height: 100%;
    width: 20%;
    float: left;
    padding-bottom: 130rpx;
    background: #f3f3f3;
}

.cat_name {
    height: 100rpx;
    width: 100%;
    font-size: 12px;
    color: #353535;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cat_name_active {
    background: #fafafa;
    color: #c10000;
}

.quick-hot {
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    background-size: 90%;
    float: left;
    margin-right: 6px;
}

.r_goods {
    height: 100%;
    width: 78%;
    float: right;
    padding-bottom: 130rpx;
}

.navname {
    font-size: 11px;
    color: #666;
    width: 100%;
    padding-top: 14px;
    padding-bottom: 14px;
}

.goodsall {
    height: 174rpx;
    width: 100%;
    border-bottom: 1rpx solid #e6e6e6;
    position: relative;
}

.goods {
    height: 152rpx;
    margin-top: 22rpx;
    width: 100%;
}

.goods_pic {
    width: 27%;
    height: 100%;
    float: left;
}

#goods_pic {
    width: 100%;
    height: 100%;
}

.goods_info {
    width: 70%;
    height: 100%;
    margin-right: 1%;
    float: right;
}

.goods_name {
    font-size: 28rpx;
    color: #353535;
    margin-top: 10rpx;
    font-weight: bold;
}

.guigenum {
    position: absolute;
    bottom: 60%;
    left: 77%;
    width: 35rpx;
    height: 25rpx;
    border-radius: 40%;
    border: 1rpx solid red;
    color: red;
    background: #fff;
    font-size: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.purchase {
    position: absolute;
    right: 1%;
    bottom: 10rpx;
    z-index: 100;
    height: 50rpx;
    /* width: 200rpx; */
}

.guigepurchase {
    position: absolute;
    right: 1%;
    bottom: 10rpx;
    z-index: 100;
    height: 50rpx;
    width: 22%;
    color: #ffe5e5;
    background: #c10000;
    font-size: 26rpx;
    border-radius: 26rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.guige {
    position: relative;
    width: 136rpx;
    height: 45rpx;
    bottom: 30%;
    left: 68%;
}
.show-btn {
    margin-top: 100rpx;
    color: #2c2;
}
.modal-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.5;
    overflow: hidden;
    z-index: 2222;
    color: #fff;
}
.guigeshu {
    border-radius: 100%;
    width: 55rpx;
    height: 55rpx;
    background-repeat: no-repeat;
    background-size: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn-confirm {
    width: 50%;
    color: #ec5300;
    text-align: center;
}
.navbar + .quick_purchase {
    padding-bottom: 115rpx;
}

.navbar+.quick_purchase #goods_car {
    bottom: 115rpx;
}
.navbar.device_iphone_x{
    padding-bottom: 65rpx;
}

.navbar.device_iphone_x ~ .quick_purchase {
    padding-bottom: 180rpx;
}

.navbar.device_iphone_x ~ .quick_purchase #goods_car {
    bottom: 180rpx;
}
</style>