<template>
<!--pages//private/privateService/privateService.wxml-->
<view class="page pr">
	<view class="p-24 flex align-center">
		<view class="black-block"></view>
		<view class="fs-30 color-2C2C2C ns-text-bold">店主自营业务介绍</view>
	</view>
	<view class="bg-white" style="padding: 25rpx 35rpx">
		<view class="fs-24 color-595959" style="line-height: 47rpx;"><rich-text :nodes="ywjs"></rich-text></view>
	</view>
	<view class="p-24 flex align-center">
		<view class="black-block"></view>
		<view class="fs-30 color-2C2C2C">
			<text class="ns-text-bold">店主自营业务介绍</text>（详细内容请阅读完整协议）</view>
	</view>
	<view class="bg-white" style="padding: 25rpx 35rpx">
		<view class="fs-24 color-595959" style="line-height: 47rpx;"><rich-text :nodes="fwxyzd"></rich-text></view>
	</view>

	<view class="footer justify-between">
		<view class="flex-x-center align-center mb-30">
			<view :class="'iconfont ' + (is_ready?'icon-xuanzhong color-252E3E':'icon-weixuanzhong') + ' fs-40'" @tap="ready"></view>
			<view class="fs-24 color-595959 ml-20 flex">
				<text>我已阅读</text>
				<navigator :url="'/pages/article-detail/article-detail?id=' + fwxy_id" class="color-F49E3A">《亲铺店主自营服务协议》</navigator>
				<text>和</text>
				<navigator :url="'/pages/article-detail/article-detail?id=' + ystk_id" class="color-F49E3A">《隐私条款》</navigator>
			</view>
		</view>
		<!-- <view class="btn-box" bindtap="sureBtn">
			确定开通
		</view> -->
		<button class="btn-box" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">确定开通</button>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      is_ready: false,
      fwxyzd: "",
      fwxy_id: "",
      ywjs: "",
      ystk_id: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticle();
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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    getArticle() {
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_article,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              fwxyzd: res.data.fwxyzd.content,
              fwxy_id: res.data.fwxy_id,
              ywjs: res.data.ywjs.content,
              ystk_id: res.data.ystk_id
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

    // 申请开私店
    openPrivate() {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.open_private,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },

        success(res) {
          if (res.code == 0) {
            wx.showModal({
              title: '开通成功',
              showCancel: false,
              success: res => {
                wx.redirectTo({
                  url: "/private/submitMaterial/submitMaterial"
                });
              }
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

    ready() {
      this.setData({
        is_ready: !this.is_ready
      });
    },

    sureBtn() {
      this.openPrivate();
    },

    //通过绑定手机号登录
    getPhoneNumber: function (e) {
      if (!this.is_ready) {
        wx.showToast({
          title: '请勾选已阅读相关协议',
          icon: 'none',
          duration: 2500
        });
        return;
      }

      var ivObj = e.detail.iv;
      var telObj = e.detail.encryptedData;
      var codeObj = "";
      var that = this; //执行Login

      wx.login({
        success: res => {
          //用code传给服务器调换session_key
          this.getApp().request({
            url: this.getApp().api.selfSupport.open_private,
            //接口请求地址
            method: 'POST',
            data: {
              // appid: " ", //小程序appid，登录微信后台查看
              // secret: " ", //小程序secret，登录微信后台可查看
              code: res.code,
              encrypted_data: telObj,
              iv: ivObj
            },
            //成功返回数据
            success: function (res) {
              if (res.code == 0) {
                wx.showModal({
                  title: '开通成功',
                  showCancel: false,
                  success: res => {
                    wx.redirectTo({
                      url: "/private/submitMaterial/submitMaterial"
                    });
                  }
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
      });
    }
  }
};
</script>
<style>
@import "./privateService.css";
</style>