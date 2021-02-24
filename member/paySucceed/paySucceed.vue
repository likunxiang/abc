<template>
<!--pages/paySucceed/paySucceed.wxml-->
<!--pages/paySucceed/paySucceed.wxml-->
<view class="pr">
	<image style="width: 750rpx;height: 1334rpx;position: absolute;top: 0;left: 0;z-index: 0;" mode="aspectFill" :src="bg_img"></image>
	<view class="nav pr">
		<!-- 头部内容 -->
		<view class="con flex justify-between align-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
			<view class="backBtn" @tap="goBack" style="position: fixed;">
				<text class="iconfont icon-zuojiantoubeifen"></text>
			</view>
			<view></view>
			<view></view>
		</view>
		<view class="user-msg-box" style="margin-top: 40rpx;">
			<view class="user-msg-box flex-x-center mt-30">
				<view class="iconfont icon-xuanzhong color-fff" style="font-size: 60rpx;"></view>
				<view style="font-size: 50rpx;font-weight: bold;margin-left: 16rpx;">支付成功</view>
			</view>
			<view class="flex-x-center" style="font-size: 30rpx;font-weight: bold; margin-top:47rpx;">您的专属导购【{{nickname}}】</view>
			<view class="tutor-pic-box">
				<image v-if="wechat_qr_pic" style="width: 200rpx;height: 200rpx;border-radius: 12rpx;" mode="aspectFill" :src="wechat_qr_pic"></image>
				<view v-else class="fs-30 rel" style="color:#333; line-height:200rpx; text-align:center;">
					<view class="zindex">【暂无二维码】</view>
					<image class="no_img" :src="code_img"></image>
				</view>
			</view>
			<!-- <view class="fs-30 color-000000 ns-text-bold text-center">您的专属导购【{{nickname}}】</view> -->
			<view v-if="wechat_qr_pic" style="width:100%; text-align:center; margin-bottom:30rpx;" @tap="saveImg">
				<view class="saveCode">保存二维码</view>
			</view>
			<view v-else style="width:100%; text-align:center; margin-bottom:30rpx; ">
				<view class="saveCode" style="color:#999; background-color:#f4f4f4;">保存二维码</view>
			</view>
			<view class="qq-flex">

				<view class="tutor-pic-box" style="width:94rpx;height:94rpx;border-radius: 50%;align-items: center; margin:0; margin-right:23rpx;">
					<image style="width: 94rpx;height: 94rpx;border-radius: 50%;border: 4rpx solid #FFFFFF;  " mode="aspectFill" :src="avatar_url"></image>
				</view>
				<view class="wx-box flex justify-between align-center align-items: center;">
					<text class="fs-24 color-000000" style="color:##9A9A9A;">微信号：<text class="ns-text-bold">{{wechat_name}}</text></text>
					<text class="fs-24 color-999999" @tap="copy" :data-text="wechat_name">复制</text>
				</view>

			</view>

		</view>

	</view>
	<view class="text-center fs-24 color-fff" style="padding:0 0 30rpx 0;line-height:35rpx;width: 521rpx;margin: auto;margin-top:20rpx;">
		<view>“请添加您的成长导师微信，以便进入小亲训练营，为您在店铺经营的路上提供帮助，协助您成长，往更高的方向发展”</view>
	</view>
	<!-- <view class="welfare-box">
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
			<view class="welfare-sort fs-36">盯单</view>
			<view class="ml-24">
				<view class="fs-30 ns-text-bold" style="color: #FF8400;">东西太多忘了验收？</view>
				<view class="fs-24 mt-15" style="color: #FF8400;">帮你跟进订单状态，专属导购为你服务</view>
			</view>
		</view>
	</view> -->
	<!-- <view class="fs-30 color-333333 text-center" style="height:20rpx;"></view> -->
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
      bg_img: "",
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
      code_img: uni.getStorageSync('_img').default_ewm,
      bg_img: uni.getStorageSync('_img').tuozhan_info
    });
	//console.log(uni.getStorageSync('_img').tuozhan_info)
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

      if (!this.getApp().core.saveImageToPhotosAlbum) {
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        this.getApp().core.showModal({
          title: '提示',
          content: '当前版本过低，无法使用该功能，请升级到最新版本后重试。',
          showCancel: false
        });
        return;
      }

      this.getApp().core.downloadFile({
        url: self.wechat_qr_pic,
        success: function (e) {
          this.getApp().core.showLoading({
            title: "正在保存图片",
            mask: false
          });
          this.getApp().core.saveImageToPhotosAlbum({
            filePath: e.tempFilePath,
            success: function () {
              this.getApp().core.showModal({
                title: '提示',
                content: '二维码保存成功',
                showCancel: false
              });
            },
            fail: function (e) {
              this.getApp().core.showModal({
                title: '图片保存失败',
                content: e.errMsg,
                showCancel: false
              });
            },
            complete: function (e) {
              this.getApp().core.hideLoading();
            }
          });
        },
        fail: function (e) {
          this.getApp().core.showModal({
            title: '图片下载失败',
            content: e.errMsg + ";" + self.wechat_qr_pic,
            showCancel: false
          });
        },
        complete: function (e) {
          this.getApp().core.hideLoading();
        }
      });
    }

  }
};
</script>
<style>
/* member/homePage/homePage.wxss *//* pages/paySucceed/paySucceed.wxss */
page {
	background: #F4F4F4;
}
.nav {
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
	width:200rpx;
	height:200rpx;
	background: #fff;
	border-radius:12rpx;
	margin: 25rpx auto 12rpx;
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
  padding: 0 25rpx 0 25rpx
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