<template>
<!--小亲本搜索-->
<view class="qinseach">
	<!-- 导航开始 -->
	<!-- <view class="heardBanner">
		<view class="con flex ns-justify-content-space-between ns-align-items-flex-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;padding-left:20rpx;padding-right:20rpx;'">
			<view class="  go-back flex1" style="font-size:30rpx;color:#FFFFFF;" @tap="returnPage">
				<text class="iconfont icon-zuojiantoubeifen"></text>
			</view>
			<view class="qTitle flex1 ns-text-center " style="font-size:37rpx;color:#ffffff;">小亲本</view>
			<view class="flex1"></view>
		</view>
	</view>
	<view :style="'height:' + customBar + 'px;'"></view> -->
	<custom mode="2" fixed="fixed" title="小亲本" background="#FFFFFF" backColor="#333333" titleColor="#333333"></custom>
	<!-- 导航结束 -->

	<!-- 搜索框开始 -->
	<view class="qinInput">
		<view class="select-seach">
			<view class="iconfont icon-sousuo icon"></view>
			<input placeholder="搜索顾客昵称、品牌名称" @input="inputChange" :value="inputValue"></input>
		</view>
		<!-- <view class="input-right">
			<text class="iconfont iconqiehuan"></text>
			<text class="icon-bottom">{{'看品牌'}}</text>
		</view> -->
	</view>
	<!-- 搜索框结束 -->

	<!-- 显示顾客和品牌开始 -->
	<view class="myuser">
		<view class="yonghu">
			<view v-for="(item, index) in searchList.users" :key="index" class="yonghu-item" hover-class="click" @tap="toUser" :data-id="item.user_id">
				<text class="yonghu-icon iconfont icon-yonghu "></text>
				<text class="yonghu-name">{{item.user_name}}</text>
				<view class="yonghu-num">关注{{' '+ item.user_brand_sum +' '}}个品牌
					<text class="iconfont icon-jinru"></text>
				</view>
			</view>
		</view>
		<view class="yonghu">
			<view v-for="(item, index) in searchList.brands" :key="index" class="yonghu-item" hover-class="click" @tap="toPinpaiLike" :data-id="item.brand_id" :data-name="item.brand_name">
				<text class="yonghu-icon iconfont icon-pinpai " style="color:#489A19;"></text>
				<text class="yonghu-name">{{item.brand_name}}</text>
				<view class="yonghu-num">{{item.user_brand_sum + ' '}}个顾客关注
					<text class="iconfont icon-jinru"></text>
				</view>
			</view>
		</view>
	</view>
	<!-- 显示顾客和品牌结束 -->
</view>
</template>

<script>

export default {
  data() {
    return {
      statusBar: getApp().globalData.statusBar,
      customBar: getApp().globalData.customBar,
      custom: getApp().globalData.custom,
      searchList: "",
      keyword: "",
	  inputValue:'',
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
    getSearchList() {
      this.getApp().request({
        url: this.getApp().api.maijia.user_brand_search,
        data: {
          keyword: this.keyword || ''
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              searchList: res.data
            });
          } else {}
        }
      });
    },

    //去用户信息页
    toUser(e) {
     //#ifdef MP-WEIXIN
	 uni.navigateToMiniProgram({
	   appId: 'wxfd13fd712d32b3cb',
	   path: '/user/user/user?user_id=' + e.currentTarget.dataset.id,
	   extraData: {
	     // 传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
	     mch_id: uni.getStorageSync('_mchInfo').id,
	     token: uni.getStorageSync(this.getApp().const.ACCESS_TOKEN)
	   },
	   envVersion: 'trial',
	 
	   // 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效
	   success(res) {// 打开成功
	   },
	 
	   fail: function (res) {}
	 });
	 //#endif
    },

    //input框值发生改变
    inputChange(e) {
      //console.log(e.detail.value)
      this.setData({
        keyword: e.detail.value
      });
      this.getSearchList();
    },

    returnPage() {
      uni.navigateBack({
        delta: 1,
        fail: res => {
          uni.redirectTo({
            url: '/pages/index/index'
          });
        }
      });
    },

    //去品牌偏好页
    toPinpaiLike(e) {
      uni.navigateTo({
        url: '/user/pinpaiLike/pinpaiLike?brand_id=' + e.currentTarget.dataset.id + '&brand_name=' + e.currentTarget.dataset.name
      });
    }

  }
};
</script>
<style>
/* user/qinSeach/qinSeach.wxss */

page {
    background: #f7f7f7;
}

.heardBanner {
    width: 750rpx;
    background: linear-gradient(134deg, rgba(48, 35, 174, 1) 0%, rgba(200, 109, 215, 1) 100%);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
}


/* 搜索框开始 ****************************/

.qinInput {
    display: flex;
    flex-flow: row nowrap;
    width: 700rpx;
    margin: 30rpx 0 0 25rpx;
    height: 80rpx;
}

.input-right {
    width: 90rpx;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    color: #7944E4;
    font-size: 50rpx;
}

.icon-bottom1 {
    font-size: 20rpx;
    font-weight: 400;
    line-height: 28rpx;
}

.select-seach {
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 40rpx;
    background-color: #ffffff;
    padding: 0 25rpx;
    color: #4d4d4d;
    font-size: 30rpx;
    display: flex;
    align-items: center;
}

.select-seach>view {
    margin-right: 30rpx;
}

.select-seach input {
    flex: 1;
}


/* 显示区域 */


/* 用户和品牌列表 */

.yonghu {
    margin-top: 10rpx;
    margin-bottom: 20rpx;
}

.yonghu-item {
    width: 700rpx;
    margin: 20rpx 0 0 25rpx;
    border-radius: 8rpx;
    box-sizing: border-box;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    line-height: 103rpx;
    font-size: 30rpx;
    font-weight: 400;
    padding: 0 25rpx 0 35rpx;
    color: #4A4A4A;
}

.yonghu-icon {
    color: #F76436;
    margin-right: 30rpx;
}

.yonghu-name {
    width: 160rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.yonghu-num {
    line-height: 103rpx;
    flex: 1;
    color: #9B9B9B;
    text-align: right;
}

.click {
    opacity: 0.8;
    /* transition: all 0.1s; */
    transform: scale(0.99);
}
</style>