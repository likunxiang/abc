<template>
<!--pages/openshop3/openshop3.wxml-->
<view class="page">
	<block v-if="is_reopen">
		<view class="flex-x-center fs-30 color-F49E3A ns-text-bold">系统检测到你开通过一家店铺</view>
		<view class="flex-x-center ns-align-items-flex-center" style="margin-top: 40rpx;">
			<view class="line" style="margin-right: 30rpx;"></view>
			<view class="fs-30" style="color: #909090;">原的店铺名称</view>
			<view class="line" style="margin-left: 30rpx;"></view>
		</view>
		<view class="flex-x-center ns-text-bold" style="margin-top: 40rpx;color: #333D54;font-size: 50rpx;">{{mch_shop_name}}</view>
		<view class="flex-x-center" style="margin-top: 66rpx;">
			<image style="width: 527rpx;height: 22rpx;" src="/static/member/openshop3/image/icon-line.png" mode="aspectFit"></image>
		</view>
		<view class="fs-30 flex-x-center" style="color: #909090;margin-top: 40rpx;">你可以沿用原名称，或者重新修改</view>
		
		<view class="flex-x-center" style="padding: 0 25rpx; margin-top: 27rpx;margin-bottom: 76rpx;">
			<view class="edit-name-box flex">
				<view class="edit-name-title">店铺名称</view>
				<input style="width: 410rpx;" type="text" placeholder="请输入你的店铺名称" :value="shopName" @input="editName"></input>
				<view class="fs-28" :style="shopName.length>11?'color: #F49E3A':'color: #B0B0B0;'">{{shopName.length}}/11</view>
			</view>
		</view>
		
		<view class="flex-x-center">
			<view class="tips">
				<view class="flex-x-center color-9B9B9B fs-30 ns-text-bold">温馨提示</view>
				<view class="fs-28 color-9B9B9B" style="margin-top: 13rpx;line-height: 47rpx;">
					<view>1、系统会分配一家新店铺给你</view>
					<view>2、原直属上级仍是这家新店铺的直属上级如需继续开店，请点击确认开店</view>
				</view>
			</view>
		</view>
	</block>
	<block v-if="is_reopen==false">
		<view class="img-box">
			<image style="width: 700rpx;height: 380rpx;background-color: #ccc;" mode="aspectFit" :src="pic"></image>
		</view>
		<view class="flex-x-center fs-40" style="margin-top: 50rpx;color: #E3A725;font-weight: 600;">恭喜你，开店成功</view>
		<view class="flex-x-center ns-align-items-flex-center" style="margin-top: 40rpx;">
			<view class="line" style="margin-right: 30rpx;"></view>
			<view class="fs-30" style="color: #909090;">默认的店铺名称</view>
			<view class="line" style="margin-left: 30rpx;"></view>
		</view>
		<view class="flex-x-center ns-text-bold" style="margin-top: 40rpx;color: #333D54;font-size: 50rpx;">{{mch_shop_name}}</view>
		<view class="flex-x-center" style="margin-top: 66rpx;">
			<image style="width: 527rpx;height: 22rpx;" src="/static/member/openshop3/image/icon-line.png" mode="aspectFit"></image>
		</view>
		<view class="fs-30 flex-x-center" style="color: #909090;margin-top: 40rpx;">你可以重新修改</view>
		
		<view class="flex-x-center" style="padding: 0 25rpx; margin-top: 27rpx;">
			<view class="edit-name-box flex">
				<view class="edit-name-title">店铺名称</view>
				<input style="width: 410rpx;" type="text" placeholder="请输入你的店铺名称" :value="shopName" @input="editName"></input>
				<view class="fs-28" :style="shopName.length>11?'color: #F49E3A':'color: #B0B0B0;'">{{shopName.length}}/11</view>
			</view>
		</view>
	</block>
	
	<view class="footer" style="margin:auto">
		<view class="flex-x-center ns-align-items-flex-center" @tap="read">
			<view :class="'iconfont ' + (isRead?'icon-xuanzhong color-1A4C4B':'icon-weixuanzhong color-8D8D8D') + ' fs-40 mr-10'"></view>
			<view class="flex fs-24 color-595959">
				<view>我已阅读</view>
				<view class="color-F49E3A" @tap.stop="toAgreementIdArticleDetail">《亲铺用户协议》</view>
				<view>和</view>
				<view class="color-F49E3A" @tap.stop="toPrivacyArticleDetail">《隐私条款》</view>
			</view>
		</view>
		<view class="sure-btn" @tap="submit">确定</view>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      shopName: '',
      isRead: false,
      mch_shop_name: "",
	  is_reopen:'',
	  pic:''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = this.getApp().core.getStorageSync('USER_INFO').nickname + '的亲铺';
    this.setData({
      mch_shop_name: name,
      shopName: name
    });
    this.getData();
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
    editName: function (e) {
      var value = e.detail.value;
      this.setData({
        shopName: value
      });
    },
    read: function () {
      this.setData({
        isRead: !this.isRead
      });
    },
    getData: function () {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.mch.user.apply_pre_data,
        success: res => {
			
         
          if(res.data){
			   this.setData(res.data);
			  this.setData({
			    mch_shop_name: res.data.mch_name || this.getApp().core.getStorageSync('USER_INFO').nickname + '的亲铺',
			    shopName: res.data.mch_name || this.getApp().core.getStorageSync('USER_INFO').nickname + '的亲铺'
			  });
		  }
        }
      });
    },
    toPrivacyArticleDetail: function () {
      uni.navigateTo({
        url: '/member/article-detail/article-detail?id=' + this.privacy_id
      });
    },
    toAgreementIdArticleDetail: function () {
      uni.navigateTo({
        url: '/member/article-detail/article-detail?id=' + this.agreement_id
      });
    },
    submit: function () {
      var self = this;

      if (!self.isRead) {
        uni.showToast({
          title: '请先阅读相关协议',
          duration: 2500,
          icon: 'none'
        });
        return;
      }

      if (self.shopName.length > 11) {
        uni.showToast({
          title: '店铺名过长将造成显示不完整，请修改',
          icon: 'none',
          duration: 2500
        });
        return;
      }

      this.getApp().request({
        url: this.getApp().api.mch.user.apply_pre_save,
        method: 'POST',
        data: {
          mch_name: self.shopName
        },
        success: function (res) {
          if (res.code == 0) {
            uni.showModal({
              content: res.msg,
              showCancel: false,
              icon: 'none',
              success: function (res) {
                if (res.confirm) {
                  uni.reLaunch({
                    // url: '/pages/openshopStatus/openshopStatus?status=' + status,
                    url: '/pages/index/index'
                  });
                }
              }
            });
          }

          if (res.code == 1) {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2500
            });
          }
        }
      });
    }
  }
};
</script>
<style>
/* pages/openshop3/openshop3.wxss */
page {
	background-color: #fff;
	height: 100%;
}
.page {
	padding: 0 25rpx;
  min-height: 100%;
}
.img-box {
	width:700rpx;
	height:380rpx;
	border-radius:8rpx;
	overflow: hidden;
}
.line {
	width: 79rpx;
	height: 2rpx;
	background-color: #979797;
}
.edit-name-box {
	width:660rpx;
	height:80rpx;
	background:rgba(255,255,255,1);
	border-radius:8rpx;
	border:1rpx solid rgba(214,214,214,1);
	padding: 16rpx 0;
}
.edit-name-title {
	width: 152rpx;
	border-right: 1rpx solid rgba(214,214,214,1);
	text-align: center;
	font-size: 28rpx;
	color: #595959;
	font-weight: 600;
	margin-right: 20rpx;
	line-height: 47rpx;
}
.sure-btn {
  
	width: 670rpx;
	height: 78rpx;
	line-height: 78rpx;
	background-color: #F49E3A;
	text-align: center;
	font-size: 30rpx;
	color: #fff;
	margin: 27rpx auto 0;
}
.tips {
	width: 660rpx;
	height: 255rpx;
	background: #F6F6F6;
	padding: 27rpx 66rpx;
}
.color-9B9B9B {
	color: #9B9B9B;
}
.footer {
	position: absolute;
	bottom: 71rpx;
	left: 38rpx;
}

</style>