<template>
<!--pages/paySucceed/paySucceed.wxml-->
<view>
	<view class="nav pr" style="height:738rpx;">
		<!-- 头部内容 -->
		<view class="con flex justify-between align-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
			<view class="backBtn" @tap="goBack">
				<text class="iconfont icon-zuojiantoubeifen"></text>
			</view>
			<view></view>
			<view></view>
		</view>
		<view class="user-msg-box" style="margin-top: 40rpx;">
			<view class="flex-x-center" style="font-size: 60rpx;font-weight: bold;">欢迎光临</view>
			<view class="tutor-pic-box">
				<image style="width: 126rpx;height: 126rpx;border-radius: 50%;border:6rpx solid #fff;" mode="aspectFill" :src="avatar_url"></image>
			</view>
			<view class="fs-30 color-000000 ns-text-bold text-center">您的专属导购【{{nickname}}】</view>
			<view class="wx-box flex justify-between align-center">
				<text class="fs-24 color-000000">微信号：<text class="ns-text-bold">{{wechat_name}}</text></text>
				<text class="fs-24 color-999999" @tap="copy" :data-text="wechat_name">复制</text>
			</view>
			<view class="text-center fs-24 color-666666">
				<view>感谢来到我的店铺，并成为永久会员</view>
				<view>请添加我的微信，让我为你提供专属服务吧～</view>
			</view>
		</view>
	</view>
	<view class="welfare-box">
		<view class="welfare-list flex align-center">
			<view class="welfare-sort fs-36">选货</view>
			<view class="ml-24">
				<view class="fs-30 ns-text-bold" style="color: #FF8400;">自己找货太麻烦？</view>
				<view class="fs-24 mt-15" style="color: #FF8400;">帮你找货，想要啥呢，专属导购为你服务</view>
			</view>
		</view>
		<view class="welfare-list flex align-center">
			<view class="welfare-sort fs-36">比价</view>
			<view class="ml-24">
				<view class="fs-30 ns-text-bold" style="color: #FF8400;">买贵了真难受呀！</view>
				<view class="fs-24 mt-15" style="color: #FF8400;">帮你比价，货比三家，专属导购为你服务</view>
			</view>
		</view>
		<view class="welfare-list flex align-center">
			<view class="welfare-sort fs-36">推荐</view>
			<view class="ml-24">
				<view class="fs-30 ns-text-bold" style="color: #FF8400;">不会挑太麻烦呢…</view>
				<view class="fs-24 mt-15" style="color: #FF8400;">实用推荐，答疑解惑，专属导购为你服务</view>
			</view>
		</view>
	</view>
	<view class="fs-30 color-333333 text-center" style="margin-top: 100rpx;">更多专属福利，添加微信帮你解锁</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      statusBar: getApp().globalData.statusBar,
      customBar: getApp().globalData.customBar,
      custom: getApp().globalData.custom,
	  avatar_url:'',
	  nickname:'',
	  wechat_name:''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSuperiorInfo();
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
    goBack() {
      uni.navigateBack({
        delta: 1,
        fail: res => {
          uni.redirectTo({
            url: '/pages/index/index'
          });
        }
      });
    },

    getSuperiorInfo() {
      this.getApp().request({
        url: this.getApp().api.default.get_superior_info,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },
        success: res => {
          if (res.code == 0) {
            this.setData(res.data);
          } else {
            uni.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }
      });
    },

    copy: function (e) {
      var text = e.currentTarget.dataset.text;
      uni.setClipboardData({
        data: text,

        success(res) {
          uni.getClipboardData({
            success(res) {}

          });
        }

      });
    }
  }
};
</script>
<style>
/* pages/paySucceed/paySucceed.wxss */
page {
	background: #fff;
}
.nav {
	height: 738rpx;
	background: linear-gradient(180deg, rgba(255, 195, 48, 1), rgba(255, 255, 255, 0));
	width: 100%;
	color: #fff;
}

.con {
	width: 100%;
	top: 0;
	left: 0;
	display: flex;
	padding: 0 24rpx;
}


.backBtn {
	font-size: 36rpx;
	display: flex;
	align-items: center;
	height: 100%;
	justify-content: center;
	max-width: 100%;
	color: #FFFFFF;
	opacity: 0.5;
}
.tutor-box {
	position: absolute;
	bottom: 0rpx;
	left: 0rpx;
	right: 0rpx;
	height: 320rpx;
	background: #fff;
	border-radius: 30rpx 30rpx 0 0;
	padding: 28rpx 24rpx;
	padding-top: 70rpx;
}
.tutor-pic-box {
	width:126rpx;
	height:126rpx;
	background: #fff;
	border-radius:50%;
	margin: 54rpx auto 12rpx;
}
.wx-box {
	width:702rpx;
	height:80rpx;
	line-height: 80rpx;
	background:rgba(244,244,244,1);
	border-radius:40rpx;
	margin: 32rpx auto 16rpx;
	padding: 0 32rpx;
}
.welfare-box {
	padding: 0rpx 24rpx;
	
}
.welfare-list {
	background:rgba(255,195,48,.2);
	border-radius:20rpx;
	margin-bottom: 32rpx;
}
.welfare-sort {
	width:132rpx;
	height:132rpx;
	line-height: 132rpx;
	text-align: center;
	font-weight: bold;
	color: #FFFFFF;
	background:rgba(255,132,0,1);
	box-shadow:5rpx 0rpx 10rpx 0rpx rgba(215,131,41,0.32);
	border-radius:20rpx;
}


</style>