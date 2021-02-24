<template>
<!--pages/newSearch/newSearch.wxml-->

<view class="page flex ns-column">
	<view class="header bg-white">
		<view class="search-box flex">
			<view class="search-input-box flex-y-center ns-justify-content-space-between">
				<view class="flex-y-center" style="width: 100%;margin-right: 20rpx;">
					<view class="iconfont icon-sousuo ns-text-bold color-252E3E fs-30" style="margin-right: 26rpx;"></view>
					<input type="text" class="fs-26 color-595959" style="width: 100%;" placeholder="请输入搜索内容" placeholder-style="color: #AAAAAA;" :value="seachVal" @confirm="sendSeach" @input="seachInput" @blur="seachBlur"></input>
				</view>
				<view class="iconfont icon-guanbi1" style="color: #AAAAAA;" @tap="clearVal"></view>
			</view>
			<view class="fs-26 color-252E3E" style="padding: 10rpx 29rpx;padding-right: 0;" @tap="sendSeach">搜索</view>
		</view>
	</view>
	<block v-if="processSeach">
		<view class="like-box" :style="'height: ' + y + 'px;'">
			<view class="seachBlur" @tap.stop="seachBlur">
				<view @tap.stop="nulldo">
					<view class="seachNav" :data-words="item.words" @tap="history" v-for="(item, index) in likeList" :key="index">{{item.words}}</view>
				</view>
			</view>
		</view>
	</block>
	<block v-if="showSeach">
		<view class="flex1" style="background:#fff;padding-top: 20rpx;height: 100%;">
			<!-- 历史搜索 -->
			<view class="history" v-if="showHistor">
				<view class="historyTitle ns-flex ns-justify-content-space-between ns-align-items-flex-center">
					<view>历史搜索</view>
					<text class="iconfont icon-shanchu" @tap="removeHistory"></text>
				</view>
				<view class="clear tabs">
					<view :data-words="item" class="pull-left" @tap="history" v-for="(item, index) in historyList" :key="index" v-if="index<10">{{item}}</view>
				</view>
			</view>
			<!-- 热门搜索 -->
			<view class="hotSeach" v-if="showHotsearch">
				<text class="historyTitle">热门搜索</text>
				<view class="clear hotList">
					<view :data-words="item.words" class="pull-left clear" @tap="history" v-for="(item, index) in hotSearchList" :key="index">
						<text class="pull-left iconfont icon-show_renqiredu" style="margin-right: 5rpx;font-size: 14px; color: #C10000;"></text>
						<view class="pull-left">{{item.words}}</view>
					</view>
				</view>
			</view>
		</view>
	</block>
	<block v-else>
		<view class="cu-list menu-avatar flex1">
			<scroll-view scroll-y="true" style="height: 100%;">
				<block v-if="goodsList.length<=0">
					<view style="height: 80%;" class="flex-x-center flex-y-center">
						<view>
							<view class="iconfont icon-kong ns-text-center" style="font-size: 150rpx;"></view>
							<view style="font-size: 24rpx;color: #B0B0B0;text-align: center;margin-top: 31rpx;line-height: 53rpx;">
								<view>暂无相关订单～</view>
								<view>去逛逛吧</view>
								<navigator url="/private/home/home?type=1" style="text-decoration: underline;">返回首页</navigator>
							</view>
						</view>
					</view>
				</block>
				<block v-else>
					<view style="padding-bottom: 130rpx;padding-top: 20rpx;">
						<navigator :url="'/private/privateGoods/privateGoods?id=' + item.id" hover-class="none" class="goods flex ns-align-items-flex-center mb-20" v-for="(item, index) in goodsList" :key="index">
							<view style="width: 160rpx;height: 160rpx;margin-right: 18rpx;">
								<image style="width: 160rpx;height: 160rpx;" mode="aspectFill" :src="item.first_cover_pic"></image>
							</view>
							<view class="flex1">
								<view class="fs-30">{{item.name}}</view>
								<view class="color-489A19 flex fs-24 mt-5">
									<text v-for="(tag, index) in item.tags" :key="index" class="mr-10">{{tag}}</text>
								</view>
								<view class="flex ns-align-items-flex-center justify-between">
									<view class="flex ns-align-items-flex-center">
										<view class="color-FF9100 fs-28 ns-text-bold mr-10">¥ {{item.min_price}}</view>
										<!-- <view class="color-9B9B9B fs-20">¥ 520</view> -->
									</view>
									<view class="flex align-center">
										<block v-if="item.cart_num>0">
											<view class="iconfont icon-jianshao1 fs-40 color-2C2C2C" @tap.stop="reduceNum" :data-index="index" :data-id="item.id" :data-price="item.min_price"></view>
											<view style="width: 50rpx;text-align: center;">{{item.cart_num}}</view>
										</block>
										<block v-if="filters.parseInt(item.cart_num)>=item.num">
											<view class="iconfont icon-add-fill fs-50" style="color: #C8C7C7;" @tap.stop></view>
										</block>
										<block v-else>
											<view class="iconfont icon-add-fill fs-50 color-FF9100" @tap.stop="addNum" :data-index="index" :data-id="item.id" :data-price="item.min_price"></view>
										</block>
									</view>
								</view>
							</view>
						</navigator>
					</view>
				</block>
			</scroll-view>
		</view>
		<view class="footer">
			<view class="footer-content flex ns-align-items-flex-center color-fff fs-28">
				<view class="flex1 flex-x-center ns-align-items-flex-center" style="border-right: 2rpx solid #FFFFFF;" @tap="copyText">
					<text class="iconfont icon-weixin fs-40 mr-10"></text>
					<text>联系店主</text>
				</view>
				<navigator hover-class="none" url="/private/privateCart/privateCart" class="flex1 flex-x-center ns-align-items-flex-center pr">
					<view class="iconfont icon-cailanzi- fs-36 mr-10"></view>
					<view>我的篮子</view>
					<view class="num-box" v-if="cartNum>0">{{cartNum}}</view>
				</navigator>
				<navigator hover-class="none" url="/private/privateOrder/privateOrder" class="flex1 flex-x-center ns-align-items-flex-center">
					<view class="iconfont icon-icon- fs-40 mr-10"></view>
					<view>自营订单</view>
				</navigator>
			</view>
		</view>
	</block>
</view>
</template>


<script>

export default {
  data() {
    return {
      y: this.getApp().core.getSystemInfoSync().windowHeight,
      tabIns: 0,
      showSeach: true,
      seachHeight: '',
      page: 1,
      seachVal: '',
      showHistor: false,
      historyList: "",
      processSeach: false,
      showRult: false,
      rultContent: false,
      showHotsearch: false,
      hotSearchList: [],
      list: [],
      goodsList: "",
      is_request: false,
      cartNum: "",
      nowStatus: "",
	  filters: require('../../utils/filters.js'),
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
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
    var self = this;
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    loadData: function () {
      var self = this;

      if (this.getApp().core.getStorageSync("History_seach_private")) {
        self.setData({
          showHistor: true,
          historyList: JSON.parse(this.getApp().core.getStorageSync("History_seach_private"))
        });
      }
    },
    // 清空输入框
    clearVal: function () {
      var self = this;

      if (self.timeout) {
        clearTimeout(self.timeout);
      }

      this.setData({
        seachVal: '',
        showSeach: true,
        processSeach: false,
        showRult: false,
        rultContent: false,
        showHistor: false,
        //历史记录
        historyList: [],
        showHotsearch: false,
        //热搜
        hotSearchList: [],
        page: 1,
        list: []
      }, () => {
        self.loadData();
        this.getApp().core.hideLoading();
      });
    },
    // 点击历史搜索
    history: function (e) {
      var val = e.currentTarget.dataset.words,
          self = this;
      this.setData({
        seachVal: val
      }, () => {
        self.sendSeach();
      });
    },
    // 输入框改变
    seachInput: function (e) {
      var val = e.detail.value,
          self = this;
      self.setData({
        seachVal: val
      }); // 防抖函数

      if (self.timeout) {
        clearTimeout(self.timeout);
      }
    },
    // 清除历史记录
    removeHistory: function () {
      wx.removeStorageSync('History_seach_private');
      this.setData({
        showHistor: false,
        historyList: []
      });
    },
    // 输入框失焦
    seachBlur: function (e) {
      var self = this;
      setTimeout(() => {
        self.setData({
          processSeach: false
        });
      }, 200);
    },
    // 执行搜索
    sendSeach: function (data) {
      var self = this;
      var val = this.seachVal;

      if (val.length > 0) {
        if (this.getApp().core.getStorageSync("History_seach_private")) {
          var searchList = JSON.parse(this.getApp().core.getStorageSync("History_seach_private"));

          if (searchList.indexOf(val) == -1) {
            searchList.unshift(val);
            this.getApp().core.setStorageSync("History_seach_private", JSON.stringify(searchList));
          }
        } else {
          var searchList = [val];
          this.getApp().core.setStorageSync("History_seach_private", JSON.stringify(searchList));
        }
      } else {
        wx.showModal({
          title: '请输入关键字',
          showCancel: false,
          success: res => {
            self.clearVal();
          }
        });
        return false;
      }

      this.getApp().core.showLoading({
        title: '加载中'
      }); // 商品搜索

      this.getApp().request({
        url: this.getApp().api.selfSupport.get_goods_list_user,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          name: this.seachVal,
          cart_sum_show: true
        },
        success: function (res) {
          if (res.code == 0) {
            self.setData({
              goodsList: res.data.list,
              showSeach: false,
              processSeach: false,
              showRult: true,
              rultContent: true,
              is_request: true,
              page: 1
            });
            self.getCartNum();
            self.getAdAndSetting();
          } else {
            if (res.msg) {
              wx.showToast({
                title: res.msg,
                icon: 'none',
                duration: 2000
              });
            }
          }
        },
        complete: function () {
          uni.hideLoading();
        }
      });
    },

    // 加
    addNum(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var price = e.currentTarget.dataset.price;
      var goodsNum = self.goodsList[index].cart_num;
      goodsNum = +goodsNum + 1;
      self.setData({
        ['goodsList[' + index + '].cart_num']: goodsNum
      });
      self.editCartNum(id, goodsNum, price);
    },

    reduceNum(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var price = e.currentTarget.dataset.price;
      var goodsNum = self.goodsList[index].cart_num;
      goodsNum = +goodsNum - 1;
      self.setData({
        ['goodsList[' + index + '].cart_num']: goodsNum
      });
      self.editCartNum(id, goodsNum, price);
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
          if (res.code == 0) {
            self.getCartNum();
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }

      });
    },

    getCartNum() {
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_cart_num,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              cartNum: res.data
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

    copyText() {
      var text = this.wx_mobile;
      wx.setClipboardData({
        data: text,

        success(res) {
          wx.showToast({
            title: '手机已复制，快去联系吧',
            duration: 3000,
            icon: 'none'
          });
          wx.getClipboardData({
            success(res) {}

          });
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
            self.setData({
              nowStatus: res.data.nowStatus
            });
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
};
</script>
<style>
@import "./privateSearch.css";
</style>