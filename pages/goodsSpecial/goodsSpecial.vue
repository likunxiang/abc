<template>
<!--pages/goodsSpecial/goodsSpecial.wxml-->

<view class="guang-nav-detail">
	<common></common>
	<!-- <view class="activity-head">
		<image style="width: 100%;height: 300rpx;position: absolute;background: #fff;z-index: -1;" mode="aspectFit" src="{{goodListMsg.background}}"></image>
		<view style="width: 50rpx;height: 50rpx;position: absolute;right: 82rpx;top: 25rpx;border-radius: 50%;background: rgba(0,0,0,0.4);text-align: center;line-height: 50rpx;color: #fff;"
		 class="iconfont icon-sousuo" bindtap="toSearch"></view>
		<button open-type="share" style="width: 50rpx;height: 50rpx;position: absolute;right: 20rpx;top: 25rpx;border-radius: 50%;background: rgba(0,0,0,0.4);text-align: center;line-height: 50rpx;color: #fff;padding: 0;"
		 class="iconfont icon-fenxiang" ></button>
	</view> -->
	<block v-if="goodsList.length>0">
		<view class="goods-list flex ns-wrap ns-justify-content-space-between pr">
			<navigator v-for="(item, index) in goodsList" :key="index" :url="'/pages/goods/goods?id=' + item.id" class="bg-white goods mb-20 " style="padding-right: 20rpx;">
				<view style="width: 336rpx;height: 336rpx;position: relative;">
					<image style="width: 336rpx;height: 336rpx;background: #ccc;" mode="aspectFill" :src="item.first_cover_pic"></image>
					<view v-if="item.goods_num==0" class="nonum-tip">
						已抢光
					</view>
				</view>
				
				<view class="goods-msg bg-white">
					<view class="goods-msg-title">{{item.name}}</view>
					<view class="fs-28 color-C10000">
						<text class="mr-20">¥ {{filters.toFix1(item.price)}}</text>
						<text class="color-8D8D8D ns-text-through">¥ {{filters.toFix1(item.original_price)}}</text>
					</view>
				</view>
			</navigator>
		</view>
	</block>
	<block v-if="goodsList.length==0">
		<view class="flex-x-center flex-y-center goods-list">暂无相关商品</view>
	</block>
	<!-- <view class="cart flex ns-align-items-flex-center ns-justify-content-space-between color-fff" bindtap="toCart">
		<view class="pr">
			<text class="iconfont icon-show_goumai mr-10 fs-40"></text>
			
			<view class="pa" wx:if="{{cartNum>0}}" style="width: 30rpx;height: 30rpx;line-height:30rpx;overflow: hidden;text-align: center;top: -10rpx;right: -14rpx;background: #c10000;border-radius: 50%;font-size: 10px;">{{cartNum}}</view>
		</view>
		<view class="fs-24 ">购物车</view>
		
	</view> -->
</view>
</template>



<script>

export default {
  data() {
    return {
      id: 0,
      page: 1,
      gid: "",
      title: "",
      goodsList: "",
      count: "",
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
      gid: options.gid
    });
    this.getGoods();
  },
  // toCart: function() {
  // 	wx.navigateTo({
  // 		url: '/pages/cart/cart'
  // 	})
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

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
    this.setData({
      page: 1
    });
    this.getGoods();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this;
    var page = self.page;

    if (self.goodsList.length < self.count) {
      ++page;
      self.setData({
        page: page
      });
    } else {
      return;
    }

    this.getApp().request({
      url: this.getApp().api.default.goods_special,
      data: {
        gid: self.gid,
        page: page
      },
      success: function (res) {
        if (res.code == 0) {
          var newGoodList = res.data.list;
          var nowGoodList = self.goodsList.concat(newGoodList);
          self.setData({
            goodsList: nowGoodList
          });
        }
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var self = this;
    var title = self.title;
    return this.getApp().page.onShareQp(this, 'gid=' + self.gid, title);
  },
  methods: {
    toSearch: function () {
      uni.navigateTo({
        url: '/pages/newSearch/newSearch'
      });
    },
    // getCartNum: function() {
    // 	var self = this
    // 	getApp().request({
    // 		url: getApp().api.default.cartCount,
    // 		success: function(res) {
    // 			if (res.code == 0) {
    // 				self.setData({
    // 					cartNum: res.data.count
    // 				})
    // 			}
    // 		}
    // 	})
    // },
    getGoods: function () {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.default.goods_special,
        data: {
          gid: self.gid,
          page: 1
        },
        success: function (res) {
          if (res.code == 0) {
            uni.setNavigationBarTitle({
              title: res.data.group_name
            });
            self.setData({
              title: res.data.group_name,
              goodsList: res.data.list,
              count: res.data.row_count
            });
          }
        },
        complete: function () {
          uni.stopPullDownRefresh();
        }
      });
    }
  }
};
</script>
<style>
/* pages/goodsSpecial/goodsSpecial.wxss */
.nav-list {
	position: fixed;
	left: 0;
	top: 0;
	padding: 20rpx 0 20rpx 33rpx;
	background: #fff;
	width: 100%;
	overflow: hidden;
	z-index: 999;
}
::-webkit-scrollbar{
width: 0;
height: 0;
color: transparent;
}
.activity-head {
	width: 100%;
	height: 300rpx;
	position: relative;
}
.activity-title {
	width:750rpx;
	height:92rpx;
	background:rgba(0,0,0,0.37);
	position: absolute;
	bottom: 0;
	padding: 5rpx 28rpx;
	
}

.nav-list-box {
	width: 152rpx;
	padding: 4rpx 0;
	text-align: center;
	
	font-size: 28rpx;
}
.nav-list-box-active {
	background: #252E3E;
	border-radius: 24rpx;
	color: #fff;
}
.flex-grow-0 {
	flex-grow: 0;
}
.goods-list {
	padding: 24rpx 25rpx;
}
.text-more-1 {
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.cart {
	position: fixed;
	left: 25rpx;
	bottom: 98rpx;
	width: 191rpx;
	height: 66rpx;
	padding: 12rpx 25rpx;
	background:rgba(46,46,46,0.7);
	border-radius: 6rpx;
}
.goods {
	width: 336rpx;
}
.goods-msg {
	padding: 18rpx 10rpx;
	margin-top: -4rpx;
}
.goods-msg-title {
	height: 33rpx;
	font-size: 24rpx;
	color: #595959;
	margin-bottom: 8rpx;
	overflow: hidden;text-overflow:ellipsis;white-space:nowrap;
}
</style>