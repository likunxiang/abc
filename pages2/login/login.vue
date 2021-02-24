<template>
	<view class="body">
		<common></common>
		<view class="after-navber">
		    <!-- 页面内容 -->
		    <view style="padding: 0 60rpx">
		        <view style="padding:80rpx 0 48rpx;border-bottom: 1rpx solid #e3e3e3;margin-bottom: 72rpx;text-align: center">
		            <image v-if="__platform == 'wx'" :src="__wxapp_img.system.wechatapp.url" style="width: 200rpx;height: 200rpx;"></image>
		            <image v-else :src="__wxapp_img.system.alipay.url" style="width: 200rpx;height: 200rpx;"></image>
		        </view>
		        <view style="font-size: 13pt;margin-bottom: 40rpx">申请获取以下权限</view>
		        <view style="color: #888;margin-bottom: 88rpx">获得你的公开信息（昵称、头像等）</view>
		        <button @tap="myLogin" class="login-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">授权登录</button>
		    </view>
		</view>
	</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApp().page.onLoad(this, options);
  },
  methods: {
    getUserInfo: function (res) {
      var page = this;

      if (res.detail.errMsg != 'getUserInfo:ok') {
        return;
      }

      wx.login({
        success: function (login_res) {
          var code = login_res.code;
          page.unionLogin({
            code: code,
            user_info: res.detail.rawData,
            encrypted_data: res.detail.encryptedData,
            iv: res.detail.iv,
            signature: res.detail.signature
          });
        },
        fail: function (res) {}
      });
    },
    //支付宝小程序登录
    myLogin: function () {
      var page = this;
      if (getApp().globalData.platform !== 'my') return;
      my.getAuthCode({
        scopes: 'auth_user',
        success: function (res) {
          page.unionLogin({
            code: res.authCode
          });
        }
      });
    },
    unionLogin: function (data) {
		let self = this;
     uni.showLoading({
        title: "正在登录",
        mask: true
      });
      self.getApp().request({
        url: self.getApp().api.passport.login,
        method: 'POST',
        data: data,
        success: function (res) {
          if (res.code == 0) {
            self.getApp().setUser(res.data);
           uni.setStorageSync(self.getApp().const.ACCESS_TOKEN, res.data.access_token);
            self.getApp().trigger.run(self.getApp().trigger.events.login);
            var login_pre_page =uni.getStorageSync(self.getApp().const.LOGIN_PRE_PAGE);

            if (!login_pre_page || !login_pre_page.route) {
             uni.redirectTo({
                url: '/pages/index/index'
              });
            } else {
             uni.redirectTo({
                url: '/' + login_pre_page.route + '?' + self.getApp().helper.objectToUrlParams(login_pre_page.options)
              });
            }
          } else {
            uni.showModal({
              title: '提示',
              content: res.msg,
              showCancel: false
            });
          }
        },
        complete: function () {
          uni.hideLoading();
        }
      });
    }
  }
};
</script>
<style>
page{
    background: #fff;
}

.login-btn{
    border: none;
    height: 88rpx;
    line-height: 88rpx;
    background: #04be01;
    color: #fff;
    font-size: 11pt;
    border-radius: 999rpx;
}

.login-btn::after{
    display: none;
}

.login-btn.button-hover {
    box-shadow: inset 0 5rpx 30rpx rgba(0,0,0,.15);
}
</style>