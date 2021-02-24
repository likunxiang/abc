<template>
<!--pages/openshopStatus/openshopStatus.wxml-->

	<view class="all">
		<block v-if="status==2">
			<view style="height: 100%;">
				<view class="flex-x-center ns-align-items-flex-center" style="margin-top: 180rpx;">
					<text class="iconfont icon-guanbi1 " style="font-size: 50rpx;"></text>
					<view class="fs-28 color-2C2C2C ml-24">很抱歉，您的申请失败</view>
				</view>
				<view class="error-btn" @tap="openShop">重新申请</view>
				<view class="error-btn-yellow" @tap="toIndex">返回首页</view>
			</view>
		</block>
		
		<block>
			<block v-if="status==0">
				<view class="hu">
					<view class="icon-box text-center" style="padding-top: 20rpx;">
						<!-- <image style="width: 238rpx;height: 238rpx;" mode="aspectFill" src="image/icon-succeed.png"></image> -->
						<view class="iconfont icon-gou color-fff ns-text-bold" style="font-size: 100rpx;"></view>
						<view class="fs-28 color-fff">提交成功</view>
					</view>
				</view>
				<view class="text-box">
					<view class="flex flex-x-center fs-28 color-2C2C2C ns-text-bold">提交成功，请等待管理员审核</view>
					<view class="flex flex-x-center fs-28 color-8D8D8D mt-24">（预计1～3个工作日内审核完毕）</view>
				</view>
			</block>
			<block v-else>
				<view class="hu">
					<view class="icon-box text-center" style="padding-top: 20rpx;">
						<view class="iconfont icon-gantanhao color-fff" style="font-size: 100rpx;"></view>
						<view class="fs-28 color-fff">审核中…</view>
					</view>
				</view>
				<view class="text-box">
					<view class="flex flex-x-center fs-28 color-2C2C2C ns-text-bold">审核中，请耐心等待管理员审核</view>
					<view class="flex flex-x-center fs-28 color-8D8D8D mt-24">（预计1～3个工作日内审核完毕）</view>
				</view>
			</block>
			<view class="return-btn" @tap="toIndex" v-if="status!=2">返回首页</view>
		</block>
	</view>
</template>

<script>

export default {
  data() {
    return {
      status: ''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    self.setData({
      status: options.status
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
  onReachBottom: function () {}
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {
  // }
  ,
  methods: {
    openShop: function () {
      uni.navigateTo({
        url: '/member/newOpenShop/newOpenShop'
      });
    },
    toIndex: function () {
      uni.redirectTo({
        url: '/member/index/index'
      });
    }
  }
};
</script>
<style>
/* pages/openshopStatus/openshopStatus.wxss */
page {
	width: 100%;
	height: 100%;
	background: #fff;
}
.all {
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;
}
.hu {
	position: absolute;
	width: 140%;
	height: 450rpx;
	background: #489A19;
	border-radius: 0 0 60% 60%;
	left: -150rpx;

}
.icon-box {
	width: 238rpx;
	height: 238rpx;
	border: 10rpx solid #fff;
	border-radius: 50%;
	margin: 104rpx auto 0;
}
.text-box {
	margin-top: 510rpx;
}
.return-btn {
	position: absolute;
	left: 40rpx;
	bottom: 50rpx;
	width: 670rpx;
	padding: 18rpx 0;
	text-align: center;
	font-size: 30rpx;
	color: #fff;
	background: #489A19;
}
.error-btn {
	width: 325rpx;
	height: 78rpx;
	text-align: center;
	line-height: 78rpx;
	font-size: 26rpx;
	color:#fff;
	border-radius: 20rpx;
	background:rgba(72,154,25,0.5);
	margin: 79rpx auto 40rpx;
}
.error-btn-yellow {
	width: 325rpx;
	height: 78rpx;
	text-align: center;
	line-height: 78rpx;
	font-size: 26rpx;
	color:#fff;
	border-radius: 20rpx;
	background: #489A19;
	margin:auto;
	
}
</style>