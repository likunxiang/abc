<template>
<!--pages//private/privateEvaluate/privateEvaluate.wxml-->
<view class="page pr">
	<view class="bg-white header mb-20">
		<view class="flex align-center">
			<view class="color-595959 fs-24 ns-text-bold">配送速度</view>
			<view class="flex" style="margin-left: 54rpx;color: #979797;">
				<view v-for="(item, index) in spendList" :key="index" :class="'iconfont ' + item + ' fs-40'" @tap="evaluateSpend" :data-index="index"></view>
			</view>
		</view>
		<view class="flex align-center">
			<view class="color-595959 fs-24 ns-text-bold">服务态度</view>
			<view class="flex" style="margin-left: 54rpx;color: #979797;">
				<view v-for="(item, index) in serveList" :key="index" :class="'iconfont ' + item + ' fs-40'" @tap="evaluateServe" :data-index="index"></view>
			</view>
		</view>
	</view>
	<view class="bg-white mb-20">
		<view class="ptb-20 padding-lr flex border-bottom">
			<view style="width: 160rpx;height: 160rpx;">
				<image style="width: 160rpx;height: 160rpx;background-color: #ccc;" mode="aspectFill"></image>
			</view>
			<view class="ml-30">
				<view class="ns-text-limit2 color-595959 fs-24">春季新款体恤复古港味韩范chic宽松纯棉短袖白色t恤春季新款体恤复古港味韩范chic宽松纯棉短袖白色t恤</view>
				<view class="color-D6D6D6 fs-20">颜色：白色  尺码：L</view>
			</view>
		</view>
		<view class="flex align-center" style="padding: 25rpx 40rpx;">
			<view class="color-595959 fs-24 ns-text-bold">配送速度</view>
			<view class="flex" style="margin-left: 54rpx;color: #979797;">
				<view v-for="(item, index) in spendList" :key="index" :class="'iconfont ' + item + ' fs-40'" @tap="evaluateSpend" :data-index="index"></view>
			</view>
		</view>
	</view>
	
	
	<view class="footer justify-between">
		<view class="flex-x-center align-center mb-30">
			<view class="fs-24 color-595959">感谢你的热心评价，它可以帮助更多人了解店主的自营商品</view>
		</view>
		<view class="btn-box">提交</view>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      spendList: ['icon-kongxinwujiaoxing', 'icon-kongxinwujiaoxing', 'icon-kongxinwujiaoxing', 'icon-kongxinwujiaoxing', 'icon-kongxinwujiaoxing'],
      serveList: ['icon-kongxinwujiaoxing', 'icon-kongxinwujiaoxing', 'icon-kongxinwujiaoxing', 'icon-kongxinwujiaoxing', 'icon-kongxinwujiaoxing'],
      j: 0
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
    evaluateSpend(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;

      for (var i = 0; i <= index; i++) {
        self.setData({
          ["spendList[" + i + "]"]: 'icon-shixinwujiaoxing color-F49E3A'
        });
      }

      for (var j = index + 1; j < self.spendList.length; j++) {
        self.setData({
          ["spendList[" + j + "]"]: 'icon-kongxinwujiaoxing'
        });
      }
    },

    evaluateServe(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;

      for (var i = 0; i <= index; i++) {
        self.setData({
          ["serveList[" + i + "]"]: 'icon-shixinwujiaoxing color-F49E3A'
        });
      }

      for (var j = index + 1; j < self.serveList.length; j++) {
        self.setData({
          ["serveList[" + j + "]"]: 'icon-kongxinwujiaoxing'
        });
      }
    }

  }
};
</script>
<style>
@import "./privateEvaluate.css";
</style>