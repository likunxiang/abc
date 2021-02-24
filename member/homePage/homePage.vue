<template>
<!--pages/paySucceed/paySucceed.wxml-->
<view>
	<view class="nav pr">
		<!-- 头部内容 -->
		<view class="con flex justify-between align-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
			<view class="backBtn" @tap="goBack" style="position: fixed;">
				<text class="iconfont icon-zuojiantoubeifen"></text>
			</view>
			<view></view>
			<view></view>
		</view>
		<view class="user-msg-box" style="margin-top: 20rpx;">
			<view class="flex-x-center" style="font-size: 60rpx;font-weight: bold;">欢迎光临</view>
			<view class="flex-x-center" style="font-size: 30rpx;font-weight: bold; margin-top:16rpx;">您的专属导购【{{nickname}}】</view>
			<view class="qq-flex">

				<view class="tutor-pic-box" style="width:94rpx;height:94rpx;border-radius: 50%;align-items: center; margin:0; margin-right:23rpx;">
					<image style="width: 94rpx;height: 94rpx;border-radius: 50%;border: 4rpx solid #FFFFFF;  " mode="aspectFill" :src="avatar_url"></image>
				</view>
				<view class="wx-box flex justify-between align-center align-items: center;">
					<text class="fs-24 color-999999">微信号：<text class="ns-text-bold color-000000">{{wechat_name}}</text></text>
					<text class="fs-24" style="color: #FE4001;" @tap="copy" :data-text="wechat_name">复制</text>
				</view>

			</view>

		</view>
		<view class="text-center fs-24 color-fff" style="margin-top:20rpx;line-height:35rpx;">
			<view>欢迎来到我的小店，我是您的专属导购</view>
			<view>请添加我的微信，为您提供服务</view>
		</view>
	</view>
	
	<view class="welfare-box">
		<view class="welfare-list flex align-center">
			<view class="welfare-sort fs-36">选货</view>
			<view class="ml-24">
				<view class="fs-30 ns-text-bold" style="color: #FE4001;">自己找货太麻烦？</view>
				<view class="fs-24 mt-15" style="color: #FE4001;">帮你找货，想要啥呢，专属导购为你服务</view>
			</view>
		</view>
		<view class="welfare-list flex align-center">
			<view class="welfare-sort fs-36">比价</view>
			<view class="ml-24">
				<view class="fs-30 ns-text-bold" style="color: #FE4001;">买贵了真难受呀！</view>
				<view class="fs-24 mt-15" style="color: #FE4001;">帮你比价，货比三家，专属导购为你服务</view>
			</view>
		</view>
		<view class="welfare-list flex align-center" style="margin-bottom: 0rpx;">
			<view class="welfare-sort fs-36">盯单</view>
			<view class="ml-24">
				<view class="fs-30 ns-text-bold" style="color: #FE4001;">东西太多忘了验收？</view>
				<view class="fs-24 mt-15" style="color: #FE4001;">帮你跟进订单状态，专属导购为你服务</view>
			</view>
		</view>
	</view>
	<view class="fs-30 color-333333 text-center" style="height:20rpx;"></view>
</view>
</template>

<script>

export default {
  data() {
    return {
      statusBar: getApp().globalData.statusBar,
      customBar: getApp().globalData.customBar,
      custom: getApp().globalData.custom,
      code_img: '',
	  nickname:'',
	  wechat_qr_pic:'',
	  avatar_url:'',
	  wechat_name:'',
	
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSuperiorInfo();
    this.setData({
      code_img: this.getApp().core.getStorageSync('_img').default_ewm
    });
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
            success(res) {
              uni.showToast({
                title: '已复制成功，前往微信添加好友',
                icon: 'none'
              });
            }

          });
        }

      });
    },

    saveImg() {
      var self = this;

      if (!uni.saveImageToPhotosAlbum) {
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        uni.showModal({
          title: '提示',
          content: '当前版本过低，无法使用该功能，请升级到最新版本后重试。',
          showCancel: false
        });
        return;
      }

      self.downloadFile({
        url: self.wechat_qr_pic,
        success: function (e) {
          uni.showLoading({
            title: "正在保存图片",
            mask: false
          });
          uni.saveImageToPhotosAlbum({
            filePath: e.tempFilePath,
            success: function () {
              uni.showModal({
                title: '提示',
                content: '二维码保存成功',
                showCancel: false
              });
            },
            fail: function (e) {
              uni.showModal({
                title: '图片保存失败',
                content: e.errMsg,
                showCancel: false
              });
            },
            complete: function (e) {
              uni.hideLoading();
            }
          });
        },
        fail: function (e) {
          uni.showModal({
            title: '图片下载失败',
            content: e.errMsg + ";" + self.wechat_qr_pic,
            showCancel: false
          });
        },
        complete: function (e) {
          uni.hideLoading();
        }
      });
    }

  }
};
</script>
<style>
/* member/homePage/homePage.wxss *//* pages/paySucceed/paySucceed.wxss */
page {
	background: #fff;
}
.nav {
	background: linear-gradient(0deg, #FE4001, #EB0301);
	width: 100%;
	color: #fff;
	padding-bottom: 153rpx;
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
	width:200rpx;
	height:200rpx;
	background: #fff;
	border-radius:12rpx;
	margin: 54rpx auto 12rpx;
}
.wx-box {
	width:702rpx;
	height:80rpx;
	line-height: 80rpx;
	background:rgba(255,255,255,1);
	border-radius:40rpx;
	margin: 16rpx auto 16rpx;
	padding: 0 32rpx;
}
.welfare-box {
  position: relative;
	padding: 76rpx 24rpx 0;
	background: #fff;
	border-radius: 30rpx 30rpx 0rpx 0rpx;
	margin-top: -116rpx;
}
.welfare-list {
	background:#FFF0EB;
	border-radius:20rpx;
	margin-bottom: 87rpx;
}
.welfare-sort {
	width:132rpx;
	height:132rpx;
	line-height: 132rpx;
	text-align: center;
	font-weight: bold;
	color: #FFFFFF;
	background: #FE4001;
	box-shadow: 8rpx 0rpx 10rpx 0rpx rgba(254, 64, 1, 0.32);
	border-radius:20rpx;
}

/*保存二维码 */
.saveCode{
display: inline-block;
width: 187rpx;
height: 60rpx;
background: #FFC430;
border-radius: 30rpx;
line-height: 60rpx;
color: #343434;
font-size: 24rpx;
text-align: center;
margin: 16rpx auto 16 auto;

}
.qq-flex{
  display: flex;
  align-items: center;
  padding: 0 25rpx 0 25rpx;
  margin-top: 60rpx;
}
.rel{
  position: relative;
  
}
.no_img{
  position: absolute;
  top:0;
  left: 0;
  width: 200rpx;
  height: 200rpx;
  border-radius: 12rpx;
  opacity: 0.1;
  
}
.zindex{
  position: relative;
  z-index: 4;
  
}
</style>