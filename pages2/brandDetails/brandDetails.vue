<template>
<!--pages/brandDetails/brandDetails.wxml-->
<view class="brandDetail">
	<view class="brand-pic">
		<image style="width: 100%;height: 100%;" mode="aspectFill" :src="background"></image>
	</view>
	<view class="title-box flex ns-align-items-flex-center">
		<view class="black-box mr-20"></view>
		<view class="fs-30 color-2C2C2C ns-text-bold">品牌简介</view>
	</view>
	<view class="content bg-white fs-24 color-595959">{{desc}}</view>
	<view class="title-box flex ns-align-items-flex-center">
		<view class="black-box mr-20"></view>
		<view class="fs-30 color-2C2C2C ns-text-bold">企业资质</view>
	</view>
	<view class="content bg-white" style="padding-right: 0;">
		<scroll-view scroll-x="true">
			<view class="flex">
				<view class="flex-gorw-0 mr-10" v-for="(item, index) in qualification" :key="index">
					<image style="width: 268rpx;height: 380rpx;background: #ccc;" mode="widthFix" :src="item"></image>
				</view>
			</view>
		</scroll-view>
	</view>
	<view class="title-box flex ns-align-items-flex-center">
		<view class="black-box mr-20"></view>
		<view class="fs-30 color-2C2C2C ns-text-bold">粉丝来说</view>
	</view>
	<view class="content bg-white" style="padding-right: 0;">
		<scroll-view scroll-x="true">
			<view class="flex">
				<view class="flex-gorw-0 mr-20" style="width: 545rpx;" v-for="(item, index) in review" :key="index">
					<image style="width: 545rpx;height: 350rpx;background: #ccc;" mode="aspectFill" :src="item.background"></image>
					<view class="flex ns-align-items-flex-center">
						<image style="width: 48rpx;height: 48rpx;border-radius: 50%;overflow: hidden;margin-right: 14rpx;" mode="aspectFill" :src="item.avatar"></image>
						<view>
							<view class="fs-20 color-2C2C2C">{{item.name}}</view>
							<view class="fs-16 color-8D8D8D">{{item.time}}</view>
						</view>
						
					</view>
					<view class="fs-24 color-595959 mt-10">{{item.content}}</view>
				</view>
				
			</view>
		</scroll-view>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
		background:'',
		qualification:[],
		review:[],
		desc:''
	};
  },
  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBrandDetail(options);
  },
  onShareAppMessage: function () {},
  methods: {
    // 获取品牌详情 网络接口
    getBrandDetail: function (options) {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.default.brandDetail,
        data: {
          brand_id: options.brand_id
        },
        success: function (res) {
          if (res.code == 0) {
            uni.showToast({
              title: '加载中...',
              icon: 'loading',
              success: function () {
                self.setData(res.data);
              }
            });
          }
        }
      });
    }
  }
};
</script>
<style>
@import "./brandDetails.css";
</style>