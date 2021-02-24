<template>
<!--pages/newOpenShop/newOpenShop.wxml-->
<view class="page pr">
	<view class="header">
		<image style="width: 100%;height: 100%;" mode="aspectFill" :src="pickBackground"></image>
	</view>
	<view class="main pt-20">
		<view class="bg-white mb-20" style="padding-left: 32rpx;">
			<view class="border-bottom fs-28 flex align-center" style="padding: 30rpx;padding-left: 8rpx;">
				<view class="color-2C2C2C" style="width: 162rpx">邀请码</view>
				<input class="flex1" type="text" placeholder="请输入邀请码" :value="inviteCode" @blur="inviteInput" placeholder-class="color-D6D6D6"></input>
			</view>
			<view class="border-bottom fs-28 flex align-center" style="padding: 30rpx;padding-left: 8rpx;">
				<view class="color-2C2C2C" style="width: 162rpx">你的姓名</view>
				<input class="flex1" type="text" placeholder="请输入你的真实姓名" :value="nameValue" @blur="nameInput" placeholder-class="color-D6D6D6"></input>
			</view>
			<view class="border-bottom fs-28 flex align-center" style="padding: 30rpx;padding-left: 8rpx;">
				<view class="color-2C2C2C" style="width: 162rpx">手机号码</view>
				<input class="flex1" type="text" maxlength="11" placeholder="请输入联系人手机号码" :value="mobileValue" @blur="mobileInput" placeholder-class="color-D6D6D6"></input>
				<!-- <view class="mobile-btn fs-24 color-4A4A4A">使用微信手机号</view> -->
			</view>
			<view class="fs-28 flex align-center" style="padding: 30rpx;padding-left: 8rpx;">
				<view class="color-2C2C2C" style="width: 162rpx">验证码</view>
				<input class="flex1" type="text" placeholder="请输入验证码" :value="codeValue" @blur="codeInput" placeholder-class="color-D6D6D6"></input>
				<view class="yanzheng-btn fs-24 color-4A4A4A" @tap="getCodeFun">{{codeText}}</view>
			</view>
		</view>
		<view class="bg-white" style="padding-left: 32rpx;">
			<view class="border-bottom fs-28 flex align-center" style="padding: 30rpx;padding-left: 8rpx;">
				<view class="color-2C2C2C" style="width: 162rpx">社区名称</view>
				<input class="flex1" type="text" placeholder="请输入社区名称" :value="communityValue" @blur="communityInput" placeholder-class="color-D6D6D6"></input>
			</view>
			<view class="border-bottom fs-28 flex align-center" style="padding: 30rpx;padding-left: 8rpx;">
				<view class="color-2C2C2C" style="width: 162rpx">所在位置</view>
				<block v-if="!address">
					<view class="flex1" @tap="editPickUp">选择地区</view>
				</block>
				<block v-else>
					<view class="flex1" @tap="editPickUp">{{address}}</view>
				</block>
				<text class="iconfont icon-jinru color-8D8D8D fs-40"></text>
			</view>
			<view class="fs-28 flex align-center" style="padding: 30rpx;padding-left: 8rpx;">
				<view class="color-2C2C2C" style="width: 162rpx">详细地址</view>
				<input class="flex1" type="text" placeholder="请输入到门牌号的详细地址" :value="detailValue" @blur="detailInput" placeholder-class="color-D6D6D6"></input>
			</view>
		</view>
	</view>
	<view class="footer">
		<view class="flex-x-center align-center mb-30">
			<view :class="'iconfont ' + (is_ready?'icon-xuanzhong color-252E3E':'icon-weixuanzhong') + ' fs-40'" @tap="ready"></view>
			<view class="fs-24 color-595959 ml-20 flex">
				<text>我已阅读</text>
				<navigator :url="'/pages/article-detail/article-detail?id=' + fwxy_id" class="color-F49E3A">{{fwxy_title}}</navigator>
				<!-- <text>和</text>
				<navigator url="/pages/article-detail/article-detail?id={{ystk_id}}" class="color-F49E3A">《隐私条款》</navigator> -->
			</view>
		</view>
		<view class="footer-btn" @tap="submitMsg">提交申请</view>
	</view>
</view>
</template>

<script>
// pages/newOpenShop/newOpenShop.js
import util from "../../utils/util";
// //#ifdef MP-WEIXIN
// const chooseLocation = requirePlugin('chooseLocation');
// //#endif

export default {
  data() {
    return {
      is_ready: false,
      codeText: '获取验证码',
      getCode: 'getCode',
      pickBackground: "",
      fwxy_id: "",
      fwxy_title: "",
      inviteCode: "",
      nameValue: "",
      mobileValue: "",
      codeValue: "",
      communityValue: "",
      detailValue: "",
      address: "",
      latitude: "",
      longitude: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApp().page.onLoad(this, options);
    this.getBackground();
    var self = this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	//   //#ifdef MP-WEIXIN
	  
	  
 //    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
	
	// //#endif
 //    if (location) {
 //      this.setData({
 //        address: location.address || "",
 //        latitude: location.latitude || '',
 //        longitude: location.longitude ||''
 //      });
 //    } else {
 //      return;
 //    }
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
  methods: {
    getBackground() {
      this.getApp().request({
        url: this.getApp().api.group.get_pick_backgroud,
        success: res => {
          if (res.code == 0) {
            this.setData({
              pickBackground: res.data.banner,
              fwxy_id: res.data.fwxy,
              fwxy_title: res.data.fwxy_title
            });
          }
        }
      });
    },

    editPickUp() {
      uni.getLocation({
        type: 'gcj02',
        //返回可以用于wx.openLocation的经纬度
        success: res => {
          const latitude = res.latitude;
          const longitude = res.longitude; // const key = '3F5BZ-FWYWU-JUNV5-46DYM-BTCEH-ZDFGG'  // 亲铺
          // const key = 'MPHBZ-PIYCX-KQK4Q-72OJM-NWUL6-CUB2J'  // 洪荒大陆

          const key = 'UOEBZ-GLVKK-RMKJH-AXPVO-BG3TF-IVFFE'; // 亲供
          // const referer = '洪荒大陆'

          const referer = '亲供';
          const location = JSON.stringify({
            latitude: latitude,
            longitude: longitude
          });
          const category = '生活服务,娱乐休闲';
          uni.navigateTo({
            url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`
          });
        }
      });
    },

    inviteInput(e) {
      this.setData({
        inviteCode: e.detail.value
      });
    },

    nameInput(e) {
      this.setData({
        nameValue: e.detail.value
      });
    },

    mobileInput(e) {
      this.setData({
        mobileValue: e.detail.value
      });
    },

    codeInput(e) {
      this.setData({
        codeValue: e.detail.value
      });
    },

    communityInput(e) {
      this.setData({
        communityValue: e.detail.value
      });
    },

    detailInput(e) {
      this.setData({
        detailValue: e.detail.value
      });
    },

    ready() {
      this.setData({
        is_ready: !this.is_ready
      });
    },

    submitMsg() {
      if (this.inviteCode && this.nameValue && this.mobileValue && this.codeValue && this.communityValue && this.detailValue && this.address) {
        if (!this.is_ready) {
          uni.showToast({
            title: '请先勾选阅读相关协议',
            icon: 'none'
          });
          return false;
        }
      } else {
        uni.showToast({
          title: '你还有信息没填或格式错误',
          icon: 'none'
        });
        return false;
      }

      this.getApp().request({
        url: this.getApp().api.group.open_shop,
        method: 'POST',
        data: {
          invite_code: this.inviteCode,
          code: this.codeValue,
          tel: this.mobileValue,
          latitude: this.latitude,
          longitude: this.longitude,
          realname: this.nameValue,
          dispatching_name: this.communityValue,
          address: this.address + this.detailValue
        },
        success: res => {
          if (res.code == 0) {
            uni.showModal({
              title: '提交成功',
              showCancel: false,
              success: res => {
                if (res.confirm) {
                  uni.redirectTo({
                    url: '/pages/openshopStatus/openshopStatus?status=0'
                  });
                }
              }
            });
          } else {
            uni.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }
      });
    },

    // 获取验证码
    getCodeFun: function () {
      var that = this;

      if (that.mobileValue == '' || that.mobileValue.length != 11) {
        uni.showToast({
          title: '请输入正确的联系电话',
          icon: 'none',
          duration: 1500
        });
        return false;
      } // 发送短信


      this.getApp().request({
        url: this.getApp().api.default.sendCode,
        data: {
          phone: that.mobileValue,
          type: '3'
        },
        method: 'POST',
        success: function (res) {
          if (res.code == 0) {
            var count = 60;
            uni.showToast({
              title: '验证码发送成功',
              icon: 'none',
              duration: 1500
            });
            var timer = setInterval(function () {
              count--;

              if (count >= 1) {
                that.setData({
                  codeText: count + ' S',
                  getCode: ''
                });
              } else {
                that.setData({
                  codeText: '重新获取',
                  getCode: 'getCode'
                });
                clearInterval(timer);
              }
            }, 1000);
          } else {
            if (res.msg) {
              uni.showToast({
                title: res.msg,
                icon: 'none',
                duration: 1500
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
/* pages/newOpenShop/newOpenShop.wxss */
page {
	height: 100%;
	background:rgba(207,207,207,0.33);
}
.header {
	width: 100%;
	height: 330rpx;
	background-color: #ccc;
}
.page {
	min-height: 100%;
	padding-bottom: 226rpx;
}
.footer {
	position: absolute;
	padding-top: 32rpx;
	padding-bottom: 51rpx;
	bottom: 0rpx;
	left: 40rpx;
	right: 40rpx;
}
.footer-btn {
	width: 670rpx;
	height: 78rpx;
	line-height: 78rpx;
	background-color: #F49E3A;
	font-size: 30rpx;
	color: #FFFFFF;
	text-align: center;
}
.mobile-btn {
	width: 200rpx;
	height: 50rpx;
	line-height: 50rpx;
	text-align: center;
	border-radius: 31rpx;
	background-color: #D8D8D8;
}
.yanzheng-btn {
	width: 160rpx;
	height: 50rpx;
	line-height: 50rpx;
	background:rgba(255,255,255,1);
	border-radius:31rpx;
	text-align: center;
	border:2rpx solid rgba(151,151,151,1);
}

</style>