<template>
<!--pages/openshopArticle/openshopArticle.wxml-->
<view class="open-shop-article">
    <view class>
      <image :src="listData.content" mode="widthFix" style="width:100%"></image>
    </view>
    <view class="open-btn" v-if="detailShow" @tap="toOpenShop">申请开店</view>
 </view>
</template>

<script>

// pages/openshopArticle/openshopArticle.js
var utils = require("../../utils/helper.js");

export default {
  data() {
    return {
      inputfocus: false,
      options: {},
      id: '',
      navNum: 0,
      detailShow: false,
      listData: {},
      inputVal: '',
      commentId: '',
      //被回复人id
      commentPid: '',
      //被回复人pid
      commentName: '' //被回复人昵称

    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    this.getList();
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {}
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {
  // }
  ,
  methods: {
    // 获取新闻详情
    getList: function () {
      let self = this;
      this.getApp().request({
        url: this.getApp().api.default.article_detail,
        data: {
          id: 'open_shop'
        },
        success: function (res) {
          if (res.code == 0) {
            var resData = res.data;
            let startTime = new Date(utils.timestampToTime(resData.addtime));
            resData.addtime = utils.dateFormat("YYYY/mm/dd HH:MM", startTime);
            /**
             * WxParse.wxParse(bindName , type, data, target,imagePadding)
             * 1.bindName绑定的数据名(必填)
             * 2.type可以为html或者md(必填)
             * 3.data为传入的具体数据(必填)
             * 4.target为Page对象,一般为this(必填)
             * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
             */
            // var article = resData.content;
            // WxParse.wxParse('article', 'html', article, self);

            uni.setNavigationBarTitle({
              title: resData.title
            });
            self.setData({
              listData: resData,
              detailShow: true
            });
          } else {
            if (res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none',
                duration: 3000
              });
            }
          }
        }
      });
    },
    toOpenShop: function () {
      uni.navigateTo({
        url: '/member/openshop/openshop'
      });
    }
  }
};
</script>
<style>
/* pages/openshopArticle/openshopArticle.wxss */

page {
	background: #fff;
}
.open-shop-article {
	padding: 20rpx 35rpx;
}
.article {
	
	height: 991rpx;
	background: #D8D8D8;
}
.open-btn {
	padding: 18rpx 0;
	width: 670rpx;
	text-align: center;
	font-size: 30rpx;
	background: #252E3E;
  margin: 10rpx auto 0;
	color: #fff;
 	/* bottom: 81rpx; */
}
</style>